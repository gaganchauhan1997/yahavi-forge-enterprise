import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('yahavi-forge-theme') || 'light')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('yahavi-forge-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 no-underline border-none">
          <div className="w-8 h-8 bg-yellow border-2 border-ink flex items-center justify-center font-display text-lg shadow-[2px_2px_0_#0A0A0A]">
            Y
          </div>
          <span className="font-display text-sm uppercase tracking-tight">YAHAVI</span>
          <span className="font-mono text-[9px] bg-ink text-paper px-1.5 py-0.5">FORGE</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleTheme} className="brand-btn brand-btn-ghost text-[10px] py-1.5 px-3" aria-label="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <Link to="/login" className="brand-btn brand-btn-ghost text-[10px] py-1.5 px-3">▸ SIGN IN</Link>
          <Link to="/login?mode=signup" className="brand-btn brand-btn-pink text-[10px] py-1.5 px-3">▸ SIGN UP — FREE</Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1" aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-paper px-4 py-3 space-y-2">
          <Link to="/login" className="brand-btn brand-btn-ghost w-full justify-center" onClick={() => setMenuOpen(false)}>▸ SIGN IN</Link>
          <Link to="/login?mode=signup" className="brand-btn brand-btn-pink w-full justify-center" onClick={() => setMenuOpen(false)}>▸ SIGN UP — FREE</Link>
          <button onClick={toggleTheme} className="brand-btn brand-btn-ghost w-full justify-center">
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
        </div>
      )}
    </nav>
  )
}
