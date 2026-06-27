import { useState } from 'react'
import { TOOLS, CATEGORIES } from '@/data/tools'
import { Link } from 'react-router-dom'
export default function ToolsPreviewSection() {
  const [activecat, setActivecat] = useState('build')
  const catTools = TOOLS.filter(t=>t.categoryId===activecat)
  return (
    <section className="border-b-2 border-ink py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8 reveal"><div className="brand-eyebrow">03 THE TOOLKIT</div>
        <h2 className="font-display text-3xl uppercase tracking-tight">17 tools, 5 categories</h2></div>
      <div className="flex gap-2 flex-wrap mb-6 reveal">
        {CATEGORIES.map(c=><button key={c.id} onClick={()=>setActivecat(c.id)}
          className={`brand-btn text-[10px] py-1.5 px-3 ${activecat===c.id?'brand-btn-dark':'brand-btn-ghost'}`}>
          {c.icon} {c.label}</button>)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {catTools.map((t,i)=>(
          <Link key={t.id} to={`/app/${t.id}`}
            className={`brand-panel p-4 hover:bg-yellow hover:border-ink transition-all no-underline reveal delay-${Math.min(i,4)+1}`}>
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-[10px] text-muted">{t.num}</span>
              {t.freeTier&&<span className="brand-tag brand-tag-green text-[8px]">FREE</span>}
            </div>
            <div className="font-bold text-sm mb-1">{t.title}</div>
            <div className="text-xs text-muted">{t.subtitle}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
