/* ============================================================
   YAHAVI FORGE — AI provider layer
   6 providers, ordered: groq → gemini → openrouter → together → mistral → cohere
   Keys from localStorage 'yahavi-forge-keys' (never sent to Hackknow servers)
   ============================================================ */

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AICallOptions {
  temperature?: number
  max_tokens?: number
}

export interface AICallResult {
  text: string
  provider: string
}

interface ProviderConfig {
  id: string
  name: string
  url: string
  model?: string
  type: 'openai' | 'gemini' | 'cohere'
  fallbackModel?: string
}

const PROVIDERS: ProviderConfig[] = [
  {
    id: 'groq',
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    fallbackModel: 'llama-3.1-8b-instant',
    type: 'openai',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    fallbackModel: 'gemini-1.5-flash',
    type: 'gemini',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    fallbackModel: 'google/gemini-2.0-flash-exp:free',
    type: 'openai',
  },
  {
    id: 'together',
    name: 'Together AI',
    url: 'https://api.together.xyz/v1/chat/completions',
    model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
    type: 'openai',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    url: 'https://api.mistral.ai/v1/chat/completions',
    model: 'mistral-small-latest',
    type: 'openai',
  },
  {
    id: 'cohere',
    name: 'Cohere',
    url: 'https://api.cohere.ai/v2/chat',
    model: 'command-r-08-2024',
    type: 'cohere',
  },
]

/** Load all keys from localStorage */
export function loadKeys(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem('yahavi-forge-keys') || '{}') as Record<string, string>
  } catch {
    return {}
  }
}

/** Call a single provider */
async function callOne(
  provider: ProviderConfig,
  key: string,
  messages: Message[],
  options: AICallOptions = {}
): Promise<AICallResult> {
  const temp = options.temperature ?? 0.7
  const maxTok = options.max_tokens ?? 1500

  if (provider.type === 'openai') {
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(provider.id === 'openrouter' ? { 'HTTP-Referer': 'https://forge.hackknow.com' } : {}),
      },
      body: JSON.stringify({
        model: provider.model,
        messages,
        temperature: temp,
        max_tokens: maxTok,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      throw Object.assign(new Error(`${provider.name}: HTTP ${res.status}`), {
        code: res.status === 401 ? 'BAD_KEY' : res.status === 429 ? 'RATE_LIMIT' : 'PROVIDER_ERROR',
        details: err,
      })
    }
    const data = await res.json() as { choices: { message: { content: string } }[] }
    return { text: data.choices?.[0]?.message?.content ?? '', provider: provider.name }
  }

  if (provider.type === 'gemini') {
    const sys = messages.find((m) => m.role === 'system')
    const turns = messages.filter((m) => m.role !== 'system')
    const geminiUrl = provider.url.replace(':generateContent', ':generateContent')
    const body: Record<string, unknown> = {
      contents: turns.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature: temp, maxOutputTokens: maxTok },
    }
    if (sys) body.systemInstruction = { parts: [{ text: sys.content }] }
    const res = await fetch(`${geminiUrl}?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      throw Object.assign(new Error(`Gemini: HTTP ${res.status}`), {
        code: res.status === 400 ? 'BAD_KEY' : res.status === 429 ? 'RATE_LIMIT' : 'PROVIDER_ERROR',
      })
    }
    const data = await res.json() as { candidates: { content: { parts: { text: string }[] } }[] }
    return { text: data.candidates?.[0]?.content?.parts?.[0]?.text ?? '', provider: provider.name }
  }

  if (provider.type === 'cohere') {
    // Cohere v2 chat API has a different format
    const sys = messages.find((m) => m.role === 'system')
    const turns = messages.filter((m) => m.role !== 'system')
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          ...(sys ? [{ role: 'system', content: sys.content }] : []),
          ...turns.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: temp,
        max_tokens: maxTok,
      }),
    })
    if (!res.ok) {
      throw Object.assign(new Error(`Cohere: HTTP ${res.status}`), {
        code: res.status === 401 ? 'BAD_KEY' : res.status === 429 ? 'RATE_LIMIT' : 'PROVIDER_ERROR',
      })
    }
    const data = await res.json() as { message: { content: { text: string }[] } }
    return { text: data.message?.content?.[0]?.text ?? '', provider: provider.name }
  }

  throw new Error(`Unknown provider type: ${provider.type}`)
}

/** Main AI call — tries providers in order, auto-fallback */
export async function callAI(
  messages: Message[],
  options: AICallOptions = {}
): Promise<AICallResult> {
  const keys = loadKeys()
  const errors: string[] = []

  for (const provider of PROVIDERS) {
    const key = keys[provider.id]
    if (!key?.trim()) continue
    try {
      return await callOne(provider, key, messages, options)
    } catch (e) {
      const err = e as { message?: string; code?: string }
      errors.push(`${provider.name}: ${err.message ?? String(e)}`)
      // Don't retry on bad keys
      if (err.code === 'BAD_KEY') continue
    }
  }

  if (errors.length === 0) {
    const noKeys = new Error('No API keys configured. Add a free key in ▸ KEYS to get started.')
    Object.assign(noKeys, { code: 'NO_KEYS' })
    throw noKeys
  }

  throw new Error(`All providers failed:\n${errors.join('\n')}`)
}
