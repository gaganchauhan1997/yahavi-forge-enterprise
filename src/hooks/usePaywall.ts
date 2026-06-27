import { useAuthCtx } from '@/providers/AuthProvider'

export type SubscriptionTier = 'guest' | 'free' | 'day' | 'monthly' | 'yearly'

interface UnlockSession {
  unlocked: boolean
  planId: string
  issuedAt: string
  expiresAt: string
}

function getStoredSession(): UnlockSession | null {
  try {
    const raw = localStorage.getItem('yahavi-forge-session')
    if (!raw) return null
    return JSON.parse(raw) as UnlockSession
  } catch {
    return null
  }
}

export function setUnlockedSession(planId: string, hours: number): void {
  const s: UnlockSession = {
    unlocked: true,
    planId,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + hours * 3600_000).toISOString(),
  }
  try {
    localStorage.setItem('yahavi-forge-session', JSON.stringify(s))
  } catch {}
}

export function usePaywall() {
  const { user } = useAuthCtx()
  const isSignedIn = !!user

  const getTier = (): SubscriptionTier => {
    if (!isSignedIn) {
      // Check for active paid session (Razorpay unlock without account)
      const s = getStoredSession()
      if (s?.unlocked && s.expiresAt && new Date(s.expiresAt) > new Date()) {
        return (s.planId as SubscriptionTier) || 'day'
      }
      return 'guest'
    }
    // Signed-in user: check for paid session
    const s = getStoredSession()
    if (s?.unlocked && s.expiresAt && new Date(s.expiresAt) > new Date()) {
      return (s.planId as SubscriptionTier) || 'day'
    }
    return 'free'
  }

  const tier = getTier()

  /** Can the user export at all? (signed in OR any paid plan) */
  const canExport = (): boolean => tier !== 'guest'

  /** Can the user export WITHOUT a watermark? */
  const canExportClean = (): boolean =>
    ['day', 'monthly', 'yearly'].includes(tier)

  /** Can the user run this specific tool? */
  const canRunTool = (freeTierTool: boolean): boolean => {
    if (freeTierTool) return true
    // Non-free-tier tools: need sign-in OR paid plan
    return isSignedIn || ['day', 'monthly', 'yearly'].includes(tier)
  }

  /** Guard an export action — returns true if allowed, false if paywall should show */
  const guard = (action: 'copy' | 'pdf' | 'html' | 'txt' | 'push'): boolean => {
    if (action === 'txt' || action === 'copy') return true
    if (action === 'push') return canExportClean()
    return canExport()
  }

  return { isSignedIn, tier, canExport, canExportClean, canRunTool, guard }
}
