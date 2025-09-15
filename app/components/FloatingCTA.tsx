"use client";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Mostrar después de hacer scroll por más del 50% de la primera pantalla
      if (scrollPosition > windowHeight * 0.5) {
        setHasScrolled(true);
      }

      // Mostrar/ocultar basado en la posición del scroll
      if (scrollPosition > windowHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasScrolled) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="bg-white rounded-2xl shadow-strong p-4 max-w-sm animate-fade-in-up">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-soft">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary text-sm mb-1">
              ¿Necesitas ayuda?
            </h4>
            <p className="text-secondary text-xs mb-3">
              Un asesor te contactará en minutos para resolver tus dudas.
            </p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/51978724704?text=Hola,%20estoy%20interesado%20en%20sus%20proyectos%20inmobiliarios"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-accent text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-accent/90 transition-colors text-center"
              >
                WhatsApp
              </a>
              <a
                href="#contacto"
                className="px-3 py-2 border border-accent text-accent rounded-lg text-xs font-medium hover:bg-accent hover:text-white transition-all text-center"
              >
                Llamar
              </a>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-secondary hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
