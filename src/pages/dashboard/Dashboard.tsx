import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import Sidebar from './Sidebar'
import HomePanel from './HomePanel'
import ToolRunner from './ToolRunner'
import KeyManager from './KeyManager'
import BYOKTutorial from '@/components/byok/BYOKTutorial'
import YahaviChatbot from '@/components/chatbot/YahaviChatbot'
import { useAuthCtx } from '@/providers/AuthProvider'

const BYOK_SEEN_KEY = 'yahavi-forge-byok-seen'

export default function Dashboard() {
  const { toolId } = useParams<{ toolId?: string }>()
  const { user } = useAuthCtx()

  const [activeTool, setActiveTool] = useState<string | null>(toolId ?? null)
  const [showKeys, setShowKeys] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sync URL param
  useEffect(() => { setActiveTool(toolId ?? null) }, [toolId])

  // Auto-open BYOK tutorial on first sign-in if no keys
  useEffect(() => {
    if (!user) return
    const keys = JSON.parse(localStorage.getItem('yahavi-forge-keys') || '{}') as Record<string, string>
    const hasKey = Object.values(keys).some((k) => k?.trim().length > 0)
    const seen = localStorage.getItem(BYOK_SEEN_KEY) === 'true'
    if (!hasKey && !seen) setShowTutorial(true)
  }, [user])

  const handleTutorialClose = () => {
    setShowTutorial(false)
    localStorage.setItem(BYOK_SEEN_KEY, 'true')
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-paper">
      <DashboardHeader
        onMenuClick={() => setSidebarOpen(true)}
        onOpenKeys={() => setShowKeys(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTool={activeTool}
          onSelectTool={setActiveTool}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenTutorial={() => setShowTutorial(true)}
          onOpenKeys={() => setShowKeys(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {activeTool
            ? <ToolRunner toolId={activeTool} onBack={() => setActiveTool(null)} />
            : <HomePanel onSelectTool={setActiveTool} />
          }
        </main>
      </div>

      {/* Floating chatbot */}
      <YahaviChatbot />

      {/* Overlays */}
      {showKeys && <KeyManager onClose={() => setShowKeys(false)} />}
      {showTutorial && <BYOKTutorial onClose={handleTutorialClose} />}
    </div>
  )
}
