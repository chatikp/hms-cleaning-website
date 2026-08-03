import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/FormField'
import { contactSchema } from '../lib/schemas'
import { supabase } from '../lib/supabaseClient'
import { siteConfig } from '../data/siteConfig'
import contactHeroImage from '../assets/images/contact-customer-service.webp'

const infoTiles = [
  { icon: MapPin, tone: 'blue', label: 'Address' },
  { icon: Phone, tone: 'sand', label: 'Phone' },
  { icon: Mail, tone: 'blue', label: 'Email' },
  { icon: Clock, tone: 'sand', label: 'Hours' },
]

const tileTone = {
  blue: 'border-blue-400/20 bg-blue-500/15 text-blue-200',
  sand: 'border-sand-400/20 bg-sand-500/15 text-sand-200',
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (formData) => {
    const { error } = await supabase.from('leads').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
    ])
    if (error) {
      console.error('Error submitting contact form:', error)
      return
    }
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Harrell Maintenance Solution. Call, email, or send a message, and we typically respond within one business day."
        path="/contact"
      />

      <PageHero
        eyebrow="Contact"
        eyebrowVariant="sand"
        title="We'd love to hear from you"
        subtitle="Questions about a quote, an existing booking, or a commercial contract? Reach out any way that's convenient."
        breadcrumbs={[{ label: 'Contact' }]}
        image={contactHeroImage}
      />

      <Section bg="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal className="space-y-5">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-6 shadow-glow-blue backdrop-blur-md transition-transform duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-blue-400/70 before:content-[''] hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${tileTone.blue}`}>
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Address</p>
                    <p className="mt-1 text-sm text-charcoal-200">{siteConfig.address.full}</p>
                    <p className="mt-1 text-xs text-charcoal-400">{siteConfig.serviceArea}</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-6 shadow-glow-sand backdrop-blur-md transition-transform duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-sand-400/70 before:content-[''] hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${tileTone.sand}`}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Phone</p>
                    <a href={siteConfig.phoneHref} className="mt-1 block text-sm text-charcoal-200 hover:text-blue-300">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-6 shadow-glow-blue backdrop-blur-md transition-transform duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-blue-400/70 before:content-[''] hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${tileTone.blue}`}>
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="mt-1 block break-all text-sm text-charcoal-200 hover:text-blue-300">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-6 shadow-glow-sand backdrop-blur-md transition-transform duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-sand-400/70 before:content-[''] hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${tileTone.sand}`}>
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Hours</p>
                    {siteConfig.hours.map((h) => (
                      <p key={h.days} className="mt-1 text-sm text-charcoal-200">
                        {h.days}: {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <Reveal>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/95 py-16 text-center shadow-glow-sand backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-sand-400 before:via-sand-300 before:to-blue-400 before:content-[''] flex flex-col items-center">
                  <CheckCircle2 className="h-14 w-14 text-sand-600" aria-hidden="true" />
                  <h2 className="mt-5 font-heading text-2xl font-medium text-charcoal-900">Message sent!</h2>
                  <p className="mt-3 max-w-md text-charcoal-600">
                    Thanks for reaching out. Our team will get back to you within one business day.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/95 p-8 shadow-glow-sand backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-sand-400 before:via-sand-300 before:to-blue-400 before:content-['']">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <Input id="name" label="Full name" required {...register('name')} error={errors.name?.message} />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input id="email" type="email" label="Email address" required {...register('email')} error={errors.email?.message} />
                      <Input id="phone" type="tel" label="Phone (optional)" {...register('phone')} error={errors.phone?.message} />
                    </div>
                    <Input id="subject" label="Subject" required {...register('subject')} error={errors.subject?.message} />
                    <Textarea id="message" label="Message" required rows={6} {...register('message')} error={errors.message?.message} />
                    <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </form>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <Section bg="cream" className="pt-0">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-sand-400/15 shadow-soft-xl">
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-sand-400/30 bg-charcoal-900/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sand-200 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm">
            Find us
          </div>
          <iframe
            title="Harrell Maintenance Solution location map"
            src={siteConfig.mapEmbedSrc}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[420px] w-full sm:h-[520px] lg:h-[600px]"
          />
        </Reveal>
      </Section>
    </>
  )
}
