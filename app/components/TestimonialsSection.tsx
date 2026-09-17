"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, CheckCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    role: "Propietario",
    content: "La calidad de los acabados superó mis expectativas. El proceso de compra fue transparente y el equipo de Fabre siempre estuvo dispuesto a ayudar.",
    rating: 5,
    image: "/testimonio/test-1.webp",
    verified: true
  },
  {
    id: 2,
    role: "Propietario",
    content: "He comprado dos departamentos con Fabre para inversión. La puntualidad en la entrega y la valorización de las zonas donde construyen es increíble.",
    rating: 5,
    image: "/testimonio/DSC05079.webp",
    verified: true
  },
  {
    id: 3,
    role: "Propietario",
    content: "Lo que más valoro es la atención post-venta. Tuvieron un detalle con una grifería y lo solucionaron en 24 horas. Muy recomendados.",
    rating: 5,
    image: "/testimonio/DSC06684.webp",
    verified: true
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setPerView(mq.matches ? 2 : 1);
      setCurrentIndex(0);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(testimonials.length / perView) - 1);

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

  const currentTestimonials = testimonials.slice(
    currentIndex * perView,
    (currentIndex + 1) * perView
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
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary mb-6"
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
            Más de 25 familias ya disfrutan de su nuevo hogar con la garantía de calidad Fabre.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navegación */}
          <div className="flex justify-center gap-3 mb-6 md:mb-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:justify-between md:pointer-events-none z-20">
            <button
              onClick={prev}
              className="pointer-events-auto bg-white hover:bg-accent hover:text-white text-accent w-11 h-11 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 md:-translate-x-1/2 focus:outline-none"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto bg-white hover:bg-accent hover:text-white text-accent w-11 h-11 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 md:translate-x-1/2 focus:outline-none"
              aria-label="Testimonio siguiente"
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
                    className="bg-white rounded-[2.5rem] shadow-sm border border-neutral-100 relative group hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row min-h-[320px]"
                  >
                    {/* Columna imagen vertical */}
                    <div className="relative w-full md:w-2/5 aspect-3/4 md:aspect-auto md:min-w-[200px] md:max-w-[240px] md:h-auto md:min-h-[320px] shrink-0 overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.role}
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        priority={currentIndex === 0 && testimonials.indexOf(testimonial) < 2}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent md:from-transparent" />
                    </div>

                    {/* Columna contenido */}
                    <div className="relative flex flex-col flex-1 p-6 lg:p-8 justify-between">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-200"}`} />
                        ))}
                      </div>
                      <Quote className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 text-accent/10 pointer-events-none" />
                      <p className="text-primary text-lg font-medium leading-relaxed italic pr-8">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center gap-4 pt-6 mt-6 border-t border-neutral-100">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-2 ring-accent/20">
                          <Image
                            src={testimonial.image}
                            alt=""
                            width={48}
                            height={48}
                            className="object-cover object-top w-full h-full"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-primary">{testimonial.role}</h4>
                          {testimonial.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          )}
                        </div>
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
