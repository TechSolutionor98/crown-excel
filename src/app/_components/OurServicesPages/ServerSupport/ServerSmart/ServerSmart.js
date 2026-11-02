"use client";
import React from 'react';
import NetworkingSmartImage from '../../../../../Components/Images/modernstorage.jpg';
import SignalTower from '../../../../../Components/Images/transform.jpg';
import Image from 'next/image';
import Dragon from '../../../../../Components/Images/dragon.png'
import Intel from '../../../../../Components/Images/intell.png'
import Dell from '../../../../../Components/Images/dell (1).png'
import Accer from '../../../../../Components/Images/acer (2).png'
import Xerox from '../../../../../Components/Images/Xerox.png'
import Amd from '../../../../../Components/Images/amdd.png'
import HP from '../../../../../Components/Images/hp (1).png'
import ViewSonic from '../../../../../Components/Images/view sonic.png'
import Optoma from '../../../../../Components/Images/optoma.png'
import ricoh from '../../../../../Components/Images/ricoh.png'
import meetion from '../../../../../Components/Images/meetion.png'
import logitech from '../../../../../Components/Images/logitech.png'
import lexar from '../../../../../Components/Images/lexar.png'
import Kingston from '../../../../../Components/Images/Kingston.png'
import epson from '../../../../../Components/Images/epson.png'
import crucial from '../../../../../Components/Images/crucial.png'
import canon from '../../../../../Components/Images/canon.png'
import brother from '../../../../../Components/Images/brother.png'
import benq from '../../../../../Components/Images/benq.png'
import aoc from '../../../../../Components/Images/aoc.png'
import alienware from '../../../../../Components/Images/alienware.png'
import adhua from '../../../../../Components/Images/adhua.png'
import tplink from '../../../../../Components/Images/tp link.png'
import samsung from '../../../../../Components/Images/samsung (1).png'
import razor from '../../../../../Components/Images/razor.png'
import microsof from '../../../../../Components/Images/microsof.png'
import lg from '../../../../../Components/Images/lg.png'
import lenovo from '../../../../../Components/Images/lenovo (1).png'
import Asus from '../../../../../Components/Images/asus (1).png'
import apple from '../../../../../Components/Images/apple (3).png'
import Enterprise from '../../../../../Components/Images/optimizedstorage.jpg'
import CloudStorage from '../../../../../Components/Images/cloudstorage.jpg'
import Virtualization from '../../../../../Components/Images/virtualization.jpg'
import DataManagement from '../../../../../Components/Images/Datamanagement.jpg'
import Disaster from '../../../../../Components/Images/Disaster.png'
import Computing from '../../../../../Components/Images/HighComputing.jpg'
import { MdStorage } from "react-icons/md";
import { PiRocketFill } from "react-icons/pi";

