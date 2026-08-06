import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, Navigate } from 'react-router-dom'
import {
  Building2,
  CheckCircle2,
  Clock,
  Home as HomeIcon,
  PlusCircle,
  Sparkles,
  Tag,
} from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { Input, Select, Textarea, Checkbox } from '../components/ui/FormField'
import ServiceCard from '../components/services/ServiceCard'
import { getServiceBySlug, services } from '../data/services'
import { quoteSchema } from '../lib/schemas'
import { supabase } from '../lib/supabaseClient'
import { getIcon } from '../lib/icons'
import heroResidential from '../assets/images/service-hero-residential.webp'
import heroCommercial from '../assets/images/service-hero-commercial.webp'
import heroDeep from '../assets/images/service-hero-deep.webp'
import heroMoveOut from '../assets/images/service-hero-move-out.webp'
import heroWindow from '../assets/images/service-hero-window.webp'
import heroAirbnb from '../assets/images/service-hero-airbnb.webp'
import heroHomeReset from '../assets/images/service-hero-home-reset.webp'
import heroCleanAir from '../assets/images/service-hero-clean-air.webp'
import heroHomeCareCheck from '../assets/images/service-hero-home-care-check.webp'

const heroImages = {
  'residential-cleaning': heroResidential,
  'commercial-cleaning': heroCommercial,
  'deep-cleaning': heroDeep,
  'move-in-move-out-cleaning': heroMoveOut,
  'window-cleaning': heroWindow,
  'airbnb-cleaning': heroAirbnb,
  'home-reset': heroHomeReset,
  'clean-air-refresh': heroCleanAir,
  'home-care-check': heroHomeCareCheck,
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      propertyType: service?.slug === 'commercial-cleaning' ? 'commercial' : 'residential',
      serviceSlug: service?.slug ?? '',
      bedrooms: '2',
      bathrooms: '2',
      squareFeet: '1500',
      frequency: 'biweekly',
      addOns: [],
      address: '',
      message: '',
      consent: false,
    },
  })

  const watched = watch()

  if (!service) return <Navigate to="/services" replace />

  const onSubmit = async (formData) => {
    const { error } = await supabase.from('quotes').insert([
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        property_type: formData.propertyType,
        service_slug: formData.serviceSlug,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        square_feet: formData.squareFeet,
        add_ons: formData.addOns,
        frequency: formData.frequency,
        address: formData.address,
        message: formData.message,
      },
    ])
    if (error) {
      console.error('Error submitting quote form:', error)
      return
    }
    setSubmitted(true)
  }

  const Icon = getIcon(service.icon)
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={service.title}
        description={service.description}
        path={`/services/${service.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: service.title,
          provider: { '@type': 'HousekeepingService', name: 'Harrell Maintenance Solution' },
          areaServed: 'Cleveland, OH',
          description: service.description,
        }}
      />

      <PageHero
        eyebrow="Services"
        title={service.title}
        breadcrumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
        image={heroImages[service.slug]}
      />

      <Section bg="white">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="rounded-none border border-sand-400/25 bg-gradient-to-br from-blue-950/60 via-charcoal-950/55 to-charcoal-900/45 p-8 shadow-glow-sand ring-1 ring-white/10 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">Request a quote</p>
                <h2 className="mt-4 font-heading text-3xl font-medium text-white">Get your {service.title} quote</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-400">{service.description}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-400">
                  Fill out the form below and we’ll confirm your exact quote within one business day.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-8">
              <Card hover={false}>
                {submitted ? (
                  <div className="space-y-8">
                    <div className="text-center">
                      <CheckCircle2 className="mx-auto h-14 w-14 text-sand-600" aria-hidden="true" />
                      <h2 className="mt-5 font-heading text-2xl font-medium text-charcoal-900">Quote request received!</h2>
                      <p className="mt-3 max-w-xl text-charcoal-600">
                        Thanks for sharing your details. A member of our team will confirm your exact quote by email or phone within one business day.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button to="/booking" variant="primary" size="lg" className="w-full">
                        Book a Cleaning
                      </Button>
                      <Button to="/" variant="outline-charcoal" size="lg" className="w-full">
                        Back to Home
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
                    <input type="hidden" value={service.slug} {...register('serviceSlug')} />

                    <fieldset>
                      <legend className="mb-3 text-sm font-semibold text-charcoal-800">Property type</legend>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'residential', label: 'Residential', icon: HomeIcon },
                          { value: 'commercial', label: 'Commercial', icon: Building2 },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-center gap-3 rounded-none border-2 p-4 transition-colors ${
                              watched.propertyType === option.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-charcoal-200 hover:border-blue-300'
                            }`}
                          >
                            <input type="radio" value={option.value} {...register('propertyType')} className="sr-only" />
                            <option.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                            <span className="text-sm font-semibold text-charcoal-800">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.propertyType && <p className="mt-2 text-xs font-medium text-red-600">{errors.propertyType.message}</p>}
                    </fieldset>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input id="firstName" label="First name" required {...register('firstName')} error={errors.firstName?.message} />
                      <Input id="lastName" label="Last name" required {...register('lastName')} error={errors.lastName?.message} />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input id="email" type="email" label="Email address" required {...register('email')} error={errors.email?.message} />
                      <Input id="phone" type="tel" label="Phone number" required {...register('phone')} error={errors.phone?.message} />
                    </div>

                    {watched.propertyType === 'commercial' ? (
                      <Input
                        id="squareFeet"
                        type="number"
                        min="0"
                        label="Approximate square footage"
                        {...register('squareFeet')}
                      />
                    ) : (
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Select id="bedrooms" label="Bedrooms" {...register('bedrooms')}>
                          {['Studio', '1', '2', '3', '4', '5+'].map((n) => (
                            <option key={n} value={n === 'Studio' ? '0' : n}>
                              {n}
                            </option>
                          ))}
                        </Select>
                        <Select id="bathrooms" label="Bathrooms" {...register('bathrooms')}>
                          {['1', '1.5', '2', '2.5', '3', '4+'].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}

                    <Select id="frequency" label="Cleaning frequency" required {...register('frequency')} error={errors.frequency?.message}>
                      <option value="one-time">One-time</option>
                      <option value="weekly">Weekly (save 20%)</option>
                      <option value="biweekly">Biweekly (save 15%)</option>
                      <option value="monthly">Monthly (save 10%)</option>
                    </Select>

                    <Input id="address" label="Service address" required placeholder="Street address, city" {...register('address')} error={errors.address?.message} />

                    <Textarea id="message" label="Anything else we should know?" hint="Pets, gate codes, problem areas, etc." {...register('message')} />

                    <Checkbox
                      id="consent"
                      label="I agree to be contacted by Harrell Maintenance Solution about my quote request."
                      {...register('consent')}
                    />
                    {errors.consent && <p className="-mt-4 text-xs font-medium text-red-600">{errors.consent.message}</p>}

                    <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
                      Request My Quote
                    </Button>
                  </form>
                )}
              </Card>
            </Reveal>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Reveal>
                <Card hover={false} className="border-blue-100 bg-blue-50">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-600 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-heading text-lg font-medium text-charcoal-900">{service.title}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-blue-100 pt-6">
                    <div className="flex items-center gap-3 text-sm text-charcoal-700">
                      <Tag className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      {service.startingPrice > 0 ? (
                        <span>
                          Starting at <strong>${service.startingPrice}</strong> {service.priceUnit}
                        </span>
                      ) : (
                        <span>Custom, transparent quote</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-charcoal-700">
                      <Clock className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      <span>Typical duration: {service.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-charcoal-700">
                      <Sparkles className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      <span>Eco-conscious supplies included</span>
                    </div>
                  </div>
                </Card>
              </Reveal>

              {service.addOns?.length > 0 && (
                <Reveal delay={0.05}>
                  <Card hover={false}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Additional services</p>
                    <div className="mt-4 grid gap-3">
                      {service.addOns.map((addOn) => (
                        <label
                          key={addOn.name}
                          className="flex cursor-pointer items-center justify-between gap-3 rounded-none border border-charcoal-200 bg-slate-50 px-4 py-3 text-sm text-charcoal-800 transition-colors hover:border-blue-300"
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              value={addOn.name}
                              {...register('addOns')}
                              className="h-4 w-4 rounded border-charcoal-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{addOn.name}</span>
                          </span>
                          <span className="font-semibold text-charcoal-500">
                            {addOn.price > 0 ? `+$${addOn.price}` : 'Free'}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-charcoal-500">Choose any add-ons to refine your quote.</p>
                  </Card>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section bg="cream">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-heading text-2xl font-medium text-white">What&rsquo;s included</h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-none bg-white/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sand-400" aria-hidden="true" />
                    <span className="text-sm text-charcoal-200">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-heading text-2xl font-medium text-white">Popular add-ons</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.addOns.map((addOn) => (
                  <span
                    key={addOn.name}
                    className="inline-flex items-center gap-2 rounded-full border border-charcoal-700 px-4 py-2 text-sm font-medium text-charcoal-200"
                  >
                    <PlusCircle className="h-4 w-4 text-blue-300" aria-hidden="true" />
                    {addOn.name}
                    <span className="text-charcoal-400">{addOn.price > 0 ? `+$${addOn.price}` : 'Free'}</span>
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-heading text-2xl font-medium text-white">How it works</h2>
              <div className="mt-6 space-y-5">
                {service.processSteps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-heading text-sm font-medium text-blue-300">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-medium text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-heading text-2xl font-medium text-white">Ideal for</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {service.idealFor.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-sand-500/15 px-4 py-2 text-sm font-semibold text-sand-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section bg="cream">
        <SectionHeading eyebrow="Explore more" title="Other services you might need" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>
    </>
  )
}
