import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = true,
  className = '',
  titleClassName = '',
}) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
            light ? 'bg-white/10 text-blue-200' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-charcoal-900'
        } ${titleClassName || 'font-heading font-medium'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-charcoal-200' : 'text-charcoal-600'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
