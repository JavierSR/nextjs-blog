import { useEffect, useState } from 'react'

const useWindowWidth = () => {
    const [width, setWidth] = useState <null | number>(null)
  
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize)
      }
    }, [])
    return width as number
}

export default useWindowWidth