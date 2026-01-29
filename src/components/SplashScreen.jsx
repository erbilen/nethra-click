import { useState } from 'react'

const SplashScreen = ({ onEnter }) => {
    const [isExiting, setIsExiting] = useState(false)

    const handleClick = () => {
        setIsExiting(true)
        setTimeout(() => {
            onEnter()
        }, 600)
    }

    return (
        <div className={`splash-screen ${isExiting ? 'splash-exit' : ''}`} onClick={handleClick}>
            <div className="splash-content">
                <h1 className="splash-title">click</h1>
            </div>
        </div>
    )
}

export default SplashScreen
