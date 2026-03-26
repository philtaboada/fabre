import { withUtm } from "../lib/utm";

export default function AmenitiesShowcase() {
  const amenities = [
    {
      category: "Espacios Comunes",
      icon: "building",
      items: [
        { name: "Piscina infinity", description: "Disfruta de momentos relajantes con vista panorámica" },
        { name: "Gimnasio equipado", description: "Mantente en forma con máquinas de última generación" },
        { name: "Sala de juegos", description: "Espacio recreativo para toda la familia" },
        { name: "Área BBQ", description: "Comparte momentos especiales con amigos y familia" },
        { name: "Jardín vertical", description: "Espacios verdes integrados en el diseño moderno" },
        { name: "Terraza mirador", description: "Disfruta de las mejores vistas de la ciudad" }
      ]
    },
    {
      category: "Seguridad & Confort",
      icon: "security",
      items: [
        { name: "Seguridad 24/7", description: "Vigilancia constante con sistema de cámaras HD" },
        { name: "Acceso biométrico", description: "Tecnología avanzada para mayor seguridad" },
        { name: "Estacionamiento techado", description: "Espacios seguros para tu vehículo" },
        { name: "Ascensores panorámicos", description: "Disfruta del viaje con vistas espectaculares" },
        { name: "Generador de respaldo", description: "Energía eléctrica garantizada en todo momento" },
        { name: "Internet de alta velocidad", description: "Conectividad óptima en todas las áreas comunes" }
      ]
    },
    {
      category: "Diseño & Calidad",
      icon: "luxury",
      items: [
        { name: "Acabados premium", description: "Materiales de primera calidad en cada detalle" },
        { name: "Iluminación LED", description: "Eficiencia energética y ambientes acogedores" },
        { name: "Ventilación cruzada", description: "Diseño que maximiza la circulación del aire" },
        { name: "Cocinas modernas", description: "Equipadas con electrodomésticos de última generación" },
        { name: "Pisos térmicos", description: "Confort y aislamiento acústico superior" },
        { name: "Baños completos", description: "Con amenities y diseño contemporáneo" }
      ]
    },
    {
      category: "Ubicación Estratégica",
      icon: "📍",
      items: [
        { name: "Cerca al metro", description: "Acceso rápido al transporte público" },
        { name: "Zona comercial", description: "Cerca de centros comerciales y servicios" },
        { name: "Áreas verdes", description: "Parques y zonas recreativas cercanas" },
        { name: "Colegios y universidades", description: "Educación de calidad a pocos minutos" },
        { name: "Centros médicos", description: "Clínicas y hospitales de prestigio cercano" },
        { name: "Conectividad vial", description: "Fácil acceso a principales vías de la ciudad" }
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent text-white text-sm font-medium rounded-full mb-4">
            Comodidades
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Vive con estilo y comodidad
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Nuestros proyectos están diseñados pensando en tu bienestar y comodidad.
            Descubre todas las amenities que harán de tu hogar un lugar especial.
          </p>
        </div>

        <div className="space-y-12">
          {amenities.map((category, categoryIndex) => (
            <div key={category.category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-2xl font-bold text-primary">{category.category}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className="card p-6 hover-lift group cursor-pointer"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (itemIndex * 0.05)}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                        <svg className="w-6 h-6 text-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-secondary text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent-light to-accent/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              ¿Quieres conocer todas las comodidades en detalle?
            </h3>
            <p className="text-secondary mb-6">
              Agenda una cita para visitar nuestros proyectos y descubre de primera mano
              la calidad y comodidad que ofrecemos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={withUtm("#contacto")}
                className="btn-primary text-lg px-8 py-4"
              >
                Agendar visita guiada
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href={withUtm("#proyectos")}
                className="btn-secondary text-lg px-8 py-4"
              >
                Ver proyectos disponibles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
