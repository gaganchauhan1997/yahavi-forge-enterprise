import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, ExternalLink, Check, KeyRound, Globe, Zap } from 'lucide-react';

interface Props { onClose: () => void; }

const STEPS = [
  { title: 'Why BYOK?', icon: Zap, color: 'bg-[#FFD800]', content: 'BYOK (Bring Your Own Key) means you use free API keys from AI providers. This keeps costs low, gives you full control, and ensures privacy. Your keys stay in your browser only.' },
  { title: 'Get a Groq Key', icon: KeyRound, color: 'bg-[#FF2D55] text-[#FAF6E9]', content: 'Groq is the fastest AI provider. Go to console.groq.com/keys, sign up with email (no credit card), click Create API Key, copy the gsk_... string. Takes 60 seconds.' },
  { title: 'Get a Gemini Key', icon: Globe, color: 'bg-[#B6FF39]', content: 'Google Gemini offers the largest context (1M tokens). Go to aistudio.google.com/app/apikey, sign in with Google, click Create API Key, copy the AIza... string.' },
  { title: 'Paste and Activate', icon: Check, color: 'bg-[#FFD800]', content: 'Click the KEYS button in Yahavi Forge, paste your key into the corresponding field, and click Save. Add all 3 providers for automatic fallback!' },
];

export default function BYOKTutorial({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step]; const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#111]/70" onClick={onClose} />
      <div className="relative w-full max-w-[480px] bg-[#FAF6E9] border-4 border-[#111] brand-shadow">
        <div className="flex items-center justify-between p-5 border-b-2 border-[#111]"><div className="font-display text-lg uppercase tracking-tight">BYOK Tutorial</div><button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-[#111] hover:bg-[#FF2D55] hover:text-[#FAF6E9] transition-colors"><X size={16} /></button></div>
        <div className="flex items-center gap-1 p-4 border-b-2 border-[#111]">{STEPS.map((_, i) => <div key={i} className={`h-1.5 flex-1 transition-colors ${i <= step ? 'bg-[#FFD800]' : 'bg-[#111]/15'}`} />)}</div>
        <div className="p-5">
          <div className={`inline-flex items-center gap-2 ${current.color} px-3 py-2 border-2 border-[#111] brand-shadow-sm mb-4`}><Icon size={18} /><span className="font-display text-sm uppercase tracking-tight">Step {step + 1}: {current.title}</span></div>
          <p className="font-body text-[14px] leading-relaxed">{current.content}</p>
          {step === 1 && <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 font-mono text-[11px] font-bold text-[#FF2D55] border-b-2 border-[#FF2D55] hover:bg-[#FF2D55] hover:text-[#FAF6E9] px-1 no-underline">console.groq.com/keys <ExternalLink size={10} /></a>}
          {step === 2 && <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 font-mono text-[11px] font-bold text-[#111] border-b-2 border-[#111] hover:bg-[#111] hover:text-[#FAF6E9] px-1 no-underline">aistudio.google.com <ExternalLink size={10} /></a>}
        </div>
        <div className="flex items-center justify-between p-5 border-t-2 border-[#111]">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="brand-btn brand-btn-ghost text-[11px] py-2.5 px-4 disabled:opacity-30"><ChevronLeft size={14} /> Previous</button>
          <span className="font-mono text-[10px] text-[#6b6b6b]">{step + 1} / {STEPS.length}</span>
          {step < STEPS.length - 1 ? <button onClick={() => setStep((s) => s + 1)} className="brand-btn brand-btn-primary text-[11px] py-2.5 px-4">Next <ChevronRight size={14} /></button> : <button onClick={onClose} className="brand-btn brand-btn-pink text-[11px] py-2.5 px-4"><Check size={14} /> Got it!</button>}
        </div>
      </div>
    </div>
  );
}
