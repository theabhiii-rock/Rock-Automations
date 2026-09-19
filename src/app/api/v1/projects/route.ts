import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'You must be logged in to create a project' } },
        { status: 401 }
      );
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`proj_${user.id}_${clientIp}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many projects created. Please wait ${rateCheck.retryAfterSeconds} seconds.`,
          },
        },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      categoryId = 'cat_ai',
      budgetMin,
      budgetMax,
      currency = 'INR',
      timeline = '2-4 weeks',
      preferredProfessionalId,
    } = body;

    if (!title || !description || budgetMin === undefined || budgetMax === undefined) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Title, description, and budget range are required' } },
        { status: 400 }
      );
    }

    const bMin = parseFloat(budgetMin);
    const bMax = parseFloat(budgetMax);
    if (isNaN(bMin) || isNaN(bMax) || bMin <= 0 || bMax < bMin) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Valid positive budget range required (budgetMax >= budgetMin > 0)' } },
        { status: 400 }
      );
    }

    const projectId = 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    execute(
      `INSERT INTO projects (
        id, client_id, title, description, category_id, budget_min, budget_max,
        currency, timeline, status, preferred_professional_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN', ?, ?, ?)`,
      [
        projectId,
        user.id,
        title,
        description,
        categoryId,
        parseFloat(budgetMin),
        parseFloat(budgetMax),
        currency,
        timeline,
        preferredProfessionalId || null,
        now,
        now,
      ]
    );

    // Record initial project activity
    const actId = 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    execute(
      `INSERT INTO project_activities (id, project_id, title, description, actor_id, status_change_to, created_at)
       VALUES (?, ?, 'Project Created', 'Client created project specifications and requirements.', ?, 'OPEN', ?)`,
      [actId, projectId, user.id, now]
    );

    logAuditEvent({
      actorId: user.id,
      action: 'PROJECT_CREATED',
      entityType: 'projects',
      entityId: projectId,
      details: { title, budgetMin, budgetMax, currency, categoryId },
    });

    return NextResponse.json({
      success: true,
      data: {
        message: 'Project posted successfully!',
        projectId,
      },
    });
  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sql = `
      SELECT p.*, c.name as category_name, u.email as client_email,
        cp.full_name as client_name, cp.company_name,
        pro.full_name as preferred_professional_name,
        assigned.full_name as assigned_professional_name
      FROM projects p
      JOIN categories c ON p.category_id = c.id
      JOIN users u ON p.client_id = u.id
      LEFT JOIN client_profiles cp ON u.id = cp.user_id
      LEFT JOIN professional_profiles pro ON p.preferred_professional_id = pro.id
      LEFT JOIN professional_profiles assigned ON p.assigned_professional_id = assigned.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (user && user.role === 'CLIENT') {
      sql += ' AND p.client_id = ?';
      params.push(user.id);
    } else if (user && user.role === 'PROFESSIONAL') {
      const proProfile = queryOne<{ id: string }>('SELECT id FROM professional_profiles WHERE user_id = ?', [user.id]);
      if (proProfile) {
        sql += ' AND (p.preferred_professional_id = ? OR p.assigned_professional_id = ? OR p.status = "OPEN")';
        params.push(proProfile.id, proProfile.id);
      }
    }

    if (status) {
      sql += ' AND p.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY p.created_at DESC';

    const projects = query(sql, params);

    return NextResponse.json({
      success: true,
      data: {
        total: projects.length,
        projects,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
