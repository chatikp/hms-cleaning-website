import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from './Badge'
import BrandMotif from './BrandMotif'

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  cornerBadge,
  className = '',
  translucentPanel = false,
  image,
  blur = false,
  eyebrowVariant = 'white',
}) {
  return (
    <section
      style={
        image && !blur
          ? {
              backgroundImage: `linear-gradient(rgba(11, 22, 33, 0.72), rgba(11, 22, 33, 0.72)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
      className={`relative overflow-hidden ${image ? '' : 'bg-blue-950'} ${
        translucentPanel ? 'pb-8 pt-6 sm:pb-10 sm:pt-8' : 'pb-20 pt-14 sm:pb-24 sm:pt-16'
      } ${className}`}
    >
      {image && blur && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-blue-950/45" />
        </>
      )}
      <BrandMotif className="pointer-events-none absolute -top-14 right-0 h-64 w-64 sm:h-80 sm:w-80" />
      <div className="container-page relative">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-charcoal-400">
              <li>
                <Link to="/" className="hover:text-blue-300">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  {crumb.to && i < breadcrumbs.length - 1 ? (
                    <Link to={crumb.to} className="hover:text-blue-300">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-charcoal-200">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={
            translucentPanel
              ? 'w-full max-w-xl rounded-xl bg-white/10 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4'
              : 'max-w-2xl'
          }
        >
          {eyebrow && (
            <Badge variant={eyebrowVariant} className={translucentPanel ? 'mb-3' : 'mb-5'}>
              {eyebrow}
            </Badge>
          )}
          <h1
            className={`font-heading font-medium tracking-tight text-white ${
              translucentPanel ? 'text-lg sm:text-xl' : 'text-4xl sm:text-5xl'
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`leading-relaxed text-charcoal-200 ${
                translucentPanel ? 'mt-2 text-xs' : 'mt-5 text-lg'
              }`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
        {cornerBadge && (
          <div className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.7)] sm:bottom-6 sm:right-6">
            {cornerBadge}
          </div>
        )}
      </div>
    </section>
  )
}
