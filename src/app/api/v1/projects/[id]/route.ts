import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { calculatePlatformFee } from '@/lib/payments';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = queryOne<any>(
      `SELECT p.*, c.name as category_name,
        cp.full_name as client_name, cp.company_name,
        pro.full_name as assigned_professional_name, pro.username as assigned_professional_username,
        pro.avatar_url as assigned_professional_avatar
       FROM projects p
       JOIN categories c ON p.category_id = c.id
       JOIN users u ON p.client_id = u.id
       LEFT JOIN client_profiles cp ON u.id = cp.user_id
       LEFT JOIN professional_profiles pro ON p.assigned_professional_id = pro.id
       WHERE p.id = ?`,
      [id]
    );

    if (!project) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } },
        { status: 404 }
      );
    }

    // Fetch Timeline Activities
    const activities = query(
      `SELECT pa.*, u.email as actor_email
       FROM project_activities pa
       JOIN users u ON pa.actor_id = u.id
       WHERE pa.project_id = ?
       ORDER BY pa.created_at ASC`,
      [id]
    );

    // Fetch Review if completed
    const review = queryOne(
      'SELECT * FROM reviews WHERE project_id = ?',
      [id]
    );

    // Fetch Platform Fee record if generated
    const fee = queryOne(
      'SELECT * FROM platform_fees WHERE project_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      data: {
        project,
        activities,
        review,
        fee,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const { status, assignedProfessionalId, finalAmount } = await request.json();

    const project = queryOne<any>('SELECT * FROM projects WHERE id = ?', [id]);
    if (!project) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    let updateSql = 'UPDATE projects SET status = ?, updated_at = ?';
    const updateParams: any[] = [status, now];

    if (assignedProfessionalId) {
      updateSql += ', assigned_professional_id = ?';
      updateParams.push(assignedProfessionalId);
    }

    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    execute(updateSql, updateParams);

    // Record Activity
    const actId = 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    execute(
      `INSERT INTO project_activities (id, project_id, title, description, actor_id, status_change_to, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [actId, id, `Status updated to ${status}`, `Project status transitioned from ${project.status} to ${status}.`, user.id, status, now]
    );

    // When project transitions to COMPLETED, calculate and record Platform Fee!
    if (status === 'COMPLETED') {
      const feeSetting = queryOne<{ value: string }>('SELECT value FROM system_settings WHERE key = ?', ['platform_fee_percent']);
      const feePercentage = parseFloat(feeSetting?.value || '10');
      const gross = finalAmount || project.budget_max || project.budget_min;

      const feeCalc = calculatePlatformFee(gross, feePercentage, project.currency);
      const feeId = 'fee_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

      execute(
        `INSERT OR REPLACE INTO platform_fees (
          id, project_id, gross_amount, fee_percentage, fee_amount, professional_net_amount, currency, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'COLLECTED', ?)`,
        [feeId, id, feeCalc.grossAmount, feeCalc.feePercentage, feeCalc.feeAmount, feeCalc.netProfessionalAmount, feeCalc.currency, now]
      );
    }

    logAuditEvent({
      actorId: user.id,
      action: 'PROJECT_STATUS_UPDATED',
      entityType: 'projects',
      entityId: id,
      details: { previousStatus: project.status, newStatus: status, assignedProfessionalId },
    });

    return NextResponse.json({
      success: true,
      data: {
        projectId: id,
        status,
        updatedAt: now,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
