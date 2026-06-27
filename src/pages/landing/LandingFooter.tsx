import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = { Product: ['Resume Builder', 'ATS Scorer', 'Cover Letter', 'Interview Prep', 'All 17 Tools'], Resources: ['Tutorial', 'BYOK Guide', 'Pricing', 'Changelog', 'Blog'], Company: ['About', 'Careers', 'Contact', 'Terms', 'Privacy'] };
const socials = [{ icon: Twitter, href: 'https://twitter.com/hackknow', label: 'X/Twitter' }, { icon: Linkedin, href: 'https://linkedin.com/company/hackknow', label: 'LinkedIn' }, { icon: Github, href: 'https://github.com/gaganchauhan1997', label: 'GitHub' }, { icon: Mail, href: 'mailto:team@hackknow.com', label: 'Email' }];

export default function LandingFooter() {
  return (
    <footer className="bg-[#111] text-[#FAF6E9] border-t-4 border-[#111]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 sm:px-8 py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl uppercase tracking-tight mb-1">YAHAVI <span className="text-[#FFD800]">FORGE</span></div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#FF2D55] mb-4">AI Career OS · by Hackknow</div>
            <p className="text-[13px] leading-relaxed text-[#FAF6E9]/60 max-w-[280px] mb-5">The free AI career platform that turns raw experience into interview callbacks. 17 tools. BYOK. Made in India, built for the world.</p>
            <div className="flex gap-2.5">
              {socials.map((s) => { const Icon = s.icon; return (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 flex items-center justify-center bg-[#FAF6E9]/10 border-2 border-[#FAF6E9]/20 hover:bg-[#FFD800] hover:border-[#FFD800] hover:text-[#111] transition-colors"><Icon size={16} /></a>); })}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFD800] mb-4">{title}</h4>
              <ul className="space-y-2.5">{links.map((link) => (<li key={link}><a href="#" className="font-body text-[13px] text-[#FAF6E9]/65 hover:text-[#111] hover:bg-[#FFD800] hover:px-1 transition-all no-underline">{link}</a></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#FAF6E9]/15 px-6 sm:px-8 py-5 flex flex-wrap gap-3 justify-center">
          {['Keys Never Leave Browser', 'Fast AI Processing', '18+ Languages', 'Made in India'].map((badge) => (<span key={badge} className="border-2 border-[#FAF6E9]/20 px-3.5 py-1.5 font-mono text-[10px] tracking-wider text-[#FAF6E9]/55">{badge}</span>))}
        </div>
        <div className="border-t border-[#FAF6E9]/15 px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-[#FAF6E9]/45 tracking-wider">© {new Date().getFullYear()} Hackknow Technologies. All rights reserved.</span>
          <div className="flex gap-4"><a href="#" className="font-mono text-[11px] text-[#FAF6E9]/50 hover:text-[#FFD800] uppercase tracking-wider no-underline">Terms</a><a href="#" className="font-mono text-[11px] text-[#FAF6E9]/50 hover:text-[#FFD800] uppercase tracking-wider no-underline">Privacy</a><a href="#" className="font-mono text-[11px] text-[#FAF6E9]/50 hover:text-[#FFD800] uppercase tracking-wider no-underline">Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}
