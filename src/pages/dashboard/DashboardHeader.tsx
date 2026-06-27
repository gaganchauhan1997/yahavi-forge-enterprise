import { Menu, Key, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthCtx } from '@/providers/AuthProvider'

interface DashboardHeaderProps {
  onMenuClick: () => void
  onOpenKeys: () => void
}

export default function DashboardHeader({ onMenuClick, onOpenKeys }: DashboardHeaderProps) {
  const { user, signOut } = useAuthCtx()

  const truncateName = (name: string, max = 14) =>
    name.length > max ? name.slice(0, max) + '…' : name

  return (
    <header className="h-14 border-b-2 border-ink bg-[#F5F0DC] flex items-center px-4 gap-3 flex-shrink-0 z-30">
      {/* Left: hamburger (mobile) + brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-[#F5F0DC] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 font-display text-base text-ink uppercase hover:opacity-80 transition-opacity"
        >
          <span className="bg-ink text-[#FFE500] w-7 h-7 flex items-center justify-center font-display text-sm font-bold">
            Y
          </span>
          <span className="hidden sm:inline">YAHAVI</span>
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: keys + auth */}
      <div className="flex items-center gap-2">
        {/* KEYS button */}
        <button
          onClick={onOpenKeys}
          className="flex items-center gap-1.5 bg-[#FF2D78] border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-ink hover:text-[#FF2D78] transition-colors"
        >
          <Key size={12} />
          KEYS
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink/70 hidden sm:inline bg-ink/10 border border-ink/20 px-2 py-1">
              {truncateName(user.name)}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 font-mono text-xs text-ink hover:bg-ink hover:text-[#F5F0DC] transition-colors"
              title="Sign out"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">OUT</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="border-2 border-ink px-3 py-1.5 font-mono text-xs text-ink hover:bg-ink hover:text-[#F5F0DC] transition-colors"
          >
            SIGN IN
          </Link>
        )}
      </div>
    </header>
  )
}
