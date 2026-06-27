import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="font-display text-[120px] leading-none text-pink" style={{textShadow:'6px 6px 0 #0A0A0A'}}>404</div>
        <h1 className="font-display text-2xl uppercase tracking-tight mt-2 mb-3">Page not found.</h1>
        <p className="text-sm text-muted mb-6">This path doesn't exist or has moved.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="brand-btn brand-btn-primary">▸ Home</Link>
          <Link to="/app" className="brand-btn brand-btn-ghost">▸ Open App</Link>
        </div>
      </div>
    </div>
  )
}
