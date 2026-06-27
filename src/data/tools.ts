/* ============================================================
   YAHAVI FORGE — Tool registry
   17 tools across 5 categories.
   ============================================================ */

export interface ToolInput {
  id: string
  label: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  rows?: number
  required?: boolean
  options?: { value: string; label: string }[]
}

export interface ToolChip {
  prefKey: string
  options: { value: string; label: string }[]
}

export interface ToolConfig {
  id: string
  num: string
  title: string
  subtitle: string
  category: string
  categoryId: string
  icon: string
  inputs: ToolInput[]
  chips?: ToolChip
  systemPrompt: (chip?: string) => string
  userPrompt: (inputs: Record<string, string>, chip?: string) => string
  temperature?: number
  maxTokens?: number
  requiresKey: boolean
  freeTier: boolean
  hasPushToResume?: boolean
}

export interface ToolCategory {
  id: string
  label: string
  icon: string
  color: string
}

export const CATEGORIES: ToolCategory[] = [
  { id: 'build',    label: 'BUILD',    icon: '🔨', color: '#FFE500' },
  { id: 'analyze',  label: 'ANALYZE',  icon: '🔍', color: '#B6FF39' },
  { id: 'tailor',   label: 'TAILOR',   icon: '✂️', color: '#FF6B1A' },
  { id: 'outreach', label: 'OUTREACH', icon: '📨', color: '#0A0A0A' },
  { id: 'strategy', label: 'STRATEGY', icon: '🎯', color: '#FF2D78' },
]

