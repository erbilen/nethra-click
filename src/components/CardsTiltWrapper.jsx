import { useEffect, useRef } from 'react'

const CardsTiltWrapper = ({ children }) => {
    const wrapperRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const wrapper = wrapperRef.current
        const content = contentRef.current
        if (!wrapper || !content) return

        let isFirstMove = true
        let animationFrame = null

        const handleMouseMove = (e) => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }

            animationFrame = requestAnimationFrame(() => {
                const rect = wrapper.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateX = (centerY - y) / 66.67
                const rotateY = (x - centerX) / 66.67

                content.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)'
                content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            })
        }

        const handleMouseLeave = () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
            isFirstMove = true
            content.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
            content.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
        }

        wrapper.addEventListener('mousemove', handleMouseMove)
        wrapper.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            wrapper.removeEventListener('mousemove', handleMouseMove)
            wrapper.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div className="cards-tilt-wrapper" ref={wrapperRef}>
            <div className="cards-tilt-content" ref={contentRef}>
                {children}
            </div>
        </div>
    )
}

export default CardsTiltWrapper
