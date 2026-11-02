'use client';
import React from 'react'
import { motion } from 'framer-motion'

const OurManagementProcess = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="management-process-section"
        aria-label="What makes our Process the best"
        className="w-full max-w-[1536px] mx-auto bg-[#e5e0c8] flex flex-col items-center p-[20px] lg:p-[70px] overflow-hidden"
      >
        <h2 className='text-black text-[30px] md:text-[40px] lg:text-[50px] leading-[30px] lg:leading-[65px] text-center tracking-[0.1px] font-[700] mt-10 lg:mt-0'>
          What makes our <span className='text-[#0d5c47]'>Process</span> the best
        </h2>
        <div className="cards-divs flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 justify-center gap-5 mt-10">
          {/* Card 1 */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="cards bg-white w-full md:w-[417px] lg:w-[265px] h-[294px] flex flex-col items-start justify-center gap-5 p-[30px] rounded-[10px]"
            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
          >
            <h3 className='text-[18px] font-[600] leading-[21.6px] text-[#04042c]'>Holistic Approach</h3>
            <p className='text-[16px] font-[500] leading-[27.2px] text-[#687799]'>
              We view each project from a 360-degree perspective, considering every detail to provide comprehensive solutions tailored to customer needs.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="cards bg-black  w-full md:w-[417px] lg:w-[265px] h-[294px] flex flex-col items-start justify-center gap-5 p-[30px] rounded-[10px]"
            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
          >
            <h3 className='text-[18px] font-[600] leading-[21.6px] text-[#ffffff]'>Interdepartmental Synergy</h3>
            <p className='text-[16px] font-[500] leading-[27.2px] text-[#596582]'>
              Our departments work in seamless coordination, fostering collaboration and smooth communication to ensure consistency and excellence.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="cards bg-[#084032]  w-full md:w-[417px] lg:w-[265px] h-[294px] flex flex-col items-start justify-center gap-5 p-[30px] rounded-[10px]"
            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
          >
            <h3 className='text-[18px] font-[600] leading-[21.6px] text-[#ffd900]'>Order Assessment</h3>
            <p className='text-[16px] font-[500] leading-[27.2px] text-[#ffd900]'>
              Every order is carefully reviewed and evaluated to ensure accuracy, feasibility, and alignment with customer expectations and technical requirements.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="cards bg-[#ffd900]  w-full md:w-[417px] lg:w-[265px] h-[294px] flex flex-col items-start justify-center gap-5 p-[30px] rounded-[10px]"
            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
          >
            <h3 className='text-[18px] font-[600] leading-[21.6px] text-[#084032]'>Order Delivery</h3>
            <p className='text-[16px] font-[500] leading-[27.2px] text-[#687799]'>
              We execute timely and reliable delivery, ensuring each product reaches its destination in perfect condition—backed by strong logistical support and after-sales service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default OurManagementProcess