export const TOOLS: ToolConfig[] = [
  /* ──────────── BUILD ──────────── */
  {
    id: 'builder', num: '01', title: 'AI Resume Builder',
    subtitle: 'Raw experience → STAR-method achievement bullets',
    category: 'Build', categoryId: 'build', icon: '✦',
    requiresKey: true, freeTier: true, hasPushToResume: true,
    chips: {
      prefKey: 'tone',
      options: [
        { value: 'corporate', label: 'Corporate' },
        { value: 'startup',   label: 'Startup' },
        { value: 'faang',     label: 'FAANG' },
        { value: 'creative',  label: 'Creative' },
        { value: 'executive', label: 'Executive' },
      ],
    },
    inputs: [
      { id: 'role', label: 'Target Role', type: 'text', placeholder: 'e.g. AI Full Stack Developer at a Series-B startup' },
      {
        id: 'experience', label: 'Raw Experience / What You Did',
        type: 'textarea', rows: 14, required: true,
        placeholder: 'Paste a job description, bullet list, or just write what you did:\n\n• I built dashboards in Power BI\n• I wrote Python scripts that automated reports\n• I led a team of 4 analysts\n\nForge will transform every line into achievement-grade bullets.',
      },
    ],
    systemPrompt: (chip) => `You are Yahavi Forge — an elite resume engineer. Tone: **${chip || 'corporate'}**.
Rewrite raw experience into achievement-grade STAR-method resume bullets.
Format: numbered sections with ## headings, bullet points with quantified results where possible.
Never fabricate numbers. If no metric exists, use strong action verbs and clear outcomes.`,
    userPrompt: (i) => `Target Role: ${i.role || 'Not specified'}\n\nRaw Experience:\n${i.experience}`,
    temperature: 0.6, maxTokens: 2000,
  },
  {
    id: 'bullet-upgrader', num: '02', title: 'Bullet Point Upgrader',
    subtitle: 'Weak bullets → punchy, quantified, ATS-ready lines',
    category: 'Build', categoryId: 'build', icon: '↑',
    requiresKey: true, freeTier: true, hasPushToResume: true,
    inputs: [
      { id: 'bullets', label: 'Weak Bullets to Upgrade', type: 'textarea', rows: 10, required: true,
        placeholder: '- Worked on customer support tool\n- Did some data analysis\n- Helped with onboarding' },
      { id: 'role', label: 'Target Role (optional)', type: 'text', placeholder: 'e.g. Data Analyst' },
    ],
    systemPrompt: () => `You are a resume bullet point specialist. Transform weak, passive bullets into powerful, quantified, action-led achievement statements.
Rules: Start every bullet with a strong past-tense verb. Add metrics where reasonable. Keep each line under 2 lines. Preserve truth — do not fabricate.`,
    userPrompt: (i) => `${i.role ? `Target Role: ${i.role}\n\n` : ''}Bullets to upgrade:\n${i.bullets}`,
    temperature: 0.6, maxTokens: 1500,
  },
  {
    id: 'portfolio', num: '03', title: 'Portfolio Generator',
    subtitle: 'Generate a deployable HTML portfolio page',
    category: 'Build', categoryId: 'build', icon: '◈',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'e.g. Gagan Chauhan' },
      { id: 'role', label: 'Role / Title', type: 'text', placeholder: 'e.g. Full Stack Developer' },
      { id: 'bio', label: 'Bio / About', type: 'textarea', rows: 4, placeholder: 'A few lines about yourself, your focus, what you build.' },
      { id: 'skills', label: 'Skills (comma separated)', type: 'text', placeholder: 'React, TypeScript, Python, AWS' },
      { id: 'projects', label: 'Key Projects', type: 'textarea', rows: 6, placeholder: 'Project name — brief description\nProject name — brief description' },
    ],
    systemPrompt: () => `You are a portfolio page generator. Create a complete, modern, single-page HTML portfolio.
The output must be valid HTML5 with embedded CSS. Use a clean, professional design with dark/light sections.
Include: hero section, about, skills grid, projects grid, contact section.`,
    userPrompt: (i) => `Name: ${i.name}\nRole: ${i.role}\nBio: ${i.bio}\nSkills: ${i.skills}\nProjects:\n${i.projects}`,
    temperature: 0.7, maxTokens: 3000,
  },
  {
    id: 'gap-framer', num: '04', title: 'Career Gap Framer',
    subtitle: 'Turn employment gaps into professional talking points',
    category: 'Build', categoryId: 'build', icon: '◌',
    requiresKey: true, freeTier: true,
    inputs: [
      { id: 'gap', label: 'Gap Period', type: 'text', placeholder: 'e.g. Jan 2023 – Sep 2023 (9 months)' },
      { id: 'reason', label: 'Actual Reason (confidential — not in output)', type: 'textarea', rows: 4,
        placeholder: 'What really happened? This helps me craft an honest but professional framing.' },
      { id: 'activities', label: 'What you did during the gap', type: 'textarea', rows: 4,
        placeholder: 'Any courses, freelance work, caregiving, health recovery, travel, personal projects...' },
    ],
    systemPrompt: () => `You are a career coach specialising in gap framing. Create 3 professional ways to address an employment gap:
1. A one-line resume note
2. A LinkedIn summary sentence
3. A verbal response for interviews
Rules: Stay honest. Frame proactively. Highlight any skill-building or growth. Never lie.`,
    userPrompt: (i) => `Gap: ${i.gap}\nContext (confidential): ${i.reason}\nActivities during gap: ${i.activities}`,
    temperature: 0.65, maxTokens: 1200,
  },
  {
    id: 'achievement-forge', num: '05', title: 'Achievement Forge',
    subtitle: 'Turn one-liners into full achievement bullets',
    category: 'Build', categoryId: 'build', icon: '⚡',
    requiresKey: true, freeTier: true, hasPushToResume: true,
    inputs: [
      { id: 'achievements', label: 'One-Line Achievements', type: 'textarea', rows: 8, required: true,
        placeholder: 'Reduced load time\nBuilt the mobile app\nManaged the team during Q4\nCut support tickets by fixing the login bug' },
      { id: 'role', label: 'Your Role', type: 'text', placeholder: 'e.g. Backend Engineer' },
    ],
    systemPrompt: () => `You are an achievement writer. Expand brief one-line experiences into full, quantified, STAR-method resume achievement bullets.
For each input line, generate one strong bullet. Add reasonable estimated metrics if none are provided (note them as estimated).`,
    userPrompt: (i) => `Role: ${i.role || 'Not specified'}\n\nAchievements to expand:\n${i.achievements}`,
    temperature: 0.6, maxTokens: 1500,
  },

  /* ──────────── ANALYZE ──────────── */
  {
    id: 'ats', num: '06', title: 'ATS Career Intelligence',
    subtitle: 'Keyword match score + missing skills + rewrite suggestions',
    category: 'Analyze', categoryId: 'analyze', icon: '◎',
    requiresKey: false, freeTier: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', rows: 12, required: true,
        placeholder: 'Paste your full resume text here.' },
      { id: 'jd', label: 'Job Description', type: 'textarea', rows: 10, required: true,
        placeholder: 'Paste the full job description here.' },
    ],
    systemPrompt: () => `You are an ATS (Applicant Tracking System) expert. Analyze the resume vs job description and provide:
## ATS SCORE: X/100
## KEYWORD MATCH
List matched keywords and missing critical keywords.
## MISSING SKILLS (HIGH PRIORITY)
Top 5 skills/keywords from JD missing from resume.
## QUICK WINS
3-5 specific changes to improve the ATS score immediately.
## REWRITTEN SUMMARY
A 3-sentence professional summary optimised for this JD.`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}`,
    temperature: 0.4, maxTokens: 2000,
  },
  {
    id: 'recruiter-scan', num: '07', title: '6-Second Recruiter Scan',
    subtitle: 'What recruiters actually read in 6 seconds',
    category: 'Analyze', categoryId: 'analyze', icon: '👁',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', rows: 14, required: true,
        placeholder: 'Paste your full resume here.' },
    ],
    systemPrompt: () => `You are a senior recruiter with 10 years of experience. Simulate reading this resume for exactly 6 seconds.
