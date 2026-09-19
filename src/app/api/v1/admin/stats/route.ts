import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin privileges required' } },
        { status: 403 }
      );
    }

    const totalPros = queryOne<{ count: number }>('SELECT COUNT(*) as count FROM professional_profiles');
    const verifiedPros = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM professional_profiles WHERE verification_status = 'VERIFIED'");
    const pendingPros = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM verification_requests WHERE status IN ('PENDING', 'UNDER_REVIEW')");
    const totalClients = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM users WHERE role = 'CLIENT'");
    const totalProjects = queryOne<{ count: number }>('SELECT COUNT(*) as count FROM projects');
    const completedProjects = queryOne<{ count: number }>("SELECT COUNT(*) as count FROM projects WHERE status = 'COMPLETED'");
    const membershipRevenue = queryOne<{ total: number }>("SELECT SUM(amount) as total FROM memberships WHERE status = 'ACTIVE'");
    const platformFeesCollected = queryOne<{ total: number }>("SELECT SUM(fee_amount) as total FROM platform_fees WHERE status = 'COLLECTED'");

    const recentAuditLogs = query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10');

    return NextResponse.json({
      success: true,
      data: {
        registeredProfessionals: totalPros?.count || 0,
        verifiedProfessionals: verifiedPros?.count || 0,
        pendingVerifications: pendingPros?.count || 0,
        clients: totalClients?.count || 0,
        totalProjects: totalProjects?.count || 0,
        completedProjects: completedProjects?.count || 0,
        membershipRevenue: membershipRevenue?.total || 0,
        platformFeesCollected: platformFeesCollected?.total || 0,
        recentAuditLogs,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
