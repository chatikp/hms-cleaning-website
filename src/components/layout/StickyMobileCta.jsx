import { Phone, CalendarCheck } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'
import Button from '../ui/Button'

export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-charcoal-100 bg-white p-3 shadow-soft-xl lg:hidden">
      <Button href={siteConfig.phoneHref} variant="outline-charcoal" size="md" icon={Phone} className="flex-1">
        Call
      </Button>
      <Button to="/booking" variant="primary" size="md" icon={CalendarCheck} className="flex-1">
        Book Now
      </Button>
    </div>
  )
}
