import React from "react";
import lab from "../assets/lab.png";

const WhyChooseUs = () => {
  return (
    <section className="relative bg-[#191919] text-white overflow-hidden font-jost">
      {/* Image positioned absolutely to cover full height */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
        <img 
          src={lab} 
          alt="Xceed manufacturing facility with automated equipment" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/800/600";
            e.target.alt = "Manufacturing facility placeholder";
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="max-w-full px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Text content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Why Choose Us</h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>
            
            <p className="text-gray-300 tracking-wide leading-relaxed">
              A trusted name in electronic components, Xceed has been empowering innovation 
              by delivering high-quality, reliable solutions sourced globally. Our extensive network 
              and commitment to sustainability make us the go-to partner for all your component needs.
            </p>
            
            <div className="grid grid-cols-2 gap-4 gap-y-8 pt-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Fully integrated supply chain process</span>
              </div>
              
              {/* Other list items remain the same */}
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Premium quality parts</span>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Cost-effective electronic component solutions</span>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Custom sourcing & engineering capabilities</span>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Sustainable & eco-friendly approach</span>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Adherence to global quality standards</span>
              </div>
            </div>
            
            <button className="border border-white px-6 py-2 mt-4 hover:bg-white hover:text-black transition-colors">
              Learn More
            </button>
          </div>
          
          {/* This is an empty div that takes up space in the grid but shows the image behind it */}
          <div className="md:h-full"></div>
        </div>
      </div>
      
      {/* Mobile-only image (since absolute positioning won't work well on small screens) */}
      <div className="block md:hidden mt-6 px-4 pb-16">
        <img 
          src={lab} 
          alt="Xceed manufacturing facility with automated equipment" 
          className="w-full h-64 object-cover rounded"
          onError={(e) => {
            e.target.src = "/api/placeholder/800/600";
            e.target.alt = "Manufacturing facility placeholder";
          }}
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;