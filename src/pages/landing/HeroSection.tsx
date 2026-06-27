import { Link } from 'react-router';
import { useAuthCtx } from '@/providers/AuthProvider';
import { ArrowRight, Sparkles, Zap, Infinity } from 'lucide-react';

export default function HeroSection() {
  const { user, signIn } = useAuthCtx();
  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1180px] mx-auto">
        <div className="inline-flex items-center gap-2.5 bg-[#111] text-[#FAF6E9] px-4 py-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6 brand-shadow-pink">
          <span className="w-2 h-2 bg-[#B6FF39] rounded-full animate-pulse" /> 17 AI TOOLS · 6 FREE PROVIDERS · ₹0 TO START
        </div>
        <h1 className="font-display text-[clamp(42px,8vw,96px)] leading-[0.92] tracking-[-0.05em] uppercase text-[#111] mb-5">
          Job hunting<br /><span className="text-[#FF2D55] bg-[#FFD800] px-3 inline-block brand-border">is broken.</span><br />We fixed it.
        </h1>
        <p className="font-body text-[clamp(15px,1.8vw,19px)] leading-relaxed text-[#3a3a3a] max-w-[760px] mb-8">
          Yahavi Forge is the <strong className="bg-[#FFD800] text-[#111] px-1 font-bold">AI hiring assistant</strong> that turns raw experience into <strong className="bg-[#FFD800] text-[#111] px-1 font-bold">interview callbacks</strong>, ATS hits, and recruiter attention. <strong className="text-[#111]">17 tools.</strong> Free to start. Bring your own keys.
        </p>
        <div className="flex flex-wrap gap-3.5 mb-10">
          {user ? (
            <Link to="/app" className="brand-btn brand-btn-primary text-sm py-4 px-7 no-underline"><Sparkles size={18} /> Open Forge <ArrowRight size={16} /></Link>
          ) : (
            <button onClick={signIn} className="brand-btn brand-btn-primary text-sm py-4 px-7"><Sparkles size={18} /> Sign Up Free <ArrowRight size={16} /></button>
          )}
          <Link to="/app" className="brand-btn brand-btn-ghost text-sm py-4 px-7 no-underline">Try Without Account <ArrowRight size={16} /></Link>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="brand-panel px-6 py-4 flex items-center gap-3"><span className="font-display text-3xl text-[#111]">17</span><span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#6b6b6b]">AI<br/>Modules</span></div>
          <div className="brand-panel px-6 py-4 flex items-center gap-3"><Zap size={28} className="text-[#FFD800]" /><span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#6b6b6b]">6 Free<br/>Providers</span></div>
          <div className="brand-panel px-6 py-4 flex items-center gap-3"><span className="font-display text-3xl text-[#FF2D55]">₹0</span><span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#6b6b6b]">Monthly<br/>Cost</span></div>
          <div className="brand-panel px-6 py-4 flex items-center gap-3"><Infinity size={28} className="text-[#111]" /><span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#6b6b6b]">Unlimited<br/>Resumes</span></div>
        </div>
      </div>
    </section>
  );
}
