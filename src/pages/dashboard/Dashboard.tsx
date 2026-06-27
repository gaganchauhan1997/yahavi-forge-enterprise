import { useState, useCallback } from 'react';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import ToolRunner from './ToolRunner';
import HomePanel from './HomePanel';
import KeyManager from './KeyManager';
import YahaviChatbot from '@/components/chatbot/YahaviChatbot';
import DashboardHeader from './DashboardHeader';
import BYOKTutorial from '@/components/byok/BYOKTutorial';

export default function Dashboard() {
  const { toolId } = useParams<{ toolId?: string }>();
  const [activeTool, setActiveTool] = useState<string | null>(toolId || null);
  const [showKeys, setShowKeys] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToolSelect = useCallback((id: string | null) => {
    setActiveTool(id);
    setSidebarOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#FAF6E9]">
      <DashboardHeader onOpenKeys={() => setShowKeys(true)} onOpenSidebar={() => setSidebarOpen(true)} activeTool={activeTool} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <div className="fixed inset-0 bg-[#111]/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <Sidebar activeTool={activeTool} onSelectTool={handleToolSelect} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenKeys={() => setShowKeys(true)} onOpenTutorial={() => setShowTutorial(true)} />
        <main className="flex-1 overflow-y-auto">
          {activeTool ? <ToolRunner toolId={activeTool} onBack={() => setActiveTool(null)} /> : <HomePanel onSelectTool={handleToolSelect} />}
        </main>
      </div>
      <YahaviChatbot />
      {showKeys && <KeyManager onClose={() => setShowKeys(false)} />}
      {showTutorial && <BYOKTutorial onClose={() => setShowTutorial(false)} />}
    </div>
  );
}
