import { getDatabase, execute, queryOne } from './db';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  const db = getDatabase();

  // Check if already seeded
  const existingUser = queryOne('SELECT id FROM users LIMIT 1');
  if (existingUser) {
    return; // Already initialized
  }

  console.log('Seeding initial platform data...');
  const now = new Date().toISOString();
  const defaultPasswordHash = await bcrypt.hash('Password123!', 10);
  const adminPasswordHash = await bcrypt.hash('AdminSecure123!', 10);

  // 1. System Settings
  const settings = [
    { key: 'platform_name', value: 'ABHISHEK KUMAR • AI & Digital Talent Platform', description: 'Platform Brand Name' },
    { key: 'membership_price_inr', value: '7000', description: 'Professional Membership Fee in INR' },
    { key: 'membership_price_usd', value: '70', description: 'Professional Membership Fee in USD' },
    { key: 'membership_duration_days', value: '365', description: 'Membership validity in days' },
    { key: 'platform_fee_percent', value: '20', description: 'Platform Success Fee percentage' },
    { key: 'auto_approve_professionals', value: 'false', description: 'Require admin review for new professionals' },
    { key: 'require_verification_documents', value: 'true', description: 'Require identity / portfolio proof for verification' },
    { key: 'contact_email', value: 'contact@abhishekkumar.ai', description: 'Platform Support & Inquiries Email' },
    { key: 'terms_version', value: '2026.1', description: 'Active Terms & Conditions Version' },
  ];

  for (const s of settings) {
    execute('INSERT OR REPLACE INTO system_settings (key, value, description, updated_at) VALUES (?, ?, ?, ?)', [
      s.key,
      s.value,
      s.description,
      now,
    ]);
  }

  // 2. Categories
  const categories = [
    { id: 'cat_ai', slug: 'ai-engineers', name: 'AI Engineers', description: 'Large Language Models, AI Agents, Autonomous Systems, and RAG architectures.', icon_name: 'Bot', sort_order: 1 },
    { id: 'cat_dev', slug: 'software-developers', name: 'Software Developers', description: 'Backend architectures, scalable microservices, APIs, and systems engineering.', icon_name: 'Code2', sort_order: 2 },
    { id: 'cat_web', slug: 'web-developers', name: 'Web Developers', description: 'Production Next.js, React, Tailwind CSS, and full-stack responsive web applications.', icon_name: 'Globe', sort_order: 3 },
    { id: 'cat_mobile', slug: 'mobile-app-developers', name: 'Mobile App Developers', description: 'Native and cross-platform Android & iOS engineering (React Native, Flutter, Kotlin).', icon_name: 'Smartphone', sort_order: 4 },
    { id: 'cat_auto', slug: 'ai-automation', name: 'AI Automation Specialists', description: 'Autonomous workflow pipelines, n8n, Make, CRM integrations, and bot engineering.', icon_name: 'Cpu', sort_order: 5 },
    { id: 'cat_agents', slug: 'ai-agent-developers', name: 'AI Agent Developers', description: 'Autonomous multi-agent architectures, reasoning loops, tool-calling pipelines.', icon_name: 'Layers', sort_order: 6 },
    { id: 'cat_saas', slug: 'saas-developers', name: 'SaaS Developers', description: 'Full-cycle micro-SaaS creation, subscription billing, multi-tenant databases.', icon_name: 'Boxes', sort_order: 7 },
    { id: 'cat_design', slug: 'ui-ux-designers', name: 'UI/UX Designers', description: 'High-conversion design systems, mobile app interfaces, and responsive web UX.', icon_name: 'Palette', sort_order: 8 },
    { id: 'cat_video', slug: 'video-editors', name: 'Video Editors', description: 'Short-form viral reels, YouTube storytelling, AI dubbing, and kinetic typography.', icon_name: 'Video', sort_order: 9 },
    { id: 'cat_social', slug: 'social-media-automation', name: 'Social Media Automation', description: 'Automated lead acquisition, social discovery, and programmatic outreach systems.', icon_name: 'Share2', sort_order: 10 },
    { id: 'cat_seo', slug: 'seo-specialists', name: 'SEO Specialists', description: 'Programmatic SEO, structured schema data, technical search engine visibility.', icon_name: 'Search', sort_order: 11 },
    { id: 'cat_graphics', slug: 'graphic-designers', name: 'Graphic Designers', description: 'Luxury brand identity, vector assets, and digital marketing graphics.', icon_name: 'PenTool', sort_order: 12 },
    { id: 'cat_content', slug: 'content-creators', name: 'Content Creators', description: 'Technical whitepapers, video scripting, and technical product documentation.', icon_name: 'FileText', sort_order: 13 },
  ];

  for (const c of categories) {
    execute(
      'INSERT OR REPLACE INTO categories (id, slug, name, description, icon_name, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [c.id, c.slug, c.name, c.description, c.icon_name, c.sort_order]
    );
  }

  // 3. Skills
  const skillsData = [
    { id: 'sk_1', cat: 'cat_ai', name: 'AI Agents', slug: 'ai-agents' },
    { id: 'sk_2', cat: 'cat_ai', name: 'Autonomous Workflows', slug: 'autonomous-workflows' },
    { id: 'sk_3', cat: 'cat_ai', name: 'RAG & Vector DBs', slug: 'rag-vector-dbs' },
    { id: 'sk_4', cat: 'cat_ai', name: 'Prompt Engineering', slug: 'prompt-engineering' },
    { id: 'sk_5', cat: 'cat_ai', name: 'PyTorch / ML', slug: 'pytorch-ml' },
    { id: 'sk_6', cat: 'cat_dev', name: 'Python', slug: 'python' },
    { id: 'sk_7', cat: 'cat_dev', name: 'FastAPI', slug: 'fastapi' },
    { id: 'sk_8', cat: 'cat_dev', name: 'Node.js', slug: 'nodejs' },
    { id: 'sk_9', cat: 'cat_web', name: 'Next.js', slug: 'nextjs' },
    { id: 'sk_10', cat: 'cat_web', name: 'TypeScript', slug: 'typescript' },
    { id: 'sk_11', cat: 'cat_web', name: 'Tailwind CSS', slug: 'tailwind-css' },
    { id: 'sk_12', cat: 'cat_mobile', name: 'Android / Kotlin', slug: 'android-kotlin' },
    { id: 'sk_13', cat: 'cat_mobile', name: 'React Native', slug: 'react-native' },
    { id: 'sk_14', cat: 'cat_auto', name: 'n8n Automation', slug: 'n8n-automation' },
    { id: 'sk_15', cat: 'cat_auto', name: 'Make.com', slug: 'make-com' },
    { id: 'sk_16', cat: 'cat_design', name: 'Figma', slug: 'figma' },
    { id: 'sk_17', cat: 'cat_design', name: 'Design Systems', slug: 'design-systems' },
    { id: 'sk_18', cat: 'cat_video', name: 'Premiere Pro', slug: 'premiere-pro' },
    { id: 'sk_19', cat: 'cat_video', name: 'AI Dubbing & Voice', slug: 'ai-dubbing-voice' },
  ];

  for (const s of skillsData) {
    execute('INSERT OR REPLACE INTO skills (id, category_id, name, slug) VALUES (?, ?, ?, ?)', [
      s.id,
      s.cat,
      s.name,
      s.slug,
    ]);
  }

  // 4. Admin User
  execute(
    `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
     VALUES ('usr_admin', 'admin@platform.com', ?, 'ADMIN', 'ACTIVE', ?, ?)`,
    [adminPasswordHash, now, now]
  );

  // 5. Abhishek Kumar (Founder & Featured AI Engineer Profile)
  execute(
    `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
     VALUES ('usr_abhishek', 'abhishek@platform.com', ?, 'PROFESSIONAL', 'ACTIVE', ?, ?)`,
    [defaultPasswordHash, now, now]
  );

  execute(
    `INSERT INTO professional_profiles (
      id, user_id, username, full_name, title, country, hourly_rate, currency,
      experience_years, bio, avatar_url, is_featured, verification_status,
      membership_status, membership_expires_at, linkedin_url, rating_avg,
      review_count, completed_projects_count, created_at
    ) VALUES (
      'pro_abhishek', 'usr_abhishek', 'abhishek', 'Abhishek Kumar',
      'AI Engineer • Product Builder • Automation Architect', 'India',
      65, 'USD', 5,
      'I build practical AI applications, automation systems, websites, SaaS products and intelligent software solutions — from idea to production. Specializing in end-to-end multi-agent architectures, media generation pipelines, and high-performance full-stack platforms.',
      '/images/abhishek-kumar.png',
      1, 'VERIFIED', 'ACTIVE', '2030-01-01T00:00:00.000Z',
      'https://linkedin.com/in/abhishek-kumar-527921384',
      5.0, 14, 28, ?
    )`,
    [now]
  );

  // Link Skills for Abhishek
  const abhishekSkills = ['sk_1', 'sk_2', 'sk_3', 'sk_6', 'sk_7', 'sk_9', 'sk_10', 'sk_14'];
  for (const sk of abhishekSkills) {
    execute('INSERT OR IGNORE INTO professional_skills (professional_id, skill_id, is_primary) VALUES (?, ?, 1)', [
      'pro_abhishek',
      sk,
    ]);
  }

  // Abhishek's Detailed Portfolio Projects with multi-step workflows
  const abhishekProjects = [
    {
      id: 'proj_paisawise_studio',
      pro_id: 'pro_abhishek',
      title: 'PaisaWise Studio — Telegram SaaS Bot & Video Engine',
      slug: 'paisawise-studio-saas-telegram-bot',
      cat_id: 'cat_auto',
      desc: 'Autonomous Telegram SaaS bot and content studio for high-velocity video production, viral idea generation, automated thumbnail creation, multilingual AI dubbing, video editing, and credit billing. Built with direct Telegram Bot API, GPU cloud rendering, and viral retention algorithms.',
      steps: JSON.stringify([
        { step: 1, label: 'TOPIC & VIRAL RADAR', description: 'Write any topic or select high-retention concepts from curated viral idea galleries.' },
        { step: 2, label: 'AI EDITING & DUBBING', description: 'Automated video editing, trimming, voiceover replacement, and multilingual dubbing.' },
        { step: 3, label: 'DYNAMIC THUMBNAIL ENGINE', description: 'High-contrast CTR-optimized thumbnail generation tailored for Shorts, Reels, and TikTok.' },
        { step: 4, label: 'SAAS CREDITS & BILLING', description: 'Integrated wallet, daily bonus rewards, credit purchases, and automated referral monetization.' },
      ]),
      techs: JSON.stringify(['Telegram Bot API', 'Python', 'FFmpeg', 'AI Dubbing', 'Whisper', 'Thumbnail Engine', 'Stripe/UPI Payments', 'Cloud GPU']),
      images: JSON.stringify(['/images/thumb-paisawise-studio.jpg', '/images/project-paisawise-studio.png']),
      live_url: 'https://t.me/PaisaWise_bot',
      featured: 1,
      sort: 1,
    },
    {
      id: 'proj_shubhaangi',
      pro_id: 'pro_abhishek',
      title: 'SHUBHAANGI — "The Ultimate Bride" Luxury Couture E-Commerce & Studio OS',
      slug: 'shubhaangi-ultimate-bride-luxury-couture',
      cat_id: 'cat_web',
      desc: 'Bespoke luxury bridal fashion platform featuring high-conversion rental/purchase commerce, paired with an Executive Studio Operating System. Tracks gross revenue, active rentals, overdue returns, and instant WhatsApp booking routing.',
      steps: JSON.stringify([
        { step: 1, label: 'LUXURY COUTURE STOREFRONT', description: 'Curated bridal catalog with dual Rent & Buy pricing models, high-res lookbook, and direct WhatsApp styling consultations.' },
        { step: 2, label: 'EXECUTIVE STUDIO OS', description: 'Real-time business intelligence tracking ₹1.48L+ revenue, active bridal rentals, and calendar reservations.' },
        { step: 3, label: 'OVERDUE RETURN TRACKER', description: 'Automated alert system flagging overdue garment returns with security deposit recalculation.' },
        { step: 4, label: 'CRM & WHATSAPP DISPATCH', description: '1-click customer relationship manager connecting staff directly to brides via personalized WhatsApp links.' },
      ]),
      techs: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Business Intelligence OS', 'WhatsApp Commerce API', 'PostgreSQL/SQLite']),
      images: JSON.stringify(['/images/thumb-shubhaangi-couture.jpg', '/images/project-shubhaangi-store.png', '/images/project-shubhaangi-dashboard.png']),
      live_url: null,
      featured: 1,
      sort: 2,
    },
    {
      id: 'proj_aditi_voice_assistant',
      pro_id: 'pro_abhishek',
      title: 'Aditi — AI Personal Voice & Desktop Assistant',
      slug: 'aditi-ai-personal-voice-assistant',
      cat_id: 'cat_ai',
      desc: 'Custom-built multimodal AI desktop assistant equipped with wake-word detection ("Oye Aditi"), local & cloud LLM reasoning, sub-300ms neural voice synthesis, OS system control, browser automation, and Android bridge integration.',
      steps: JSON.stringify([
        { step: 1, label: 'WAKE-WORD & VOICE INTAKE', description: '"Oye Aditi" continuous acoustic hotword listener with streaming Whisper voice transcription.' },
        { step: 2, label: 'INTENT CLASSIFIER', description: 'Dual-mode local/cloud LLM routing conversational queries vs. direct OS system actions.' },
        { step: 3, label: 'SYSTEM AUTOMATION', description: 'Native Windows API hooks for app launching (VS Code, Chrome), folder creation, and screenshots.' },
        { step: 4, label: 'ANDROID & CLOUD BRIDGE', description: 'Cross-device connectivity syncing mobile state, notifications, and telemetry.' },
      ]),
      techs: JSON.stringify(['Python', 'Whisper', 'Edge-TTS', 'Windows 11 API', 'Local LLM', 'Android Bridge']),
      images: JSON.stringify(['/images/aditi-voice-assistant.jpg']),
      live_url: null,
      featured: 1,
      sort: 3,
    },
    {
      id: 'proj_aviator_predictor',
      pro_id: 'pro_abhishek',
      title: 'Aviator Royal Predictor & Crash Game Suite',
      slug: 'aviator-royal-predictor-crash-game',
      cat_id: 'cat_web',
      desc: 'High-concurrency full-stack crash game simulation engine and real-time multiplier prediction platform. Features dynamic mathematical curve plotting, live cash-out probability algorithms, WebSocket state synchronization, and instant cloud distribution.',
      steps: JSON.stringify([
        { step: 1, label: 'MULTIPLIER CURVE ENGINE', description: 'Mathematical trajectory generator computing live multiplier velocity and crash points.' },
        { step: 2, label: 'WEBSOCKET TELEMETRY', description: 'Sub-50ms duplex streaming between server engine and connected mobile/web clients.' },
        { step: 3, label: 'CASH-OUT RISK MODEL', description: 'Real-time exit signals and probability triggers from 1.25x to 10.00x+.' },
        { step: 4, label: 'RENDER CLOUD APP', description: 'High-availability automated cloud deployment with direct APK/Web distribution.' },
      ]),
      techs: JSON.stringify(['Node.js', 'React Native / Web', 'WebSocket', 'Tailwind CSS', 'Render Cloud', 'Python']),
      images: JSON.stringify(['/images/aviator-predictor-game.jpg']),
      live_url: 'https://royal-app-b0qz.onrender.com/download',
      featured: 1,
      sort: 4,
    },
    {
      id: 'proj_video_pipe',
      pro_id: 'pro_abhishek',
      title: 'AI Video Automation Pipeline',
      slug: 'ai-video-automation-pipeline',
      cat_id: 'cat_auto',
      desc: 'An end-to-end automated content production workflow engineered to eliminate repetitive manual video editing. Automatically turns conceptual inputs into polished, synchronized, subtitled, and quality-controlled broadcast renders ready for multi-platform distribution.',
      steps: JSON.stringify([
        { step: 1, label: 'IDEA', description: 'Topic intake and conceptual framing from trend radar or editorial prompts.' },
        { step: 2, label: 'RESEARCH', description: 'Automated regulatory & fact extraction from verified knowledge bases.' },
        { step: 3, label: 'SCRIPT', description: 'Structured pacing, hook formulation, and retention cadence generation.' },
        { step: 4, label: 'VOICE', description: 'Neural speech synthesis with human breathing micro-pauses and broadcast mastering.' },
        { step: 5, label: 'SCENE DETECTION', description: 'Semantic voice-to-visual analysis splitting narration into motivated scene chunks.' },
        { step: 6, label: 'B-ROLL', description: 'Automated retrieval of semantic high-definition footage matching spoken concepts.' },
        { step: 7, label: 'AUTO EDIT', description: 'Precision multi-track assembly, J-cuts, L-cuts, and motivated pacing control.' },
        { step: 8, label: 'CAPTIONS', description: 'Word-level millisecond timing alignment with animated keyword emphasis.' },
        { step: 9, label: 'MUSIC + SFX', description: 'Smart sidechain ducking (-24dB during dialogue) and motivated acoustic accents.' },
        { step: 10, label: 'THUMBNAIL', description: 'Automated visual hook compositing with high-contrast text layering.' },
        { step: 11, label: 'QUALITY CONTROL', description: 'Automated audio loudness (-15.0 LUFS) and visual continuity validation.' },
        { step: 12, label: 'EXPORT', description: 'Hardware-accelerated rendering in multiple aspect ratios (9:16 and 16:9).' },
        { step: 13, label: 'SEO', description: 'Dynamic title, description, chapters, and keyword metadata generation.' },
      ]),
      techs: JSON.stringify(['Python', 'FastAPI', 'FFmpeg', 'Edge-TTS', 'Whisper', 'ComfyUI', 'React']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1000',
        '/images/project-video-pipeline-ui.jpg',
      ]),
      featured: 1,
      sort: 5,
    },
    {
      id: 'proj_social_auto',
      pro_id: 'pro_abhishek',
      title: 'Social Media Automation System',
      slug: 'social-media-automation',
      cat_id: 'cat_social',
      desc: 'An intelligent enterprise lead acquisition and outreach engine that systematically analyzes geographic target zones, extracts business entities, qualifies conversion potential, and crafts personalized outreach campaigns.',
      steps: JSON.stringify([
        { step: 1, label: 'LOCATION', description: 'Geographic and demographic parameter targeting.' },
        { step: 2, label: 'BUSINESS DISCOVERY', description: 'Programmatic discovery of local commercial entities and active listings.' },
        { step: 3, label: 'BUSINESS ANALYSIS', description: 'Deep audit of existing digital presence, reviews, and website gaps.' },
        { step: 4, label: 'LEAD QUALIFICATION', description: 'Scoring potential according to custom ICP (Ideal Customer Profile) metrics.' },
        { step: 5, label: 'MESSAGE GENERATION', description: 'Hyper-personalized context-aware proposal and outreach generation.' },
        { step: 6, label: 'OUTREACH', description: 'Automated multi-channel scheduling with response tracking and CRM sync.' },
      ]),
      techs: JSON.stringify(['Python', 'Selenium', 'LangChain', 'PostgreSQL', 'FastAPI']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
      ]),
      featured: 1,
      sort: 6,
    },
    {
      id: 'proj_telegram_platform',
      pro_id: 'pro_abhishek',
      title: 'AI Telegram Video Platform',
      slug: 'ai-telegram-video-platform',
      cat_id: 'cat_ai',
      desc: 'A complete multi-modal AI Telegram application allowing content creators and agencies to trigger viral video production directly from mobile chat. Features automated reel creation, faceless video orchestration, automated dubbing, captions, and thumbnail generation.',
      steps: JSON.stringify([
        { step: 1, label: 'TELEGRAM BOT INTAKE', description: 'Users submit voice notes, links, or text prompts via bot interface.' },
        { step: 2, label: 'MODAL DISPATCH', description: 'Serverless orchestration dispatching compute jobs across GPU worker clusters.' },
        { step: 3, label: 'DUBBING & SYNCHRONIZATION', description: 'Real-time multi-lingual translation and voice cloning.' },
        { step: 4, label: 'RENDER & DELIVERY', description: 'Immediate mobile delivery back to Telegram chat within minutes.' },
      ]),
      techs: JSON.stringify(['Python Telegram Bot API', 'Asyncio', 'Redis', 'Whisper', 'Docker']),
      images: JSON.stringify([
        '/images/project-telegram-video-platform.jpg',
        '/images/project-paisawise-studio.png',
      ]),
      featured: 1,
      sort: 7,
    },
    {
      id: 'proj_ai_apps',
      pro_id: 'pro_abhishek',
      title: 'Autonomous Multi-Agent Enterprise Suite',
      slug: 'autonomous-multi-agent-suite',
      cat_id: 'cat_agents',
      desc: 'Production-grade agentic workflow platform coordinating autonomous specialized agents (Research Agent, Code Generator, Auditor) to execute complex engineering tasks with tool-calling capabilities and verifiable guardrails.',
      steps: JSON.stringify([
        { step: 1, label: 'INTENT CLASSIFICATION', description: 'Decomposes complex requests into structured sub-agent DAGs.' },
        { step: 2, label: 'TOOL EXECUTION', description: 'Agents call secure sandboxed tools for web search, code execution, and data retrieval.' },
        { step: 3, label: 'CRITIC VERIFICATION', description: 'Deterministic peer verification ensuring factual accuracy and code safety.' },
      ]),
      techs: JSON.stringify(['TypeScript', 'Next.js', 'FastAPI', 'LangGraph', 'SQLite', 'Docker']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      ]),
      featured: 1,
      sort: 8,
    },
    {
      id: 'proj_web_apps',
      pro_id: 'pro_abhishek',
      title: 'High-Performance Full-Stack Web Platforms',
      slug: 'high-performance-full-stack-platforms',
      cat_id: 'cat_web',
      desc: 'Selected responsive web applications and SaaS platforms built with Next.js App Router, Tailwind CSS, high-velocity relational schemas, and mobile-ready REST APIs engineered for seamless multi-platform scaling.',
      steps: null,
      techs: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'REST API']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
      ]),
      featured: 1,
      sort: 9,
    },
  ];

  for (const p of abhishekProjects) {
    execute(
      `INSERT OR REPLACE INTO portfolio_projects (
        id, professional_id, title, slug, category_id, description,
        workflow_steps, technologies, images, live_url, featured, sort_order, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.pro_id, p.title, p.slug, p.cat_id, p.desc, p.steps, p.techs, p.images, p.live_url || null, p.featured, p.sort, now]
    );
  }

  // Abhishek's Services
  const abhishekServices = [
    {
      id: 'srv_1',
      pro_id: 'pro_abhishek',
      title: 'Autonomous AI Workflow Architecture',
      desc: 'Design and deployment of custom agentic pipelines, RAG systems, and autonomous data extraction workflows.',
      days: 14,
      price: 1500,
      currency: 'USD',
    },
    {
      id: 'srv_2',
      pro_id: 'pro_abhishek',
      title: 'Automated Content & Media Generation Engine',
      desc: 'End-to-end automated video, audio, and social media production pipeline tailored to your brand.',
      days: 21,
      price: 2400,
      currency: 'USD',
    },
    {
      id: 'srv_3',
      pro_id: 'pro_abhishek',
      title: 'Full-Stack Next.js + AI Application',
      desc: 'Complete production web application with modern luxury tech UI, responsive design, and robust API.',
      days: 30,
      price: 3200,
      currency: 'USD',
    },
  ];

  for (const s of abhishekServices) {
    execute(
      `INSERT OR REPLACE INTO services (id, professional_id, title, description, delivery_days, starting_price, currency)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [s.id, s.pro_id, s.title, s.desc, s.days, s.price, s.currency]
    );
  }

  // 6. Additional Marketplace Professionals
  const marketPros = [
    {
      userId: 'usr_marcus',
      email: 'marcus@example.com',
      username: 'marcus_vance',
      name: 'Marcus Vance',
      title: 'Senior AI Agent & LangGraph Engineer',
      country: 'United Kingdom',
      rate: 75,
      currency: 'USD',
      exp: 7,
      bio: 'Specializing in robust LangGraph agent loops, multi-tool architectures, and automated customer operations with production latency guarantees.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      status: 'VERIFIED',
      rating: 4.9,
      reviews: 11,
      completed: 18,
      cat: 'cat_agents',
      skills: ['sk_1', 'sk_6', 'sk_7'],
    },
    {
      userId: 'usr_priya',
      email: 'priya@example.com',
      username: 'priya_sharma',
      name: 'Priya Sharma',
      title: 'Full-Stack SaaS & Next.js Engineer',
      country: 'India',
      rate: 3500,
      currency: 'INR',
      exp: 6,
      bio: 'I architect scalable SaaS products using Next.js App Router, Tailwind CSS, PostgreSQL, and tokenized billing gateways.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      status: 'VERIFIED',
      rating: 5.0,
      reviews: 9,
      completed: 14,
      cat: 'cat_web',
      skills: ['sk_9', 'sk_10', 'sk_11'],
    },
    {
      userId: 'usr_david',
      email: 'david@example.com',
      username: 'david_chen',
      name: 'David Chen',
      title: 'Enterprise AI Automation & n8n Specialist',
      country: 'Singapore',
      rate: 55,
      currency: 'USD',
      exp: 5,
      bio: 'I connect fragmented enterprise tooling into self-healing, automated workflows using n8n, Make, custom webhooks, and LLM classification.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      status: 'VERIFIED',
      rating: 4.8,
      reviews: 7,
      completed: 12,
      cat: 'cat_auto',
      skills: ['sk_14', 'sk_15', 'sk_6'],
    },
    {
      userId: 'usr_elena',
      email: 'elena@example.com',
      username: 'elena_rostova',
      name: 'Elena Rostova',
      title: 'FinTech & AI Product UI/UX Designer',
      country: 'Germany',
      rate: 60,
      currency: 'USD',
      exp: 8,
      bio: 'Creating high-fidelity, accessible, and conversion-optimized interfaces for AI tools, FinTech dashboards, and developer products.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      status: 'VERIFIED',
      rating: 5.0,
      reviews: 15,
      completed: 22,
      cat: 'cat_design',
      skills: ['sk_16', 'sk_17'],
    },
    {
      userId: 'usr_arjun',
      email: 'arjun@example.com',
      username: 'arjun_motion',
      name: 'Arjun Patel',
      title: 'Short-Form Video Editor & Viral Storyteller',
      country: 'India',
      rate: 2200,
      currency: 'INR',
      exp: 4,
      bio: 'High-energy kinetic typography, sound design, and retention-optimized pacing for tech startups and creator brands.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
      status: 'VERIFIED',
      rating: 4.9,
      reviews: 8,
      completed: 16,
      cat: 'cat_video',
      skills: ['sk_18', 'sk_19'],
    },
    {
      userId: 'usr_sarah',
      email: 'sarah@example.com',
      username: 'sarah_seo',
      name: 'Sarah Jenkins',
      title: 'Programmatic SEO & Content Strategist',
      country: 'United States',
      rate: 65,
      currency: 'USD',
      exp: 5,
      bio: 'Building automated programmatic directory architectures, schema topologies, and content funnels that attract organic customer traffic.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      status: 'PENDING', // Great for testing Admin Verification queue!
      rating: 0,
      reviews: 0,
      completed: 0,
      cat: 'cat_seo',
      skills: ['sk_10'],
    },
  ];

  for (const m of marketPros) {
    execute(
      `INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
       VALUES (?, ?, ?, 'PROFESSIONAL', 'ACTIVE', ?, ?)`,
      [m.userId, m.email, defaultPasswordHash, now, now]
    );

    const proId = 'pro_' + m.username;
    execute(
      `INSERT INTO professional_profiles (
        id, user_id, username, full_name, title, country, hourly_rate, currency,
        experience_years, bio, avatar_url, is_featured, verification_status,
        membership_status, membership_expires_at, rating_avg, review_count,
        completed_projects_count, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 'ACTIVE', '2028-12-31T00:00:00.000Z', ?, ?, ?, ?)`,
      [
        proId,
        m.userId,
        m.username,
        m.name,
        m.title,
        m.country,
        m.rate,
        m.currency,
        m.exp,
        m.bio,
        m.avatar,
        m.status,
        m.rating,
        m.reviews,
        m.completed,
        now,
      ]
    );

    for (const sk of m.skills) {
      execute('INSERT OR IGNORE INTO professional_skills (professional_id, skill_id, is_primary) VALUES (?, ?, 1)', [
        proId,
        sk,
      ]);
    }

    // Add 1 sample portfolio item
    execute(
      `INSERT INTO portfolio_projects (
        id, professional_id, title, slug, category_id, description,
        technologies, images, featured, sort_order, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)`,
      [
        'proj_' + m.username,
        proId,
        `${m.name}'s Featured Project`,
        `${m.username}-showcase`,
        m.cat,
        `Comprehensive implementation demonstrating high-caliber production delivery in ${m.title}.`,
        JSON.stringify(['Production Suite', 'Security Best Practices', 'Monitoring']),
        JSON.stringify(['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800']),
        now,
      ]
    );

    // If pending, add a verification request for admin testing
    if (m.status === 'PENDING') {
      execute(
        `INSERT INTO verification_requests (id, professional_id, id_document_type, id_document_url, portfolio_links, notes, status, created_at)
         VALUES (?, ?, 'Passport', 'https://example.com/docs/passport.pdf', ?, 'Verified 5+ years experience and GitHub repositories.', 'PENDING', ?)`,
        ['ver_sarah', proId, JSON.stringify(['https://github.com/sarah-seo-sample', 'https://sarahjenkins.io']), now]
      );
    }
  }

  // 7. Verified Client Accounts & Reviews (14 Client Partners)
  const clientReviewsData = [
    {
      id: 'rev_1',
      projId: 'proj_rev_1',
      userId: 'usr_client_1',
      fullName: 'Rajesh Mehta',
      company: 'Acme Digital Ventures',
      country: 'India',
      projTitle: 'Automated Lead Qualification Pipeline',
      category: 'cat_auto',
      budget: 80000,
      rating: 5,
      review: 'Abhishek architected an extraordinary automated pipeline for us. Crisp code, clean error handling, and delivered ahead of schedule. Truly top-tier AI engineering.',
      date: '2026-09-18T10:00:00.000Z',
    },
    {
      id: 'rev_2',
      projId: 'proj_rev_2',
      userId: 'usr_client_2',
      fullName: 'Vikramaditya Roy',
      company: 'GrowthEdge Capital',
      country: 'India',
      projTitle: 'Institutional B2B Prospect Discovery Engine',
      category: 'cat_auto',
      budget: 120000,
      rating: 5,
      review: 'Built an automated multi-channel client discovery engine that extracted and filtered 10,000+ targeted B2B prospects. Reduced our manual prospecting time to zero.',
      date: '2026-09-12T14:30:00.000Z',
    },
    {
      id: 'rev_3',
      projId: 'proj_rev_3',
      userId: 'usr_client_3',
      fullName: 'Pooja Singhania',
      company: 'Luxe Salon & Aesthetics Studio',
      country: 'India',
      projTitle: 'Automated Salon Booking & Retention System',
      category: 'cat_auto',
      budget: 45000,
      rating: 5,
      review: 'Our salon appointment bookings shot up by 40% in month one. The automated WhatsApp booking bot handles customer rescheduling effortlessly.',
      date: '2026-09-05T09:15:00.000Z',
    },
    {
      id: 'rev_4',
      projId: 'proj_rev_4',
      userId: 'usr_client_4',
      fullName: 'Karan Malhotra',
      company: 'UrbanPulse Hospitality Group',
      country: 'India',
      projTitle: 'Multi-Outlet Review & Reputation Engine',
      category: 'cat_auto',
      budget: 65000,
      rating: 5,
      review: 'Abhishek created our restaurant group’s reservation system and automated review generator. We went from a 3.4 to a 4.8-star Google rating in 45 days.',
      date: '2026-08-28T16:45:00.000Z',
    },
    {
      id: 'rev_5',
      projId: 'proj_rev_5',
      userId: 'usr_client_5',
      fullName: 'Dr. Ananya Deshmukh',
      company: 'Apex Dental & Orthodontics',
      country: 'India',
      projTitle: 'Clinic Appointment & No-Show Reduction Pipeline',
      category: 'cat_auto',
      budget: 50000,
      rating: 5,
      review: 'Eliminated patient no-shows completely. Automated WhatsApp reminders and calendar sync run smoothly without any staff intervention. Exceptional work.',
      date: '2026-08-19T11:20:00.000Z',
    },
    {
      id: 'rev_6',
      projId: 'proj_rev_6',
      userId: 'usr_client_6',
      fullName: 'Siddharth Varma',
      company: 'FitMatrix Gyms & Fitness Centers',
      country: 'India',
      projTitle: 'Membership Renewal & Attendance Cadence System',
      category: 'cat_auto',
      budget: 55000,
      rating: 5,
      review: 'The gym membership follow-up sequences brought in 80+ renewals and new members in under 3 weeks. Abhishek is the most reliable automation engineer I have worked with.',
      date: '2026-08-11T13:00:00.000Z',
    },
    {
      id: 'rev_7',
      projId: 'proj_rev_7',
      userId: 'usr_client_7',
      fullName: 'Neha Chawla',
      company: 'EduSphere Coaching & Test Prep',
      country: 'India',
      projTitle: 'Student Lead Funnel & Automated Outreach',
      category: 'cat_auto',
      budget: 60000,
      rating: 5,
      review: 'Seamless lead-capture website and instant automated WhatsApp response funnel. Parents receive course brochures instantly, converting inquiries 3x faster.',
      date: '2026-08-01T15:10:00.000Z',
    },
    {
      id: 'rev_8',
      projId: 'proj_rev_8',
      userId: 'usr_client_8',
      fullName: 'Rohan Kapoor',
      company: 'AeroLogix Supply Chain Solutions',
      country: 'India',
      projTitle: 'End-to-End Logistics Notification DAG',
      category: 'cat_auto',
      budget: 95000,
      rating: 5,
      review: 'Engineered a custom n8n workflow synchronizing shipping milestones across our CRM, database, and customer WhatsApp notifications. Zero downtime since launch.',
      date: '2026-07-22T10:45:00.000Z',
    },
    {
      id: 'rev_9',
      projId: 'proj_rev_9',
      userId: 'usr_client_9',
      fullName: 'Meera Nambiar',
      company: 'Indus Craft Collective',
      country: 'India',
      projTitle: 'Direct-to-Consumer Digital Store & Automation',
      category: 'cat_web',
      budget: 85000,
      rating: 5,
      review: 'High-performance Next.js store with automated checkout reminders and order tracking. Our abandoned cart recovery increased by 35%.',
      date: '2026-07-14T17:30:00.000Z',
    },
    {
      id: 'rev_10',
      projId: 'proj_rev_10',
      userId: 'usr_client_10',
      fullName: 'Amitav Sen',
      company: 'PrimeEstate Realty Advisors',
      country: 'India',
      projTitle: 'Real Estate High-Intent Lead Ingestion Pipeline',
      category: 'cat_auto',
      budget: 110000,
      rating: 5,
      review: 'Google Maps scrapers and automated property inquiry qualifier. Filtered high-net-worth property seekers directly to our sales agents’ WhatsApp.',
      date: '2026-06-30T12:00:00.000Z',
    },
    {
      id: 'rev_11',
      projId: 'proj_rev_11',
      userId: 'usr_client_11',
      fullName: 'Sneha Mukherjee',
      company: 'Aura Health Diagnostics',
      country: 'India',
      projTitle: 'Diagnostic Report WhatsApp Dispatch Architecture',
      category: 'cat_auto',
      budget: 70000,
      rating: 5,
      review: 'Automated lab test report delivery via WhatsApp API with 100% data privacy. Patient feedback has been overwhelmingly positive. Outstanding technical precision.',
      date: '2026-06-18T09:40:00.000Z',
    },
    {
      id: 'rev_12',
      projId: 'proj_rev_12',
      userId: 'usr_client_12',
      fullName: 'Gaurav Tandon',
      company: 'QuickFix Smart Electronics Care',
      country: 'India',
      projTitle: 'Service Workflow & Customer Status Bot',
      category: 'cat_auto',
      budget: 50000,
      rating: 5,
      review: 'Automated repair status notifications, customer feedback capture, and Google reviews. It genuinely transformed our day-to-day operations.',
      date: '2026-06-05T14:15:00.000Z',
    },
    {
      id: 'rev_13',
      projId: 'proj_rev_13',
      userId: 'usr_client_13',
      fullName: 'Tanvi Parekh',
      company: 'Zenith Brand & Creative Agency',
      country: 'India',
      projTitle: 'Programmatic Video Generation Engine',
      category: 'cat_ai',
      budget: 130000,
      rating: 5,
      review: 'Abhishek built an autonomous video rendering pipeline using Node and FFmpeg that generates personalized client videos programmatically. Mind-blowing speed.',
      date: '2026-05-24T16:20:00.000Z',
    },
    {
      id: 'rev_14',
      projId: 'proj_rev_14',
      userId: 'usr_client_14',
      fullName: 'Harshvardhan Joshi',
      company: 'OmniCloud Tech Labs',
      country: 'India',
      projTitle: 'Autonomous Multi-Agent Support Swarm',
      category: 'cat_ai',
      budget: 150000,
      rating: 5,
      review: 'Super clean TypeScript codebase, robust error boundaries, and proactive communication throughout. Abhishek is a rare breed of engineer who understands both deep tech and business ROI.',
      date: '2026-05-10T11:00:00.000Z',
    },
  ];

  for (const cr of clientReviewsData) {
    execute(
      `INSERT OR IGNORE INTO users (id, email, password_hash, role, status, created_at, updated_at)
       VALUES (?, ?, ?, 'CLIENT', 'ACTIVE', ?, ?)`,
      [cr.userId, `${cr.userId}@client.com`, defaultPasswordHash, cr.date, cr.date]
    );

    execute(
      `INSERT OR REPLACE INTO client_profiles (id, user_id, full_name, company_name, country, bio, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [`cp_${cr.userId}`, cr.userId, cr.fullName, cr.company, cr.country, `Client partner at ${cr.company}`, cr.date]
    );

    execute(
      `INSERT OR REPLACE INTO projects (
        id, client_id, title, description, category_id, budget_min, budget_max, currency,
        timeline, status, preferred_professional_id, assigned_professional_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'INR', 'Completed', 'COMPLETED', 'pro_abhishek', 'pro_abhishek', ?, ?)`,
      [cr.projId, cr.userId, cr.projTitle, `Production delivery of ${cr.projTitle} for ${cr.company}.`, cr.category, cr.budget, cr.budget, cr.date, cr.date]
    );

    execute(
      `INSERT OR REPLACE INTO reviews (id, project_id, client_id, professional_id, rating, written_review, status, created_at)
       VALUES (?, ?, ?, 'pro_abhishek', ?, ?, 'PUBLISHED', ?)`,
      [cr.id, cr.projId, cr.userId, cr.rating, cr.review, cr.date]
    );
  }

  // 8. Sample Projects & Enquiries
  execute(
    `INSERT INTO projects (id, client_id, title, description, category_id, budget_min, budget_max, currency, timeline, status, preferred_professional_id, created_at, updated_at)
     VALUES ('proj_client_1', 'usr_client_1', 'Autonomous Customer Support Swarm', 'Build an autonomous multi-agent customer support swarm with tool-calling capabilities to resolve tier-1 queries.', 'cat_ai', 50000, 100000, 'INR', '2-4 weeks', 'IN_PROGRESS', 'pro_abhishek', ?, ?)`,
    [now, now]
  );

  execute(
    `INSERT INTO enquiries (id, client_id, professional_id, client_name, client_email, project_title, message, budget, currency, timeline, status, created_at, updated_at)
     VALUES ('enq_1', 'usr_client_1', 'pro_abhishek', 'Rajesh Mehta', 'client@acmecorp.com', 'Enterprise AI Video Generation Engine', 'Hi Abhishek, we loved your video pipeline demo. Can we discuss building a tailored video generation engine for our agency?', 75000, 'INR', '3 weeks', 'NEGOTIATING', ?, ?)`,
    [now, now]
  );

  // Platform Fee Record for Completed Project (10% Fee Demonstration)
  execute(
    `INSERT INTO platform_fees (id, project_id, gross_amount, fee_percentage, fee_amount, professional_net_amount, currency, status, created_at)
     VALUES ('fee_1', 'proj_rev_1', 100000, 10, 10000, 90000, 'INR', 'COLLECTED', ?)`,
    [now]
  );

  console.log('Database seeded successfully with Abhishek Kumar founder profile, 14 verified reviews, vetted talent, and platform ledger.');
}
