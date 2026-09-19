import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const { projectId, rating, writtenReview } = await request.json();

    if (!projectId || !rating || !writtenReview?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Project ID, rating, and written review are required' } },
        { status: 400 }
      );
    }

    const numericRating = Math.round(Number(rating));
    if (numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_RATING', message: 'Rating must be an integer between 1 and 5' } },
        { status: 400 }
      );
    }

    // 1. Verify project
    const project = queryOne<any>('SELECT * FROM projects WHERE id = ?', [projectId]);
    if (!project) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } },
        { status: 404 }
      );
    }

    if (project.client_id !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Only the project client can submit a review' } },
        { status: 403 }
      );
    }

    if (project.status !== 'COMPLETED') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PROJECT_NOT_COMPLETED',
            message: 'Reviews can only be submitted for completed platform projects.',
          },
        },
        { status: 400 }
      );
    }

    if (!project.assigned_professional_id) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_ASSIGNED_PROFESSIONAL', message: 'No professional was assigned to this project' } },
        { status: 400 }
      );
    }

    // 2. Prevent duplicate review
    const existing = queryOne('SELECT id FROM reviews WHERE project_id = ?', [projectId]);
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'DUPLICATE_REVIEW', message: 'A review has already been submitted for this project' } },
        { status: 409 }
      );
    }

    const reviewId = 'rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    execute(
      `INSERT INTO reviews (id, project_id, client_id, professional_id, rating, written_review, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'PUBLISHED', ?)`,
      [reviewId, projectId, user.id, project.assigned_professional_id, numericRating, writtenReview.trim(), now]
    );

    // Recalculate average rating for professional
    const stats = queryOne<{ avg_r: number; count_r: number }>(
      `SELECT AVG(rating) as avg_r, COUNT(*) as count_r FROM reviews WHERE professional_id = ? AND status = 'PUBLISHED'`,
      [project.assigned_professional_id]
    );

    if (stats) {
      execute(
        `UPDATE professional_profiles SET rating_avg = ?, review_count = ? WHERE id = ?`,
        [Math.round((stats.avg_r || 5.0) * 10) / 10, stats.count_r || 1, project.assigned_professional_id]
      );
    }

    logAuditEvent({
      actorId: user.id,
      action: 'REVIEW_SUBMITTED',
      entityType: 'reviews',
      entityId: reviewId,
      details: { projectId, rating: numericRating, professionalId: project.assigned_professional_id },
    });

    return NextResponse.json({
      success: true,
      data: {
        message: 'Thank you! Your verified review has been published.',
        reviewId,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
