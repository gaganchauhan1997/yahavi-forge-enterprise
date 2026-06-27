import { X, Zap, Star, Crown, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { setUnlockedSession } from '@/hooks/usePaywall'

interface PaywallModalProps {
  action: string
  onClose: () => void
  onUnlock: (planId: string) => void
}

interface Plan {
  id: string
  name: string
  price: string
  desc: string
  icon: React.ReactNode
  featured?: boolean
  amount?: number
  hours?: number
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  theme: { color: string }
  handler: (response: { razorpay_payment_id: string }) => void
}

interface RazorpayInstance {
  open: () => void
}

function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('rzp-script')) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = 'rzp-script'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay'))
    document.body.appendChild(script)
  })
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'FREE',
    price: '₹0',
    desc: 'Sign in for free exports (with watermark)',
    icon: <Star size={16} />,
  },
  {
    id: 'day',
    name: 'DAY PASS',
    price: '₹49',
    desc: 'All tools, 24h, no watermark',
    icon: <Calendar size={16} />,
    amount: 4900,
    hours: 24,
  },
  {
    id: 'monthly',
    name: 'MONTHLY',
    price: '₹249/mo',
    desc: 'All tools, every day',
    icon: <Zap size={16} />,
    featured: true,
    amount: 24900,
    hours: 720,
  },
  {
    id: 'yearly',
    name: 'YEARLY',
    price: '₹2,499/yr',
    desc: 'Save 17% vs monthly',
    icon: <Crown size={16} />,
    amount: 249900,
    hours: 8760,
  },
]

export default function PaywallModal({ action, onClose, onUnlock }: PaywallModalProps) {
  const navigate = useNavigate()

  const handlePlan = async (plan: Plan) => {
    if (plan.id === 'free') {
      navigate('/login')
      onClose()
      return
    }

    try {
      await loadRazorpay()
      const rzp = new window.Razorpay({
        key: 'rzp_live_T5zNyTT4rOMLaO',
        amount: plan.amount!,
        currency: 'INR',
        name: 'Yahavi Forge',
        description: `${plan.name} — ${plan.desc}`,
        theme: { color: '#FFE500' },
        handler: (_response) => {
          setUnlockedSession(plan.id, plan.hours!)
          onUnlock(plan.id)
          onClose()
        },
      })
      rzp.open()
    } catch (err) {
      console.error('Razorpay error:', err)
    }
  }

  return (
    <div className="fixed inset-0 z-[308] flex items-center justify-center p-4 bg-ink/80">
      <div
        className="w-full border-2 border-[#FFE500] bg-[#1A1A1A] shadow-[8px_8px_0px_#FFE500]"
        style={{ maxWidth: '480px' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b-2 border-[#FFE500]/30">
          <div>
            <p className="font-mono text-xs text-[#FFE500] uppercase tracking-widest mb-1">
              PAYWALL
            </p>
            <h2 className="font-display text-2xl text-paper uppercase leading-tight">
              UNLOCK TO {action}
            </h2>
            <p className="font-body text-sm text-paper/60 mt-2">
              Pick a plan or sign in — your AI keys stay free forever.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-paper/30 flex items-center justify-center text-paper/60 hover:border-paper hover:text-paper transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Plans */}
        <div className="p-4 space-y-2">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handlePlan(plan)}
              className={`w-full text-left border-2 p-4 flex items-center justify-between transition-all group ${
                plan.featured
                  ? 'bg-[#FFE500] border-[#FFE500] text-ink hover:bg-white'
                  : 'bg-transparent border-paper/20 text-paper hover:border-[#FFE500] hover:bg-[#FFE500]/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={plan.featured ? 'text-ink' : 'text-[#FFE500]'}>
                  {plan.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold text-sm ${plan.featured ? 'text-ink' : 'text-paper'}`}>
                      {plan.name}
                    </span>
                    {plan.featured && (
                      <span className="bg-ink text-[#FFE500] font-mono text-[10px] px-1.5 py-0.5">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className={`font-body text-xs mt-0.5 ${plan.featured ? 'text-ink/70' : 'text-paper/60'}`}>
                    {plan.desc}
                  </p>
                </div>
              </div>
              <span className={`font-display text-lg ${plan.featured ? 'text-ink' : 'text-[#FFE500]'}`}>
                {plan.price}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t-2 border-[#FFE500]/20 text-center">
          <button
            onClick={onClose}
            className="font-mono text-xs text-paper/50 hover:text-paper underline underline-offset-2 transition-colors"
          >
            Continue as Guest (TXT copy always free)
          </button>
        </div>
      </div>
    </div>
  )
}
