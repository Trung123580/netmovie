import { useEffect, useState } from "react"
const useResize = () => {
  const [device, setDevice] = useState("")
  const [size, setSize] = useState(0)
  const scaleLayout = () => {
    const ww = window.innerWidth
    const baseSize = ww > 1024 ? "pc" : "mb"
    setSize(ww)
    setDevice(baseSize)
  }
  useEffect(() => {
    if (window.innerWidth > 768) {
      setDevice("pc")
      setSize(window.innerWidth)
    } else {
      setDevice("mb")
      setSize(window.innerWidth)
    }
    window.addEventListener("resize", scaleLayout)
    return () => {
      window.removeEventListener("resize", scaleLayout)
    }
  }, [])
  return { device, size }
}

export default useResize
