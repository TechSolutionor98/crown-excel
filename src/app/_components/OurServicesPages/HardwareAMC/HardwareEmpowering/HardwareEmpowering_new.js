"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import empoweringImage from '../../../../../Components/Images/networkempower.png';
import NetworkIT from '../../../../../Components/Images/hardwareempowering.png';
import Dirham from '../../../../../Components/Images/dirham.png';
import ITservice from '../../../../../Components/Images/serviceIt.png';
import Support from '../../../../../Components/Images/support.png';
import Proactive from '../../../../../Components/Images/proacitve.png';
import Cost from '../../../../../Components/Images/cost.png';
import Rapid from '../../../../../Components/Images/rapid.png';
import Security from '../../../../../Components/Images/security3.png';
import { BsLightningChargeFill } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import { safeRender, safeImage } from '@/lib/safe-html';

const HardwareEmpowering = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};

  // Get quote function
  const getQuote = () => {
    window.location.href = fields.button_1_link || '/contact-us';
  };

  // Hero Section
  const heroBadge = safeRender(fields.badge, "BUSINESS MANAGEMENT SERVICES");
  const heroHeading1 = safeRender(fields.heading, "Hand Over All Your Business Work");
  const heroHeading2 = safeRender(fields.heading_2, "We Handle Everything");
  const heroHeading3 = safeRender(fields.heading_3, "POS, Software, Operations—No Worries!");
  const heroDesc = safeRender(fields.paragraph, "With Crown Excel, you don’t need to worry about your business systems, POS, or software. We take full responsibility for your operations—maintenance, repairs, upgrades, software management, and support. Just hand over your business work and relax. We’ll keep everything running, secure, and up-to-date, so you can focus on growth.");
  const heroBtn1Text = safeRender(fields.button_1_text, "Get AMC Quote");
  const heroBtn1Link = fields.button_1_link || "/contact-us";
  const heroBtn2Text = safeRender(fields.button_2_text, "Emergency Support");
  const heroImage = safeImage(fields.image_empoweringimage, empoweringImage);

  // Key Stats
  const industryStats = [
    {
      number: safeRender(fields.stat_1_number, "500+"),
      label: safeRender(fields.stat_1_label, "Ongoing AMC Contracts"),
      sublabel: safeRender(fields.stat_1_sublabel, "Across all business types"),
      useDirham: false
    },
    {
      number: safeRender(fields.stat_2_number, "99.9%"),
      label: safeRender(fields.stat_2_label, "Average Uptime"),
      sublabel: safeRender(fields.stat_2_sublabel, "Business systems managed"),
      useDirham: false
    },
    {
      number: safeRender(fields.stat_3_number, "30 mins"),
      label: safeRender(fields.stat_3_label, "Avg. Response"),
      sublabel: safeRender(fields.stat_3_sublabel, "Emergency support"),
      useDirham: false
    },
    {
      number: safeRender(fields.stat_4_number, "50%+"),
      label: safeRender(fields.stat_4_label, "Cost Savings"),
      sublabel: safeRender(fields.stat_4_sublabel, "Annual client savings"),
      useDirham: true
    }
  ];

  // AMC Plans Section
  const plansHeading = safeRender(fields.heading_4, <>AMC <span className="text-[#16CA9A]">PLANS</span></>);
  const plansSubtitle = safeRender(fields.paragraph_2, "Short or long term—choose the AMC that fits your business. We handle everything for you!");

  const amcPlans = [
    {
      type: safeRender(fields.plan_1_type, "Short Term AMC"),
      duration: safeRender(fields.plan_1_duration, "1-6 Months"),
      title: safeRender(fields.plan_1_title, "Quick Business & IT Support"),
      subtitle: safeRender(fields.plan_1_subtitle, "Immediate help for your business systems, software, POS, and more"),
      features: [
        safeRender(fields.plan_1_feat_1, "Rapid troubleshooting for business systems"),
        safeRender(fields.plan_1_feat_2, "Emergency support for POS, billing, and software"),
        safeRender(fields.plan_1_feat_3, "Software installation, updates & bug fixes"),
        safeRender(fields.plan_1_feat_4, "Basic preventive maintenance schedules"),
        safeRender(fields.plan_1_feat_5, "24/7 technical support hotline"),
        safeRender(fields.plan_1_feat_6, "On-site visits for business operations (monthly)"),
        safeRender(fields.plan_1_feat_7, "System health monitoring reports")
      ],
      benefits: safeRender(fields.plan_1_benefits, "Best for startups, shops, and urgent business needs"),
      buttonText: safeRender(fields.plan_1_button_text, "Request Short Term AMC Consultation"),
      icon: <BsLightningChargeFill />,
      color: "from-[#16CA9A] to-[#119472]",
      uptime: safeRender(fields.plan_1_uptime, "99.5%"),
      response: safeRender(fields.plan_1_response, "4 Hours")
    },
    {
      type: safeRender(fields.plan_2_type, "Long Term AMC"),
      duration: safeRender(fields.plan_2_duration, "6 Months - 3 Years"),
      title: safeRender(fields.plan_2_title, "Complete Business & IT Management"),
      subtitle: safeRender(fields.plan_2_subtitle, "We handle all your business operations, software, POS, and IT needs"),
      features: [
        safeRender(fields.plan_2_feat_1, "Full system maintenance & upgrades"),
        safeRender(fields.plan_2_feat_2, "POS & billing software management"),
        safeRender(fields.plan_2_feat_3, "Regular check-ups for business operations"),
        safeRender(fields.plan_2_feat_4, "Software license management & renewals"),
        safeRender(fields.plan_2_feat_5, "Priority support & rapid issue resolution"),
        safeRender(fields.plan_2_feat_6, "Advanced monitoring & reporting dashboards"),
        safeRender(fields.plan_2_feat_7, "Dedicated account manager & technical team"),
        safeRender(fields.plan_2_feat_8, "Annual business technology consultation")
      ],
      benefits: safeRender(fields.plan_2_benefits, "Ideal for enterprises, retail, and those who want total peace of mind"),
      buttonText: safeRender(fields.plan_2_button_text, "Request Long Term AMC Consultation"),
      icon: <MdSecurity />,
      color: "from-[#13745a] to-[#084032]",
      uptime: safeRender(fields.plan_2_uptime, "99.9%"),
      response: safeRender(fields.plan_2_response, "2 Hours")
    }
  ];

  // Service Features (Why Choose Crown Excel AMC?)
  const whyHeading = safeRender(fields.heading_5, <>WHY CHOOSE <span className="text-[#16CA9A]">CROWN EXCEL AMC?</span></>);

  const serviceFeatures = [
    {
      title: safeRender(fields.feature_1_title, "Business & IT Experts"),
      desc: safeRender(fields.feature_1_desc, "Specialists in business operations, POS, billing, and software management"),
      metric: safeRender(fields.feature_1_metric, "200+ Certified Engineers"),
      Image: safeImage(fields.image_itservice, ITservice)
    },
    {
      title: safeRender(fields.feature_2_title, "24/7 Priority Support"),
      desc: safeRender(fields.feature_2_desc, "Round-the-clock help for any business, POS, or software issue"),
      metric: safeRender(fields.feature_2_metric, "2-4 Hour Response"),
      Image: safeImage(fields.image_support, Support)
    },
    {
      title: safeRender(fields.feature_3_title, "Proactive Monitoring"),
      desc: safeRender(fields.feature_3_desc, "Real-time tracking of business systems, POS, and software updates"),
      metric: safeRender(fields.feature_3_metric, "99.9% Uptime Guarantee"),
      Image: safeImage(fields.image_proactive, Proactive)
    },
    {
      title: safeRender(fields.feature_4_title, "Cost Optimization"),
      desc: safeRender(fields.feature_4_desc, "Reduce expenses and improve business efficiency with smart management"),
      metric: safeRender(fields.feature_4_metric, "40% Cost Reduction"),
      Image: safeImage(fields.image_cost, Cost)
    },
    {
      title: safeRender(fields.feature_5_title, "Rapid Deployment"),
      desc: safeRender(fields.feature_5_desc, "Quick setup and integration for your business and POS systems"),
      metric: safeRender(fields.feature_5_metric, "24 Hour Setup"),
      Image: safeImage(fields.image_rapid, Rapid)
    },
    {
      title: safeRender(fields.feature_6_title, "Security & Compliance"),
      desc: safeRender(fields.feature_6_desc, "We keep your business data and software secure and compliant"),
      metric: safeRender(fields.feature_6_metric, "100% Compliant"),
      Image: safeImage(fields.image_security, Security)
    }
  ];

  // Coverage Areas (What We Handle For You)
  const handleHeading = safeRender(fields.heading_6, <>WHAT WE HANDLE <span className="text-[#16CA9A]">FOR YOU</span></>);
  const handleSubtitle = safeRender(fields.paragraph_3, "Hardware, software, support, and more—just hand over your IT work and be worry-free!");

  const coverageAreas = [
    {
      category: safeRender(fields.category_1_name, "What We Manage"),
      items: [
        safeRender(fields.cat_1_item_1, "Business Operations"),
        safeRender(fields.cat_1_item_2, "POS & Billing Software"),
        safeRender(fields.cat_1_item_3, "Inventory & CRM Systems"),
        safeRender(fields.cat_1_item_4, "Cloud Services"),
        safeRender(fields.cat_1_item_5, "Software Licensing"),
        safeRender(fields.cat_1_item_6, "Data Backup & Security"),
        safeRender(fields.cat_1_item_7, "Multi-location Management")
      ]
    },
    {
      category: safeRender(fields.category_2_name, "Service Locations"),
      items: [
        safeRender(fields.cat_2_item_1, "On-site Support"),
        safeRender(fields.cat_2_item_2, "Remote Monitoring"),
        safeRender(fields.cat_2_item_3, "Multi-location Coverage"),
        safeRender(fields.cat_2_item_4, "Emergency Call-outs"),
        safeRender(fields.cat_2_item_5, "Planned Maintenance")
      ]
    },
    {
      category: safeRender(fields.category_3_name, "Industry Expertise"),
      items: [
        safeRender(fields.cat_3_item_1, "Retail & E-commerce"),
        safeRender(fields.cat_3_item_2, "Healthcare"),
        safeRender(fields.cat_3_item_3, "Manufacturing"),
        safeRender(fields.cat_3_item_4, "Financial Services"),
        safeRender(fields.cat_3_item_5, "Education"),
        safeRender(fields.cat_3_item_6, "Government")
      ]
    }
  ];

  // Bottom CTA
  const ctaHeading = safeRender(fields.heading_7, "Be Worry-Free—Let Us Handle Everything!");
  const ctaDesc = safeRender(fields.paragraph_4, "With Crown Excel AMC, you can focus on your business while we take care of all your hardware, software, and IT support. No stress, no downtime—just hand over your work and relax!");
  const ctaBenefit1 = safeRender(fields.cta_benefit_1, "Full responsibility for your IT & hardware");
  const ctaBenefit2 = safeRender(fields.cta_benefit_2, "Software management & updates");
  const ctaBenefit3 = safeRender(fields.cta_benefit_3, "24/7 support & rapid response");
  const ctaBtn1Text = safeRender(fields.cta_button_1_text, "Start Free Assessment");
  const ctaBtn2Text = safeRender(fields.cta_button_2_text, "Contact Support");
  const ctaImage = safeImage(fields.image_networkit, NetworkIT);
  const ctaOverlayStat1Num = safeRender(fields.cta_stat_1_number, "500+");
  const ctaOverlayStat1Label = safeRender(fields.cta_stat_1_label, "Active Contracts");
  const ctaOverlayStat2Num = safeRender(fields.cta_stat_2_number, "24/7");
  const ctaOverlayStat2Label = safeRender(fields.cta_stat_2_label, "Expert Support");

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hardware-empowering-section"
        aria-label="Hand Over All Your Business Work - Crown Excel AMC"
        className="relative w-full max-w-[1536px] mx-auto min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
      >
      {/* Unique Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-[#16CA9A] rounded-lg transform rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#16CA9A] rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 border-2 border-[#084032] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-[#084032] transform rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section with Zigzag Layout */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 lg:col-start-1 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-wide shadow-lg">
                    {heroBadge}
                  </div>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-full"></div>
                </div>

                <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                  <span className="block">{heroHeading1}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] to-[#084032]">
                    {heroHeading2}
                  </span>
                  <span className="block text-4xl md:text-5xl font-medium text-gray-700">
                    {heroHeading3}
                  </span>
                </h2>

                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                  {heroDesc}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                  {industryStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center items-center gap-1 text-2xl md:text-3xl font-black text-[#16CA9A]">
                        {stat.useDirham && (
                          <Image
                            src={Dirham}
                            alt="Dirham Symbol"
                            width={30}
                            height={30}
                            className="inline-block object-contain"
                          />
                        )}
                        {stat.number}
                      </div>
                      <div className="text-sm font-semibold text-gray-800">{stat.label}</div>
                      <div className="text-xs text-gray-600">{stat.sublabel}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href={heroBtn1Link}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#16CA9A] to-[#084032] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    {heroBtn1Text}
                    <svg className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button
                    onClick={getQuote}
                    className="inline-flex items-center px-6 py-4 border-2 border-[#16CA9A] text-[#16CA9A] font-bold rounded-xl hover:bg-[#16CA9A] hover:text-white transition-all duration-300"
                  >
                    {heroBtn2Text}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image - Floating Effect */}
            <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#16CA9A]/20 to-[#084032]/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                  <Image
                    src={heroImage}
                    width={500}
                    height={350}
                    alt="AMC Services"
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-[#16CA9A] text-white p-3 rounded-full shadow-xl animate-pulse">
                    <span className="text-2xl">🔧</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AMC Plans Section - Unique Split Design */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              {plansHeading}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6 transform skew-x-12"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {plansSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {amcPlans.map((plan, index) => (
              <div key={index} className="group relative">
                <div className={`relative bg-gradient-to-br ${plan.color} p-1 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4`}>
                  <div className="bg-white rounded-3xl p-8 h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-4xl text-green-400">{plan.icon}</div>
                      <div className={`bg-gradient-to-r ${plan.color} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                        {plan.duration}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-gray-900">{plan.type}</h3>
                      <h4 className="text-lg font-semibold text-gray-700">{plan.title}</h4>
                      <p className="text-sm text-gray-600">{plan.subtitle}</p>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3 my-4">
                        <div className="text-center bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-black text-[#16CA9A]">{plan.uptime}</div>
                          <div className="text-xs text-gray-600">Uptime SLA</div>
                        </div>
                        <div className="text-center bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-black text-[#16CA9A]">{plan.response}</div>
                          <div className="text-xs text-gray-600">Response Time</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Included Services</h5>
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`w-2 h-2 bg-gradient-to-r ${plan.color} rounded-full mt-2 flex-shrink-0`}></div>
                            <span className="text-gray-700 font-medium text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`bg-gradient-to-r ${plan.color} bg-opacity-10 p-4 rounded-xl mt-6`}>
                        <p className="text-sm font-semibold text-white mb-2">{plan.benefits}</p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <div className="bg-[#16CA9A] text-white px-4 py-2 rounded-full text-xs font-bold">
                            ALL-IN-ONE SERVICE
                          </div>
                          <div className="bg-[#084032] text-white px-4 py-2 rounded-full text-xs font-bold">
                            24/7 SUPPORT
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={getQuote}
                        className={`w-full mt-6 py-4 bg-gradient-to-r ${plan.color} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>{plan.buttonText || `Request ${plan.type} Consultation`}</span>
                          <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Features - Image Cards (Reference Style) */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              {whyHeading}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6 transform skew-x-12"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={feature.Image}
                    alt={feature.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#084032]/70 via-transparent to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#16CA9A] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                  <div className="bg-gradient-to-r from-[#16CA9A]/10 to-[#084032]/10 p-3 rounded-lg text-center">
                    <span className="text-lg font-black text-[#16CA9A]">
                      {feature.metric}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Areas Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              {handleHeading}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#16CA9A] to-[#084032] mx-auto mb-6 transform skew-x-12"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {handleSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coverageAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] p-4">
                  <h3 className="text-xl font-black text-white text-center">{area.category}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {area.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="w-2 h-2 bg-[#16CA9A] rounded-full"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA with Second Image - Enhanced */}
        <div className="relative">
          <div className="bg-gradient-to-r from-[#16CA9A] to-[#084032] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 text-white">
                <h3 className="text-4xl font-black mb-6">{ctaHeading}</h3>
                <p className="text-xl mb-6 opacity-90">
                  {ctaDesc}
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-lg">{ctaBenefit1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-lg">{ctaBenefit2}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-lg">{ctaBenefit3}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center px-8 py-4 bg-white text-[#084032] font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                    {ctaBtn1Text}
                  </button>
                  <button
                    onClick={getQuote}
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#084032] transition-colors duration-300"
                  >
                    {ctaBtn2Text}
                  </button>
                </div>
              </div>
              <div className="relative p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl"></div>
                  <Image
                    src={ctaImage}
                    width={400}
                    height={300}
                    alt="Professional Hardware Maintenance Services"
                    className="relative w-full h-auto rounded-2xl shadow-2xl"
                  />
                  {/* Overlay Stats */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <div className="text-lg font-black text-[#16CA9A]">{ctaOverlayStat1Num}</div>
                        <div className="text-xs text-gray-600">{ctaOverlayStat1Label}</div>
                      </div>
                      <div>
                        <div className="text-lg font-black text-[#16CA9A]">{ctaOverlayStat2Num}</div>
                        <div className="text-xs text-gray-600">{ctaOverlayStat2Label}</div>
                      </div>
                    </div>
                  </div>
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

export default HardwareEmpowering;
