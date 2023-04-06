import { useState, useEffect } from 'react'
import { XL, MD } from '../constants'

export const useResizeWindow = () => {
  const [screenSize, setScreenSize] = useState()

  const updateMedia = () => {
    const windowSize = window.innerWidth
    let size = 'LG'

    if (windowSize < XL && windowSize > MD) {
      size = 'MD'
    } else if (windowSize <= MD) {
      size = 'SM'
    }

    setScreenSize(size)
  }

  useEffect(() => {
    updateMedia()
    window.addEventListener('resize', updateMedia)

    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  return { screenSize }
}
