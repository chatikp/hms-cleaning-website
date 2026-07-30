import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from './TestimonialCard'

export default function TestimonialCarousel({ testimonials, autoPlay = true, interval = 6000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), [testimonials.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length), [testimonials.length])
  const handleDragEnd = useCallback(
    (event, info) => {
      if (info.offset.x < -80) {
        next()
      } else if (info.offset.x > 80) {
        prev()
      }
    },
    [next, prev]
  )

  useEffect(() => {
    if (!autoPlay || paused || prefersReducedMotion.current) return
    timerRef.current = setInterval(next, interval)
    return () => clearInterval(timerRef.current)
  }, [autoPlay, paused, interval, next])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
            className="mx-auto max-w-2xl"
          >
            <TestimonialCard testimonial={testimonials[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-blue-400 hover:text-blue-700"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ease-premium ${
                i === index ? 'w-7 bg-blue-600' : 'w-2.5 bg-charcoal-200 hover:bg-charcoal-300'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-blue-400 hover:text-blue-700"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
