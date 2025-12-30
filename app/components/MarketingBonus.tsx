"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ticket, ArrowRight, MessageCircle, Sparkles, Clock } from "lucide-react";

export default function MarketingBonus() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasShown) {
                    setIsOpen(true);
                    setHasShown(true);
                }
            },
            { threshold: 0.1 }
        );

        const contactSection = document.getElementById("contacto");
        if (contactSection) {
            observer.observe(contactSection);
        }

        return () => {
            if (contactSection) observer.unobserve(contactSection);
        };
    }, [hasShown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Subtle Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-primary/20 backdrop-blur-md"
                    />

                    {/* Modal Container: Creative Coupon Style */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, scaleY: 0.5 }}
                        animate={{ scale: 1, opacity: 1, scaleY: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        className="relative w-full max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-accent/20"
                    >
                        {/* Top Section: Marketing Banner */}
                        <div className="bg-primary p-6 text-center relative overflow-hidden">
                            {/* Shimmer effect */}
                            <motion.div
                                animate={{ x: ['100%', '-100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                            />

                            <div className="relative z-10">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="w-8 h-px bg-accent"></span>
                                    <span className="text-accent-light text-[10px] font-black uppercase tracking-[0.3em]">Regalo VIP</span>
                                    <span className="w-8 h-px bg-accent"></span>
                                </div>
                                <h2 className="text-white text-2xl font-black leading-tight">¡ENHORABUENA!</h2>
                            </div>
                        </div>

                        {/* Coupon Body */}
                        <div className="p-8 text-center bg-white relative">
                            {/* Scalloped edge effect (CSS pseudo-elements would be better but let's use icons/divs for speed) */}
                            <div className="absolute top-0 left-0 right-0 h-4 flex justify-between px-4 -translate-y-2">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-4 h-4 bg-primary rounded-full" />
                                ))}
                            </div>

                            <div className="mb-6 mt-2">
                                <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">Has sido seleccionado para un</p>
                                <div className="relative inline-block">
                                    <div className="text-6xl font-black text-primary tracking-tighter">
                                        <span className="text-xl text-accent align-top">S/</span>20,000
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-2 -right-6 bg-accent text-white text-[10px] font-black px-2 py-1 rounded-md rotate-12"
                                    >
                                        BONUS
                                    </motion.div>
                                </div>
                            </div>

                            <div className="bg-sand/30 p-4 rounded-2xl mb-8 border border-sand/50">
                                <p className="text-primary text-sm font-medium leading-tight">
                                    Válido para la cuota inicial de tu depa en <span className="text-accent font-bold">Brindizi</span>.
                                </p>
                                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-emerald-600 font-black uppercase">
                                    <Clock size={12} /> solo 3 cupones disponibles
                                </div>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="https://wa.me/51964247545?text=Hola!%20Acabo%20de%20ganar%20el%20BONO%20de%2020k%20en%20la%20web.%20%C2%BFC%C3%B3mo%20puedo%20canjearlo?"
                                    target="_blank"
                                    className="flex items-center justify-center gap-3 bg-accent text-white w-full py-4 rounded-2xl font-black text-sm transition-all hover:bg-accent/90 shadow-lg shadow-accent/20 active:scale-95"
                                >
                                    <MessageCircle size={18} />
                                    CANJEAR MI REGALO
                                    <ArrowRight size={16} />
                                </a>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-neutral-300 text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-widest"
                                >
                                    No deseo el bono, gracias
                                </button>
                            </div>
                        </div>

                        {/* Close Button Inside */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-20"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
