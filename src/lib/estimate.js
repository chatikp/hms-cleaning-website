import { getServiceBySlug } from '../data/services'

const REFERENCE_BEDS = 2
const REFERENCE_BATHS = 2

export const FREQUENCY_DISCOUNT = {
  'one-time': 0,
  weekly: 0.2,
  biweekly: 0.15,
  monthly: 0.1,
}

// Anchored to each service's real starting price from data/services.js, with
// per-bedroom/bathroom scaling above the 2-bed/2-bath reference size. Anchors
// never scale downward, so the low estimate never undercuts the advertised
// "starting at" price on the service page.
const SERVICE_PRICING = {
  'residential-cleaning': { mode: 'home', anchor: 150, perBed: 25, perBath: 20 },
  'deep-cleaning': { mode: 'home', anchor: 220, perBed: 30, perBath: 25 },
  'move-in-move-out-cleaning': { mode: 'home', anchor: 250, perBed: 30, perBath: 25 },
  'airbnb-cleaning': { mode: 'home', anchor: 110, perBed: 18, perBath: 12 },
  'home-reset': { mode: 'home', anchor: 40, perBed: 5, perBath: 3 },
  'clean-air-refresh': { mode: 'home', anchor: 60, perBed: 6, perBath: 4 },
  'home-care-check': { mode: 'home', anchor: 25, perBed: 3, perBath: 2 },
  'commercial-cleaning': { mode: 'sqft', rate: 0.12, minimum: 150 },
  // Window cleaning is priced per window, not per bed/bath — estimate a window
  // count from home size instead of reusing the whole-home formula.
  'window-cleaning': { mode: 'pane', rate: 15, basePanes: 8, perBedPanes: 3, minPanes: 6 },
}

export function estimateQuote({ propertyType, serviceSlug, bedrooms, bathrooms, squareFeet, frequency, addOns = [] }) {
  const discount = FREQUENCY_DISCOUNT[frequency] ?? 0
  const pricing = SERVICE_PRICING[serviceSlug] ?? SERVICE_PRICING['residential-cleaning']
  const beds = Number(bedrooms) || REFERENCE_BEDS
  const baths = Number(bathrooms) || REFERENCE_BATHS

  let base
  if (propertyType === 'commercial' || pricing.mode === 'sqft') {
    const { rate, minimum } = SERVICE_PRICING['commercial-cleaning']
    const sqft = Number(squareFeet) || 1500
    base = Math.max(minimum, sqft * rate)
  } else if (pricing.mode === 'pane') {
    const panes = Math.max(pricing.minPanes, pricing.basePanes + beds * pricing.perBedPanes)
    base = panes * pricing.rate
  } else {
    base = pricing.anchor + Math.max(0, beds - REFERENCE_BEDS) * pricing.perBed + Math.max(0, baths - REFERENCE_BATHS) * pricing.perBath
  }

  const discounted = base * (1 - discount)

  const service = getServiceBySlug(serviceSlug)
  const selectedAddOns = Array.isArray(addOns) ? addOns : []
  const addonTotal = (service?.addOns ?? [])
    .filter((addOn) => selectedAddOns.includes(addOn.name))
    .reduce((sum, addOn) => sum + addOn.price, 0)

  const low = Math.round(discounted + addonTotal)
  const high = Math.round(discounted * 1.22 + addonTotal)
  const isCustomQuote = (service?.startingPrice ?? 0) === 0

  return { low, high, addonTotal, isCustomQuote }
}
