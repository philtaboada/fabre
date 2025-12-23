"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

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

const AUTOPLAY_DURATION = 6000;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0); // Force re-render of progress bar

  // Animation Variants
  const slideVariants: import("framer-motion").Variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 1 }
    }
  };

  const textVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  // Navigation Logic
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setProgressKey(prev => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgressKey(prev => prev + 1);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgressKey(prev => prev + 1);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(nextSlide, AUTOPLAY_DURATION);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, nextSlide, progressKey]); // Depends on progressKey to reset on manual nav

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <section id="inicio"
      className="relative min-h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Slides */}
      <AnimatePresence>
        <motion.div
          key={heroSlides[currentSlide].id}
          className="absolute inset-0 z-0"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-page">
          <motion.div
            key={`text-${currentSlide}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={textVariants}>
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-semibold tracking-wider uppercase mb-6">
                {heroSlides[currentSlide].subtitle}
              </span>
            </motion.div>

            <motion.h1
              variants={textVariants}
              className="text-5xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-lg lg:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed font-light"
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            <motion.div variants={textVariants}>
              <Link
                href={heroSlides[currentSlide].ctaLink}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-bold overflow-hidden transition-all hover:pr-10"
              >
                <span className="relative z-10">{heroSlides[currentSlide].cta}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Controls & Indicators */}
      <div className="absolute bottom-12 left-0 w-full z-30">
        <div className="container-page flex items-end justify-between">

          {/* Indicators & Progress */}
          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-1 transition-all duration-300 rounded-full overflow-hidden ${index === currentSlide ? "w-16 bg-white/30" : "w-8 bg-white/20 hover:bg-white/40"
                    }`}
                >
                  {index === currentSlide && isAutoPlaying && (
                    <motion.div
                      key={progressKey}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-accent"
                    />
                  )}
                  {index === currentSlide && !isAutoPlaying && (
                    <div className="absolute inset-y-0 left-0 w-full bg-accent" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-white/50 text-sm font-mono tracking-widest">
              0{currentSlide + 1} / 0{heroSlides.length}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300 group"
              aria-label="Anterior"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300 group"
              aria-label="Siguiente"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/50 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}