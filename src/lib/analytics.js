const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

export function initAnalytics() {
  if (!measurementId || typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}

export function trackEvent(eventName, params = {}) {
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}
