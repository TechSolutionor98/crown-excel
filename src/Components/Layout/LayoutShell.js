"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar/navbar";
import Footer from "@/Components/Footer/footer";
import ScrollToTopButton from "@/app/_components/ScrollToTopButton/ScrollToTopButton";

import { RouteStatusProvider } from "@/context/RouteStatusContext";

export default function LayoutShell({ children, initialInactiveRoutes = [] }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <RouteStatusProvider initialInactiveRoutes={initialInactiveRoutes}>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
    </RouteStatusProvider>
  );
}
