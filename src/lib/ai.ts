export interface AICallOptions {
  temperature?: number;
  max_tokens?: number;
}

export interface AICallResult {
  text: string;
  provider: string;
}

const PROVIDERS = {
  groq: {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    type: 'openai' as const,
  },
  gemini: {
    name: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    type: 'gemini' as const,
  },
  openrouter: {
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    type: 'openai' as const,
  },
};

async function callOne(
  id: string,
  key: string,
  messages: { role: string; content: string }[],
  options?: AICallOptions
): Promise<AICallResult> {
  const p = PROVIDERS[id as keyof typeof PROVIDERS];
  if (!p) throw new Error(`Unknown provider: ${id}`);

  if (p.type === 'openai') {
    const res = await fetch(p.url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: p.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.max_tokens ?? 1500,
      }),
    });
    if (!res.ok) throw new Error(`${p.name}: HTTP ${res.status}`);
    const d = await res.json();
    return { text: d.choices?.[0]?.message?.content || '', provider: p.name };
  }

  if (p.type === 'gemini') {
    const sys = messages.find((m) => m.role === 'system');
    const turns = messages.filter((m) => m.role !== 'system');
    const body: any = {
      contents: turns.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.max_tokens ?? 1500,
      },
    };
    if (sys) body.systemInstruction = { parts: [{ text: sys.content }] };
    const res = await fetch(`${p.url}?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${p.name}: HTTP ${res.status}`);
    const d = await res.json();
    return { text: d.candidates?.[0]?.content?.parts?.[0]?.text || '', provider: p.name };
  }
  throw new Error(`Unsupported provider type: ${p.type}`);
}

export async function callAI(
  keys: Record<string, string>,
  messages: { role: string; content: string }[],
  options?: AICallOptions
): Promise<AICallResult> {
  const order = ['groq', 'gemini', 'openrouter'];
  const errors: string[] = [];
  for (const id of order) {
    if (!keys[id]) continue;
    try { return await callOne(id, keys[id], messages, options); }
    catch (e: any) { errors.push(`${id}: ${e.message}`); }
  }
  if (errors.length === 0) {
    const err = new Error('NO_KEYS: No API keys configured. Add a key in the KEYS panel.');
    (err as any).code = 'NO_KEYS';
    throw err;
  }
  throw new Error(`All providers failed:\n${errors.join('\n')}`);
}
