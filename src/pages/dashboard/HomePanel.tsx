import { TOOLS, CATEGORIES } from '@/data/tools';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props { onSelectTool: (id: string) => void; }

export default function HomePanel({ onSelectTool }: Props) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1100px]">
      <section className="mb-8">
        <div className="inline-flex items-center gap-2 bg-[#111] text-[#FAF6E9] px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-4 brand-shadow-pink"><span className="w-2 h-2 bg-[#B6FF39] rounded-full animate-pulse" /> AI CAREER OS · LIVE · BY HACKKNOW</div>
        <h1 className="font-display text-[clamp(36px,6vw,72px)] leading-[0.92] tracking-[-0.04em] uppercase mb-4">YAHAVI<br /><span className="text-[#FF2D55] bg-[#FFD800] px-2 inline-block brand-border">FORGE</span></h1>
        <p className="font-body text-base text-[#3a3a3a] max-w-[640px] mb-6 leading-relaxed">Not a resume builder. The <strong className="bg-[#FFD800] px-1">AI hiring assistant</strong> that runs on free-tier intelligence — turning raw experience into <strong className="bg-[#FFD800] px-1">interview callbacks</strong>, ATS hits, and recruiter attention. 17 tools. Bring your own keys.</p>
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="brand-panel px-5 py-3 flex items-center gap-3"><span className="font-display text-2xl">17</span><span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b]">AI<br/>Modules</span></div>
          <div className="brand-panel px-5 py-3 flex items-center gap-3"><span className="font-display text-2xl">6</span><span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b]">Free<br/>Providers</span></div>
          <div className="brand-panel px-5 py-3 flex items-center gap-3"><span className="font-display text-2xl">₹0</span><span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b]">Monthly<br/>Cost</span></div>
          <div className="brand-panel px-5 py-3 flex items-center gap-3"><span className="font-display text-2xl">∞</span><span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b]">Unlimited<br/>Resumes</span></div>
        </div>
      </section>
      <div className="border-t-2 border-[#111] pt-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg uppercase tracking-tight"><span className="text-[#FF2D55]">MODULES</span> The Toolkit</h2>
          <span className="font-mono text-[10px] text-[#6b6b6b] tracking-widest uppercase">Click any tile · powered by your keys</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOOLS.map((tool) => {
            const cat = CATEGORIES.find((c) => c.id === tool.categoryId);
            return (
              <button key={tool.id} onClick={() => onSelectTool(tool.id)} className="brand-panel p-4 text-left transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0_#111] group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b]">{tool.num} · {tool.category?.toUpperCase()}</span>
                  {tool.freeTier && <span className="font-mono text-[7px] font-bold bg-[#B6FF39] text-[#111] px-1.5 py-0.5 border border-[#111]">FREE</span>}
                </div>
                <div className="font-display text-[15px] uppercase tracking-tight mb-1.5 flex items-center gap-2"><span>{tool.icon}</span>{tool.title}</div>
                <p className="font-body text-[12px] text-[#3a3a3a] leading-relaxed mb-3">{tool.subtitle}</p>
                <div className="flex items-center justify-between"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.color || '#111' }} /><span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#FF2D55] group-hover:text-[#111] flex items-center gap-1 transition-colors">OPEN <ArrowRight size={12} /></span></div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 brand-panel-yellow p-4 flex items-start gap-3">
        <Sparkles size={20} className="flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1">PRO TIP</div>
          <p className="font-body text-[13px]">Add API keys from multiple providers (Groq + Gemini + OpenRouter) for automatic fallback when one rate-limits. Your keys never leave your browser.</p>
        </div>
      </div>
    </div>
  );
}
