'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Filter, Send, Cpu, HardDrive, Layers, Monitor, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

// WebP / PNG Product Images
import Img83F30082AX from '@/Components/Images/83F30082AX.webp';
import Img83M4000YGP from '@/Components/Images/83M4000YGP.webp';
import Img83RR0040PS from '@/Components/Images/83RR0040PS.webp';
import Img83S0007FUS from '@/Components/Images/83S0007FUS.webp';
import Img90NB10J1_M04TK0 from '@/Components/Images/90NB10J1-M04TK0.webp';
import Img90NB10J1_M04TL0 from '@/Components/Images/90NB10J1-M04TL0.webp';
import Img90NB10T1_M01YX0 from '@/Components/Images/90NB10T1-M01YX0.webp';
import Img90NB10T2_M01YY0 from '@/Components/Images/90NB10T2-M01YY0.webp';
import Img90NB14Q2_M003W0 from '@/Components/Images/90NB14Q2-M003W0.webp';
import Img90NB16G2_M00230 from '@/Components/Images/90NB16G2-M00230.webp';
import Img90NX0801_M04XV0 from '@/Components/Images/90NX0801-M04XV0.webp';
import ImgD78MQEA_BH5 from '@/Components/Images/D78MQEA_BH5.webp';
import ImgNH_QVUEM_002 from '@/Components/Images/NH.QVUEM.002.webp';
import ImgNH_QX5EM_003 from '@/Components/Images/NH.QX5EM.003.webp';
import ImgNX_BSQEM_001 from '@/Components/Images/NX.BSQEM.001.webp';
import ImgNX_DGJEM_002 from '@/Components/Images/NX.DGJEM.002.webp';
import ImgNX_DTGEM_001 from '@/Components/Images/NX.DTGEM.001.webp';
import ImgWorkstation1 from '@/Components/Images/BestLaptop3.png';
import ImgWorkstation2 from '@/Components/Images/UnleashLaptop.png';
import { safeRender } from '@/lib/safe-html';

