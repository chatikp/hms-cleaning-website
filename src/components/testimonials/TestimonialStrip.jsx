import StarRating from '../ui/StarRating'

export default function TestimonialStrip({ testimonials = [] }) {
  const items = [...testimonials, ...testimonials]

  return (
    <div
      className="overflow-hidden border-y border-charcoal-700 bg-cream py-8"
      role="region"
      aria-label="Customer testimonials"
    >
      <div className="flex w-max animate-marquee items-center">
        {items.map((t, i) => (
          <div key={`${t.id}-${i}`} className="flex flex-shrink-0 items-center gap-2 px-8 text-sm text-charcoal-200">
            <span className="flex items-center gap-0.5 text-sand-400" aria-hidden="true">
              <StarRating rating={t.rating} size={14} />
            </span>
            <span className="whitespace-nowrap">
              <span className="text-charcoal-300">&ldquo;{t.quote}&rdquo;</span>{' '}
              <span className="font-medium text-white">&mdash; {t.name}</span>
            </span>
            <span className="mx-6 text-charcoal-600" aria-hidden="true">
              &bull;
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
