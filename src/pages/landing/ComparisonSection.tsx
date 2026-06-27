import { X, Check } from 'lucide-react';

const competitorItems = [
  '₹999 – ₹4,999/month for ATS + resume tools',
  'Locked into their one AI — no choice',
  'Free tier is a teaser, real value paywalled',
  'Cancel = lose everything',
  '8 generic templates everyone uses',
  'No PWA, no install, no offline',
];

const forgeItems = [
  '₹0 to start. ₹49 day pass. ₹249/mo for everything.',
  '6 AI providers — pick any, switch any time',
  'Build tools free forever (with a small watermark)',
  'Local ATS scorer — works without any AI key',
  '17 tools, 5 categories — every step of the hunt',
  'Auto-fallback across providers — never stuck',
  '30 designer templates + 5 portfolio themes (PRO)',
  'PWA + signed APK — install on phone',
  'Bilingual — English + Hindi/Hinglish chat',
];

export default function ComparisonSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] tracking-tight uppercase text-[#111]"><span className="text-[#FF2D55]">01</span> Why we're best</h2>
          <span className="font-mono text-[11px] text-[#6b6b6b] tracking-widest uppercase">Side-by-side</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="brand-panel overflow-hidden">
            <div className="bg-[#6b6b6b] text-[#FAF6E9] px-5 py-4 font-display text-lg uppercase tracking-tight border-b-2 border-[#111]">Competitors</div>
            <ul className="p-5 space-y-3">
              {competitorItems.map((item, i) => <li key={i} className="flex items-start gap-3 font-body text-sm text-[#3a3a3a]"><X size={16} className="text-[#FF2D55] mt-0.5 flex-shrink-0" />{item}</li>)}
            </ul>
          </div>
          <div className="brand-panel-yellow overflow-hidden relative">
            <div className="absolute -top-3 -right-2 bg-[#FF2D55] text-[#FAF6E9] font-mono text-[10px] font-black tracking-[0.15em] px-3 py-1.5 border-2 border-[#111] brand-shadow-sm rotate-[4deg]">★ FORGE</div>
            <div className="bg-[#FFD800] text-[#111] px-5 py-4 font-display text-lg uppercase tracking-tight border-b-2 border-[#111]">YAHAVI FORGE</div>
            <ul className="p-5 space-y-3">
              {forgeItems.map((item, i) => <li key={i} className="flex items-start gap-3 font-body text-sm text-[#111]"><Check size={16} className="text-[#111] mt-0.5 flex-shrink-0" /><strong>{item}</strong></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
