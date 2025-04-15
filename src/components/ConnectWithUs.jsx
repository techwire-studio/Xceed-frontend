import React from 'react';
import factoryImage from '../assets/factoryImage.png';
import profile1 from '../assets/profile1.png';
import profile2 from '../assets/profile2.png';
import profile3 from '../assets/profile3.png';

const ConnectWithUs = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-jost flex flex-col">

      {/* Testimonial Section */}
      <div className="bg-[#0086FF] text-[#0A1B36] py-16 relative">
          {/* Floating CTA Top Right */}
        <button className="hidden md:flex items-center justify-between bg-white text-black border border-black rounded-full pl-6 absolute top-10 right-10 z-10 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-xl font-normal">Get a Quote</span>
            <div className="ml-4 w-14 h-14 bg-[#0026A0] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">↗</span>
            </div>
        </button>
        <div className="flex flex-col gap-10">
          
          {/* Profile Images + Tagline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex -space-x-3">
              <img src={profile1} alt="Profile 1" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src={profile2} alt="Profile 2" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src={profile3} alt="Profile 3" className="w-10 h-10 rounded-full border-2 border-white" />
              <div className="w-10 h-10 rounded-full border-2 bg-white border-white text-[#1428A1] text-xs flex flex-col justify-center text-center font-bold">1000+</div>
            </div>
            <div className="text-white text-sm mt-2 sm:mt-0">
              <p className="font-bold">Trusted by</p>
              <p>world leading companies</p>
            </div>
          </div>

          {/* Quote + Author + CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-4xl sm:ml-16 mx-4">
              <p className="text-xl sm:text-2xl font-medium mb-6 text-[#313131] leading-loose tracking-wide">
                “Xceed has completely changed the way we source electronic components. The quality is consistently top-notch, and their support team is quick to respond with accurate quotations and delivery timelines. It’s rare to find this level of reliability and transparency in the industry.”
              </p>
              <p className="font-bold text-base text-[#313131]">Chandan K</p>
              <p className="text-sm text-white">Managing Director, Bosh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connect with Us Section */}
      <div className="relative w-full h-[400px]">
        <img src={factoryImage} alt="Factory" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-start px-6">
          <div className="text-white text-left ml-10">
            <h2 className="text-6xl font-bold mb-4">Connect with us</h2>
            <p className="text-lg  max-w-96 mb-6 font-normal">
              Have a project in mind or need cutting-edge electronic solutions? Looking to collaborate or explore career opportunities at Xceed?
            </p>
            <button className="text-white text-2xl font-normal underline-offset-4">
              Let’s Talk &gt;&gt;
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConnectWithUs;
