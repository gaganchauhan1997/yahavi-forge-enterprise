import { useState } from 'react'
import { X, Eye, EyeOff, ExternalLink, Key } from 'lucide-react'
import { useKeys, type ProviderKeys } from '@/hooks/useKeys'

interface KeyManagerProps {
  onClose: () => void
}

interface ProviderConfig {
  key: keyof ProviderKeys
  name: string
  description: string
  link: string
  linkLabel: string
  placeholder: string
}

const PROVIDERS: ProviderConfig[] = [
  {
    key: 'groq',
    name: 'Groq',
    description: 'Fastest inference. Free tier: 6,000 req/day on Llama 3 & Mixtral.',
    link: 'https://console.groq.com/keys',
    linkLabel: 'console.groq.com/keys',
    placeholder: 'gsk_...',
  },
  {
    key: 'gemini',
    name: 'Google Gemini',
    description: 'Great for long documents. Free tier: 1,500 req/day on Gemini 1.5 Flash.',
    link: 'https://aistudio.google.com/app/apikey',
    linkLabel: 'aistudio.google.com/app/apikey',
    placeholder: 'AIza...',
  },
  {
    key: 'openrouter',
    name: 'OpenRouter',
    description: 'Access 100+ models. Pay-as-you-go, very cheap per token.',
    link: 'https://openrouter.ai/keys',
    linkLabel: 'openrouter.ai/keys',
    placeholder: 'sk-or-...',
  },
]

export default function KeyManager({ onClose }: KeyManagerProps) {
  const { keys, setKey, activeCount } = useKeys()
  const [localKeys, setLocalKeys] = useState<Record<string, string>>({
    groq: keys.groq ?? '',
    gemini: keys.gemini ?? '',
    openrouter: keys.openrouter ?? '',
  })
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})

  const handleSave = () => {
    Object.entries(localKeys).forEach(([provider, value]) => {
      setKey(provider as keyof ProviderKeys, value)
    })
    onClose()
  }

  const toggleShow = (providerKey: string) => {
    setShowKey((prev) => ({ ...prev, [providerKey]: !prev[providerKey] }))
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-ink/70">
      <div
        className="bg-white border-2 border-ink w-full shadow-[8px_8px_0px_#0A0A0A]"
        style={{ maxWidth: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink bg-[#FFE500]">
          <div className="flex items-center gap-3">
            <Key size={20} className="text-ink" />
            <h2 className="font-display text-xl text-ink uppercase">API KEYS</h2>
            <span className="bg-ink text-[#FFE500] font-mono text-xs px-2 py-0.5">
              {activeCount} ACTIVE
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-[#FFE500] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Security note */}
        <div className="mx-6 mt-4 bg-[#B6FF39]/20 border-2 border-[#B6FF39] p-3 flex gap-2 items-start">
          <span className="text-[#0A0A0A] font-mono text-base leading-none mt-0.5">🔒</span>
          <p className="font-mono text-xs text-ink leading-relaxed">
            <strong>Keys stored only in your browser.</strong> Yahavi Forge never sees them.
            They are saved to localStorage and never transmitted to our servers.
          </p>
        </div>

        {/* Provider cards */}
        <div className="p-6 space-y-4">
          {PROVIDERS.map((provider) => (
            <div key={provider.key} className="border-2 border-ink p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base text-ink uppercase">{provider.name}</h3>
                    {localKeys[provider.key] && (
                      <span className="bg-[#B6FF39] border border-ink font-mono text-[10px] px-1.5 py-0.5 text-ink">
                        ● ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-ink/60 mt-0.5">{provider.description}</p>
                </div>
                <a
                  href={provider.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] text-ink/50 hover:text-ink underline underline-offset-2 flex-shrink-0 ml-2"
                >
                  Get free key
                  <ExternalLink size={10} />
                </a>
              </div>

              <div className="relative">
                <input
                  type={showKey[provider.key] ? 'text' : 'password'}
                  value={localKeys[provider.key] ?? ''}
                  onChange={(e) =>
                    setLocalKeys((prev) => ({ ...prev, [provider.key]: e.target.value }))
                  }
                  placeholder={provider.placeholder}
                  className="brand-input w-full pr-10 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => toggleShow(provider.key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
                  aria-label={showKey[provider.key] ? 'Hide key' : 'Show key'}
                >
                  {showKey[provider.key] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t-2 border-ink bg-ink/5">
          <button
            onClick={() => {
              setLocalKeys({ groq: '', gemini: '', openrouter: '' })
            }}
            className="font-mono text-xs text-ink/50 hover:text-ink underline underline-offset-2 transition-colors"
          >
            Clear all keys
          </button>
          <button
            onClick={handleSave}
            className="bg-[#FFE500] border-2 border-ink px-6 py-2.5 font-mono font-bold text-sm text-ink hover:bg-ink hover:text-[#FFE500] transition-colors"
          >
            SAVE & CLOSE →
          </button>
        </div>
      </div>
    </div>
  )
}
