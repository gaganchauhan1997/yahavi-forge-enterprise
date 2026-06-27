import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF6E9] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-[clamp(80px,15vw,140px)] leading-none text-[#111] mb-2">
          4<span className="text-[#FF2D55]">0</span>4
        </div>
        <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b6b6b] mb-6">
          PAGE NOT FOUND
        </div>
        <p className="font-body text-[15px] text-[#3a3a3a] mb-8 max-w-[400px] mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="brand-btn brand-btn-primary no-underline">
            <Home size={16} /> Go Home
          </Link>
          <Link to="/app" className="brand-btn brand-btn-ghost no-underline">
            <ArrowLeft size={16} /> Open Forge
          </Link>
        </div>
      </div>
    </div>
  );
}
