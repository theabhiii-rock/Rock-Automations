import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'PROFESSIONAL') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Professional privileges required' } },
        { status: 403 }
      );
    }

    const pro = queryOne<{ id: string }>('SELECT id FROM professional_profiles WHERE user_id = ?', [user.id]);
    if (!pro) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Profile not found' } },
        { status: 404 }
      );
    }

    execute('DELETE FROM portfolio_projects WHERE id = ? AND professional_id = ?', [id, pro.id]);

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
