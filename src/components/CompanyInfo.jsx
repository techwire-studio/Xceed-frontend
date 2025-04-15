import { motion } from "framer-motion"

const CompanyInfo = () => {
  return (
    <motion.div 
      className="py-16 px-4 text-center max-w-4xl mx-auto font-jost font-light leading-loose tracking-wide"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-2xl sm:text-4xl font-normal leading-loose"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        We are major <span className="text-[#1428A1] font-normal">Semiconductor Independent Distributors</span>
        <br />
        in India, having our Headquarters in Bangalore and
        <br />
        Warehouse in Singapore.
      </motion.h2>

      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.a 
          href="#" 
          className="inline-block text-[#1428A1] font-medium relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          View all products
          <div className="h-1 w-full bg-amber-400 absolute bottom-0 left-0"></div>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export default CompanyInfo