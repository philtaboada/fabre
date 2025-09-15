const awards = [
  {
    title: "Premio a la Excelencia Inmobiliaria",
    institution: "Asociación de Constructores del Perú",
    year: "2024",
    category: "Proyecto Residencial"
  },
  {
    title: "Certificación LEED Oro",
    institution: "U.S. Green Building Council",
    year: "2024",
    category: "Sostenibilidad"
  },
  {
    title: "Mejor Proyecto Arquitectónico",
    institution: "Colegio de Arquitectos del Perú",
    year: "2023",
    category: "Innovación"
  },
  {
    title: "Premio a la Calidad Constructiva",
    institution: "Ministerio de Vivienda",
    year: "2023",
    category: "Construcción"
  }
];

export default function AwardsSection() {
  return (
    <section id="reconocimientos" className="py-16 lg:py-24 bg-sand">
      <div className="container-page">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Reconocimientos y Premios
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Nuestra dedicación a la excelencia nos ha valido el reconocimiento de las instituciones
            más prestigiosas del sector inmobiliario y de la construcción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <article
              key={index}
              className="card p-6 text-center hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-2">
                {award.title}
              </h3>
              <p className="text-accent font-medium text-sm mb-1">
                {award.category}
              </p>
              <p className="text-secondary text-sm mb-1">
                {award.institution}
              </p>
              <span className="inline-block bg-accent-light text-accent px-2 py-1 rounded-full text-xs font-medium">
                {award.year}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
