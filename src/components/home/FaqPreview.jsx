import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Accordion from '../ui/Accordion'
import { faqCategories } from '../../data/faq'

const previewItems = [
  faqCategories[0].items[0],
  faqCategories[1].items[0],
  faqCategories[2].items[0],
  faqCategories[3].items[0],
]

export default function FaqPreview() {
  return (
    <Section bg="cream">
      <SectionHeading eyebrow="FAQ" title="Quick answers" subtitle="A few of the questions we hear most. See the full list for everything else." />
      <div className="mx-auto mt-8 max-w-2xl">
        <Accordion items={previewItems} />
        <Reveal className="mt-8 flex justify-center">
          <Button to="/faq" variant="outline" icon={ArrowRight}>
            View All FAQs
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
