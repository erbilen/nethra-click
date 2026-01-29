import { useState, useEffect } from 'react'

const MusicPlayer = ({ audioRef }) => {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const audio = audioRef?.current
        if (!audio) return

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)

        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)

        if (!audio.paused) {
            setIsPlaying(true)
        }

        return () => {
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
        }
    }, [audioRef])

    const toggleMusic = () => {
        const audio = audioRef?.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
    }

    return (
        <div className="music-player" onClick={toggleMusic}>
            <div className="music-info">
                <div className="music-icon">
                    <i className="fas fa-music"></i>
                </div>
                <div className="music-details">
                    <span className="music-title">Now Playing</span>
                    <span className="music-artist">UZI & Motive - Cennet</span>
                </div>
            </div>
            <div className="music-controls">
                <button className="play-btn">
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
            </div>
            <div className="music-visualizer" style={{ opacity: isPlaying ? 1 : 0.3 }}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>
    )
}

export default MusicPlayer
