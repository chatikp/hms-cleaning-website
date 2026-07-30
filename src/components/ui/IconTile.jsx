const tones = {
  blue: 'bg-gradient-to-br from-blue-50/60 to-white/20 text-blue-700',
  sand: 'bg-gradient-to-br from-sand-50/60 to-white/20 text-sand-700',
  charcoal: 'bg-gradient-to-br from-charcoal-800/30 to-white/5 text-white',
  white: 'bg-white/10 text-foreground',
}

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
}

export default function IconTile({ icon: Icon, tone = 'blue', size = 'md', className = '' }) {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center rounded-full ${sizes[size]} ${tones[tone]} ${className} border border-white/10 shadow-soft-lg backdrop-blur-sm p-1`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center rounded-full bg-white/0 p-1">
        <Icon className={size === 'lg' ? 'h-7 w-7' : size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'} strokeWidth={1.6} />
      </div>
    </div>
  )
}
