'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

// Inventory Product WebP / PNG Images
import Img83F30082AX from '@/Components/Images/83F30082AX.webp';
import Img83M4000YGP from '@/Components/Images/83M4000YGP.webp';
import Img83RR0040PS from '@/Components/Images/83RR0040PS.webp';
import Img83S0007FUS from '@/Components/Images/83S0007FUS.png';
import Img90NB10J1_M04TL0 from '@/Components/Images/90NB10J1-M04TL0.webp';
import Img90NB14Q2_M003W0 from '@/Components/Images/90NB14Q2-M003W0.webp';
import Img90NX0801_M04XV0 from '@/Components/Images/90NX0801-M04XV0.webp';
import ImgD78MQEA_BH5 from '@/Components/Images/D78MQEA_BH5.webp';
import ImgNH_QVUEM_002 from '@/Components/Images/NH.QVUEM.002.png';
import ImgNH_QX5EM_003 from '@/Components/Images/NH.QX5EM.003.png';
import ImgNX_BSQEM_001 from '@/Components/Images/NX.BSQEM.001.png';
import ImgNX_DGJEM_002 from '@/Components/Images/NX.DGJEM.002.png';

// Consumer Laptops Updated Images
import ImgLenovoIdeaPadYoga from '@/Components/Images/83KR0047USch.png';
import ImgAcerAspire from '@/Components/Images/NX.DGJEM.002ch.webp';
import ImgAsusVivoBookZenbook from '@/Components/Images/90NB14Q2-M003W0ch.webp';
import ImgHPOmniBook from '@/Components/Images/D78MQEA_BH5ch.webp';

// Gaming Laptops Updated Images
import ImgLenovoLegionLOQ from '@/Components/Images/83EY0003AXch.webp';
import ImgAcerPredatorNitro from '@/Components/Images/NH_QVXEM_003ch.jpg';
import ImgAsusRogTuf from '@/Components/Images/ASUS_ROG_Zephyrus_G16_GU605CXch.webp';
import ImgHpOmenVictus from '@/Components/Images/D13PWEA_ABVch.webp';

// Business Laptops Updated Images
import ImgLenovoThinkPadThinkBook from '@/Components/Images/21Q0006USch.webp';
import ImgHpProBookEliteBook from '@/Components/Images/D0MB5ET_ABVch.webp';
import ImgDellProSeries from '@/Components/Images/8V43Mch.webp';
import ImgAsusExpertBook from '@/Components/Images/AsusExpertBookch.png';

// All-in-One PCs Updated Images
import ImgLenovoIdeaCentreThinkCentre from '@/Components/Images/F0HM000MAXch.webp';
import ImgHpOmniStudioEliteOne from '@/Components/Images/HPOmniStudioAIOch.png';
import ImgDellProAIO from '@/Components/Images/DellProAIOch.webp';
import ImgAsusExpertCenterAIO from '@/Components/Images/90PT03J5_M00NY0ch.webp';

// Category Additional Product Images
import ImgAllinoneLatestProduct1 from '@/Components/Images/AllinoneLatestProduct1.png';
import ImgOneinall1 from '@/Components/Images/oneinall1.png';
import ImgOneinall4 from '@/Components/Images/oneinall4.png';
import ImgOneinall6 from '@/Components/Images/oneinall6.png';
import ImgBestSellingPrinter2 from '@/Components/Images/bestsellingprinter2.png';
import ImgAllinonePrinters1 from '@/Components/Images/allinoneprinters1.png';
import ImgAllinonePrinters2 from '@/Components/Images/allinoneprinters2.png';
import ImgScannerPopular1 from '@/Components/Images/scannerpopular1.png';
import ImgServerWorkstation1 from '@/Components/Images/servers-workstation-1.webp';
import ImgServerWorkstation2 from '@/Components/Images/servers-workstation-2.webp';
import ImgServerWorkstation3 from '@/Components/Images/servers-workstation-3.webp';
import ImgServerWorkstation4 from '@/Components/Images/servers-workstation-4.webp';
import ImgWorkstation4 from '@/Components/Images/workstation4.png';
import ImgWorkstationpc3 from '@/Components/Images/workstationpc3.png';
import ImgWorkstationpc1 from '@/Components/Images/workstationpc1.png';
import ImgWorkstationpc from '@/Components/Images/workstationpc.jpg';

