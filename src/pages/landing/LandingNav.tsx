import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuthCtx } from '@/providers/AuthProvider';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function LandingNav() {
  const { user, signIn, signOut } = useAuthCtx();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF6E9]/95 backdrop-blur-md border-b-2 border-[#111]' : 'bg-transparent'}`}>
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-2 no-underline border-none">
          <div className="w-8 h-8 bg-[#FFD800] border-2 border-[#111] flex items-center justify-center font-display text-sm font-black">Y</div>
          <span className="font-display text-lg tracking-tight text-[#111]">YAHAVI <span className="bg-[#111] text-[#FAF6E9] px-1.5 py-0.5 text-xs ml-1">FORGE</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <a href="#tools" className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#111] px-3 py-2 hover:bg-[#FFD800] transition-colors no-underline">Tools</a>
          <a href="#pricing" className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#111] px-3 py-2 hover:bg-[#FFD800] transition-colors no-underline">Pricing</a>
          <a href="#faq" className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#111] px-3 py-2 hover:bg-[#FFD800] transition-colors no-underline">FAQ</a>
          <Link to="/app" className="brand-btn brand-btn-primary ml-2 no-underline">Open App</Link>
          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="font-mono text-[11px] text-[#6b6b6b]">{user.name}</span>
              <button onClick={signOut} className="brand-btn brand-btn-ghost text-[10px] py-2 px-3">Sign Out</button>
            </div>
          ) : (
            <button onClick={signIn} className="brand-btn brand-btn-pink ml-2 no-underline">Sign In</button>
          )}
          <button onClick={toggleTheme} className="ml-2 p-2 border-2 border-[#111] hover:bg-[#FFD800] transition-colors">{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</button>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 bg-[#FFD800] border-2 border-[#111] flex items-center justify-center">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF6E9] border-b-2 border-[#111] px-4 py-4 space-y-2">
          <a href="#tools" onClick={() => setMobileOpen(false)} className="block font-mono text-xs font-bold tracking-widest uppercase py-2 border-none no-underline text-[#111]">Tools</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block font-mono text-xs font-bold tracking-widest uppercase py-2 border-none no-underline text-[#111]">Pricing</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block font-mono text-xs font-bold tracking-widest uppercase py-2 border-none no-underline text-[#111]">FAQ</a>
          <Link to="/app" onClick={() => setMobileOpen(false)} className="block brand-btn brand-btn-primary text-center no-underline">Open App</Link>
          {user ? <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full brand-btn brand-btn-ghost text-center">Sign Out</button> : <button onClick={() => { signIn(); setMobileOpen(false); }} className="block w-full brand-btn brand-btn-pink text-center">Sign In</button>}
        </div>
      )}
    </nav>
  );
}
