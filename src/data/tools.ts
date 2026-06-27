export interface ToolInput {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  rows?: number;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface ToolChip {
  prefKey: string;
  options: { value: string; label: string }[];
}

export interface ToolConfig {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  categoryId: string;
  icon: string;
  inputs: ToolInput[];
  chips?: ToolChip;
  systemPrompt: (chip?: string) => string;
  userPrompt: (inputs: Record<string, string>, chip?: string) => string;
  temperature?: number;
  maxTokens?: number;
  requiresKey: boolean;
  freeTier: boolean;
}

export interface ToolCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: ToolCategory[] = [
  { id: 'build', label: 'Build', icon: '\ud83d\udd28', color: '#FFD800' },
  { id: 'analyze', label: 'Analyze', icon: '\ud83d\udd0d', color: '#B6FF39' },
  { id: 'tailor', label: 'Tailor', icon: '\u2702\ufe0f', color: '#FF2D55' },
  { id: 'outreach', label: 'Outreach', icon: '\ud83d\udce8', color: '#FF6B1A' },
  { id: 'strategy', label: 'Strategy', icon: '\ud83c\udfaf', color: '#111111' },
];

export const TOOLS: ToolConfig[] = [
  {
    id: 'builder',
    num: '01',
    title: 'AI Resume Builder',
    subtitle: 'Raw experience to STAR-method achievement bullets',
    category: 'Build',
    categoryId: 'build',
    icon: '\ud83d\udcdd',
    freeTier: true,
    requiresKey: true,
    inputs: [
      { id: 'experience', label: 'Your Experience', type: 'textarea', placeholder: 'Paste your raw work experience, bullet points, or job descriptions here...', rows: 10, required: true },
      { id: 'role', label: 'Target Role', type: 'text', placeholder: 'e.g. Senior Frontend Engineer at Stripe', required: true },
    ],
    chips: {
      prefKey: 'builder_tone',
      options: [
        { value: 'professional', label: 'Professional' },
        { value: 'confident', label: 'Confident' },
        { value: 'humble', label: 'Humble' },
        { value: 'aggressive', label: 'Aggressive' },
      ],
    },
    systemPrompt: (chip) => `You are an elite resume writer with 15+ years of experience. Convert raw experience into STAR-method achievement bullets. Tone: ${chip || 'professional'}. Use strong action verbs, quantify results, and highlight impact.`,
    userPrompt: (inputs, chip) => `ROLE: ${inputs.role}\n\nEXPERIENCE:\n${inputs.experience}\n\nConvert this into 5-8 powerful STAR-method achievement bullets. Tone: ${chip || 'professional'}. Include metrics and impact.`,
    temperature: 0.7,
    maxTokens: 1500,
  },
  {
    id: 'bullet-upgrader',
    num: '02',
    title: 'Bullet Point Upgrader',
    subtitle: 'Weak bullets to powerful, metric-driven statements',
    category: 'Build',
    categoryId: 'build',
    icon: '\u26a1',
    freeTier: true,
    requiresKey: true,
    inputs: [
      { id: 'bullets', label: 'Your Bullets', type: 'textarea', placeholder: 'Paste your current resume bullets here, one per line...', rows: 8, required: true },
    ],
    systemPrompt: () => 'You are a resume optimization expert. Upgrade weak bullet points into powerful, metric-driven achievement statements using the STAR method.',
    userPrompt: (inputs) => `Upgrade these resume bullets into powerful, metric-driven statements:\n\n${inputs.bullets}`,
    temperature: 0.65,
    maxTokens: 1200,
  },
  {
    id: 'portfolio',
    num: '03',
    title: 'Portfolio Generator',
    subtitle: 'Generate a complete HTML portfolio page',
    category: 'Build',
    categoryId: 'build',
    icon: '\ud83c\udf10',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'about', label: 'About You', type: 'textarea', placeholder: 'Describe yourself, your skills, and experience...', rows: 6, required: true },
      { id: 'projects', label: 'Projects', type: 'textarea', placeholder: 'List your projects with descriptions...', rows: 6, required: true },
    ],
    systemPrompt: () => 'You are a web developer and designer. Generate a complete, responsive HTML portfolio page with inline CSS. Use modern design principles.',
    userPrompt: (inputs) => `Generate a complete HTML portfolio page for:\n\nAbout: ${inputs.about}\n\nProjects: ${inputs.projects}\n\nInclude: hero section, about, projects grid, skills, contact. Make it visually stunning with inline CSS.`,
    temperature: 0.8,
    maxTokens: 3000,
  },
  {
    id: 'gap-framer',
    num: '04',
    title: 'Career Gap Framer',
    subtitle: 'Turn employment gaps into positive narratives',
    category: 'Build',
    categoryId: 'build',
    icon: '\ud83d\udd04',
    freeTier: true,
    requiresKey: true,
    inputs: [
      { id: 'gap', label: 'Your Career Gap', type: 'textarea', placeholder: 'Describe the gap period and what you did...', rows: 6, required: true },
      { id: 'context', label: 'Context (Optional)', type: 'text', placeholder: 'e.g. Parenting, health, education, travel...' },
    ],
    systemPrompt: () => 'You help job seekers reframe career gaps into compelling, honest narratives that highlight growth and transferable skills.',
    userPrompt: (inputs) => `Help me frame this career gap positively:\n\nGap: ${inputs.gap}\nContext: ${inputs.context || 'N/A'}`,
    temperature: 0.7,
    maxTokens: 800,
  },
  {
    id: 'achievement-forge',
    num: '05',
    title: 'Achievement Forge',
    subtitle: 'Turn mundane tasks into impressive achievements',
    category: 'Build',
    categoryId: 'build',
    icon: '\ud83c\udfc6',
    freeTier: true,
    requiresKey: true,
    inputs: [
      { id: 'tasks', label: 'Your Tasks', type: 'textarea', placeholder: 'List your daily tasks or responsibilities...', rows: 8, required: true },
    ],
    systemPrompt: () => 'Transform mundane job tasks into impressive, metric-driven achievements. Use action verbs and quantify impact.',
    userPrompt: (inputs) => `Transform these tasks into achievement statements:\n\n${inputs.tasks}`,
    temperature: 0.7,
    maxTokens: 1200,
  },
  {
    id: 'ats',
    num: '06',
    title: 'ATS Career Intelligence',
    subtitle: 'Resume vs JD analysis with keyword matching and score',
    category: 'Analyze',
    categoryId: 'analyze',
    icon: '\ud83c\udfaf',
    freeTier: true,
    requiresKey: false,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your full resume here...', rows: 12, required: true },
      { id: 'jd', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description here...', rows: 10, required: true },
    ],
    systemPrompt: () => 'You are an ATS optimization expert. Analyze resume against job description and provide actionable feedback.',
    userPrompt: (inputs) => `Analyze this resume against the job description:\n\nRESUME:\n${inputs.resume}\n\nJOB DESCRIPTION:\n${inputs.jd}`,
    temperature: 0.55,
    maxTokens: 2500,
  },
  {
    id: 'recruiter-scan',
    num: '07',
    title: '6-Second Recruiter Scan',
    subtitle: 'What a recruiter sees in the first 6 seconds',
    category: 'Analyze',
    categoryId: 'analyze',
    icon: '\ud83d\udc41',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your resume here...', rows: 12, required: true },
    ],
    systemPrompt: () => 'You are a recruiter with 10+ years of experience. Perform a 6-second scan of this resume and report what stands out, what is missing, and first impressions.',
    userPrompt: (inputs) => `Perform a 6-second recruiter scan:\n\n${inputs.resume}`,
    temperature: 0.6,
    maxTokens: 800,
  },
  {
    id: 'resume-roast',
    num: '08',
    title: 'Resume Roast',
    subtitle: 'Brutally honest feedback (4 personas)',
    category: 'Analyze',
    categoryId: 'analyze',
    icon: '\ud83d\udd25',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your resume here...', rows: 12, required: true },
    ],
    chips: {
      prefKey: 'roast_persona',
      options: [
        { value: 'harsh_recruiter', label: 'Harsh Recruiter' },
        { value: 'friendly_mentor', label: 'Friendly Mentor' },
        { value: 'technical_lead', label: 'Technical Lead' },
        { value: 'cto', label: 'CTO' },
      ],
    },
    systemPrompt: (chip) => `You are a ${(chip || 'harsh_recruiter').replace('_', ' ')}. Give brutally honest, actionable feedback on this resume. Be direct but constructive.`,
    userPrompt: (inputs, chip) => `Roast this resume as a ${(chip || 'harsh_recruiter').replace('_', ' ')}:\n\n${inputs.resume}`,
    temperature: 0.8,
    maxTokens: 1500,
  },
  {
    id: 'jd-tailor',
    num: '09',
    title: 'Job Tailoring Engine',
    subtitle: 'Tailor your resume to a specific job description',
    category: 'Tailor',
    categoryId: 'tailor',
    icon: '\ud83c\udfaf',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your resume...', rows: 10, required: true },
      { id: 'jd', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description...', rows: 8, required: true },
    ],
    systemPrompt: () => 'Tailor a resume to match a specific job description. Preserve truth while optimizing keyword alignment and relevance.',
    userPrompt: (inputs) => `Tailor this resume for the job description:\n\nRESUME:\n${inputs.resume}\n\nJOB DESCRIPTION:\n${inputs.jd}`,
    temperature: 0.65,
    maxTokens: 2000,
  },
  {
    id: 'truth-lock',
    num: '10',
    title: 'Truth-Lock Tailor',
    subtitle: 'Tailored but honest - flags any unsupported claims',
    category: 'Tailor',
    categoryId: 'tailor',
    icon: '\ud83d\udd12',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your resume...', rows: 10, required: true },
      { id: 'jd', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description...', rows: 8, required: true },
    ],
    systemPrompt: () => 'Tailor a resume to a job description with a truth-lock: flag any claims that are not supported by the original resume. Never fabricate experience.',
    userPrompt: (inputs) => `Truth-Lock Tailor:\n\nRESUME:\n${inputs.resume}\n\nJOB DESCRIPTION:\n${inputs.jd}\n\nTailor the resume but flag any unsupported claims with [NEEDS EVIDENCE].`,
    temperature: 0.6,
    maxTokens: 2000,
  },
  {
    id: 'company-tailor',
    num: '11',
    title: 'Company Tailor',
    subtitle: 'Customize for a specific company culture and values',
    category: 'Tailor',
    categoryId: 'tailor',
    icon: '\ud83c\udfe2',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your resume...', rows: 10, required: true },
      { id: 'company', label: 'Company Name', type: 'text', placeholder: 'e.g. Stripe, Google, Netflix', required: true },
      { id: 'role', label: 'Target Role', type: 'text', placeholder: 'e.g. Senior Frontend Engineer', required: true },
    ],
    systemPrompt: () => 'Customize a resume for a specific company by researching their culture, values, and tech stack. Make the candidate appear culturally aligned.',
    userPrompt: (inputs) => `Customize this resume for ${inputs.company} (${inputs.role}):\n\n${inputs.resume}`,
    temperature: 0.7,
    maxTokens: 2000,
  },
  {
    id: 'cover-letter',
    num: '12',
    title: 'Cover Letter',
    subtitle: 'Generate tailored cover letters',
    category: 'Outreach',
    categoryId: 'outreach',
    icon: '\u2709\ufe0f',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Key Highlights', type: 'textarea', placeholder: 'Paste 3-5 key achievements or highlights...', rows: 6, required: true },
      { id: 'jd', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description...', rows: 8, required: true },
      { id: 'company', label: 'Company Name', type: 'text', placeholder: 'e.g. Stripe', required: true },
    ],
    systemPrompt: () => 'Write compelling, tailored cover letters that connect the candidate experience to the specific role and company. Keep to one page.',
    userPrompt: (inputs) => `Write a cover letter for ${inputs.company}:\n\nMY HIGHLIGHTS:\n${inputs.resume}\n\nJOB DESCRIPTION:\n${inputs.jd}`,
    temperature: 0.75,
    maxTokens: 1200,
  },
  {
    id: 'recruiter-hook',
    num: '13',
    title: 'Recruiter Hook',
    subtitle: 'LinkedIn DM / email that gets responses',
    category: 'Outreach',
    categoryId: 'outreach',
    icon: '\ud83c\udfa3',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'context', label: 'Context', type: 'textarea', placeholder: 'Who are you reaching out to? What role? Any common connection?', rows: 6, required: true },
    ],
    systemPrompt: () => 'Write short, compelling LinkedIn DMs and recruiter emails that get responses. Keep under 150 words. Be specific and show genuine interest.',
    userPrompt: (inputs) => `Write a recruiter outreach message:\n\n${inputs.context}`,
    temperature: 0.75,
    maxTokens: 500,
  },
  {
    id: 'application-pack',
    num: '14',
    title: 'Application Pack',
    subtitle: 'Full kit: resume bullets + cover letter + recruiter DM + follow-up',
    category: 'Outreach',
    categoryId: 'outreach',
    icon: '\ud83d\udce6',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume', type: 'textarea', placeholder: 'Paste your resume...', rows: 10, required: true },
      { id: 'jd', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description...', rows: 8, required: true },
      { id: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Stripe', required: true },
    ],
    systemPrompt: () => 'Generate a complete application package: tailored resume bullets, cover letter, recruiter LinkedIn DM, and follow-up email.',
    userPrompt: (inputs) => `Generate a complete application pack for ${inputs.company}:\n\nRESUME:\n${inputs.resume}\n\nJOB DESCRIPTION:\n${inputs.jd}`,
    temperature: 0.7,
    maxTokens: 2500,
  },
  {
    id: 'role-finder',
    num: '15',
    title: 'Role Fit Finder',
    subtitle: 'Find roles that match your skills and experience',
    category: 'Strategy',
    categoryId: 'strategy',
    icon: '\ud83e\udded',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'skills', label: 'Your Skills', type: 'textarea', placeholder: 'List your technical and soft skills...', rows: 6, required: true },
      { id: 'experience', label: 'Experience Level', type: 'text', placeholder: 'e.g. 5 years in frontend development', required: true },
      { id: 'interests', label: 'Interests (Optional)', type: 'text', placeholder: 'e.g. fintech, AI, healthtech' },
    ],
    systemPrompt: () => 'Help job seekers identify ideal roles based on their skills, experience, and interests. Suggest specific job titles and explain why they are a fit.',
    userPrompt: (inputs) => `Find ideal roles for me:\n\nSkills: ${inputs.skills}\nExperience: ${inputs.experience}\nInterests: ${inputs.interests || 'Open to anything'}`,
    temperature: 0.7,
    maxTokens: 1000,
  },
  {
    id: 'app-optimizer',
    num: '16',
    title: 'Application Optimizer',
    subtitle: 'Maximize your chances per application',
    category: 'Strategy',
    categoryId: 'strategy',
    icon: '\ud83d\udcc8',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'resume', label: 'Your Resume Summary', type: 'textarea', placeholder: 'Brief summary of your background...', rows: 6, required: true },
      { id: 'jd', label: 'Job Description', type: 'textarea', placeholder: 'Paste the job description...', rows: 8, required: true },
    ],
    systemPrompt: () => 'Provide a strategic plan to maximize the chances of getting an interview for a specific role. Include timeline, networking, and follow-up tactics.',
    userPrompt: (inputs) => `Optimize my application strategy:\n\nMY BACKGROUND:\n${inputs.resume}\n\nJOB DESCRIPTION:\n${inputs.jd}`,
    temperature: 0.7,
    maxTokens: 1200,
  },
  {
    id: 'interview-prep',
    num: '17',
    title: 'Interview Prep Pack',
    subtitle: 'Role-specific questions, answers, and prep plan',
    category: 'Strategy',
    categoryId: 'strategy',
    icon: '\ud83c\udfa4',
    freeTier: false,
    requiresKey: true,
    inputs: [
      { id: 'role', label: 'Target Role', type: 'text', placeholder: 'e.g. Senior Frontend Engineer at Stripe', required: true },
      { id: 'resume', label: 'Your Background', type: 'textarea', placeholder: 'Paste key experience points...', rows: 6, required: true },
    ],
    systemPrompt: () => 'Generate a comprehensive interview prep pack: likely questions, model answers, and a 7-day preparation plan.',
    userPrompt: (inputs) => `Create interview prep for ${inputs.role}:\n\nMY BACKGROUND:\n${inputs.resume}`,
    temperature: 0.7,
    maxTokens: 2500,
  },
];

export const getToolById = (id: string): ToolConfig | undefined =>
  TOOLS.find((t) => t.id === id);

export const getToolsByCategory = (categoryId: string): ToolConfig[] =>
  TOOLS.filter((t) => t.categoryId === categoryId);
