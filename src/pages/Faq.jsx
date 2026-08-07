import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Accordion from '../components/ui/Accordion'
import CtaBanner from '../components/home/CtaBanner'
import { faqCategories } from '../data/faq'
import faqHeroImage from '../assets/images/faq-mirror-cleaning.webp'

export default function Faq() {
  const [query, setQuery] = useState('')

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return faqCategories
    const q = query.toLowerCase()
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [query])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  }

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about booking, pricing, guarantees, and what to expect from Harrell Maintenance Solutions' cleaning services."
        path="/faq"
        jsonLd={jsonLd}
      />

      <PageHero
        eyebrow="FAQ"
        title="Questions? We've got answers."
        subtitle="Can't find what you're looking for? Reach out and our team will get back to you within one business day."
        breadcrumbs={[{ label: 'FAQ' }]}
        image={faqHeroImage}
      />

      <Section bg="white">
        <Reveal className="mx-auto mb-14 max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-400" aria-hidden="true" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-full border border-charcoal-200 bg-white py-3.5 pl-12 pr-5 text-[15px] text-charcoal-900 placeholder:text-charcoal-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-14">
          {filteredCategories.map((category) => (
            <Reveal key={category.category}>
              <h2 className="font-heading text-xl font-medium text-white">{category.category}</h2>
              <div className="mt-2">
                <Accordion items={category.items} />
              </div>
            </Reveal>
          ))}

          {filteredCategories.length === 0 && (
            <p className="text-center text-charcoal-300">No results for “{query}”. Try a different search term.</p>
          )}
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
