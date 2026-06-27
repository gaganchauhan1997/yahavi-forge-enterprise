import { useState, useCallback } from 'react';
import { getToolById } from '@/data/tools';
import { callAI } from '@/lib/ai';
import { ArrowLeft, Play, Copy, Check, FileText, Download, Loader2, AlertCircle } from 'lucide-react';

interface Props { toolId: string; onBack: () => void; }

export default function ToolRunner({ toolId, onBack }: Props) {
  const tool = getToolById(toolId);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [chip, setChip] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState('');

  const handleInputChange = (id: string, value: string) => setInputs((p) => ({ ...p, [id]: value }));

  const handleRun = useCallback(async () => {
    if (!tool) return;
    setLoading(true); setError(''); setOutput('');
    try {
      const keys = JSON.parse(localStorage.getItem('yforge-keys') || '{}');
      if (tool.requiresKey && Object.keys(keys).length === 0) throw new Error('No API keys configured. Click the KEYS button to add one.');
      const messages = [{ role: 'system' as const, content: tool.systemPrompt(chip) }, { role: 'user' as const, content: tool.userPrompt(inputs, chip) }];
      const result = await callAI(keys, messages, { temperature: tool.temperature, max_tokens: tool.maxTokens });
      setOutput(result.text); setProvider(result.provider);
    } catch (err: any) { setError(err.message || 'Something went wrong. Please try again.'); } finally { setLoading(false); }
  }, [tool, inputs, chip]);

  const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const handlePDF = () => {
    const w = window.open('', '_blank'); if (!w) return;
    w.document.write(`<!doctype html><meta charset="utf-8"><title>${tool?.title} — Yahavi Forge</title><style>body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:780px;margin:32px auto;padding:0 16px;line-height:1.55;color:#111;background:#FAF6E9}h1,h2,h3{font-family:'Archivo Black',sans-serif;text-transform:uppercase;letter-spacing:-.01em}strong{background:#FFD800;padding:0 3px}code{font-family:'JetBrains Mono',monospace;background:#111;color:#FAF6E9;padding:1px 5px}@media print{body{margin:0;padding:0 24px}button{display:none}}</style><h1>${tool?.title}</h1><p style="color:#6b6b6b;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.1em;">Yahavi Forge by Hackknow · ${new Date().toLocaleDateString()}</p><hr style="border:none;border-top:2px solid #111;margin:16px 0"><div style="white-space:pre-wrap;font-size:14px;line-height:1.7">${output.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div><script>setTimeout(()=>window.print(),300)<\/script>`);
  };

  if (!tool) return <div className="p-8 text-center"><p className="font-mono text-sm text-[#6b6b6b]">Unknown tool: {toolId}</p><button onClick={onBack} className="brand-btn brand-btn-primary mt-4">Go Back</button></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1100px]">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center border-2 border-[#111] hover:bg-[#FFD800] transition-colors"><ArrowLeft size={16} /></button>
        <div>
          <div className="font-display text-xl uppercase tracking-tight flex items-center gap-2"><span>{tool.icon}</span>{tool.title}</div>
          <p className="font-mono text-[10px] text-[#6b6b6b] tracking-widest uppercase">{tool.subtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {tool.freeTier && <span className="font-mono text-[8px] font-bold bg-[#B6FF39] text-[#111] px-2 py-1 border-2 border-[#111]">FREE TIER</span>}
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b] bg-[#FAF6E9] border border-[#111] px-2 py-1">{tool.num}</span>
        </div>
      </div>
      {tool.chips && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.chips.options.map((opt) => <button key={opt.value} onClick={() => setChip(opt.value)} className={`px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border-2 transition-all ${chip === opt.value ? 'bg-[#111] text-[#FAF6E9] border-[#111]' : 'bg-transparent text-[#111] border-[#111] hover:bg-[#FFD800]'}`}>{opt.label}</button>)}
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="brand-panel p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#111]"><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">INPUT</span><span className="font-mono text-[9px] font-bold bg-[#FF2D55] text-[#FAF6E9] px-1.5 py-0.5">RAW</span></div>
          <div className="space-y-4">
            {tool.inputs.map((inp) => (
              <div key={inp.id}>
                <label className="block font-body text-[13px] font-semibold mb-1.5">{inp.label}{inp.required && <span className="text-[#FF2D55] ml-1">*</span>}</label>
                {inp.type === 'textarea' ? <textarea value={inputs[inp.id] || ''} onChange={(e) => handleInputChange(inp.id, e.target.value)} placeholder={inp.placeholder} rows={inp.rows || 6} className="w-full p-3 border-2 border-[#111] bg-white font-body text-[13px] focus:outline-none focus:shadow-[3px_3px_0_#111] transition-shadow resize-y" /> :
                 <input type="text" value={inputs[inp.id] || ''} onChange={(e) => handleInputChange(inp.id, e.target.value)} placeholder={inp.placeholder} className="w-full p-3 border-2 border-[#111] bg-white font-body text-[13px] focus:outline-none focus:shadow-[3px_3px_0_#111] transition-shadow" />}
              </div>
            ))}
          </div>
          <button onClick={handleRun} disabled={loading} className="brand-btn brand-btn-primary w-full justify-center mt-4 text-[12px] py-3.5 disabled:opacity-50">{loading ? <><Loader2 size={16} className="animate-spin" /> Forging...</> : <><Play size={16} /> RUN {tool.title.toUpperCase()}</>}</button>
          {error && <div className="mt-3 p-3 border-2 border-[#FF2D55] bg-[#FF2D55]/10 flex items-start gap-2"><AlertCircle size={16} className="text-[#FF2D55] flex-shrink-0 mt-0.5" /><span className="font-mono text-[11px] text-[#FF2D55]">{error}</span></div>}
        </div>
        <div className="brand-panel-dark p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#FFD800]/30"><span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#FFD800]">OUTPUT</span><span className="font-mono text-[9px] font-bold bg-[#FFD800] text-[#111] px-1.5 py-0.5">FORGED</span></div>
          {!output && !loading && <div className="font-mono text-[12px] text-[#FAF6E9]/40 tracking-widest uppercase border-2 border-dashed border-[#FAF6E9]/20 p-10 text-center">Click RUN to generate</div>}
          {loading && !output && <div className="flex items-center justify-center p-10"><div className="flex items-center gap-2"><Loader2 size={20} className="text-[#FFD800] animate-spin" /><span className="font-mono text-[12px] text-[#FAF6E9]/60 tracking-widest uppercase animate-pulse">Forging with AI...</span></div></div>}
          {output && <div><div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#FAF6E9]/40 mb-3 pb-2 border-b border-dotted border-[#FAF6E9]/20">Generated via {provider} · {(output.length / 1024).toFixed(1)}KB</div><div className="bg-[#FAF6E9] text-[#111] p-4 font-body text-[13px] leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap border-2 border-[#111]">{output}</div><div className="flex flex-wrap gap-2 mt-3"><button onClick={handleCopy} className="brand-btn brand-btn-primary text-[10px] py-2 px-3">{copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}</button><button onClick={handlePDF} className="brand-btn brand-btn-ghost text-[#FAF6E9] border-[#FAF6E9] text-[10px] py-2 px-3 hover:bg-[#FFD800] hover:text-[#111] hover:border-[#111]"><FileText size={12} /> PDF</button><button onClick={() => { const blob = new Blob([output], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `yahavi-${toolId}.txt`; a.click(); }} className="brand-btn brand-btn-ghost text-[#FAF6E9] border-[#FAF6E9] text-[10px] py-2 px-3 hover:bg-[#FFD800] hover:text-[#111] hover:border-[#111]"><Download size={12} /> TXT</button></div></div>}
        </div>
      </div>
    </div>
  );
}
