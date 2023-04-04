import { useState, useEffect } from 'react'

export const useResizeWindow = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 1024)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)

    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  return { isDesktop }
}
