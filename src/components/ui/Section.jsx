const bgClasses = {
  white: 'bg-cream/30 backdrop-blur-sm border border-white/10',
  cream: 'bg-cream/30 backdrop-blur-sm border border-white/10',
  charcoal: 'bg-charcoal-950 text-white',
  blue: 'bg-blue-950',
  sand: 'bg-sand-950',
}

export default function Section({ id, bg = 'white', className = '', containerClassName = '', children }) {
  return (
    <section id={id} className={`relative py-14 sm:py-16 lg:py-20 ${bgClasses[bg] || bg} ${className}`}>
      <div className={`container-page ${containerClassName}`}>{children}</div>
    </section>
  )
}
