import { ArrowRight } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Hero from '../components/home/Hero'
import ReviewsGlass from '../components/home/ReviewsGlass'
import HowItWorks from '../components/home/HowItWorks'
import CtaBanner from '../components/home/CtaBanner'
// StatementBand removed; replacing with a Did-you-know FactStrip
import ServiceAreas from '../components/home/ServiceAreas'
import FactStrip from '../components/home/FactStrip'
import SeamBadge from '../components/ui/SeamBadge'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import ServiceCard from '../components/services/ServiceCard'
import TestimonialStrip from '../components/testimonials/TestimonialStrip'
import FaqPreview from '../components/home/FaqPreview'
import BeforeAfterSlider from '../components/gallery/BeforeAfterSlider'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import { galleryItems } from '../data/gallery'
import { siteConfig } from '../data/siteConfig'
import { facts } from '../data/facts'

export default function Home() {
  const featuredServices = services.slice(0, 5)
  const featuredGallery = galleryItems.slice(0, 3)

  return (
    <>
      <Seo
        title="Premium Residential & Commercial Cleaning in Cleveland, OH"
        description={siteConfig.description}
        path="/"
      />

      <Hero />

      <HowItWorks />

      <Section bg="cream">
        <SectionHeading
          eyebrow="Our services"
          title="A cleaning plan for every space"
          subtitle="From weekly home upkeep to full commercial janitorial contracts — choose the service that fits."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) =>
            i === 0 ? (
              <ServiceCard key={service.slug} service={service} index={i} featured spanClass="sm:col-span-2" showPrice={false} />
            ) : (
              <ServiceCard key={service.slug} service={service} index={i} showPrice={false} />
            )
          )}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button to="/services" variant="outline" size="lg" icon={ArrowRight}>
            View All Services
          </Button>
        </Reveal>
      </Section>

      <SeamBadge ringClassName="border-charcoal-950" />
      <FactStrip fact={facts[0]} />

      <ReviewsGlass />

      <FactStrip fact={facts[2]} />

      <Section bg="white">
        <SectionHeading
          eyebrow="Real results"
          title="See the HMS difference"
          subtitle="Drag the slider to compare — real transformations from real projects."
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGallery.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <BeforeAfterSlider title={item.title} service={item.service} image={item.image} beforeImage={item.beforeImage} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button to="/gallery" variant="outline" size="lg" icon={ArrowRight}>
            View Full Gallery
          </Button>
        </Reveal>
      </Section>

      <FaqPreview />

      <TestimonialStrip testimonials={testimonials} />

      <ServiceAreas />

      <CtaBanner />
    </>
  )
}
