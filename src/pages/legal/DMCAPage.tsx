import { LegalLayout } from './LegalLayout'
export function DMCAPage() {
  return (
    <LegalLayout title="Copyright & DMCA" eyebrow="▸ COPYRIGHT · TAKEDOWN" date="26 June 2026">
      <p>Hackknow respects intellectual property. If you believe content associated with Yahavi Forge infringes your copyright, send us a notice and we will act promptly.</p>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Filing a takedown notice</h2>
        <p>Email <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a> with subject "DMCA Notice" including: identification of the copyrighted work, URL of allegedly infringing material, your contact details, good-faith belief statement, perjury statement, and your signature.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Note on AI-generated content</h2>
        <p>Forge generates text in your browser from your own inputs using your own AI keys. Hackknow does not host user resume content on its servers.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Contact</h2>
        <p>Copyright agent: <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a> · Hackknow, Delhi, India</p></section>
    </LegalLayout>
  )
}
