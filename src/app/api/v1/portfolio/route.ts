import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'PROFESSIONAL') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Professional account required' } },
        { status: 403 }
      );
    }

    const pro = queryOne<{ id: string }>('SELECT id FROM professional_profiles WHERE user_id = ?', [user.id]);
    if (!pro) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Professional profile not found' } },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      title,
      categoryId,
      description,
      workflowSteps = null,
      technologies = [],
      liveUrl = '',
      githubUrl = '',
      images = [],
      featured = 0,
      sortOrder = 0,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Title and description are required' } },
        { status: 400 }
      );
    }

    const id = 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const now = new Date().toISOString();

    execute(
      `INSERT INTO portfolio_projects (
        id, professional_id, title, slug, category_id, description,
        workflow_steps, technologies, live_url, github_url, images, featured, sort_order, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        pro.id,
        title,
        slug,
        categoryId || null,
        description,
        workflowSteps ? JSON.stringify(workflowSteps) : null,
        JSON.stringify(technologies),
        liveUrl || null,
        githubUrl || null,
        JSON.stringify(images.length > 0 ? images : ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800']),
        featured ? 1 : 0,
        sortOrder,
        now,
      ]
    );

    return NextResponse.json({
      success: true,
      data: {
        message: 'Portfolio project successfully created!',
        projectId: id,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const pro = queryOne<{ id: string }>('SELECT id FROM professional_profiles WHERE user_id = ?', [user.id]);
    if (!pro) {
      return NextResponse.json({ success: true, data: { projects: [] } });
    }

    const rows = query(
      `SELECT p.*, c.name as category_name
       FROM portfolio_projects p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.professional_id = ?
       ORDER BY p.sort_order ASC, p.created_at DESC`,
      [pro.id]
    );

    const projects = rows.map((r: any) => ({
      ...r,
      workflow_steps: r.workflow_steps ? JSON.parse(r.workflow_steps) : null,
      technologies: JSON.parse(r.technologies || '[]'),
      images: JSON.parse(r.images || '[]'),
      featured: Boolean(r.featured),
    }));

    return NextResponse.json({
      success: true,
      data: { projects },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
