import { CATEGORIES, TOOLS } from '@/data/tools';

const categoryColorClass: Record<string, string> = {
  build: 'bg-[#FFD800]', analyze: 'bg-[#B6FF39]', tailor: 'bg-[#FF2D55] text-[#FAF6E9]', outreach: 'bg-[#FF6B1A]', strategy: 'bg-[#111] text-[#FAF6E9]',
};

export default function ToolsPreviewSection() {
  return (
    <section id="tools" className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] tracking-tight uppercase text-[#111]"><span className="text-[#FF2D55]">03</span> 17 tools, 5 categories</h2>
          <span className="font-mono text-[11px] text-[#6b6b6b] tracking-widest uppercase">Every step of the job hunt</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter((t) => t.categoryId === cat.id);
            const colorClass = categoryColorClass[cat.id] || 'bg-[#FAF6E9]';
            return (
              <div key={cat.id} className={`brand-panel p-5 ${colorClass} relative overflow-hidden`}>
                <h4 className="font-display text-lg uppercase tracking-tight pb-2 mb-3 border-b-2 border-current">{cat.label}</h4>
                <ul className="space-y-1.5">
                  {catTools.map((tool) => <li key={tool.id} className="font-mono text-[11px] tracking-wider py-1">{tool.num} {tool.title}</li>)}
                </ul>
                {cat.id === 'build' && <span className="absolute top-3 right-3 bg-[#B6FF39] text-[#111] font-mono text-[8px] font-black tracking-widest px-2 py-0.5 border-2 border-[#111] rounded-full">FREE TIER</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
