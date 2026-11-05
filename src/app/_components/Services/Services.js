import Link from "next/link";
import { safeRender } from "@/lib/safe-html";

const Services = ({ cmsData }) => {
  const badge = cmsData?.fields?.paragraph || cmsData?.paragraph;
  const sectionHeading = cmsData?.fields?.subheading || cmsData?.fields?.section_heading || cmsData?.subheading;
  const heading1 = cmsData?.fields?.heading || cmsData?.heading;
  const desc1 = cmsData?.fields?.paragraph_2 || cmsData?.paragraph_2;
  const heading2 = cmsData?.fields?.heading_2 || cmsData?.heading_2;
  const desc2 = cmsData?.fields?.paragraph_3 || cmsData?.paragraph_3;
  const heading3 = cmsData?.fields?.heading_3 || cmsData?.heading_3;
  const desc3 = cmsData?.fields?.paragraph_4 || cmsData?.paragraph_4;

  const defaultBadge = "How We Add Value";
  const defaultSectionHeading = "Crown Excel Hardware Expertise ";
  const defaultHeading1 = "IT Hardware For Wholesale";
  const defaultDesc1 = "We offer expert cloud computing services, helping businesses seamlessly migrate legacy systems to the cloud with minimal disruption and a clear rollback strategy. Our cloud modernization solutions enhance application architecture, reduce IT costs, and boost business agility.";
  const defaultHeading2 = "IT Hardware For Corporate";
  const defaultDesc2 = "We deliver custom software solutions designed to meet your unique business needs. From application development to system integration, our services enhance operational efficiency and align technology with your strategic goals.";
  const defaultHeading3 = "IT Hardware For Consumers";
  const defaultDesc3 = "Our comprehensive IT infrastructure management services include proactive monitoring, network optimization, and reliable technical support. We ensure smooth business operations and scalable infrastructure tailored to your growth.";

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section id="services" className="services-section relative w-full max-w-[1536px] mx-auto bg-[#13745a] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between items-start gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-14">
          <div className="flex flex-col items-start text-left">
            <p className="bg-[#e6eeff] text-green-900 px-3.5 py-1 font-montserrat rounded-full text-xs font-semibold tracking-wider mb-2.5 sm:mb-3 w-max shadow-sm">
              {safeRender(badge, "How We Add Value")}
            </p>
            <div className="flex flex-col font-montserrat items-start heading text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-white text-left">
              <span>{safeRender(sectionHeading, "Crown Excel Hardware Expertise ")}</span>
            </div>
          </div>
          <Link
            href="/products/laptops"
            className="flex items-center justify-center gap-2 w-auto min-w-[130px] sm:w-[150px] bg-white text-[#084032] font-semibold rounded-full px-5 sm:px-6 py-2.5 sm:py-3 shadow-lg hover:bg-[#e6eeff] transition text-sm sm:text-base shrink-0"
          >
            View All
            <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 text-sm">
              {"->"}
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5 lg:gap-8 xl:gap-10 items-stretch">
          <div className="card bg-white text-black w-full font-montserrat p-6 sm:p-7 md:p-5 lg:py-[45px] lg:px-[28px] xl:py-[50px] xl:px-[30px] text-left flex flex-col justify-between transition-transform duration-500 origin-bottom-left lg:hover:-translate-x-4 lg:hover:-translate-y-4 lg:hover:scale-105 lg:hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] animate-cardFadeIn" style={{ animationDelay: "0.1s" }}>
            <div>
              <h2 className="font-semibold text-lg sm:text-xl md:text-[18px] lg:text-[22px] xl:text-[24px] font-montserrat">
                {safeRender(heading1, "IT Hardware For Wholesale")}
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm md:text-[12px] lg:text-[14px] xl:text-[16px] font-montserrat leading-relaxed">
                {safeRender(desc1, "We offer expert cloud computing services, helping businesses seamlessly migrate legacy systems to the cloud with minimal disruption and a clear rollback strategy. Our cloud modernization solutions enhance application architecture, reduce IT costs, and boost business agility.")}
              </p>
            </div>
          </div>

          <div className="card bg-black text-white w-full font-montserrat p-6 sm:p-7 md:p-5 lg:py-[45px] lg:px-[28px] xl:py-[50px] xl:px-[30px] text-left flex flex-col justify-between transition-transform duration-500 origin-center lg:hover:-translate-y-2 lg:hover:scale-105 lg:hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] animate-cardFadeIn" style={{ animationDelay: "0.3s" }}>
            <div>
              <h2 className="font-semibold text-lg sm:text-xl md:text-[18px] lg:text-[22px] xl:text-[24px] font-montserrat">
                {safeRender(heading2, "IT Hardware For Corporate")}
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm md:text-[12px] lg:text-[14px] xl:text-[16px] font-montserrat leading-relaxed">
                {safeRender(desc2, "We deliver custom software solutions designed to meet your unique business needs. From application development to system integration, our services enhance operational efficiency and align technology with your strategic goals.")}
              </p>
            </div>
          </div>

          <div className="card bg-[#0e4637] text-white w-full font-montserrat p-6 sm:p-7 md:p-5 lg:py-[45px] lg:px-[28px] xl:py-[50px] xl:px-[30px] text-left flex flex-col justify-between transition-transform duration-500 origin-top-right lg:hover:translate-x-4 lg:hover:-translate-y-4 lg:hover:scale-105 lg:hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] animate-cardFadeIn" style={{ animationDelay: "0.5s" }}>
            <div>
              <h2 className="font-semibold text-lg sm:text-xl md:text-[18px] lg:text-[22px] xl:text-[24px] font-montserrat">
                {safeRender(heading3, "IT Hardware For Consumers")}
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm md:text-[12px] lg:text-[14px] xl:text-[16px] font-montserrat leading-relaxed">
                {safeRender(desc3, "Our comprehensive IT infrastructure management services include proactive monitoring, network optimization, and reliable technical support. We ensure smooth business operations and scalable infrastructure tailored to your growth.")}
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Services;


