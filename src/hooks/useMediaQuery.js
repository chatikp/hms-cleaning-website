import { useEffect, useState } from 'react'

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)')
    setIsMobile(query.matches)

    const onChange = (e) => setIsMobile(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return { isMobile }
}
