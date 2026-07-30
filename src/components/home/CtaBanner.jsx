import { ArrowRight, CalendarCheck } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import BrandMotif from '../ui/BrandMotif'
import { siteConfig } from '../../data/siteConfig'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-14 sm:py-16">
      <BrandMotif light className="pointer-events-none absolute -top-16 left-1/2 h-80 w-80 -translate-x-1/2 opacity-80" />
      <Reveal className="container-page relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Ready for a home that feels <span className="font-accent italic font-normal text-blue-300">effortlessly clean</span>?
        </h2>
        <p className="mt-4 max-w-xl text-lg text-charcoal-300">
          Join thousands of Cleveland homes and businesses who trust HMS for a spotless space, every time.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button to="/booking" size="lg" variant="primary" icon={CalendarCheck}>
            Book a Cleaning
          </Button>
          <Button href={siteConfig.phoneHref} size="lg" variant="ghost-light" icon={ArrowRight}>
            Call {siteConfig.phone}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
