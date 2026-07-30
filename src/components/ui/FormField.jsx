import { forwardRef } from 'react'

const fieldClasses =
  'block w-full rounded-none border border-charcoal-200 bg-white px-4 py-3 text-[15px] text-charcoal-900 placeholder:text-charcoal-400 transition-colors duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'

const errorClasses = 'border-red-400 focus:border-red-500 focus:ring-red-500/10'

function FieldWrapper({ label, htmlFor, error, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-semibold text-charcoal-800">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-charcoal-500">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export const Input = forwardRef(function Input({ label, error, hint, required, id, className = '', ...props }, ref) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint} required={required}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClasses} ${error ? errorClasses : ''} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
})

export const Textarea = forwardRef(function Textarea(
  { label, error, hint, required, id, rows = 4, className = '', ...props },
  ref
) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint} required={required}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClasses} resize-none ${error ? errorClasses : ''} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
})

export const Select = forwardRef(function Select(
  { label, error, hint, required, id, children, className = '', ...props },
  ref
) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint} required={required}>
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClasses} cursor-pointer ${error ? errorClasses : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  )
})

export const Checkbox = forwardRef(function Checkbox({ label, id, className = '', ...props }, ref) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-charcoal-700">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={`mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded-md border-charcoal-300 text-blue-600 focus:ring-blue-500/30 ${className}`}
        {...props}
      />
      <span>{label}</span>
    </label>
  )
})
