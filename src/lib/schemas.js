import { z } from 'zod'

const phoneRegex = /^[\d\s()+-]{7,20}$/

export const quoteSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(60),
  lastName: z.string().min(1, 'Last name is required').max(60),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').regex(phoneRegex, 'Enter a valid phone number'),
  propertyType: z.enum(['residential', 'commercial'], { required_error: 'Select a property type' }),
  serviceSlug: z.string().min(1, 'Select a service'),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  squareFeet: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  frequency: z.enum(['one-time', 'weekly', 'biweekly', 'monthly'], { required_error: 'Select a frequency' }),
  address: z.string().min(3, 'Enter your address'),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you agree to be contacted' }) }),
})

export const bookingSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(60),
  lastName: z.string().min(1, 'Last name is required').max(60),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').regex(phoneRegex, 'Enter a valid phone number'),
  serviceSlug: z.string().min(1, 'Select a service'),
  frequency: z.enum(['one-time', 'weekly', 'biweekly', 'monthly'], { required_error: 'Select a frequency' }),
  preferredDate: z.string().min(1, 'Select a preferred date'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], { required_error: 'Select a time window' }),
  address: z.string().min(3, 'Enter your address'),
  city: z.string().min(1, 'Enter your city'),
  zip: z.string().min(3, 'Enter a valid ZIP code').max(10),
  accessNotes: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you agree to be contacted' }) }),
})

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1, 'Subject is required').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})
