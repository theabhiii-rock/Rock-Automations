import { execute } from './db';

export interface AuditEventParams {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: Record<string, any>;
  ipAddress?: string;
}

export function logAuditEvent({
  actorId,
  action,
  entityType,
  entityId,
  details,
  ipAddress = '127.0.0.1',
}: AuditEventParams): void {
  try {
    const id = 'audit_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const now = new Date().toISOString();
    execute(
      `INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, details, ip_address, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, actorId, action, entityType, entityId, JSON.stringify(details), ipAddress, now]
    );
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
