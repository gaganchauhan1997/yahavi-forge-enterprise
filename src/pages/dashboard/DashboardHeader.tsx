import { Link } from 'react-router';
import { useAuthCtx } from '@/providers/AuthProvider';
import { Menu, KeyRound, User } from 'lucide-react';

interface Props { onOpenKeys: () => void; onOpenSidebar: () => void; activeTool: string | null; }

export default function DashboardHeader({ onOpenKeys, onOpenSidebar, activeTool }: Props) {
  const { user, signOut } = useAuthCtx();

  return (
    <header className="h-14 bg-[#FAF6E9] border-b-2 border-[#111] flex items-center px-3 gap-3 flex-shrink-0 z-30 relative">
      <button onClick={onOpenSidebar} className="lg:hidden w-9 h-9 bg-[#FFD800] border-2 border-[#111] flex items-center justify-center hover:bg-[#111] hover:text-[#FFD800] transition-colors">
        <Menu size={18} />
      </button>
      <Link to="/" className="flex items-center gap-2 no-underline border-none flex-shrink-0">
        <div className="w-7 h-7 bg-[#FFD800] border-2 border-[#111] flex items-center justify-center font-display text-xs font-black">Y</div>
        <span className="font-display text-sm tracking-tight hidden sm:inline">YAHAVI <span className="bg-[#111] text-[#FAF6E9] px-1 text-[9px] ml-0.5">FORGE</span></span>
      </Link>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <button onClick={onOpenKeys} className="flex items-center gap-2 px-3 py-1.5 bg-[#FF2D55] text-[#FAF6E9] border-2 border-[#111] font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-[#CC1A48] transition-colors brand-shadow-sm">
          <KeyRound size={14} /> <span className="hidden sm:inline">KEYS</span>
        </button>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 border-2 border-[#111] bg-[#FAF6E9]">
              <User size={14} />
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase hidden sm:inline max-w-[80px] truncate">{user.name}</span>
            </div>
            <button onClick={signOut} className="px-2 py-1.5 border-2 border-[#111] font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-[#FFD800] transition-colors">Exit</button>
          </div>
        ) : (
          <Link to="/login" className="px-3 py-1.5 bg-[#111] text-[#FAF6E9] border-2 border-[#111] font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-[#3a3a3a] transition-colors no-underline">Sign In</Link>
        )}
      </div>
    </header>
  );
}
