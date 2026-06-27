import { useAuthCtx } from '@/providers/AuthProvider';
import { Check, Star } from 'lucide-react';

const plans = [
  { name: 'FREE', price: '₹0', color: 'bg-[#FAF6E9]', meta: 'BUILD category · with watermark', features: ['5 AI Resume tools', 'ATS local scorer (no key needed)', 'Watermarked exports', 'Community support'] },
  { name: 'DAY PASS', price: '₹49', color: 'bg-[#B6FF39]', meta: 'All 17 tools · 24h · no watermark', features: ['All 17 tools unlocked', 'No watermark', 'Unlimited generations', 'All export formats'] },
  { name: 'ALL TOOLS', price: '₹249', period: '/mo', color: 'bg-[#FFD800]', meta: '17 tools · everything unlocked', featured: true, features: ['All 17 tools', 'No watermark', 'Unlimited generations', 'Portfolio themes', 'Priority support'] },
  { name: 'YEARLY', price: '₹2,499', period: '/yr', color: 'bg-[#111] text-[#FAF6E9]', meta: '~₹208/mo · save 17%', features: ['Everything in Monthly', 'Save 17%', 'Early access to new tools', '1-on-1 resume review'] },
];

export default function PricingSection() {
  const { signIn } = useAuthCtx();
  return (
    <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-[#111]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] tracking-tight uppercase text-[#111]"><span className="text-[#FF2D55]">04</span> Pricing</h2>
          <span className="font-mono text-[11px] text-[#6b6b6b] tracking-widest uppercase">Honest. Pick what fits.</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`brand-border p-6 ${plan.color} relative transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#111]`}>
              {plan.featured && <div className="absolute -top-3 right-3 bg-[#FF2D55] text-[#FAF6E9] font-mono text-[9px] font-black tracking-[0.12em] px-2.5 py-1 border-2 border-[#111] brand-shadow-sm">★ MOST POPULAR</div>}
              <div className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase mb-2 opacity-85">{plan.name}</div>
              <div className="font-display text-[clamp(32px,4vw,44px)] leading-none tracking-tight mb-1.5">{plan.price}{plan.period && <span className="font-mono text-sm opacity-70 tracking-wide ml-1">{plan.period}</span>}</div>
              <p className="font-body text-xs leading-snug opacity-80 mb-4">{plan.meta}</p>
              <ul className="space-y-2">{plan.features.map((f, i) => <li key={i} className="flex items-start gap-2 text-xs"><Check size={14} className="mt-0.5 flex-shrink-0" />{f}</li>)}</ul>
              <button onClick={signIn} className={`brand-btn w-full justify-center mt-4 text-[11px] py-3 ${plan.name === 'FREE' ? 'brand-btn-primary' : plan.name === 'YEARLY' ? 'brand-btn-primary text-[#111]' : 'brand-btn-dark'}`}><Star size={14} /> Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
