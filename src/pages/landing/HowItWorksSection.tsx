export default function HowItWorksSection() {
  const steps = [
    {n:'01',t:'Grab a free API key',d:'Go to console.groq.com/keys — sign up with email (no card), click Create Key, copy the gsk_... string. Takes 60 seconds.',note:'▸ Groq is fastest. Gemini gives 1M context. OpenRouter routes to 100+ models.'},
    {n:'02',t:'Paste it in ▸ KEYS',d:'Open Yahavi Forge, click ▸ KEYS in the header. Paste your key into the Groq field. A green dot appears in the nav.',note:'▸ Multiple keys = automatic fallback when one rate-limits.'},
    {n:'03',t:'Use 17 tools, instantly',d:'Open Resume Builder, paste your bullets, pick a tone, hit RUN. Or run ATS Scorer on your resume vs a JD — get a 0–100 score instantly.',note:'▸ See the full tutorial for animated walkthroughs.'},
  ]
  return (
    <section className="border-b-2 border-ink py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10 reveal">
        <div className="brand-eyebrow">02 HOW IT WORKS</div>
        <h2 className="font-display text-3xl uppercase tracking-tight">3 steps · 60 seconds · ₹0</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {steps.map((s,i)=>(
          <div key={s.n} className={`brand-panel p-6 reveal delay-${i+1}`}>
            <div className="font-display text-6xl text-ink/10 mb-3">{s.n}</div>
            <h3 className="font-display text-lg uppercase tracking-tight mb-2">{s.t}</h3>
            <p className="text-sm text-muted leading-relaxed mb-3">{s.d}</p>
            <p className="font-mono text-[10px] text-muted/70">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