## FIRST IMPRESSION (6 seconds)
What you noticed first. What you missed.
## THE 3-SECOND HOOK
Does it have one? What is it?
## RED FLAGS
Anything that would make you stop reading.
## PASS or SKIP?
Your immediate decision + reason.
## FIX IN 5 MINUTES
The single highest-impact change.`,
    userPrompt: (i) => `Resume:\n${i.resume}`,
    temperature: 0.7, maxTokens: 1200,
  },
  {
    id: 'resume-roast', num: '08', title: 'Resume Roast',
    subtitle: 'Brutal honest critique of every section',
    category: 'Analyze', categoryId: 'analyze', icon: '🔥',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'resume', label: 'Resume to Roast', type: 'textarea', rows: 14, required: true,
        placeholder: 'Paste your resume. Brace yourself.' },
    ],
    systemPrompt: () => `You are a ruthlessly honest career coach. Roast this resume section by section.
Be direct, specific, and useful — not just mean. Every criticism must come with a fix.
## OVERALL VERDICT (one line, brutal)
## SUMMARY: [Rating 1-10] + critique + fix
## EXPERIENCE: [Rating] + what's weak + specific rewrites needed
## SKILLS: [Rating] + what's filler vs what's valuable
## FORMAT: [Rating] + visual/readability issues
## THE BOTTOM LINE: What will kill this resume's chances + the 3 things to fix first.`,
    userPrompt: (i) => `Resume:\n${i.resume}`,
    temperature: 0.8, maxTokens: 2000,
  },

  /* ──────────── TAILOR ──────────── */
  {
    id: 'jd-tailor', num: '09', title: 'Job Tailoring Engine',
    subtitle: 'Rewrite resume bullets to match a specific JD',
    category: 'Tailor', categoryId: 'tailor', icon: '✂',
    requiresKey: true, freeTier: false, hasPushToResume: true,
    inputs: [
      { id: 'resume', label: 'Your Resume / Bullet Points', type: 'textarea', rows: 10, required: true,
        placeholder: 'Paste your current resume or key bullet points.' },
      { id: 'jd', label: 'Target Job Description', type: 'textarea', rows: 10, required: true,
        placeholder: 'Paste the full job description.' },
    ],
    systemPrompt: () => `You are a resume tailoring expert. Rewrite the candidate's resume bullets to precisely match the job description's language, keywords, and priorities.
Rules: Preserve all facts — do not invent experience. Mirror the JD's exact terminology. Reorder sections to lead with most relevant experience. Output a complete tailored version.`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}`,
    temperature: 0.5, maxTokens: 2500,
  },
  {
    id: 'truth-lock', num: '10', title: 'Truth-Lock Tailor',
    subtitle: 'Tailor without changing any facts — emphasis & order only',
    category: 'Tailor', categoryId: 'tailor', icon: '🔒',
    requiresKey: true, freeTier: false, hasPushToResume: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', rows: 10, required: true,
        placeholder: 'Paste your resume.' },
      { id: 'jd', label: 'Target Job Description', type: 'textarea', rows: 10, required: true,
        placeholder: 'Paste the JD.' },
    ],
    systemPrompt: () => `You are a resume editor with a strict rule: you may NOT change any facts, numbers, dates, or claims in the resume.