// Seven Product Categories in Exact Required Sequence (1 to 7)
const SEVEN_CATEGORIES = [
  'Consumer Laptops',
  'Gaming Laptops',
  'Business Laptops',
  'All-In-One',
  'Print & Scan',
  'Servers & Workstation',
  'Accessories (Crownyx)',
];

// Product Data Arranged with Exactly 4 Product Cards per Category
const ALL_PRODUCTS = [
  // 1. Consumer Laptops (Exactly 4 Products)
  {
    brand: 'LENOVO',
    category: 'Consumer Laptops',
    name: 'IdeaPad & Yoga',
    series: 'IdeaPad & Yoga',
    description: 'IdeaPad Slim | IdeaPad Pro | Yoga Slim | Yoga 2-in-1',
    particular: 'Lenovo IdeaPad & Yoga Series (IdeaPad Slim, IdeaPad Pro, Yoga Slim, Yoga 2-in-1) - Latest Model: 83KR0047US',
    barcode: '83KR0047US',
    image: ImgLenovoIdeaPadYoga,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'ACER',
    category: 'Consumer Laptops',
    name: 'Aspire Series',
    series: 'Aspire Series',
    description: 'Aspire Lite | Aspire Go | Aspire 5 | Aspire 7',
    particular: 'Acer Aspire Series (Aspire Lite, Aspire Go, Aspire 5, Aspire 7)',
    barcode: '',
    image: ImgAcerAspire,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'ASUS',
    category: 'Consumer Laptops',
    name: 'VivoBook & Zenbook',
    series: 'VivoBook & Zenbook',
    description: 'VivoBook | VivoBook S | Zenbook | Zenbook S',
    particular: 'ASUS VivoBook & Zenbook Series (VivoBook, VivoBook S, Zenbook, Zenbook S) - Latest Model: 90NB14Q2-M003W0',
    barcode: '90NB14Q2-M003W0',
    image: ImgAsusVivoBookZenbook,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'HP',
    category: 'Consumer Laptops',
    name: 'OmniBook Series',
    series: 'OmniBook Series',
    description: 'OmniBook 3 | OmniBook 5 | OmniBook 7 | OmniBook X',
    particular: 'HP OmniBook Series (OmniBook 3, OmniBook 5, OmniBook 7, OmniBook X) - Latest Model: D78MQEA#BH5',
    barcode: 'D78MQEA#BH5',
    image: ImgHPOmniBook,
    imageClassName: 'scale-[1.05]'
  },

  // 2. Gaming Laptops (Exactly 4 Products)
  {
    brand: 'LENOVO',
    category: 'Gaming Laptops',
    name: 'Legion & LOQ',
    series: 'Legion & LOQ',
    description: 'LOQ | Legion | Legion Pro | Legion Slim',
    particular: "Lenovo Legion & LOQ Series (LOQ, Legion, Legion Pro, Legion Slim) - Model: 83EY0003AX",
    barcode: '83EY0003AX',
    image: ImgLenovoLegionLOQ,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'ACER',
    category: 'Gaming Laptops',
    name: 'Predator & Nitro',
    series: 'Predator & Nitro',
    description: 'Nitro V | Nitro | Predator Helios Neo | Predator Helios',
    particular: "Acer Predator & Nitro Series (Nitro V, Nitro, Predator Helios Neo, Predator Helios) - Model: NH.QVXEM.003",
    barcode: 'NH.QVXEM.003',
    image: ImgAcerPredatorNitro,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'ASUS',
    category: 'Gaming Laptops',
    name: 'ROG & TUF Gaming',
    series: 'ROG & TUF Gaming',
    description: 'ROG Strix | ROG Zephyrus | ROG Flow | TUF Gaming',
    particular: "ASUS ROG & TUF Gaming Series (ROG Strix, ROG Zephyrus, ROG Flow, TUF Gaming) - Model: ASUS ROG Zephyrus G16 GU605CX",
    barcode: 'ASUS ROG Zephyrus G16 GU605CX',
    image: ImgAsusRogTuf,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'HP',
    category: 'Gaming Laptops',
    name: 'OMEN & Victus',
    series: 'OMEN & Victus',
    description: 'OMEN | OMEN MAX | OMEN Transcend | Victus',
    particular: "HP OMEN & Victus Series (OMEN, OMEN MAX, OMEN Transcend, Victus) - Model: D13PWEA#ABV",
    barcode: 'D13PWEA#ABV',
    image: ImgHpOmenVictus,
    imageClassName: 'scale-[1.05]'
  },

  // 3. Business Laptops (Exactly 4 Products)
  {
    brand: 'LENOVO',
    category: 'Business Laptops',
    name: 'ThinkPad & ThinkBook',
    series: 'ThinkPad & ThinkBook',
    description: 'ThinkPad E | ThinkPad L | ThinkPad T | ThinkPad X | ThinkPad X1 | ThinkPad P Series | ThinkBook',
    particular: 'Lenovo ThinkPad & ThinkBook Series (ThinkPad E, ThinkPad L, ThinkPad T, ThinkPad X, ThinkPad X1, ThinkPad P Series, ThinkBook) - Model: 21Q0006US',
    barcode: '21Q0006US',
    image: ImgLenovoThinkPadThinkBook,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'HP',
    category: 'Business Laptops',
    name: 'ProBook & EliteBook',
    series: 'ProBook & EliteBook',
    description: 'ProBook 4 | EliteBook 6 | EliteBook 8 | EliteBook X | ZBook',
    particular: 'HP ProBook & EliteBook Series (ProBook 4, EliteBook 6, EliteBook 8, EliteBook X, ZBook) - Model: D0MB5ET#ABV',
    barcode: 'D0MB5ET#ABV',
    image: ImgHpProBookEliteBook,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'DELL',
    category: 'Business Laptops',
    name: 'Dell Pro Series',
    series: 'Dell Pro Series',
    description: 'Pro Premium | Pro Plus | Pro | Pro Essential',
    particular: 'Dell Pro Series (Pro Premium, Pro Plus, Pro, Pro Essential) - Model: 8V43M',
    barcode: '8V43M',
    image: ImgDellProSeries,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'ASUS',
    category: 'Business Laptops',
    name: 'ExpertBook Series',
    series: 'ExpertBook Series',
    description: 'Ultra | A7 | B Series | P Series',
    particular: 'ASUS ExpertBook Series (Ultra, A7, B Series, P Series)',
    barcode: 'ASUS ExpertBook',
    image: ImgAsusExpertBook,
    imageClassName: 'scale-[1.05]'
  },

  // 4. All-In-One (Exactly 4 Products)
  {
    brand: 'LENOVO',
    category: 'All-In-One',
    name: 'IdeaCentre & ThinkCentre',
    series: 'IdeaCentre & ThinkCentre',
    description: 'IdeaCentre AIO | ThinkCentre neo AIO | Yoga AIO',
    particular: 'Lenovo IdeaCentre & ThinkCentre Series (IdeaCentre AIO, ThinkCentre neo AIO, Yoga AIO) - Model: F0HM000MAX',
    barcode: 'F0HM000MAX',
    image: ImgLenovoIdeaCentreThinkCentre,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'HP',
    category: 'All-In-One',
    name: 'OmniStudio & EliteOne',
    series: 'OmniStudio & EliteOne',
    description: 'OmniStudio 24 | OmniStudio 27 | OmniStudio X | EliteOne',
    particular: 'HP OmniStudio & EliteOne Series (OmniStudio 24, OmniStudio 27, OmniStudio X, EliteOne)',
    barcode: 'HP OmniStudio',
    image: ImgHpOmniStudioEliteOne,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'DELL',
    category: 'All-In-One',
    name: 'Dell Pro AIO',
    series: 'Dell Pro AIO',
    description: 'Dell Pro 24 AIO | Pro 24 AIO Plus | OptiPlex AIO',
    particular: 'Dell Pro AIO Series (Dell Pro 24 AIO, Pro 24 AIO Plus, OptiPlex AIO)',
    barcode: 'Dell Pro AIO',
    image: ImgDellProAIO,
    imageClassName: 'scale-[1.05]'
  },
  {
    brand: 'ASUS',
    category: 'All-In-One',
    name: 'ExpertCenter & ASUS AIO',
    series: 'ExpertCenter & ASUS AIO',
    description: 'ExpertCenter P600 | P400 | ASUS AIO',
    particular: 'ASUS ExpertCenter & ASUS AIO Series (ExpertCenter P600, P400, ASUS AIO) - Model: 90PT03J5-M00NY0',
    barcode: '90PT03J5-M00NY0',
    image: ImgAsusExpertCenterAIO,
    imageClassName: 'scale-[1.05]'
  },

  // 5. Print & Scan (Exactly 4 Products)
  {
    brand: 'HP',
    category: 'Print & Scan',
    barcode: 'J7Z98A',
    name: 'HP Color LaserJet Enterprise M652n',
    particular: 'HP Color LaserJet Enterprise M652n Laser Printer, Up to 50 ppm, 1200 x 1200 dpi, Gigabit Ethernet, 550-Sheet Input Tray',
    image: ImgBestSellingPrinter2
  },
  {
    brand: 'HP',
    category: 'Print & Scan',
    barcode: '7MD72A',
    name: 'HP LaserJet MFP M141a Monochrome',
    particular: 'HP LaserJet MFP M141a 3-in-1 Multifunction Monochrome Laser Printer, Print, Copy & Scan, 20 ppm, Compact Small Office Design',
    image: ImgAllinonePrinters1
  },
  {
    brand: 'CANON',
    category: 'Print & Scan',
    barcode: '2315C009AA',
    name: 'Canon PIXMA G3410 MegaTank 3-in-1',
    particular: 'Canon PIXMA G3410 Wireless Refillable MegaTank Color All-in-One Printer, Print, Copy & Scan, High-Yield Ink Bottles, Wi-Fi',
    image: ImgAllinonePrinters2
  },
  {
    brand: 'CANON',
    category: 'Print & Scan',
    barcode: '2995C010AA',
    name: 'Canon CanoScan LiDE 300 Flatbed',
    particular: 'Canon CanoScan LiDE 300 Compact Flatbed Document & Photo Scanner, 2400 x 2400 dpi, 4 EZ Buttons, USB Powered, Advanced Z-lid',
    image: ImgScannerPopular1
  },

  // 6. Servers & Workstation (Exactly 4 Products)
  {
    brand: 'DELL',
    category: 'Servers & Workstation',
    barcode: 'PER760-24NVMe',
    name: 'Dell PowerEdge R760 2U Rack Server',
    particular: 'Dell PowerEdge R760 2U Rack Server, Dual Intel Xeon Silver 4410Y, 64GB DDR5 ECC, 2x 960GB NVMe SSD, PERC H755, Dual 1100W Redundant PSU',
    image: ImgServerWorkstation1
  },
  {
    brand: 'HPE',
    category: 'Servers & Workstation',
    barcode: 'P52534-B21',
    name: 'HPE ProLiant DL380 Gen11 Server',
    particular: 'HPE ProLiant DL380 Gen11 2U Server, Intel Xeon Silver 4410Y 12-Core, 32GB RDIMM, MR408i-o Storage Controller, 8 SFF Bays, 800W PSU',
    image: ImgServerWorkstation2
  },
  {
    brand: 'LENOVO',
    category: 'Servers & Workstation',
    barcode: '7Z73A03FEA',
    name: 'Lenovo ThinkSystem SR650 V2 Server',
    particular: 'Lenovo ThinkSystem SR650 V2 2U Rack Server, 3rd Gen Intel Xeon Scalable, 32GB TruDDR4, RAID 930-8i, Dual 750W Titanium PSU',
    image: ImgServerWorkstation3
  },
  {
    brand: 'HP',
    category: 'Servers & Workstation',
    barcode: '5G378EA#ABU',
    name: 'HP ZBook Firefly 16 G10 Workstation',
    particular: 'HP ZBook Firefly 16 G10 Mobile Workstation, Intel Core i7-1365U, 32GB DDR5, 1TB PCIe NVMe, NVIDIA RTX A500 4GB, 16" WUXGA IPS, Win 11 Pro',
    image: ImgServerWorkstation4
  },

  // 7. Accessories (Crownyx) (Exactly 4 Products)
  {
    brand: 'CROWNYX',
    category: 'Accessories (Crownyx)',
    barcode: 'CMH-180',
    name: 'CROWNYX CMH-180 8-in-1 USB-C Hub, 4K HDMI, Ethernet, 37W PD, 3× USB 3.0, SD/TF Reader, Compatible with MacBook, iPad and Laptops',
    particular: 'CROWNYX CMH-180 8-in-1 USB-C Hub, 4K HDMI, Ethernet, 37W PD, 3× USB 3.0, SD/TF Reader, Compatible with MacBook, iPad and Laptops',
    image: ImgWorkstation4
  },
  {
    brand: 'CROWNYX',
    category: 'Accessories (Crownyx)',
    barcode: 'CCC130',
    name: 'CROWNYX CCC130 USB-A to USB-C 3.0 Cable 1M, 5Gbps, Compatible with Samsung Galaxy S25 Ultra, iPhone 17-15, Huawei P70 Pro and iPad Mini 7',
    particular: 'CROWNYX CCC130 USB-A to USB-C 3.0 Cable 1M, 5Gbps, Compatible with Samsung Galaxy S25 Ultra, iPhone 17-15, Huawei P70 Pro and iPad Mini 7',
    image: ImgWorkstationpc3
  },
  {
    brand: 'CROWNYX',
    category: 'Accessories (Crownyx)',
    barcode: 'CMC135',
    name: 'CROWNYX CMC135 35W GaN USB-C Fast Charger, PD and PPS Wall Adapter, Compatible with MacBook Air, iPad Pro, iPhone 16/15 and Galaxy S24',
    particular: 'CROWNYX CMC135 35W GaN USB-C Fast Charger, PD and PPS Wall Adapter, Compatible with MacBook Air, iPad Pro, iPhone 16/15 and Galaxy S24',
    image: ImgWorkstationpc1
  },
  {
    brand: 'CROWNYX',
    category: 'Accessories (Crownyx)',
    barcode: 'CMC-365',
    name: 'CROWNYX CMC-365 65W GaN Fast Charger | Dual USB-C & USB-A Power Delivery Wall Adapter | Compact, Safe & Intelligent Charging for Laptops & Devices',
    particular: 'CROWNYX CMC-365 65W GaN Fast Charger | Dual USB-C & USB-A Power Delivery Wall Adapter | Compact, Safe & Intelligent Charging for Laptops & Devices',
    image: ImgWorkstationpc
  }
];

