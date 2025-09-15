export default function UrgencyBanner() {
  return (
    <section className="py-8 bg-gradient-to-r from-accent to-accent-light">
      <div className="container-page">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse-soft">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            ¡Oferta limitada!
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Los mejores precios del año
          </h3>

          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Aprovecha descuentos exclusivos y facilidades de pago extendidas.
            ¡No esperes a que se agoten las unidades!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#financiamiento"
              className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors hover-lift"
            >
              Ver financiamiento
              <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#contacto"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all"
            >
              Reservar cita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
