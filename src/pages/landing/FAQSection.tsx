import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
const faqs=[
  {q:'What is BYOK (Bring Your Own Key)?',a:'BYOK means you use your own free API keys from AI providers like Groq, Google Gemini, or OpenRouter. Your keys stay in your browser — we never see them. This keeps costs low and gives you full control.'},
  {q:'Is it really free?',a:'Yes. The BUILD category (5 tools) + ATS Scorer are free forever with a small watermark on exports. Paid plans (₹49/day, ₹249/month, ₹2,499/year) unlock all 17 tools and remove watermarks.'},
  {q:'How do I get a free API key?',a:'Go to console.groq.com/keys and sign up with email — no credit card needed. Takes 60 seconds. Groq gives you 6,000 requests/minute free. You can also add Google Gemini (free) and OpenRouter (free).'},
  {q:'Is my data safe?',a:'Your resume text and API keys never touch our servers — they go directly from your browser to the AI provider. We only hold minimal account data if you sign in (email, name), stored in Supabase with row-level security.'},
  {q:'What happens if my API key rate-limits?',a:'Forge automatically falls back to the next available provider: Groq → Gemini → OpenRouter. Add multiple keys to get seamless fallback with zero interruption.'},
  {q:'Do you offer student discounts?',a:'Yes — 80% off any paid plan. Upload your graduation certificate or 12th marksheet during checkout. Contact team@hackknow.com for verification.'},
  {q:'Can I use this on mobile?',a:'Yes. Yahavi Forge is fully responsive and works on all mobile browsers. Install it as a PWA from your browser menu for an app-like experience.'},
]
export default function FAQSection() {
  const [open,setOpen]=useState<number|null>(null)
  return (
    <section className="border-b-2 border-ink py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10 reveal"><div className="brand-eyebrow">06 FAQ</div>
        <h2 className="font-display text-3xl uppercase tracking-tight">Got questions?</h2></div>
      <div className="max-w-2xl space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className="brand-panel reveal">
            <button onClick={()=>setOpen(open===i?null:i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm">
              {f.q}
              <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${open===i?'rotate-180':''}`}/>
            </button>
            {open===i&&<div className="px-5 pb-4 text-sm text-muted leading-relaxed">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
