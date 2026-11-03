"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
// import { ChevronDown } from 'lucide-react';
import './Navbar.css';
import { FaSortDown, FaChevronDown } from "react-icons/fa";
// import { RiMenu3Fill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import mobileLogo from '../Images/Mobile-logo.png'
import grabLogo from '../Images/admin-logo.svg'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouteStatus } from '@/context/RouteStatusContext';
import { FaAngleDown } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaLaptop, FaDesktop, FaPrint, FaNetworkWired, FaMouse, FaTools, FaMobileAlt, FaServer, FaUserTie, FaCogs, FaUsers, FaHistory, FaCommentDots, FaQuestionCircle } from "react-icons/fa";
import { MdDevicesOther, MdRouter, MdSecurity } from "react-icons/md";
import logo from '../Images/logos.png';
import { TbCloudComputing } from "react-icons/tb";
import { CgSmartphoneChip } from "react-icons/cg";
import { FaLongArrowAltDown } from "react-icons/fa";
import { BiCctv } from "react-icons/bi";

function Navbar() {
  const navLinks = useMemo(() => [
    { label: 'Home', href: '/' },
    {
      label: 'Company',
      // href: '',
      icon: <FaSortDown className='icon' />,
      hasDropdown: true,
      dropdown: [
        { label: 'About Us', href: '/company/about-us' },
        { label: 'Company History', href: '/company/company-history' },
        { label: 'Crown Excel Family', href: '/company/crown-excel-family' },
        { label: 'Director Message', href: '/company/director-message' },
        { label: 'Events', href: '/company/events' },
        { label: 'Career', href: '/company/career' },
        { label: 'Blogs', href: '/blogs' },

        // { label: 'Leader Team', href: '/company/leader-team' },
      ],
    },

    {
      label: 'Products',
      // href: '',
      icon: <FaSortDown className='icon' />,
      hasDropdown: true,
      dropdown: [
        { label: 'Laptop', href: '/products/laptops' },
        { label: 'Desktop', href: '/products/pc' },
        { label: 'All in One', href: '/products/all-in-one' },
        { label: 'Printers', href: '/products/printers' },
        { label: 'Routers', href: '/products/routers-access-points' },
        { label: 'Switching', href: '/products/switching' },
        { label: 'Scanners and Copier', href: '/products/scanners-copier' },
        { label: 'Keyboard & Mouse', href: '/products/keyboard-mouse' },
        { label: 'Accessories', href: '/products/accessories' },
        { label: 'Biometric', href: '/products/biometrics' },
        { label: 'Phones', href: '/products/phones' },
        { label: 'CCTV', href: '/products/cctv' },
      ],
    },

    {
      label: 'Services',
      // href: '/our-services',
      icon: <FaSortDown className='icon' />,
      hasDropdown: true,
      dropdown: [

        { label: 'Networking', href: '/our-services/networking' },
        { label: 'Cloud Computing', href: '/our-services/cloud-computing' },
        { label: 'IT Infrastructure', href: '/our-services/it-infrastructure' },
        { label: 'IT Consultancy', href: '/our-services/it-consultancy' },
        { label: 'Long/Short Term AMC', href: '/our-services/long/short-term-amc' },
        { label: 'Software Solutions', href: '/our-services/software-solutions' },
        { label: 'Security Solutions', href: '/our-services/security-solutions' },
        { label: 'Storage & Virtualization', href: '/our-services/storage&virtualization' },
      ],
    },

    { label: 'Our Management', href: '/our-management' },
    { label: 'Contact Us', href: '/contact-us' },
  ], []);

  const { isRouteActive } = useRouteStatus();

  // Filter links dynamically according to page active/inactive status
  const visibleNavLinks = useMemo(() => {
    return navLinks
      .filter(item => {
        if (item.href && !item.hasDropdown) {
          return isRouteActive(item.href);
        }
        return true;
      })
      .map(item => {
        if (!item.hasDropdown || !Array.isArray(item.dropdown)) {
          return item;
        }
        const activeDropdown = item.dropdown.filter(sub => isRouteActive(sub.href));
        return {
          ...item,
          dropdown: activeDropdown,
        };
      })
      .filter(item => {
        if (item.hasDropdown) {
          return item.dropdown && item.dropdown.length > 0;
        }
        return true;
      });
  }, [navLinks, isRouteActive]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const hoverTimeout = useRef(null);
  const productsDropdownRef = useRef(null);
  const [showProductsScroll, setShowProductsScroll] = useState(false);
  // Mobile menu states to allow custom enter/exit animation
  // mobileMenuShown controls whether the panel is mounted (visible to pointer-events)
  // mobileMenuOpen controls the transform class (open vs initial/offscreen)
  // isClosing detects when we should animate out to the opposite side
  const [mobileMenuShown, setMobileMenuShown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileMenuSide, setMobileMenuSide] = useState('left');
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // Track if products dropdown is scrolled to bottom
  const [atBottom, setAtBottom] = useState(false);
  const [medNav, setMedNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (hoveredIndex !== null && visibleNavLinks[hoveredIndex]?.label === 'Products') {
      const el = productsDropdownRef.current;
      if (!el) return;
      const handleScroll = () => {
        setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
      };
      el.addEventListener('scroll', handleScroll);
      // Initial check
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
      return () => el.removeEventListener('scroll', handleScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredIndex, visibleNavLinks]);

  const handleMouseEnter = (i) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredIndex(i);
    // Check if Products dropdown needs scroll arrow
    if (visibleNavLinks[i]?.label === 'Products') {
      setTimeout(() => {
        if (productsDropdownRef.current && productsDropdownRef.current.scrollHeight > 320) {
          setShowProductsScroll(true);
        } else {
          setShowProductsScroll(false);
        }
      }, 0);
    } else {
      setShowProductsScroll(false);
    }
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 500); // 0.5 seconds
  };

  // Helpers to open/close mobile menu with smooth cross-screen animation
  const openMobileMenu = (side = 'left') => {
    setMobileMenuSide(side);
    setIsClosing(false);
    setMobileMenuShown(true);
    // small delay so the element mounts with the initial offscreen transform
    setTimeout(() => setMobileMenuOpen(true), 20);
  };

  const closeMobileMenu = () => {
    // Trigger the exit animation (open -> animate to the opposite side)
    setIsClosing(true);
    setMobileMenuOpen(false);
    // After transition ends, unmount the panel and reset state
    setTimeout(() => {
      setMobileMenuShown(false);
      setIsClosing(false);
    }, 320); // match the transition duration (ms)
  };

  // Compute transform class so open/close animate across screen as requested:
  // - If opening (mobileMenuOpen) -> centered (translate-x-0)
  // - If closing (isClosing) -> animate to opposite side of where it opened
  // - If not mounted/opening -> stay offscreen on the original side
  const getTransformClass = () => {
    if (mobileMenuOpen) return 'translate-x-0';
    // When closing, move the panel back toward the same side it opened from
    // If it opened from left -> slide left (offscreen to left: -translate-x-full)
    // If it opened from right -> slide right (offscreen to right: translate-x-full)
    if (isClosing) return mobileMenuSide === 'left' ? '-translate-x-full' : 'translate-x-full';
    // Not mounted/opening: keep offscreen on the original side
    return mobileMenuSide === 'left' ? '-translate-x-full' : 'translate-x-full';
  };

  return (
    <header className="navbar-wrapper w-full bg-[#FFFFFF] relative z-50">
      <div className="navbar font-muli overflow-x-hidden md:overflow-x-visible lg:overflow-x-visible relative w-full max-w-[1536px] mx-auto">
        <div className="navbar-container">
        <div className="logo hidden md:flex">
        <Link href="/">
          <img
            src={logo.src}
            alt="Logo"
            height={50}
            width={150}
            className="h-auto w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 fill-current"
          />
        </Link>
      </div>
      <div className="logo flex md:hidden">
        <Link href="/">
          <Image
            src={mobileLogo}
            alt="Mobile Logo"
            height={50}
            width={150}
            className="h-auto w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52"
          />
        </Link>
      </div>
      {/* Desktop NavLinks & Button */}
      <div className="hidden md:flex lg:hidden justify-center flex-1">
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={() => setMedNav(!medNav)}
          aria-label="Toggle medium navbar"
        >
          <FiMenu className="w-8 h-8" />
        </button>
      </div>
      {/* Medium Screen NavLinks (Dropdown) */}
      {/* Medium Screen NavLinks (Dropdown) */}
      {/* Animated Medium Screen Nav */}
      <div
        className={`absolute top-full right-0 left-0 bg-white shadow-md overflow-hidden z-40 flex lg:hidden flex-col ${medNav ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        style={{ transitionDelay: medNav ? '0.2s' : '0s' }}
      >
        <div className="mx-auto w-11/12 sm:w-10/12 md:w-8/12">
            <ul className="flex flex-col ">
              {visibleNavLinks.map((item, i) => (
                <li key={i} className="border-b border-gray-100">
                  <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`text-base font-semibold flex-1 transition-colors duration-150 ${pathname === item.href ? 'text-white bg-green-900 px-3 py-1 rounded' : 'text-gray-800 hover:text-[#084032]'}`}
                        onClick={() => {
                          if (item.hasDropdown) {
                            setOpenDropdownIndex(openDropdownIndex === i ? null : i);
                          } else {
                            setMedNav(false);
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className="text-base font-semibold flex-1 text-gray-800 cursor-pointer"
                        onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                      >
                        {item.label}
                      </span>
                    )}
                  {item.hasDropdown && (
                    <button
                      className="ml-3 text-gray-600 focus:outline-none p-2 rounded hover:bg-gray-100"
                      onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                      aria-label={`Toggle ${item.label} dropdown`}
                      type="button"
                    >
                      <FaSortDown className={`${openDropdownIndex === i ? 'rotate-180 text-[#084032]' : 'text-gray-600'}`} />
                    </button>
                  )}
                </div>

                {/* Dropdown Items - responsive grid to match desktop */}
                {item.hasDropdown && (
                  <div className={`overflow-hidden ${openDropdownIndex === i ? 'max-h-[1000px] py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                    <div className="px-4 pb-3">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.dropdown.map((subItem, j) => {
                          const menuItems = {
                            'Laptop': { icon: <FaLaptop size={20} className="text-green-900" />, desc: 'Portable computing solutions' },
                            'Desktop': { icon: <FaDesktop size={20} className="text-green-900" />, desc: 'Powerful desktop systems' },
                            'All in One': { icon: <MdDevicesOther size={20} className="text-green-900" />, desc: 'Integrated computer solutions' },
                            'Printers': { icon: <FaPrint size={20} className="text-green-900" />, desc: 'Professional printing devices' },
                            'Routers': { icon: <MdRouter size={20} className="text-green-900" />, desc: 'Network connectivity devices' },
                            'Switching': { icon: <FaNetworkWired size={20} className="text-green-900" />, desc: 'Network switching solutions' },
                            'Scanners and Copier': { icon: <FaPrint size={20} className="text-green-900" />, desc: 'Document processing systems' },
                            'Keyboard & Mouse': { icon: <FaMouse size={20} className="text-green-900" />, desc: 'Input peripherals' },
                            'Accessories': { icon: <FaTools size={20} className="text-green-900" />, desc: 'Computer peripherals & add-ons' },
                            'Biometric': { icon: <MdSecurity size={20} className="text-green-900" />, desc: 'Security authentication systems' },
                            'Phones and CCTV': { icon: <FaMobileAlt size={20} className="text-green-900" />, desc: 'Communication & surveillance' },
                            'Phones': { icon: <FaMobileAlt size={20} className="text-green-900" />, desc: 'Smartphones & mobile devices' },
                            'CCTV': { icon: <BiCctv size={20} className="text-green-900" />, desc: 'Security & surveillance cameras' },
                            'Networking': { icon: <FaNetworkWired size={20} className="text-green-900" />, desc: 'Complete networking solutions' },
                            'Cloud Computing': { icon: <TbCloudComputing size={20} className="text-green-900" />, desc: 'Scalable cloud data solutions' },
                            'IT Infrastructure': { icon: <FaServer size={20} className="text-green-900" />, desc: 'Comprehensive IT management' },
                            'IT Consultancy': { icon: <FaUserTie size={20} className="text-green-900" />, desc: 'Expert technology guidance' },
                            'Long/Short Term AMC': { icon: <FaCogs size={20} className="text-green-900" />, desc: 'Hardware maintenance contracts' },
                            'Software Solutions': { icon: <CgSmartphoneChip size={20} className="text-green-900" />, desc: 'Software support agreements' },
                            'Security Solutions': { icon: <FaTools size={20} className="text-green-900" />, desc: 'Device repair & maintenance' },
                            'Storage & Virtualization': { icon: <FaServer size={20} className="text-green-900" />, desc: 'Server maintenance solutions' },
                            'About Us': { icon: <FaUsers size={20} className="text-green-900" />, desc: 'Learn about our company' },
                            'Company History': { icon: <FaHistory size={20} className="text-green-900" />, desc: 'Our journey through time' },
                            'Crown Excel Family': { icon: <FaUsers size={20} className="text-green-900" />, desc: 'Meet our team members' },
                            'Director Message': { icon: <FaCommentDots size={20} className="text-green-900" />, desc: 'A message from leadership' },
                            'Events': { icon: <FaCommentDots size={20} className="text-green-900" />, desc: 'Recent company activities' },
                            'Career': { icon: <FaUserTie size={20} className="text-green-900" />, desc: 'Join our growing team' },
                            'Blogs': { icon: <FaCommentDots size={20} className="text-green-900" />, desc: 'Insights & technology articles' },
                            'FAQ': { icon: <FaQuestionCircle size={20} className="text-green-900" />, desc: 'Frequently asked questions' },
                            'Our Management': { icon: <FaUserTie size={20} className="text-green-900" />, desc: 'Leadership team profiles' },
                            'Contact Us': { icon: <FaCommentDots size={20} className="text-green-900" />, desc: 'Get in touch with us' },
                          };
                          const menuItem = menuItems[subItem.label] || { icon: <FaChevronDown size={20} className="text-green-900" />, desc: 'More information' };
                          const isActive = pathname === subItem.href || decodeURIComponent(pathname) === subItem.href;

                          return (
                            <li key={j} className={`rounded-lg group hover:bg-[#084032] ${isActive ? 'bg-[#084032]' : ''}`}>
                              <Link
                                href={subItem.href}
                                onClick={() => { setHoveredIndex(null); setOpenDropdownIndex(null); }}
                                className="flex items-start p-2 gap-2"
                              >
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 flex items-center justify-center bg-[#f1f5f9] rounded-lg">
                                    {menuItem.icon}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>{subItem.label}</span>
                                  <span className={`text-xs mt-1 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{menuItem.desc}</span>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>



      <ul className="nav-links flex gap-0 items-center hidden md:flex">

        {visibleNavLinks.map((item, i) => (
          <li
            key={i}
            className="relative list-none text-white nav-linkss"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            {item.href ? (
              <Link
                href={item.href}
                className={`flex items-center gap-1 `}
                onMouseEnter={() => handleMouseEnter(i)}
                onFocus={() => handleMouseEnter(i)}
                onBlur={handleMouseLeave}
                onClick={() => { setHoveredIndex(null); setOpenDropdownIndex(null); }}
              >
                {item.label}
                {item.hasDropdown && <FaSortDown className="text-sm -mt-1" />}
              </Link>
            ) : (
              <span
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  setOpenDropdownIndex(openDropdownIndex === i ? null : i);
                  setHoveredIndex(openDropdownIndex === i ? null : i);
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onFocus={() => handleMouseEnter(i)}
                onBlur={handleMouseLeave}
              >
                {item.label}
                {item.hasDropdown && <FaSortDown className="text-sm -mt-1" />}
              </span>
            )}
            {Array.isArray(item.dropdown) && hoveredIndex === i && (
              <div
                className="fixed left-0 right-0 mt-0 bg-white p-2 text-black shadow-lg z-50 border-t border-gray-100"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                style={{ borderBottom: '1px solid #e5e7eb', top: '76px', width: '57%', margin: 'auto' }}
              >
                <div className="container mx-auto p-2 max-w-6xl">
                  {/* Grid layout for dropdown items - 3 columns with minimal gap */}
                  <ul
                    ref={item.label === 'Products' ? productsDropdownRef : null}
                    className={`max-h-[460px] overflow-y-auto hide-scrollbar grid grid-cols-3 gap-3`}
                  >
                    {item.dropdown.map((subItem, j) => {
                      // Icon mapping by label with descriptions
                      const menuItems = {
                        'Laptop': {
                          icon: <FaLaptop size={24} className="text-green-900" />,
                          desc: "Portable computing solutions"
                        },
                        'Desktop': {
                          icon: <FaDesktop size={24} className="text-green-900" />,
                          desc: "Powerful desktop systems"
                        },
                        'All in One': {
                          icon: <MdDevicesOther size={24} className="text-green-900" />,
                          desc: "Integrated computer solutions"
                        },
                        'Printers': {
                          icon: <FaPrint size={24} className="text-green-900" />,
                          desc: "Professional printing devices"
                        },
                        'Routers': {
                          icon: <MdRouter size={24} className="text-green-900" />,
                          desc: "Network connectivity devices"
                        },
                        'Switching': {
                          icon: <FaNetworkWired size={24} className="text-green-900" />,
                          desc: "Network switching solutions"
                        },
                        'Scanners and Copier': {
                          icon: <FaPrint size={24} className="text-green-900" />,
                          desc: "Document processing systems"
                        },
                        'Keyboard & Mouse': {
                          icon: <FaMouse size={24} className="text-green-900" />,
                          desc: "Input peripherals"
                        },
                        'Accessories': {
                          icon: <FaTools size={24} className="text-green-900" />,
                          desc: "Computer peripherals & add-ons"
                        },
                        'Biometric': {
                          icon: <MdSecurity size={24} className="text-green-900" />,
                          desc: "Security authentication systems"
                        },
                        'Phones and CCTV': {
                          icon: <FaMobileAlt size={24} className="text-green-900" />,
                          desc: "Communication & surveillance"
                        },
                        'Phones': {
                          icon: <FaMobileAlt size={24} className="text-green-900" />,
                          desc: "Smartphones & mobile devices"
                        },
                        'CCTV': {
                          icon: <BiCctv size={24} className="text-green-900" />,
                          desc: "Security & surveillance cameras"
                        },
                        'Networking': {
                          icon: <FaNetworkWired size={24} className="text-green-900" />,
                          desc: "Complete networking solutions"
                        },
                        'Cloud Computing': {
                          icon: <TbCloudComputing size={24} className="text-green-900" />,
                          desc: "Scalable cloud data solutions"
                        },
                        'IT Infrastructure': {
                          icon: <FaServer size={24} className="text-green-900" />,
                          desc: "Comprehensive IT management"
                        },
                        'IT Consultancy': {
                          icon: <FaUserTie size={24} className="text-green-900" />,
                          desc: "Expert technology guidance"
                        },
                        'Long/Short Term AMC': {
                          icon: <FaCogs size={24} className="text-green-900" />,
                          desc: "Hardware maintenance contracts"
                        },
                        'Software Solutions': {
                          icon: <CgSmartphoneChip  size={24} className="text-green-900" />,
                          desc: "Software support agreements"
                        },
                        'Security Solutions': {
                          icon: <FaTools size={24} className="text-green-900" />,
                          desc: "Advanced cybersecurity and protection"
                        },
                        'Storage & Virtualization': {
                          icon: <FaServer size={24} className="text-green-900" />,
                          desc: "Server maintenance solutions"
                        },
                        'About Us': {
                          icon: <FaUsers size={24} className="text-green-900" />,
                          desc: "Learn about our company"
                        },
                        'Company History': {
                          icon: <FaHistory size={24} className="text-green-900" />,
                          desc: "Our journey through time"
                        },
                        'Crown Excel Family': {
                          icon: <FaUsers size={24} className="text-green-900" />,
                          desc: "Meet our team members"
                        },
                        'Director Message': {
                          icon: <FaCommentDots size={24} className="text-green-900" />,
                          desc: "A message from leadership"
                        },
                        'Events': {
                          icon: <FaCommentDots size={24} className="text-green-900" />,
                          desc: "Recent company activities"
                        },
                        'Career': {
                          icon: <FaUserTie size={24} className="text-green-900" />,
                          desc: "Join our growing team"
                        },
                        'Blogs': {
                          icon: <FaCommentDots size={24} className="text-green-900" />,
                          desc: "Insights & technology articles"
                        },
                        'FAQ': {
                          icon: <FaQuestionCircle size={24} className="text-green-900" />,
                          desc: "Frequently asked questions"
                        },
                        'Our Management': {
                          icon: <FaUserTie size={24} className="text-green-900" />,
                          desc: "Leadership team profiles"
                        },
                        'Contact Us': {
                          icon: <FaCommentDots size={24} className="text-green-900" />,
                          desc: "Get in touch with us"
                        },
                      };

                      const menuItem = menuItems[subItem.label] || {
                        icon: <FaChevronDown size={24} className="text-green-900" />,
                        desc: "More information"
                      };

                      const isActive = pathname === subItem.href || decodeURIComponent(pathname) === subItem.href;

                      return (
                        <li key={j} className={`rounded-lg hover:bg-[#084032] group ${isActive ? 'bg-[#084032]' : ''}`}>
                          <Link
                            href={subItem.href}
                            onClick={() => { setHoveredIndex(null); setOpenDropdownIndex(null); }}
                            className="flex items-start p-2 gap-2"
                          >
                            <div className="flex-shrink-0">
                              {/* Icon container with the specified color */}
                              <div className="w-10 h-10 flex items-center justify-center bg-[#f1f5f9] text-[hsl(165deg_77.78%_14.12%)] rounded-lg">
                                {menuItem.icon}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              {/* Title with hover effect using the specified color */}
                              <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>{subItem.label}</span>
                              <span className={`text-xs mt-1 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{menuItem.desc}</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {item.label === 'Products' && !atBottom && (
                  <div className={`flex justify-center py-1 text-black font-[700] text-[20px] ${showProductsScroll && !atBottom ? 'opacity-100' : 'opacity-0'}`}>
                    <FaAngleDown className={`${showProductsScroll && !atBottom ? '' : ''}`} />
                  </div>
                )}
              </div>
            )}

          </li>
        ))}
      </ul>
      <div className="nav-button hidden md:block">
        <Link
          href="https://grabatoz.ae"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-200 text-black w-36 h-11 text-base rounded-full shadow-md font-muli inline-flex items-center justify-center"
        >
          Our Retail Store
        </Link>

      </div>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden  flex items-center text-2xl font-extrabold focus:outline-none"
        onClick={() => { if (mobileMenuShown) { closeMobileMenu(); } else { openMobileMenu('left'); } setMedNav(false); }}
        // Double-click opens from right if closed, or closes if open
        onDoubleClick={() => { if (mobileMenuShown) { closeMobileMenu(); } else { openMobileMenu('right'); } setMedNav(false); }}
        aria-label="Open mobile menu"
      >
        <FaBarsStaggered className='font-extrabold text-[30px] text-green-950' />
      </button>
      </div>
      {/* Mobile NavLinks Drawer (slide in from left or right, smooth open/close) */}
      {mobileMenuShown && <div className={`mobile-navbar fixed inset-0 z-50 flex flex-col md:hidden pointer-events-auto`}>
         {/* Overlay to prevent scrolling behind and close on click */}
         <div
           className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out ${mobileMenuShown && mobileMenuOpen ? 'opacity-100' : (mobileMenuShown ? 'opacity-20' : 'opacity-0')}`}
           onClick={() => closeMobileMenu()}
         ></div>
         {/* Slide-in menu from the chosen side. When closing we animate to the far right so it moves across the screen. */}
        <div
          className={`bg-white h-full max-w-[90vw] w-full fixed top-0 ${mobileMenuSide === 'right' ? 'right-0' : 'left-0'} shadow-xl transform ${getTransformClass()} transition-transform duration-300 ease-in-out pointer-events-auto`}
        >
          <div className="p-4 flex flex-col gap-4 h-full">
            <div className="logo-icon-button flex items-center justify-between">
              <div className="logo">
                <Link href='/'><Image className='text-green-900' onClick={() => closeMobileMenu()} width={100} height={100} src={mobileLogo} alt="Mobile Logo" /></Link>
              </div>
              <button
                type="button"
                className="self-end text-[16px] font-bold mb-4 border-2 rounded-full text-green-900 w-[34px] h-[34px] flex items-center justify-center"
                onClick={() => closeMobileMenu()}
                aria-label="Close mobile menu"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <ul className="flex flex-col gap-1">
                {visibleNavLinks.map((item, i) => (
                  <li key={i} className="border-b border-gray-100">
                    <div className="flex items-center justify-between px-3 py-3">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`text-base font-semibold flex-1 ${pathname === item.href ? 'text-white bg-green-900 px-3 py-1 rounded' : 'text-gray-800'}`}
                          onClick={() => {
                            if (!item.hasDropdown) closeMobileMenu();
                          }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          className="text-base font-semibold flex-1 text-gray-800 cursor-pointer"
                          onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                        >
                          {item.label}
                        </span>
                      )}
                      {item.hasDropdown && (
                        <button
                          type="button"
                          className="ml-3 text-gray-600 focus:outline-none p-2 rounded hover:bg-gray-100"
                          onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                          aria-label={`Toggle ${item.label} dropdown`}
                        >
                          <FaSortDown className={`${openDropdownIndex === i ? 'rotate-180 text-[#084032]' : 'text-gray-600'}`} />
                        </button>
                      )}
                    </div>

                    {item.hasDropdown && (
                      <div className={`overflow-hidden ${openDropdownIndex === i ? 'max-h-[1000px] py-2 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                        <div className="px-3">
                          <ul className="flex flex-col gap-2">
                            {item.dropdown.map((subItem, j) => {
                              const menuItems = {
                                'Laptop': { icon: <FaLaptop size={18} className="text-green-900" />, desc: 'Portable computing solutions' },
                                'Desktop': { icon: <FaDesktop size={18} className="text-green-900" />, desc: 'Powerful desktop systems' },
                                'All in One': { icon: <MdDevicesOther size={18} className="text-green-900" />, desc: 'Integrated computer solutions' },
                                'Printers': { icon: <FaPrint size={18} className="text-green-900" />, desc: 'Professional printing devices' },
                                'Routers': { icon: <MdRouter size={18} className="text-green-900" />, desc: 'Network connectivity devices' },
                                'Switching': { icon: <FaNetworkWired size={18} className="text-green-900" />, desc: 'Network switching solutions' },
                                'Scanners and Copier': { icon: <FaPrint size={18} className="text-green-900" />, desc: 'Document processing systems' },
                                'Keyboard & Mouse': { icon: <FaMouse size={18} className="text-green-900" />, desc: 'Input peripherals' },
                                'Accessories': { icon: <FaTools size={18} className="text-green-900" />, desc: 'Computer peripherals & add-ons' },
                                'Biometric': { icon: <MdSecurity size={18} className="text-green-900" />, desc: 'Security authentication systems' },
                                'Phones and CCTV': { icon: <FaMobileAlt size={18} className="text-green-900" />, desc: 'Communication & surveillance' },
                                'Phones': { icon: <FaMobileAlt size={18} className="text-green-900" />, desc: 'Smartphones & mobile devices' },
                                'CCTV': { icon: <BiCctv size={18} className="text-green-900" />, desc: 'Security & surveillance cameras' },
                                'Networking': { icon: <FaNetworkWired size={18} className="text-green-900" />, desc: 'Complete networking solutions' },
                                'Cloud Computing': { icon: <TbCloudComputing size={18} className="text-green-900" />, desc: 'Scalable cloud data solutions' },
                                'IT Infrastructure': { icon: <FaServer size={18} className="text-green-900" />, desc: 'Comprehensive IT management' },
                                'IT Consultancy': { icon: <FaUserTie size={18} className="text-green-900" />, desc: 'Expert technology guidance' },
                                'Long/Short Term AMC': { icon: <FaCogs size={18} className="text-green-900" />, desc: 'Hardware maintenance contracts' },
                                'Software Solutions': { icon: <CgSmartphoneChip size={18} className="text-green-900" />, desc: 'Software support agreements' },
                                'Security Solutions': { icon: <FaTools size={18} className="text-green-900" />, desc: 'Advanced cybersecurity and protection' },
                                'Storage & Virtualization': { icon: <FaServer size={18} className="text-green-900" />, desc: 'Server maintenance solutions' },
                                'About Us': { icon: <FaUsers size={18} className="text-green-900" />, desc: 'Learn about our company' },
                                'Company History': { icon: <FaHistory size={18} className="text-green-900" />, desc: 'Our journey through time' },
                                'Crown Excel Family': { icon: <FaUsers size={18} className="text-green-900" />, desc: 'Meet our team members' },
                                'Director Message': { icon: <FaCommentDots size={18} className="text-green-900" />, desc: 'A message from leadership' },
                                'Events': { icon: <FaCommentDots size={18} className="text-green-900" />, desc: 'Recent company activities' },
                                'Career': { icon: <FaUserTie size={18} className="text-green-900" />, desc: 'Join our growing team' },
                                'Blogs': { icon: <FaCommentDots size={18} className="text-green-900" />, desc: 'Insights & technology articles' },
                                'FAQ': { icon: <FaQuestionCircle size={18} className="text-green-900" />, desc: 'Frequently asked questions' },
                                'Our Management': { icon: <FaUserTie size={18} className="text-green-900" />, desc: 'Leadership team profiles' },
                                'Contact Us': { icon: <FaCommentDots size={18} className="text-green-900" />, desc: 'Get in touch with us' },
                              };
                              const menuItem = menuItems[subItem.label] || { icon: <FaChevronDown size={18} className="text-green-900" />, desc: 'More information' };
                              const isActive = pathname === subItem.href || decodeURIComponent(pathname) === subItem.href;

                              return (
                                <li key={j} className={`rounded-lg group hover:bg-[#084032] ${isActive ? 'bg-[#084032]' : ''}`}>
                                  <Link
                                    href={subItem.href}
                                    onClick={() => closeMobileMenu()}
                                    className="flex items-center gap-3 p-2 rounded-lg"
                                  >
                                    <div className="w-9 h-9 flex items-center justify-center bg-[#f1f5f9] rounded-md">
                                      {menuItem.icon}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>{subItem.label}</span>
                                      <span className={`text-xs ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>{menuItem.desc}</span>
                                    </div>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col items-center'>
              {/* Blinking GIF above the button */}
              {/* <div className="flex justify-center mb-2">
                <img
                  src={grabLogo.src}
                  alt="Blinking Retail Store GIF"
                  className="h-[80px] w-full"
                  
                />
              </div> */}
              <Link href='https://grabatoz.ae' target='_blank' rel='noopener noreferrer' className='text-black text-center text-[20px] font-bold'><span className='font-normal'>Click here to visit</span> Our Retail Store</Link>
              <FaLongArrowAltDown className='text-black animate-bounce text-[20px] -mb-5 mt-2'/>
              <a href='https://grabatoz.ae' target='_blank' rel='noopener noreferrer' aria-label='Visit our retail store' className="mt-2 text-white w-full h-18 text-base rounded-full  font-montserrat flex items-center justify-center " style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Blinking GIF left side inside button, absolute and over bg */}
                <span className="flex items-center ">
                  <img
                      src={grabLogo.src}
                    alt="Blinking Retail Store GIF"
                    className="h-[60px] w-[100%] mr-2"
                    style={{ animation: 'blink 1s infinite' }}
                  />
                </span>
                <span className='sr-only'>Visit our retail store</span>
                {/* Button text right side */}
                {/* <span className=" text-lg ">Our Retail Store</span> */}
              </a>
            </div>
          </div>
        </div>
         </div>}
       </div>
    </header>
  );
}

export default Navbar;
