import SectionHeading from '../ui/SectionHeading'
import TestimonialCarousel from '../testimonials/TestimonialCarousel'
import { testimonials } from '../../data/testimonials'

export default function ReviewsGlass() {
  const featured = testimonials.slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-sand-500/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Real reviews"
          title="What Cleveland says about us"
          subtitle="107+ five star reviews from homeowners and businesses who trust HMS with their space."
        />

        <div className="mt-12">
          <TestimonialCarousel testimonials={featured} autoPlay={false} />
        </div>
      </div>
    </section>
  )
}
