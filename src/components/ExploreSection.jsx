import { Star } from "lucide-react"
import c1 from "../assets/c1.png"
import c2 from "../assets/c2.png"
import c3 from "../assets/c3.png"
import c4 from "../assets/c4.png"
import BackgroundPattern from "./BackgroundPattern"
import star from "../assets/star.svg"

const products = [
  {
    name: "Featured Products",
    image: null,
    isFeatured: true,
  },
  {
    name: "Capacitors",
    image: c1,
  },
  {
    name: "Capacitors",
    image: c2
  },
  {
    name: "Capacitors",
    image: c3,
  },
  {
    name: "Capacitors",
    image: c4,
  },
]

const ExploreSection = () => {
  return (
    <BackgroundPattern
      lineColor="#E1E1E1"
      backgroundColor="#F9F9F9"
      className="py-8 px-4 md:py-12 md:px-6 lg:py-16 lg:px-8"
    >
      <div className="max-w-full relative z-10 my-6 md:my-8 lg:my-10">
        <div className="mb-8 md:mb-12 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1428A1] font-jost">
            EXPLORE
          </h2>
          <div className="w-16 h-1 bg-yellow-500 mt-1"></div>
        </div>
        
        {/* Mobile layout (xs to sm) - 2 columns, smaller items */}
        <div className="grid grid-cols-2 gap-3 font-jost text-[#1428A1] w-full sm:hidden">
          {products.map((product, index) => (
            <div
              key={index}
              className={`border p-3 flex flex-col items-center justify-center h-28 w-full ${
                product.isFeatured ? "bg-[#1428A1] text-white" : "bg-[#F6F8FF]"
              }`}
            >
              {product.isFeatured ? (
                <>
                  <img src={star} className="w-10 h-10 mb-2" alt="Star" />
                  <span className="text-sm font-medium text-center">Featured Products</span>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 mb-1 object-contain"
                  />
                  <span className="text-xs font-semibold text-center">{product.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Tablet layout (md) - 3 columns, medium items */}
        <div className="hidden sm:grid md:grid-cols-3 gap-4 font-jost text-[#1428A1] w-full lg:hidden">
          {products.map((product, index) => (
            <div
              key={index}
              className={`border p-4 flex flex-col items-center justify-center h-40 w-full ${
                product.isFeatured ? "bg-[#1428A1] text-white" : "bg-[#F6F8FF]"
              }`}
            >
              {product.isFeatured ? (
                <>
                  <img src={star} className="w-12 h-12 mb-4" alt="Star" />
                  <span className="text-lg font-medium">Featured Products</span>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 mb-2 object-contain"
                  />
                  <span className="text-sm font-semibold text-center mt-1">{product.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Desktop layout (lg and above) - flex, original design */}
        <div className="hidden lg:flex gap-4 mb-2 font-jost text-[#1428A1] w-full justify-between">
          {products.map((product, index) => (
            <div
              key={index}
              className={`border p-4 flex flex-col items-center justify-center h-60 w-52 ${
                product.isFeatured ? "bg-[#1428A1] text-white" : "bg-[#F6F8FF]"
              }`}
            >
              {product.isFeatured ? (
                <>
                  <img src={star} className="w-16 h-16 mb-8" alt="Star" />
                  <span className="text-xl">Featured Products</span>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 mb-2 object-contain"
                  />
                  <span className="text-sm font-semibold text-center mt-2">{product.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </BackgroundPattern>
  )
}

export default ExploreSection