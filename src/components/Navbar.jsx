import { ChevronDown, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { useState, memo, useEffect } from "react"; // Added useEffect

const Navbar = memo(({ toggleSidebar }) => {
  const { cart } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Added state for scroll position
  
  // Check if current page is the home page
  const isHomePage = location.pathname === '/';

  // Checking if the page is the products page
  const isProductsPage = location.pathname.includes('/products');

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate cart count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
      <nav 
        className={`fixed top-0 left-0 w-full ${
          isHomePage && !scrolled 
            ? 'bg-opacity- backdrop-blur-3xl' 
            : 'bg-black shadow-lg'
        } py-4 px-6 flex items-center justify-between md:justify-around z-20 transition-colors duration-300`}
      >
      <Link to="/" className="text-2xl font-bold text-white tracking-tight font-jost relative">
        XCEED
        {isHomePage && (
          <div className="absolute top-[3rem] left-0 w-[clamp(300px,75vw,1200px)] h-[1px] bg-white opacity-70"></div>
        )}
      </Link>
      
      {/* Mobile menu button */}
      <button 
        className="text-white md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 font-lexend">
        <div className="relative">
          <button
            className="flex items-center space-x-1 font-medium text-white cursor-pointer"
            onClick={toggleSidebar}
          >
            <span>Products</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <button className="font-medium text-white">Company</button>
        <div className="relative">
          <button className="flex items-center space-x-1 font-medium text-white">
            <span>Join Us</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <button className="font-medium text-white">FAQ's</button>
        <button className="font-medium text-white">Contact Us</button>
        <Link to="/cart" className="relative flex items-center text-white">
          <ShoppingCart size={20} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 shadow-lg md:hidden py-4 px-6 flex flex-col space-y-6">
          <div className="relative">
            <button
              className="flex items-center space-x-1 font-medium text-white cursor-pointer"
              onClick={() => {
                toggleSidebar();
                toggleMenu();
              }}
            >
              <span>Products</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <button className="font-medium text-white">Company</button>
          <div className="relative">
            <button className="flex items-center space-x-1 font-medium text-white">
              <span>Join Us</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <button className="font-medium text-white">FAQ's</button>
          <button className="font-medium text-white">Contact Us</button>
          <Link 
            to="/cart" 
            className="relative flex items-center text-white"
            onClick={toggleMenu}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
});

export default Navbar;