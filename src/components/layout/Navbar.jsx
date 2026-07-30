import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import Button from '../ui/Button'
import { navLinks } from './navLinks'
import { siteConfig } from '../../data/siteConfig'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-premium ${
        scrolled ? 'bg-cream/90 shadow-soft backdrop-blur-md' : 'bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav className="container-page flex h-20 items-center justify-between" aria-label="Primary">
        <Logo light />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.to}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold text-charcoal-100 transition-colors hover:bg-white/10 hover:text-white"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full grid w-[560px] -translate-x-1/2 grid-cols-2 gap-1 rounded-none border border-charcoal-100 bg-white p-3 shadow-soft-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="rounded-none px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        className="col-span-2 mt-1 rounded-none border-t border-charcoal-100 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        View all services →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'text-charcoal-100 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button to="/quote" size="md" variant="outline">
            Get a Quote
          </Button>
          <Button to="/booking" size="md" variant="primary">
            Book Now
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-cream lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => !link.children && setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-semibold ${
                        isActive ? 'bg-white/10 text-white' : 'text-charcoal-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {link.children && (
                    <div className="ml-4 flex flex-col gap-1 border-l border-white/10 pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-300 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-4">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 px-4 text-sm font-semibold text-charcoal-100"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <div className="flex gap-3 px-4">
                  <Button to="/quote" variant="outline" className="flex-1" onClick={() => setMobileOpen(false)}>
                    Get a Quote
                  </Button>
                  <Button to="/booking" variant="primary" className="flex-1" onClick={() => setMobileOpen(false)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
