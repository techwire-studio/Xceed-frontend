import { Star } from "lucide-react"
import c1 from "../assets/c1.png"
import c2 from "../assets/c2.png" 
import c3 from "../assets/c3.png"
import c4 from "../assets/c4.png"
import { motion } from "framer-motion"

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="py-4 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-[#1428A1] mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          EXPLORE
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`border p-4 flex flex-col items-center justify-center h-48 ${
                product.isFeatured ? "bg-[#1428A1] text-white" : "bg-[#F6F8FF]"
              }`}
            >
              {product.isFeatured ? (
                <>
                  <Star className="w-8 h-8 mb-2" />
                  <span>Featured Products</span>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 mb-2 object-contain"
                  />
                  <span className="text-sm text-center">{product.name}</span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ExploreSection