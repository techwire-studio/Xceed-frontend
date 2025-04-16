import React from "react";
import cleanRoom from "../assets/cleanRoom.png"
import chips from "../assets/chips.png"

const QualityProducts = () => {
  return (
    <section className="py-8 md:py-16 px-4 max-w-full mx-auto font-jost">
      <div className="mb-4 md:mb-6 text-left">
        <span className="text-blue-600 font-normal">Direct and wholesale</span>
        <h2 className="text-2xl md:text-3xl font-medium text-blue-800 mt-2">
          Find your products without compromising quality
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-10">
        {/* Clean Room Photo Card */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="h-48 md:h-3/4 overflow-hidden">
            <img 
              src={cleanRoom} 
              alt="Worker in cleanroom examining electronic components" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/600/400";
                e.target.alt = "Clean room manufacturing placeholder";
              }}
            />
          </div>
          <div className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-blue-700 mb-2">
              Global Sourcing & Rigorous Testing
            </h3>
            <p className="text-gray-700 w-full md:w-3/4">
              We meticulously source products from trusted manufacturers worldwide and rigorously test each item in our state of the art lab, ensuring you receive the right components for your projects.
            </p>
          </div>
        </div>

        {/* Chips Photo Card */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="h-48 md:h-3/4 overflow-hidden">
            <img 
              src={chips} 
              alt="Close-up of high-quality electronic chips and components" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/600/400";
                e.target.alt = "Electronic components placeholder";
              }}
            />
          </div>
          <div className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-blue-700 mb-2">
              Best-in-Class Components
            </h3>
            <p className="text-gray-700 w-full md:w-3/4">
              Our commitment is to provide only top-tier chips and electronic parts, delivering unmatched quality and reliability to empower your designs without compromise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProducts;