import { Image as ImageIcon } from 'lucide-react'

const tones = {
  blue: 'from-blue-100 via-blue-50 to-cream',
  sand: 'from-sand-100 via-sand-50 to-cream',
  charcoal: 'from-charcoal-800 via-charcoal-900 to-charcoal-950',
  mixed: 'from-blue-100 via-cream to-sand-100',
  'mixed-dark': 'from-blue-900 via-charcoal-900 to-sand-900',
}

const iconTones = {
  blue: 'text-blue-300',
  sand: 'text-sand-300',
  charcoal: 'text-charcoal-600',
  mixed: 'text-blue-300',
  'mixed-dark': 'text-white/20',
}

/**
 * Placeholder visual used in place of real photography.
 * Swap with actual project photos before launch — alt text is
 * wired through so replacement is a drop-in change.
 */
export default function PlaceholderImage({
  icon: Icon = ImageIcon,
  tone = 'blue',
  label,
  alt = '',
  className = '',
  iconClassName = 'h-10 w-10',
}) {
  const decorative = !alt

  return (
    <div
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? 'true' : undefined}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <Icon className={`${iconClassName} ${iconTones[tone]}`} strokeWidth={1.5} aria-hidden="true" />
        {label && (
          <span className={`text-xs font-medium ${tone === 'charcoal' || tone === 'mixed-dark' ? 'text-white/50' : 'text-charcoal-400'}`}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
