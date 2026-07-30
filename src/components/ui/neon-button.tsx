import React from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
  'relative group border text-white/80 mx-auto text-center rounded-full transition-all duration-200 ease-premium',
  {
    variants: {
      variant: {
        default: 'bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20',
        solid: 'bg-blue-500 hover:bg-blue-600 text-white/90 border-transparent',
        ghost: 'border-transparent bg-transparent text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10',
        outline: 'bg-transparent text-white/80 border-white/20 hover:bg-white/10 hover:text-white',
        primary: 'bg-blue-500 hover:bg-blue-600 text-white/90 border-transparent',
      },
      size: {
        default: 'px-7 py-1.5 ',
        sm: 'px-4 py-0.5 ',
        lg: 'px-10 py-2.5 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  neon?: boolean
  className?: string
  children?: React.ReactNode
  to?: LinkProps['to']
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const renderInnerContent = (neon: boolean, children: React.ReactNode) => (
  <>
    <span
      className={cn(
        'absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden',
        neon && 'block'
      )}
    />
    {children}
    <span
      className={cn(
        'absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden',
        neon && 'block'
      )}
    />
  </>
)

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, neon = true, size, variant, children, to, href, type = 'button', ...rest }, ref) => {
    const classNames = cn(buttonVariants({ variant, size }), className)

    if (to) {
      return (
        <Link className={classNames} ref={ref as React.ForwardedRef<HTMLAnchorElement>} to={to} {...(rest as Omit<LinkProps, 'className'>)}>
          {renderInnerContent(neon, children)}
        </Link>
      )
    }

    if (href) {
      return (
        <a className={classNames} ref={ref as React.ForwardedRef<HTMLAnchorElement>} href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {renderInnerContent(neon, children)}
        </a>
      )
    }

    return (
      <button className={classNames} ref={ref as React.ForwardedRef<HTMLButtonElement>} type={type} {...(rest as any)}>
        {renderInnerContent(neon, children)}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
