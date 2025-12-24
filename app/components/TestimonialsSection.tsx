"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, CheckCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Proprietario en Brindizi",
    content: "La calidad de los acabados superó mis expectativas. El proceso de compra fue transparente y el equipo de Fabre siempre estuvo dispuesto a ayudar.",
    rating: 5,
    avatar: "/images/testimonials/user-1.jpg",
    verified: true
  },
  {
    id: 2,
    name: "Ana Lucía Ortiz",
    role: "Inversionista",
    content: "He comprado dos departamentos con Fabre para inversión. La puntualidad en la entrega y la valorización de las zonas donde construyen es increíble.",
    rating: 5,
    avatar: "/images/testimonials/user-2.jpg",
    verified: true
  },
  {
    id: 3,
    name: "Roberto Sánchez",
    role: "Propietario en Miraflores",
    content: "Lo que más valoro es la atención post-venta. Tuvieron un detalle con una grifería y lo solucionaron en 24 horas. Muy recomendados.",
    rating: 5,
    avatar: "/images/testimonials/user-3.jpg",
    verified: true
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonialsPerView = 2;
  const maxIndex = Math.ceil(testimonials.length / testimonialsPerView) - 1;

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  // En versión móvil o tablets pequeñas mostramos solo 1
  // Para simplificar esta demo, usaremos slice básico
  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerView,
    (currentIndex + 1) * testimonialsPerView
  );

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 overflow-hidden">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-accent font-bold tracking-widest uppercase text-sm mb-4"
          >
            <TrendingUp className="w-4 h-4" />
            Casos de Éxito
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-primary mb-6"
          >
            Confianza que <br />
            <span className="text-accent underline decoration-accent-light underline-offset-8">construye hogares</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg lg:text-xl leading-relaxed"
          >
            Más de 500 familias ya disfrutan de su nuevo hogar con la garantía de calidad Fabre.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-12">
          {/* Navegación */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20">
            <button
              onClick={prev}
              className="pointer-events-auto bg-white hover:bg-accent hover:text-white text-accent w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform -translate-x-1/2 focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto bg-white hover:bg-accent hover:text-white text-accent w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform translate-x-1/2 focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="min-h-[400px] relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {currentTestimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-sm border border-neutral-100 relative group hover:shadow-xl transition-shadow duration-500"
                  >
                    <Quote className="absolute top-8 right-8 w-12 h-12 text-accent/5 group-hover:text-accent/10 transition-colors" />

                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-200"}`} />
                      ))}
                    </div>

                    <p className="text-primary text-xl font-medium mb-8 leading-relaxed italic">
                      &quot;{testimonial.content}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-100 relative overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-accent/10 flex items-center justify-center text-accent font-bold text-xl uppercase">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-primary">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-secondary text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-3 mt-12">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-12 bg-accent" : "w-2 bg-neutral-300 hover:bg-neutral-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
