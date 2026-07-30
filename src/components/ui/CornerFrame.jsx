const toneClasses = {
  white: 'text-white/85',
  charcoal: 'text-charcoal-900/70',
  blue: 'text-blue-600/80',
}

function Bracket({ corner, colorClass }) {
  const rotations = {
    tl: 'rotate-0 top-3 left-3',
    tr: 'rotate-90 top-3 right-3',
    br: 'rotate-180 bottom-3 right-3',
    bl: '-rotate-90 bottom-3 left-3',
  }

  return (
    <svg
      viewBox="0 0 28 28"
      className={`pointer-events-none absolute h-6 w-6 sm:h-7 sm:w-7 ${colorClass} ${rotations[corner]}`}
      aria-hidden="true"
    >
      <path d="M2 14 V4a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Thin L-shaped corner brackets overlaid on photography, in place of a
 * plain rounded-corner crop — an editorial "curated exhibit" framing device
 * echoing the logo's linework rather than a generic template card.
 */
export default function CornerFrame({ children, tone = 'white', className = '' }) {
  const colorClass = toneClasses[tone]

  return (
    <div className={`relative ${className}`}>
      {children}
      <Bracket corner="tl" colorClass={colorClass} />
      <Bracket corner="tr" colorClass={colorClass} />
      <Bracket corner="br" colorClass={colorClass} />
      <Bracket corner="bl" colorClass={colorClass} />
    </div>
  )
}
