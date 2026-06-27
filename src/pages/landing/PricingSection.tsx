import { Link } from 'react-router-dom'
const plans=[
  {n:'FREE',p:'₹0',per:'forever',f:['BUILD category (5 tools)','Local ATS scorer — no key needed','Unlimited outputs','Small watermark on exports','Community support'],cta:'Get Started',link:'/login?mode=signup',feat:false},
  {n:'DAY PASS',p:'₹49',per:'24 hours · all tools',f:['All 17 tools unlocked','No watermark on exports','Unlimited generations','All export formats','Perfect for sprint applying'],cta:'Buy Day Pass',link:'/login?mode=signup&plan=day',feat:false},
  {n:'ALL TOOLS',p:'₹249',per:'/month · best value',f:['All 17 tools, every day','No watermark on any export','Priority AI routing','Cloud sync (coming soon)','Cancel anytime'],cta:'Go Monthly',link:'/login?mode=signup&plan=monthly',feat:true},
  {n:'YEARLY',p:'₹2,499',per:'/yr · save 17%',f:['Everything in Monthly','Save 17% vs monthly','Early access to new tools','1-on-1 resume review'],cta:'Go Yearly',link:'/login?mode=signup&plan=yearly',feat:false},
]
export default function PricingSection() {
  return (
    <section className="border-b-2 border-ink py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10 reveal"><div className="brand-eyebrow">04 PRICING</div>
        <h2 className="font-display text-3xl uppercase tracking-tight">Honest. Pick what fits.</h2></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p,i)=>(
          <div key={p.n} className={`flex flex-col border-2 border-ink p-5 reveal delay-${i+1} ${p.feat?'bg-yellow brand-shadow-pink':''}`}>
            {p.feat&&<div className="font-mono text-[9px] font-bold uppercase tracking-widest text-pink mb-2">★ MOST POPULAR</div>}
            <div className="font-display text-xs uppercase tracking-wider mb-1">{p.n}</div>
            <div className="font-display text-3xl mb-0.5">{p.p}</div>
            <div className="font-mono text-[10px] text-muted mb-4">{p.per}</div>
            <ul className="space-y-1.5 flex-1 mb-5">{p.f.map(f=><li key={f} className="flex gap-2 text-xs"><span className="font-bold">✅</span>{f}</li>)}</ul>
            <Link to={p.link} className={`brand-btn justify-center text-[10px] py-2.5 ${p.feat?'brand-btn-dark':'brand-btn-ghost'}`}>{p.cta}</Link>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-muted font-mono space-y-1 reveal">
        <div>🎓 Student 80% off: upload graduation or 12th marksheet → 20% of the price</div>
        <div>👋 Beginner free month: first-time job seekers get 30 days free</div>
        <div>🏢 Enterprise: custom — <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a></div>
      </div>
    </section>
  )
}
