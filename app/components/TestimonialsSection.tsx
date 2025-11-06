"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Carla Rodríguez",
    location: "Miraflores",
    project: "Malecón Vista Mar",
    rating: 5,
    text: "Compramos nuestro departamento en preventa y la experiencia superó todas nuestras expectativas. El diseño moderno, los acabados premium y la vista al mar hacen que cada día se sienta como unas vacaciones. El equipo de Fabre nos mantuvo informados durante toda la construcción.",
    image: "https://picsum.photos/seed/carla/80",
    role: "Profesional independiente",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop"
    },
    purchaseTime: "Hace 2 años",
    savings: "Ahorramos S/ 50,000 comprando en preventa"
  },
  {
    id: 2,
    name: "Luis Mendoza",
    location: "San Isidro",
    project: "Parque Central",
    rating: 5,
    text: "Como inversionista, busco propiedades que generen valor. Parque Central no solo se revalorizó un 35% en el último año, sino que la gestión post-venta es excepcional. Los amenities como la piscina y gimnasio están siempre impecables.",
    image: "https://picsum.photos/seed/luis/80",
    role: "Empresario",
    video: true,
    purchaseTime: "Hace 18 meses",
    investment: "Valorización del 35% en 18 meses"
  },
  {
    id: 3,
    name: "Familia García",
    location: "Surco",
    project: "Los Fresnos",
    rating: 5,
    text: "Buscábamos un hogar seguro y cómodo para criar a nuestros hijos. Los Fresnos ofrece exactamente eso: áreas verdes, seguridad 24/7 y una comunidad maravillosa. Nuestros hijos tienen amigos en el edificio y se sienten en casa.",
    image: "https://picsum.photos/seed/familia/80",
    role: "Familia con 2 hijos",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop"
    },
    purchaseTime: "Hace 1 año",
    highlight: "Comunidad segura para niños"
  },
  {
    id: 4,
    name: "Roberto Silva",
    location: "Barranco",
    project: "Costa Verde Premium",
    rating: 5,
    text: "Después de vivir 10 años en un departamento antiguo, Costa Verde Premium es como vivir en un hotel de lujo todos los días. La terraza con vista al mar, el diseño contemporáneo y la tranquilidad del barrio hacen que valga cada sol invertido.",
    image: "https://picsum.photos/seed/roberto/80",
    role: "Médico",
    video: true,
    purchaseTime: "Hace 6 meses",
    testimonial: "De un departamento antiguo a un hogar de lujo"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerView = 2; // Mostrar 2 testimonials en desktop
  const totalGroups = Math.ceil(testimonials.length / testimonialsPerView);

  const nextGroup = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalGroups - 1 ? 0 : prevIndex + 1
    );
  };

  const prevGroup = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalGroups - 1 : prevIndex - 1
    );
  };

  const startIndex = currentIndex * testimonialsPerView;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + testimonialsPerView);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-accent-light to-white">
      <div className="container-page">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-accent text-white text-sm font-medium rounded-full mb-4">
            Historias de éxito
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Familias que encontraron su hogar ideal
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Descubre cómo nuestros proyectos han transformado la vida de más de 1,200 familias.
            Historias reales de personas que confiaron en nosotros.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Navigation Arrows */}
          <button
            onClick={prevGroup}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Grupo anterior"
          >
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextGroup}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Siguiente grupo"
          >
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {currentTestimonials.map((testimonial, index) => (
              <article
                key={testimonial.id}
                className="card p-6 lg:p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rating and Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-accent">{testimonial.purchaseTime}</div>
                    {testimonial.savings && (
                      <div className="text-xs text-green-600 font-medium">{testimonial.savings}</div>
                    )}
                    {testimonial.investment && (
                      <div className="text-xs text-blue-600 font-medium">{testimonial.investment}</div>
                    )}
                    {testimonial.highlight && (
                      <div className="text-xs text-purple-600 font-medium">{testimonial.highlight}</div>
                    )}
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-secondary mb-6 leading-relaxed text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover border-2 border-accent-light flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-primary text-lg mb-1">{testimonial.name}</div>
                    <div className="text-sm text-secondary mb-1">{testimonial.role}</div>
                    <div className="text-sm text-accent font-semibold">{testimonial.project}</div>
                    <div className="text-xs text-secondary">{testimonial.location}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-accent-light hover:bg-accent/70'
                }`}
                aria-label={`Ir al grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2 animate-pulse-soft hover:scale-110 transition-transform duration-300">+1,200</div>
            <div className="text-secondary font-medium">Familias satisfechas</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2 animate-pulse-soft hover:scale-110 transition-transform duration-300">4.9/5</div>
            <div className="text-secondary font-medium">Calificación promedio</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2 animate-pulse-soft hover:scale-110 transition-transform duration-300">98%</div>
            <div className="text-secondary font-medium">Entregas puntuales</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2 animate-pulse-soft hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-secondary font-medium">Atención al cliente</div>
          </div>
        </div>
      </div>
    </section>
  );
}
