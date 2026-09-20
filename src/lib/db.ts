import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) {
    return dbInstance;
  }

  let dbPath: string;

  // Handle serverless read-only filesystems (e.g. Vercel / AWS Lambda)
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDataDir = path.join('/tmp', 'data');
    if (!fs.existsSync(tmpDataDir)) {
      fs.mkdirSync(tmpDataDir, { recursive: true });
    }
    dbPath = path.join(tmpDataDir, 'platform.db');
    const bundledDb = path.join(process.cwd(), 'data', 'platform.db');
    if (!fs.existsSync(dbPath) && fs.existsSync(bundledDb)) {
      try {
        fs.copyFileSync(bundledDb, dbPath);
      } catch (err) {
        console.error('Failed to copy initial platform.db to /tmp:', err);
      }
    }
  } else {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    dbPath = path.join(dataDir, 'platform.db');
  }

  const db = new DatabaseSync(dbPath);

  // Initialize PRAGMAs
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');

  // Initialize Tables
  initTables(db);

  dbInstance = db;
  return db;
}

function initTables(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('GUEST', 'CLIENT', 'PROFESSIONAL', 'ADMIN')),
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING', 'SUSPENDED')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS client_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      full_name TEXT NOT NULL,
      company_name TEXT,
      avatar_url TEXT,
      phone TEXT,
      country TEXT NOT NULL DEFAULT 'India',
      bio TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon_name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS professional_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      username TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      title TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT 'India',
      hourly_rate REAL NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'INR' CHECK (currency IN ('INR', 'USD')),
      experience_years INTEGER NOT NULL DEFAULT 1,
      bio TEXT NOT NULL,
      avatar_url TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      verification_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
      membership_status TEXT NOT NULL DEFAULT 'INACTIVE' CHECK (membership_status IN ('INACTIVE', 'ACTIVE', 'EXPIRED')),
      membership_expires_at TEXT,
      github_url TEXT,
      linkedin_url TEXT,
      website_url TEXT,
      rating_avg REAL NOT NULL DEFAULT 5.0,
      review_count INTEGER NOT NULL DEFAULT 0,
      completed_projects_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS professional_skills (
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      skill_id TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      is_primary INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (professional_id, skill_id)
    );

    CREATE TABLE IF NOT EXISTS portfolio_projects (
      id TEXT PRIMARY KEY,
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
      description TEXT NOT NULL,
      workflow_steps TEXT, -- JSON Array of steps
      technologies TEXT NOT NULL, -- JSON Array
      live_url TEXT,
      github_url TEXT,
      images TEXT NOT NULL, -- JSON Array
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      delivery_days INTEGER NOT NULL DEFAULT 7,
      starting_price REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR' CHECK (currency IN ('INR', 'USD')),
      revisions INTEGER NOT NULL DEFAULT 2
    );

    CREATE TABLE IF NOT EXISTS verification_requests (
      id TEXT PRIMARY KEY,
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      id_document_type TEXT NOT NULL,
      id_document_url TEXT NOT NULL,
      portfolio_links TEXT NOT NULL, -- JSON Array
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
      reviewer_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      reviewed_at TEXT,
      rejection_reason TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS memberships (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plan_name TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL CHECK (currency IN ('INR', 'USD')),
      duration_days INTEGER NOT NULL DEFAULT 365,
      started_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('INACTIVE', 'ACTIVE', 'EXPIRED')),
      terms_version TEXT NOT NULL,
      terms_accepted_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
      budget_min REAL NOT NULL,
      budget_max REAL NOT NULL,
      currency TEXT NOT NULL CHECK (currency IN ('INR', 'USD')),
      timeline TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('DRAFT', 'OPEN', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'CANCELLED')),
      preferred_professional_id TEXT REFERENCES professional_profiles(id) ON DELETE SET NULL,
      assigned_professional_id TEXT REFERENCES professional_profiles(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      project_title TEXT NOT NULL,
      message TEXT NOT NULL,
      budget REAL NOT NULL,
      currency TEXT NOT NULL CHECK (currency IN ('INR', 'USD')),
      timeline TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'VIEWED', 'RESPONDED', 'NEGOTIATING', 'HIRED', 'COMPLETED', 'CANCELLED', 'CLOSED')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      enquiry_id TEXT REFERENCES enquiries(id) ON DELETE SET NULL,
      project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
      client_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      last_message TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      sender_role TEXT NOT NULL,
      content TEXT NOT NULL,
      attachments TEXT, -- JSON
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS project_activities (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      actor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      status_change_to TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      project_id TEXT UNIQUE NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      client_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      professional_id TEXT NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      written_review TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('PUBLISHED', 'FLAGGED', 'REMOVED')),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
      type TEXT NOT NULL CHECK (type IN ('MEMBERSHIP', 'PROJECT_MILESTONE', 'PLATFORM_FEE')),
      amount REAL NOT NULL,
      currency TEXT NOT NULL CHECK (currency IN ('INR', 'USD')),
      status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('INITIATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED', 'CANCELLED')),
      provider TEXT NOT NULL,
      provider_transaction_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      completed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS platform_fees (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      gross_amount REAL NOT NULL,
      fee_percentage REAL NOT NULL,
      fee_amount REAL NOT NULL,
      professional_net_amount REAL NOT NULL,
      currency TEXT NOT NULL CHECK (currency IN ('INR', 'USD')),
      status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COLLECTED', 'REFUNDED')),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      link_url TEXT,
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      actor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      details TEXT NOT NULL, -- JSON
      ip_address TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS system_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL, -- JSON or string
      description TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS professional_agreements (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      professional_id TEXT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      platform_fee_percent REAL NOT NULL DEFAULT 20.0,
      terms_version TEXT NOT NULL DEFAULT '2026.2',
      signature_type TEXT NOT NULL DEFAULT 'DRAWN',
      signature_data TEXT NOT NULL,
      agreed_to_terms INTEGER NOT NULL DEFAULT 1,
      agreed_to_escrow INTEGER NOT NULL DEFAULT 1,
      agreed_to_anti_circumvention INTEGER NOT NULL DEFAULT 1,
      ip_address TEXT,
      signed_at TEXT NOT NULL
    );

    -- Indices for high performance
    CREATE INDEX IF NOT EXISTS idx_professional_profiles_featured ON professional_profiles(is_featured);
    CREATE INDEX IF NOT EXISTS idx_professional_profiles_username ON professional_profiles(username);
    CREATE INDEX IF NOT EXISTS idx_portfolio_professional ON portfolio_projects(professional_id);
    CREATE INDEX IF NOT EXISTS idx_enquiries_professional ON enquiries(professional_id);
    CREATE INDEX IF NOT EXISTS idx_enquiries_client ON enquiries(client_id);
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
    CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
    CREATE INDEX IF NOT EXISTS idx_agreements_user ON professional_agreements(user_id);
  `);
}

// Database Query Helpers
export function query<T = any>(sql: string, params: any[] = []): T[] {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  return stmt.all(...params) as T[];
}

export function queryOne<T = any>(sql: string, params: any[] = []): T | null {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  const result = stmt.get(...params);
  return (result as T) || null;
}

export function execute(sql: string, params: any[] = []): { changes: number; lastInsertRowid: number | bigint } {
  const db = getDatabase();
  const stmt = db.prepare(sql);
  const info = stmt.run(...params);
  return {
    changes: info.changes,
    lastInsertRowid: info.lastInsertRowid,
  };
}
