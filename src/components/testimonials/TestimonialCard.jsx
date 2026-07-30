import { Quote } from 'lucide-react'
import StarRating from '../ui/StarRating'

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const toneClasses = {
  blue: {
    card: 'border-white/10 bg-white/[0.06] hover:bg-white/[0.09]',
    icon: 'text-blue-300/70',
    divider: 'border-white/10',
    avatar: 'bg-white/10',
  },
  sand: {
    card: 'border-sand-400/15 bg-sand-500/[0.05] hover:bg-sand-500/[0.09] shadow-glow-sand',
    icon: 'text-sand-300/80',
    divider: 'border-sand-400/15',
    avatar: 'bg-sand-500/15',
  },
}

export default function TestimonialCard({ testimonial, className = '', tone = 'blue' }) {
  const tones = toneClasses[tone] ?? toneClasses.blue
  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border p-6 shadow-soft-lg backdrop-blur-md transition-colors duration-300 ${tones.card} ${className}`}
    >
      <Quote className={`h-6 w-6 ${tones.icon}`} aria-hidden="true" />
      <StarRating rating={testimonial.rating} className="mt-4" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-charcoal-100">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className={`mt-6 flex items-center gap-3 border-t pt-5 ${tones.divider}`}>
        <span
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${tones.avatar}`}
          aria-hidden="true"
        >
          {initials(testimonial.name)}
        </span>
        <span>
          <span className="block text-sm font-bold text-white">{testimonial.name}</span>
          <span className="block text-xs text-charcoal-300">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
