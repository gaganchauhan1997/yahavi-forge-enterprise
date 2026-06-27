import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthCtx } from '@/providers/AuthProvider'
import { useKeys } from '@/hooks/useKeys'

interface ResumeItem { id: string; title: string; source_tool: string; created_at: string; content: string }

export default function Settings() {
  const { user, signOut } = useAuthCtx()
  const { keys, clearAll, activeCount } = useKeys()
  const [theme, setTheme] = useState(localStorage.getItem('yahavi-forge-theme') || 'light')
  const [history, setHistory] = useState<ResumeItem[]>([])
  const [consent, setConsent] = useState(localStorage.getItem('yahavi-forge-cookie-consent') || '')

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem('yahavi-forge-resumes') || '[]') as ResumeItem[]) } catch {}
  }, [])

  const applyTheme = (t: string) => {
    setTheme(t)
    localStorage.setItem('yahavi-forge-theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  const clearHistory = () => {
    if (!confirm('Clear all saved outputs?')) return
    localStorage.removeItem('yahavi-forge-resumes')
    setHistory([])
  }

  const clearEverything = () => {
    if (!confirm('Delete ALL local data? This cannot be undone.')) return
    Object.keys(localStorage).filter(k => k.startsWith('yahavi-forge')).forEach(k => localStorage.removeItem(k))
    window.location.reload()
  }

  const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="brand-panel p-5 mb-5">
      <h2 className="font-display text-sm uppercase tracking-wider mb-4 pb-2 border-b-2 border-ink">{title}</h2>
      {children}
    </section>
  )

  const Row = ({ label, fine, children }: { label: string; fine?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 border-b border-ink/10 last:border-0 gap-4 flex-wrap">
      <div>
        <div className="font-semibold text-sm">{label}</div>
        {fine && <div className="font-mono text-[10px] text-muted mt-0.5">{fine}</div>}
      </div>
      {children}
    </div>
  )

  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b-2 border-ink px-6 py-3.5 flex items-center justify-between bg-paper sticky top-0 z-10">
        <div className="font-display text-base uppercase tracking-tight">Settings</div>
        <Link to="/app" className="brand-btn brand-btn-ghost text-[10px] py-1.5 px-3">▸ BACK TO APP</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <S title="🎨 Appearance">
          <Row label="Theme" fine="Paper (light) · Dark (grey)">
            <div className="flex gap-2">
              {['light','dark'].map(t => (
                <button key={t} onClick={() => applyTheme(t)}
                  className={`brand-btn text-[10px] py-1.5 px-3 ${theme===t ? 'brand-btn-dark':'brand-btn-ghost'}`}>
                  {t==='light'?'☀ Paper':'☾ Dark'}
                </button>
              ))}
            </div>
          </Row>
        </S>

        <S title="🔑 API Keys">
          <Row label="Active keys" fine={`${activeCount} key${activeCount!==1?'s':''} configured`}>
            <Link to="/app" className="brand-btn brand-btn-primary text-[10px] py-1.5 px-3">▸ MANAGE KEYS</Link>
          </Row>
          <Row label="Revoke all keys" fine="Removes keys from this browser only">
            <button onClick={() => { if(confirm('Remove all API keys?')) clearAll() }}
              className="brand-btn text-[10px] py-1.5 px-3 bg-pink text-paper border-ink">
              ▸ REVOKE ALL
            </button>
          </Row>
        </S>

        <S title="📋 Output History">
          <Row label="Saved outputs" fine={`${history.length} item${history.length!==1?'s':''} · cleared if you clear browser cache`}>
            <button onClick={clearHistory} className="brand-btn text-[10px] py-1.5 px-3 bg-pink text-paper border-ink">
              ▸ CLEAR
            </button>
          </Row>
          {history.slice(0,5).map((h) => (
            <div key={h.id} className="py-2 border-b border-ink/10 last:border-0">
              <div className="font-semibold text-sm truncate">{h.title}</div>
              <div className="font-mono text-[9px] text-muted">{h.source_tool} · {h.created_at}</div>
            </div>
          ))}
        </S>

        <S title="🍪 Privacy">
          <Row label="Cookie consent" fine="Controls what Forge may store locally">
            <div className="flex gap-2">
              {['essential','all'].map(c => (
                <button key={c} onClick={() => { setConsent(c); localStorage.setItem('yahavi-forge-cookie-consent', c) }}
                  className={`brand-btn text-[10px] py-1.5 px-3 ${consent===c?'brand-btn-dark':'brand-btn-ghost'}`}>
                  {c==='all'?'Accept All':'Essential'}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Policies">
            <div className="flex gap-2 flex-wrap">
              {[['Privacy','/legal/privacy'],['Cookies','/legal/cookies'],['Terms','/legal/terms']].map(([l,h])=>(
                <Link key={l} to={h} className="brand-btn brand-btn-ghost text-[10px] py-1.5 px-3">{l}</Link>
              ))}
            </div>
          </Row>
        </S>

        <S title="👤 Account">
          {user ? (
            <>
              <Row label={`Signed in as ${user.email}`} fine="Synced to HackKnow ecosystem">
                <button onClick={() => void signOut()} className="brand-btn text-[10px] py-1.5 px-3 bg-pink text-paper border-ink">
                  ▸ LOGOUT
                </button>
              </Row>
            </>
          ) : (
            <Row label="Not signed in" fine="Sign in to sync across devices">
              <Link to="/login" className="brand-btn brand-btn-dark text-[10px] py-1.5 px-3">▸ SIGN IN</Link>
            </Row>
          )}
          <Row label="Clear all local data" fine="Keys, history, drafts, prefs — cannot be undone">
            <button onClick={clearEverything} className="brand-btn text-[10px] py-1.5 px-3 bg-pink text-paper border-ink">
              ▸ CLEAR EVERYTHING
            </button>
          </Row>
        </S>

        <p className="text-center font-mono text-[9px] text-muted py-4">
          ▸ All data stored locally · <Link to="/legal/privacy" className="underline">Privacy</Link> · <Link to="/legal/cookies" className="underline">Cookies</Link> · <a href="mailto:team@hackknow.com" className="underline">team@hackknow.com</a>
        </p>
      </div>
    </div>
  )
}
