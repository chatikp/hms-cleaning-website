import { Star } from 'lucide-react'

export default function StarRating({ rating = 5, max = 5, size = 16, className = '' }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          aria-hidden="true"
          className={i < rating ? 'fill-sand-500 text-sand-500' : 'fill-charcoal-200 text-charcoal-200'}
        />
      ))}
    </div>
  )
}
