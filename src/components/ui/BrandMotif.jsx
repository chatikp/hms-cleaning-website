/**
 * Decorative line-art echoing the HMS logo's arc + sparkle marks —
 * used in place of generic blurred gradient blobs.
 */
export default function BrandMotif({ className = '', light = false, flip = false }) {
  const arcColor = light ? '#8FBEE0' : '#8FBEE0'
  const arcColor2 = light ? '#BBA378' : '#D3C1A0'
  const sparkleColor = light ? '#DCEBF6' : '#4488BE'

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <circle
        cx="120"
        cy="120"
        r="98"
        fill="none"
        stroke={arcColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="210 400"
        opacity={light ? 0.55 : 0.4}
      />
      <circle
        cx="120"
        cy="120"
        r="118"
        fill="none"
        stroke={arcColor2}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="150 480"
        strokeDashoffset="-260"
        opacity={light ? 0.5 : 0.35}
      />
      <g opacity={light ? 0.8 : 0.6} fill={sparkleColor}>
        <path d="M188 48 L191 58 L201 61 L191 64 L188 74 L185 64 L175 61 L185 58 Z" />
        <path d="M204 72 L205.6 77 L210.6 78.6 L205.6 80.2 L204 85.2 L202.4 80.2 L197.4 78.6 L202.4 77 Z" />
        <path d="M170 34 L171.6 39 L176.6 40.6 L171.6 42.2 L170 47.2 L168.4 42.2 L163.4 40.6 L168.4 39 Z" />
      </g>
    </svg>
  )
}