function getTwoLineTitle(name) {
  const words = name.trim().split(/\s+/);
  if (words.length <= 1) return { line1: name, line2: '\u00A0' };

  if (name.startsWith('LENOVO IDEAPAD & YOGA')) return { line1: 'LENOVO IDEAPAD & YOGA', line2: 'SERIES' };
  if (name.startsWith('ACER ASPIRE SERIES')) return { line1: 'ACER ASPIRE', line2: 'SERIES' };
  if (name.startsWith('ASUS VIVOBOOK & ZENBOOK')) return { line1: 'ASUS VIVOBOOK & ZENBOOK', line2: 'SERIES' };
  if (name.startsWith('HP OMNIBOOK SERIES')) return { line1: 'HP OMNIBOOK', line2: 'SERIES' };
  if (name.startsWith('Lenovo V15')) return { line1: 'Lenovo V15', line2: 'Gen 6' };
  if (name.startsWith('ACER TRAVELMATE')) return { line1: 'ACER TRAVELMATE', line2: 'P214-56' };
  if (name.startsWith('ASUS EXPERTBOOK')) return { line1: 'ASUS EXPERTBOOK', line2: 'B1503CV' };
  if (name.startsWith('LENOVO IDEAPAD')) return { line1: 'LENOVO IDEAPAD', line2: 'SLIM 3I' };
  if (name.startsWith('ACER ASPIRE LITE')) return { line1: 'ACER ASPIRE LITE', line2: 'AL15-36P-36UJ' };
  if (name.startsWith('ASUS VIVOBOOK X1504VA')) return { line1: 'ASUS VIVOBOOK', line2: 'X1504VA-BQ4675' };
  if (name.startsWith('ASUS VIVOBOOK S5507QA')) return { line1: 'ASUS VIVOBOOK', line2: 'S5507QA-MA007W OLED' };
  if (name.startsWith('HP OmniBook 3')) return { line1: 'HP OmniBook 3', line2: 'Laptop 16-bu0065nia' };
  if (name.startsWith('Lenovo Legion Pro 5i')) return { line1: 'Lenovo Legion Pro 5i', line2: '(16", 10)' };
  if (name.startsWith('Acer Aspire C24-1700')) return { line1: 'Acer Aspire C24-1700', line2: 'AIO Desktop' };
  if (name.startsWith('HP All-in-One 24-cr0122nh')) return { line1: 'HP All-in-One', line2: '24-cr0122nh' };
  if (name.startsWith('Lenovo IdeaCentre AIO 3')) return { line1: 'Lenovo IdeaCentre', line2: 'AIO 3 27IAP7' };
  if (name.startsWith('ASUS ExpertCenter D700')) return { line1: 'ASUS ExpertCenter', line2: 'D700 AIO Desktop' };
  if (name.startsWith('HP Color LaserJet Enterprise')) return { line1: 'HP Color LaserJet', line2: 'Enterprise M652n' };
  if (name.startsWith('HP LaserJet MFP M141a')) return { line1: 'HP LaserJet MFP', line2: 'M141a Monochrome' };
  if (name.startsWith('Canon PIXMA G3410')) return { line1: 'Canon PIXMA G3410', line2: 'MegaTank 3-in-1' };
  if (name.startsWith('Canon CanoScan LiDE 300')) return { line1: 'Canon CanoScan', line2: 'LiDE 300 Flatbed' };
  if (name.startsWith('Dell PowerEdge R760')) return { line1: 'Dell PowerEdge R760', line2: '2U Rack Server' };
  if (name.startsWith('HPE ProLiant DL380')) return { line1: 'HPE ProLiant DL380', line2: 'Gen11 Server' };
  if (name.startsWith('Lenovo ThinkSystem SR650')) return { line1: 'Lenovo ThinkSystem', line2: 'SR650 V2 Server' };
  if (name.startsWith('HP ZBook Firefly 16')) return { line1: 'HP ZBook Firefly', line2: '16 G10 Workstation' };
  if (name.startsWith('CROWNYX CMH-180')) return { line1: 'CROWNYX CMH-180', line2: '8-in-1 USB-C Hub' };
  if (name.startsWith('CROWNYX CCC130')) return { line1: 'CROWNYX CCC130', line2: 'USB-A to USB-C Cable' };
  if (name.startsWith('CROWNYX CMC135')) return { line1: 'CROWNYX CMC135', line2: '35W GaN Fast Charger' };
  if (name.startsWith('CROWNYX CMC-365')) return { line1: 'CROWNYX CMC-365', line2: '65W GaN Fast Charger' };

  let splitIndex = Math.ceil(words.length / 2);
  let line1 = words.slice(0, splitIndex).join(' ');
  let line2 = words.slice(splitIndex).join(' ');

  if (line1.length > 22 && splitIndex > 1) {
    splitIndex = splitIndex - 1;
    line1 = words.slice(0, splitIndex).join(' ');
    line2 = words.slice(splitIndex).join(' ');
  }

  return { line1, line2 };
}

