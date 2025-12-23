"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Phone, ArrowRight } from "lucide-react";

export default function UrgencyBanner() {
  return (
    <section className="relative py-8 lg:py-12 bg-gradient-to-r from-accent via-accent to-accent-light overflow-hidden">
      <div className="container-page relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              ¡Oferta especial!
            </motion.div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Aprovecha hoy el <span className="text-black bg-white px-3 py-1 rounded-xl">Bono MiVivienda</span>
            </h2>
            <p className="text-white/90 text-lg lg:text-xl max-w-2xl font-medium">
              Últimas unidades con descuentos exclusivos hasta agotar stock.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6"
          >
            <a
              href="#proyectos"
              className="group bg-white text-accent px-8 lg:px-10 py-4 rounded-2xl font-bold hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              Ver proyectos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contacto"
              className="group border-2 border-white/30 text-white px-8 lg:px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-accent transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contactar
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decoración */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-dark/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
}
