import { useState, useEffect } from 'react'
import { XL_VALUE, MD_VALUE, SMALL, MEDIUM, LARGE } from '../constants'

export const useResizeWindow = () => {
  const [screenSize, setScreenSize] = useState()

  const updateMedia = () => {
    const windowSize = window.innerWidth
    let size = LARGE

    if (windowSize < XL_VALUE && windowSize > MD_VALUE) {
      size = MEDIUM
    } else if (windowSize <= MD_VALUE) {
      size = SMALL
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
