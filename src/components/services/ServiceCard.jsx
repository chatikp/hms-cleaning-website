import { ArrowRight } from 'lucide-react'
import Card from '../ui/Card'
import IconTile from '../ui/IconTile'
import Reveal from '../ui/Reveal'
import { getIcon } from '../../lib/icons'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service, index = 0, featured = false, spanClass = '', showPrice = true }) {
  const Icon = getIcon(service.icon)

  if (featured) {
    return (
      <Reveal delay={index * 0.06} className={`h-full ${spanClass}`}>
        <Card
          as={Link}
          to={`/services/${service.slug}`}
          accent={service.color}
          className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-white/40 bg-white/95 shadow-soft-lg backdrop-blur-xl transition-all duration-300 ease-premium hover:shadow-soft-xl sm:flex-row sm:items-center sm:gap-8"
        >
          <div className="flex flex-col">
            <IconTile icon={Icon} tone={service.color} size="lg" />
            <h3 className="mt-5 font-heading text-xl font-medium text-charcoal-900 sm:text-2xl">{service.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-600 sm:text-[15px]">
              {service.shortDescription}
            </p>
          </div>
          <div className="mt-6 flex flex-shrink-0 items-center gap-4 border-t border-charcoal-100 pt-4 sm:mt-0 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0">
            {showPrice && (
              <span className="text-sm font-semibold text-charcoal-800">
                {service.startingPrice > 0 ? (
                  <>
                    From <span className="text-black">${service.startingPrice}</span>
                  </>
                ) : (
                  <span className="text-black">Custom quote</span>
                )}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm font-semibold text-blue-700 transition-transform duration-200 ease-premium group-hover:translate-x-1">
              Learn more
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </Card>
      </Reveal>
    )
  }

  return (
    <Reveal delay={index * 0.06} className={`h-full ${spanClass}`}>
      <Card
        as={Link}
        to={`/services/${service.slug}`}
        accent={service.color}
        className="group flex h-full flex-col rounded-[1.75rem] border border-white/40 bg-white/95 p-7 shadow-soft-lg backdrop-blur-xl transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-soft-xl"
      >
        <IconTile icon={Icon} tone={service.color} size="lg" className="mb-6" />
        <h3 className="font-heading text-xl font-semibold text-charcoal-900">{service.title}</h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-charcoal-600">{service.shortDescription}</p>
        <div className="mt-6 flex flex-col gap-4 border-t border-charcoal-100/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {showPrice && (
            <span className="text-sm font-semibold text-charcoal-800">
              {service.startingPrice > 0 ? (
                <>
                  From <span className="text-black">${service.startingPrice}</span>
                </>
              ) : (
                <span className="text-black">Custom quote</span>
              )}
            </span>
          )}
          <span className="flex items-center gap-1 text-sm font-semibold text-blue-700 transition-transform duration-200 ease-premium group-hover:translate-x-1">
            Learn more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Reveal>
  )
}
