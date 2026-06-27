import { LegalLayout } from './LegalLayout'
export function DPAPage() {
  return (
    <LegalLayout title="Data Processing Addendum" eyebrow="▸ DPA · ENTERPRISE" date="26 June 2026">
      <p>This Data Processing Addendum forms part of the Terms &amp; Conditions between Hackknow and enterprise customers who require GDPR or India DPDP Act compliance documentation.</p>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Scope</h2><p>This DPA applies to enterprise accounts where Hackknow processes personal data on behalf of the Customer as a data processor. For individual users, the Privacy Policy applies directly.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Data processed</h2><p>Account data (email, name), usage logs, payment records. BYOK keys and resume content are not processed by Hackknow (processed client-side and by AI providers directly).</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Sub-processors</h2><p>Supabase (auth/DB, Singapore), Cloudflare (hosting), Razorpay (payments). Full sub-processor list available on request.</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Contact</h2><p>Enterprise DPA requests: <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a></p></section>
    </LegalLayout>
  )
}
