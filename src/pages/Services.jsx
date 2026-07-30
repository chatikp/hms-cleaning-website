import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/services/ServiceCard'
import CtaBanner from '../components/home/CtaBanner'
import Reveal from '../components/ui/Reveal'
import { services } from '../data/services'
import servicesHeroImage from '../assets/images/services-vacuum-cleaning.webp'

export default function Services() {
  return (
    <>
      <Seo
        title="Cleaning Services"
        description="Explore HMS's full range of residential and commercial cleaning services — recurring home cleaning, deep cleaning, move-in/move-out, carpet care, window cleaning, and more."
        path="/services"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.title,
            url: `https://www.harrellmaintenancesolution.com/services/${s.slug}`,
          })),
        }}
      />

      <section
        style={{
          backgroundImage: `linear-gradient(rgba(11, 22, 33, 0.72), rgba(11, 22, 33, 0.72)), url(${servicesHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="relative overflow-hidden pb-14 pt-14 sm:pb-16 sm:pt-16 lg:pt-20"
      >
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.75)]">
                  All services
                </div>
                <nav
                  aria-label="Breadcrumb"
                  className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/90 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.75)]"
                >
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link to="/" className="hover:text-blue-200 text-white">
                        Home
                      </Link>
                    </li>
                    <li className="text-white/60">/</li>
                    <li className="font-semibold text-white">Services</li>
                  </ol>
                </nav>
              </div>
              <SectionHeading
                align="left"
                light={true}
                title="All services"
                subtitle="Professional cleaning solutions for homes, businesses, and move-in/move-out transitions — built on transparent pricing, vetted teams, and consistent results."
                className="mx-0 items-start text-left"
              />
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-soft-lg backdrop-blur-md">
              <p className="text-sm leading-7 text-white/80">
                Choose the service that fits your space and schedule. Each package is designed to deliver reliable results, thoughtful attention to detail, and a cleaner environment your family or team can trust.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/65">
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
                  Fully insured teams with background-checked professionals.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-sand-300" />
                  Eco-conscious supplies and quality checks built into every visit.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
                  Flexible services for homes, offices, and post-move cleanups.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section bg="white" className="pt-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
          <Reveal delay={services.length * 0.06} className="h-full sm:col-span-2 lg:col-span-3">
            <div className="flex h-full flex-col justify-center rounded-[1.75rem] border border-white/15 bg-blue-950/40 p-7 shadow-soft-lg backdrop-blur-md">
              <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                Cleaning services built around your space
              </h3>
              <p className="mt-4 text-sm leading-7 text-charcoal-200">
                Whether it&rsquo;s a weekly home refresh or a full commercial contract, every HMS service includes vetted
                teams, eco-conscious supplies, and our satisfaction guarantee.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
