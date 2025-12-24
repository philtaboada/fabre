"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if we should show the "dark text/white bg" version
  // Show it if we are scrolled OR if we are NOT on the homepage
  const useSolidStyle = isScrolled || !isHome;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useSolidStyle
      ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-sm"
      : "bg-transparent"
      }`}>
      <div className="container-page flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="relative block group">
          <Image
            src={useSolidStyle ? "/LOGO-LETRAS-NEGRAS.png" : "/LOGO - LETRAS BLANCAS (1).png"}
            alt="Fabre"
            width={440}
            height={100}
            className="h-52 w-auto object-contain transition-all duration-300"
            priority
          />
          {/* Santa Hat Icon - Positioned relative to the house icon */}
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-16 left-12 z-20 pointer-events-none drop-shadow-sm"
            style={{ width: '35px', height: '35px', originX: 0.5, originY: 1 }}
            animate={{ rotate: [-20, -60, -20] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <path d="M17.0894 12.8551C17.0172 13.2886 16.992 14.181 16.8889 14.548C16.8082 14.8355 16.7294 15.0784 16.6409 15.2945C16.2212 16.3188 14.8058 16.2029 13.9539 15.4961C11.8935 13.7866 8.28389 11.3723 5.44925 11.5199C3.60053 11.5199 2.78441 12.2557 1.4747 12.2187C0.462474 12.1901 0.419678 11.1702 0.419678 10.7253C0.419678 9.17739 1.55009 6.94355 2.39598 5.63987C2.67037 5.21699 3.12148 4.94317 3.6252 4.92362C5.66959 4.84428 8.66419 5.47922 10.055 6.05561C11.8624 6.80443 17.4742 5.01432 18.0654 8.17788C18.2019 8.90825 17.2877 11.6655 17.0894 12.8551Z" fill="#374151"></path>
            <path d="M14.058 15.0757C14.4647 16.1463 13.7261 17.6881 12.6525 18.096C11.5789 18.5039 9.97218 17.4173 9.56547 16.3467C9.15876 15.2762 9.7717 14.268 10.8453 13.8601C11.9189 13.4522 13.6513 14.0051 14.058 15.0757Z" fill="#374151"></path>
            <path d="M16.1484 13.3764C16.1484 13.8639 16.1168 14.2139 16.0254 14.5047C15.7048 15.5244 14.2246 15.3306 13.408 14.6408C11.4715 13.0052 8.10014 10.6455 5.47229 10.7758C3.75121 10.7758 2.66599 11.6546 1.44671 11.6218C0.504369 11.5964 0.51242 10.995 0.51242 10.6008C0.51242 9.23692 1.64568 6.94835 2.46272 5.68202C2.72996 5.26782 3.17423 5.00794 3.66678 4.98872C5.59668 4.91345 8.47203 5.42532 9.76002 5.93343C11.8312 6.75022 16.1484 10.557 16.1484 13.3764Z" fill="white"></path>
            <path d="M15.582 12.1143C15.6921 12.1143 15.8002 12.1226 15.9062 12.1348C16.0599 12.561 16.1484 12.9779 16.1484 13.376C16.1484 13.8635 16.1168 14.2141 16.0254 14.5049C15.7047 15.5244 14.2248 15.3303 13.4082 14.6406C13.3452 14.5874 13.2799 14.5342 13.2139 14.4795C13.1939 14.3736 13.1816 14.265 13.1816 14.1543C13.1819 13.0278 14.2565 12.1143 15.582 12.1143Z" fill="#fff"></path>
            <path d="M17.9819 8.23983C17.9819 11.3505 17.1426 10.8132 16.0906 12.9176C15.6714 10.8974 15.1672 13.4229 12.5547 15.1421C11.8451 15.609 11.9397 15.5814 11.4871 15.1421C11.4871 13.1202 10.9116 8.10991 10.1557 7.0614C9.27191 5.83531 5.67518 4.99652 3.7019 4.99652C5.38417 2.01401 5.3475 0.159215 6.86264 0.15918C8.88407 0.15918 10.5602 3.64347 13.0577 4.53618C15.9771 5.57968 17.9819 6.56336 17.9819 8.23983Z" fill="#D8001B"></path>
            <path d="M13.0397 15.0393C13.3801 15.9353 13.0054 17.1366 12.1095 17.477C11.2135 17.8174 10.1356 17.1678 9.79528 16.2719C9.45491 15.376 9.9658 14.533 10.8617 14.1927C11.7577 13.8523 12.6994 14.1434 13.0397 15.0393Z" fill="#fff"></path>
            <path d="M17.9771 8.11267C17.9796 8.15455 17.9819 8.19685 17.9819 8.23962C17.9819 11.3503 17.1423 10.813 16.0903 12.9174C15.9222 12.1074 15.7423 12.0298 15.4165 12.3363C16.0977 11.45 17.5889 10.3388 17.9565 8.11169C17.9634 8.1117 17.9702 8.11245 17.9771 8.11267Z" fill="#991b1b"></path>
          </motion.svg>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href={isHome ? "#inicio" : "/"} className={`text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Inicio</Link>
          <Link href="/#departamentos" className={`text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Departamentos</Link>
          <Link href="/nosotros" className={`text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Nosotros</Link>
          <Link href="/financiamiento" className={`text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Financiamiento</Link>
          <Link href="#contacto" className={`text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Contacto</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="btn-primary">
            Cotizar ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-t border-neutral-200/50 bg-white shadow-xl animate-fade-in-up">
          <div className="container-page py-6 space-y-4">
            <Link href={isHome ? "#inicio" : "/"} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Inicio</Link>
            <Link href="/#departamentos" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Departamentos</Link>
            <Link href="/nosotros" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Nosotros</Link>
            <Link href="/financiamiento" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Financiamiento</Link>
            <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Contacto</Link>
            <div className="pt-4 border-t border-neutral-100">
              <button className="btn-primary w-full justify-center">
                Cotizar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
