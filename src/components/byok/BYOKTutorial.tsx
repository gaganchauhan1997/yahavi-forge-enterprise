import { useState } from 'react'
import { X, Key, Shield, Zap, CheckCircle } from 'lucide-react'

interface BYOKTutorialProps {
  onClose: () => void
}

interface Step {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

export default function BYOKTutorial({ onClose }: BYOKTutorialProps) {
  const [step, setStep] = useState(0)

  const steps: Step[] = [
    {
      icon: <Shield size={32} className="text-yellow-400" style={{ color: '#FFE500' }} />,
      title: 'Why BYOK?',
      content: (
        <div className="space-y-4">
          <p className="font-body text-base text-ink leading-relaxed">
            BYOK stands for <strong>Bring Your Own Key</strong>. Instead of us storing or billing for AI usage,
            you connect your own API keys from providers like Groq or Gemini.
          </p>
          <ul className="space-y-3">
            {[
              ['Your keys stay in your browser', 'We never send them to our servers — they live only in localStorage.'],
              ['It\'s completely free', 'Groq offers generous free-tier limits. You pay the provider directly, if at all.'],
              ['Privacy-first', 'Your resume data goes from your browser directly to the AI provider. We see nothing.'],
              ['Full control', 'Swap providers, rotate keys, delete anytime — you own the entire flow.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3 items-start">
                <span className="mt-1 flex-shrink-0 w-5 h-5 bg-[#B6FF39] border-2 border-ink flex items-center justify-center text-xs font-mono font-bold">✓</span>
                <div>
                  <span className="font-mono font-bold text-sm text-ink">{title}</span>
                  <p className="font-body text-sm text-ink/70 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      icon: <Key size={32} style={{ color: '#FFE500' }} />,
      title: 'Get a Groq Key',
      content: (
        <div className="space-y-4">
          <p className="font-body text-base text-ink leading-relaxed">
            Groq is the fastest free AI provider. Setup takes 2 minutes.
          </p>
          <ol className="space-y-3">
            {[
              'Go to console.groq.com/keys (link below)',
              'Create a free account with Google or email',
              'Click "Create API Key"',
              'Name it anything (e.g. "yahavi-forge")',
              'Copy the key — it starts with gsk_...',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-ink text-paper font-mono font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-body text-sm text-ink leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFE500] border-2 border-ink px-4 py-2 font-mono font-bold text-sm text-ink hover:bg-ink hover:text-[#FFE500] transition-colors"
          >
            <Key size={14} />
            console.groq.com/keys →
          </a>
          <p className="font-mono text-xs text-ink/60 bg-ink/5 border border-ink/20 p-2">
            Free tier: 6,000 req/day on Llama 3. More than enough for job hunting.
          </p>
        </div>
      ),
    },
    {
      icon: <Zap size={32} style={{ color: '#FFE500' }} />,
      title: 'Get a Gemini Key (optional)',
      content: (
        <div className="space-y-4">
          <p className="font-body text-base text-ink leading-relaxed">
            Gemini is Google's AI — great for longer documents and multilingual content. It's optional but recommended.
          </p>
          <ol className="space-y-3">
            {[
              'Go to aistudio.google.com/app/apikey (link below)',
              'Sign in with your Google account',
              'Click "Create API key"',
              'Choose "Create API key in new project" or an existing one',
              'Copy the key',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-ink text-paper font-mono font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-body text-sm text-ink leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFE500] border-2 border-ink px-4 py-2 font-mono font-bold text-sm text-ink hover:bg-ink hover:text-[#FFE500] transition-colors"
          >
            <Zap size={14} />
            aistudio.google.com/app/apikey →
          </a>
          <p className="font-mono text-xs text-ink/60 bg-ink/5 border border-ink/20 p-2">
            Free tier: 1,500 requests/day on Gemini 1.5 Flash. No credit card needed.
          </p>
        </div>
      ),
    },
    {
      icon: <CheckCircle size={32} style={{ color: '#B6FF39' }} />,
      title: 'Paste and Activate',
      content: (
        <div className="space-y-4">
          <p className="font-body text-base text-ink leading-relaxed">
            You're one step away from full AI access.
          </p>
          <ol className="space-y-3">
            {[
              'Click the "API KEYS" button in the sidebar (or top navigation)',
              'Paste your Groq key in the Groq field (starts with gsk_...)',
              'Optionally paste your Gemini key',
              'Click Save',
              'You\'ll see a green dot — you\'re live!',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-[#B6FF39] border-2 border-ink font-mono font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-body text-sm text-ink leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
          <div className="bg-[#B6FF39] border-2 border-ink p-3">
            <p className="font-mono font-bold text-sm text-ink">
              ● GREEN DOT = you're ready to run any tool
            </p>
            <p className="font-body text-xs text-ink/70 mt-1">
              Keys are saved in your browser's localStorage and never transmitted to Yahavi Forge servers.
            </p>
          </div>
        </div>
      ),
    },
  ]

  const current = steps[step]
  const isFirst = step === 0
  const isLast = step === steps.length - 1

  return (
    <div className="fixed inset-0 bg-ink/70 z-[300] flex items-center justify-center p-4">
      <div className="bg-white border-2 border-ink w-full max-w-xl shadow-[8px_8px_0px_#0A0A0A]">
        {/* Progress bar */}
        <div className="h-1.5 bg-ink/10 w-full">
          <div
            className="h-full bg-[#FFE500] transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b-2 border-ink">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink/50 uppercase tracking-wider">
              BYOK SETUP
            </span>
            <span className="font-mono text-xs bg-ink text-paper px-2 py-0.5">
              {step + 1} / {steps.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
            aria-label="Close tutorial"
          >
            <X size={16} />
          </button>
        </div>

        {/* Step tabs */}
        <div className="flex border-b-2 border-ink">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex-1 py-2 font-mono text-xs border-r-2 border-ink last:border-r-0 transition-colors ${
                i === step
                  ? 'bg-[#FFE500] text-ink'
                  : i < step
                  ? 'bg-[#B6FF39]/40 text-ink/70'
                  : 'bg-white text-ink/40'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            {current.icon}
            <h2 className="font-display text-2xl text-ink uppercase">{current.title}</h2>
          </div>
          {current.content}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between px-6 py-4 border-t-2 border-ink">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={isFirst}
            className="brand-btn border-2 border-ink px-4 py-2 font-mono text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink hover:text-paper transition-colors"
          >
            ← PREV
          </button>
          {isLast ? (
            <button
              onClick={onClose}
              className="bg-[#B6FF39] border-2 border-ink px-6 py-2 font-mono font-bold text-sm text-ink hover:bg-ink hover:text-[#B6FF39] transition-colors"
            >
              DONE — LET'S GO →
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="bg-[#FFE500] border-2 border-ink px-6 py-2 font-mono font-bold text-sm text-ink hover:bg-ink hover:text-[#FFE500] transition-colors"
            >
              NEXT →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
