const testimonials = [
  { quote: 'Got 3 interview calls in 4 days after running Truth-Lock Tailor against a Stripe JD. The NEEDS EVIDENCE tags forced honesty — and somehow that made the resume stronger.', name: 'A.K.', location: 'Bengaluru', role: 'Senior FE Eng', bg: 'bg-[#FAF6E9]' },
  { quote: 'Used the Roast tool on a Friday night. Cried. Fixed. Cleared FAANG screen on Monday. ₹49 day pass paid for itself a hundred times over.', name: 'R.P.', location: 'Hyderabad', role: 'ML Engineer', bg: 'bg-[#FFD800]' },
  { quote: 'Application Pack saved me 4 hours per role. Resume + cover + recruiter DM + follow-ups, all tailored. Applied to 27 roles in one weekend.', name: 'S.M.', location: 'Mumbai', role: 'Product Manager', bg: 'bg-[#FAF6E9]' },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] tracking-tight uppercase text-[#111]"><span className="text-[#FF2D55]">05</span> What people say</h2>
          <span className="font-mono text-[11px] text-[#6b6b6b] tracking-widest uppercase">Early users</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className={`brand-panel p-6 ${t.bg}`}>
              <p className="font-body text-[15px] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="font-mono text-[11px] tracking-widest uppercase opacity-75">{t.name} · {t.location} · {t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