You CAN: reorder bullet points, reorder sections, change emphasis words, adjust phrasing while keeping meaning identical.
Produce a "Truth-Lock" tailored version. Mark every change you made with [TL: reason].`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}`,
    temperature: 0.4, maxTokens: 2500,
  },
  {
    id: 'company-tailor', num: '11', title: 'Company Tailor',
    subtitle: 'Match tone and framing to a specific company culture',
    category: 'Tailor', categoryId: 'tailor', icon: '🏢',
    requiresKey: true, freeTier: false, hasPushToResume: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', rows: 10, required: true, placeholder: 'Paste your resume.' },
      { id: 'company', label: 'Target Company', type: 'text', required: true, placeholder: 'e.g. Google, Zomato, McKinsey' },
      { id: 'role', label: 'Target Role', type: 'text', placeholder: 'e.g. Product Manager' },
    ],
    systemPrompt: () => `You are a company culture expert and resume writer. Rewrite the resume to match the specific culture, values, and communication style of the target company.
Research what matters to this company (innovation, execution, data-driven, etc.) and reflect it in tone, word choice, and emphasis.`,
    userPrompt: (i) => `Company: ${i.company}\nRole: ${i.role || 'Not specified'}\n\nResume:\n${i.resume}`,
    temperature: 0.7, maxTokens: 2500,
  },

  /* ──────────── OUTREACH ──────────── */
  {
    id: 'cover-letter', num: '12', title: 'Cover Letter',
    subtitle: 'Personalised, non-generic cover letter',
    category: 'Outreach', categoryId: 'outreach', icon: '✉',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'resume', label: 'Your Resume / Key Experience', type: 'textarea', rows: 8, required: true, placeholder: 'Paste resume or key points.' },
      { id: 'jd', label: 'Job Description', type: 'textarea', rows: 8, required: true, placeholder: 'Paste the JD.' },
      { id: 'company', label: 'Company Name', type: 'text', placeholder: 'e.g. Stripe' },
      { id: 'tone', label: 'Tone', type: 'select', options: [
        { value: 'professional', label: 'Professional' },
        { value: 'conversational', label: 'Conversational' },
        { value: 'enthusiastic', label: 'Enthusiastic' },
      ]},
    ],
    systemPrompt: () => `You are a cover letter specialist. Write a compelling, personalised cover letter that does NOT start with "I am writing to apply".
Structure: Hook (why this company specifically) → Value bridge (what you bring that matches their need) → Proof (1-2 specific achievements) → Close (clear next step).
Keep it under 300 words. Sound human. No corporate boilerplate.`,
    userPrompt: (i) => `Company: ${i.company || 'the company'}\nTone: ${i.tone || 'professional'}\n\nResume:\n${i.resume}\n\nJD:\n${i.jd}`,
    temperature: 0.75, maxTokens: 800,
  },
  {
    id: 'recruiter-hook', num: '13', title: 'Recruiter Hook',
    subtitle: 'Cold LinkedIn/email message that gets replies',
    category: 'Outreach', categoryId: 'outreach', icon: '🪝',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'background', label: 'Your Background (2-3 lines)', type: 'textarea', rows: 4, required: true, placeholder: '5 yrs backend eng at Series B startup, led team of 6, built payment infrastructure...' },
      { id: 'target', label: 'Who you\'re messaging', type: 'text', placeholder: 'e.g. Recruiter at Google, Hiring Manager at Zomato' },
      { id: 'role', label: 'Role you want', type: 'text', placeholder: 'e.g. Senior Backend Engineer' },
    ],
    systemPrompt: () => `You are a cold-message expert. Write 3 versions of a short outreach message (LinkedIn DM or email) that gets recruiter attention.
Rules: Under 80 words each. Lead with a hook, not your title. Specific, not generic. Include a soft CTA.
Provide: Message A (curious angle), Message B (mutual connection angle), Message C (direct value angle).`,
    userPrompt: (i) => `My background: ${i.background}\nMessaging: ${i.target || 'a recruiter'}\nTarget role: ${i.role || 'not specified'}`,
    temperature: 0.8, maxTokens: 800,
  },
  {
    id: 'application-pack', num: '14', title: 'Application Pack',
    subtitle: 'Full bundle: cover letter + LinkedIn note + follow-up email',
    category: 'Outreach', categoryId: 'outreach', icon: '📦',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', rows: 8, required: true, placeholder: 'Paste resume.' },
      { id: 'jd', label: 'Job Description', type: 'textarea', rows: 8, required: true, placeholder: 'Paste JD.' },
      { id: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'e.g. Razorpay' },
    ],
    systemPrompt: () => `You are an application specialist. Generate a complete application bundle:
## 1. COVER LETTER (under 280 words, specific hook, value bridge, proof, close)
## 2. LINKEDIN CONNECTION NOTE (under 50 words, personal, not salesy)
## 3. FOLLOW-UP EMAIL (7-day follow-up, under 100 words, adds value, not just "checking in")
Keep all three distinct in tone and approach.`,
    userPrompt: (i) => `Company: ${i.company}\n\nResume:\n${i.resume}\n\nJD:\n${i.jd}`,
    temperature: 0.75, maxTokens: 2000,
  },

  /* ──────────── STRATEGY ──────────── */
  {
    id: 'role-finder', num: '15', title: 'Role Fit Finder',
    subtitle: '5 best-fit roles based on your background',
    category: 'Strategy', categoryId: 'strategy', icon: '🎯',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'background', label: 'Your Background', type: 'textarea', rows: 10, required: true,
        placeholder: 'Paste your resume or describe your experience, skills, and what you enjoy doing.' },
      { id: 'preferences', label: 'Preferences (optional)', type: 'textarea', rows: 4,
        placeholder: 'e.g. remote, startup, team lead, specific industries...' },
    ],
    systemPrompt: () => `You are a career strategist. Analyse the candidate's background and recommend the 5 most strategic next roles.
For each role: ## ROLE TITLE · FIT SCORE X/10 → Why it fits → Specific companies to target → Key skill to develop → Realistic salary range (India context).`,
    userPrompt: (i) => `Background:\n${i.background}\n\n${i.preferences ? `Preferences:\n${i.preferences}` : ''}`,
    temperature: 0.7, maxTokens: 2000,
  },
  {
    id: 'app-optimizer', num: '16', title: 'Application Optimizer',
    subtitle: 'Personalised 30-day job search plan',
    category: 'Strategy', categoryId: 'strategy', icon: '📈',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'background', label: 'Your Background', type: 'textarea', rows: 8, required: true,
        placeholder: 'Current role, years of experience, key skills, target roles...' },
      { id: 'goals', label: 'Job Search Goals', type: 'textarea', rows: 4,
        placeholder: 'What you want next — role, company type, location, timeline...' },
    ],
    systemPrompt: () => `You are a job search strategist. Build a personalised 30-day application plan.
## WEEK 1: FOUNDATION — Profile, resume, LinkedIn
## WEEK 2: TARGETING — Company list, warm outreach
## WEEK 3: APPLYING — Applications, cold outreach
## WEEK 4: FOLLOW-THROUGH — Follow-ups, interviews, evaluation
## CHANNEL MIX — % split across LinkedIn/direct/referrals/recruiter/cold
## WEEK-BY-WEEK PLAN — Concrete daily actions.`,
    userPrompt: (i) => `Background:\n${i.background}\n\n${i.goals ? `Goals:\n${i.goals}` : ''}`,
    temperature: 0.7, maxTokens: 2000,
  },
  {
    id: 'interview-prep', num: '17', title: 'Interview Prep Pack',
    subtitle: '12 predicted questions · STAR answers · power closers',
    category: 'Strategy', categoryId: 'strategy', icon: '🎤',
    requiresKey: true, freeTier: false,
    inputs: [
      { id: 'jd', label: 'Job Description', type: 'textarea', rows: 10, required: true, placeholder: 'Paste the JD you are interviewing for.' },
      { id: 'resume', label: 'Your Resume (optional)', type: 'textarea', rows: 8, placeholder: 'Paste your resume to personalise answers.' },
      { id: 'company', label: 'Company (optional)', type: 'text', placeholder: 'e.g. Stripe' },
    ],
    systemPrompt: () => `Build a complete interview prep pack.
## 12 PREDICTED QUESTIONS — Mix behavioral, technical, motivational, culture-fit.
## STAR ANSWERS FOR TOP 5 — Format: "Q#N: [S/T/A/R]" — 80 seconds spoken.
## POWER CLOSING QUESTIONS — 5 questions the candidate should ask them.
## 7-ITEM PREP CHECKLIST — Things to do in the 24 hours before.`,
    userPrompt: (i) => `${i.company ? `Company: ${i.company}\n` : ''}\nJD:\n${i.jd}\n\n${i.resume ? `Resume:\n${i.resume}` : ''}`,
    temperature: 0.6, maxTokens: 3000,
  },
]

export const getToolById = (id: string): ToolConfig | undefined =>
  TOOLS.find((t) => t.id === id)

export const getToolsByCategory = (categoryId: string): ToolConfig[] =>
  TOOLS.filter((t) => t.categoryId === categoryId)
