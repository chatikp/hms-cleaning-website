import { useCallback, useId, useRef, useState } from 'react'
import { Sparkles, PaintBucket } from 'lucide-react'
import PlaceholderImage from '../ui/PlaceholderImage'
import CornerFrame from '../ui/CornerFrame'

const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export default function BeforeAfterSlider({ title, service, image, beforeImage, className = '', aspectClass = 'aspect-[4/3]' }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const draggingRef = useRef(false)
  const id = useId()

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e) => {
    draggingRef.current = true
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const stopDragging = () => {
    draggingRef.current = false
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + 5))
    }
  }

  return (
    <div className={`group ${className}`}>
      <CornerFrame tone="white" className={className}>
        <div
          ref={containerRef}
          className={`before-after-slider relative ${aspectClass} w-full touch-none select-none overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-soft-lg ring-1 ring-white/10 ${className}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerLeave={stopDragging}
        >
          <div className="absolute inset-0">
            {image ? (
              <img
                src={image}
                alt={`${title} — after cleaning`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <PlaceholderImage
                icon={Sparkles}
                tone="mixed"
                label="After"
                alt={`${title} — after cleaning`}
                className="h-full w-full"
                iconClassName="h-12 w-12"
              />
            )}
          </div>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            {beforeImage ? (
              <img
                src={beforeImage}
                alt={`${title} — before cleaning`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : image ? (
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={`${title} — before cleaning`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ filter: 'grayscale(0.4) sepia(0.35) brightness(0.62) contrast(1.05) saturate(1.1)' }}
                />
                {/* Grime overlay: corner buildup + dust grain, simulating an uncleaned pass of the same room.
                    Remove once a real photographed "before" is available via the beforeImage prop. */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 0% 0%, rgba(82,69,47,0.55), transparent 58%),' +
                      'radial-gradient(circle at 100% 100%, rgba(82,69,47,0.5), transparent 58%),' +
                      'radial-gradient(circle at 100% 0%, rgba(82,69,47,0.35), transparent 52%),' +
                      'radial-gradient(circle at 0% 100%, rgba(82,69,47,0.35), transparent 52%)',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
                  style={{ backgroundImage: `url("${NOISE_URI}")` }}
                />
              </div>
            ) : (
              <PlaceholderImage
                icon={PaintBucket}
                tone="charcoal"
                label="Before"
                alt={`${title} — before cleaning`}
                className="h-full w-full"
                iconClassName="h-12 w-12"
              />
            )}
          </div>

          <div
            role="slider"
            tabIndex={0}
            aria-label={`Before and after comparison for ${title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            onKeyDown={onKeyDown}
            className="absolute inset-y-0 flex w-12 -translate-x-1/2 cursor-ew-resize items-center justify-center focus:outline-none"
            style={{ left: `${position}%` }}
          >
            <div className="absolute inset-y-0 w-px bg-white/20" />
            <div className="before-after-slider-thumb relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft-lg ring-1 ring-blue-500/30 transition-transform duration-200 ease-premium group-hover:scale-105">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-100/20 bg-sand-50 text-charcoal-950 shadow-[0_5px_12px_-8px_rgba(31,31,36,0.4)]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2L1 7L5 12" stroke="#254A69" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 2L13 7L9 12" stroke="#254A69" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <span className="absolute left-3 top-3 rounded-full bg-charcoal-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Before
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-sand-600/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            After
          </span>
        </div>
      </CornerFrame>
      <div className="mt-3">
        <p className="font-heading text-sm font-medium text-white">{title}</p>
        <p id={`${id}-service`} className="text-xs text-charcoal-400">
          {service}
        </p>
      </div>
    </div>
  )
}
