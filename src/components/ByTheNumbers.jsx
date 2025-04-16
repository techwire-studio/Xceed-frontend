import React from 'react';
import b1 from "../assets/b1.png";
import b2 from "../assets/b2.png";

export default function ByTheNumbers() {
  return (
    <div className="max-w-full mx-auto bg-white py-12 px-6 font-jost overflow-hidden"> {/* Added overflow-hidden to container */}
      {/* By the Numbers Section - Made responsive */}
      <div className="my-16 md:my-24 flex items-baseline justify-around"> {/* Adjusted vertical margin */}
      <h2 className="h-full text-4xl sm:text-4xl font-bold text-gray-800 text-center flex items-start">BY THE NUMBERS</h2>
        
        {/* Adjusted gap and wrapping for smaller screens */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-24">
          <div className="text-center">
            {/* Adjusted text size */}
            <h3 className="text-4xl sm:text-5xl font-bold text-[#1428A1] italic">22+</h3>
            <p className="text-gray-600 mt-1 sm:mt-2">Suppliers</p>
          </div>
          
          <div className="text-center">
            {/* Adjusted text size */}
            <h3 className="text-4xl sm:text-5xl font-bold text-[#1428A1] italic">8000+</h3>
            <p className="text-gray-600 mt-1 sm:mt-2">Products</p>
          </div>
          
          <div className="text-center">
            {/* Adjusted text size */}
            <h3 className="text-4xl sm:text-5xl font-bold text-[#1428A1] italic">50+</h3>
            <p className="text-gray-600 mt-1 sm:mt-2">Trusted Partners</p>
          </div>
        </div>
      </div>

      {/* Adjusted text size and margin */}
      <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-8 md:mb-16 text-center">It's easy to start buying</h2>
      
      {/* Easy to Start Buying Section - Made responsive */}
      {/* Changed flex direction to col below md, adjusted gap */}
      <div className="relative mb-12 flex flex-col md:flex-row md:gap-14 items-center md:items-start">
        
        {/* Overlapping images - Adjusted for responsiveness */}
        {/* Set width to full below md, adjusted height and margin */}
        <div className="relative w-full md:w-1/2 h-80 sm:h-96 mb-8 md:mb-0 px-4">
          {/* First image - Adjusted size and position */}
          <div className="absolute sm:left-10 md:left-20 top-0 w-40 h-56 sm:w-56 sm:h-72 md:w-64 md:h-90 bg-purple-200 overflow-hidden rounded-md shadow-lg">
            <img 
              src={b2} 
              alt="Person in tech environment with purple lighting"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Second image - Adjusted size and position */}
          {/* Centered horizontally below md */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:left-2/3 top-16 w-48 h-64 sm:w-64 sm:h-80 md:w-72 md:h-90 bg-gray-200 overflow-hidden rounded-md shadow-lg z-10">
            <img 
              src={b1} 
              alt="Person working on laptop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Steps - Adjusted width, padding, gap, text size */}
        {/* Set width to full below md, removed top padding below md */}
        <div className="ml-0 flex flex-col gap-4 sm:gap-6 md:gap-8 w-full md:w-1/2 pt-0 md:pt-12">
          <div className="border-b border-gray-200 pb-3 sm:pb-4">
            {/* Adjusted gap and text sizes */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <span className="font-bold text-[#1428A1] text-3xl sm:text-4xl">01</span>
              <h3 className="text-gray-800 text-lg sm:text-xl md:text-3xl">Add products to your quote list</h3>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-3 sm:pb-4">
            {/* Adjusted gap and text sizes */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <span className="font-bold text-[#1428A1] text-3xl sm:text-4xl">02</span>
              <h3 className="text-gray-800 text-lg sm:text-xl md:text-3xl">Submit your enquiry</h3>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-3 sm:pb-4">
            {/* Adjusted gap and text sizes */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <span className="font-bold text-[#1428A1] text-3xl sm:text-4xl">03</span>
              <h3 className="text-gray-800 text-lg sm:text-xl md:text-3xl">Get pricing and delivery details</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}