import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter
  } from 'lucide-react';
  import { Link } from 'react-router-dom';
  
  const Footer = () => {
    return (
      <footer className="bg-[#1A1A1A] text-white px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10">
          {/* Logo + Company - Full width on mobile, normal on larger screens */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 mb-4 md:mb-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold mb-4 inline-block font-jost">XCEED</Link>
            {/* Optional: Add a short description with responsive text size */}
            <p className="text-sm text-gray-300 mt-2 pr-4 max-w-xs">
              Providing industry-leading products and services with excellence.
            </p>
          </div>
  
          {/* Services - Half width on mobile */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold border-b-2 border-[#0086FF] inline-block mb-3 pb-1">Services</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lorem Ipsum</a></li>
            </ul>
          </div>
  
          {/* About Us - Half width on mobile */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold border-b-2 border-[#0086FF] inline-block mb-3 pb-1">About Us</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>
  
          {/* Social Icons & Contact Info */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 mt-4 lg:mt-0">
            <h3 className="text-base sm:text-lg font-semibold border-b-2 border-[#0086FF] inline-block mb-3 pb-1">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
            </div>
            {/* Contact details with responsive spacing and sizing */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-300">contact@xceed.com</p>
              <p className="text-xs sm:text-sm text-gray-300">+1 234 567 890</p>
            </div>
          </div>
        </div>
  
        {/* Bottom Links & Copyright - Better mobile layout */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 text-xs text-gray-400">
          {/* Links with flex-wrap for better mobile experience */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-2 mb-4 sm:mb-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">CSR Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Certifications</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          
          {/* Copyright always centered on mobile, right-aligned on larger screens */}
          <p className="text-center sm:text-right">&copy; {new Date().getFullYear()} XCEED. All rights reserved</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;