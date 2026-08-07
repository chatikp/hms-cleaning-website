import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react'
import Logo from './Logo'
import { services } from '../../data/services'
import { siteConfig } from '../../data/siteConfig'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-950 text-charcoal-300">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal-400">{siteConfig.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Harrell Maintenance Solutions on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-charcoal-300 transition-colors hover:bg-blue-500 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Harrell Maintenance Solutions on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-charcoal-300 transition-colors hover:bg-sand-500 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-sand-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Licensed, Bonded &amp; Insured
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-medium uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="link-underline transition-colors hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-medium uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <Link to="/about" className="link-underline transition-colors hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/gallery" className="link-underline transition-colors hover:text-white">Before &amp; After</Link>
              </li>
              <li>
                <Link to="/testimonials" className="link-underline transition-colors hover:text-white">Testimonials</Link>
              </li>
              <li>
                <Link to="/blog" className="link-underline transition-colors hover:text-white">Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="link-underline transition-colors hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/booking" className="link-underline transition-colors hover:text-white">Book Online</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-medium uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" aria-hidden="true" />
                <span>{siteConfig.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" aria-hidden="true" />
                <a href={siteConfig.phoneHref} className="hover:text-white">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white break-all">{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" aria-hidden="true" />
                <span>
                  {siteConfig.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-charcoal-500 sm:flex-row">
          <p>© {year} Harrell Maintenance Solutions LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-charcoal-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-charcoal-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
