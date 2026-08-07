import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarCheck, ShieldCheck, Star } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import StarRating from '../ui/StarRating'
import BrandMotif from '../ui/BrandMotif'
import heroImage from '../../assets/images/hero-living-room.webp'

export default function Hero() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const badgeX = useTransform(springX, [-1, 1], [8, -8])
  const badgeY = useTransform(springY, [-1, 1], [6, -6])

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `linear-gradient(rgba(13, 24, 35, 0.55), rgba(13, 24, 35, 0.55)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      <div className="absolute inset-0 bg-charcoal-950/30" />
      <BrandMotif className="pointer-events-none absolute -top-10 right-0 h-72 w-72 sm:h-96 sm:w-96" />
      <BrandMotif className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 opacity-70 sm:h-80 sm:w-80" flip />

      <div className="container-page relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="white" className="mb-6">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Licensed, Bonded &amp; Insured
          </Badge>

          <h1 className="font-heading text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            A spotless space,
            <span className="block font-accent italic font-normal text-blue-300">
              without lifting a finger.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-200">
            Harrell Maintenance Solutions delivers meticulous residential and commercial cleaning across
            Cleveland. Book online in minutes, get an instant quote, and enjoy a satisfaction guarantee on every
            visit.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/booking" size="lg" variant="primary" icon={CalendarCheck}>
              Book a Cleaning
            </Button>
            <Button to="/quote" size="lg" variant="outline" icon={ArrowRight}>
              Get Instant Quote
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-sm font-semibold text-charcoal-100">4.9/5</span>
              <span className="text-sm text-charcoal-400">from 107+ reviews</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ x: badgeX, y: badgeY }}
            className="absolute -left-4 top-8 hidden animate-float rounded-none bg-white p-4 shadow-soft-lg sm:-left-8 sm:flex sm:items-center sm:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-sand-700">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-charcoal-900">100% Guarantee</p>
              <p className="text-xs text-charcoal-500">Free re-clean if needed</p>
            </div>
          </motion.div>

          <motion.div
            style={{ x: badgeX, y: badgeY }}
            className="absolute -bottom-6 right-2 flex items-center gap-3 rounded-none bg-white p-4 shadow-soft-lg sm:-right-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Star className="h-5 w-5 fill-current" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-charcoal-900">4.9 / 5 Rating</p>
              <p className="text-xs text-charcoal-500">107+ verified reviews</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
