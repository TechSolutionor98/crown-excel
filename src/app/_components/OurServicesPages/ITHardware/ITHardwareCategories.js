'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  HiOutlineServer, 
  HiOutlineChip, 
  HiOutlineDatabase, 
  HiOutlineDesktopComputer, 
  HiOutlineDeviceMobile, 
  HiOutlineShieldCheck, 
  HiOutlinePrinter, 
  HiOutlineLightningBolt,
  HiOutlineViewGrid,
  HiArrowRight,
  HiCheck
} from 'react-icons/hi';
import { safeRender } from '@/lib/safe-html';

import ServerImg from '@/Components/Images/coreinfrastrucutre2.jpg';
import NetworkImg from '@/Components/Images/NetworkingSolutions.jpg';
import StorageImg from '@/Components/Images/optimizedstorage.jpg';
import LaptopImg from '@/Components/Images/BannerLaptop1.png';
import DesktopImg from '@/Components/Images/DesktopBanner1.png';
import SecurityImg from '@/Components/Images/completesecurity.jpg';
import CablingImg from '@/Components/Images/switchingbanner1.png';
import PrinterImg from '@/Components/Images/HighPerformancePrinters.png';
import UpsImg from '@/Components/Images/HighComputing.jpg';

export default function ITHardwareCategories({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'ENTERPRISE HARDWARE CATALOG');
  const [activeTab, setActiveTab] = useState('all');

  const categories = useMemo(() => [
    {
      id: 'servers',
      group: 'datacenter',
      title: 'Enterprise Servers & Rack Systems',
      subtitle: 'Rackmount, Tower & High-Density Systems',
      description: 'Enterprise server hardware engineered for virtualization, database hosting, corporate ERPs, and cloud workloads.',
      brands: 'HPE ProLiant (Gen10/Gen11), Dell PowerEdge (15G/16G), Lenovo ThinkSystem',
      highlights: ['Dual Intel Xeon & AMD EPYC Processors', 'Hot-swap redundant power supplies & drive bays', 'Hardware RAID controllers & remote iLO/iDRAC management', 'Factory-sealed with manufacturer warranty'],
      image: ServerImg,
      icon: <HiOutlineServer className="w-5 h-5" />,
      badge: 'Core Infrastructure',
    },
    {
      id: 'networking',
      group: 'datacenter',
      title: 'Enterprise Networking & Switching',
      subtitle: 'Managed Core, Distribution & Edge Switching',
      description: 'High-throughput enterprise switches, multi-gigabit core routers, Wi-Fi 6 wireless access points, and transceivers.',
      brands: 'Cisco Catalyst, Aruba CX, Mikrotik, TP-Link Omada',
      highlights: ['1G / 10G / 25G / 40G / 100G Managed Ports', 'Layer 2+ & Layer 3 full enterprise routing', 'PoE / PoE+ / PoE++ for IP phones and cameras', 'SFP+ transceivers & DAC stacking cables'],
      image: NetworkImg,
      icon: <HiOutlineChip className="w-5 h-5" />,
      badge: 'Network Hardware',
    },
    {
      id: 'storage',
      group: 'datacenter',
      title: 'Enterprise Storage & NAS Solutions',
      subtitle: 'SAN, Network Attached Storage & Backup Vaults',
      description: 'Reliable data storage arrays designed for high IOPS, centralized file sharing, automated replication, and secure backup.',
      brands: 'Synology, QNAP, Dell PowerVault, HPE MSA',
      highlights: ['High-availability dual-controller storage options', 'Unified iSCSI, NFS, SMB & S3-compatible support', 'Data deduplication, snapshotting & scheduled backups', 'Scalable from multi-terabyte to petabyte capacity'],
      image: StorageImg,
      icon: <HiOutlineDatabase className="w-5 h-5" />,
      badge: 'Storage & Backup',
    },
    {
      id: 'laptops',
      group: 'computing',
      title: 'Commercial Laptops & Mobile Workstations',
      subtitle: 'Business Ultrabooks & High-Performance Portables',
      description: 'Business-class laptops designed for corporate fleet standardization, durability, and day-long productivity.',
      brands: 'Lenovo ThinkPad, HP EliteBook & ProBook, Dell Latitude, Apple MacBook Pro',
      highlights: ['Intel Core Ultra & AMD Ryzen Pro Processors', 'Hardware-level TPM 2.0 & biometric security', 'Durable chassis tested to MIL-STD standards', 'Volume fleet quantities available for corporates'],
      image: LaptopImg,
      icon: <HiOutlineDeviceMobile className="w-5 h-5" />,
      badge: 'Commercial Fleet',
    },
    {
      id: 'workstations',
      group: 'computing',
      title: 'Desktop Workstations & Corporate PCs',
      subtitle: 'CAD/Engineering Towers & Compact All-in-Ones',
      description: 'High-performance desktop PCs and dedicated engineering workstations for intensive multi-tasking and graphics applications.',
      brands: 'HP Z-Series, Dell Precision & OptiPlex, Lenovo ThinkCentre, Apple iMac',
      highlights: ['Support for professional NVIDIA GPUs', 'Fast PCIe NVMe SSDs & expandable DDR5 RAM', 'Compact Micro, Small Form Factor & Tower options', 'Clean All-in-One desktops for corporate workstations'],
      image: DesktopImg,
      icon: <HiOutlineDesktopComputer className="w-5 h-5" />,
      badge: 'Workstations',
    },
    {
      id: 'security',
      group: 'security',
      title: 'Next-Gen Firewalls & Network Security',
      subtitle: 'Perimeter Security Appliances & VPN Gateways',
      description: 'Enterprise gateway firewalls providing deep packet inspection, secure branch SD-WAN, and zero-day threat prevention.',
      brands: 'Fortinet FortiGate (40F, 60F, 70F, 100F), Sophos XGS',
      highlights: ['High-throughput firewall & IPS inspection', 'Enterprise VPN for branch and remote workforces', 'Centralized threat management and reporting', 'Genuine vendor renewal licenses available'],
      image: SecurityImg,
      icon: <HiOutlineShieldCheck className="w-5 h-5" />,
      badge: 'Cyber Security',
    },
    {
      id: 'cabling',
      group: 'datacenter',
      title: 'Server Racks, Structured Cabling & PDUs',
      subtitle: 'Data Cabinets, Copper Cable Drums & Patch Panels',
      description: 'Heavy-duty 24U and 42U server enclosures, Cat6/Cat6A copper cabling, patch panels, cable managers, and rackmount PDUs.',
      brands: 'Schneider Electric, Toten, D-Link, CommScope',
      highlights: ['High-ventilation perforated server racks', 'Verified Cat6 & Cat6A LSZH 305m cable drums', 'High-density RJ45 & fiber patch panels', 'Rack power distribution units (basic & metered)'],
      image: CablingImg,
      icon: <HiOutlineViewGrid className="w-5 h-5" />,
      badge: 'Cabling & Racks',
    },
    {
      id: 'printers',
      group: 'computing',
      title: 'Commercial Printers, Copiers & Scanners',
      subtitle: 'Office Multifunction Laser Printers & Scanners',
      description: 'Heavy-duty laser printers and enterprise multifunction machines designed for low cost-per-page and volume document workflows.',
      brands: 'HP LaserJet Enterprise, Canon imageRUNNER, Xerox, Brother, Epson',
      highlights: ['Fast print speeds with automatic duplexing', 'Secure PIN print release & audit logging', 'High monthly duty cycles for busy offices', 'Genuine manufacturer toner and drum supplies'],
      image: PrinterImg,
      icon: <HiOutlinePrinter className="w-5 h-5" />,
      badge: 'Office Equipment',
    },
    {
      id: 'ups',
      group: 'security',
      title: 'Power Protection & Server Room UPS',
      subtitle: 'Online Double-Conversion Rack & Tower Battery Backups',
      description: 'Uninterruptible power supplies engineered to safeguard mission-critical IT equipment from power surges, sags, and outages.',
      brands: 'APC by Schneider Smart-UPS, Eaton, Vertiv',
      highlights: ['True online double-conversion topology', 'Pure sine wave power output for sensitive electronics', 'Hot-swappable enterprise battery replacements', 'Network management cards for automated safe shutdowns'],
      image: UpsImg,
      icon: <HiOutlineLightningBolt className="w-5 h-5" />,
      badge: 'Power Protection',
    },
  ], []);

  const filteredCategories = useMemo(() => {
    if (activeTab === 'all') return categories;
    return categories.filter((c) => c.group === activeTab);
  }, [categories, activeTab]);

  return (
    <section 
      id="hardware-categories"
      className="relative w-full bg-gray-50 text-gray-900 py-20 lg:py-28 overflow-hidden border-b border-gray-200/80"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineViewGrid className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-5">
            {safeRender(fields.heading, "Comprehensive IT Hardware Categories We Distribute")}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {safeRender(
              fields.paragraph,
              "From enterprise server and storage infrastructure to corporate office computing, explore genuine hardware product lines sourced from authorized channels for businesses in Dubai and the UAE."
            )}
          </p>

          {/* Group Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#16CA9A] text-white shadow-md shadow-[#16CA9A]/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Categories ({categories.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('datacenter')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'datacenter'
                  ? 'bg-[#16CA9A] text-white shadow-md shadow-[#16CA9A]/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Servers, Storage & Networking
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('computing')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'computing'
                  ? 'bg-[#16CA9A] text-white shadow-md shadow-[#16CA9A]/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Laptops, Desktops & Printers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#16CA9A] text-white shadow-md shadow-[#16CA9A]/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Security Firewalls & UPS
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col rounded-2xl bg-white border border-gray-200 hover:border-[#16CA9A] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Top Image Preview */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-100 border-b border-gray-100">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-gray-800 border border-white/60 shadow-sm">
                  {cat.badge}
                </div>

                {/* Category Icon Badge */}
                <div className="absolute bottom-3.5 left-4 w-10 h-10 rounded-xl bg-[#16CA9A] text-white flex items-center justify-center shadow-md">
                  {cat.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-montserrat group-hover:text-[#16CA9A] transition-colors mb-1">
                    {cat.title}
                  </h3>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 font-urbanist">
                    {cat.subtitle}
                  </div>

                  <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Brands pill */}
                  <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-700 mb-4">
                    <span className="font-bold text-[#16CA9A]">Brands: </span>
                    <span>{cat.brands}</span>
                  </div>

                  {/* Feature Highlights */}
                  <ul className="space-y-2 mb-6">
                    {cat.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <HiCheck className="w-4 h-4 text-[#16CA9A] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <button
                  type="button"
                  onClick={() => onOpenInquiry(`Inquiry for ${cat.title}`)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-gray-900 bg-gray-100 hover:bg-[#16CA9A] hover:text-white border border-gray-200 hover:border-[#16CA9A] transition-all duration-300 cursor-pointer"
                >
                  <span>Request Pricing & Stock</span>
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-montserrat mb-1">
              Need a Specific Model, Part Number or Custom Hardware Configuration?
            </h4>
            <p className="text-sm text-gray-600 font-roboto">
              Share your required bill of materials (BOM), part numbers, or tender specifications with our procurement team.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenInquiry('Custom Hardware BOM Lookup')}
            className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#16CA9A] hover:bg-[#14b589] shadow-md shadow-[#16CA9A]/20 transition-all cursor-pointer"
          >
            Submit Your BOM / RFQ
          </button>
        </div>

      </div>
    </section>
  );
}
