"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone } from "lucide-react";

export default function UrgencyBanner() {
  return (
    <section className="relative py-12 lg:py-16 bg-[#0a4d3c] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

      <div className="container-page relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-600/30 text-emerald-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="tracking-wide">Oportunidad Limitada</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Aprovecha hoy el <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 font-extrabold relative inline-block">
                Bono MiVivienda
                {/* Underline decoration */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>

            <p className="text-emerald-100/90 text-lg leading-relaxed mb-0 lg:pr-12">
              Últimas unidades disponibles con descuentos exclusivos. <br className="hidden lg:block" />
              Invierte en tu futuro hogar con el respaldo que mereces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
          >
            <a
              href="#proyectos"
              className="group bg-white text-[#0a4d3c] px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300 shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Ver Proyectos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contacto"
              className="group border border-emerald-400/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800/30 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              Contáctanos
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
