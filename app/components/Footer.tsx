"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Clock // Added Clock icon
} from "lucide-react";

// TikTok Icon Component since it's not in Lucide by default or we want a specific look
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/InmobiliariaFabre", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/inmobiliariafabre/", label: "Instagram" },
    { icon: TiktokIcon, href: "https://www.tiktok.com/@inmobiliariafabre", label: "TikTok" },
  ];

  const quickLinks = [
    { name: "Departamentos", href: "/#departamentos" },
    { name: "Financiamiento", href: "/financiamiento" },
    { name: "Fundación", href: "/nosotros#fundacion" },
    { name: "Contacto", href: "#contacto" },
  ];

  const services = [
    { name: "Venta de Proyectos", href: "/#departamentos" },
    { name: "Asesoría Financiera", href: "#contacto" },
    { name: "Post-venta Expert", href: "https://wa.me/51964247545?text=Adquir%C3%AD%20un%20inmueble%20con%20FABRE%20y%20deseo%20comunicarme%20con%20el%20%C3%A1rea%20de%20postventa%20para%20realizar%20una%20consulta.%20Gracias." },
    { name: "Atención 24/7", href: "https://wa.me/51964247545" },
    { name: "TEAM FABRE", href: "/nosotros" },
    { name: "Bono de referido", href: "/referido" },
    { name: "Terrenos en aporte", href: "#contacto" },
  ];

  return (
    <footer className="bg-primary text-white pt-16 lg:pt-24 pb-8 overflow-hidden relative">
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand and Description */}
          <div className="space-y-6 text-center md:text-left">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-accent-light">FABRE</span>
            </Link>
            <p className="text-blue-100/70 text-base leading-relaxed max-w-sm">
              Construimos hogares con alma y proyectos con visión. Más de 15 años transformando el paisaje urbano de Lima con calidad y compromiso inigualable.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-8 text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center justify-center md:justify-start gap-2">
              <ChevronRight className="w-4 h-4 text-accent" />
              Navegación
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100/70 hover:text-accent transition-colors flex items-center justify-center md:justify-start gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent/30 rounded-full group-hover:bg-accent transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center justify-center md:justify-start gap-2">
              <ChevronRight className="w-4 h-4 text-accent" />
              Servicios
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-blue-100/70 hover:text-accent transition-colors flex items-center justify-center md:justify-start gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent/30 rounded-full group-hover:bg-accent transition-colors"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center justify-center md:justify-start gap-2">
              <ChevronRight className="w-4 h-4 text-accent" />
              Contacto
            </h4>
            <div className="space-y-4">
              <a href="tel:+51964247545" className="flex items-center justify-center md:justify-start gap-3 text-blue-100/70 hover:text-accent transition-colors group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent/10">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <span>+51 964 247 545</span>
              </a>
              <a href="mailto:gerencia@inmobiliariafabre.com" className="flex items-center justify-center md:justify-start gap-3 text-blue-100/70 hover:text-accent transition-colors group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent/10">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <span>gerencia@inmobiliariafabre.com</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=San+Judas+Tadeo+421+Huancayo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-center md:justify-start gap-3 text-blue-100/70 hover:text-accent transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent/10 mt-1">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-left">San Judas Tadeo 421,<br />Huancayo</span>
              </a>
              <div className="flex items-start justify-center md:justify-start gap-3 text-blue-100/70 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent/10 mt-1">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="text-sm text-left space-y-1">
                  <p className="font-bold text-accent">Oficina:</p>
                  <p>Lun - Vie: 9:00 am - 6:00 pm</p>
                  <p>Sáb: 9:00 am - 1:00 pm</p>
                  <p className="font-bold text-accent mt-2">Call Center:</p>
                  <p>Lun - Dom: 9:00 am - 7:00 pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-blue-100/40 text-sm">
          <p>© {currentYear} Fabre Inmobiliaria. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-accent transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-accent transition-colors">Términos y condiciones</Link>
            <Link href="#" className="hover:text-accent transition-colors">Libro de Reclamaciones</Link>
          </div>
          <div className="flex items-center gap-2">
            Hecho con <span className="text-accent text-lg">♥</span> en Perú
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-light/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
    </footer>
  );
}
