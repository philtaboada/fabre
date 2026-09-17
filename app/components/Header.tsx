"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { withUtm } from "../lib/utm";

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Determine if we should show the "dark text/white bg" version
  // Show it if we are scrolled OR if we are NOT on the homepage
  const useSolidStyle = isScrolled || !isHome || isMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useSolidStyle
      ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-sm"
      : "bg-transparent"
      }`}>
      <div className="container-page flex items-center justify-between h-16 lg:h-20 gap-3">
        {/* Logo — source PNGs have large padding, so we crop/scale into the bar */}
        <Link
          href={withUtm("/")}
          className="relative z-10 block h-11 w-40 shrink-0 overflow-hidden sm:w-44 lg:h-12 lg:w-52"
        >
          <Image
            src={useSolidStyle ? "/LOGO-LETRAS-NEGRAS.png" : "/LOGO - LETRAS BLANCAS (1).png"}
            alt="Fabre"
            fill
            sizes="208px"
            className="object-cover object-center"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          <Link href={isHome ? withUtm("#inicio") : withUtm("/")} className={`text-sm xl:text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Inicio</Link>
          <Link href={withUtm("/#departamentos")} className={`text-sm xl:text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Departamentos</Link>
          <Link href={withUtm("/nosotros")} className={`text-sm xl:text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Nosotros</Link>
          <Link href={withUtm("/financiamiento")} className={`text-sm xl:text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Financiamiento</Link>
          <Link href={withUtm("#contacto")} className={`text-sm xl:text-base font-medium hover:text-accent transition-colors ${useSolidStyle ? "text-primary" : "text-white"}`}>Contacto</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href={withUtm("#contacto")} className="btn-primary">
            Cotizar ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden min-h-11 min-w-11 p-2 rounded-lg hover:bg-black/5 transition-colors ${useSolidStyle || isMenuOpen ? "text-primary" : "text-white"}`}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
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
        <div className="lg:hidden absolute top-full left-0 right-0 max-h-[min(80dvh,32rem)] overflow-y-auto border-t border-neutral-200/50 bg-white shadow-xl animate-fade-in-up">
          <div className="container-page py-4 space-y-1 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Link href={isHome ? withUtm("#inicio") : withUtm("/")} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Inicio</Link>
            <Link href={withUtm("/#departamentos")} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Departamentos</Link>
            <Link href={withUtm("/nosotros")} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Nosotros</Link>
            <Link href={withUtm("/financiamiento")} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Financiamiento</Link>
            <Link href={withUtm("#contacto")} onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-base font-medium text-primary hover:bg-accent/5 hover:text-accent rounded-lg transition-colors">Contacto</Link>
            <div className="pt-4 border-t border-neutral-100">
              <Link href={withUtm("#contacto")} onClick={() => setIsMenuOpen(false)} className="btn-primary w-full justify-center">
                Cotizar ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
