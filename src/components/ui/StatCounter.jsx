import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export default function StatCounter({ value, suffix = '', label, decimals = 0, light = true }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center sm:items-start sm:text-left"
    >
      <span className={`font-heading text-4xl font-medium tabular-nums sm:text-5xl ${light ? 'text-white' : 'text-charcoal-900'}`}>
        {display.toFixed(decimals)}
        {suffix}
      </span>
      <span className={`mt-1 text-sm font-medium ${light ? 'text-charcoal-300' : 'text-charcoal-500'}`}>{label}</span>
    </motion.div>
  )
}
