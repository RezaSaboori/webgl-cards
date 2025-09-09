import { useRef, useEffect } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2')
    if (!gl) {
      console.warn('WebGL2 not supported')
      return
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const targetWidth = Math.floor(window.innerWidth * 0.9 * dpr)
      const targetHeight = Math.floor(window.innerHeight * 0.9 * dpr)
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth
        canvas.height = targetHeight
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0.1, 0.1, 0.12, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '90vw', height: '90vh', display: 'block' }}
      />
    </div>
  )
}

export default App
