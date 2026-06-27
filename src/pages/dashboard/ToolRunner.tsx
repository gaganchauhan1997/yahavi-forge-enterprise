import { useState, useEffect, useRef } from 'react'
import { Copy, Check, Download, FileText, ArrowRight, Loader2, ChevronLeft, Star } from 'lucide-react'
import { getToolById } from '@/data/tools'
import { callAI } from '@/lib/ai'
import { useKeys } from '@/hooks/useKeys'
import { useDraft } from '@/hooks/useDraft'
import { usePaywall } from '@/hooks/usePaywall'
import PaywallModal from '@/components/ui/PaywallModal'

interface ToolRunnerProps {
  toolId: string
  onBack: () => void
}

function mdToHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code style="background:rgba(0,0,0,0.1);padding:1px 5px;font-family:monospace;font-size:12px">$1</code>')
    .replace(/^#{3} (.+)$/gm, '<h3 style="font-family:\'Archivo Black\',sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;margin:12px 0 6px">$1</h3>')
    .replace(/^#{2} (.+)$/gm, '<h2 style="font-family:\'Archivo Black\',sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:0.04em;margin:16px 0 8px;border-bottom:2px solid currentColor;padding-bottom:4px">$1</h2>')
    .replace(/^#{1} (.+)$/gm, '<h1 style="font-family:\'Archivo Black\',sans-serif;font-size:18px;text-transform:uppercase;letter-spacing:-0.01em;margin:18px 0 10px">$1</h1>')
    .replace(/^[-*•] (.+)$/gm, '<div style="display:flex;gap:8px;margin:4px 0"><span style="font-weight:900">▸</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
}

export default function ToolRunner({ toolId, onBack }: ToolRunnerProps) {
  const tool = getToolById(toolId)
  const { hasAnyKey } = useKeys()
  const { loadDraft, saveDraft } = useDraft(toolId)
  const { canExport, canExportClean, guard } = usePaywall()

  const [inputs, setInputs] = useState<Record<string, string>>(loadDraft)
  const [chip, setChip] = useState<string>(tool?.chips?.options[0]?.value ?? '')
  const [output, setOutput] = useState('')
  const [provider, setProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallAction, setPaywallAction] = useState('export')
  const [runCount, setRunCount] = useState(0)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tool) setInputs(loadDraft())
  }, [toolId])

  if (!tool) return (
    <div className="p-8 text-center">
      <p className="font-mono text-muted">Tool not found: {toolId}</p>
      <button onClick={onBack} className="brand-btn brand-btn-ghost mt-4">← Back</button>
    </div>
  )

  const updateInput = (id: string, val: string) => {
    const next = { ...inputs, [id]: val }
    setInputs(next)
    saveDraft(next)
  }

  const handleRun = async () => {
    const required = tool.inputs.filter((i) => i.required)
    const missing = required.find((i) => !inputs[i.id]?.trim())
    if (missing) { setError(`Please fill in: ${missing.label}`); return }
    if (tool.requiresKey && !hasAnyKey) {
      setError('No API key found. Click ▸ KEYS in the header to add a free Groq key.')
      return
    }
    setLoading(true); setError(''); setOutput('')
    try {
      const messages = [
        { role: 'system' as const, content: tool.systemPrompt(chip) },
        { role: 'user' as const, content: tool.userPrompt(inputs, chip) },
      ]
      const result = await callAI(messages, { temperature: tool.temperature, max_tokens: tool.maxTokens })
      setOutput(result.text)
      setProvider(result.provider)
      setRunCount((c) => c + 1)
    } catch (e) {
      setError((e as { message?: string }).message ?? 'AI call failed')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }

  const handleTXT = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `${tool.id}-${Date.now()}.txt`; a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 3000)
  }

  const handlePDF = () => {
    if (!guard('pdf')) { setPaywallAction('pdf'); setShowPaywall(true); return }
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<!doctype html><html><head><title>${tool.title} — Yahavi Forge</title>
      <style>body{font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:800px;margin:32px auto;padding:0 24px;color:#0A0A0A;line-height:1.6}
      h1,h2,h3{font-family:'Archivo Black',sans-serif;text-transform:uppercase;letter-spacing:-.01em}
      strong{background:#FFE500;padding:0 3px}code{font-family:monospace;background:#eee;padding:1px 4px}
      @media print{body{margin:0}button{display:none}}</style></head>
      <body><h1>${tool.title}</h1><hr/>
      ${mdToHtml(output)}<hr/>
      <p style="font-size:10px;color:#888;font-family:monospace">Generated by Yahavi Forge · forge.hackknow.com · via ${provider}</p>
      <script>setTimeout(()=>window.print(),300)</script></body></html>`)
  }

  const handleHTML = () => {
    if (!guard('html')) { setPaywallAction('html'); setShowPaywall(true); return }
    const blob = new Blob([`<!doctype html><html><head><title>${tool.title}</title>
      <style>body{font-family:system-ui,sans-serif;max-width:800px;margin:32px auto;padding:0 24px}</style></head>
      <body>${mdToHtml(output)}</body></html>`], { type: 'text/html' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `${tool.id}.html`; a.click()
  }

  const handlePush = () => {
    if (!guard('push')) { setPaywallAction('push'); setShowPaywall(true); return }
    try {
      const list = JSON.parse(localStorage.getItem('yahavi-forge-resumes') || '[]') as unknown[]
      list.unshift({ id: `r_${Date.now()}`, title: `${tool.title} · ${new Date().toLocaleDateString()}`, source_tool: toolId, content: output, created_at: new Date().toISOString() })
      localStorage.setItem('yahavi-forge-resumes', JSON.stringify(list.slice(0, 50)))
    } catch {}
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="p-1.5 hover:bg-yellow border-2 border-transparent hover:border-ink transition-all" aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted">{tool.num}</span>
            <h1 className="font-display text-xl uppercase tracking-tight">{tool.title}</h1>
            {tool.freeTier && <span className="brand-tag brand-tag-green text-[9px]">FREE</span>}
          </div>
          <p className="text-sm text-muted mt-0.5">{tool.subtitle}</p>
        </div>
      </div>

      {/* Chips */}
      {tool.chips && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {tool.chips.options.map((o) => (
            <button
              key={o.value}
              onClick={() => setChip(o.value)}
              className={`brand-btn text-[10px] py-1.5 px-3 ${chip === o.value ? 'brand-btn-dark' : 'brand-btn-ghost'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}

      {/* 2-col grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Input panel */}
        <div className="brand-panel p-4 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-ink pb-2">
            <span className="brand-tag">▸ INPUT</span>
            <span className="brand-tag bg-paper border-ink text-ink">RAW</span>
          </div>
          {tool.inputs.map((inp) => (
            <div key={inp.id}>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider mb-1.5">
                {inp.label}{inp.required && <span className="text-pink ml-1">*</span>}
              </label>
              {inp.type === 'textarea' ? (
                <textarea
                  value={inputs[inp.id] ?? ''}
                  onChange={(e) => updateInput(inp.id, e.target.value)}
                  rows={inp.rows ?? 6}
                  placeholder={inp.placeholder}
                  className="brand-textarea"
                />
              ) : inp.type === 'select' ? (
                <select
                  value={inputs[inp.id] ?? ''}
                  onChange={(e) => updateInput(inp.id, e.target.value)}
                  className="brand-input"
                >
                  <option value="">Select...</option>
                  {inp.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  value={inputs[inp.id] ?? ''}
                  onChange={(e) => updateInput(inp.id, e.target.value)}
                  placeholder={inp.placeholder}
                  className="brand-input"
                />
              )}
            </div>
          ))}

          {error && (
            <div className="bg-pink/10 border-2 border-pink px-3 py-2 text-sm text-pink font-mono">
              ⚠ {error}
            </div>
          )}

          <button
            onClick={() => void handleRun()}
            disabled={loading}
            className="brand-btn brand-btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Running…</> : `▸ RUN ${tool.title.toUpperCase()}`}
          </button>
        </div>

        {/* Output panel */}
        <div className="brand-panel-dark p-4 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between border-b-2 border-paper/20 pb-2 mb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-paper/60">▸ OUTPUT</span>
            <span className="font-mono text-[10px] text-paper/40">FORGED</span>
          </div>

          <div
            ref={outputRef}
            className="flex-1 text-sm text-paper leading-relaxed overflow-y-auto"
            style={{ minHeight: '300px' }}
          >
            {output ? (
              <div dangerouslySetInnerHTML={{ __html: mdToHtml(output) }} />
            ) : loading ? (
              <div className="flex items-center gap-3 text-paper/50 mt-8">
                <Loader2 size={18} className="animate-spin" />
                <span className="font-mono text-xs">Generating…</span>
              </div>
            ) : (
              <div className="text-paper/30 font-mono text-xs mt-8">
                ▸ Click RUN to generate output
              </div>
            )}
          </div>

          {output && (
            <>
              {provider && (
                <p className="font-mono text-[9px] text-paper/30 mt-2">via {provider}</p>
              )}
              {/* Export buttons */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-paper/10">
                <button onClick={handleCopy} className="brand-btn border-paper/30 text-paper hover:bg-paper/10 text-[10px] py-1.5 px-3">
                  {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                </button>
                <button onClick={handleTXT} className="brand-btn border-paper/30 text-paper hover:bg-paper/10 text-[10px] py-1.5 px-3">
                  <Download size={11} /> TXT
                </button>
                <button
                  onClick={handlePDF}
                  className={`brand-btn text-[10px] py-1.5 px-3 ${canExport() ? 'brand-btn-primary' : 'border-paper/30 text-paper/50'}`}
                >
                  <FileText size={11} /> PDF {!canExport() && '↗'}
                </button>
                <button
                  onClick={handleHTML}
                  className={`brand-btn text-[10px] py-1.5 px-3 ${canExport() ? 'brand-btn-primary' : 'border-paper/30 text-paper/50'}`}
                >
                  {'<>'} HTML {!canExport() && '↗'}
                </button>
                {tool.hasPushToResume && (
                  <button
                    onClick={handlePush}
                    className={`brand-btn text-[10px] py-1.5 px-3 ${canExportClean() ? 'brand-btn-pink' : 'border-paper/30 text-paper/50'}`}
                  >
                    <ArrowRight size={11} /> Push {!canExportClean() && '↗'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reviews section */}
      {runCount >= 1 && output && (
        <div className="mt-6 brand-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className="text-yellow fill-yellow" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Rate this tool</span>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map((n) => (
              <button
                key={n}
                className="text-2xl hover:scale-110 transition-transform text-ink/20 hover:text-yellow"
                onClick={() => {
                  const comment = prompt('Optional comment:') ?? ''
                  try {
                    const key = `yahavi-forge-tool-reviews-${toolId}`
                    const list = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
                    list.unshift({ rating: n, comment, date: new Date().toISOString() })
                    localStorage.setItem(key, JSON.stringify(list))
                    alert('Thanks for your review! ⭐')
                  } catch {}
                }}
              >★</button>
            ))}
          </div>
        </div>
      )}

      {/* Paywall modal */}
      {showPaywall && (
        <PaywallModal
          action={paywallAction}
          onClose={() => setShowPaywall(false)}
          onUnlock={() => setShowPaywall(false)}
        />
      )}
    </div>
  )
}
