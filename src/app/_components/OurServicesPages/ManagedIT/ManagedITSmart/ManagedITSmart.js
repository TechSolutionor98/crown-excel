import React from 'react';
import NetworkingSmartImage from '../../../../../Components/Images/Itinfrastructure.jpg';
import SignalTower from '../../../../../Components/Images/signaltower.png';
import Image from 'next/image';
import Link from 'next/link';
// import Server from '../../../../../Components/Images/coreinfrastrucutre.jpg';
import Storage from '../../../../../Components/Images/storagesolutions.jpg';
import Network from '../../../../../Components/Images/networkinfrastructure.jpg';
import Monitoring from '../../../../../Components/Images/networkinfrastructure.jpg';
import Security from '../../../../../Components/Images/Security2.jpg';
import Virtualization from '../../../../../Components/Images/Virtualization2.jpg';
import Server from '../../../../../Components/Images/coreinfrastrucutre2.jpg';
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
import { MdManageAccounts } from "react-icons/md";
import { FaUniversalAccess } from "react-icons/fa";
import { GrDeploy } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { safeRender, safeImage } from '@/lib/safe-html';

const ManagedITSmart = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};

  // Hero section fields
  const headingAccent = safeRender(fields.heading, <>IT<span className="text-[#16CA9A]">.</span></>);
  const headingTitle = safeRender(fields.heading_2, "Infrastructure");
  const heroSubtitle = safeRender(fields.paragraph, "Excellence Redefined");
  const heroDescCard = safeRender(fields.paragraph_2, "Revolutionary IT infrastructure management combining cutting-edge technology, enterprise security, and 24/7 operational excellence for unstoppable business growth.");
  const btn1Text = safeRender(fields.button_1_text, "Transform My Infrastructure");
  const btn1Link = fields.button_1_link || "/contact-us";
  const btn2Text = safeRender(fields.button_2_text, "Watch Demo");
  const signalTowerImg = safeImage(fields.image_signaltower, SignalTower);
  const netSmartImg = safeImage(fields.image_networkingsmartimage, NetworkingSmartImage);

  // Core Infrastructure section fields
  const coreHeading = safeRender(fields.heading_3, <><span className="text-[#16CA9A]">CORE</span> INFRASTRUCTURE</>);
  const coreSubtitle = safeRender(fields.paragraph_3, "Six pillars of excellence forming the foundation of modern enterprise infrastructure");

  const infrastructureServices = [
    {
      title: safeRender(fields.pillar_1_title, "Server Infrastructure"),
      description: safeRender(fields.pillar_1_desc, "Enterprise-grade server solutions with high availability, load balancing, and redundancy for mission-critical applications."),
      features: ["Physical & Virtual Servers", "Load Balancing", "High Availability Clusters", "Server Monitoring"],
      Image: safeImage(fields.image_server, Server),
      metric: safeRender(fields.pillar_1_metric, "99.9%"),
      metricLabel: safeRender(fields.pillar_1_metric_label, "Uptime")
    },
    {
      title: safeRender(fields.pillar_2_title, "Network Infrastructure"),
      description: safeRender(fields.pillar_2_desc, "Robust network architecture design with advanced security, optimal performance, and seamless connectivity across all locations."),
      features: ["Network Design", "Firewall Configuration", "VPN Setup", "Bandwidth Optimization"],
      Image: safeImage(fields.image_network, Network),
      metric: safeRender(fields.pillar_2_metric, "24/7"),
      metricLabel: safeRender(fields.pillar_2_metric_label, "Monitoring")
    },
    {
      title: safeRender(fields.pillar_3_title, "Storage Solutions"),
      description: safeRender(fields.pillar_3_desc, "Scalable storage systems with automated backup, disaster recovery, and data protection for business continuity."),
      features: ["SAN/NAS Storage", "Backup Solutions", "Disaster Recovery", "Data Archiving"],
      Image: safeImage(fields.image_storage, Storage),
      metric: safeRender(fields.pillar_3_metric, "100%"),
      metricLabel: safeRender(fields.pillar_3_metric_label, "Data Security")
    },
    {
      title: safeRender(fields.pillar_4_title, "Virtualization"),
      description: safeRender(fields.pillar_4_desc, "Complete virtualization solutions to maximize resource utilization, reduce costs, and improve system flexibility."),
      features: ["VMware Solutions", "Hyper-V Implementation", "Virtual Desktop Infrastructure", "Container Solutions"],
      Image: safeImage(fields.image_virtualization, Virtualization),
      metric: safeRender(fields.pillar_4_metric, "60%"),
      metricLabel: safeRender(fields.pillar_4_metric_label, "Cost Savings")
    },
    {
      title: safeRender(fields.pillar_5_title, "Security Infrastructure"),
      description: safeRender(fields.pillar_5_desc, "Multi-layered security framework protecting your IT assets from cyber threats and ensuring compliance."),
      features: ["Endpoint Protection", "Network Security", "Identity Management", "Compliance Monitoring"],
      Image: safeImage(fields.image_security, Security),
      metric: safeRender(fields.pillar_5_metric, "Zero"),
      metricLabel: safeRender(fields.pillar_5_metric_label, "Breaches")
    },
    {
      title: safeRender(fields.pillar_6_title, "Monitoring & Management"),
      description: safeRender(fields.pillar_6_desc, "24/7 proactive monitoring with real-time alerts, performance optimization, and automated maintenance."),
      features: ["Real-time Monitoring", "Performance Analytics", "Automated Alerts", "Remote Management"],
      Image: safeImage(fields.image_monitoring, Monitoring),
      metric: safeRender(fields.pillar_6_metric, "15min"),
      metricLabel: safeRender(fields.pillar_6_metric_label, "Response Time")
    }
  ];

  // Management Cycle fields
  const cycleHeading = safeRender(fields.heading_4, <>MANAGEMENT <span className="text-[#16CA9A]">CYCLE</span></>);
  const cycleCenter1 = safeRender(fields.cycle_center_1, "IT");
  const cycleCenter2 = safeRender(fields.cycle_center_2, "EXCELLENCE");

  const managementPhases = [
    { phase: safeRender(fields.phase_1_name, "ACCESS"), title: safeRender(fields.phase_1_title, "Infrastructure Analysis"), icon: <FaUniversalAccess />, color: "from-[#16CA9A] to-[#119472]" },
    { phase: safeRender(fields.phase_2_name, "PLAN"), title: safeRender(fields.phase_2_title, "Strategic Roadmap"), icon: <SlCalender />, color: "from-[#119472] to-[#13745a]" },
    { phase: safeRender(fields.phase_3_name, "DEPLOY"), title: safeRender(fields.phase_3_title, "Implementation"), icon: <GrDeploy />, color: "from-[#13745a] to-[#0d5c47]" },
    { phase: safeRender(fields.phase_4_name, "MANAGE"), title: safeRender(fields.phase_4_title, "Ongoing Support"), icon: <MdManageAccounts />, color: "from-[#0d5c47] to-[#084032]" }
  ];

  // Split CTA fields
  const cta1Heading = safeRender(fields.heading_5, "Ready to Transform?");
  const cta1Desc = safeRender(fields.paragraph_4, "Join the infrastructure revolution with enterprise-grade solutions that scale with your ambitions.");
  const cta1BtnText = safeRender(fields.cta_1_button_text, "Start Revolution");
  const cta1BtnLink = fields.cta_1_button_link || "/contact-us";

  const cta2Heading = safeRender(fields.heading_6, "Need Consultation?");
  const cta2Desc = safeRender(fields.paragraph_5, "Expert guidance for complex infrastructure challenges and strategic technology decisions.");
  const cta2BtnText = safeRender(fields.cta_2_button_text, "Book Consultation");
  const cta2BtnLink = fields.cta_2_button_link || "/our-services";

  // Technology Partners fields
  const partnersHeading = safeRender(fields.heading_7, "Technology Partners");
  const partnersDesc = safeRender(fields.paragraph_6, "We work with industry-leading technology partners to deliver best-in-class solutions");

  const technologyPartners = [
    { name: "Dragon", Image: safeImage(fields.image_dragon, Dragon) },
    { name: "Intel", Image: safeImage(fields.image_intel, Intel) },
    { name: "Dell", Image: safeImage(fields.image_dell, Dell) },
    { name: "Acer", Image: safeImage(fields.image_accer, Accer) },
    { name: "Xerox", Image: safeImage(fields.image_xerox, Xerox) },
    { name: "AMD", Image: safeImage(fields.image_amd, Amd) },
    { name: "HP", Image: safeImage(fields.image_hp, HP) },
    { name: "ViewSonic", Image: safeImage(fields.image_viewsonic, ViewSonic) },
    { name: "Optoma", Image: safeImage(fields.image_optoma, Optoma) },
    { name: "Ricoh", Image: safeImage(fields.image_ricoh, ricoh) },
    { name: "Meetion", Image: safeImage(fields.image_meetion, meetion) },
    { name: "Logitech", Image: safeImage(fields.image_logitech, logitech) },
    { name: "Lexar", Image: safeImage(fields.image_lexar, lexar) },
    { name: "Kingston", Image: safeImage(fields.image_kingston, Kingston) },
    { name: "Epson", Image: safeImage(fields.image_epson, epson) },
    { name: "Crucial", Image: safeImage(fields.image_crucial, crucial) },
    { name: "Canon", Image: safeImage(fields.image_canon, canon) },
    { name: "Brother", Image: safeImage(fields.image_brother, brother) },
    { name: "BenQ", Image: safeImage(fields.image_benq, benq) },
    { name: "AOC", Image: safeImage(fields.image_aoc, aoc) },
    { name: "Alienware", Image: safeImage(fields.image_alienware, alienware) },
    { name: "Dahua", Image: safeImage(fields.image_adhua, adhua) },
    { name: "TP-Link", Image: safeImage(fields.image_tplink, tplink) },
    { name: "Samsung", Image: safeImage(fields.image_samsung, samsung) },
    { name: "Razer", Image: safeImage(fields.image_razor, razor) },
    { name: "Microsoft", Image: safeImage(fields.image_microsof, microsof) },
    { name: "LG", Image: safeImage(fields.image_lg, lg) },
    { name: "Lenovo", Image: safeImage(fields.image_lenovo, lenovo) },
    { name: "Asus", Image: safeImage(fields.image_asus, Asus) },
    { name: "Apple", Image: safeImage(fields.image_apple, apple) }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="it-infrastructure-section"
        aria-label="IT Infrastructure Solutions"
        className="relative w-full max-w-[1536px] mx-auto min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white overflow-hidden"
      >
      {/* Unique Hexagonal Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
          <div className="w-full h-full bg-[#16CA9A]"></div>
        </div>
        <div className="absolute top-40 right-20 w-24 h-24" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
          <div className="w-full h-full bg-[#119472]"></div>
        </div>
        <div className="absolute bottom-32 left-32 w-28 h-28" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
          <div className="w-full h-full bg-[#13745a]"></div>
        </div>
        <div className="absolute bottom-10 right-40 w-36 h-36" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
          <div className="w-full h-full bg-[#0d5c47]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Unique Diagonal Split Hero */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#16CA9A]/5 to-transparent transform skew-y-1"></div>
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-20 bg-gradient-to-b from-[#16CA9A] to-[#084032] rounded-full"></div>
                <div>
                  <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-none tracking-tight">
                    {headingAccent}
                  </h2>
                  <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">
                    {headingTitle}
                  </h2>
                  <p className="text-xl text-gray-600 mt-2">{heroSubtitle}</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {heroDescCard}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={btn1Link}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <Image src={signalTowerImg} width={20} height={20} alt="" className="mr-3" />
                  {btn1Text}
                  <svg className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <button className="inline-flex items-center px-6 py-4 border-2 border-[#16CA9A] text-[#16CA9A] font-bold rounded-2xl hover:bg-[#16CA9A] hover:text-white transition-all duration-300">
                  {btn2Text}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-3xl transform rotate-2"></div>
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                  <Image
                    src={netSmartImg}
                    width={500}
                    height={400}
                    alt="IT Infrastructure Excellence"
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#16CA9A] rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unique Honeycomb Services Layout */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              {coreHeading}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              {coreSubtitle}
            </p>
          </div>

          {/* Honeycomb Grid Layout */}
          <div className="relative">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
              {infrastructureServices.map((service, index) => (
                <div
                  key={index}
                  className=" w-full h-110 bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-between items-left text-left transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full h-50 rounded">
                    <Image
                      alt={service.title}
                      src={service.Image}
                      fill
                      // width={350}
                      // height={200}
                      className="rounded"
                    />
                  </div>

                  <div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {service.title}
                    </h3>

                    {/* Metric */}
                    <div className="text-2xl font-semibold text-[#16CA9A]">
                      {service.metric}
                    </div>

                    {/* Metric Label */}
                    <div className="text-sm text-gray-700 mb-2">{service.metricLabel}</div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-snug">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Unique Radial Process Flow */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              {cycleHeading}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6"></div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative w-96 h-96">
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#16CA9A] to-[#084032] rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-white text-center">
                  <div className="text-2xl font-black">{cycleCenter1}</div>
                  <div className="text-sm font-semibold">{cycleCenter2}</div>
                </div>
              </div>

              {/* Orbital Elements */}
              {managementPhases.map((phase, index) => {
                const angle = (index * 90) - 45; // 90 degrees apart, starting at -45
                const radius = 140;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;

                return (
                  <div
                    key={index}
                    className="absolute w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${phase.color} rounded-full flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                      <div className="text-2xl mb-1">{phase.icon}</div>
                      <div className="text-xs font-bold">{phase.phase}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Unique Split CTA */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-[#16CA9A] to-[#084032] p-12 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
                <div className="w-full h-full bg-white"></div>
              </div>
              <h3 className="text-4xl font-black mb-6">{cta1Heading}</h3>
              <p className="text-xl mb-8 opacity-90">
                {cta1Desc}
              </p>
              <Link
                href={cta1BtnLink}
                className="inline-flex items-center px-8 py-4 bg-white text-[#084032] font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                {cta1BtnText}
              </Link>
            </div>
            <div className="bg-gray-900 p-12 text-white relative">
              <div className="absolute bottom-0 left-0 w-28 h-28 opacity-20" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
                <div className="w-full h-full bg-[#16CA9A]"></div>
              </div>
              <h3 className="text-4xl font-black mb-6">{cta2Heading}</h3>
              <p className="text-xl mb-8 opacity-90">
                {cta2Desc}
              </p>
              <Link
                href={cta2BtnLink}
                className="inline-flex items-center px-8 py-4 border-2 border-[#16CA9A] text-[#16CA9A] font-bold rounded-xl hover:bg-[#16CA9A] hover:text-white transition-colors duration-300"
              >
                {cta2BtnText}
              </Link>
            </div>
          </div>
        </div>
        {/* Technology Partners */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {partnersHeading}
              </h2>
              <p className="text-xl text-gray-600">
                {partnersDesc}
              </p>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-8">
              <div className='flex items-center justify-center flex-wrap gap-8 w-[800px]'>
                {technologyPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[30px] w-[100px] h-[100px]  flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <Image
                      src={partner.Image}
                      alt={partner.name}
                      width={60}
                      height={60}
                      className="transform transition-transform duration-300 group-hover:-translate-y-2"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </div>
    </section>
  </div>
  );
};

export default ManagedITSmart;
