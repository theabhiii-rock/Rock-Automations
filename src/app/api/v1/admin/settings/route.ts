import { NextResponse } from 'next/server';
import { execute, query } from '@/lib/db';
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

    const settings = query<{ key: string; value: string; description: string; updated_at: string }>(
      'SELECT * FROM system_settings ORDER BY key ASC'
    );

    return NextResponse.json({
      success: true,
      data: { settings },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin privileges required' } },
        { status: 403 }
      );
    }

    const { settings } = await request.json(); // Record<string, string>

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Settings payload must be an object' } },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    for (const [key, val] of Object.entries(settings)) {
      execute(
        `UPDATE system_settings SET value = ?, updated_at = ? WHERE key = ?`,
        [String(val), now, key]
      );
    }

    logAuditEvent({
      actorId: user.id,
      action: 'SYSTEM_SETTINGS_UPDATED',
      entityType: 'system_settings',
      entityId: 'global',
      details: settings,
    });

    return NextResponse.json({
      success: true,
      data: {
        message: 'System settings successfully saved and applied.',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
