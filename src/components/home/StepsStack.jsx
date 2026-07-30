import * as React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/utils'

const OFFSET_FACTOR = 4
const SCALE_FACTOR = 0.03
const OPACITY_FACTOR = 0.1

export default function StepsStack({ steps }) {
  const [dismissed, setDismissed] = React.useState([])
  const cards = steps.filter(({ href }) => !dismissed.includes(href))
  const cardCount = cards.length
  const [showCompleted, setShowCompleted] = React.useState(cardCount > 0)

  React.useEffect(() => {
    let timeout
    if (cardCount === 0) timeout = setTimeout(() => setShowCompleted(false), 2700)
    return () => clearTimeout(timeout)
  }, [cardCount])

  const reset = () => setDismissed([])

  return (
    <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="group relative">
        {[...cards].reverse().map(({ href, title, summary, image }, idx) => (
          <div
            key={href}
            className={cn(
              'absolute left-0 top-0 size-full scale-[var(--scale)] transition-[opacity,transform] duration-200',
              cardCount - idx > 3
                ? [
                    'opacity-0 sm:group-hover:translate-y-[var(--y)] sm:group-hover:opacity-[var(--opacity)]',
                    'sm:group-has-[*[data-dragging=true]]:translate-y-[var(--y)] sm:group-has-[*[data-dragging=true]]:opacity-[var(--opacity)]',
                  ]
                : 'translate-y-[var(--y)] opacity-[var(--opacity)]'
            )}
            style={{
              '--y': `-${(cardCount - (idx + 1)) * OFFSET_FACTOR}%`,
              '--scale': 1 - (cardCount - (idx + 1)) * SCALE_FACTOR,
              '--opacity': cardCount - (idx + 1) >= 6 ? 0 : 1 - (cardCount - (idx + 1)) * OPACITY_FACTOR,
            }}
            aria-hidden={idx !== cardCount - 1}
          >
            <StepCard
              title={title}
              description={summary}
              image={image}
              href={href}
              hideContent={cardCount - idx > 1}
              active={idx === cardCount - 1}
              onDismiss={() => setDismissed([href, ...dismissed.slice(0, 50)])}
            />
          </div>
        ))}
        <div className="pointer-events-none invisible" aria-hidden>
          <StepCard title="Title" description="Description" />
        </div>
        {showCompleted && !cardCount && (
          <div
            className="animate-slide-up-fade absolute inset-0 flex size-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md [animation-duration:1s]"
            style={{ '--offset': '10px' }}
          >
            <CheckCircle2 className="draw-in h-10 w-10 text-blue-300" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs font-medium text-charcoal-200">{"You're all set!"}</span>
            <button
              type="button"
              onClick={reset}
              className="text-xs font-semibold text-blue-300 hover:text-blue-200 hover:underline"
            >
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function StepCard({ title, description, image, onDismiss, hideContent, href, active }) {
  const { isMobile } = useMediaQuery()

  const ref = React.useRef(null)
  const drag = React.useRef({ start: 0, delta: 0, startTime: 0, maxDelta: 0 })
  const animation = React.useRef(undefined)
  const [dragging, setDragging] = React.useState(false)

  const onDragMove = (e) => {
    if (!ref.current) return
    const dx = e.clientX - drag.current.start
    drag.current.delta = dx
    drag.current.maxDelta = Math.max(drag.current.maxDelta, Math.abs(dx))
    ref.current.style.setProperty('--dx', dx.toString())
  }

  const dismiss = () => {
    if (!ref.current) return
    const cardWidth = ref.current.getBoundingClientRect().width
    const translateX = Math.sign(drag.current.delta) * cardWidth || cardWidth

    animation.current = ref.current.animate(
      { opacity: 0, transform: `translateX(${translateX}px)` },
      { duration: 150, easing: 'ease-in-out', fill: 'forwards' }
    )
    animation.current.onfinish = () => onDismiss?.()
  }

  const stopDragging = (cancelled) => {
    if (!ref.current) return
    unbindListeners()
    setDragging(false)

    const dx = drag.current.delta
    if (Math.abs(dx) > ref.current.clientWidth / (cancelled ? 2 : 3)) {
      dismiss()
      return
    }

    animation.current = ref.current.animate({ transform: 'translateX(0)' }, { duration: 150, easing: 'ease-in-out' })
    animation.current.onfinish = () => ref.current?.style.setProperty('--dx', '0')

    drag.current = { start: 0, delta: 0, startTime: 0, maxDelta: 0 }
  }

  const onDragEnd = () => stopDragging(false)
  const onDragCancel = () => stopDragging(true)

  const onPointerDown = (e) => {
    if (!active || !ref.current || animation.current?.playState === 'running') return

    bindListeners()
    setDragging(true)
    drag.current.start = e.clientX
    drag.current.startTime = Date.now()
    drag.current.delta = 0
    ref.current.style.setProperty('--w', ref.current.clientWidth.toString())
  }

  const onClick = () => {
    if (!ref.current) return
    if (
      isMobile &&
      drag.current.maxDelta < ref.current.clientWidth / 10 &&
      (!drag.current.startTime || Date.now() - drag.current.startTime < 250)
    ) {
      window.open(href, '_blank')
    }
  }

  const bindListeners = () => {
    document.addEventListener('pointermove', onDragMove)
    document.addEventListener('pointerup', onDragEnd)
    document.addEventListener('pointercancel', onDragCancel)
  }

  const unbindListeners = () => {
    document.removeEventListener('pointermove', onDragMove)
    document.removeEventListener('pointerup', onDragEnd)
    document.removeEventListener('pointercancel', onDragCancel)
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative size-full select-none overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-soft-lg backdrop-blur-md sm:p-6',
        'translate-x-[calc(var(--dx)*1px)] rotate-[calc(var(--dx)*0.05deg)] opacity-[calc(1-max(var(--dx),-1*var(--dx))/var(--w)/2)]',
        'transition-shadow data-[dragging=true]:shadow-soft-xl'
      )}
      data-dragging={dragging}
      onPointerDown={onPointerDown}
      onClick={onClick}
    >
      <div className={cn('flex h-full flex-col pb-11 sm:pb-12', hideContent && 'invisible')}>
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5">
          {image && (
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
            />
          )}
        </div>
        <div className="mt-5 flex flex-1 flex-col gap-2">
          <span className="line-clamp-1 font-heading text-lg font-medium text-white sm:text-xl">{title}</span>
          <p className="line-clamp-3 text-sm leading-relaxed text-charcoal-200">{description}</p>
        </div>
        <div
          className={cn(
            'pointer-events-none absolute inset-x-5 bottom-5 flex translate-y-2 items-center justify-between border-t border-white/15 pt-3 text-sm opacity-0 transition-[transform,opacity] duration-200 sm:inset-x-6 sm:bottom-6',
            active &&
              'sm:group-has-[*[data-dragging=true]]:pointer-events-auto sm:group-has-[*[data-dragging=true]]:translate-y-0 sm:group-has-[*[data-dragging=true]]:opacity-100 sm:group-hover:pointer-events-auto sm:group-hover:translate-y-0 sm:group-hover:opacity-100'
          )}
        >
          <Link to={href} className="font-semibold text-blue-300 transition-colors duration-75 hover:text-blue-200">
            Learn more
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="font-medium text-charcoal-300 transition-colors duration-75 hover:text-white"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
