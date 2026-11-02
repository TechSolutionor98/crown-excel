'use client'
import React from 'react'
import { motion } from 'framer-motion'

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
}

const OurManagementTeam = () => {
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="why-choose-management-team"
                aria-label="Why Choose Our Management Team"
                className="w-full max-w-[1536px] mx-auto bg-[#0d5c47] px-5 lg:px-20 py-20 flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-between gap-10 md:gap-10 lg:gap-20 overflow-hidden"
            >
                <div className="management-team-left md:-mt-15 flex flex-col gap-5 md:gap-10">
                    <div className="management-team-top flex flex-col md:flex-row lg:flex-row items-center gap-7 font-montserrat">
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="cards px-6 py-6 bg-white rounded-[20px] w-full md:w-[412px] lg:w-[300px] h-[280px] flex flex-col items-start justify-start gap-4"
                            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
                        >
                            <h2 className='text-black text-[18px] font-[600] leading-[23.4px]'>Dedicated Team</h2>
                            <p className='text-[#687799] text-[16px] font-[500] leading-[27.2px] flex-1 overflow-hidden'>
                                At Crown Excel, we firmly believe in assigning the right people to the right tasks. Our team is built on a foundation of expertise, reliability, and in-depth product knowledge.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="cards md:mt-20 px-6 py-6 bg-black rounded-[20px] w-full md:w-[412px] lg:w-[300px] h-[280px] flex flex-col items-start justify-start gap-4"
                            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
                        >
                            <h2 className='text-white text-[18px] font-[600] leading-[23.4px]'>Customer-First Approach</h2>
                            <p className='text-[#687799] text-[16px] font-[500] leading-[27.2px] flex-1 overflow-hidden'>
                                We always listen to customer needs first, providing the right hardware and solutions. Every interaction delivers value, trust, and satisfaction through exceptional service and reliable support.
                            </p>
                        </motion.div>
                    </div>

                    <div className="management-team-top flex flex-col md:flex-row lg:flex-row items-center gap-7 font-montserrat md:-mt-20">
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="cards px-6 py-6 bg-[#084032] rounded-[20px] w-full md:w-[412px] lg:w-[300px] h-[280px] flex flex-col items-start justify-start gap-4"
                            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
                        >
                            <h2 className='text-[#ffd900] text-[18px] font-[600] leading-[23.4px]'>Task-Oriented Team</h2>
                            <p className='text-[#687799] text-[16px] font-[500] leading-[27.2px] flex-1 overflow-hidden'>
                                We pride ourselves on having a task-oriented team that thrives on focus, accountability, and results. Each team member is driven by clear goals and a commitment to delivering high-quality outcomes.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="cards md:mt-20 px-6 py-6 bg-[#ffd900] rounded-[20px] w-full md:w-[412px] lg:w-[300px] h-[280px] flex flex-col items-start justify-start gap-4"
                            style={{ boxShadow: '6px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
                        >
                            <h2 className='text-[#084032] text-[18px] font-[600] leading-[23.4px]'>Support At Best</h2>
                            <p className='text-[#687799] text-[16px] font-[500] leading-[27.2px] flex-1 overflow-hidden'>
                                {`We are committed to providing the best support possible, before, during, and after every sale. Whether it's technical assistance, product guidance, or after-sales service, our team is always ready to help.`}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="management-team-right text-center lg:text-left">
                    <h2 className='text-[40px] font-[700] leading-[48px] text-white font-montserrat'>
                        Why Choose Our Management <span className='text-[#ffd900]'>Team?</span>
                    </h2>
                </div>
            </section>
        </div>
    )
}

export default OurManagementTeam
