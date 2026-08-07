import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Check, CheckCircle2, ChevronLeft, ChevronRight, Moon, Sun, Sunrise } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import IconTile from '../components/ui/IconTile'
import { Input, Select, Textarea, Checkbox } from '../components/ui/FormField'
import { bookingSchema } from '../lib/schemas'
import { supabase } from '../lib/supabaseClient'
import { trackEvent } from '../lib/analytics'
import { services, getServiceBySlug } from '../data/services'
import { getIcon } from '../lib/icons'
import bookingHeroImage from '../assets/images/booking-window-cleaning.webp'

const steps = ['Service', 'Schedule', 'Your Details']

const frequencyOptions = [
  { value: 'one-time', label: 'One-time' },
  { value: 'weekly', label: 'Weekly (save 20%)' },
  { value: 'biweekly', label: 'Biweekly (save 15%)' },
  { value: 'monthly', label: 'Monthly (save 10%)' },
]

const timeOptions = [
  { value: 'morning', label: 'Morning', hint: '8am to 11am', icon: Sunrise },
  { value: 'afternoon', label: 'Afternoon', hint: '12pm to 3pm', icon: Sun },
  { value: 'evening', label: 'Evening', hint: '4pm to 7pm', icon: Moon },
]

const stepFields = [
  ['serviceSlug', 'frequency'],
  ['preferredDate', 'preferredTime', 'address', 'city', 'zip'],
  ['firstName', 'lastName', 'email', 'phone', 'consent'],
]

const todayISO = new Date().toISOString().split('T')[0]

