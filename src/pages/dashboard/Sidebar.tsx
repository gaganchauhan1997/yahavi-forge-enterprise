import { CATEGORIES, TOOLS } from '@/data/tools';
import { Home, BookOpen, HelpCircle, X, ChevronRight } from 'lucide-react';

interface Props { activeTool: string | null; onSelectTool: (id: string | null) => void; isOpen: boolean; onClose: () => void; onOpenKeys: () => void; onOpenTutorial: () => void; }

export default function Sidebar({ activeTool, onSelectTool, isOpen, onClose, onOpenKeys, onOpenTutorial }: Props) {
  return (
    <aside className={`fixed lg:static top-0 left-0 h-full w-[260px] bg-[#FAF6E9] border-r-2 border-[#111] z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex items-center justify-between p-3 border-b-2 border-[#111] lg:hidden">
        <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-[#6b6b6b]">17 TOOLS</span>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-[#111] hover:bg-[#FFD800]"><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <button onClick={() => onSelectTool(null)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 font-body text-[13px] font-bold border-2 transition-all ${!activeTool ? 'bg-[#111] text-[#FAF6E9] border-[#111] brand-shadow-pink' : 'bg-transparent text-[#111] border-transparent hover:bg-[#FFD800] hover:border-[#111]'}`}><Home size={16} /> Home</button>
        {CATEGORIES.map((cat) => {
          const catTools = TOOLS.filter((t) => t.categoryId === cat.id);
          return (
            <div key={cat.id} className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5"><span className="text-base">{cat.icon}</span><span className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-[#6b6b6b]">{cat.label}</span><span className="ml-auto font-mono text-[9px] font-bold bg-[#FAF6E9] text-[#6b6b6b] border border-[#111] px-1">{catTools.length}</span></div>
              {catTools.map((tool) => (
                <button key={tool.id} onClick={() => onSelectTool(tool.id)} className={`w-full flex items-center gap-2 px-4 py-2 font-body text-[12px] font-semibold border-l-[3px] transition-all ${activeTool === tool.id ? 'bg-[#111] text-[#FAF6E9] border-l-[#FFD800]' : 'text-[#3a3a3a] border-l-transparent hover:bg-[#FFD800]/30 hover:border-l-[#FFD800]'}`}>
                  <span className="font-mono text-[10px] opacity-60">{tool.num}</span><ChevronRight size={10} className="opacity-40" />{tool.title}{tool.freeTier && <span className="ml-auto font-mono text-[7px] font-bold bg-[#B6FF39] text-[#111] px-1 border border-[#111]">FREE</span>}
                </button>
              ))}
            </div>
          );
        })}
        <div className="pt-4 mt-4 border-t-2 border-dotted border-[#111] space-y-1">
          <div className="font-mono text-[9px] font-bold tracking-[0.22em] uppercase text-[#FF2D55] px-2 pb-1">Resources</div>
          <button onClick={() => { onOpenTutorial(); onClose(); }} className="w-full flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-wider uppercase text-[#111] border-2 border-transparent hover:bg-[#FFD800] hover:border-[#111] transition-all"><BookOpen size={14} /> BYOK Tutorial</button>
          <button onClick={() => { onOpenKeys(); onClose(); }} className="w-full flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-wider uppercase text-[#111] border-2 border-transparent hover:bg-[#FFD800] hover:border-[#111] transition-all"><HelpCircle size={14} /> Help Center</button>
        </div>
        <div className="pt-3 border-t-2 border-dotted border-[#111]">
          <button onClick={() => { onOpenKeys(); onClose(); }} className="w-full flex items-center gap-2 px-3 py-3 bg-[#FF2D55] text-[#FAF6E9] font-mono text-[11px] font-bold tracking-widest uppercase border-2 border-[#111] hover:bg-[#CC1A48] transition-colors brand-shadow-sm"><span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#FAF6E9]" /> API KEYS — ADD ONE</button>
        </div>
        <p className="font-mono text-[9px] leading-relaxed text-[#6b6b6b] px-2 pt-2 tracking-wide">&ldquo;Free intelligence,<br />infinite capability.&rdquo;<br />— HackKnow</p>
      </div>
    </aside>
  );
}
