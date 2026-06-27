import { Routes, Route } from 'react-router';
import { AuthProvider } from '@/providers/AuthProvider';
import LandingPage from '@/pages/landing/LandingPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/:toolId" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
