import AboutTrusted from '@/app/_components/Aboutus/AboutTrusted/AboutTrusted'
import Business from '@/app/_components/Aboutus/Business/Business'
import Header from '@/app/_components/Aboutus/Header/Header'
import Testimonials from '@/app/_components/Testimonials/Testimonials'
import React from 'react'

function AboutUs({ cmsContent }) {
  const sections = cmsContent?.sections || {};
  return (
    <div>
      <Header cmsData={sections.header} />
      <AboutTrusted cmsData={sections.abouttrusted} />
      <Business cmsData={sections.business} />
      <Testimonials cmsData={sections.testimonials} />
    </div>
  )
}

export default AboutUs
