const testimonials=[
  {q:'Got 3 interview calls in 4 days after running Truth-Lock Tailor against a Stripe JD. The "NEEDS EVIDENCE" tags forced honesty — and somehow that made the resume stronger.',by:'A.K. · Bengaluru · Senior FE Eng',stars:5},
  {q:'Used the Roast tool on a Friday night. Cried. Fixed. Cleared FAANG screen on Monday. ₹49 day pass paid for itself a hundred times over.',by:'R.P. · Hyderabad · ML Engineer',stars:5},
  {q:'Application Pack saved me 4 hours per role. Resume + cover + recruiter DM + follow-ups, all tailored. Applied to 27 roles in one weekend.',by:'S.M. · Mumbai · Product Manager',stars:5},
]
export default function TestimonialsSection() {
  return (
    <section className="border-b-2 border-ink py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10 reveal"><div className="brand-eyebrow">05 WHAT PEOPLE SAY</div>
        <h2 className="font-display text-3xl uppercase tracking-tight">Early users</h2></div>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t,i)=>(
          <div key={i} className={`brand-panel p-6 reveal delay-${i+1}`}>
            <div className="flex gap-0.5 mb-3">{'★★★★★'.split('').map((_,j)=><span key={j} className="text-yellow text-lg">★</span>)}</div>
            <p className="text-sm leading-relaxed mb-4 italic">"{t.q}"</p>
            <div className="font-mono text-[10px] text-muted">▸ {t.by}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
