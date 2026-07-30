import { Wind, Bug, Droplets, DoorOpen, Sparkles, Thermometer, Lightbulb } from 'lucide-react'
import Reveal from '../ui/Reveal'

const iconMap = { Wind, Bug, Droplets, DoorOpen, Sparkles, Thermometer }

export default function FactStrip({ fact }) {
  const Icon = iconMap[fact.icon] || Lightbulb

  return (
    <div className="border-y border-sand-800 bg-sand-950">
      <Reveal className="container-page flex items-center gap-4 py-5 sm:py-6">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sand-300 shadow-soft">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-charcoal-200 sm:text-[15px]">
          <span className="font-accent italic text-sand-300">Did you know?</span>{' '}
          {fact.text}
        </p>
      </Reveal>
    </div>
  )
}
