export default function CertificationsShowcase() {
  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Sistema de Gestión de Calidad",
      logo: "🏆",
      details: "Certificación internacional que garantiza nuestros procesos de calidad en todas las etapas del proyecto."
    },
    {
      name: "SGS Certification",
      description: "Inspección y Certificación",
      logo: "🔍",
      details: "Verificación independiente de la calidad de materiales y procesos constructivos."
    },
    {
      name: "LEED Gold",
      description: "Construcción Sostenible",
      logo: "🌱",
      details: "Certificación de edificación sostenible que asegura eficiencia energética y respeto al medio ambiente."
    },
    {
      name: "Registro Único de Constructores",
      description: "Registro Nacional",
      logo: "certification",
      details: "Inscritos en el Registro Único de Constructores con calificación A1 - máxima categoría."
    },
    {
      name: "Certificación Antisísmica",
      description: "Resistencia Sísmica",
      logo: "construction",
      details: "Todos nuestros proyectos cumplen con las normas sísmicas más exigentes del país."
    },
    {
      name: "Garantía Decenal",
      description: "Garantía de Construcción",
      logo: "shield",
      details: "Garantía de 10 años por defectos constructivos según Ley General de Vivienda."
    }
  ];

  const processes = [
    {
      title: "Inspección Diaria",
      description: "Equipo técnico especializado supervisa cada etapa de construcción",
      icon: "inspection"
    },
    {
      title: "Control de Calidad",
      description: "Laboratorio propio para pruebas de materiales y acabados",
      icon: "laboratory"
    },
    {
      title: "Certificación BIM",
      description: "Modelado de Información para Construcción para mayor precisión",
      icon: "monitoring"
    },
    {
      title: "Auditorías Externas",
      description: "Auditorías trimestrales por firmas certificadoras independientes",
      icon: "audit"
    },
    {
      title: "Seguro de Construcción",
      description: "Cobertura integral durante todo el proceso constructivo",
      icon: "insurance"
    },
    {
      title: "Post-Venta 24/7",
      description: "Soporte técnico y mantenimiento por 2 años adicionales",
      icon: "support"
    }
  ];

  const guarantees = [
    {
      title: "Entrega Puntual",
      description: "98% de nuestros proyectos entregados en la fecha prometida",
      value: "98%",
      color: "text-green-600"
    },
    {
      title: "Satisfacción del Cliente",
      description: "Índice de satisfacción promedio de 4.9 sobre 5",
      value: "4.9/5",
      color: "text-blue-600"
    },
    {
      title: "Valorización",
      description: "Promedio de revalorización del 25% en los últimos 5 años",
      value: "+25%",
      color: "text-purple-600"
    },
    {
      title: "Eficiencia Energética",
      description: "Ahorro promedio del 30% en consumo energético",
      value: "30%",
      color: "text-emerald-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-accent text-white text-sm font-medium rounded-full mb-4">
            Calidad Garantizada
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Por qué confiar en Fabre Inmobiliaria
          </h2>
          <p className="text-secondary text-lg max-w-3xl mx-auto">
            Más de 20 años de experiencia respaldados por las certificaciones más prestigiosas
            del sector inmobiliario. Tu inversión está protegida por estándares internacionales.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            Nuestras Certificaciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="card p-6 text-center hover-lift animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cert.logo}
                </div>
                <h4 className="font-bold text-primary mb-2">{cert.name}</h4>
                <p className="text-accent font-medium text-sm mb-3">{cert.description}</p>
                <p className="text-secondary text-sm leading-relaxed">{cert.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Processes */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            Nuestro Proceso de Calidad
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processes.map((process, index) => (
              <div
                key={process.title}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-sand transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl flex-shrink-0">{process.icon}</div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">{process.title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees Stats */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            Nuestras Garantías Verificables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="text-center card p-6 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-4xl lg:text-5xl font-bold mb-2 ${guarantee.color}`}>
                  {guarantee.value}
                </div>
                <h4 className="font-semibold text-primary mb-2">{guarantee.title}</h4>
                <p className="text-secondary text-sm">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-gradient-to-r from-accent-light to-accent/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Más de 20 años de experiencia comprobada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-soft">
              <div className="text-2xl font-bold text-accent mb-1">1,200+</div>
              <div className="text-secondary text-sm">Familias felices</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-soft">
              <div className="text-2xl font-bold text-accent mb-1">25+</div>
              <div className="text-secondary text-sm">Proyectos completados</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-soft">
              <div className="text-2xl font-bold text-accent mb-1">S/ 500M+</div>
              <div className="text-secondary text-sm">Valor construido</div>
            </div>
          </div>
          <p className="text-secondary mb-6">
            Únete a la familia Fabre y asegura tu futuro con la inmobiliaria más confiable de Lima.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contacto"
              className="btn-primary text-lg px-8 py-4"
            >
              Solicitar información detallada
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
            <a
              href="tel:+51978724704"
              className="btn-secondary text-lg px-8 py-4"
            >
              Hablar con un asesor: +51 978 724 604
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
