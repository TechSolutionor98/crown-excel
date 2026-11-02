import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NetworkIT from '../../../../../Components/Images/NetworkingSolutions.jpg';
import InfraIcon from '../../../../../Components/Images/network-infra.png';
import WirelessIcon from '../../../../../Components/Images/wireless.png';
import SecurityIcon from '../../../../../Components/Images/security.png';
import MonitoringIcon from '../../../../../Components/Images/monitoring.png';
import Icon5G from '../../../../../Components/Images/5g.png';
import IconCloud from '../../../../../Components/Images/Cloud Networking.png';
import IconAI from '../../../../../Components/Images/AI-Powered Analytics.png';
import IconHealthcare from '../../../../../Components/Images/healthcare.png';
import IconEducation from '../../../../../Components/Images/education.png';
import IconManufacturing from '../../../../../Components/Images/manufacturing.png';
import IconRetail from '../../../../../Components/Images/retail.png';
import IconCheck from '../../../../../Components/Images/check.png';
import { safeRender, safeImage } from '@/lib/safe-html';

const NetworkEmpowering = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};

  // Header Section
  const headerBadge = safeRender(fields.badge, "Enterprise Networking Solutions");
  const headerHeading = safeRender(fields.heading, <>Complete Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Infrastructure</span></>);
  const headerDesc = safeRender(fields.paragraph, "From design to deployment, we provide end-to-end networking solutions that scale with your business and ensure seamless connectivity.");

  // Services Grid
  const networkServices = [
    {
      id: 1,
      title: safeRender(fields.service_1_title, "Network Infrastructure Design"),
      description: safeRender(fields.service_1_desc, "Complete network architecture planning with scalable solutions for enterprise growth."),
      features: [
        safeRender(fields.service_1_feat_1, "LAN/WAN Setup"),
        safeRender(fields.service_1_feat_2, "Network Topology"),
        safeRender(fields.service_1_feat_3, "Bandwidth Planning"),
        safeRender(fields.service_1_feat_4, "Future Scaling")
      ],
      icon: safeImage(fields.image_infraicon, InfraIcon)
    },
    {
      id: 2,
      title: safeRender(fields.service_2_title, "Wireless Solutions"),
      description: safeRender(fields.service_2_desc, "High-performance WiFi networks with seamless coverage and advanced security protocols."),
      features: [
        safeRender(fields.service_2_feat_1, "WiFi 6 Technology"),
        safeRender(fields.service_2_feat_2, "Mesh Networks"),
        safeRender(fields.service_2_feat_3, "Guest Access"),
        safeRender(fields.service_2_feat_4, "Coverage Analysis")
      ],
      icon: safeImage(fields.image_wirelessicon, WirelessIcon)
    },
    {
      id: 3,
      title: safeRender(fields.service_3_title, "Network Security"),
      description: safeRender(fields.service_3_desc, "Comprehensive security framework to protect your network from cyber threats."),
      features: [
        safeRender(fields.service_3_feat_1, "Firewall Setup"),
        safeRender(fields.service_3_feat_2, "VPN Solutions"),
        safeRender(fields.service_3_feat_3, "Threat Detection"),
        safeRender(fields.service_3_feat_4, "Access Control")
      ],
      icon: safeImage(fields.image_securityicon, SecurityIcon)
    },
    {
      id: 4,
      title: safeRender(fields.service_4_title, "Network Monitoring"),
      description: safeRender(fields.service_4_desc, "24/7 network monitoring and maintenance to ensure optimal performance and uptime."),
      features: [
        safeRender(fields.service_4_feat_1, "Real-time Monitoring"),
        safeRender(fields.service_4_feat_2, "Performance Analytics"),
        safeRender(fields.service_4_feat_3, "Fault Detection"),
        safeRender(fields.service_4_feat_4, "Remote Support")
      ],
      icon: safeImage(fields.image_monitoringicon, MonitoringIcon)
    }
  ];

  // Why Choose Section
  const whyHeading = safeRender(fields.heading_2, "Why Choose Our Networking Solutions?");
  const whyDesc = safeRender(fields.paragraph_2, "Our comprehensive networking approach ensures your business stays connected, secure, and scalable. We combine cutting-edge technology with proven methodologies to deliver exceptional results.");

  const benefits = [
    {
      title: safeRender(fields.benefit_1_title, "Enterprise-Grade Security"),
      desc: safeRender(fields.benefit_1_desc, "Advanced security protocols and monitoring systems protect your network 24/7."),
      useIcon: true
    },
    {
      title: safeRender(fields.benefit_2_title, "Scalable Architecture"),
      desc: safeRender(fields.benefit_2_desc, "Future-ready infrastructure that grows with your business needs."),
      useIcon: false
    },
    {
      title: safeRender(fields.benefit_3_title, "Expert Support Team"),
      desc: safeRender(fields.benefit_3_desc, "Dedicated network engineers available round-the-clock for support."),
      useIcon: false
    }
  ];

  const buttonText = safeRender(fields.button_text, "Schedule Network Consultation");
  const buttonLink = fields.button_link || "/contact-us";
  const networkItImg = safeImage(fields.image_networkit, NetworkIT);
  const checkIcon = safeImage(fields.image_iconcheck, IconCheck);

  // Network Technologies
  const techHeading = safeRender(fields.heading_3, <>Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Network Technologies</span></>);
  const techDesc = safeRender(fields.paragraph_3, "We leverage the latest networking technologies to deliver superior performance and reliability");

  const techItems = [
    {
      title: safeRender(fields.tech_1_title, "5G Integration"),
      desc: safeRender(fields.tech_1_desc, "Ultra-fast connectivity with low latency for mission-critical applications"),
      icon: safeImage(fields.image_icon5g, Icon5G),
      style: {}
    },
    {
      title: safeRender(fields.tech_2_title, "Cloud Networking"),
      desc: safeRender(fields.tech_2_desc, "Hybrid cloud solutions for seamless on-premise and cloud integration"),
      icon: safeImage(fields.image_iconcloud, IconCloud),
      style: { filter: 'brightness(1) invert(1)' }
    },
    {
      title: safeRender(fields.tech_3_title, "AI-Powered Analytics"),
      desc: safeRender(fields.tech_3_desc, "Intelligent network optimization with predictive maintenance capabilities"),
      icon: safeImage(fields.image_iconai, IconAI),
      style: { filter: 'brightness(1) invert(1)' }
    }
  ];

  // Industry Solutions
  const industryHeading = safeRender(fields.heading_4, <>Industry-Specific <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Network Solutions</span></>);
  const industryDesc = safeRender(fields.paragraph_4, "Tailored networking solutions designed for your industry's unique requirements");

  const industries = [
    {
      title: safeRender(fields.ind_1_title, "Healthcare"),
      desc: safeRender(fields.ind_1_desc, "Crown Excel is one of the leading providers in the UAE, delivering high-class networking, IT hardware, and software solutions tailored to healthcare industry standards."),
      icon: safeImage(fields.image_iconhealthcare, IconHealthcare)
    },
    {
      title: safeRender(fields.ind_2_title, "Education"),
      desc: safeRender(fields.ind_2_desc, "Crown Excel empowers educational institutions across the UAE with cutting-edge networking, IT hardware, and software solutions designed to support modern learning environments and academic excellence."),
      icon: safeImage(fields.image_iconeducation, IconEducation)
    },
    {
      title: safeRender(fields.ind_3_title, "Manufacturing"),
      desc: safeRender(fields.ind_3_desc, "Crown Excel delivers robust and reliable IT infrastructure, networking, and software solutions tailored to meet the dynamic needs of the manufacturing sector in the UAE, driving efficiency, productivity, and innovation."),
      icon: safeImage(fields.image_iconmanufacturing, IconManufacturing)
    },
    {
      title: safeRender(fields.ind_4_title, "Retail"),
      desc: safeRender(fields.ind_4_desc, "Crown Excel equips retail businesses in the UAE with smart IT hardware, seamless networking, and customized software solutions that enhance operational performance and customer engagement across every touchpoint."),
      icon: safeImage(fields.image_iconretail, IconRetail)
    }
  ];

  // Implementation Process
  const processHeading = safeRender(fields.heading_5, <>Our Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Implementation Process</span></>);
  const processDesc = safeRender(fields.paragraph_5, "A systematic approach ensuring successful network deployment from planning to optimization");

  const processSteps = [
    {
      number: safeRender(fields.step_1_number, "1"),
      title: safeRender(fields.step_1_title, "Assessment"),
      desc: safeRender(fields.step_1_desc, "Comprehensive analysis of current infrastructure and future requirements")
    },
    {
      number: safeRender(fields.step_2_number, "2"),
      title: safeRender(fields.step_2_title, "Design"),
      desc: safeRender(fields.step_2_desc, "Custom network architecture tailored to your specific business needs")
    },
    {
      number: safeRender(fields.step_3_number, "3"),
      title: safeRender(fields.step_3_title, "Deployment"),
      desc: safeRender(fields.step_3_desc, "Professional installation with minimal disruption to operations")
    },
    {
      number: safeRender(fields.step_4_number, "4"),
      title: safeRender(fields.step_4_title, "Optimization"),
      desc: safeRender(fields.step_4_desc, "Continuous monitoring and performance tuning for optimal results")
    }
  ];

  // Network Performance Metrics
  const metricsHeading = safeRender(fields.heading_6, "Network Performance Metrics");
  const metricsDesc = safeRender(fields.paragraph_6, "Proven results across enterprise deployments");

  const networkStats = [
    { value: safeRender(fields.stat_1_value, "99.9%"), label: safeRender(fields.stat_1_label, "Network Uptime") },
    { value: safeRender(fields.stat_2_value, "24/7"), label: safeRender(fields.stat_2_label, "Technical Support") },
    { value: safeRender(fields.stat_3_value, "500+"), label: safeRender(fields.stat_3_label, "Networks Deployed") },
    { value: safeRender(fields.stat_4_value, "10Gb"), label: safeRender(fields.stat_4_label, "Maximum Speed") }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="complete-network-infrastructure"
        aria-label="Complete Network Infrastructure"
        className="relative w-full max-w-[1536px] mx-auto py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
      >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-[#16CA9A]/5 to-transparent rounded-full -top-48 -left-48"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-[#084032]/5 to-transparent rounded-full top-1/2 -right-32"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white font-semibold rounded-full mb-6">
            <span className="text-sm">{headerBadge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-montserrat">
            {headerHeading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {headerDesc}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {networkServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-[#16CA9A] group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <Image src={service.icon} alt={service.title + ' icon'} width={40} height={40} style={{ filter: 'brightness(0)' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-montserrat">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-full"></div>
                    <span className="text-xs text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4 font-montserrat">
                {whyHeading}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {whyDesc}
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-full flex items-center justify-center flex-shrink-0">
                    {benefit.useIcon ? (
                      <Image src={checkIcon} alt="Check" width={20} height={20} />
                    ) : (
                      <span className="text-white font-bold text-sm">✓</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link 
                href={buttonLink}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {buttonText}
                  <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src={networkItImg}
                width={800}
                height={350}
                alt="Network Infrastructure"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#16CA9A]/20 to-[#084032]/20 rounded-2xl blur-xl"></div>
          </div>
        </div>

        {/* Network Technologies Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-montserrat">
              {techHeading}
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {techDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {techItems.map((tech, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image src={tech.icon} alt={tech.title} width={40} height={40} style={tech.style} />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{tech.title}</h4>
                <p className="text-gray-600 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Solutions Section */}
        <div className="mb-16">
          <div className="text-center mb-12 ">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-montserrat">
              {industryHeading}
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {industryDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#16CA9A]">
                <Image src={ind.icon} alt={ind.title} width={32} height={32} style={{ filter: 'brightness(0)' }} />
                <h4 className="text-lg font-bold text-gray-800 mb-2 mt-3">{ind.title}</h4>
                <p className="text-gray-600 text-sm">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Process Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-montserrat">
              {processHeading}
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {processDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{metricsHeading}</h3>
            <p className="text-white/80">{metricsDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {networkStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default NetworkEmpowering;
