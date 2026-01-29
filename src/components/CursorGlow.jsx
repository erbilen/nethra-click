import { useEffect, useRef } from 'react'

const CursorGlow = () => {
    const glowRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                requestAnimationFrame(() => {
                    if (glowRef.current) {
                        glowRef.current.style.left = e.clientX + 'px'
                        glowRef.current.style.top = e.clientY + 'px'
                    }
                })
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return <div className="cursor-glow" ref={glowRef}></div>
}

export default CursorGlow
