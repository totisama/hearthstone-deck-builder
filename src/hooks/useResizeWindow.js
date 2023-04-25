import { useState, useEffect } from 'react'
import { WINDOW_SIZES_VALUE, WINDOW_SIZES } from '../constants'

export const useResizeWindow = () => {
  const [screenSize, setScreenSize] = useState()
  const { XL_VALUE, MD_VALUE } = WINDOW_SIZES_VALUE
  const { SMALL, MEDIUM, LARGE } = WINDOW_SIZES

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
