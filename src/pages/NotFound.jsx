import { Home, Sparkles } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import PlaceholderImage from '../components/ui/PlaceholderImage'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" noindex />

      <Section bg="cream" className="flex min-h-[70vh] items-center">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <PlaceholderImage
            icon={Sparkles}
            tone="mixed"
            className="mb-8 h-28 w-28 rounded-none"
            iconClassName="h-10 w-10"
          />
          <h1 className="font-heading text-4xl font-medium text-white">404</h1>
          <p className="mt-3 text-lg font-semibold text-charcoal-100">This page got swept away.</p>
          <p className="mt-2 text-charcoal-300">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on track.
          </p>
          <Button to="/" variant="primary" size="lg" icon={Home} className="mt-8">
            Back to Home
          </Button>
        </div>
      </Section>
    </>
  )
}
