"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/50">
      <div className="container-page flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl lg:text-3xl tracking-tight text-primary hover:text-accent transition-colors">
          <Image src="/LOGO-LETRAS-NEGRAS.png" alt="Fabre" width={200} height={200} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="#inicio" className="text-sm font-medium hover:text-accent transition-colors">Inicio</Link>
          <Link href="#proyectos" className="text-sm font-medium hover:text-accent transition-colors">Proyectos</Link>
          <Link href="#nosotros" className="text-sm font-medium hover:text-accent transition-colors">Nosotros</Link>
          <Link href="#reconocimientos" className="text-sm font-medium hover:text-accent transition-colors">Reconocimientos</Link>
          <Link href="#blog" className="text-sm font-medium hover:text-accent transition-colors">Blog</Link>
          <Link href="#contacto" className="text-sm font-medium hover:text-accent transition-colors">Contacto</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="#contacto" className="text-sm text-neutral-600 hover:text-accent transition-colors">
            Atención al cliente
          </Link>
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
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
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
        <div className="lg:hidden border-t border-neutral-200/50 bg-white">
          <div className="container-page py-4 space-y-2">
            <Link href="#inicio" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-sm font-medium hover:bg-accent-light rounded-lg">Inicio</Link>
            <Link href="#proyectos" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-sm font-medium hover:bg-accent-light rounded-lg">Proyectos</Link>
            <Link href="#nosotros" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-sm font-medium hover:bg-accent-light rounded-lg">Nosotros</Link>
            <Link href="#reconocimientos" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-sm font-medium hover:bg-accent-light rounded-lg">Reconocimientos</Link>
            <Link href="#blog" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-sm font-medium hover:bg-accent-light rounded-lg">Blog</Link>
            <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="block py-3 px-4 text-sm font-medium hover:bg-accent-light rounded-lg">Contacto</Link>
            <div className="pt-4 border-t border-neutral-200/50">
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