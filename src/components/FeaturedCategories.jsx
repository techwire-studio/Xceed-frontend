import { motion } from "framer-motion"
import mosfetIcon from "../assets/mosfet.png"
import potentiometerIcon from "../assets/potentiometer.png"
import schottkyIcon from "../assets/thyristor.png"
import capacitorIcon from "../assets/capacitor.png"
import diodeIcon from "../assets/diode.png"
import microchipIcon from "../assets/microchip.png"


const categories = [
  {
    name: "Mosfets",
    icon: <img src={mosfetIcon} alt="Mosfets" className="w-6 h-6" />,
  },
  {
    name: "Potentiometer",
    icon: <img src={potentiometerIcon} alt="Potentiometer" className="w-6 h-6" />,
  },
  {
    name: "Capacitors",
    icon: <img src={capacitorIcon} alt="Capacitors" className="w-6 h-6" />,
  },
  {
    name: "Diode",
    icon: <img src={diodeIcon} alt="Diode" className="w-6 h-6" />,
  },
  {
    name: "Microchips",
    icon: <img src={microchipIcon} alt="Microchips" className="w-6 h-6" />,
  },
  {
    name: "Schottky/Thyristor",
    icon: <img src={schottkyIcon} alt="Schottky/Thyristor" className="w-6 h-6" />,
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
    <div 
      className="bg-[#191919] py-16 px-4 relative"
      style={{
        backgroundImage: `
        repeating-linear-gradient(
          to right,
          transparent,
          transparent 6%,
          rgba(200, 200, 200, 0.15),
          rgba(200, 200, 200, 0.15) calc(6% + 1px),
          transparent calc(6% + 1px),
          transparent calc(6% + 1.5%),
          rgba(200, 200, 200, 0.15),
          rgba(200, 200, 200, 0.15) calc(6% + 1.5% + 1px),
          transparent calc(6% + 1.5% + 1px),
          transparent 12.5%
        )
      `,
        backgroundSize: '100% 100%',
      }}
    >
      <motion.div 
        className="max-w-6xl mx-auto relative z-10 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-[#2289FF] mb-2 font-jost">FEATURED</motion.h2>
        <motion.h3 variants={itemVariants} className="text-3xl font-bold text-[#2289FF] mb-10 font-jost">CATEGORIES</motion.h3>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 py-8 flex items-center space-x-4 hover:shadow-lg transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {category.icon}
              <span className="text-lg font-medium font-jost">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FeaturedCategories