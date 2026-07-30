import {
  Home,
  Building2,
  Sparkles,
  Truck,
  AppWindow,
  Key,
  BedDouble,
  Wind,
  ClipboardCheck,
} from 'lucide-react'

const iconMap = {
  Home,
  Building2,
  Sparkles,
  Truck,
  AppWindow,
  Key,
  BedDouble,
  Wind,
  ClipboardCheck,
}

export function getIcon(name, fallback = 'Sparkles') {
  return iconMap[name] || iconMap[fallback]
}
