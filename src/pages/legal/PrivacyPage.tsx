import { LegalLayout } from './LegalLayout'
export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" eyebrow="▸ PRIVACY · YOUR DATA, YOUR DEVICE" date="26 June 2026">
      <div className="bg-yellow border-2 border-ink p-4 font-mono text-sm">
        <strong>The core promise:</strong> Your API keys and resume/job text are processed in your browser and never stored on Hackknow servers.
      </div>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">What we collect</h2>
        <p>If you sign in: email, name, avatar (from OAuth), login timestamps, session tokens. If you pay: Razorpay payment ID, plan, timestamp (no card numbers — handled by Razorpay). Local-only: API keys, preferences, chat time, coupons — stored on your device only, we cannot see them.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">What we don't collect</h2>
        <p>Your AI provider API keys (never transmitted to us). Your resume or job description content (goes directly to AI provider from your browser). We do not sell data or use third-party advertising.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Data processors</h2>
        <p>Supabase (auth, Singapore region), Cloudflare (hosting, CDN), Razorpay (payments — card data handled by Razorpay PCI-DSS systems, not us), Google/GitHub (OAuth if used), AI providers (your input via your key — not us).</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Your rights</h2>
        <p>Access, correct, delete, or export your account data. Email <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a>. Most sensitive data is on your device and already under your control — clear it via Settings → Clear All.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Contact</h2>
        <p><a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a> · Hackknow, Delhi, India</p></section>
    </LegalLayout>
  )
}
