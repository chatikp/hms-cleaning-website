import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import StepsStack from './StepsStack'
import stepBookOnline from '../../assets/images/step-book-online.webp'
import stepConfirmation from '../../assets/images/step-confirmation.webp'
import stepCleaning from '../../assets/images/step-cleaning-in-progress.webp'
import stepResults from '../../assets/images/step-spotless-results.webp'
import serviceResidential from '../../assets/images/service-residential-vacuum.webp'
import serviceCommercial from '../../assets/images/service-commercial-mopping.webp'
import serviceDeep from '../../assets/images/service-deep-grout-scrub.webp'
import serviceMoveOut from '../../assets/images/service-move-out-cabinet.webp'
import serviceWindow from '../../assets/images/service-window-squeegee.webp'

const steps = [
  {
    title: 'Book online',
    summary: 'Pick your service, home size, and a time slot that fits your schedule — takes under 2 minutes.',
    href: '/booking',
    image: stepBookOnline,
  },
  {
    title: 'We confirm details',
    summary: 'You will get a confirmation with your assigned team and a reminder before arrival.',
    href: '/faq',
    image: stepConfirmation,
  },
  {
    title: 'We clean, you relax',
    summary: 'Our vetted, insured team works through a detail-first checklist tailored to your space.',
    href: '/services',
    image: stepCleaning,
  },
  {
    title: 'Guaranteed results',
    summary: 'Not fully satisfied? Tell us within 24 hours and we will make it right, free of charge.',
    href: '/testimonials',
    image: stepResults,
  },
]

const serviceSteps = [
  {
    title: 'Residential Cleaning',
    summary: 'A detail-first checklist covering every room, from baseboards to light fixtures, so your home feels genuinely cared for.',
    href: '/services/residential-cleaning',
    image: serviceResidential,
  },
  {
    title: 'Commercial Cleaning',
    summary: 'A custom janitorial schedule built around your business hours, from reception areas to restrooms and floor care.',
    href: '/services/commercial-cleaning',
    image: serviceCommercial,
  },
  {
    title: 'Deep Cleaning',
    summary: 'An intensive top-to-bottom pass — baseboards, behind appliances, grout, and vents — for a true reset.',
    href: '/services/deep-cleaning',
    image: serviceDeep,
  },
  {
    title: 'Move-In / Move-Out Cleaning',
    summary: 'Inspection-grade cleaning of empty cabinets, appliances, and every surface to protect deposits and welcome new owners.',
    href: '/services/move-in-move-out-cleaning',
    image: serviceMoveOut,
  },
  {
    title: 'Window Cleaning',
    summary: 'Glass, tracks, screens, and sills cleaned with a purified water system for a streak-free finish.',
    href: '/services/window-cleaning',
    image: serviceWindow,
  },
]

export default function HowItWorks() {
  return (
    <Section bg="cream">
      <SectionHeading
        eyebrow="How It Works"
        title="A simple, seamless process"
        subtitle="From your first booking to a spotless finish — here's exactly what to expect, and exactly what we do."
      />

      <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
        <Reveal delay={0.15} className="flex flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200">
            The Process
          </span>
          <StepsStack steps={steps} />
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-charcoal-400">
            Hover or drag a card to see the next step
          </p>
        </Reveal>

        <Reveal delay={0.25} className="flex flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-sand-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sand-200">
            What We Do
          </span>
          <StepsStack steps={serviceSteps} />
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-charcoal-400">
            Hover or drag a card to see each service
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
