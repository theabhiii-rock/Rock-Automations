export type UserRole = 'GUEST' | 'CLIENT' | 'PROFESSIONAL' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';
export type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';
export type MembershipStatus = 'INACTIVE' | 'ACTIVE' | 'EXPIRED';
export type Currency = 'INR' | 'USD';
export type ProjectStatus = 'DRAFT' | 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED' | 'CANCELLED';
export type EnquiryStatus = 'NEW' | 'VIEWED' | 'RESPONDED' | 'NEGOTIATING' | 'HIRED' | 'COMPLETED' | 'CANCELLED' | 'CLOSED';
export type PaymentStatus = 'INITIATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'CANCELLED';
export type PaymentType = 'MEMBERSHIP' | 'PROJECT_MILESTONE' | 'PLATFORM_FEE';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface ClientProfile {
  id: string;
  user_id: string;
  full_name: string;
  company_name?: string;
  avatar_url?: string;
  phone?: string;
  country: string;
  bio?: string;
  created_at: string;
}

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  title: string;
  country: string;
  hourly_rate: number;
  currency: Currency;
  experience_years: number;
  bio: string;
  avatar_url?: string;
  is_featured: boolean;
  verification_status: VerificationStatus;
  membership_status: MembershipStatus;
  membership_expires_at?: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  rating_avg: number;
  review_count: number;
  completed_projects_count: number;
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  category_id: string;
  name: string;
  slug: string;
}

export interface WorkflowStep {
  step: number;
  label: string;
  description: string;
  tools?: string[];
}

export interface PortfolioProject {
  id: string;
  professional_id: string;
  title: string;
  slug: string;
  category_id?: string;
  category_name?: string;
  description: string;
  workflow_steps?: WorkflowStep[];
  technologies: string[];
  live_url?: string;
  github_url?: string;
  images: string[];
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  professional_id: string;
  title: string;
  description: string;
  delivery_days: number;
  starting_price: number;
  currency: Currency;
  revisions: number;
}

export interface VerificationRequest {
  id: string;
  professional_id: string;
  id_document_type: string;
  id_document_url: string;
  portfolio_links: string[];
  notes?: string;
  status: VerificationStatus;
  reviewer_id?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  created_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  currency: Currency;
  duration_days: number;
  started_at: string;
  expires_at: string;
  status: MembershipStatus;
  terms_version: string;
  terms_accepted_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category_id: string;
  category_name?: string;
  budget_min: number;
  budget_max: number;
  currency: Currency;
  timeline: string;
  status: ProjectStatus;
  preferred_professional_id?: string;
  assigned_professional_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  client_id: string;
  professional_id: string;
  client_name: string;
  client_email: string;
  project_title: string;
  message: string;
  budget: number;
  currency: Currency;
  timeline: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  enquiry_id?: string;
  project_id?: string;
  client_id: string;
  professional_id: string;
  client_name?: string;
  professional_name?: string;
  last_message?: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_role: UserRole;
  content: string;
  attachments?: string[];
  is_read: boolean;
  created_at: string;
}

export interface ProjectActivity {
  id: string;
  project_id: string;
  title: string;
  description: string;
  actor_id: string;
  status_change_to?: ProjectStatus;
  created_at: string;
}

export interface Review {
  id: string;
  project_id: string;
  client_id: string;
  client_name?: string;
  professional_id: string;
  rating: number;
  written_review: string;
  status: 'PUBLISHED' | 'FLAGGED' | 'REMOVED';
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  project_id?: string;
  type: PaymentType;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  provider: string;
  provider_transaction_id: string;
  created_at: string;
  completed_at?: string;
}

export interface PlatformFee {
  id: string;
  project_id: string;
  gross_amount: number;
  fee_percentage: number;
  fee_amount: number;
  professional_net_amount: number;
  currency: Currency;
  status: 'PENDING' | 'COLLECTED' | 'REFUNDED';
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface SystemSettings {
  platform_name: string;
  membership_price_inr: number;
  membership_price_usd: number;
  membership_duration_days: number;
  platform_fee_percent: number;
  auto_approve_professionals: boolean;
  require_verification_documents: boolean;
  contact_email: string;
  terms_version: string;
}
