import { motion } from "framer-motion"
import mosfetIcon from "../assets/mosfet.png"
import potentiometerIcon from "../assets/potentiometer.png"
import schottkyIcon from "../assets/thyristor.png"
import capacitorIcon from "../assets/capacitor.png"
import diodeIcon from "../assets/diode.png"
import microchipIcon from "../assets/microchip.png"
import BackgroundPattern from "./BackgroundPattern"

const categories = [
  {
    name: "Mosfets",
    icon: <img src={mosfetIcon} alt="Mosfets" className="w-9" />,
  },
  {
    name: "Potentiometer",
    icon: <img src={potentiometerIcon} alt="Potentiometer" className="w-9" />,
  },
  {
    name: "Capacitors",
    icon: <img src={capacitorIcon} alt="Capacitors" className="w-9" />,
  },
  {
    name: "Diode",
    icon: <img src={diodeIcon} alt="Diode" className="w-9" />,
  },
  {
    name: "Microchips",
    icon: <img src={microchipIcon} alt="Microchips" className="w-9" />,
  },
  {
    name: "Schottky/Thyristor",
    icon: <img src={schottkyIcon} alt="Schottky/Thyristor" className="w-9" />,
  },
]

const FeaturedCategories = () => {
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
    <BackgroundPattern 
      lineColor="#414141" 
      backgroundColor="#191919"
      className="py-16 px-8"
    >
      <motion.div 
        className="max-w-full relative z-10 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-[#2289FF] mb-2 font-jost">FEATURED</motion.h2>
        <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-[#2289FF] mb-12 font-jost">CATEGORIES</motion.h3>

        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-32"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 py-10 flex items-center space-x-4 hover:shadow-lg transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {category.icon}
              <span className="text-xl font-medium font-jost">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </BackgroundPattern>
  )
}

export default FeaturedCategories