'use client'
import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";

const locations = [
  {
    title: "Head Office",
    address: "Al Jahra Building, 2nd floor, 18th St – Al Raffa – Dubai",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.6956754923744!2d55.28818431500392!3d25.258956583904137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4392cf5b6cd9%3A0x710ae2921e482179!2sCrown%20Excel%20General%20Trading%20L.L.C!5e0!3m2!1sen!2sae!4v1695456789125!5m2!1sen!2sae"
  },
  {
    title: "Experience Centre",
    address: "Shop No. 2 - Building 716 Khalid Bin Al Waleed Rd - opposite Main Entrance of Admiral Plaza Hotel - Bur Dubai",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3845315746543!2d55.28903431500394!3d25.260309283903773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43ba6913e913%3A0x904de2fef7d413ec!2sCROWN%20EXCEL%20(Experience%20Center)!5e0!3m2!1sen!2sae!4v1695456789123!5m2!1sen!2sae"
  },
  {
    title: "Branch 2",
    address: "Admiral Plaza Hotel Building - 37C Street - Shop 5 - Khalid Bin Al Waleed Rd - Bur Dubai - Dubai",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.387894572635!2d55.28934531500394!3d25.260183483903798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43326d8e4cc9%3A0x4d452917e7a19b6!2sCROWN%20EXCEL%20(branch%202)!5e0!3m2!1sen!2sae!4v1695456789124!5m2!1sen!2sae"
  }
];

const ContactUsMap = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="our-locations-section"
        aria-label="Our Locations"
        className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#084032] mb-4">Our Locations</h2>
            <p className="text-gray-600 text-lg">Visit us at any of our convenient locations across Dubai</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((loc, idx) => (
              <div key={idx}>
                <h3 className="text-center text-[20px] font-bold mb-3" style={{ color: "#16CA9A" }}>
                  {loc.title}
                </h3>
                <div className="bg-white rounded-xl h-[400px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ">
                  <div className="p-6 flex flex-col justify-between h-full">
                    <div className="flex items-start gap-2 mb-3">
                      <FaMapMarkerAlt className="text-[#16CA9A] flex-shrink-0" size={24} />
                      <span className="text-[14px] text-gray-700 font-medium">
                        {loc.address}
                      </span>
                    </div>

                    <div className="w-full  rounded-lg overflow-hidden">
                      <iframe
                        src={loc.mapSrc}
                        title={loc.title}
                        aria-label={loc.title}
                        className="w-full h-[300px] border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

{/* <div>

  <h3 className="text-lg font-semibold text-[#084032] mb-4 text-center">Branch 2</h3>
  <div className="flex items-center justify-center mb-3">
    <FaMapMarkerAlt className="text-[#16CA9A] mr-2" size={50} />
    <span className="text-sm text-gray-700 font-medium text-center">
      Admiral Plaza Hotel Building - 37C Street - Shop 5 - Khalid Bin Al Waleed Rd - Bur Dubai - Dubai - United Arab Emirates
    </span>
  </div>
  <div className="w-full h-[280px] rounded-lg overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.387894572635!2d55.28934531500394!3d25.260183483903798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43326d8e4cc9%3A0x4d452917e7a19b6!2sCROWN%20EXCEL%20(branch%202)!5e0!3m2!1sen!2sae!4v1695456789124!5m2!1sen!2sae"
      title="CROWN EXCEL Branch 2 - Dubai"
      aria-label="CROWN EXCEL Branch 2 - Dubai"
      className="w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div> */}


export default ContactUsMap
