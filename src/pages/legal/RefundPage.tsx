import { LegalLayout } from './LegalLayout'
export function RefundPage() {
  return (
    <LegalLayout title="Refund & Cancellation" eyebrow="▸ REFUNDS · PAID PLANS" date="26 June 2026">
      <div className="bg-ink text-paper p-4 font-mono text-sm border-2 border-ink">
        <strong>Default policy:</strong> No refunds once paid access is activated (digital goods, instant delivery). Exceptions apply — see below.
      </div>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Plan policies</h2>
        <table className="w-full text-sm border-2 border-ink">
          <thead><tr className="bg-ink text-paper"><th className="p-2 text-left border-r border-paper/20">Plan</th><th className="p-2 text-left border-r border-paper/20">Price</th><th className="p-2 text-left">Policy</th></tr></thead>
          <tbody>
            {[['Day Pass','₹49','No refund after activation. If tools inaccessible for full 24h due to Forge outage, contact within 7 days.'],
              ['Monthly','₹249/mo','No refund. Forge outages exceeding 48h → pro-rated credit.'],
              ['Yearly','₹2,499/yr','No refund. Outages 48h+ → pro-rated credit. If Forge shuts down → pro-rated refund for unused period.']
            ].map(([p,pr,pol])=>(
              <tr key={p} className="border-t-2 border-ink"><td className="p-2 border-r-2 border-ink font-bold">{p}</td><td className="p-2 border-r-2 border-ink">{pr}</td><td className="p-2">{pol}</td></tr>
            ))}
          </tbody>
        </table></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Refund exceptions</h2>
        <p>We will issue a refund for: access not delivered within 15 minutes of payment, duplicate charge, Forge service discontinued. To request: email <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a> with your Razorpay payment ID. We respond within 2 business days.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Payment processor</h2>
        <p>Payments via <strong>Razorpay Software Pvt Ltd</strong>. Card/UPI details handled by Razorpay, not Hackknow. See razorpay.com/terms for their policies.</p></section>
    </LegalLayout>
  )
}
