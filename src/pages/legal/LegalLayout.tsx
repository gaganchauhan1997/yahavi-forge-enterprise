import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
interface LegalLayoutProps { title: string; eyebrow: string; date?: string; children: ReactNode }
export function LegalLayout({ title, eyebrow, date, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b-2 border-ink px-6 py-3.5 flex items-center justify-between sticky top-0 bg-paper z-10">
        <Link to="/" className="flex items-center gap-2 no-underline border-none">
          <div className="w-7 h-7 bg-yellow border-2 border-ink flex items-center justify-center font-display text-sm">Y</div>
          <span className="font-display text-sm uppercase">Yahavi Forge</span>
        </Link>
        <Link to="/" className="brand-btn brand-btn-ghost text-[10px] py-1.5 px-3">← Back to Home</Link>
      </nav>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="brand-eyebrow mb-4">{eyebrow}</div>
        <h1 className="font-display text-4xl uppercase tracking-tight leading-tight mb-2">{title}</h1>
        {date && <p className="font-mono text-[10px] text-muted mb-8">Effective: {date} · Yahavi Forge by Hackknow</p>}
        <div className="prose-sm space-y-6 text-[15px] leading-relaxed">{children}</div>
      </main>
      <footer className="border-t-2 border-ink px-6 py-4 text-center font-mono text-[10px] text-muted">
        <div className="flex justify-center gap-4 flex-wrap">
          {[['Terms','/legal/terms'],['Privacy','/legal/privacy'],['Cookies','/legal/cookies'],['Refund','/legal/refund']].map(([l,h])=>(
            <Link key={l} to={h} className="underline">{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
