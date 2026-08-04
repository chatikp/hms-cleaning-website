import { HeartHandshake, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Card from '../components/ui/Card'
import IconTile from '../components/ui/IconTile'
import StatCounter from '../components/ui/StatCounter'
import CtaBanner from '../components/home/CtaBanner'
import { siteConfig } from '../data/siteConfig'
import aboutHeroImage from '../assets/images/about-keys-handoff-porch.webp'

const values = [
  {
    icon: Sparkles,
    title: 'Detail-obsessed',
    description: 'We built a 40-point checklist so nothing, not a baseboard, not a light switch, gets overlooked.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust, verified',
    description: 'Every team member is background checked, and every visit is backed by our satisfaction guarantee.',
  },
  {
    icon: Leaf,
    title: 'Eco-conscious',
    description: 'Low tox, plant based products are our default, safer for your family, pets, and the planet.',
  },
  {
    icon: HeartHandshake,
    title: 'People-first',
    description: 'We invest in fair pay and ongoing training for our team, because happy cleaners do better work.',
  },
]

const team = [
  { name: 'Shoantah Harrell', role: 'Founder & CEO' },
  { name: 'Chaney Harrell', role: 'Founder & COO' },
  { name: 'Armand Harrell', role: 'Commercial Accounts Lead' },
  { name: 'Jordan Pierce', role: 'Quality Assurance Manager' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Harrell Maintenance Solution, a Cleveland based cleaning company built on trust, detail, and eco conscious care since 2014."
        path="/about"
      />

      <PageHero
        eyebrow="About HMS"
        title="What a decade of cleaning has taught us"
        subtitle={`Since ${siteConfig.founded}, we've learned that real cleanliness comes from discipline and attention to detail, not shortcuts. That's the standard Harrell Maintenance Solution has carried into every Cleveland home and business we've served.`}
        breadcrumbs={[{ label: 'About' }]}
        translucentPanel
        image={aboutHeroImage}
        blur
      />

      <Section bg="white">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <img
              src="/images/about-our-story.jpg"
              alt="An HMS cleaning technician wiping down glass office panels"
              className="aspect-[4/3] w-full rounded-none object-cover shadow-soft-xl"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl font-medium text-white">Our story</h2>
            <p className="mt-5 leading-relaxed text-charcoal-300">
              Harrell Maintenance Solution started with a simple frustration: too many cleaning services treated
              detail as optional. Our founder, Shoantah Harrell, set out to build a company where every visit met a
              hotel grade standard, whether it was a studio apartment or a multi floor office.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal-300">
              Over a decade later, that standard hasn&rsquo;t changed. We&rsquo;ve grown into a team of vetted,
              trained professionals serving hundreds of homes and businesses across Cleveland, but the checklist,
              and the care behind it, is the same one we started with.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {siteConfig.stats.slice(0, 2).map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bg="cream">
        <SectionHeading eyebrow="What we stand for" title="The values behind every clean" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <Card className="h-full">
                <IconTile icon={value.icon} tone={i % 2 === 0 ? 'blue' : 'sand'} size="lg" />
                <h3 className="mt-5 font-heading text-base font-medium text-charcoal-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{value.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the team behind HMS"
          titleClassName="font-helvetica font-thin"
        />
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-20 gap-y-12">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08} className="text-center">
              <p className="font-helvetica text-2xl font-thin leading-none text-white sm:text-3xl">
                {member.name}
              </p>
              <span className="mx-auto mt-3 block h-px w-10 bg-gradient-to-r from-transparent via-sand-300/60 to-transparent" />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-charcoal-400">
                {member.role}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
