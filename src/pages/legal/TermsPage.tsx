import { LegalLayout } from './LegalLayout'
export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" eyebrow="▸ LEGAL · THE FINE PRINT" date="26 June 2026">
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">01 Who we are & acceptance</h2>
        <p>"Yahavi Forge", "Forge", "we", "us" refer to <strong>Hackknow</strong>, operated by Gagan Chauhan, Delhi, India. By using forge.hackknow.com, you agree to these Terms and our Privacy Policy.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">02 What Forge is</h2>
        <p>Forge is a freemium AI career OS — 17 tools across Build, Analyze, Tailor, Outreach, and Strategy categories. A free tier is available; paid plans (₹49/₹249/₹2,499) unlock additional tools and features.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">03 BYOK — Bring Your Own Key</h2>
        <p>Forge uses a bring-your-own-key model. Your API keys are stored only in your browser's localStorage and are never transmitted to Hackknow servers. You are responsible for your provider accounts and any costs that arise.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">04 Billing & paid plans</h2>
        <p>Plans: Free ₹0 (BUILD tools, watermarked exports), Day Pass ₹49 (all tools, 24h), Monthly ₹249/mo, Yearly ₹2,499/yr. Payments via Razorpay in INR. Plans are not auto-renewing. Access delivered immediately on payment. See our <a href="/legal/refund" className="underline">Refund Policy</a>.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">05 Acceptable use</h2>
        <p>Do not use Forge to break laws, fabricate credentials, submit others' data without permission, or circumvent access controls. Misuse may result in account termination.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">06 AI output & no guarantees</h2>
        <p>AI output may be inaccurate or incomplete. You are responsible for reviewing all output before use. Forge does not guarantee interviews, job offers, or career outcomes.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">07 Limitation of liability</h2>
        <p>Our aggregate liability shall not exceed the greater of ₹1,000 or the total amount you paid us in the prior 3 months. We are not liable for indirect, incidental, or consequential damages.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">08 Governing law</h2>
        <p>These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Delhi, India. Contact: <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a></p></section>
    </LegalLayout>
  )
}
