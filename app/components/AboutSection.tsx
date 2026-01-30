export default function AboutSection() {
  const stats = [
    {
      number: "+15",
      label: "Años de experiencia",
      description: "Desarrollando proyectos extraordinarios"
    },
    {
      number: "+1,200",
      label: "Familias felices",
      description: "Hogares construidos con calidad"
    },
    {
      number: "+25",
      label: "Proyectos entregados",
      description: "Satisfacción garantizada"
    },
    {
      number: "+2,500",
      label: "m² construidos",
      description: "Espacios de vida premium"
    }
  ];

  const features = [
    {
      title: "Multifamiliares",
      description: "Desarrollamos proyectos multifamiliares pensados para vivir mejor. No solo construimos edificios, creamos hogares con calidad, seguridad y una distribución funcional.",
      icon: "Building2"
    },
    {
      title: "Convenios institucionales",
      description: "Establecemos alianzas estratégicas con instituciones públicas y privadas para brindar mayores beneficios, facilidades y respaldo a nuestros clientes.",
      icon: "Users",
      extra: "Logo colegio de abogados"
    }
  ];

  return (
    <section id="nosotros" className="py-16 lg:py-24 bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              Más de 15 años construyendo sueños de calidad
            </h2>
            <p className="text-secondary text-lg mb-6 leading-relaxed">
              En Fabre Inmobiliaria nos especializamos en el desarrollo de proyectos inmobiliarios
              que combinan diseño moderno, calidad superior y ubicación estratégica. Cada proyecto
              es una oportunidad para crear espacios que mejoren la calidad de vida de nuestras familias.
            </p>
            <p className="text-secondary text-lg mb-8 leading-relaxed">
              Nuestra experiencia nos permite anticipar tendencias, gestionar riesgos y garantizar
              entregas puntuales. Trabajamos con los mejores arquitectos, ingenieros y constructores
              para asegurar que cada detalle supere las expectativas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#proyectos" className="btn-primary">
                Nuestros proyectos
              </a>
              <a href="#contacto" className="btn-secondary">
                Conoce más
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-right">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-secondary">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Features Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-sand/30 p-8 rounded-3xl border border-sand-dark/20 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
              <p className="text-secondary mb-6">{feature.description}</p>
              {feature.extra && (
                <div className="mt-auto px-6 py-3 bg-white/50 rounded-xl border border-dashed border-primary/20 text-primary font-bold text-sm">
                  {feature.extra}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
