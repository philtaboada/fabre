import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-bold text-2xl mb-4 block">
              Fabre
            </Link>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Más de 15 años desarrollando proyectos inmobiliarios que mejoran
              la calidad de vida de miles de familias en Lima.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.609.043 6.298.099 4.987.155 3.846.358 2.894.71 1.943 1.061 1.198 1.555.71 2.505.222 3.454-.001 4.595-.057 5.906-.114 7.217-.157 8.004-.157 11.625-.157s4.408.043 5.719.099c1.311.056 2.452.259 3.404.611.952.352 1.697.846 2.185 1.796.488.949.711 2.09.767 3.401.056 1.311.099 2.098.099 5.719s-.043 4.408-.099 5.719c-.056 1.311-.279 2.452-.767 3.404-.488.952-.846 1.697-1.796 2.185-.949.488-2.09.711-3.401.767-1.311.056-2.098.099-5.719.099s-4.408-.043-5.719-.099c-1.311-.056-2.452-.279-3.404-.767-.952-.488-1.697-.846-2.185-1.796-.488-.949-.711-2.09-.767-3.401C.043 15.611 0 14.824 0 11.203s.043-4.408.099-5.719C.155 4.173.358 3.032.71 2.08.917 1.473 1.319 1.012 1.837.71c.518-.302 1.088-.534 1.758-.71C4.266.222 5.407-.001 6.718-.057 8.029-.114 8.816-.157 12.437-.157c3.621 0 4.408.043 5.719.099 1.311.056 2.452.259 3.404.611.952.352 1.697.846 2.185 1.796.488.949.711 2.09.767 3.401.056 1.311.099 2.098.099 5.719 0 3.621-.043 4.408-.099 5.719-.056 1.311-.279 2.452-.767 3.404-.488.952-.846 1.697-1.796 2.185-.949.488-2.09.711-3.401.767-1.311.056-2.098.099-5.719.099s-4.408-.043-5.719-.099c-1.311-.056-2.452-.279-3.404-.767-.952-.488-1.697-.846-2.185-1.796-.488-.949-.711-2.09-.767-3.401C-.114 7.217-.157 6.43-.157 2.809s.043-4.408.099-5.719C-.001 5.779.222 4.638.71 3.687.846 3.34 1.012 3.012 1.319 2.75c.307-.262.667-.488 1.058-.71.391-.222.831-.396 1.298-.511C5.266.222 6.407-.001 7.718-.057 9.029-.114 9.816-.157 13.437-.157c3.621 0 4.408.043 5.719.099 1.311.056 2.452.259 3.404.611.952.352 1.697.846 2.185 1.796.488.949.711 2.09.767 3.401.056 1.311.099 2.098.099 5.719s-.043 4.408-.099 5.719c-.056 1.311-.279 2.452-.767 3.404-.488.952-.846 1.697-1.796 2.185-.949.488-2.09.711-3.401.767-1.311.056-2.098.099-5.719.099s-4.408-.043-5.719-.099c-1.311-.056-2.452-.279-3.404-.767-.952-.488-1.697-.846-2.185-1.796-.488-.949-.711-2.09-.767-3.401C.043 8.389 0 7.602 0 4.181s.043-4.408.099-5.719z"/>
                  <path d="M12.017 5.838a6.163 6.163 0 100 12.325 6.163 6.163 0 000-12.325zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
                  <circle cx="17.333" cy="6.667" r="1.333"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Proyectos</h3>
            <ul className="space-y-2">
              <li><Link href="#proyectos" className="text-blue-100 hover:text-white transition-colors">Pre-venta</Link></li>
              <li><Link href="#proyectos" className="text-blue-100 hover:text-white transition-colors">En construcción</Link></li>
              <li><Link href="#proyectos" className="text-blue-100 hover:text-white transition-colors">Entregados</Link></li>
              <li><Link href="#proyectos" className="text-blue-100 hover:text-white transition-colors">Todos los proyectos</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><Link href="#contacto" className="text-blue-100 hover:text-white transition-colors">Asesoría financiera</Link></li>
              <li><Link href="#nosotros" className="text-blue-100 hover:text-white transition-colors">Post-venta</Link></li>
              <li><Link href="#contacto" className="text-blue-100 hover:text-white transition-colors">Atención al cliente</Link></li>
              <li><Link href="#contacto" className="text-blue-100 hover:text-white transition-colors">Promociones</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-blue-100">+51 978 724 604</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-blue-100">atencionalcliente@fabre.pe</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-blue-100">
                  Calle Jose Gálvez N°690, Ofic. 402<br />
                  Miraflores, Lima
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-blue-100 text-sm">
              © {currentYear} Fabre Inmobiliaria. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                Política de privacidad
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                Términos y condiciones
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                Libro de reclamaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