export default function ServerSmart() {
  const storageServices = [

    {
      Image: Enterprise,
      title: "Enterprise Storage Solutions",
      description: "Scalable, high-performance storage systems for mission-critical business applications with enterprise-grade reliability.",
      features: ["SAN & NAS Implementation", "High-Availability Storage", "Performance Optimization", "24/7 Monitoring"],
      details: "Our enterprise storage solutions provide the foundation for your critical data infrastructure, ensuring optimal performance and reliability."
    },
    {
      Image: CloudStorage,
      icon: "☁️",
      title: "Cloud Storage Integration",
      description: "Hybrid cloud storage solutions that seamlessly integrate on-premises and cloud infrastructure for maximum flexibility.",
      features: ["Multi-Cloud Support", "Data Migration", "Cost Optimization", "Security Compliance"],
      details: "Bridge your on-premises and cloud environments with intelligent data placement and automated tiering strategies."
    },
    {
      Image: Virtualization,
      icon: "🖥️",
      title: "Virtualization Infrastructure",
      description: "Complete virtualization platform to maximize resource utilization and reduce infrastructure costs significantly.",
      features: ["VMware vSphere", "Hyper-V Implementation", "Virtual Desktop Infrastructure", "Container Solutions"],
      details: "Transform your IT infrastructure with cutting-edge virtualization technologies that deliver superior performance and efficiency."
    },
    {
      Image: DataManagement,
      title: "Data Management & Analytics",
      description: "Comprehensive data lifecycle management with intelligent automation and advanced analytics capabilities.",
      features: ["Data Deduplication", "Automated Tiering", "Lifecycle Management", "Performance Analytics"],
      details: "Optimize your data strategy with intelligent management tools that reduce costs and improve operational efficiency."
    },
    {
      Image: Disaster,
      title: "Backup & Disaster Recovery",
      description: "Robust backup and disaster recovery solutions ensuring business continuity and complete data protection.",
      features: ["Automated Backups", "Site-to-Site Replication", "Cloud Backup", "RTO/RPO Optimization"],
      details: "Protect your business with comprehensive disaster recovery solutions that guarantee rapid recovery and minimal downtime."
    },
    {
      Image: Computing,
      title: "High-Performance Computing",
      description: "Specialized storage solutions for high-performance computing workloads and data-intensive applications.",
      features: ["NVMe Storage", "Parallel File Systems", "GPU Storage", "Scientific Computing"],
      details: "Accelerate your most demanding workloads with purpose-built storage infrastructure designed for maximum performance."
    }
  ];

  const virtualizedBenefits = [
    { metric: "75%", label: "Cost Reduction", desc: "Infrastructure savings" },
    { metric: "99.9%", label: "Uptime", desc: "System availability" },
    { metric: "5x", label: "Faster Deployment", desc: "VM provisioning" },
    { metric: "65%", label: "Energy Savings", desc: "Power efficiency" }
  ];

  const storageTypes = [
    {
      type: "Block Storage",
      use: "Databases & Applications",
      performance: "Ultra-High IOPS",
      scalability: "Excellent",
      price: "Premium"
    },
    {
      type: "File Storage",
      use: "Content & Collaboration",
      performance: "High Performance",
      scalability: "Very Good",
      price: "Standard"
    },
    {
      type: "Object Storage",
      use: "Archive & Backup",
      performance: "Standard",
      scalability: "Unlimited",
      price: "Economic"
    }
  ];

  const technologyPartners = [
    { name: "Dragon", Image: Dragon },
    { name: "Intel", Image: Intel },
    { name: "Dell", Image: Dell },
    { name: "Acer", Image: Accer },
    { name: "Xerox", Image: Xerox },
    { name: "AMD", Image: Amd },
    { name: "HP", Image: HP },
    { name: "ViewSonic", Image: ViewSonic },
    { name: "Optoma", Image: Optoma },
    { name: "Ricoh", Image: ricoh },
    { name: "Meetion", Image: meetion },
    { name: "Logitech", Image: logitech },
    { name: "Lexar", Image: lexar },
    { name: "Kingston", Image: Kingston },
    { name: "Epson", Image: epson },
    { name: "Crucial", Image: crucial },
    { name: "Canon", Image: canon },
    { name: "Brother", Image: brother },
    { name: "BenQ", Image: benq },
    { name: "AOC", Image: aoc },
    { name: "Alienware", Image: alienware },
    { name: "Dahua", Image: adhua },
    { name: "TP-Link", Image: tplink },
    { name: "Samsung", Image: samsung },
    { name: "Razer", Image: razor },
    { name: "Microsoft", Image: microsof },
    { name: "LG", Image: lg },
    { name: "Lenovo", Image: lenovo },
    { name: "Asus", Image: Asus },
    { name: "Apple", Image: apple }
  ];



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean Design */}
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
          id="modern-storage-virtualization-section"
          aria-label="Modern Storage & Virtualization Solutions"
          className="relative w-full max-w-[1536px] mx-auto bg-gradient-to-br from-[#16CA9A]/5 to-white py-20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center bg-[#16CA9A]/10 px-4 py-2 rounded-full text-[#16CA9A] font-semibold text-sm mb-6">
                  <span className="mr-2"><MdStorage /></span>
                  STORAGE & VIRTUALIZATION
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Modern Storage &
                  <span className="block text-[#16CA9A]">Virtualization Solutions</span>
                </h2>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your IT infrastructure with enterprise-grade storage and virtualization solutions.
                  Maximize efficiency, reduce costs, and ensure scalability for your growing business needs.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {virtualizedBenefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-[#16CA9A] mb-1">{benefit.metric}</div>
                      <div className="text-sm font-semibold text-gray-800">{benefit.label}</div>
                      <div className="text-xs text-gray-500">{benefit.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#16CA9A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#14b589] transition-colors">
                    Get Assessment
                  </button>
                  <button className="border-2 border-[#16CA9A] text-[#16CA9A] px-8 py-3 rounded-lg font-semibold hover:bg-[#16CA9A] hover:text-white transition-colors">
                    View Solutions
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#16CA9A]/10 to-transparent rounded-2xl p-8">
                  <Image
                    src={NetworkingSmartImage}
                    width={500}
                    height={400}
                    alt="Storage Solutions"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
          id="storage-virtualization-services-section"
          aria-label="Our Storage & Virtualization Services"
          className="relative w-full max-w-[1536px] mx-auto py-20 bg-gray-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Storage & Virtualization Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to modernize your infrastructure and optimize performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {storageServices.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <Image src={service.Image} alt={service.title} width={800} className='w-full h-[200px] rounded-[10px] mb-5' />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500 italic">{service.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Storage Types Comparison */}
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
          id="storage-architecture-options-section"
          aria-label="Storage Architecture Options"
          className="relative w-full max-w-[1536px] mx-auto py-20 bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Storage Architecture Options
              </h2>
              <p className="text-xl text-gray-600">
                Choose the right storage solution for your specific requirements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {storageTypes.map((storage, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#16CA9A] hover:shadow-lg transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{storage.type}</h3>
                    <div className="w-16 h-1 bg-[#16CA9A] mx-auto"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary Use:</span>
                      <span className="font-semibold text-gray-900">{storage.use}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance:</span>
                      <span className="font-semibold text-[#16CA9A]">{storage.performance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scalability:</span>
                      <span className="font-semibold text-gray-900">{storage.scalability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price Point:</span>
                      <span className="font-semibold text-gray-900">{storage.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>



      {/* Implementation Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Implementation Process
            </h2>
            <p className="text-xl text-gray-600">
              Our proven methodology ensures smooth deployment and optimal results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment", desc: "Comprehensive infrastructure analysis and requirements gathering" },
              { step: "02", title: "Design", desc: "Custom solution architecture and implementation planning" },
              { step: "03", title: "Deployment", desc: "Professional installation and configuration with minimal downtime" },
              { step: "04", title: "Support", desc: "Ongoing monitoring, maintenance, and optimization services" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#16CA9A] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                <p className="text-gray-600">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
          id="ready-to-transform-infrastructure-section"
          aria-label="Ready to Transform Your Infrastructure"
          className="relative w-full max-w-[1536px] mx-auto py-20 bg-gradient-to-r from-[#16CA9A] to-[#14b589] overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm mb-6">
                  <span className="mr-2 "><PiRocketFill /></span>
                  GET STARTED TODAY
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to Transform Your
                  <span className="block">Infrastructure?</span>
                </h2>

                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Get a comprehensive assessment of your current infrastructure and discover how our storage and virtualization solutions can optimize your operations, reduce costs, and accelerate growth.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Free Infrastructure Assessment</div>
                      <div className="text-white/80 text-sm">Complete analysis of your current setup</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Custom Solution Design</div>
                      <div className="text-white/80 text-sm">Tailored to your business needs</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">24/7 Expert Support</div>
                      <div className="text-white/80 text-sm">Round-the-clock technical assistance</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Proven ROI Results</div>
                      <div className="text-white/80 text-sm">Average 75% cost reduction</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-[#16CA9A] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                    {/* <span className="mr-2">📊</span> */}
                    Schedule Free Assessment
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#16CA9A] transition-all duration-300 flex items-center justify-center">
                    {/* <span className="mr-2">💬</span> */}
                    Contact Expert Now
                  </button>
                </div>

                <div className="mt-6 flex items-center text-white/80 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No commitment required • Response within 24 hours
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <Image
                    src={SignalTower}
                    width={400}
                    height={300}
                    alt="Infrastructure"
                    className="w-full h-auto  p-4 transform rounded-[30px]"

                  />

                  {/* Stats Overlay */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#16CA9A]">99.9%</div>
                      <div className="text-xs text-gray-600 font-semibold">Uptime</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#16CA9A]">75%</div>
                      <div className="text-xs text-gray-600 font-semibold">Cost Savings</div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 right-8 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

