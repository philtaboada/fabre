"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar después de 1000px y si no ha sido cerrado
      if (window.scrollY > 1000 && !isClosed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClosed]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-50 w-full max-w-[calc(100%-3rem)] sm:max-w-sm"
        >
          <div className="bg-white rounded-[2rem] shadow-strong p-6 lg:p-8 border border-neutral-100 relative group">
            <button
              onClick={() => {
                setIsClosed(true);
                setIsVisible(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-neutral-50 text-secondary hover:text-primary rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-7 h-7 text-accent" />
              </div>

              <div className="flex-1 pr-6">
                <h3 className="font-bold text-primary text-xl mb-2">¿Necesitas ayuda?</h3>
                <p className="text-secondary text-sm mb-6 leading-relaxed">
                  Agenta una videollamada hoy mismo y recibe asesoría personalizada sobre nuestros proyectos exclusivos.
                </p>

                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/95 transition-all shadow-lg hover:shadow-xl active:scale-95 group/btn"
                >
                  Agendar ahora
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
