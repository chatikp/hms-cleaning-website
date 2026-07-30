import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-blue-600 text-white border-transparent hover:bg-blue-700',
  // for use on dark surfaces (Hero, Navbar, Section, CtaBanner — the site's default dark theme)
  outline: 'bg-transparent text-white/90 border-white/30 hover:bg-white/10 hover:text-white',
  // for use on light surfaces (Card, and other explicit bg-white/bg-blue-50 boxes)
  'outline-charcoal': 'bg-transparent text-charcoal-800 border-charcoal-300 hover:border-blue-500 hover:text-blue-700',
  ghost: 'bg-transparent text-charcoal-700 border-transparent hover:bg-charcoal-100',
  'ghost-light': 'bg-transparent text-white border-white/30 hover:bg-white/10',
  white: 'bg-white text-blue-700 border-transparent hover:bg-blue-50',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
}

export default function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  className = '',
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full border font-semibold transition-colors duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  )

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-disabled={disabled || loading} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  )
}
