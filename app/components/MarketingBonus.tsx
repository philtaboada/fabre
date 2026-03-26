"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Ticket, ArrowRight, MessageCircle, Sparkles, Clock } from "lucide-react";
import { buildWhatsAppHref, withUtm } from "../lib/utm";

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
                                <div className="text-4xl font-black text-primary tracking-tighter uppercase">
                                    GANASTE UN <br />
                                    <span className="text-accent">BONO DE</span> <br />
                                    DESCUENTO
                                </div>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={buildWhatsAppHref(
                                      "51964247545",
                                      "Hola! Acabo de ganar el BONO DE DESCUENTO en la web. ¿Cómo puedo canjearlo?",
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-[#00A884] text-white w-full py-4 rounded-2xl font-black text-sm transition-all hover:bg-[#008F70] shadow-lg shadow-green-500/20 active:scale-95 uppercase"
                                >
                                    <MessageCircle size={18} />
                                    CANJEAR MI REGALO
                                    <ArrowRight size={16} />
                                </a>

                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-neutral-300 text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-widest"
                                    >
                                        NO DESEO EL BONO, GRACIAS
                                    </button>
                                    <Link href={withUtm("/terms")} className="text-secondary text-[10px] font-medium border-b border-secondary/20 hover:text-accent transition-colors">
                                        * términos y condiciones
                                    </Link>
                                </div>
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
