import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/providers/AuthProvider'
import LandingPage from '@/pages/landing/LandingPage'
import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/pages/Login'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'
import { TermsPage } from '@/pages/legal/TermsPage'
import { PrivacyPage } from '@/pages/legal/PrivacyPage'
import { RefundPage } from '@/pages/legal/RefundPage'
import { DPAPage } from '@/pages/legal/DPAPage'
import { DMCAPage } from '@/pages/legal/DMCAPage'
import { CookiesPage } from '@/pages/legal/CookiesPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/:toolId" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal/refund" element={<RefundPage />} />
        <Route path="/legal/dpa" element={<DPAPage />} />
        <Route path="/legal/dmca" element={<DMCAPage />} />
        <Route path="/legal/cookies" element={<CookiesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}
