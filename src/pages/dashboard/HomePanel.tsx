import { TOOLS, CATEGORIES } from '@/data/tools'

interface HomePanelProps {
  onSelectTool: (id: string) => void
}

const STAT_CHIPS = [
  { label: '17 TOOLS' },
  { label: '6 PROVIDERS' },
  { label: '₹0 START' },
  { label: '∞ RUNS' },
]

const CATEGORY_COLORS: Record<string, string> = {
  build: '#FFE500',
  analyze: '#B6FF39',
  tailor: '#FF6B1A',
  outreach: '#0A0A0A',
  strategy: '#FF2D78',
}

export default function HomePanel({ onSelectTool }: HomePanelProps) {
  return (
    <div className="min-h-full bg-[#F5F0DC] p-4 md:p-8 lg:p-10">
      {/* Hero */}
      <div className="mb-10 border-b-2 border-ink pb-8">
        <p className="brand-eyebrow mb-3">YAHAVI FORGE · AI CAREER OS</p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink uppercase leading-[0.9] mb-4">
          YAHAVI
          <br />
          FORGE
        </h1>
        <p className="font-body text-base text-ink/70 max-w-lg leading-relaxed">
          17 AI tools that turn raw experience into interview callbacks.
          Bring your own API key. Start for free.
        </p>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-2 mt-6">
          {STAT_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className="bg-ink text-paper font-mono font-bold text-xs px-3 py-1.5 border-2 border-ink"
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* Categories overview */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 font-mono text-xs text-ink"
            style={{ backgroundColor: cat.color, color: cat.id === 'outreach' ? '#F5F0DC' : '#0A0A0A' }}
          >
            <span>{cat.icon}</span>
            <span className="font-bold">{cat.label}</span>
            <span className="opacity-60">
              ({TOOLS.filter((t) => t.categoryId === cat.id).length})
            </span>
          </div>
        ))}
      </div>

      {/* Section label */}
      <h2 className="font-display text-xl text-ink uppercase mb-4">ALL 17 TOOLS</h2>

      {/* Tools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool) => {
          const catColor = CATEGORY_COLORS[tool.categoryId] ?? '#0A0A0A'
          const isDarkCat = tool.categoryId === 'outreach'

          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="text-left bg-white border-2 border-ink p-4 hover:shadow-[4px_4px_0px_#0A0A0A] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono font-bold text-xs border-2 border-ink px-1.5 py-0.5"
                    style={{
                      backgroundColor: catColor,
                      color: isDarkCat ? '#F5F0DC' : '#0A0A0A',
                    }}
                  >
                    {tool.num}
                  </span>
                  <span className="font-display text-2xl text-ink">{tool.icon}</span>
                </div>
                <div className="flex gap-1 items-center">
                  {tool.freeTier && (
                    <span className="brand-tag bg-[#B6FF39] border-ink font-mono text-[10px] px-1.5 py-0.5">
                      FREE
                    </span>
                  )}
                  <div
                    className="w-2 h-2 border border-ink"
                    style={{ backgroundColor: catColor }}
                    title={tool.category}
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-mono font-bold text-sm text-ink uppercase leading-tight group-hover:underline underline-offset-2">
                {tool.title}
              </h3>
              <p className="font-body text-xs text-ink/60 mt-1 leading-relaxed">
                {tool.subtitle}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink/10">
                <span className="font-mono text-[10px] text-ink/40 uppercase">{tool.category}</span>
                <span className="font-mono text-xs text-ink group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 border-2 border-ink bg-[#FFE500] p-6">
        <p className="font-display text-xl text-ink uppercase mb-1">
          Don't have an API key yet?
        </p>
        <p className="font-body text-sm text-ink/70 mb-3">
          Get a free Groq key in 2 minutes — no credit card needed.
        </p>
        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-[#FFE500] border-2 border-ink font-mono font-bold text-sm px-4 py-2 hover:bg-[#FFE500] hover:text-ink transition-colors"
        >
          GET FREE GROQ KEY →
        </a>
      </div>
    </div>
  )
}
