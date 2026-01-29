import { useEffect, useRef } from 'react'

const Particles = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        const particleCount = 25

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div')
            particle.className = 'particle'
            particle.style.left = Math.random() * 100 + '%'
            const size = Math.random() * 4 + 2
            particle.style.width = size + 'px'
            particle.style.height = size + 'px'
            particle.style.animationDelay = Math.random() * 8 + 's'
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's'

            const colors = [
                'rgba(139, 92, 246, 0.6)',
                'rgba(168, 85, 247, 0.5)',
                'rgba(100, 210, 255, 0.4)',
                'rgba(191, 90, 242, 0.5)'
            ]
            particle.style.background = colors[Math.floor(Math.random() * colors.length)]

            container.appendChild(particle)
        }

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild)
            }
        }
    }, [])

    return <div className="particles" ref={containerRef}></div>
}

export default Particles
