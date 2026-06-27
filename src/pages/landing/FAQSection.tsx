import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const faqs = [
  { q: 'What is BYOK (Bring Your Own Key)?', a: 'BYOK means you use your own free API keys from AI providers like Groq, Google Gemini, or OpenRouter. Your keys stay in your browser — we never see them. This keeps costs low and gives you full control over which AI models you use.' },
  { q: 'Is it really free?', a: 'Yes! The BUILD category (Resume Builder, Bullet Upgrader, Gap Framer, Achievement Forge) is free forever with a small watermark. The ATS local scorer works without any API key. To unlock all 17 tools, you can get a ₹49 day pass or ₹249/month subscription.' },
  { q: 'How do I get a free API key?', a: 'Go to console.groq.com/keys, sign up with your email (no credit card), and create a key. It takes 60 seconds. You can also get free keys from Google Gemini (aistudio.google.com) or OpenRouter (openrouter.ai).' },
  { q: 'Is my data safe?', a: 'Absolutely. Your API keys are stored only in your browser localStorage and are never sent to our servers. All AI processing happens directly between your browser and the AI provider. You can delete your keys at any time.' },
  { q: 'What happens if my API key rate-limits?', a: 'If you add multiple keys (Groq + Gemini + OpenRouter), Forge automatically falls back to another provider when one hits its rate limit. You will never be stuck mid-session.' },
  { q: 'Do you offer student discounts?', a: 'Yes! Students get 80% off with a valid marksheet upload. That means ₹49/month instead of ₹249. We also offer a free first month for first-time job seekers.' },
  { q: 'Can I use this on mobile?', a: 'Yes! Yahavi Forge is a Progressive Web App (PWA). You can install it on your phone and use it offline for certain features. The entire experience is fully responsive.' },
  { q: 'What languages does the chatbot support?', a: 'Yahavi (our AI assistant) supports English, Hindi, Hinglish, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, Urdu, and many more languages. She mirrors your language automatically.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] tracking-tight uppercase text-[#111]"><span className="text-[#FF2D55]">06</span> FAQ</h2>
          <span className="font-mono text-[11px] text-[#6b6b6b] tracking-widest uppercase">Got questions?</span>
        </div>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#FAF6E9] border-2 border-[#111] cursor-pointer transition-shadow hover:shadow-[4px_4px_0_#111]" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-body text-[15px] font-semibold pr-8">{faq.q}</span>
                <ChevronRight size={22} className={`text-[#FF2D55] flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-90' : ''}`} />
              </div>
              {open === i && <div className="px-5 pb-4 border-t border-dotted border-[#111] pt-3"><p className="font-body text-[13.5px] leading-relaxed text-[#3a3a3a]">{faq.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
