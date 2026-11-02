import React from 'react';
import NetworkingSmartImage from '../../../../../Components/Images/itsmart.png';
import SignalTower from '../../../../../Components/Images/signaltower.png';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineRobot } from "react-icons/ai";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineCloudServer } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { IoBulbOutline } from "react-icons/io5";

const ITSmart = () => {
  const consultancyServices = [
    {
      title: "Digital Transformation Strategy",
      description: "Comprehensive roadmaps for modernizing legacy systems, adopting cloud technologies, and implementing digital-first processes that drive competitive advantage.",
      benefits: ["30% faster time-to-market", "50% operational efficiency", "25% cost reduction", "Future-ready architecture"],
      icon: <AiOutlineRobot />,
      category: "Strategy"
    },
    {
      title: "Technology Architecture Review",
      description: "Deep analysis of current IT architecture, identifying bottlenecks, security gaps, and optimization opportunities for scalable growth.",
      benefits: ["Performance optimization", "Security enhancement", "Scalability planning", "Risk mitigation"],
      icon: <GrTechnology />,
      category: "Architecture"
    },
    {
      title: "Cloud Migration Planning",
      description: "Strategic cloud adoption plans with vendor selection, migration timelines, and risk management for seamless transition to cloud platforms.",
      benefits: ["60% cost savings", "99.9% uptime", "Instant scalability", "Global accessibility"],
      icon: <AiOutlineCloudServer />,
      category: "Cloud"
    },
    {
      title: "Vendor Selection & Management",
      description: "Expert guidance in technology vendor evaluation, procurement strategy, contract negotiation, and ongoing relationship management.",
      benefits: ["Best-fit solutions", "Cost optimization", "Quality assurance", "Long-term partnerships"],
      icon: <AiOutlineShop />,
      category: "Procurement"
    },
    {
      title: "IT Governance & Compliance",
      description: "Establishing robust IT governance frameworks, compliance management, and risk assessment processes for regulatory adherence.",
      benefits: ["Regulatory compliance", "Risk reduction", "Process standardization", "Audit readiness"],
      icon: <GrCompliance />,
      category: "Governance"
    },
    {
      title: "Innovation Strategy",
      description: "Technology innovation roadmaps incorporating emerging technologies like AI, IoT, and blockchain for competitive differentiation.",
      benefits: ["Innovation acceleration", "Market leadership", "Competitive advantage", "Future readiness"],
      icon: <IoBulbOutline />,
      category: "Innovation"
    }
  ];

  const consultancyProcess = [
    {
      phase: "DISCOVER",
      title: "Assessment & Analysis",
      description: "Comprehensive evaluation of current IT landscape, business objectives, and strategic goals.",
      duration: "2-3 weeks",
      deliverables: ["Current state analysis", "Gap assessment", "Risk evaluation", "Opportunity identification"]
    },
    {
      phase: "DESIGN",
      title: "Strategy Development",
      description: "Creation of detailed strategic roadmap with prioritized initiatives and implementation timelines.",
      duration: "3-4 weeks",
      deliverables: ["Strategic roadmap", "Technology recommendations", "Implementation plan", "ROI projections"]
    },
    {
      phase: "DELIVER",
      title: "Implementation Support",
      description: "Hands-on guidance during execution with change management and stakeholder engagement.",
      duration: "Ongoing",
      deliverables: ["Implementation oversight", "Change management", "Training programs", "Performance monitoring"]
    }
  ];

  const expertiseAreas = [
    { area: "Enterprise Architecture", expertise: "95%", projects: "200+" },
    { area: "Cloud Strategy", expertise: "98%", projects: "150+" },
    { area: "Digital Transformation", expertise: "92%", projects: "180+" },
    { area: "Technology Governance", expertise: "90%", projects: "120+" },
    { area: "Innovation Strategy", expertise: "88%", projects: "100+" },
    { area: "Vendor Management", expertise: "94%", projects: "250+" }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="transform-strategy-section"
        aria-label="TRANSFORM Strategy - IT Consultancy"
        className="relative w-full max-w-[1536px] mx-auto min-h-screen bg-gradient-to-tr from-slate-50 via-blue-50 to-gray-50 overflow-hidden"
      >
      {/* Unique Diagonal Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-2 bg-[#16CA9A] transform rotate-45"></div>
        <div className="absolute top-40 right-20 w-48 h-2 bg-[#119472] transform -rotate-45"></div>
        <div className="absolute bottom-60 left-40 w-56 h-2 bg-[#13745a] transform rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-72 h-2 bg-[#0d5c47] transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-2 bg-[#084032] transform rotate-75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Unique Staggered Hero Layout */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content - Offset */}
            <div className="lg:col-span-8 lg:col-start-1 space-y-8">
              <div className="relative">
                <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#16CA9A] to-[#084032]"></div>
                <div className="pl-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                      IT CONSULTANCY
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={SignalTower} width={24} height={24} alt="Consultancy" />
                      <span className="text-[#16CA9A] font-semibold">Strategic Excellence</span>
                    </div>
                  </div>

                  <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-none mb-6">
                    TRANSFORM
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032] italic">
                      Strategy
                    </span>
                    <span className="block text-4xl md:text-5xl font-medium text-gray-700">
                      into Technology Success
                    </span>
                  </h2>

                  <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-[#16CA9A] shadow-xl">
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      Expert IT consultancy transforming business strategy into measurable technology outcomes.
                      We bridge the gap between vision and execution with data-driven insights and proven methodologies.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/contact-us"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                      >
                        Start Consultation
                        <svg className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <Link
                        href="/our-services"
                        className="inline-flex items-center px-6 py-4 border-2 border-[#16CA9A] text-[#16CA9A] font-bold rounded-xl hover:bg-[#16CA9A] hover:text-white transition-all duration-300"
                      >
                        {/* <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg> */}
                        View All Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image - Offset Down */}
            <div className="lg:col-span-4 lg:col-start-9 lg:mt-20">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-[#16CA9A]/20 to-[#084032]/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white p-6 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                  <Image
                    src={NetworkingSmartImage}
                    width={400}
                    height={300}
                    alt="IT Consultancy Excellence"
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-[#16CA9A] text-white p-3 rounded-full shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unique Diagonal Service Cards */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              CONSULTANCY <span className="text-[#16CA9A]">SERVICES</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6 transform skew-x-12"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic technology consulting services designed to accelerate digital transformation and maximize ROI
            </p>
          </div>

          {/* Modern Attractive Cards Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {consultancyServices.map((service, index) => (
              <div key={index} className="group relative">
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-[#16CA9A]/50 transform hover:-translate-y-4 hover:scale-[1.02]">

                  {/* Top Gradient Strip */}
                  <div className="h-2 bg-gradient-to-r from-[#16CA9A] via-[#119472] to-[#084032]"></div>

                  {/* Floating Background Elements */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-[#16CA9A]/10 to-[#084032]/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-tr from-[#084032]/5 to-[#16CA9A]/5 rounded-full blur-lg"></div>

                  <div className="relative p-6">
                    {/* Icon & Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#16CA9A] to-[#084032] rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                          {/* Icon Glow Effect */}
                          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative z-10">{service.icon}</span>
                        </div>
                      </div>
                      <div className="bg-[#16CA9A]/10 text-[#16CA9A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {service.category}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-[#16CA9A] transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Benefits Tags */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="inline-flex items-center bg-gradient-to-r from-gray-100 to-gray-200 hover:from-[#16CA9A]/10 hover:to-[#084032]/10 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-[#16CA9A] transition-all duration-200 cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-[#16CA9A] rounded-full mr-2"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#16CA9A]/25 transition-all duration-300 transform hover:scale-105 group/btn">
                        <span className="mr-2">Explore</span>
                        <svg className="w-4 h-4 inline transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      <button className="p-2.5 border-2 border-[#16CA9A] text-[#16CA9A] rounded-xl hover:bg-[#16CA9A] hover:text-white transition-all duration-300 group/info">
                        <svg className="w-4 h-4 transform group-hover/info:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-all duration-1000 pointer-events-none"></div>

                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#16CA9A]/20 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#084032]/20 rounded-tr-2xl"></div>
                </div>

                {/* Floating Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#16CA9A]/5 to-[#084032]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10 transform translate-y-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Expertise Visualization */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              EXPERTISE <span className="text-[#16CA9A]">MATRIX</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6 transform skew-x-12"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{area.area}</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Expertise Level</span>
                    <span>{area.expertise}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#16CA9A] to-[#084032] h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: area.expertise }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#16CA9A]">{area.projects}</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Process Timeline */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              CONSULTING <span className="text-[#16CA9A]">PROCESS</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6 transform skew-x-12"></div>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {consultancyProcess.map((process, index) => (
                <div key={index} className="relative flex-1 max-w-md">
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#16CA9A] to-[#084032] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="text-sm font-bold text-[#16CA9A] uppercase tracking-wide mb-2">{process.phase}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                      <div className="text-sm text-gray-500">{process.duration}</div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{process.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-800 uppercase">Key Deliverables</h4>
                      {process.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#16CA9A] rounded-full mr-2"></div>
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {index < consultancyProcess.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <svg className="w-8 h-8 text-[#16CA9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unique Asymmetric CTA */}
        <div className="relative">
          <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-0">
              <div className="lg:col-span-2 p-12 text-white">
                <h3 className="text-4xl font-black mb-6">Ready to Transform Your IT Strategy?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Get expert consultancy tailored to your business objectives. Our strategic approach delivers measurable results
                  and sustainable technology transformation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center px-8 py-4 bg-white text-[#084032] font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    Schedule Strategy Session
                  </Link>
                  <Link
                    href="/our-services"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#084032] transition-colors duration-300"
                  >
                    View Case Studies
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-1 bg-gray-900 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl font-black text-[#16CA9A] mb-4">200+</div>
                  <div className="text-lg font-semibold mb-2">Successful</div>
                  <div className="text-lg font-semibold">Transformations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default ITSmart;
