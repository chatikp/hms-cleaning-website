export const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'Residential Cleaning', to: '/services/residential-cleaning' },
      { label: 'Commercial Cleaning', to: '/services/commercial-cleaning' },
      { label: 'Deep Cleaning', to: '/services/deep-cleaning' },
      { label: 'Move-In / Move-Out', to: '/services/move-in-move-out-cleaning' },
      { label: 'Window Cleaning', to: '/services/window-cleaning' },
      { label: 'Airbnb Cleaning', to: '/services/airbnb-cleaning' },
      { label: 'Home Reset™', to: '/services/home-reset' },
      { label: 'Clean Air Refresh™', to: '/services/clean-air-refresh' },
      { label: 'Home Care Check™', to: '/services/home-care-check' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]
