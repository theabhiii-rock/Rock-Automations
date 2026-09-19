import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

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

    const { status } = await request.json();
    const validStatuses = ['NEW', 'VIEWED', 'RESPONDED', 'NEGOTIATING', 'HIRED', 'COMPLETED', 'CANCELLED', 'CLOSED'];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_STATUS', message: 'Invalid enquiry status specified' } },
        { status: 400 }
      );
    }

    const enquiry = queryOne<any>('SELECT * FROM enquiries WHERE id = ?', [id]);
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Enquiry not found' } },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    execute('UPDATE enquiries SET status = ?, updated_at = ? WHERE id = ?', [status, now, id]);

    logAuditEvent({
      actorId: user.id,
      action: 'ENQUIRY_STATUS_UPDATED',
      entityType: 'enquiries',
      entityId: id,
      details: { previousStatus: enquiry.status, newStatus: status },
    });

    return NextResponse.json({
      success: true,
      data: {
        enquiryId: id,
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
