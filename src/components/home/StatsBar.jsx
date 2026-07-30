import StatCounter from '../ui/StatCounter'
import { siteConfig } from '../../data/siteConfig'

export default function StatsBar() {
  return (
    <section className="border-y border-charcoal-800 bg-cream py-14">
      <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
        {siteConfig.stats.map((stat) => (
          <StatCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            decimals={stat.value % 1 !== 0 ? 1 : 0}
          />
        ))}
      </div>
    </section>
  )
}
