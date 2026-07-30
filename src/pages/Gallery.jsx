import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import CtaBanner from '../components/home/CtaBanner'
import CornerFrame from '../components/ui/CornerFrame'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import { galleryCategories, galleryItems } from '../data/gallery'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(
    () => (activeCategory === 'All' ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)),
    [activeCategory]
  )

  return (
    <>
      <Seo
        title="Before & After Gallery"
        description="See real before-and-after transformations from HMS cleaning projects across kitchens, bathrooms, living rooms, carpets, and offices."
        path="/gallery"
      />

      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.65fr] items-start">
          <div className="space-y-8">
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
                <li className="font-semibold text-white">Gallery</li>
              </ol>
            </nav>
            <SectionHeading
              align="left"
              title="The evidence of good work speaks for itself"
              subtitle="Years in this business taught us one thing: results convince more than words ever could. Every image here is a real before-and-after from real work — no staging, no filters, just the difference attentive cleaning makes."
              className="mx-0 items-start text-left"
            />
            <div className="rounded-[2rem] border border-white/10 bg-white p-6 shadow-soft-lg">
              <p className="text-sm uppercase tracking-[0.28em] text-charcoal-500">Our promise</p>
              <h2 className="mt-4 text-2xl font-semibold text-charcoal-900">The HMS difference</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal-600">Every project is presented with care, clarity, and the attention to detail that defines our team’s premium cleaning experience.</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-blue-950/10 p-8 shadow-soft-lg">
            <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Showcase</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Built for high-end spaces</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">Each image is presented with a clean frame and gentle tonal accents, creating a serene gallery experience that reflects the premium detail of HMS service.</p>
          </div>
        </div>
      </Section>

      <Section bg="cream">
        <div className="grid gap-10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white border border-white/25">
              Gallery
            </span>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-charcoal-200">
              Browse polished transformation stories and discover how our premium cleaning process elevates each space.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-charcoal-950/10 p-8 shadow-soft-lg">
            <div className="grid gap-6">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Curated gallery</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">A refined presentation for every space</h3>
                </div>
                <p className="text-sm text-charcoal-300 lg:max-w-sm">
                  This gallery blends luxe composition, premium spacing, and soft tonal accents to present each before-and-after story as a polished showcase.
                </p>
              </div>

              <div role="tablist" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
                {galleryCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white shadow-glow-blue'
                        : 'bg-white/5 text-charcoal-200 hover:bg-blue-500/15 hover:text-blue-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-charcoal-950/5 p-8 shadow-soft-lg">
            <div className="mt-6 grid grid-cols-1 gap-8 auto-rows-[28rem] sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, 10).map((item, index) => (
                <Reveal key={item.id} delay={(index % 3) * 0.06} className="h-full">
                  <div className="group flex h-full flex-col">
                    <CornerFrame tone="white" className="min-h-0 flex-1">
                      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-soft-lg ring-1 ring-white/10">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <PlaceholderImage
                            icon={Sparkles}
                            tone="mixed"
                            label={item.title}
                            alt={item.title}
                            className="h-full w-full"
                            iconClassName="h-12 w-12"
                          />
                        )}
                      </div>
                    </CornerFrame>
                    <div className="mt-3">
                      <p className="font-heading text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-charcoal-400">{item.service}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-10 text-center text-charcoal-400">No projects found in this category yet.</p>
            )}
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
