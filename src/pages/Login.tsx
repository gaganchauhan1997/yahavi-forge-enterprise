import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuthCtx } from '@/providers/AuthProvider'

export default function Login() {
  const { user, loading, signIn } = useAuthCtx()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      const next = sessionStorage.getItem('hk-next') || '/app'
      sessionStorage.removeItem('hk-next')
      const safe = next.startsWith('/') && !next.startsWith('/login') ? next : '/app'
      navigate(safe, { replace: true })
    }
  }, [user, loading, navigate])

  const handleSignIn = async () => {
    const params = new URLSearchParams(window.location.search)
    const next = params.get('next') || '/app'
    if (next.startsWith('/') && !next.startsWith('/login')) {
      sessionStorage.setItem('hk-next', next)
    }
    await signIn()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <Loader2 size={24} className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="brand-panel shadow-[8px_8px_0_#0A0A0A] w-full max-w-sm p-8">
        <div className="brand-eyebrow mb-4">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse inline-block"></span>
          HACKKNOW ACCOUNT · SSO
        </div>

        <h1 className="font-display text-3xl uppercase tracking-tight leading-none mb-1">
          SIGN IN TO
        </h1>
        <h1 className="font-display text-3xl uppercase tracking-tight leading-none mb-6">
          <span className="bg-yellow px-1 inline-block" style={{ transform: 'rotate(-1.5deg)' }}>FORGE</span>
        </h1>

        <p className="text-sm text-muted mb-6 leading-relaxed">
          One <strong>HackKnow account</strong> across the whole ecosystem.
          Sign in to sync your work, or continue as a guest — all tools work without an account.
        </p>

        <button
          onClick={() => void handleSignIn()}
          className="brand-btn brand-btn-dark w-full justify-center py-3.5 mb-3"
        >
          <svg viewBox="0 0 48 48" width="18" height="18">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Sign in with Google
        </button>

        <div className="text-center">
          <button
            onClick={() => navigate('/app')}
            className="text-sm text-muted underline hover:text-ink transition-colors"
          >
            Continue as Guest →
          </button>
          <p className="font-mono text-[9px] text-muted/60 mt-1">All 17 tools work without an account</p>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-ink/10">
          <p className="text-[10px] text-muted leading-relaxed">
            By continuing you agree to the{' '}
            <a href="/legal/terms" className="underline">Terms</a> and{' '}
            <a href="/legal/privacy" className="underline">Privacy Policy</a>.
          </p>
        </div>

        <a href="/" className="block mt-3 font-mono text-[10px] uppercase tracking-wider hover:text-pink transition-colors">
          ← Back to Home
        </a>
      </div>
    </div>
  )
}