export default function LaptopProductsGridSection({
  cmsData,
  activeCategory = 'All',
  onSelectCategory,
  openProductInquiryModal,
  getWhatsAppUrl,
  handleWhatsAppRedirect,
}) {
  const fields = cmsData?.fields || cmsData || {};
  const headingVal = fields.heading;
  const paragraphVal = fields.paragraph;

  const defaultHeading = (
    <>
      <span className="block not-italic">Available Wholesale Laptop Models</span>
      <span className="block text-[#147A5F] italic mt-1">
        &amp; Bulk Inventory
      </span>
    </>
  );

  let renderedHeading = headingVal;
  if (
    typeof renderedHeading === 'string' &&
    (renderedHeading.replace(/\s+/g, ' ').trim() === 'Available Wholesale Laptop Models & Bulk Inventory' ||
      renderedHeading.replace(/\s+/g, ' ').trim() === 'Factory-Sealed Laptop Inventory Available for Dispatch')
  ) {
    renderedHeading = defaultHeading;
  }

  const [searchQuery, setSearchQuery] = useState('');

  const LAPTOP_PRODUCTS = useMemo(() => [
    {
      id: 'NH.QX5EM.003',
      brand: 'ACER',
      series: 'Predator Series',
      barcode: 'NH.QX5EM.003',
      name: 'Acer Predator Helios Neo PHN16-73-94ZR',
      category: 'Gaming',
      specs: {
        cpu: 'Intel® Core™ Ultra 9 275HX',
        ram: '16GB 6400MHz DDR5',
        storage: '1TB PCIe Gen4 SSD',
        display: "16'' WQXGA IPS 240Hz",
        gpu: 'NVIDIA® GeForce RTX™ 5070 8GB',
        keyboard: '4-Zone RGB English',
      },
      image: ImgNH_QX5EM_003,
      tag: 'Flagship Gaming',
    },
    {
      id: 'NH.QVUEM.002',
      brand: 'ACER',
      series: 'Predator Series',
      barcode: 'NH.QVUEM.002',
      name: 'Predator Helios Neo 16 AI PHN16-73-97BP',
      category: 'Gaming',
      specs: {
        cpu: 'Intel® Core™ Ultra 9 275HX',
        ram: '16GB 6400MHz DDR5',
        storage: '1TB PCIe Gen4 SSD',
        display: "16'' WQXGA IPS 180Hz",
        gpu: 'NVIDIA® GeForce RTX™ 5060 8GB',
        keyboard: '4-Zone RGB English',
      },
      image: ImgNH_QVUEM_002,
      tag: 'AI Gaming Rig',
    },
    {
      id: '83F30082AX',
      brand: 'LENOVO',
      series: 'Legion Series',
      barcode: '83F30082AX',
      name: 'Lenovo Legion Pro 5i (16", 10)',
      category: 'Gaming',
      specs: {
        cpu: 'Intel® Core™ Ultra 7 255HX',
        ram: '32GB (2x16GB) DDR5-5600',
        storage: '1TB M.2 2280 NVMe SSD',
        display: '16" WQXGA OLED 500nits 165Hz',
        gpu: 'NVIDIA® GeForce RTX™ 5070 8GB GDDR7',
        keyboard: '24-Zone RGB Backlit Arabic/Eng',
      },
      image: Img83F30082AX,
      tag: 'Pro Esports',
    },
    {
      id: '83S0007FUS',
      brand: 'LENOVO',
      series: 'LOQ Series',
      barcode: '83S0007FUS',
      name: 'Lenovo LOQ Gaming Laptop 15.6"',
      category: 'Gaming',
      specs: {
        cpu: 'AMD Ryzen 7 170 (2025)',
        ram: '16GB DDR5 Memory',
        storage: '512GB PCIe SSD Storage',
        display: '15.6" 2K High Refresh',
        gpu: 'NVIDIA® GeForce RTX 4050',
        keyboard: 'White Backlit English',
      },
      image: Img83S0007FUS,
      tag: 'Best Seller',
    },
    {
      id: '90NX0801-M04XV0',
      brand: 'ASUS',
      series: 'ExpertBook Series',
      barcode: '90NX0801-M04XV0',
      name: 'ASUS EXPERTBOOK B1503CV',
      category: 'Business',
      specs: {
        cpu: 'Intel® Core™ i3-1315U',
        ram: '8GB DDR5 RAM',
        storage: '256GB SSD PCIe 4.0',
        display: '15.6" FHD Anti-Glare 60Hz',
        gpu: 'Intel® UHD Shared Graphics',
        keyboard: 'English Gentle Grey',
      },
      image: Img90NX0801_M04XV0,
      tag: 'Enterprise Value',
    },
    {
      id: 'NX.BSQEM.001',
      brand: 'ACER',
      series: 'TravelMate',
      barcode: 'NX.BSQEM.001',
      name: 'ACER TRAVELMATE P214-56',
      category: 'Business',
      specs: {
        cpu: 'Intel® Core™ Ultra 5 225U',
        ram: '8GB DDR5 RAM',
        storage: '512GB NVMe SSD',
        display: '14" WUXGA IPS Display',
        gpu: 'Intel® Graphics Shared',
        keyboard: 'Backlit English Keyboard',
      },
      image: ImgNX_BSQEM_001,
      tag: 'Executive Travel',
    },
    {
      id: '83M4000YGP',
      brand: 'LENOVO',
      series: 'V Series',
      barcode: '83M4000YGP',
      name: 'Lenovo V15 Gen 6',
      category: 'Business',
      specs: {
        cpu: 'Intel® Processor N100',
        ram: '8GB SODIMM DDR5-4800',
        storage: '256GB SSD M.2 NVMe',
        display: '15.6" FHD (1920x1080)',
        gpu: 'Intel® UHD Graphics',
        keyboard: 'English Business Black',
      },
      image: Img83M4000YGP,
      tag: 'Office Bulk Ready',
    },
    {
      id: 'D78MQEA#BH5',
      brand: 'HP',
      series: 'OmniBook Series',
      barcode: 'D78MQEA#BH5',
      name: 'HP OmniBook 3 Laptop 16-bu0065nia',
      category: 'Personal',
      specs: {
        cpu: 'Intel® Core™ 5 120U',
        ram: '16GB DDR5-5200 RAM',
        storage: '512GB PCIe® Gen4 NVMe',
        display: '16" 2K (1920 x 1200) IPS',
        gpu: 'Intel® Graphics Integrated',
        keyboard: 'Backlit English Silver',
      },
      image: ImgD78MQEA_BH5,
      tag: 'High Productivity',
    },
    {
      id: '90NB14Q2-M003W0',
      brand: 'ASUS',
      series: 'VivoBook OLED',
      barcode: '90NB14Q2-M003W0',
      name: 'ASUS VIVOBOOK S5507QA-MA007W OLED',
      category: 'Personal',
      specs: {
        cpu: 'Snapdragon X Plus X1P42100',
        ram: '16GB LPDDR5X RAM',
        storage: '1TB Ultra-Fast SSD',
        display: '15.6" 3K OLED (2880 X 1620)',
        gpu: 'Qualcomm Adreno X1-45 GPU',
        keyboard: 'RGB 1-Zone Backlit English',
      },
      image: Img90NB14Q2_M003W0,
      tag: 'Copilot+ AI PC',
    },
    {
      id: '90NB16G2-M00230',
      brand: 'ASUS',
      series: 'ZenBook Series',
      barcode: '90NB16G2-M00230',
      name: 'ASUS ZENBOOK A14 X3407RA-QD004W',
      category: 'Personal',
      specs: {
        cpu: 'Snapdragon X Elite X1E-78-100',
        ram: '16GB High-Speed RAM',
        storage: '1TB NVMe PCIe SSD',
        display: '14" WUXGA OLED Slim Bezel',
        gpu: 'Integrated Qualcomm GPU',
        keyboard: 'Backlit English Iceland Gray',
      },
      image: Img90NB16G2_M00230,
      tag: 'Ultra-Slim Flagship',
    },
    {
      id: '90NB10T1-M01YX0',
      brand: 'ASUS',
      series: 'VivoBook Series',
      barcode: '90NB10T1-M01YX0',
      name: 'ASUS VIVOBOOK A1502VA-BQ1385',
      category: 'Personal',
      specs: {
        cpu: 'Intel® Core™ i7-13620H 10-Core',
        ram: '16GB DDR4 Memory',
        storage: '512GB PCIe NVMe SSD',
        display: '15.6" FHD Anti-Glare (1920x1080)',
        gpu: 'Intel® UHD Graphics',
        keyboard: 'English Quiet Blue',
      },
      image: Img90NB10T1_M01YX0,
      tag: 'Core i7 Power',
    },
    {
      id: '90NB10J1-M04TK0',
      brand: 'ASUS',
      series: 'VivoBook Series',
      barcode: '90NB10J1-M04TK0',
      name: 'ASUS VIVOBOOK X1504VA (Arabic Layout)',
      category: 'Personal',
      specs: {
        cpu: 'Intel® Core™ i3-1315U',
        ram: '8GB DDR4 RAM',
        storage: '512GB SSD Storage',
        display: '15.6" FHD 1920x1080 Display',
        gpu: 'Intel® UHD Graphics',
        keyboard: 'Arabic / English Bilingual',
      },
      image: Img90NB10J1_M04TK0,
      tag: 'Arabic Keyboard',
    },
    {
      id: 'NX.DGJEM.002',
      brand: 'ACER',
      series: 'Aspire Lite',
      barcode: 'NX.DGJEM.002',
      name: 'ACER ASPIRE LITE AL15-36P-36UJ',
      category: 'Personal',
      specs: {
        cpu: 'Intel® Core™ 3 N350 Processor',
        ram: '8GB DDR5 Memory',
        storage: '256GB PCIe NVMe SSD',
        display: '15.6" FHD Crystal Clear',
        gpu: 'Intel® UHD Shared Graphics',
        keyboard: 'English Silver Layout',
      },
      image: ImgNX_DGJEM_002,
      tag: 'Budget Friendly',
    },
    {
      id: 'NX.DTGEM.001',
      brand: 'ACER',
      series: 'Aspire Lite',
      barcode: 'NX.DTGEM.001',
      name: 'ACER ASPIRE ALITE 15-54P',
      category: 'Personal',
      specs: {
        cpu: 'Intel® Core™ Ultra 5-115U',
        ram: '8GB LPDDR5 RAM',
        storage: '512GB PCIe Gen4 SSD',
        display: '15.6" FHD IPS Panel',
        gpu: 'Intel® Shared AI Graphics',
        keyboard: 'English Silver Finish',
      },
      image: ImgNX_DTGEM_001,
      tag: 'Ultra 5 Balanced',
    },
    {
      id: '83RR0040PS',
      brand: 'LENOVO',
      series: 'IdeaPad Series',
      barcode: '83RR0040PS',
      name: 'LENOVO IDEAPAD SLIM 3I',
      category: 'Personal',
      specs: {
        cpu: 'Intel® Core™ 3 304 Processor',
        ram: '8GB LPDDR5 Memory',
        storage: '512GB SSD Storage',
        display: '15.3" WUXGA IPS Narrow Bezel',
        gpu: 'Integrated Intel® Graphics',
        keyboard: 'Backlit English Luna Grey',
      },
      image: Img83RR0040PS,
      tag: 'Daily Commute',
    },
    {
      id: 'WS-THINKPAD-P1',
      brand: 'LENOVO',
      series: 'ThinkPad P Series',
      barcode: '21FV001RUS',
      name: 'Lenovo ThinkPad P1 Gen 7 Mobile Workstation',
      category: 'Workstations',
      specs: {
        cpu: 'Intel® Core™ Ultra 9 185H vPro',
        ram: '32GB LPDDR5X (Up to 64GB)',
        storage: '1TB PCIe 4.0 NVMe SSD',
        display: '16" WQXGA (2560x1600) 165Hz',
        gpu: 'NVIDIA RTX™ 4070 Ada 8GB GDDR6',
        keyboard: 'ThinkPad Spill-Resistant Backlit',
      },
      image: ImgWorkstation1,
      tag: 'ISV Certified CAD',
    },
    {
      id: 'WS-DELL-PRECISION',
      brand: 'DELL',
      series: 'Precision Series',
      barcode: 'DELL-P3581-PRO',
      name: 'Dell Precision 3581 Workstation',
      category: 'Workstations',
      specs: {
        cpu: 'Intel® Core™ i7-13800H vPro',
        ram: '32GB DDR5 5200MHz',
        storage: '1TB PCIe NVMe Gen4',
        display: '15.6" FHD 100% sRGB 400 nits',
        gpu: 'NVIDIA RTX™ 2000 Ada 8GB',
        keyboard: 'Dell Precision Pro Keyboard',
      },
      image: ImgWorkstation2,
      tag: '3D Modeling & BIM',
    },
  ], []);

  const categories = ['All', 'Gaming', 'Business', 'Personal', 'Workstations'];

  const filteredProducts = useMemo(() => {
    return LAPTOP_PRODUCTS.filter((prod) => {
      // Exclude SKU: DELL-P3581-PRO from 'All' category filter so it only appears under 'Workstations'
      const isDellPrecision =
        prod.barcode === 'DELL-P3581-PRO' || prod.id === 'WS-DELL-PRECISION';

      const matchCat =
        activeCategory === 'All'
          ? !isDellPrecision
          : prod.category.toLowerCase() === activeCategory.toLowerCase();

      const matchSearch =
        !searchQuery ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.barcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.specs.cpu.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [LAPTOP_PRODUCTS, activeCategory, searchQuery]);

  const WHATSAPP_PHONE = '971543090680';

  const getProductWhatsAppMessage = (prod) => {
    return `Hello Crown Excel, I am inquiring about wholesale pricing for ${prod.name} (Barcode: ${prod.barcode}).`;
  };

  const getProductWhatsAppUrl = (prod) => {
    const msg = getProductWhatsAppMessage(prod);
    if (typeof getWhatsAppUrl === 'function') {
      return getWhatsAppUrl(msg);
    }
    const encoded = encodeURIComponent(msg);
    return `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
  };

  const handleProductWhatsAppClick = (e, prod) => {
    const msg = getProductWhatsAppMessage(prod);
    if (typeof handleWhatsAppRedirect === 'function') {
      handleWhatsAppRedirect(e, msg);
      return;
    }
    const encoded = encodeURIComponent(msg);
    const isMob =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '') ||
        window.innerWidth < 768);
    const targetUrl = isMob
      ? `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`
      : `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
    if (e && e.currentTarget) e.currentTarget.href = targetUrl;
    if (typeof window !== 'undefined') {
      const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (win && e && e.preventDefault) e.preventDefault();
    }
  };

  return (
    <div className="relative w-full bg-[#FFFFFF] overflow-hidden">
      <section id="laptop-products-grid" className="relative w-full max-w-[1536px] mx-auto overflow-hidden bg-[#F8FAFC] py-12 sm:py-16 lg:py-18 xl:py-20 px-5 sm:px-8 md:px-[53px] lg:px-[53px] xl:px-16">
        <div className="relative z-10 w-full">
          
          {/* Section Header */}
          <div className="text-center max-w-4xl xl:max-w-5xl mx-auto mb-8 sm:mb-10 xl:mb-12">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#147A5F] mb-2 sm:mb-2.5 block font-montserrat">
              {safeRender(fields.badge, "READY WAREHOUSE STOCK IN DUBAI")}
            </span>

            <h2
              className="font-anton uppercase text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] tracking-[-0.03em] leading-[1.08] text-[#171717]"
              style={{ fontFamily: "'Anton', Impact, sans-serif" }}
            >
              {safeRender(renderedHeading, defaultHeading) || 'Factory-Sealed Laptop Inventory Available for Dispatch'}
            </h2>

            <p className="font-jakarta text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mt-3 max-w-2xl sm:max-w-3xl mx-auto font-normal text-pretty">
              {safeRender(paragraphVal, "Browse our current catalog of factory-sealed laptops available for immediate bulk dispatch across Dubai, the UAE, and GCC export hubs. Filter by series or search by SKU barcode.")}
            </p>
          </div>

          {/* Filter Tabs & Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 font-jakarta">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      if (typeof onSelectCategory === 'function') {
                        onSelectCategory(cat);
                      }
                    }}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#147A5F] text-white shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat === 'All' ? 'All Laptops' : `${cat} Laptops`}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-64 xl:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={fields.search_placeholder?.value || (typeof fields.search_placeholder === 'string' ? fields.search_placeholder : "Search by model, SKU or CPU...")}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#147A5F] focus:ring-1 focus:ring-[#147A5F] transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Product Count Indicator */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-jakarta mb-5 sm:mb-6">
            <span>Showing <strong className="text-gray-900">{filteredProducts.length}</strong> available laptop configurations</span>
            <span>{safeRender(fields.moq_note, "MOQ: 5-10 units for wholesale pricing")}</span>
          </div>

          {/* Product Cards Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-[#147A5F]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Product Image Canvas */}
                  <div className="relative w-full h-40 sm:h-44 p-3.5 flex items-center justify-center bg-gradient-to-b from-gray-50/50 to-white overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 pt-2">
                    {/* SKU Barcode Pill */}
                    <div className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] sm:text-[11px] font-mono mb-1.5">
                      SKU: {product.barcode}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold font-montserrat text-[#171717] text-xs sm:text-sm leading-snug mb-2.5 line-clamp-2 group-hover:text-[#147A5F] transition-colors">
                      {product.name}
                    </h3>

                    {/* Key Specs Pills */}
                    <div className="space-y-1 text-[11px] sm:text-xs text-gray-600 font-jakarta border-t border-gray-100 pt-2.5 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#147A5F] flex-shrink-0" />
                        <span className="truncate">{product.specs.cpu}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#147A5F] flex-shrink-0" />
                        <span className="truncate">{product.specs.ram}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-[#147A5F] flex-shrink-0" />
                        <span className="truncate">{product.specs.storage}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5 text-[#147A5F] flex-shrink-0" />
                        <span className="truncate">{product.specs.display}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTAs: Inquire Now Modal + WhatsApp */}
                <div className="p-4 pt-0 flex items-center gap-2 font-jakarta">
                  <button
                    type="button"
                    onClick={() => openProductInquiryModal({ name: product.name, barcode: product.barcode })}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#147A5F] hover:bg-[#0f604b] text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{safeRender(fields.inquire_button_text, "Inquire Now")}</span>
                  </button>

                  <a
                    href={getProductWhatsAppUrl(product)}
                    onClick={(e) => handleProductWhatsAppClick(e, product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Inquire about ${product.name} (Barcode: ${product.barcode}) on WhatsApp`}
                    aria-label={`Inquire about ${product.name} (Barcode: ${product.barcode}) on WhatsApp`}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        {/* Empty Search Result Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 max-w-md mx-auto font-jakarta">
            <p className="text-gray-500 text-sm mb-3">
              {safeRender(fields.empty_message, "No laptop models match your current filter or search query.")}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                if (typeof onSelectCategory === 'function') onSelectCategory('All');
              }}
              className="text-xs font-bold text-[#147A5F] hover:underline"
            >
              {safeRender(fields.reset_button_text, "Reset Filters")}
            </button>
          </div>
        )}

        </div>
      </section>
    </div>
  );
}
