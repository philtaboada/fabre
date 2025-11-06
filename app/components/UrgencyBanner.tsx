export default function UrgencyBanner() {
  return (
    <section className="relative py-6 lg:py-8 bg-gradient-to-r from-accent via-accent to-accent-light">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Contenido izquierdo */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              ¡Oferta especial!
            </div>

            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3">
              Proyectos exclusivos
              <span className="block text-accent-light lg:inline lg:ml-2">disponibles ahora</span>
            </h2>

            <p className="text-white/90 text-base lg:text-lg mb-6 max-w-lg">
              Descubre nuestros proyectos más demandados con descuentos únicos.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start text-sm">
              <span className="bg-white/15 px-3 py-1 rounded-full text-white"> Precios especiales</span>
              <span className="bg-white/15 px-3 py-1 rounded-full text-white"> Ubicaciones premium</span>
              <span className="bg-white/15 px-3 py-1 rounded-full text-white"> Financiamiento</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <a
              href="#proyectos"
              className="group bg-white text-accent px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold hover:bg-accent-light hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver proyectos
              <svg className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contacto"
              className="group border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold hover:bg-white hover:text-accent transition-all duration-300"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Elemento decorativo sutil */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
    </section>
  );
}
