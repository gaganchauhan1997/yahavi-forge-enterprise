import { Link } from 'react-router-dom'
const cols=[
  {h:'Product',links:[['Resume Builder','/app/builder'],['ATS Scorer','/app/ats'],['Cover Letter','/app/cover-letter'],['Interview Prep','/app/interview-prep'],['All 17 Tools','/app']]},
  {h:'Resources',links:[['Tutorial','/app'],['BYOK Guide','/app'],['Pricing','/'],['Changelog','/']]},
  {h:'Company',links:[['About','https://hackknow.com'],['Careers','https://hackknow.com'],['Contact','mailto:team@hackknow.com']]},
  {h:'Legal',links:[['Terms','/legal/terms'],['Privacy','/legal/privacy'],['Cookies','/legal/cookies'],['Refund','/legal/refund'],['DPA','/legal/dpa'],['DMCA','/legal/dmca']]},
]
export default function LandingFooter() {
  return (
    <footer className="bg-ink text-paper border-t-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-yellow border-2 border-paper flex items-center justify-center font-display">Y</div>
            <span className="font-display text-sm uppercase">YAHAVI FORGE</span>
          </div>
          <p className="text-xs text-paper/50 leading-relaxed mb-3">Free AI career OS. 17 tools. BYOK. Made in India, built for the world.</p>
          <div className="flex gap-2 flex-wrap">
            {['🔒 Keys Never Leave Browser','⚡ Fast AI','🇮🇳 Made in India'].map(b=><span key={b} className="font-mono text-[9px] bg-paper/10 px-2 py-1">{b}</span>)}
          </div>
        </div>
        {cols.map(c=>(
          <div key={c.h}>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-yellow mb-3">{c.h}</h4>
            <ul className="space-y-2">
              {c.links.map(([l,h])=>(
                <li key={l}>{h.startsWith('http')||h.startsWith('mailto')
                  ?<a href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="text-xs text-paper/60 hover:text-yellow transition-colors no-underline border-none">{l}</a>
                  :<Link to={h} className="text-xs text-paper/60 hover:text-yellow transition-colors no-underline border-none">{l}</Link>
                }</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10 py-4 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
        <span className="font-mono text-[10px] text-paper/40">© 2026 Hackknow Technologies. All rights reserved.</span>
        <div className="flex gap-4">
          {[['Terms','/legal/terms'],['Privacy','/legal/privacy'],['Cookies','/legal/cookies']].map(([l,h])=>(
            <Link key={l} to={h} className="font-mono text-[10px] text-paper/40 hover:text-paper/70 no-underline border-none">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
