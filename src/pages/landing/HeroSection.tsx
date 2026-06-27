import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="border-b-2 border-ink px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="brand-eyebrow reveal">
        <span className="w-2 h-2 bg-green rounded-full animate-pulse inline-block"></span>
        17 AI TOOLS · 6 FREE PROVIDERS · ₹0 TO START
      </div>

      <h1 className="font-display text-[clamp(52px,10vw,96px)] leading-[0.92] tracking-[-0.03em] uppercase mb-5 reveal delay-1">
        Job hunting<br/>
        is <span className="bg-yellow px-2 text-pink" style={{display:'inline-block',transform:'rotate(-1deg)'}}>broken.</span><br/>
        We fixed it.
      </h1>

      <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-muted mb-8 reveal delay-2">
        Yahavi Forge is the AI career OS that turns raw experience into{' '}
        <strong className="text-ink">interview callbacks</strong>, ATS hits, and recruiter attention.{' '}
        <strong>17 tools.</strong> Free to start. Bring your own free AI keys.
      </p>

      <div className="flex gap-3 flex-wrap mb-10 reveal delay-3">
        <Link to="/login?mode=signup" className="brand-btn brand-btn-pink text-sm py-3.5 px-7">
          ▸ SIGN UP — FREE
        </Link>
        <Link to="/app" className="brand-btn brand-btn-ghost text-sm py-3.5 px-7">
          ▸ TRY WITHOUT ACCOUNT
        </Link>
      </div>

      <div className="flex gap-4 flex-wrap reveal delay-4">
        {[['17','TOOLS'],['6','FREE PROVIDERS'],['₹49','DAY PASS'],['₹249','ALL TOOLS/MO']].map(([n,l])=>(
          <div key={l} className="brand-panel px-5 py-3 flex items-baseline gap-2.5">
            <strong className="font-display text-2xl">{n}</strong>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
