import Seo from '../components/seo/Seo'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import StarRating from '../components/ui/StarRating'
import CtaBanner from '../components/home/CtaBanner'
import TestimonialCard from '../components/testimonials/TestimonialCard'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Customer Testimonials & Reviews"
        description="Read verified reviews from Harrell Maintenance Solution customers across Cleveland — residential, commercial, deep cleaning, and more."
        path="/testimonials"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Harrell Maintenance Solution Cleaning Services',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '107',
          },
        }}
      />

      <Section bg="cream" className="pt-16 sm:pt-20">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="font-script text-3xl text-blue-200/80">Loved, every visit</span>
          <h1 className="mt-2 font-heading text-3xl font-medium text-white sm:text-4xl">
            What our clients are saying
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal-300">
            We measure success one spotless space — and one honest review — at a time.
          </p>

          <div className="mt-8 flex flex-col items-center rounded-[2rem] border border-white/15 bg-white/[0.06] px-10 py-8 shadow-glow-blue backdrop-blur-md">
            <span className="font-heading text-5xl font-medium text-white">4.9</span>
            <StarRating rating={5} size={20} className="mt-3" />
            <p className="mt-2 text-sm text-charcoal-400">Average rating from 107+ verified reviews</p>
          </div>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={(i % 3) * 0.08} className="h-full">
              <div className="relative h-full">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-white/10 bg-white/[0.02]"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border border-white/10 bg-white/[0.035]"
                  aria-hidden="true"
                />
                <TestimonialCard testimonial={testimonial} className="relative h-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
