import { Link } from 'react-router-dom'
import logoMark from '../../assets/brand/logo-mark.webp'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Harrell Maintenance Solutions Home">
      <span
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 ease-premium group-hover:scale-105 ${
          light ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.15)]' : 'shadow-soft'
        }`}
      >
        <img src={logoMark} alt="" width="44" height="44" className="h-full w-full rounded-full" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-[15px] font-medium tracking-tight ${light ? 'text-white' : 'text-charcoal-900'}`}>
          Harrell Maintenance
        </span>
        <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-blue-200' : 'text-blue-600'}`}>
          Solution
        </span>
      </span>
    </Link>
  )
}
