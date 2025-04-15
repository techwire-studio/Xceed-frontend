import { useRef, useEffect } from "react"
import image1 from "../assets/hero.webp" // Changed to webp for performance

const Hero = () => {
  const ref = useRef(null)
  
  // Hide the static placeholder once React mounts this component
  useEffect(() => {
    const placeholder = document.getElementById("hero-placeholder")
    if (placeholder) {
      placeholder.style.display = "none"
    }
  }, [])
  
  return (
    <div 
      ref={ref}
      className="hero-container"
    >
      {/* Match the structure and class names from index.html */}
      <div className="hero-bg"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          India's #1 Reliable Supplier for Premium Electronic Components
        </h1>
        <button className="hero-button">
          Explore
        </button>
      </div>
    </div>
  )
}

export default Hero