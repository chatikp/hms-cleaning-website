import logoMark from '../../assets/brand/logo-mark.webp'

/**
 * A small circular emblem straddling the seam between two stacked
 * sections — a deliberate "wax seal" transition instead of a flat
 * color-block cut.
 */
export default function SeamBadge({ ringClassName = 'border-cream' }) {
  return (
    <div className="relative z-10 h-0" aria-hidden="true">
      <div className={`absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] ${ringClassName} bg-white shadow-soft-lg`}>
        <img src={logoMark} alt="" width="32" height="32" className="h-8 w-8" />
      </div>
    </div>
  )
}
