import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin privileges required' } },
        { status: 403 }
      );
    }

    const verifications = query(`
      SELECT vr.*, 
        p.full_name as professional_name, p.username as professional_username,
        p.title as professional_title, p.country as professional_country,
        u.email as professional_email
      FROM verification_requests vr
      JOIN professional_profiles p ON vr.professional_id = p.id
      JOIN users u ON p.user_id = u.id
      ORDER BY vr.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      data: {
        total: verifications.length,
        verifications,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin privileges required' } },
        { status: 403 }
      );
    }

    const { verificationId, action, rejectionReason = '' } = await request.json();

    if (!verificationId || !action) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Verification ID and action are required' } },
        { status: 400 }
      );
    }

    const vr = queryOne<any>('SELECT * FROM verification_requests WHERE id = ?', [verificationId]);
    if (!vr) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Verification request not found' } },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    let newStatus = 'UNDER_REVIEW';

    if (action === 'APPROVE') {
      newStatus = 'VERIFIED';
    } else if (action === 'REJECT') {
      newStatus = 'REJECTED';
    } else if (action === 'SUSPEND') {
      newStatus = 'SUSPENDED';
    }

    execute(
      `UPDATE verification_requests
       SET status = ?, reviewer_id = ?, reviewed_at = ?, rejection_reason = ?
       WHERE id = ?`,
      [newStatus, user.id, now, rejectionReason, verificationId]
    );

    execute(
      `UPDATE professional_profiles SET verification_status = ? WHERE id = ?`,
      [newStatus, vr.professional_id]
    );

    logAuditEvent({
      actorId: user.id,
      action: `PROFESSIONAL_VERIFICATION_${action}`,
      entityType: 'professional_profiles',
      entityId: vr.professional_id,
      details: { verificationId, action, newStatus, rejectionReason },
    });

    return NextResponse.json({
      success: true,
      data: {
        message: `Verification successfully updated to ${newStatus}`,
        status: newStatus,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
