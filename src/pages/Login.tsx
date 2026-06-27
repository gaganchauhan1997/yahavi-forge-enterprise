import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthCtx } from '@/providers/AuthProvider';
import { LogIn, ArrowLeft, Sparkles } from 'lucide-react';

export default function Login() {
  const { user, signIn } = useAuthCtx();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/app'); }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#FAF6E9] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#6b6b6b] hover:text-[#111] mb-8 no-underline border-none">
          <ArrowLeft size={14} /> Back to home
        </Link>
        <div className="brand-panel p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#111] text-[#FAF6E9] px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] uppercase mb-5 brand-shadow-pink">
              <Sparkles size={12} /> SIGN IN
            </div>
            <h1 className="font-display text-2xl uppercase tracking-tight mb-2">
              Welcome to <span className="text-[#FF2D55]">Yahavi</span> Forge
            </h1>
            <p className="font-mono text-[11px] text-[#6b6b6b] tracking-wider">
              Sign in to save your work and access premium tools
            </p>
          </div>
          <button onClick={signIn} className="brand-btn brand-btn-primary w-full justify-center text-sm py-4">
            <LogIn size={18} /> Sign in with Google
          </button>
          <div className="mt-6 text-center">
            <p className="font-mono text-[10px] text-[#6b6b6b] leading-relaxed">
              No password needed. We use secure OAuth sign-in. Your data is never shared with third parties.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/app" className="font-mono text-[11px] tracking-widest uppercase text-[#FF2D55] hover:text-[#111] no-underline border-none">
            Or continue without signing in →
          </Link>
        </div>
      </div>
    </div>
  );
}
