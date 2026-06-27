export default function ComparisonSection() {
  const competitors = ['₹999–₹4,999/month for ATS + resume tools','Locked into their one AI — no choice','Free tier is a teaser, real value paywalled','Cancel = lose everything','8 generic templates everyone uses','No PWA, no install, no offline']
  const forge = ['₹0 to start. ₹49 day pass. ₹249/mo for everything.','6 AI providers — pick any, switch any time','BUILD tools free forever (with a small watermark)','Local ATS scorer — works without any AI key','17 tools, 5 categories — every step of the hunt','Auto-fallback across providers — never stuck']
  return (
    <section className="border-b-2 border-ink py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8 reveal">
        <div className="brand-eyebrow">01 WHY WE'RE BEST</div>
        <h2 className="font-display text-3xl uppercase tracking-tight">Side-by-side</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="brand-panel p-5 reveal">
          <div className="font-mono text-xs font-bold uppercase tracking-wider bg-ink/10 px-3 py-2 mb-4">Competitors</div>
          <ul className="space-y-2.5">{competitors.map((c,i)=><li key={i} className="flex gap-2 text-sm"><span className="text-pink font-bold flex-shrink-0">✗</span><span>{c}</span></li>)}</ul>
        </div>
        <div className="brand-panel-yellow p-5 brand-shadow reveal delay-1">
          <div className="font-mono text-xs font-bold uppercase tracking-wider bg-ink/20 px-3 py-2 mb-4">★ YAHAVI FORGE</div>
          <ul className="space-y-2.5">{forge.map((c,i)=><li key={i} className="flex gap-2 text-sm"><span className="font-bold flex-shrink-0">✅</span><span><strong>{c.split('.')[0]}</strong>{c.includes('.')?'.'+c.split('.').slice(1).join(''):''}</span></li>)}</ul>
        </div>
      </div>
    </section>
  )
}
