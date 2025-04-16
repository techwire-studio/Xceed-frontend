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
      className="py-16 px-8"
    >
      <div className="max-w-full relative z-10 my-10">
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-[#1428A1] font-jost">
            EXPLORE
          </h2>
          <div className=" relative left-22 w-18 h-1 bg-yellow-500"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 mb-2 font-jost text-[#1428A1] w-full lg:justify-between">
          {products.map((product, index) => (
            <div
              key={index}
              className={`border p-4 flex flex-col items-center justify-center md:h-62 md:w-60 h-32 w-28 justify-self-center ${
                product.isFeatured ? "bg-[#1428A1] text-white" : "bg-[#F6F8FF]"
              }`}
            >
              {product.isFeatured ? (
                <>
                  <img src={star} className="w-16 h-16 mb-8" />
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