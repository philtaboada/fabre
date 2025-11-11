"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    title: "Aquí empieza tu historia",
    subtitle: "Departamentos modernos en Huancayo",
    description: "Descubre nuestros proyectos inmobiliarios diseñados para tu comodidad y estilo de vida.",
    image: "/building/build1-3.png",
    cta: "Ver proyectos",
    ctaLink: "#proyectos"
  },
  {
    id: 2,
    title: "Viviendas que inspiran",
    subtitle: "Construyendo sueños desde 1999",
    description: "Más de 20 años creando espacios que mejoran la calidad de vida de nuestras familias.",
    image: "/building/build1-4.jpg",
    cta: "Conoce nuestra historia",
    ctaLink: "#nosotros"
  },
  {
    id: 3,
    title: "Calidad y confianza",
    subtitle: "Proyectos certificados y garantizados",
    description: "Cada proyecto cuenta con las mejores certificaciones y procesos de construcción.",
    image: "/building/build1-5.jpg",
    cta: "Ver certificaciones",
    ctaLink: "#reconocimientos"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    setIsAutoPlaying(true);
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
  };

  const pauseAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    setIsAutoPlaying(false);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setTimeout(() => {
      startAutoPlay();
    }, 3000); // Reinicia después de 3 segundos de inactividad
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const newIndex = (prev + 1) % heroSlides.length;
      console.log(" NEXT SLIDE - Prev:", prev, "→ New:", newIndex);
      return newIndex;
    });
    pauseAutoPlay();
    resumeAutoPlay();
  }, [pauseAutoPlay, resumeAutoPlay]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const newIndex = (prev - 1 + heroSlides.length) % heroSlides.length;
      console.log(" PREV SLIDE - Prev:", prev, "→ New:", newIndex);
      return newIndex;
    });
    pauseAutoPlay();
    resumeAutoPlay();
  }, [pauseAutoPlay, resumeAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(prev => {
      if (index === prev) {
        console.log(" GO TO SLIDE - Mismo slide, no cambia:", index);
        return prev;
      }
      console.log(" GO TO SLIDE - Prev:", prev, "→ New:", index);
      return index;
    });
    pauseAutoPlay();
    resumeAutoPlay();
  }, [pauseAutoPlay, resumeAutoPlay]);

  // Auto-play effect
  useEffect(() => {
    console.log(" Auto-play effect ejecutado");
    startAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, []);

  // Log para cambios de estado
  useEffect(() => {
    console.log(" Estado currentSlide cambió a:", currentSlide);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < heroSlides.length) {
          goToSlide(index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, goToSlide, heroSlides.length]);

  console.log(" Renderizando carousel - Current slide:", currentSlide);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === currentSlide}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-page">
          <div className="max-w-4xl text-left">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  display: index === currentSlide ? 'block' : 'none',
                }}
              >
                
                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          console.log(" Botón PREV clickeado");
          prevSlide();
        }}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover-lift z-30"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => {
          console.log(" Botón NEXT clickeado");
          nextSlide();
        }}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover-lift z-30"
        aria-label="Slide siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              console.log(` Indicador ${index} clickeado`);
              goToSlide(index);
            }}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <Link
        href="#proyectos"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-30 group"
        aria-label="Ir a proyectos"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors duration-300 font-medium">
              Ver proyectos
            </span>
            <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 hover-lift">
              <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}