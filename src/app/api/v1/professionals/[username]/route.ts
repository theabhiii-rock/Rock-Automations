import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const cleanUsername = username.toLowerCase().trim();

    const pro = queryOne<any>(
      `SELECT * FROM professional_profiles WHERE LOWER(username) = ?`,
      [cleanUsername]
    );

    if (!pro) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Professional not found' } },
        { status: 404 }
      );
    }

    // Fetch Skills
    const skills = query(
      `SELECT s.id, s.name, s.slug, c.name as category_name
       FROM professional_skills ps
       JOIN skills s ON ps.skill_id = s.id
       JOIN categories c ON s.category_id = c.id
       WHERE ps.professional_id = ?`,
      [pro.id]
    );

    // Fetch Portfolio Projects
    const rawProjects = query(
      `SELECT * FROM portfolio_projects WHERE professional_id = ? ORDER BY sort_order ASC, created_at DESC`,
      [pro.id]
    );

    const portfolio = rawProjects.map((p: any) => {
      let workflow_steps = null;
      let technologies = [];
      let images = [];
      try {
        workflow_steps = p.workflow_steps ? JSON.parse(p.workflow_steps) : null;
      } catch (e) {}
      try {
        technologies = JSON.parse(p.technologies);
      } catch (e) {}
      try {
        images = JSON.parse(p.images);
      } catch (e) {}

      return {
        ...p,
        workflow_steps,
        technologies,
        images,
        featured: Boolean(p.featured),
      };
    });

    // Fetch Services
    const services = query(
      `SELECT * FROM services WHERE professional_id = ? ORDER BY starting_price ASC`,
      [pro.id]
    );

    // Fetch Reviews (Only completed project reviews)
    const reviews = query(
      `SELECT r.*, cp.full_name as client_name, cp.company_name
       FROM reviews r
       JOIN users u ON r.client_id = u.id
       LEFT JOIN client_profiles cp ON u.id = cp.user_id
       WHERE r.professional_id = ? AND r.status = 'PUBLISHED'
       ORDER BY r.created_at DESC`,
      [pro.id]
    );

    return NextResponse.json({
      success: true,
      data: {
        professional: {
          ...pro,
          is_featured: Boolean(pro.is_featured),
          skills,
          portfolio,
          services,
          reviews,
        },
      },
    });
  } catch (error: any) {
    console.error('Fetch professional error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
