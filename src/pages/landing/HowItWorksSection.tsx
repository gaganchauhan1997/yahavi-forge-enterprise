import { Link } from 'react-router';
import { Key, Settings, Wand2 } from 'lucide-react';

const steps = [
  { num: 'STEP 1', title: 'Grab a free API key', icon: Key, color: 'bg-[#FFD800]', description: 'Open console.groq.com/keys — sign up with email (no card), click Create Key, copy the gsk_... string. Takes 60 seconds.', fine: 'Groq is fastest. Gemini gives you 1M context. OpenRouter routes to 100+ models. All free tier — keep all three.' },
  { num: 'STEP 2', title: 'Paste it in KEYS', icon: Settings, color: 'bg-[#FAF6E9]', description: 'Open Yahavi Forge, click KEYS in the sidebar. Paste your key into the Groq field. Save. A green dot appears in the nav.', fine: 'Multiple keys = automatic fallback when one rate-limits. Forge routes to whichever has capacity.' },
  { num: 'STEP 3', title: 'Use 17 tools, instantly', icon: Wand2, color: 'bg-[#FF2D55] text-[#FAF6E9]', description: 'Open Resume Builder, paste your bullets, pick a tone, hit RUN. Or run ATS Checker on your resume vs a JD — get a 0-100 score instantly.', fine: null },
];

export default function HowItWorksSection() {
  return (
    <section id="tutorial" className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] tracking-tight uppercase text-[#111]"><span className="text-[#FF2D55]">02</span> How it works</h2>
          <span className="font-mono text-[11px] text-[#6b6b6b] tracking-widest uppercase">3 steps · 60 seconds · ₹0</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className={`brand-panel p-6 ${step.color.includes('text-') ? step.color : ''}`}>
                <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4 bg-[#111] text-[#FAF6E9] inline-block px-2.5 py-1">{step.num}</div>
                <div className="bg-[#FAF6E9] border-2 border-[#111] p-4 mb-5 flex items-center justify-center h-24"><Icon size={40} className={step.color.includes('bg-[#FF2D55]') ? 'text-[#FF2D55]' : 'text-[#111]'} /></div>
                <h3 className="font-display text-xl uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-3">{step.description}</p>
                {step.fine && <p className="font-mono text-[11px] leading-relaxed opacity-75 border-t border-dotted border-current pt-2.5 mt-3">{step.fine}</p>}
              </div>
            );
          })}
        </div>
        <p className="text-center"><Link to="/app" className="font-body text-sm font-semibold text-[#111] border-b-2 border-[#111] hover:bg-[#FFD800] hover:border-[#FFD800] px-1 transition-colors no-underline">See the full tutorial with animated walkthrough</Link></p>
      </div>
    </section>
  );
}
