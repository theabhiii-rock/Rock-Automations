import { NextResponse } from 'next/server';
import { execute, query, queryOne } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`enq_${clientIp}`, 15, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many enquiry submissions. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`,
          },
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) },
        }
      );
    }

    const user = await getCurrentUser(request);
    const body = await request.json();

    const {
      professionalId,
      clientName,
      clientEmail,
      projectTitle,
      message,
      budget,
      currency = 'INR',
      timeline = '2-4 weeks',
    } = body;

    if (!professionalId || !projectTitle || !message || !budget) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'All required enquiry fields must be provided' } },
        { status: 400 }
      );
    }

    const pro = queryOne<{ id: string; user_id: string; full_name: string }>(
      'SELECT id, user_id, full_name FROM professional_profiles WHERE id = ?',
      [professionalId]
    );

    if (!pro) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Target professional does not exist' } },
        { status: 404 }
      );
    }

    const enquiryId = 'enq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    let clientId = user ? user.id : '';
    if (!clientId) {
      const email = clientEmail || `guest_${Date.now()}@rockautomations.com`;
      const existing = queryOne<{ id: string }>('SELECT id FROM users WHERE email = ?', [email]);
      if (existing) {
        clientId = existing.id;
      } else {
        clientId = 'usr_guest_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
        execute(
          `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
           VALUES (?, ?, 'NOPASSWORD', 'GUEST', 'ACTIVE', ?, ?)`,
          [clientId, email, now, now]
        );
      }
    }

    execute(
      `INSERT INTO enquiries (
        id, client_id, professional_id, client_name, client_email,
        project_title, message, budget, currency, timeline, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?, ?)`,
      [
        enquiryId,
        clientId,
        professionalId,
        clientName || 'Inquiring Client',
        clientEmail || 'client@inquiry.com',
        projectTitle,
        message,
        parseFloat(budget),
        currency,
        timeline,
        now,
        now,
      ]
    );

    // Create Conversation record
    const convId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    execute(
      `INSERT INTO conversations (id, enquiry_id, client_id, professional_id, last_message, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [convId, enquiryId, clientId, professionalId, message, now]
    );

    // Create First Message
    const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    execute(
      `INSERT INTO messages (id, conversation_id, sender_id, sender_role, content, is_read, created_at)
       VALUES (?, ?, ?, 'CLIENT', ?, 0, ?)`,
      [msgId, convId, clientId, message, now]
    );

    // Create Notification for the Professional
    const notifId = 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    execute(
      `INSERT INTO notifications (id, user_id, type, title, message, link_url, is_read, created_at)
       VALUES (?, ?, 'NEW_ENQUIRY', 'New Client Enquiry Received', ?, ?, 0, ?)`,
      [
        notifId,
        pro.user_id,
        `${clientName} submitted an enquiry for "${projectTitle}" (${currency} ${budget})`,
        `/professional/dashboard/enquiries`,
        now,
      ]
    );

    logAuditEvent({
      actorId: clientId,
      action: 'ENQUIRY_CREATED',
      entityType: 'enquiries',
      entityId: enquiryId,
      details: { professionalId, budget, currency, projectTitle },
    });

    // TODO: Email Notification to Abhishek Kumar
    // Send to: rockautomations@gmail.com
    // Subject: `New Enquiry: ${projectTitle} (${currency} ${budget})`
    // Body: Client ${clientName} (${clientEmail}) sent an enquiry.
    // Integrate with Nodemailer/Resend when SMTP is configured.


    return NextResponse.json({
      success: true,
      data: {
        message: 'Your enquiry has been successfully delivered to the professional.',
        enquiryId,
        conversationId: convId,
      },
    });
  } catch (error: any) {
    console.error('Create enquiry error:', error);
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

    let enquiries: any[] = [];

    if (user.role === 'PROFESSIONAL') {
      const pro = queryOne<{ id: string }>('SELECT id FROM professional_profiles WHERE user_id = ?', [user.id]);
      if (pro) {
        enquiries = query(
          `SELECT e.*, c.id as conversation_id
           FROM enquiries e
           LEFT JOIN conversations c ON e.id = c.enquiry_id
           WHERE e.professional_id = ?
           ORDER BY e.created_at DESC`,
          [pro.id]
        );
      }
    } else if (user.role === 'CLIENT') {
      enquiries = query(
        `SELECT e.*, p.full_name as professional_name, p.username as professional_username, c.id as conversation_id
         FROM enquiries e
         JOIN professional_profiles p ON e.professional_id = p.id
         LEFT JOIN conversations c ON e.id = c.enquiry_id
         WHERE e.client_id = ?
         ORDER BY e.created_at DESC`,
        [user.id]
      );
    } else if (user.role === 'ADMIN') {
      enquiries = query(
        `SELECT e.*, p.full_name as professional_name
         FROM enquiries e
         JOIN professional_profiles p ON e.professional_id = p.id
         ORDER BY e.created_at DESC`
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        total: enquiries.length,
        enquiries,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
