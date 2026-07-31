import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, CheckCircle2, Home as HomeIcon, ShieldCheck, Sparkles, Clock3 } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { Input, Select, Textarea, Checkbox } from '../components/ui/FormField'
import { quoteSchema } from '../lib/schemas'
import { estimateQuote } from '../lib/estimate'
import { services } from '../data/services'
import quoteHeroImage from '../assets/images/step-book-online.webp'

const frequencyOptions = [
  { value: 'one-time', label: 'One-time' },
  { value: 'weekly', label: 'Weekly (save 20%)' },
  { value: 'biweekly', label: 'Biweekly (save 15%)' },
  { value: 'monthly', label: 'Monthly (save 10%)' },
]

export default function Quote() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      propertyType: 'residential',
      serviceSlug: services[0].slug,
      frequency: 'biweekly',
      bedrooms: '2',
      bathrooms: '2',
      squareFeet: '1500',
      addOns: [],
    },
  })

  const watched = watch()
  const selectedService = services.find((service) => service.slug === watched.serviceSlug) ?? services[0]
  const estimate = estimateQuote({ ...watched, addOns: watched.addOns ?? [] })
  const addOnsTotal = (selectedService.addOns ?? [])
    .filter((addOn) => (watched.addOns ?? []).includes(addOn.name))
    .reduce((sum, addOn) => sum + addOn.price, 0)

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Get a Free Quote"
        description="Request a free cleaning quote from Harrell Maintenance Solution with no obligation. Get an instant price estimate and a confirmed quote within one business day."
        path="/quote"
      />

      <PageHero
        eyebrow="Free Quote"
        title="Get your instant cleaning estimate"
        subtitle="Submit a few details to see a professional estimate with live pricing updates."
        breadcrumbs={[{ label: 'Get a Quote' }]}
        image={quoteHeroImage}
      />

      <Section bg="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {submitted ? (
              <Reveal>
                <div className="rounded-none border border-white/40 bg-white/95 p-10 shadow-soft-xl backdrop-blur-xl">
                  <div className="text-center">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-sand-600" aria-hidden="true" />
                    <h2 className="mt-5 font-heading text-2xl font-semibold text-charcoal-900">Quote request received</h2>
                    <p className="mt-3 max-w-md text-charcoal-600 mx-auto">
                      Thanks for reaching out. A member of our team will confirm your exact quote by email or phone within one business day.
                    </p>
                  </div>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Button to="/booking" variant="primary" size="lg" className="w-full">
                      Book a Cleaning
                    </Button>
                    <Button to="/" variant="outline-charcoal" size="lg" className="w-full">
                      Back to Home
                    </Button>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="rounded-none border border-white/40 bg-white/95 p-10 shadow-soft-xl backdrop-blur-xl">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
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
                          <input
                            type="radio"
                            value={option.value}
                            {...register('propertyType')}
                            className="sr-only"
                          />
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

                  <Select id="serviceSlug" label="Service needed" required {...register('serviceSlug')} error={errors.serviceSlug?.message}>
                    {services.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </Select>

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
                          <option key={n} value={n === 'Studio' ? '0' : n}>{n}</option>
                        ))}
                      </Select>
                      <Select id="bathrooms" label="Bathrooms" {...register('bathrooms')}>
                        {['1', '1.5', '2', '2.5', '3', '4+'].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </Select>
                    </div>
                  )}

                  <Select id="frequency" label="Cleaning frequency" required {...register('frequency')} error={errors.frequency?.message}>
                    {frequencyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
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
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Reveal>
                <div className="rounded-none border border-white/40 bg-white/95 p-6 shadow-soft-lg backdrop-blur-xl">
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Live estimate</p>
                    {estimate.isCustomQuote ? (
                      <>
                        <p className="mt-4 text-3xl font-heading font-semibold text-charcoal-900">Custom quote</p>
                        <p className="mt-2 text-sm text-charcoal-500">
                          {estimate.addonTotal > 0
                            ? `Plus $${estimate.addonTotal} for selected extras. We’ll confirm your exact price after a quick walkthrough.`
                            : 'We’ll confirm your exact price after a quick walkthrough.'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mt-4 text-4xl font-heading font-semibold text-charcoal-900">
                          ${estimate.low} to ${estimate.high}
                        </p>
                        <p className="mt-2 text-sm text-charcoal-500">Updated as you fill the form.</p>
                      </>
                    )}
                  </div>

                  <dl className="mt-6 space-y-2.5 border-t border-charcoal-100 pt-5 text-sm text-charcoal-600">
                    <div className="flex items-center justify-between gap-3">
                      <dt>Service</dt>
                      <dd className="text-right font-semibold text-charcoal-900">{selectedService.title}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt>Property</dt>
                      <dd className="font-semibold capitalize text-charcoal-900">{watched.propertyType}</dd>
                    </div>
                    {watched.propertyType === 'commercial' ? (
                      <div className="flex items-center justify-between gap-3">
                        <dt>Size</dt>
                        <dd className="font-semibold text-charcoal-900">{watched.squareFeet || '—'} sq ft</dd>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <dt>Size</dt>
                        <dd className="font-semibold text-charcoal-900">
                          {watched.bedrooms === '0' ? 'Studio' : `${watched.bedrooms || '—'} bd`} / {watched.bathrooms || '—'} ba
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <dt>Frequency</dt>
                      <dd className="text-right font-semibold text-charcoal-900">
                        {frequencyOptions.find((opt) => opt.value === watched.frequency)?.label ?? '—'}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt>Add-ons</dt>
                      <dd className="font-semibold text-charcoal-900">
                        {watched.addOns?.length > 0 ? `${watched.addOns.length} selected (+$${addOnsTotal})` : 'None'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              {selectedService.addOns?.length > 0 && (
                <Reveal delay={0.05}>
                  <div className="rounded-none border border-white/40 bg-white/95 p-6 shadow-soft-lg backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Additional services</p>
                    <div className="mt-4 grid gap-3">
                      {selectedService.addOns.map((addOn) => (
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
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.1}>
                <div className="rounded-none border border-white/40 bg-white/95 p-6 shadow-soft-lg backdrop-blur-xl">
                  <ul className="space-y-4 text-sm text-charcoal-700">
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-charcoal-500" aria-hidden="true" />
                      Licensed, bonded & insured team
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-charcoal-500" aria-hidden="true" />
                      Eco-conscious supplies included
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock3 className="mt-1 h-5 w-5 flex-shrink-0 text-charcoal-500" aria-hidden="true" />
                      Quote confirmed within 1 business day
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
