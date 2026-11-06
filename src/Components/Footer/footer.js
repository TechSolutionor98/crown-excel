'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../Images/logos.png"

import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  PaperPlaneRight,
} from 'phosphor-react';
import { XLogoIcon } from '@phosphor-icons/react';
import { useRouteStatus } from '@/context/RouteStatusContext';

const Footer = () => {
  const { isRouteActive } = useRouteStatus();
  const [emailInput, setEmailInput] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [settings, setSettings] = useState({
    phone: '+971 4-354 0566',
    email: 'contact@crownexcel.com',
    address: 'Al Jahra Building, 2nd floor, 18th St - Al Raffa - Dubai',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });

  const serviceLinks = [
    { label: 'Software Solutions', href: '/our-services/software-solutions' },
    { label: 'Long/Short Term AMC', href: '/our-services/long/short-term-amc' },
    { label: 'IT Consultancy', href: '/our-services/it-consultancy' },
    { label: 'Networking Solutions', mobileLabel: 'Networking', href: '/our-services/networking' },
    { label: 'Storage & Virtualization', href: '/our-services/storage&virtualization' },
    { label: 'IT Hardware Wholesale Supplier', href: '/it-hardware-wholesale-supplier-in-dubai-or-uae' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/company/about-us' },
    { label: 'Careers', href: '/company/career' },
    { label: 'Our History', href: '/company/company-history' },
    { label: 'Our Management', href: '/our-management' },
    { label: 'Blogs', href: '/blogs' },
  ];

  useEffect(() => {
    // Fetch settings from API
    fetch('/api/settings/public')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(err => {
        console.warn('Could not load settings:', err);
      });
  }, []);

  async function submitSubscription(e) {
    e?.preventDefault?.();
    if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmailMessage('Please enter a valid email');
      return;
    }
    setLoadingEmail(true);
    setEmailMessage('');
    try {
      const payload = {
        name: 'Website Subscriber',
        email: emailInput,
        phone: '',
        subject: 'Footer Subscription',
        service: 'subscription',
        comments: 'Subscribed via footer email input',
      };
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Failed to submit');
      }
      setEmailMessage('Thanks - we saved your email and notified the team.');
      setEmailInput('');
    } catch (err) {
      console.error(err);
      setEmailMessage('Failed to submit - please try again later.');
    } finally {
      setLoadingEmail(false);
      setTimeout(() => setEmailMessage(''), 6000);
    }
  }

  return (
    <footer className="text-white">
      {/* Main Footer Content */}
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section id="footer-content" className="footer-content-section relative w-full max-w-[1536px] mx-auto bg-[#084032] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="flex items-start gap-10">

              {/* Company Info - Takes 4 columns */}
              <div className="">
                <div className="mb-0">
                  <Link href="https://www.crownexcel.ae/" className="inline-block" aria-label="Crown Excel Homepage">
                    <Image
                      src={logo}
                      alt="Crown Excel Logo"
                      width={180}
                      height={90}
                      className="object-contain mb-1"
                    />
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      Let&apos;s Embrace Technology
                    </p>
                  </Link>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-white font-semibold mb-2">Follow Us</h4>
                  <div className="flex gap-4">
                    {settings.facebook && (
                      <Link href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="w-12 h-12 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                        <FacebookLogo size={24} className="text-white group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                    {settings.twitter && (
                      <Link href={settings.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit our X page" className="w-12 h-12 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                        <XLogoIcon size={24} className="text-white group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                    {settings.instagram && (
                      <Link href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="w-12 h-12 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                        <InstagramLogo size={24} className="text-white group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                    {settings.linkedin && (
                      <Link href={settings.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="w-12 h-12 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                        <LinkedinLogo size={24} className="text-white group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                    {/* Default icons if no settings */}
                    {!settings.facebook && !settings.twitter && !settings.instagram && !settings.linkedin && (
                      <>
                        <div aria-hidden="true" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                          <FacebookLogo size={24} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div aria-hidden="true" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                          <XLogoIcon size={24} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div aria-hidden="true" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                          <InstagramLogo size={24} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <div aria-hidden="true" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                          <LinkedinLogo size={24} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Newsletter Subscription */}
                <div className='mt-5'>
                  {/* <h4 className="text-white font-semibold mb-4">Newsletter</h4> */}
                  <p className="text-gray-300 mb-4 text-sm">Stay updated with our latest news and offers</p>
                  <form className="flex" onSubmit={submitSubscription}>
                    <label htmlFor="footer-email-desktop" className="sr-only">Email address</label>
                    <input
                      id="footer-email-desktop"
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      placeholder="Enter your email"
                      className="w-[250px]  bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#4ade80] transition-colors"
                    />
                    <button
                      type="submit"
                      aria-label="Submit newsletter email"
                      className={`bg-[#4ade80] hover:bg-[#22c55e] px-6 py-3 rounded-r-lg transition-colors duration-300 ${loadingEmail ? 'opacity-60 pointer-events-none' : ''}`}
                    >
                      <PaperPlaneRight size={20} className="text-white" />
                    </button>
                  </form>
                  {emailMessage && (
                    <p className="text-sm mt-3 text-gray-400">{emailMessage}</p>
                  )}
                </div>
              </div>

              <div className='flex items-start justify-between  w-full'>
                {/* Our Services - Takes 3 columns */}
                {/* Our Services - Takes 3 columns */}
                <div className="w-[200px]">
                  <h3 className="text-white text-xl font-bold mb-8 pb-2 border-b border-[#4ade80]/30">Our Services</h3>
                  <ul className="space-y-4">
                    {serviceLinks.filter(item => isRouteActive(item.href)).map(item => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-gray-300 hover:text-[#4ade80] transition-colors duration-300 flex items-center group">
                          <span className="w-2 h-2 bg-[#4ade80] rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links - Takes 2 columns */}
                <div className="w-[200px]">
                  <h3 className="text-white text-xl font-bold mb-8 pb-2 border-b border-[#4ade80]/30">Company</h3>
                  <ul className="space-y-4">
                    {companyLinks.filter(item => isRouteActive(item.href)).map(item => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-gray-300 hover:text-[#4ade80] transition-colors duration-300 flex items-center group">
                          <span className="w-2 h-2 bg-[#4ade80] rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact & Newsletter - Takes 3 columns */}
                <div className="w-[400px]">
                  <h3 className="text-white text-xl font-bold mb-8 pb-2 border-b border-[#4ade80]/30">Get In Touch</h3>

                  <div className="mb-8">
                    <div className="mb-4">
                      <p className="text-gray-300 mb-2">
                        <span className="font-semibold text-white">Phone:</span> {settings.phone}
                      </p>
                      <p className="text-gray-300 mb-4">
                        <span className="font-semibold text-white">Email:</span> {settings.email}
                      </p>
                    </div>
                    <p className="text-gray-300 leading-relaxed flex flex-col gap-2">
                      <span className=" block text-[14px]"> <span className='font-semibold text-white '>Head Office:</span> {settings.address}</span>
                      <span className=" block text-[14px]"> <span className='font-semibold text-white '>Experience Centre:</span> Shop No. 2 - Building 716 Khalid Bin Al Waleed Rd - opposite Main Entrance of Admiral Plaza Hotel - Bur Dubai</span>
                      <span className=" block text-[14px]"> <span className='font-semibold text-white '>Retail Shop:</span> Admiral Plaza Hotel Building - 37C Street - Shop 5 - Khalid Bin Al Waleed Rd - Bur Dubai </span>
                    </p>
                  </div>


                </div>
              </div>

            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Logo and Company Info */}
            <div className="text-center mb-12">
              <Link href="https://www.crownexcel.ae/" className="inline-block" aria-label="Crown Excel Homepage">
                <Image
                  src={logo}
                  alt="Crown Excel Logo"
                  width={140}
                  height={70}
                  className="mx-auto object-contain mb-4"
                />
                <p className="text-gray-300 text-base mb-6">Let&apos;s Embrace Technology</p>
              </Link>
            </div>

            {/* Services and Company Links */}
            <div className="grid grid-cols-2 gap-8 mb-12">

              {/* Our Services */}
              <div>
                <h3 className="text-white text-lg font-bold mb-6 pb-2 border-b border-[#4ade80]/30">Our Services</h3>
                <ul className="space-y-3">
                  {serviceLinks.filter(item => isRouteActive(item.href)).map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-gray-300 hover:text-[#4ade80] transition-colors text-sm flex items-center group">
                        <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                        {item.mobileLabel || item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white text-lg font-bold mb-6 pb-2 border-b border-[#4ade80]/30">Company</h3>
                <ul className="space-y-3">
                  {companyLinks.filter(item => isRouteActive(item.href)).map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-gray-300 hover:text-[#4ade80] transition-colors text-sm flex items-center group">
                        <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Contact Info */}
            <div className="text-center mb-8">
              <h3 className="text-white text-lg font-bold mb-6 pb-2 border-b border-[#4ade80]/30 inline-block">Contact Address</h3>
              <div className="addresses flex flex-col ">
                <h4><span className='font-bold text-[14px]'>Head Office:</span> </h4>
                <p className="text-gray-300 text-[14px] leading-relaxed max-w-xs mx-auto">
                  {settings.address}
                </p>
                <h4><span className='font-bold text-[14px]'>Experience Centre:</span></h4>
                <p className="text-gray-300 text-[14px] leading-relaxed max-w-xs mx-auto">
                   Shop No. 2 - Building 716 Khalid Bin Al Waleed Rd - opposite Main Entrance of Admiral Plaza Hotel - Bur Dubai
                </p>
                <h4><span className='font-bold text-[14px]'>Retail Shop:</span></h4>
                <p className="text-gray-300 text-[14px] leading-relaxed max-w-xs mx-auto">
                   Admiral Plaza Hotel Building - 37C Street - Shop 5 - Khalid Bin Al Waleed Rd - Bur Dubai - Dubai
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-semibold text-white">Phone:</span> {settings.phone}</p>
                <p><span className="font-semibold text-white">Email:</span> {settings.email}</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-12">
              <h4 className="text-white font-semibold mb-4 text-center">Stay Updated</h4>
              <form className="flex max-w-sm mx-auto" onSubmit={submitSubscription}>
                <label htmlFor="footer-email-mobile" className="sr-only">Email address</label>
                <input
                  id="footer-email-mobile"
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#4ade80] transition-colors text-sm"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter email"
                  className={`bg-[#4ade80] hover:bg-[#22c55e] px-4 py-3 rounded-r-lg transition-colors duration-300 ${loadingEmail ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  <PaperPlaneRight size={18} className="text-white" />
                </button>
              </form>
              {emailMessage && (
                <p className="text-xs mt-3 text-gray-400 text-center">{emailMessage}</p>
              )}
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex justify-center gap-4">
                {settings.facebook && (
                  <Link href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="w-10 h-10 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <FacebookLogo size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {settings.twitter && (
                  <Link href={settings.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit our X page" className="w-10 h-10 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <XLogoIcon size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {settings.instagram && (
                  <Link href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="w-10 h-10 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <InstagramLogo size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {settings.linkedin && (
                  <Link href={settings.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="w-10 h-10 bg-white/10 hover:bg-[#4ade80] rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <LinkedinLogo size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                {/* Default icons if no settings */}
                {!settings.facebook && !settings.twitter && !settings.instagram && !settings.linkedin && (
                  <>
                    <div aria-hidden="true" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <FacebookLogo size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div aria-hidden="true" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <XLogoIcon size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div aria-hidden="true" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <InstagramLogo size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div aria-hidden="true" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <LinkedinLogo size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-[#4ade80]/30 py-6 bg-[#084032]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <p className="text-gray-300 text-sm mb-4 md:mb-0">
                (c) 2024 Crown Excel. All Rights Reserved.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                <p className="text-gray-300">
                  Developed by{' '}
                  <a
                    href="https://techsolutionor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4ade80] font-semibold hover:text-[#22c55e] transition-colors"
                  >
                    Tech Solutionor
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    </footer>
  );
};

export default Footer;
