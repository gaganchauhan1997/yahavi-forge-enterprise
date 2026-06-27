import { useState, useEffect } from 'react';
import { X, KeyRound, ExternalLink, Check, AlertCircle, Shield } from 'lucide-react';

interface Props { onClose: () => void; }

const PROVIDERS = [
  { id: 'groq', name: 'Groq', keyUrl: 'https://console.groq.com/keys', note: 'Fastest inference. Free tier: 1,444,444 tokens/day.', keyHint: 'gsk_...' },
  { id: 'gemini', name: 'Google Gemini', keyUrl: 'https://aistudio.google.com/app/apikey', note: 'Largest context (1M tokens). Free tier generous.', keyHint: 'AIza...' },
  { id: 'openrouter', name: 'OpenRouter', keyUrl: 'https://openrouter.ai/keys', note: 'Routes across 100+ models. Free tier available.', keyHint: 'sk-or-v1-...' },
];

export default function KeyManager({ onClose }: Props) {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  useEffect(() => { try { const s = JSON.parse(localStorage.getItem('yforge-keys') || '{}'); setKeys(s); } catch {} }, []);

  const saveKey = (provider: string, value: string) => {
    const updated = { ...keys, [provider]: value };
    if (!value.trim()) delete updated[provider];
    setKeys(updated); localStorage.setItem('yforge-keys', JSON.stringify(updated));
  };

  const activeCount = Object.values(keys).filter((k) => k.trim()).length;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#111]/70" onClick={onClose} />
      <div className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-[#FAF6E9] border-4 border-[#111] brand-shadow">
        <div className="flex items-center justify-between p-5 border-b-2 border-[#111]">
          <div><div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-1">CONTROL ROOM</div><div className="font-display text-xl uppercase tracking-tight">API KEYS</div></div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-[#111] hover:bg-[#FF2D55] hover:text-[#FAF6E9] transition-colors"><X size={16} /></button>
        </div>
        <div className="bg-[#111] text-[#FAF6E9] p-4 m-5 border-2 border-[#111]">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#FFD800] mb-2">HOW THIS WORKS</div>
          <p className="text-[13px] leading-relaxed">Yahavi Forge runs entirely in your browser. Your API keys are stored <strong className="bg-[#FFD800] text-[#111] px-1">only in localStorage on this device</strong> — never sent to any Hackknow server. Add one key to start; multiple keys = automatic fallback.</p>
        </div>
        <div className="px-5 pb-5 space-y-4">
          {PROVIDERS.map((p) => { const hasKey = !!keys[p.id]?.trim(); return (
            <div key={p.id} className="brand-panel p-4">
              <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><KeyRound size={16} /><span className="font-display text-sm uppercase tracking-tight">{p.name}</span></div><span className={`font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border ${hasKey ? 'bg-[#B6FF39] text-[#111] border-[#111]' : 'bg-[#FAF6E9] text-[#6b6b6b] border-[#111]'}`}>{hasKey ? 'CONFIGURED' : 'EMPTY'}</span></div>
              <p className="font-mono text-[10px] text-[#6b6b6b] mb-3">{p.note}</p>
              <div className="flex gap-2">
                <div className="relative flex-1"><input type={showKey[p.id] ? 'text' : 'password'} value={keys[p.id] || ''} onChange={(e) => saveKey(p.id, e.target.value)} placeholder={p.keyHint} className="w-full p-2.5 border-2 border-[#111] bg-white font-mono text-[12px] focus:outline-none focus:shadow-[2px_2px_0_#111] pr-16" /><button onClick={() => setShowKey((pr) => ({ ...pr, [p.id]: !pr[p.id] }))} className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[8px] tracking-wider uppercase text-[#6b6b6b] hover:text-[#111]">{showKey[p.id] ? 'HIDE' : 'SHOW'}</button></div>
                <a href={p.keyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 border-2 border-[#111] font-mono text-[9px] font-bold tracking-widest uppercase hover:bg-[#FFD800] transition-colors no-underline text-[#111] flex-shrink-0"><ExternalLink size={10} /> GET KEY</a>
              </div>
            </div>
          ); })}
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 p-3 border-2 border-[#111]">
            {activeCount > 0 ? <><Check size={16} className="text-[#B6FF39]" /><span className="font-mono text-[11px] font-bold">{activeCount} KEY{activeCount > 1 ? 'S' : ''} ACTIVE</span></> : <><AlertCircle size={16} className="text-[#FF2D55]" /><span className="font-mono text-[11px] text-[#FF2D55] font-bold">NO KEYS — ADD ONE TO START</span></>}
          </div>
        </div>
        <div className="px-5 pb-5"><div className="flex items-center gap-2 font-mono text-[10px] text-[#6b6b6b] tracking-wide"><Shield size={12} /><span>All providers are free-tier. Keys never leave your browser.</span></div></div>
      </div>
    </div>
  );
}
