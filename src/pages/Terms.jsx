import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import { siteConfig } from '../data/siteConfig'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Review the terms of service for booking and using Harrell Maintenance Solution's cleaning services."
        path="/terms-of-service"
        noindex
      />

      <PageHero eyebrow="Legal" title="Terms of Service" breadcrumbs={[{ label: 'Terms of Service' }]} />

      <Section bg="white">
        <div className="prose prose-invert mx-auto max-w-3xl prose-headings:font-heading">
          <p className="text-sm text-charcoal-400">Last updated: June 1, 2026</p>

          <h2>Booking &amp; scheduling</h2>
          <p>
            Bookings made through our website or by phone are confirmed once you receive a confirmation email or
            call from our team. We ask that access to your property be available at the scheduled arrival window.
          </p>

          <h2>Cancellations &amp; rescheduling</h2>
          <p>
            Cancellations or reschedules made at least 24 hours before your scheduled appointment carry no fee.
            Cancellations within 24 hours of the appointment may incur a fee to cover crew scheduling costs.
          </p>

          <h2>Satisfaction guarantee</h2>
          <p>
            If any part of your service does not meet expectations, contact us within 24 hours of your appointment
            and we will return to address the issue at no additional cost, subject to a reasonable inspection.
          </p>

          <h2>Payment</h2>
          <p>
            Payment is due at the time of service unless otherwise agreed in a commercial service contract.
            Recurring plans are billed automatically following each completed visit.
          </p>

          <h2>Liability</h2>
          <p>
            Harrell Maintenance Solution is licensed, bonded, and insured. Please notify our team in advance of
            any fragile, high value, or irreplaceable items so we can take appropriate care.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our services after changes are posted
            constitutes acceptance of the updated terms.
          </p>

          <h2>Contact us</h2>
          <p>Questions about these terms? Reach us at {siteConfig.email} or {siteConfig.phone}.</p>
        </div>
      </Section>
    </>
  )
}