export default function WholesaleProductsSection({
  openProductInquiryModal,
  getWhatsAppUrl,
  handleWhatsAppRedirect,
  telegramChannelUrl,
  defaultWhatsAppMessage,
}) {
  return (
    <section className="py-10 sm:py-14 bg-[#F8FAFC] border-t border-b border-gray-200" id="product-line">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Product Categories Rendered in Exact Sequence (1 to 7) */}
        <div className="space-y-12 sm:space-y-16">
          {SEVEN_CATEGORIES.map((catName) => {
            // Strictly cap each category to exactly 4 product cards
            const catProducts = ALL_PRODUCTS.filter((p) => p.category === catName).slice(0, 4);
            const categoryIndex = SEVEN_CATEGORIES.indexOf(catName) + 1;
            const categoryAnchorId = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <div key={catName} id={categoryAnchorId} className="w-full scroll-mt-24">
                {/* Category Header Bar with Sequence Number and Product Count */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#147A5F] text-white text-xs sm:text-sm font-bold flex items-center justify-center font-jakarta shrink-0">
                      {categoryIndex}
                    </span>
                    <h3 className="font-montserrat font-bold text-lg sm:text-2xl text-[#171717] tracking-tight">
                      {catName}
                    </h3>
                  </div>

                  <span className="text-[11px] sm:text-xs font-semibold text-[#147A5F] bg-[#147A5F]/10 px-3 py-1 rounded-full font-jakarta">
                    {catProducts.length} Products
                  </span>
                </div>

                {/* 4 Product Cards: 2-column grid on mobile, 4-column inline on desktop */}
                <div className="w-full pt-1 pb-2">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-stretch">
                    {catProducts.map((product, index) => {
                      const { line1, line2 } = getTwoLineTitle(product.name);
                      return (
                        <div
                          key={product.barcode || product.name || index}
                          className="group relative bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#147A5F] hover:border-[#0c4e3c] shadow-md transition-colors duration-200 flex flex-col justify-between overflow-hidden min-h-[260px] sm:min-h-[325px] lg:min-h-[345px]"
                        >
                          {/* Product Image Showcase on Pure White Background */}
                          <div className="relative w-full h-28 xs:h-32 sm:h-40 lg:h-44 bg-white flex items-center justify-center overflow-hidden rounded-lg sm:rounded-xl">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              priority={categoryIndex <= 4 && index < 4}
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                              className={`object-contain ${
                                product.imageClassName ? `p-0 ${product.imageClassName}` : 'p-1 sm:p-2'
                              }`}
                            />
                          </div>

                          {/* Separate container below the image for product text, description/barcode, and buttons */}
                          <div className="w-full flex flex-col flex-grow justify-between pt-2 pb-0.5 sm:pb-1 px-1 sm:px-1.5">
                            {product.description ? (
                              /* Clean Left-aligned Product Name and Natural Flow Description */
                              <div className="w-full text-left mb-1.5 sm:mb-2">
                                <h4
                                  className="w-full font-montserrat font-bold text-[13px] xs:text-[14px] sm:text-[15px] lg:text-[16px] text-[#171717] leading-snug mb-1 text-left"
                                  title={product.particular}
                                >
                                  {product.name}
                                </h4>
                                <p className="w-full font-jakarta text-[10px] xs:text-[10.5px] sm:text-[11.5px] text-gray-500 leading-normal text-left">
                                  {product.description}
                                </p>
                              </div>
                            ) : (
                              /* Default Category Title & Barcode */
                              <div className="w-full flex flex-col items-center text-center">
                                <h3
                                  className="w-full font-montserrat font-bold text-[11.5px] xs:text-[13px] sm:text-[15px] text-[#171717] leading-[1.3] sm:leading-[1.35] h-[32px] xs:h-[35px] sm:h-[42px] mb-1 sm:mb-1.5 text-center overflow-hidden flex flex-col justify-center"
                                  title={product.particular}
                                >
                                  <span className="block truncate">{line1}</span>
                                  <span className="block truncate">{line2}</span>
                                </h3>

                                <p className="w-full font-mono text-[9.5px] xs:text-[10.5px] sm:text-[12px] text-gray-500 tracking-tight sm:tracking-wider mb-2 sm:mb-2.5 text-center truncate">
                                  {product.barcode || '\u00A0'}
                                </p>
                              </div>
                            )}

                            {/* Action Buttons: Inquire Now, WhatsApp & Telegram Inline Side-by-Side */}
                            <div className="w-full flex items-center gap-1 xs:gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                              <button
                                type="button"
                                onClick={() => openProductInquiryModal(product)}
                                className="flex-1 py-1.5 sm:py-2.5 px-1 sm:px-2 bg-[#147A5F] hover:bg-[#0f5f4a] text-white text-[9px] xs:text-[10px] sm:text-xs font-bold font-montserrat tracking-tight sm:tracking-wide uppercase flex items-center justify-center gap-0.5 sm:gap-1.5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99] rounded-md sm:rounded-lg whitespace-nowrap min-w-0"
                              >
                                <span>
                                  <span className="hidden xs:inline">Inquire Now</span>
                                  <span className="xs:hidden">Inquire</span>
                                </span>
                                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                              </button>

                              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                                <a
                                  href={typeof getWhatsAppUrl === 'function' ? getWhatsAppUrl(defaultWhatsAppMessage) : '#'}
                                  onClick={(e) => {
                                    if (typeof handleWhatsAppRedirect === 'function') {
                                      handleWhatsAppRedirect(e, defaultWhatsAppMessage);
                                    }
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Contact on WhatsApp"
                                  aria-label="Contact on WhatsApp"
                                  className="py-1.5 sm:py-2.5 px-2 xs:px-2.5 sm:px-3 bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99] rounded-md sm:rounded-lg shrink-0"
                                >
                                  <FaWhatsapp className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                </a>

                                <a
                                  href={telegramChannelUrl || 'https://t.me/crownexcelae'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Join Crown Excel Telegram Channel"
                                  aria-label="Crown Excel Telegram Channel"
                                  className="py-1.5 sm:py-2.5 px-2 xs:px-2.5 sm:px-3 bg-[#0088cc] hover:bg-[#0077b5] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99] rounded-md sm:rounded-lg shrink-0"
                                >
                                  <FaTelegramPlane className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
