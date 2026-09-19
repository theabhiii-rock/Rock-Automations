import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const { conversationId, content, attachments = [] } = await request.json();

    if (!conversationId || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Conversation ID and message content are required' } },
        { status: 400 }
      );
    }

    const conv = queryOne<any>('SELECT * FROM conversations WHERE id = ?', [conversationId]);
    if (!conv) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Conversation not found' } },
        { status: 404 }
      );
    }

    const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    execute(
      `INSERT INTO messages (id, conversation_id, sender_id, sender_role, content, attachments, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
      [msgId, conversationId, user.id, user.role, content.trim(), JSON.stringify(attachments), now]
    );

    execute(
      `UPDATE conversations SET last_message = ?, updated_at = ? WHERE id = ?`,
      [content.trim().substring(0, 100), now, conversationId]
    );

    return NextResponse.json({
      success: true,
      data: {
        messageId: msgId,
        conversationId,
        content: content.trim(),
        createdAt: now,
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

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversation_id');

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'conversation_id is required' } },
        { status: 400 }
      );
    }

    const messages = query(
      `SELECT m.*, u.email as sender_email
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [conversationId]
    );

    // Mark messages as read for receiver
    execute(
      `UPDATE messages SET is_read = 1 WHERE conversation_id = ? AND sender_id != ?`,
      [conversationId, user.id]
    );

    return NextResponse.json({
      success: true,
      data: {
        total: messages.length,
        messages,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
