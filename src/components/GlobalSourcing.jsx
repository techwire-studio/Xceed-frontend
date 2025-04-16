import React from 'react';
import taiwan from '../assets/taiwan.png';
import japan from '../assets/japan.png';
import germany from '../assets/germany.png';
import BackgroundPattern from './BackgroundPattern'; // Import the BackgroundPattern component

const GlobalSourcingComponent = () => {
  return (
    <BackgroundPattern 
      lineColor="#E1E1E1" 
      backgroundColor="#F3F4F6" 
      className="max-w-[1440px] pt-8 lg:pt-8 md:pb-64 lg:pb-40 relative mr-0 font-jost px-4 lg:px-8"
    >
      {/* Two different layouts based on screen size */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
        <h1 className="text-3xl md:text-4xl font-bold text-black w-full lg:w-[400px] mb-8 lg:mb-12 text-center lg:text-left pt-8">
          Globally Sourced, Precisely Delivered
        </h1>
        
        {/* Mobile/Tablet Layout (below 968px) */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 lg:hidden">
          <div className="relative w-full md:w-[calc(50%-8px)] h-[300px] overflow-hidden z-10"> 
            <img src={taiwan} alt="Taiwan Lab" className="w-full h-full object-cover" />
            <div className="absolute inset-0"></div>
            <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white z-20">
              Taiwan
            </span>
          </div>
          <div className="relative w-full md:w-[calc(50%-8px)] h-[300px] overflow-hidden z-10"> 
            <img src={japan} alt="Japan Temple" className="w-full h-full object-cover" />
            <div className="absolute inset-0"></div>
            <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white z-20">
              Japan
            </span>
          </div>
          <div className="relative w-full h-[300px] overflow-hidden z-10"> 
            <img src={germany} alt="Germany Factory" className="w-full h-full object-cover" />
            <div className="absolute inset-0"></div>
            <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white z-20">
              Germany
            </span>
          </div>
        </div>
        
        {/* Desktop Layout (968px and above) */}
        <div className="hidden lg:flex lg:gap-2">
          <div className="relative w-[210px] h-[525px] overflow-hidden z-10"> 
            <img src={taiwan} alt="Taiwan Lab" className="w-[400px] h-full object-cover" />
            <div className="absolute inset-0"></div>
            <span className="absolute bottom-5 left-11 transform -translate-x-1/2 text-2xl font-bold text-white z-20">
              Taiwan
            </span>
            <div className='absolute bottom-4 left-7 transform -translate-x-1/2 w-10 h-1 bg-yellow-500 z-1000'></div>
          </div>
          <div className="relative w-[210px] h-[525px] overflow-hidden z-10"> 
            <img src={japan} alt="Japan Temple" className="w-[400px] h-full object-cover" />
            <div className="absolute inset-0"></div>
            <span className="absolute bottom-5 left-10 transform -translate-x-1/2 text-2xl font-bold text-white z-20">
              Japan
            </span>
            <div className='absolute bottom-4 left-6 transform -translate-x-1/2 w-10 h-1 bg-yellow-500 z-1000'></div>
          </div>
          <div className="relative w-[210px] h-[525px] overflow-hidden z-10"> 
            <img src={germany} alt="Germany Factory" className="w-[400px] h-full object-cover" />
            <div className="absolute inset-0"></div>
            <span className="absolute bottom-5 left-14 transform -translate-x-1/2 text-2xl font-bold text-white z-20">
              Germany
            </span>
            <div className='absolute bottom-4 left-7 transform -translate-x-1/2 w-10 h-1 bg-yellow-500 z-1000'></div>
          </div>
        </div>
      </div>
      
      {/* Bottom green banner with BackgroundPattern - responsive for all screens */}
      <div className="md:absolute bottom-0 left-0 w-full px-4 md:px-8 lg:px-12 py-6 lg:py-10 bg-[#6BB356] flex flex-col lg:flex-row z-0 mt-2 h-3/9">
        <BackgroundPattern 
          lineColor="#FFFFFF" 
          backgroundColor="#6BB356"
          className="absolute inset-0"
        />
        <div className="flex flex-col justify-end relative z-10">
          <div className="mt-auto text-center lg:text-left">
            <div className="text-lg md:text-xl font-normal mb-2 text-white">Building Tomorrow, Sustainably</div>
            <div className="w-16 h-1 bg-yellow-500 mx-auto lg:mx-0"></div>
          </div>
          <p className="text-[#373737] text-sm md:text-base text-center lg:text-justify max-w-full lg:max-w-9/12 mt-4 lg:mt-5">
            At Xceed, we believe great electronics shouldn't come at the planet's expense. From choosing manufacturers with responsible practices to minimizing packaging waste, we're committed to making smarter, greener choices at every step. Because sustainability isn't just a trend, it's our responsibility.
          </p>
        </div>
        <div className="lg:ml-auto self-center lg:self-end mt-6 lg:mt-0 relative z-10">
          <button className="bg-white text-green-600 font-bold text-sm md:text-base py-2 px-4 lg:py-2.5 lg:px-5 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center w-36 lg:w-40">
            Learn More
            <span className="ml-2">🌱</span>
          </button>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default GlobalSourcingComponent;