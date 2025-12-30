"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, Share2 } from "lucide-react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar después de 800px para captar atención temprana
      if (window.scrollY > 800 && !isClosed) {
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
          initial={{ x: -100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 left-8 z-50 w-full max-w-[340px]"
        >
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-1 border border-neutral-100 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors" />

            <div className="relative bg-white rounded-[2.3rem] p-7 lg:p-8">
              <button
                onClick={() => {
                  setIsClosed(true);
                  setIsVisible(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-neutral-50 text-neutral-400 hover:text-primary rounded-full transition-all hover:rotate-90"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30 rotate-3 group-hover:rotate-0 transition-transform">
                  <Gift className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-bold text-primary text-2xl mb-3 tracking-tight">
                  ¡Gana Recomendando!
                </h3>

                <p className="text-secondary text-sm mb-8 leading-relaxed">
                  Únete a nuestro programa de <span className="text-primary font-bold">Embajadores Fabre</span> y gana un bono de <span className="text-accent font-bold text-lg">S/ 3,000</span> por cada referido que concrete su compra.
                </p>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/51964247545?text=Hola!%20Quiero%20informaci%C3%B3n%20sobre%20el%20programa%20de%20referidos%20de%20Fabre."
                    target="_blank"
                    className="flex items-center justify-center gap-2 bg-primary text-white w-full py-4 rounded-2xl font-bold text-sm hover:bg-primary/95 transition-all shadow-xl hover:shadow-primary/20 active:scale-[0.98] group/btn"
                  >
                    Quiero referir
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>

                  <p className="text-[10px] text-neutral-400 font-medium flex items-center justify-center gap-1">
                    <Share2 size={10} /> Compartir esta oportunidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
