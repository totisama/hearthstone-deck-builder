import { useState, useEffect } from 'react'

export const useScroll = () => {
  const [pastBreakPoint, setPastBreakPoint] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset

    if (position > 150) {
      setPastBreakPoint(true)
    } else if (position <= 150) {
      setPastBreakPoint(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { pastBreakPoint }
}
