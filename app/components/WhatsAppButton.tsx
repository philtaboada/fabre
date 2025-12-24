"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const phone = "+51964247545";
  const message = encodeURIComponent("Hola, estoy interesado en sus proyectos inmobiliarios. ¿Podrían darme más información?");
  const href = `https://wa.me/${phone}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setIsVisible(true), 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-6 right-6 z-40 group"
        >
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chatear por WhatsApp"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#25D366] rounded-full"
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative bg-[#25D366] text-white w-16 h-16 rounded-full shadow-strong flex items-center justify-center transition-shadow hover:shadow-2xl"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.79 0 .67 5.12.67 11.4c0 2.01.52 3.95 1.5 5.68L0 24l7.1-2.23a11.3 11.3 0 0 0 4.96 1.15h.01c6.28 0 11.4-5.12 11.4-11.4 0-3.04-1.18-5.9-3.35-8.04zM12.06 21.2h-.01a9.8 9.8 0 0 1-4.7-1.2l-.34-.18-4.2 1.32 1.36-4.09-.2-.35a9.8 9.8 0 0 1-1.42-5.1c0-5.42 4.41-9.83 9.83-9.83 2.63 0 5.1 1.02 6.96 2.88 1.86 1.87 2.88 4.34 2.88 6.96 0 5.42-4.41 9.83-9.83 9.83zm5.39-7.35c-.29-.14-1.72-.85-1.98-.95-.27-.1-.46-.14-.66.14-.19.29-.76.94-.93 1.13-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 1-.1 2.43.9 1.44 2.06 2.48 3.43 3.2.48.26.86.41 1.16.52.49.16.94.14 1.29.09.39-.06 1.2-.49 1.37-.96.17-.48.17-.89.12-.98-.05-.1-.19-.15-.48-.29z" />
                </svg>
              </motion.div>
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-primary text-white text-sm px-4 py-2 rounded-2xl shadow-xl whitespace-nowrap border border-white/10">
                  ¡Hablemos de tu nuevo hogar!
                  <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
