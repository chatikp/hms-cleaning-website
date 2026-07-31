import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import { siteConfig } from '../data/siteConfig'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the Harrell Maintenance Solution privacy policy to understand how we collect, use, and protect your information."
        path="/privacy-policy"
        noindex
      />

      <PageHero eyebrow="Legal" title="Privacy Policy" breadcrumbs={[{ label: 'Privacy Policy' }]} />

      <Section bg="white">
        <div className="prose prose-invert mx-auto max-w-3xl prose-headings:font-heading">
          <p className="text-sm text-charcoal-400">Last updated: June 1, 2026</p>

          <h2>Information we collect</h2>
          <p>
            When you request a quote, book a service, or contact us, we collect information such as your name,
            email address, phone number, service address, and details about the service you&rsquo;re requesting. We
            also collect basic usage data (such as pages visited) to improve our website.
          </p>

          <h2>How we use your information</h2>
          <p>
            We use your information to provide quotes, schedule and deliver cleaning services, communicate with
            you about your appointments, and, with your consent, send occasional updates about our services.
            We do not sell your personal information to third parties.
          </p>

          <h2>Data sharing</h2>
          <p>
            We may share information with trusted service providers who help us operate our business (such as
            scheduling or payment processing tools), under confidentiality obligations. We may also disclose
            information if required by law.
          </p>

          <h2>Data security</h2>
          <p>
            We use reasonable administrative, technical, and physical safeguards to protect your information.
            No method of transmission over the internet is 100% secure, but we work to protect your data at every
            step.
          </p>

          <h2>Your choices</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at any time by
            contacting us at {siteConfig.email}. You may also opt out of marketing communications at any point.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this policy, contact us at {siteConfig.email} or {siteConfig.phone}.
          </p>
        </div>
      </Section>
    </>
  )
}
