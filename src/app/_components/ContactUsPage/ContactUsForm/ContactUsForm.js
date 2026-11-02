"use client";

import Image from "next/image";
import React, { useState } from "react";
import ContactUs from '../../../../Components/Images/contactus.jpg'
import CaptchaModal from '../../../../Components/CaptchaModal/CaptchaModal'
import OtpModal from '../../../../Components/OtpModal/OtpModal'
import countryCodes from '../../../../data/countryCodes'

const ContactUsForm = () => {
  const services = [
    "Select Service",
    "RMA Facility",
    "IT Consultancy",
    "Managed IT",
    "Software AMC",
    "Hardware AMC",
    "Server Support",
    "Hardware Repair",
  ];

  const subjects = [
    "Select Subject",
    "Become Our Partner",
    "For Corporates Content",
    "Wholesale Inquiries",
    "Wholesale Stock List request",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
    subject: "Select Subject",
    service: "Select Service",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const getPhoneRule = (code) => {
    const found = countryCodes.find((c) => c.code === (code || formData.countryCode));
    return found || { minDigits: 7, maxDigits: 15 };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleaned = value.replace(/[^\d]/g, "");
      const rule = getPhoneRule();
      if (cleaned.length <= rule.maxDigits) {
        setFormData((prev) => ({ ...prev, [name]: cleaned }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePhone = (phoneNum) => {
    const cleaned = phoneNum.replace(/\D/g, "");
    const rule = getPhoneRule();
    return cleaned.length >= rule.minDigits && cleaned.length <= rule.maxDigits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.name || !formData.email || !formData.phone || formData.subject === "Select Subject" || formData.service === "Select Service" || !formData.comments) {
      setMessage("Please fill all required fields");
      return;
    }

    if (!validatePhone(formData.phone)) {
      const rule = getPhoneRule();
      const country = countryCodes.find(c => c.code === formData.countryCode)?.country || 'selected country';
      setMessage(`Please enter a valid phone number (${rule.minDigits === rule.maxDigits ? rule.minDigits : rule.minDigits + '-' + rule.maxDigits} digits for ${country})`);
      return;
    }

    setShowCaptcha(true);
  };

  const handleCaptchaVerified = () => {
    setShowCaptcha(false);
    setShowOtp(true);
  };

  const handleOtpVerified = async () => {
    setShowOtp(false);
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        subject: formData.subject,
        service: formData.service,
        comments: formData.comments,
      };

      const res = await fetch('/api/contact-submissions', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");

      setMessage("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+971",
        subject: "Select Subject",
        service: "Select Service",
        comments: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setMessage(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
          id="contact-us-form-section"
          aria-label="Contact Us Form Section"
          className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-10 relative overflow-hidden"
        >
          <div className="header text-center">
            <h2 className="text-[32px] text-black mt-5 lg:text-[32px] font-montserrat font-[600]">Contact us</h2>
          </div>
          <div className="contact-us h-[auto] text-black flex flex-col items-center w-full mt-10 justify-center gap-10">
            <div className="contact-details flex flex-col-reverse md:flex-row items-center justify-center w-full px-4 gap-10">
              <div
                className="contact-details-left bg-[#f8f8f8] rounded-[10px] w-full max-w-[800px]"
                style={{ padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                  {/* Name & Email */}
                  <div className="name-email flex items-center gap-5 w-full">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border text-[13px] bg-white text-[#8692ad] rounded w-full h-[50px] outline-0"
                      type="text"
                      placeholder="Name *"
                      required
                      style={{ padding: "14px 18px" }}
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border text-[13px] bg-white text-[#8692ad] rounded w-full h-[50px] outline-0"
                      type="email"
                      placeholder="Email *"
                      required
                      style={{ padding: "14px 18px" }}
                    />
                  </div>

                  {/* Phone & Subject */}
                  <div className="phone-subject flex items-center gap-5 mt-5 w-full">
                    <div className="flex border rounded w-full h-[50px] bg-white overflow-hidden">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="text-[11px] bg-white text-[#084032] outline-0 border-r w-[85px] shrink-0 cursor-pointer"
                        style={{ padding: "4px" }}
                      >
                        {countryCodes.map((c) => (
                          <option key={`${c.iso || c.country}-${c.code}`} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="text-[13px] bg-white text-[#8692ad] outline-0 w-full"
                        type="tel"
                        placeholder={`Phone * (${getPhoneRule().minDigits === getPhoneRule().maxDigits ? getPhoneRule().minDigits : getPhoneRule().minDigits + '-' + getPhoneRule().maxDigits} digits)`}
                        maxLength={getPhoneRule().maxDigits}
                        required
                        style={{ padding: "14px 10px" }}
                      />
                    </div>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border text-[13px] bg-white text-[#8692ad] rounded w-full h-[50px]"
                      required
                      style={{ padding: "14px 18px" }}
                    >
                      {subjects.map((item, index) => (
                        <option key={index} value={item} disabled={index === 0}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service Dropdown */}
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="border mt-5 text-[13px] bg-white text-[#8692ad] rounded w-full h-[50px]"
                    required
                    style={{ padding: "14px 18px" }}
                  >
                    {services.map((item, index) => (
                      <option key={index} value={item} disabled={index === 0}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {/* Comments */}
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Comments *"
                    className="border text-[13px] bg-white text-[#8692ad] rounded w-full h-[96px] mt-5"
                    required
                    style={{ padding: "14px 18px" }}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-[#084032] cursor-pointer mt-5 text-white rounded-[30px] text-[16px] font-bold h-[55px] w-full"
                    style={{ padding: "14px 20px" }}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "SUBMIT NOW"}
                  </button>

                  {/* Response Message */}
                  {message && (
                    <p className={`mt-4 text-sm font-medium text-center ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
                      {message}
                    </p>
                  )}
                </form>
              </div>
              <div className="image-left">
                <Image alt='' src={ContactUs} width={1000} height={800} className='rounded-[10px] w-[1000px] max-w-full h-[380px] object-cover' />
              </div>
            </div>
          </div>
        </section>
      </div>

      <CaptchaModal
        isOpen={showCaptcha}
        onVerified={handleCaptchaVerified}
        onClose={() => setShowCaptcha(false)}
      />

      <OtpModal
        isOpen={showOtp}
        email={formData.email}
        onVerified={handleOtpVerified}
        onClose={() => setShowOtp(false)}
      />
    </>
  );
};

export default ContactUsForm;
