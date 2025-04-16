import { useRef, useEffect, useState } from "react"
import { Volume2, VolumeX } from 'lucide-react'; // Ensure you have lucide-react installed

const Hero = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true);

  // Set up the video to play automatically when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted; // Initialize muted state
      videoRef.current.play().catch(error => {
        // Handle autoplay restrictions gracefully
        console.log("Autoplay prevented:", error)
      })
    }
  }, [isMuted]) // React when isMuted changes

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className="hero-container bg-[#111] min-h-screen flex items-center justify-center text-center overflow-hidden relative"
    >
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          loop
          playsInline
        >
          <source src="/src/assets/Xceed.mp4" type="video/mp4" />
          {/* Fallback text if video can't be played */}
          Your browser does not support the video tag.
        </video>
        {/* Optional overlay to darken or adjust video contrast */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="hero-content relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="hero-title font-jost text-6xl font-medium text-white mb-8 leading-tight">
          India's #1 Reliable Supplier for Premium Electronic Components
        </h1>
        <button className="hero-button inline-block border-2 border-white text-white bg-transparent py-3 px-8 mt-8 text-lg font-medium">
          Explore
        </button>
      </div>
       {/* Volume toggle button */}
       <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 bg-black bg-opacity-50 text-white rounded-full p-2"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
    </div>
  )
}

export default Hero