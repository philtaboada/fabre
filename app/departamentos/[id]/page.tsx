"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import React from 'react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import FloatingCTA from "../../components/FloatingCTA";
import MarketingBonus from "../../components/MarketingBonus";
import { getApartmentById, BUILDINGS } from "../../lib/apartments";
import ImageGallery from "../../components/ImageGallery";

// Helper for dynamic icons
const Icon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-expect-error Dynamic access
    const LucideIcon = LucideIcons[name];
    if (!LucideIcon) return <LucideIcons.HelpCircle className={className} size={20} />;
    return <LucideIcon className={className} size={20} />;
};

// Helper to get icon based on feature text
const getFeatureIcon = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("dormitorio") || lowerText.includes("habitacion")) return LucideIcons.BedDouble;
    if (lowerText.includes("baño")) return LucideIcons.Bath;
    if (lowerText.includes("cocina")) return LucideIcons.Utensils;
    if (lowerText.includes("balcón") || lowerText.includes("terraza") || lowerText.includes("vista")) return LucideIcons.Sun;
    if (lowerText.includes("oficina") || lowerText.includes("estudio") || lowerText.includes("escritorio")) return LucideIcons.Laptop;
    if (lowerText.includes("lavadero") || lowerText.includes("terma") || lowerText.includes("lavandería")) return LucideIcons.Droplets;
    if (lowerText.includes("cerradura") || lowerText.includes("seguridad") || lowerText.includes("vigilancia")) return LucideIcons.Lock;
    if (lowerText.includes("sala") || lowerText.includes("comedor")) return LucideIcons.Armchair;
    if (lowerText.includes("closet") || lowerText.includes("walking")) return LucideIcons.Shirt;
    return LucideIcons.CheckCircle2;
};

