/* ============================================================
   YAHAVI FORGE — Local ATS Scorer (offline, no API key needed)
   Keyword density analysis, section detection, score 0-100
   ============================================================ */

export interface ATSResult {
  score: number
  matchedKeywords: string[]
  missingKeywords: string[]
  sectionScores: Record<string, number>
  suggestions: string[]
}

const SECTION_PATTERNS: Record<string, RegExp[]> = {
  contact:     [/email|phone|linkedin|github|portfolio/i],
  summary:     [/summary|objective|profile|about/i],
  experience:  [/experience|work history|employment|career/i],
  education:   [/education|degree|university|college|school/i],
  skills:      [/skills|technologies|tools|languages|frameworks/i],
  achievements:[/achievements|accomplishments|awards|honours/i],
}

const POWER_VERBS = [
  'led', 'built', 'launched', 'delivered', 'increased', 'reduced', 'improved',
  'designed', 'developed', 'managed', 'created', 'implemented', 'optimized',
  'drove', 'achieved', 'exceeded', 'generated', 'established', 'transformed',
  'scaled', 'streamlined', 'automated', 'spearheaded', 'pioneered',
]

const WEAK_PATTERNS = [
  /\bresponsible for\b/i, /\bhelped with\b/i, /\bworked on\b/i,
  /\bassisted in\b/i, /\bwas involved in\b/i, /\bparticipated in\b/i,
]

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s+#]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
}

function extractKeywordsFromJD(jd: string): string[] {
  const tokens = tokenize(jd)
  const freq: Record<string, number> = {}
  for (const t of tokens) freq[t] = (freq[t] ?? 0) + 1

  // Stop words to exclude
  const STOP = new Set(['the','and','for','that','with','this','have','from','are',
    'will','you','your','they','their','our','all','can','not','but','any',
    'job','role','work','team','company','position','candidate','must','should',
    'able','experience','skills','years','strong','good','well','also','both'])

  return Object.entries(freq)
    .filter(([word, count]) => count >= 1 && !STOP.has(word) && word.length > 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([word]) => word)
}

function detectSections(resume: string): Record<string, boolean> {
  const found: Record<string, boolean> = {}
  for (const [section, patterns] of Object.entries(SECTION_PATTERNS)) {
    found[section] = patterns.some((p) => p.test(resume))
  }
  return found
}

function countMetrics(resume: string): number {
  const matches = resume.match(/\d+%|\$\d+|\d+[kK]|\d+ (users|clients|people|teams|projects|tools)/g)
  return matches?.length ?? 0
}

export function scoreATS(resume: string, jd: string): ATSResult {
  const resumeTokens = new Set(tokenize(resume))
  const jdKeywords = extractKeywordsFromJD(jd)

  const matchedKeywords: string[] = []
  const missingKeywords: string[] = []

  for (const kw of jdKeywords) {
    if (resumeTokens.has(kw)) matchedKeywords.push(kw)
    else missingKeywords.push(kw)
  }

  const matchRatio = jdKeywords.length > 0 ? matchedKeywords.length / jdKeywords.length : 0
  const keywordScore = Math.round(matchRatio * 40) // 40 points

  // Section score (20 points)
  const sections = detectSections(resume)
  const sectionCount = Object.values(sections).filter(Boolean).length
  const sectionScore = Math.min(20, sectionCount * 4)

  const sectionScores: Record<string, number> = {}
  for (const [s, found] of Object.entries(sections)) {
    sectionScores[s] = found ? 1 : 0
  }

  // Power verb score (15 points)
  const resumeLower = resume.toLowerCase()
  const verbCount = POWER_VERBS.filter((v) => resumeLower.includes(v)).length
  const verbScore = Math.min(15, verbCount * 2)

  // Metrics score (15 points)
  const metrics = countMetrics(resume)
  const metricsScore = Math.min(15, metrics * 3)

  // Length score (10 points) — ideal 400-800 words
  const wordCount = resume.split(/\s+/).length
  const lengthScore = wordCount >= 300 && wordCount <= 900 ? 10 : wordCount >= 200 ? 6 : 3

  const totalScore = Math.min(100, keywordScore + sectionScore + verbScore + metricsScore + lengthScore)

  // Generate suggestions
  const suggestions: string[] = []

  if (missingKeywords.length > 0) {
    suggestions.push(`Add these high-priority keywords: ${missingKeywords.slice(0, 8).join(', ')}`)
  }
  if (!sections.summary) suggestions.push('Add a professional summary section (3-4 lines) at the top')
  if (!sections.skills) suggestions.push('Add a dedicated Skills section listing technical tools')
  if (metrics < 3) suggestions.push('Add quantified metrics (%, $, numbers) to at least 3-4 bullet points')
  if (verbCount < 5) suggestions.push(`Start more bullets with power verbs: ${POWER_VERBS.slice(0,6).join(', ')}`)

  const weakCount = WEAK_PATTERNS.filter((p) => p.test(resume)).length
  if (weakCount > 0) suggestions.push('Replace passive phrases like "responsible for" with direct action verbs')

  if (wordCount < 300) suggestions.push('Resume is too short — add more detail to experience sections')
  if (wordCount > 1000) suggestions.push('Resume may be too long — consider trimming to 1-2 pages')

  return {
    score: totalScore,
    matchedKeywords: matchedKeywords.slice(0, 20),
    missingKeywords: missingKeywords.slice(0, 15),
    sectionScores,
    suggestions: suggestions.slice(0, 6),
  }
}
