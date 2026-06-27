import { Link } from 'react-router-dom'
export default function FinalCTASection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
      <div className="brand-panel-dark inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-yellow mb-6 reveal">▸ NO CARD ON SIGN-UP · CANCEL ANYTIME</div>
      <h2 className="font-display text-[clamp(36px,7vw,72px)] uppercase tracking-tight leading-[0.95] mb-6 reveal delay-1">
        Stop paying<br/>for tools that<br/>should be free.
      </h2>
      <div className="flex gap-3 justify-center flex-wrap reveal delay-2">
        <Link to="/login?mode=signup" className="brand-btn brand-btn-pink text-sm py-3.5 px-8">▸ SIGN UP — FREE</Link>
        <Link to="/app" className="brand-btn brand-btn-ghost text-sm py-3.5 px-8">▸ TRY WITHOUT ACCOUNT</Link>
      </div>
      <p className="mt-4 font-mono text-[10px] text-muted reveal delay-3">
        Or <Link to="/app" className="underline">open the app without signing up →</Link>
      </p>
    </section>
  )
}
