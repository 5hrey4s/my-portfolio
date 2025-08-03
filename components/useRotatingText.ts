import { useState, useEffect } from 'react'

const useRotatingText = (phrases: string[], interval: number = 3000) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const rotateText = () => {
            setIsVisible(false)
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
                setIsVisible(true)
            }, 500) // Half a second for fade out, then change text and fade in
        }

        const timer = setInterval(rotateText, interval)

        return () => clearInterval(timer)
    }, [phrases, interval])

    return { currentPhrase: phrases[currentIndex], isVisible }
}

export default useRotatingText