export default function Booking() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
    defaultValues: {
      serviceSlug: services[0].slug,
      frequency: 'biweekly',
      preferredTime: 'morning',
    },
  })

  const watched = watch()
  const selectedService = getServiceBySlug(watched.serviceSlug)

  const goNext = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async (formData) => {
    const { error } = await supabase.from('bookings').insert([
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        service_slug: formData.serviceSlug,
        frequency: formData.frequency,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        access_notes: formData.accessNotes,
      },
    ])
    if (error) {
      console.error('Error submitting booking form:', error)
      return
    }
    trackEvent('generate_lead', { form_type: 'booking' })
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Book a Cleaning Online"
        description="Book your Harrell Maintenance Solutions cleaning appointment online in minutes. Choose your service, pick a time, and confirm. It's that simple."
        path="/booking"
      />

      <PageHero
        eyebrow="Online Booking"
        title="Book your cleaning in under 2 minutes"
        subtitle="Choose your service, pick a time that works, and we'll take care of the rest."
        breadcrumbs={[{ label: 'Booking' }]}
        image={bookingHeroImage}
      />

      <Section bg="white">
        <div className="mx-auto max-w-6xl">
          {submitted ? (
            <div className="flex flex-col items-center rounded-[2rem] border border-white/40 bg-white/95 py-16 text-center shadow-soft-xl backdrop-blur-xl">
              <CheckCircle2 className="h-14 w-14 text-sand-600" aria-hidden="true" />
              <h2 className="mt-5 font-heading text-2xl font-medium text-charcoal-900">Booking request confirmed!</h2>
              <p className="mt-3 max-w-md text-charcoal-600">
                We&rsquo;ve received your booking for <strong>{selectedService?.title}</strong>. You&rsquo;ll get a confirmation
                email shortly with your assigned team and exact arrival window.
              </p>
              <Button to="/" variant="outline-charcoal" className="mt-8">
                Back to Home
              </Button>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/40 bg-white/95 p-8 shadow-soft-xl backdrop-blur-xl">
              <ol className="mb-10 flex items-center justify-between" aria-label="Booking progress">
                {steps.map((label, i) => (
                  <li key={label} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                          i < step
                            ? 'bg-sand-600 text-white'
                            : i === step
                            ? 'bg-blue-600 text-white'
                            : 'bg-charcoal-100 text-charcoal-500'
                        }`}
                        aria-current={i === step ? 'step' : undefined}
                      >
                        {i < step ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className={`text-xs font-semibold ${i === step ? 'text-charcoal-900' : 'text-charcoal-400'}`}>
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`mx-2 h-0.5 flex-1 rounded ${i < step ? 'bg-sand-500' : 'bg-charcoal-100'}`} />
                    )}
                  </li>
                ))}
              </ol>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-8"
                    >
                      <fieldset>
                        <legend className="mb-4 text-sm font-semibold text-charcoal-800">Choose a service</legend>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {services.map((service) => {
                            const Icon = getIcon(service.icon)
                            const active = watched.serviceSlug === service.slug
                            return (
                              <label
                                key={service.slug}
                                className={`flex cursor-pointer items-center gap-3 rounded-none border-2 p-4 transition-colors ${
                                  active ? 'border-blue-500 bg-blue-50' : 'border-charcoal-200 hover:border-blue-300'
                                }`}
                              >
                                <input type="radio" value={service.slug} className="sr-only" {...register('serviceSlug')} />
                                <IconTile icon={Icon} tone={service.color} size="sm" />
                                <span className="text-sm font-semibold text-charcoal-800">{service.title}</span>
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>

                      <Select id="frequency" label="Cleaning frequency" required {...register('frequency')} error={errors.frequency?.message}>
                        {frequencyOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Select>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <Input id="preferredDate" type="date" label="Preferred date" required min={todayISO} {...register('preferredDate')} error={errors.preferredDate?.message} />

                      <fieldset>
                        <legend className="mb-3 text-sm font-semibold text-charcoal-800">Preferred arrival window</legend>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {timeOptions.map((opt) => (
                            <label
                              key={opt.value}
                              className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-none border-2 p-4 text-center transition-colors ${
                                watched.preferredTime === opt.value ? 'border-blue-500 bg-blue-50' : 'border-charcoal-200 hover:border-blue-300'
                              }`}
                            >
                              <input type="radio" value={opt.value} className="sr-only" {...register('preferredTime')} />
                              <opt.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                              <span className="text-sm font-semibold text-charcoal-800">{opt.label}</span>
                              <span className="text-xs text-charcoal-500">{opt.hint}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <Input id="address" label="Street address" required {...register('address')} error={errors.address?.message} />
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input id="city" label="City" required {...register('city')} error={errors.city?.message} />
                        <Input id="zip" label="ZIP code" required {...register('zip')} error={errors.zip?.message} />
                      </div>
                      <Textarea id="accessNotes" label="Access notes" hint="Gate codes, parking, pets, etc." {...register('accessNotes')} />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input id="firstName" label="First name" required {...register('firstName')} error={errors.firstName?.message} />
                        <Input id="lastName" label="Last name" required {...register('lastName')} error={errors.lastName?.message} />
                      </div>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input id="email" type="email" label="Email address" required {...register('email')} error={errors.email?.message} />
                        <Input id="phone" type="tel" label="Phone number" required {...register('phone')} error={errors.phone?.message} />
                      </div>

                      <div className="rounded-2xl border border-charcoal-100 bg-white/95 p-6 shadow-soft-xl ring-1 ring-charcoal-100/40">
                        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Booking summary</p>
                        <dl className="mt-4 space-y-3 text-sm text-charcoal-700">
                          <div className="flex justify-between gap-6">
                            <dt>Service</dt>
                            <dd className="font-semibold text-charcoal-900">{selectedService?.title}</dd>
                          </div>
                          <div className="flex justify-between gap-6">
                            <dt>Frequency</dt>
                            <dd className="font-semibold capitalize text-charcoal-900">{watched.frequency}</dd>
                          </div>
                          <div className="flex justify-between gap-6">
                            <dt>Date</dt>
                            <dd className="font-semibold text-charcoal-900">{watched.preferredDate || '—'}</dd>
                          </div>
                          <div className="flex justify-between gap-6">
                            <dt>Window</dt>
                            <dd className="font-semibold capitalize text-charcoal-900">{watched.preferredTime}</dd>
                          </div>
                        </dl>
                      </div>

                      <Checkbox
                        id="consent"
                        label="I agree to be contacted by Harrell Maintenance Solutions to confirm this booking."
                        {...register('consent')}
                      />
                      {errors.consent && <p className="-mt-4 text-xs font-medium text-red-600">{errors.consent.message}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    icon={ChevronLeft}
                    iconPosition="left"
                    onClick={goBack}
                    className={step === 0 ? 'invisible' : ''}
                  >
                    Back
                  </Button>

                  {step < steps.length - 1 ? (
                    <Button type="button" variant="primary" icon={ChevronRight} onClick={goNext}>
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary" icon={CalendarCheck} loading={isSubmitting}>
                      Confirm Booking
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
