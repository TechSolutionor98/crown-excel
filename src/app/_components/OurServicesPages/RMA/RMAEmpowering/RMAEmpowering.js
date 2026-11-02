import React from 'react';
import Image from 'next/image';
import NetworkIT from '../../../../../Components/Images/cloudenterprise.jpg';
import IaaSIcon from '../../../../../Components/Images/iaas.png';
import PaaSIcon from '../../../../../Components/Images/paas.png';
import SaaSIcon from '../../../../../Components/Images/saas.png';
import SecurityIcon from '../../../../../Components/Images/cloud-security.png';
import HealthcareIcon from '../../../../../Components/Images/healthcare.png';
import ManufacturingIcon from '../../../../../Components/Images/manufacturing.png';
import FinancialIcon from '../../../../../Components/Images/financial.png';
import EducationIcon from '../../../../../Components/Images/education.png';
import EcommerceIcon from '../../../../../Components/Images/ecommerce.png';
import GamingIcon from '../../../../../Components/Images/gaming.png';

const RMAEmpowering = () => {
  const cloudFeatures = [
    {
      number: "01",
      title: "Cloud Migration Strategy",
      description: "Comprehensive assessment and planning for seamless migration from legacy systems to modern cloud infrastructure with zero downtime.",
      highlight: "99% Success Rate"
    },
    {
      number: "02",
      title: "Multi-Cloud Architecture",
      description: "Design and implement robust multi-cloud solutions across AWS, Azure, and Google Cloud for optimal performance and cost efficiency.",
      highlight: "40% Cost Reduction"
    },
    {
      number: "03",
      title: "Cloud Security & Compliance",
      description: "Enterprise-grade security frameworks, data encryption, and compliance management ensuring your cloud infrastructure meets industry standards.",
      highlight: "100% Secure Deployment"
    },
    {
      number: "04",
      title: "DevOps & Automation",
      description: "Streamlined CI/CD pipelines, infrastructure as code, and automated scaling solutions for rapid deployment and continuous integration.",
      highlight: "60% Faster Deployment"
    }
  ];

  const cloudStats = [
    { value: "500+", label: "Cloud Migrations" },
    { value: "99.9%", label: "Uptime Guaranteed" },
    { value: "50%", label: "Cost Optimization" },
    { value: "24/7", label: "Cloud Support" }
  ];

  const cloudServices = [
    {
      icon: IaaSIcon,
      title: "Infrastructure as a Service (IaaS)",
      description: "Scalable virtual machines, storage, and networking resources on-demand with pay-as-you-use pricing model.",
      features: ["Virtual Machines", "Auto Scaling", "Load Balancing", "Backup & Recovery"]
    },
    {
      icon: PaaSIcon,
      title: "Platform as a Service (PaaS)",
      description: "Complete development and deployment environment in the cloud with built-in development tools.",
      features: ["App Development", "Database Management", "API Gateway", "Monitoring Tools"]
    },
    {
      icon: SaaSIcon,
      title: "Software as a Service (SaaS)",
      description: "Ready-to-use software applications delivered over the internet with automatic updates and maintenance.",
      features: ["CRM Solutions", "ERP Systems", "Collaboration Tools", "Business Intelligence"]
    },
    {
      icon: SecurityIcon,
      title: "Cloud Security Services",
      description: "Comprehensive security solutions including identity management, threat detection, and compliance monitoring.",
      features: ["Identity & Access", "Threat Protection", "Data Encryption", "Compliance Management"]
    }
  ];

  const cloudTechnologies = [
    {
      category: "Public Cloud Platforms",
      items: ["Amazon AWS", "Microsoft Azure", "Google Cloud Platform", "IBM Cloud", "Oracle Cloud"]
    },
    {
      category: "Container Technologies",
      items: ["Docker", "Kubernetes", "OpenShift", "Container Registry", "Microservices"]
    },
    {
      category: "DevOps & CI/CD",
      items: ["Jenkins", "GitLab CI", "Azure DevOps", "Terraform", "Ansible"]
    },
    {
      category: "Monitoring & Analytics",
      items: ["CloudWatch", "Azure Monitor", "Google Analytics", "Prometheus", "Grafana"]
    }
  ];

  const cloudBenefits = [
    {
      title: "Cost Efficiency",
      description: "Reduce infrastructure costs by up to 50% with pay-as-you-use pricing and optimized resource allocation.",
      percentage: "50%"
    },
    {
      title: "Scalability",
      description: "Scale resources up or down instantly based on demand without hardware limitations.",
      percentage: "∞"
    },
    {
      title: "Security",
      description: "Enterprise-grade security with 99.9% uptime and advanced threat protection mechanisms.",
      percentage: "99.9%"
    },
    {
      title: "Performance",
      description: "Improve application performance by 60% with global CDN and optimized infrastructure.",
      percentage: "60%"
    }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="enterprise-cloud-solutions"
        aria-label="Enterprise Cloud Solutions"
        className="relative w-full max-w-[1536px] mx-auto min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
      >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[#16CA9A] rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border-2 border-[#084032] rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#16CA9A]/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-[#084032]/30 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero Section with Unique Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-[#16CA9A] to-[#084032] rounded-full"></div>
              <div className="pl-8">
                <span className="inline-block px-4 py-2 bg-[#16CA9A]/10 text-[#084032] text-sm font-semibold rounded-lg mb-4">
                  ☁️ Cloud Computing Excellence
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Enterprise
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">
                    Cloud Solutions
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your business with cutting-edge cloud computing solutions. We deliver scalable infrastructure,
                  seamless migration, and comprehensive cloud management services for modern enterprises.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-8">
              {cloudStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-[#16CA9A] mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pl-8">
              <a
                href="/contact-us"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Start Cloud Migration
                <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#16CA9A]/20 to-[#084032]/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={NetworkIT}
                  width={400}
                  height={300}
                  alt="Cloud Computing Solutions"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Cloud Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From infrastructure setup to application deployment, we provide end-to-end cloud solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-4 flex justify-center">
                  <Image src={service.icon} alt={service.title + ' icon'} width={40} height={40} style={{ filter: 'brightness(0)' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Technologies We Use */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cloud <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Technologies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We leverage cutting-edge cloud technologies and platforms to deliver robust, scalable solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudTechnologies.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-[#16CA9A] transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-[#16CA9A]/20">{tech.category}</h3>
                <ul className="space-y-3">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-full mr-3"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Cloud Computing?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your business operations with measurable benefits and competitive advantages through cloud adoption
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cloudBenefits.map((benefit, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032] mb-4">
                      {benefit.percentage}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Computing Process Steps - Unique Timeline Design */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Cloud Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive four-phase approach to cloud transformation ensuring smooth migration and optimal performance
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#16CA9A] to-[#084032] rounded-full transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              {cloudFeatures.map((feature, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-16`}>
                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-white border-4 border-[#16CA9A] rounded-full transform md:-translate-x-3 z-10"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        <div className="w-12 h-12 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{feature.number}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                      <div className="inline-flex items-center px-4 py-2 bg-[#16CA9A]/10 text-[#16CA9A] rounded-lg text-sm font-semibold">
                        ⚡ {feature.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Solutions */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry-Specific <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">Cloud Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored cloud computing solutions designed for specific industry requirements and compliance standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Healthcare */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center mb-6">
                <Image src={HealthcareIcon} alt="Healthcare Icon" width={48} height={48} style={{ filter: 'brightness(100)' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthcare</h3>
              <p className="text-gray-600 mb-4">
                Crown Excel is one of the leading providers in the UAE, delivering high-class networking, IT hardware, and software solutions tailored to healthcare industry standards.
              </p>
              {/* <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>HIPAA-compliant cloud solutions for patient data management</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Electronic Health Records (EHR) integration and support</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Telemedicine platforms with secure video consultation features</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Medical imaging storage and high-speed data access</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Healthcare analytics and reporting tools</li>
      </ul> */}
            </div>

            {/* Manufacturing */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center mb-6">
                <Image src={ManufacturingIcon} alt="Manufacturing Icon" width={48} height={48} style={{ filter: 'brightness(100)' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Manufacturing</h3>
              <p className="text-gray-600 mb-4">
                Crown Excel supports manufacturers in the UAE with robust IT infrastructure, advanced networking, and automation-ready software solutions designed to optimize production, enhance connectivity, and drive innovation across factory operations.
              </p>
              {/* <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Industrial networking and factory floor connectivity</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Real-time production monitoring systems</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>IoT integration for smart manufacturing</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Hardware for rugged environments and automation control</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Data collection and analytics for operational efficiency</li>
      </ul> */}
            </div>

            {/* Financial Services */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center mb-6">
                <Image src={FinancialIcon} alt="Financial Services Icon" width={48} height={48} style={{ filter: 'brightness(1) invert(1)' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Services</h3>
              <p className="text-gray-600 mb-4">
                Crown Excel delivers robust and reliable IT infrastructure, networking, and software solutions tailored to meet the dynamic needs of the manufacturing sector in the UAE, driving efficiency, productivity, and innovation.
              </p>
              {/* <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>High-security network infrastructure for banks and fintech</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Core banking and transaction system support</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Cloud-based disaster recovery and data backup</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Endpoint protection and cybersecurity solutions</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Compliance-ready data handling and encryption</li>
      </ul> */}
            </div>

            {/* Education */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center mb-6">
                <Image src={EducationIcon} alt="Education Icon" width={48} height={48} style={{ filter: 'brightness(100)' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Education</h3>
              <p className="text-gray-600 mb-4">
                Crown Excel empowers schools and universities in the UAE with innovative IT hardware, secure networking, and digital learning platforms that foster collaboration, streamline campus management, and support academic achievement.
              </p>
              {/* <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Smart classroom and e-learning infrastructure</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Campus-wide secure Wi-Fi and network management</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Learning Management System (LMS) integration</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Device management for student and faculty hardware</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Cloud-based collaboration and content sharing tools</li>
      </ul> */}
            </div>

            {/* Retail */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center mb-6">
                <Image src={EcommerceIcon} alt="Retail Icon" width={48} height={48} style={{ filter: 'brightness(1) invert(1)' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Retail</h3>
              <p className="text-gray-600 mb-4">
                Crown Excel equips retail businesses in the UAE with smart IT hardware, seamless networking, and customized software solutions that enhance operational performance and customer engagement across every touchpoint.
              </p>
              {/* <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Scalable infrastructure for online storefronts</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Secure payment gateway integrations</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Inventory and logistics management systems</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>CRM and customer engagement tools</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Real-time analytics and reporting dashboards</li>
      </ul> */}
            </div>

            {/* Gaming & Media */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-xl flex items-center justify-center mb-6">
                <Image src={GamingIcon} alt="Gaming & Media Icon" width={48} height={48} style={{ filter: 'brightness(1) invert(1)' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gaming & Media</h3>
              <p className="text-gray-600 mb-4">
                Crown Excel enables media and gaming companies in the UAE to deliver immersive experiences with high-performance IT infrastructure, ultra-fast networking, and scalable cloud platforms designed for creative workflows, live streaming, and digital content delivery.
              </p>
              {/* <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>High-speed data transfer and storage for large media files</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Post-production and editing suite optimization</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Broadcast-ready infrastructure and network reliability</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Live streaming and content delivery systems</li>
        <li className="flex items-center"><div className="w-2 h-2 bg-[#16CA9A] rounded-full mr-3"></div>Collaborative cloud platforms for media teams</li>
      </ul> */}
            </div>
          </div>
        </div>


        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of companies who have successfully migrated to the cloud with our expert guidance and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact-us"
                className="inline-flex items-center px-8 py-4 bg-white text-[#084032] font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                Start Cloud Journey
              </a>
              <a
                href="/our-services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#084032] transition-colors duration-300"
              >
                Explore Cloud Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default RMAEmpowering;
