import { useState, useEffect } from 'react'
import { X, Star } from 'lucide-react'

interface ReviewModalProps {
  toolId: string
  onClose: () => void
}

interface Review {
  rating: number
  comment: string
  name: string
  date: string
}

export default function ReviewModal({ toolId, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [submitted, onClose])

  const handleSubmit = () => {
    if (rating === 0) return

    const storageKey = `yahavi-forge-tool-reviews-${toolId}`
    let existing: Review[] = []
    try {
      existing = JSON.parse(localStorage.getItem(storageKey) || '[]') as Review[]
    } catch {
      existing = []
    }

    const review: Review = {
      rating,
      comment: comment.trim(),
      name: name.trim() || 'Anonymous',
      date: new Date().toISOString(),
    }

    existing.push(review)
    try {
      localStorage.setItem(storageKey, JSON.stringify(existing))
    } catch {}

    setSubmitted(true)
  }

  const displayRating = hoverRating || rating

  return (
    <div className="fixed inset-0 z-[305] flex items-center justify-center p-4 bg-ink/70">
      <div
        className="bg-white border-2 border-ink w-full shadow-[6px_6px_0px_#0A0A0A]"
        style={{ maxWidth: '460px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink">
          <h2 className="font-display text-xl text-ink uppercase">Rate this tool</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          /* Thank you state */
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display text-2xl text-ink uppercase mb-2">Thank you!</h3>
            <p className="font-body text-sm text-ink/60">Your review has been saved.</p>
            <p className="font-mono text-xs text-ink/40 mt-2">Closing in 2 seconds...</p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Stars */}
            <div>
              <p className="font-mono text-xs text-ink/60 uppercase tracking-wider mb-3">
                Your Rating
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                  >
                    <Star
                      size={32}
                      className={`transition-colors ${
                        star <= displayRating
                          ? 'text-[#FFE500] fill-[#FFE500]'
                          : 'text-ink/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="font-mono text-xs text-ink/50 mt-2">
                  {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="font-mono text-xs text-ink/60 uppercase tracking-wider block mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya S."
                className="brand-input w-full"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="font-mono text-xs text-ink/60 uppercase tracking-wider block mb-2">
                Comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you think? How did it help you?"
                rows={3}
                className="brand-textarea w-full"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full bg-[#FFE500] border-2 border-ink py-3 font-mono font-bold text-sm text-ink hover:bg-ink hover:text-[#FFE500] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              SUBMIT REVIEW
            </button>

            {rating === 0 && (
              <p className="font-mono text-xs text-ink/40 text-center">
                Select a star rating to submit
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
