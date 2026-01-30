"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
          <Link href="#contacto" className="btn-primary">
            Cotizar ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
              <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full justify-center">
                Cotizar ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
