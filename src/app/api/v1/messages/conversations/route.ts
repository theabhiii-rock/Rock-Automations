import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    let sql = `
      SELECT c.*, 
        cp.full_name as client_name,
        pro.full_name as professional_name, pro.username as professional_username, pro.avatar_url as professional_avatar,
        (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.is_read = 0 AND m.sender_id != ?) as unread_count
      FROM conversations c
      JOIN users u_client ON c.client_id = u_client.id
      LEFT JOIN client_profiles cp ON u_client.id = cp.user_id
      JOIN professional_profiles pro ON c.professional_id = pro.id
      WHERE 1=1
    `;

    const params: any[] = [user.id];

    if (user.role === 'CLIENT') {
      sql += ' AND c.client_id = ?';
      params.push(user.id);
    } else if (user.role === 'PROFESSIONAL') {
      const proProfile = queryOne<{ id: string }>('SELECT id FROM professional_profiles WHERE user_id = ?', [user.id]);
      if (proProfile) {
        sql += ' AND c.professional_id = ?';
        params.push(proProfile.id);
      }
    }

    sql += ' ORDER BY c.updated_at DESC';

    const conversations = query(sql, params);

    return NextResponse.json({
      success: true,
      data: {
        total: conversations.length,
        conversations,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
