import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

const neighborhoods = [
  'Beachwood',
  'Bedford',
  'Cleveland',
  'Cleveland Heights',
  'Garfield Heights',
  'Lakewood',
  'Maple Heights',
  'Parma',
  'Rocky River',
  'Shaker Heights',
  'South Euclid',
  'University Heights',
]

export default function ServiceAreas() {
  return (
    <section className="border-y border-charcoal-800 bg-cream py-10 sm:py-12">
      <Reveal className="container-page">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading text-base font-medium text-white">Proudly serving Cleveland, OH</p>
              <p className="text-sm text-charcoal-400">and neighborhoods within a 20-mile radius</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            {neighborhoods.map((n) => (
              <Link
                key={n}
                to="/quote"
                className="rounded-full border border-charcoal-700 px-3.5 py-1.5 text-xs font-medium text-charcoal-300 transition-colors hover:border-blue-400 hover:text-blue-300"
              >
                {n}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