export default function ApartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const apartment = getApartmentById(resolvedParams.id);
    const building = BUILDINGS.find(b => b.apartments.some(a => a.id === resolvedParams.id));

    if (!apartment || !building) {
        notFound();
    }

    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <main className="min-h-screen bg-sand/30 font-sans text-primary">
            <Header />

            {/* Immersive Hero Section */}
            <section className="relative h-[70vh] lg:h-[80vh] w-full overflow-hidden">
                <Image
                    src={apartment.images[0]}
                    alt={`Departamento Piso ${apartment.floor}`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

                <div className="absolute inset-0 flex items-end pb-12 lg:pb-20">
                    <div className="container-page">
                        <Link
                            href="/#departamentos"
                            className="absolute top-24 lg:top-28 left-4 lg:left-8 z-20 hover:opacity-80 transition-all flex items-center gap-3 text-white/90 font-medium group"
                        >
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all group-hover:bg-white/20">
                                <LucideIcons.ArrowLeft size={20} />
                            </div>
                            <span className="text-shadow-sm">Volver al catálogo</span>
                        </Link>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="max-w-4xl"
                        >

                            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold rounded-full flex items-center gap-2">
                                    <LucideIcons.Building2 size={14} className="text-accent" />
                                    {building.name}
                                </span>
                                <span className="px-4 py-1.5 bg-accent/90 backdrop-blur-md text-white text-sm font-semibold rounded-full shadow-lg shadow-accent/20">
                                    Piso {apartment.floor}
                                </span>
                                {apartment.available && (
                                    <span className="px-4 py-1.5 bg-emerald-500/90 backdrop-blur-md text-white text-sm font-semibold rounded-full flex items-center gap-2">
                                        <LucideIcons.CheckCircle2 size={14} />
                                        Entregado
                                    </span>
                                )}
                            </motion.div>

                            <motion.h1 variants={fadeIn} className="text-4xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                                Tu Nuevo Hogar <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-white">
                                    en {building.district}
                                </span>
                            </motion.h1>

                            <motion.div variants={fadeIn} className="flex items-center gap-4 text-white/80 text-lg lg:text-xl">
                                <LucideIcons.MapPin className="text-accent" />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(building.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent transition-colors underline underline-offset-4"
                                >
                                    {building.address}
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 -mt-10 pb-20">
                <div className="container-page">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Stats Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-black/5 flex flex-wrap justify-between gap-6 border border-white/50 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                                        <LucideIcons.Maximize2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-secondary font-medium">Área Total</p>
                                        <p className="text-2xl font-bold text-primary">{apartment.area} m²</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                                        <LucideIcons.BedDouble size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-secondary font-medium">Dormitorios</p>
                                        <p className="text-2xl font-bold text-primary">{apartment.bedrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                                        <LucideIcons.Bath size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-secondary font-medium">Baños</p>
                                        <p className="text-2xl font-bold text-primary">{apartment.bathrooms}</p>
                                    </div>
                                </div>
                                {apartment.study !== undefined && (
                                    <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                                        <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                                            <LucideIcons.Laptop size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-secondary font-medium">Estudio</p>
                                            <p className="text-2xl font-bold text-primary">{apartment.study}</p>
                                        </div>
                                    </div>
                                )}
                                {apartment.terrace !== undefined && (
                                    <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                                        <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                                            <LucideIcons.Sun size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-secondary font-medium">Terraza</p>
                                            <p className="text-2xl font-bold text-primary">{apartment.terrace}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Description & Gallery */}
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="prose prose-lg max-w-none"
                                >
                                    <h2 className="text-3xl font-bold text-primary mb-6">Sobre la propiedad</h2>
                                    <p className="text-secondary text-lg leading-relaxed bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
                                        {apartment.description}
                                    </p>
                                </motion.div>

                                {/* Features Grid */}
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                                >
                                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                        <LucideIcons.Sparkles className="text-accent" />
                                        Características Premium
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {apartment.features.map((feature, idx) => {
                                            const FeatureIcon = getFeatureIcon(feature);
                                            return (
                                                <motion.div
                                                    key={idx}
                                                    variants={fadeIn}
                                                    className="bg-white p-4 rounded-2xl border border-neutral-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group"
                                                >
                                                    <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                                        <FeatureIcon size={20} className="text-secondary group-hover:text-white" />
                                                    </div>
                                                    <span className="font-medium text-secondary">{feature}</span>
                                                </motion.div>
                                            );
                                        })}
                                        {/* Dynamic additional features from PDF */}
                                        {["Espejo LED"].map((feature, idx) => {
                                            const FeatureIcon = getFeatureIcon(feature);
                                            return (
                                                <motion.div
                                                    key={`extra-${idx}`}
                                                    variants={fadeIn}
                                                    className="bg-white p-4 rounded-2xl border border-neutral-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group"
                                                >
                                                    <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                                        <FeatureIcon size={20} className="text-secondary group-hover:text-white" />
                                                    </div>
                                                    <span className="font-medium text-secondary">{feature}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>

                                {/* Gallery */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <ImageGallery images={apartment.images} />
                                </motion.div>
                            </div>

                            {/* Building Features */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-primary text-white p-8 lg:p-12 rounded-[2.5rem] relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-8">Amenidades del Edificio</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {building.buildingFeatures.map((amenity, idx) => (
                                            <div key={idx} className="flex flex-col items-center text-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                                                <div className="p-3 bg-accent rounded-full mb-2 shadow-lg shadow-accent/20">
                                                    <Icon name={amenity.iconName} className="text-white" />
                                                </div>
                                                <span className="text-sm font-medium">{amenity.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            </motion.div>
                        </div>

                        {/* Sidebar Sticky */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-neutral-100"
                                >
                                    <div className="space-y-3 mb-6">
                                        <a
                                            href={`https://wa.me/51964247545?text=Hola,%20estoy%20interesado%20en%20el%20departamento%20del%20Piso%20${apartment.floor}%20del%20Edificio%20Brindizi.`}
                                            target="_blank"
                                            className="block w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-bold text-center transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                                        >
                                            <LucideIcons.MessageCircle size={20} />
                                            WhatsApp Directo
                                        </a>
                                        <a
                                            href="#contacto"
                                            className="block w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2"
                                        >
                                            <LucideIcons.Mail size={20} />
                                            Agendar Visita
                                        </a>
                                        <Link
                                            href="/financiamiento"
                                            className="block w-full py-4 bg-sand hover:bg-sand-dark text-primary rounded-2xl font-bold text-center transition-colors flex items-center justify-center gap-2"
                                        >
                                            <LucideIcons.Calculator size={20} />
                                            Simular Crédito
                                        </Link>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                                        <p className="text-sm text-secondary mb-4">¿Te interesa este departamento?</p>
                                        <div className="flex items-center justify-center gap-2 text-accent font-bold">
                                            <LucideIcons.PhoneCall size={18} />
                                            +51 964 247 545
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="bg-accent/5 p-6 rounded-[2rem] border border-accent/10">
                                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                        <LucideIcons.ShieldCheck className="text-accent" size={20} />
                                        Compra Segura
                                    </h4>
                                    <p className="text-sm text-secondary leading-relaxed">
                                        Todos nuestros proyectos cuentan con respaldo bancario y documentación en regla. Asesoría legal gratuita.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FloatingCTA />
            <WhatsAppButton />
            <MarketingBonus />
            <Footer />
        </main>
    );
}
