import { useState } from 'react'
import { Home, ChevronDown, Key, KeyRound, HelpCircle, X } from 'lucide-react'
import { TOOLS, CATEGORIES } from '@/data/tools'

interface SidebarProps {
  activeTool: string | null
  onSelectTool: (id: string | null) => void
  isOpen: boolean
  onClose: () => void
  onOpenTutorial: () => void
  onOpenKeys: () => void
}

const CATEGORY_ICONS: Record<string, string> = {
  build: '🔨',
  analyze: '🔍',
  tailor: '✂️',
  outreach: '📨',
  strategy: '🎯',
}

const CATEGORY_COLORS: Record<string, string> = {
  build: '#FFE500',
  analyze: '#B6FF39',
  tailor: '#FF6B1A',
  outreach: '#0A0A0A',
  strategy: '#FF2D78',
}

export default function Sidebar({
  activeTool,
  onSelectTool,
  isOpen,
  onClose,
  onOpenTutorial,
  onOpenKeys,
}: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    build: true,
  })

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#F5F0DC] border-r-2 border-ink w-64 overflow-y-auto">
      {/* Mobile close button */}
      <div className="lg:hidden flex items-center justify-between p-3 border-b-2 border-ink">
        <span className="font-display text-sm text-ink uppercase">MENU</span>
        <button
          onClick={onClose}
          className="w-8 h-8 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-[#F5F0DC] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* BYOK CTA */}
      <button
        onClick={() => {
          onOpenTutorial()
          onClose()
        }}
        className="mx-3 mt-3 flex items-center gap-2 bg-[#FFE500] border-2 border-ink px-3 py-2.5 font-mono text-xs font-bold text-ink hover:bg-ink hover:text-[#FFE500] transition-colors text-left"
      >
        <KeyRound size={14} className="flex-shrink-0" />
        <span>▸ ADD API KEY — START HERE</span>
      </button>

      {/* Home button */}
      <div className="px-3 pt-3">
        <button
          onClick={() => {
            onSelectTool(null)
            onClose()
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 border-2 font-mono text-xs transition-colors ${
            activeTool === null
              ? 'bg-ink text-[#F5F0DC] border-ink'
              : 'bg-transparent text-ink border-ink/30 hover:border-ink hover:bg-ink/5'
          }`}
        >
          <Home size={14} />
          HOME
        </button>
      </div>

      {/* Divider */}
      <div className="mx-3 mt-3 border-t-2 border-ink/20" />

      {/* Category sections */}
      <nav className="flex-1 px-3 pt-2 pb-4 space-y-1">
        {CATEGORIES.map((cat) => {
          const tools = TOOLS.filter((t) => t.categoryId === cat.id)
          const isOpen = openCategories[cat.id] ?? false
          const catColor = CATEGORY_COLORS[cat.id] ?? '#0A0A0A'
          const isDark = cat.id === 'outreach'

          return (
            <div key={cat.id}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-2 px-3 py-2 border-2 border-ink/20 hover:border-ink transition-colors group"
                style={{ backgroundColor: isOpen ? catColor : 'transparent' }}
              >
                <span className="text-sm leading-none">{CATEGORY_ICONS[cat.id]}</span>
                <span
                  className="font-mono font-bold text-xs flex-1 text-left"
                  style={{ color: isOpen && isDark ? '#F5F0DC' : '#0A0A0A' }}
                >
                  {cat.label}
                </span>
                <span
                  className="font-mono text-[10px] border border-ink/30 px-1"
                  style={{ color: isOpen && isDark ? '#F5F0DC' : '#0A0A0A' }}
                >
                  {tools.length}
                </span>
                <ChevronDown
                  size={12}
                  className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: isOpen && isDark ? '#F5F0DC' : '#0A0A0A' }}
                />
              </button>

              {/* Tools list */}
              {isOpen && (
                <div className="ml-3 border-l-2 border-ink/20 pl-2 space-y-0.5 mt-0.5">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        onSelectTool(tool.id)
                        onClose()
                      }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 border text-left transition-colors ${
                        activeTool === tool.id
                          ? 'bg-ink text-[#F5F0DC] border-ink'
                          : 'bg-transparent text-ink border-transparent hover:bg-ink/5 hover:border-ink/30'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-ink/50 flex-shrink-0 w-6">
                        {tool.num}
                      </span>
                      <span className="font-mono text-xs leading-tight flex-1 truncate">
                        {tool.title}
                      </span>
                      {tool.freeTier && (
                        <span className="flex-shrink-0 font-mono text-[8px] bg-[#B6FF39] border border-ink px-1 text-ink">
                          FREE
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Resources */}
      <div className="border-t-2 border-ink/20 px-3 py-3">
        <p className="font-mono text-[10px] text-ink/40 uppercase tracking-wider mb-2 px-3">
          Resources
        </p>
        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 font-mono text-xs text-ink/70 hover:text-ink border border-transparent hover:border-ink/30 transition-colors"
        >
          <HelpCircle size={12} />
          Help & Docs
        </a>
      </div>

      {/* API KEYS bottom button */}
      <div className="px-3 pb-3">
        <button
          onClick={() => {
            onOpenKeys()
            onClose()
          }}
          className="w-full flex items-center gap-2 bg-[#FF2D78] border-2 border-ink px-3 py-2.5 font-mono text-xs font-bold text-white hover:bg-ink hover:text-[#FF2D78] transition-colors"
        >
          <Key size={14} />
          API KEYS
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-[calc(100vh-3.5rem)] overflow-y-auto">
        {sidebarContent}
      </div>

      {/* Mobile: fixed overlay sidebar */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-ink/50 z-40"
            onClick={onClose}
          />
          <div className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 overflow-y-auto shadow-[4px_0px_0px_#0A0A0A]">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  )
}
