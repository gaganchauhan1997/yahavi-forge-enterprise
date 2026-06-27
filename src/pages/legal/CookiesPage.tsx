import { LegalLayout } from './LegalLayout'
const items=[
  ['yahavi-forge-keys','localStorage','Your AI provider API keys — never sent to Hackknow','Until you clear it'],
  ['yahavi-forge-prefs','localStorage','Tool preferences, theme, tone settings','Until you clear it'],
  ['yahavi-forge-resumes','localStorage','Saved tool outputs pushed to Resume Output','Until you clear it'],
  ['yahavi-forge-theme','localStorage','Your chosen colour theme','Until you clear it'],
  ['yahavi-forge-cookie-consent','localStorage','Your cookie consent choice','Until you clear it'],
  ['yahavi-forge-session','localStorage','Paid access unlock record (no card data)','Expires with plan'],
  ['yahavi-forge-chat-seconds','localStorage','Cumulative Yahavi chat time (for loyalty coupon)','Until you clear it'],
  ['yahavi-forge-coupons','localStorage','Discount coupon codes issued to this device','Until you clear it'],
  ['hk-ecosystem-auth','localStorage','Supabase sign-in session (only if you sign in)','Until logout/expiry'],
  ['hk-next','sessionStorage','Temporary post-login redirect target — used once','Tab close'],
]
export function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" eyebrow="▸ COOKIES · MINIMAL BY DESIGN" date="26 June 2026">
      <p>Forge uses almost no cookies. We don't run advertising or cross-site tracking. The little we store lives in your browser to make the app work.</p>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">What we store</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-2 border-ink min-w-[600px]">
            <thead><tr className="bg-ink text-paper">{['Key','Type','Purpose','Lifetime'].map(h=><th key={h} className="p-2 text-left border-r border-paper/20 last:border-0">{h}</th>)}</tr></thead>
            <tbody>{items.map(([k,t,p,l])=>(
              <tr key={k} className="border-t border-ink/20">
                {[k,t,p,l].map((v,i)=><td key={i} className="p-2 border-r border-ink/10 last:border-0 font-mono">{v}</td>)}
              </tr>))}</tbody>
          </table>
        </div></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Third-party storage</h2>
        <p><strong>Supabase</strong> — sets auth storage when signed in. <strong>Razorpay</strong> — checkout.js may set cookies for fraud prevention. <strong>Google Fonts / jsDelivr</strong> — standard CDN request data (IP, user-agent).</p></section>
      <section><h2 className="font-display text-lg uppercase tracking-tight border-b-2 border-ink pb-2 mb-3">Managing cookies</h2>
        <p>Clear via Settings → Clear All, or your browser's site data controls. Questions: <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a></p></section>
    </LegalLayout>
  )
}
