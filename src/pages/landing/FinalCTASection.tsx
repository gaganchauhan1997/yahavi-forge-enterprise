import { useAuthCtx } from '@/providers/AuthProvider';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  const { user, signIn } = useAuthCtx();
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[1180px] mx-auto">
        <div className="brand-panel-dark text-center py-14 px-8 brand-shadow-pink">
          <div className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-[#FFD800] mb-4">NO CARD ON SIGN-UP · CANCEL ANYTIME</div>
          <h2 className="font-display text-[clamp(32px,5vw,60px)] leading-[0.95] tracking-tight uppercase text-[#FAF6E9] mb-6">
            Stop paying<br />for tools that<br /><span className="bg-[#FFD800] text-[#111] px-3 inline-block">should be free.</span>
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {user ? (
              <a href="/app" className="brand-btn brand-btn-primary text-sm py-4 px-7 no-underline"><Sparkles size={18} /> Open Forge <ArrowRight size={16} /></a>
            ) : (
              <button onClick={signIn} className="brand-btn brand-btn-primary text-sm py-4 px-7"><Sparkles size={18} /> Sign Up Free <ArrowRight size={16} /></button>
            )}
            <a href="/app" className="brand-btn brand-btn-ghost text-sm py-4 px-7 bg-transparent text-[#FAF6E9] border-[#FAF6E9] hover:bg-[#FAF6E9] hover:text-[#111] hover:border-[#FAF6E9] no-underline">Try Without Account</a>
          </div>
          <a href="/app" className="font-mono text-[11px] tracking-widest uppercase text-[#FFD800] border-b border-dotted border-[#FFD800] hover:text-[#FAF6E9] hover:border-[#FAF6E9] transition-colors no-underline">Or open the app without signing up →</a>
        </div>
      </div>
    </section>
  );
}
