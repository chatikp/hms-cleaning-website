const accentClasses = {
  blue: 'before:bg-blue-500',
  sand: 'before:bg-sand-500',
  charcoal: 'before:bg-charcoal-700',
  none: 'before:bg-transparent',
}

export default function Card({ children, className = '', hover = true, accent = 'blue', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`relative overflow-hidden rounded-none border border-charcoal-900/[0.07] bg-white p-6 shadow-soft transition-all duration-300 ease-premium before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-[''] ${
        accentClasses[accent]
      } ${hover ? 'hover:-translate-y-1 hover:shadow-soft-lg' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
