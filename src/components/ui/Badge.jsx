const variants = {
  blue: 'bg-blue-100 text-blue-700',
  sand: 'bg-sand-100 text-sand-700',
  charcoal: 'bg-charcoal-100 text-charcoal-700',
  white: 'bg-white/15 text-white border border-white/25',
}

export default function Badge({ children, variant = 'blue', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
