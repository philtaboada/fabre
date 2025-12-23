"use client";
import { BRINDIZI_BUILDING } from "../lib/apartments";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { formatNumber } from "../lib/utils";

// Dynamic Icon Component
const Icon = ({ name, className }: { name: string; className?: string }) => {
    const LucideIcon = (LucideIcons as any)[name];
    if (!LucideIcon) return null;
    return <LucideIcon className={className} size={20} />;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
        }
    }
};

export default function ApartmentCatalog() {
    const building = BRINDIZI_BUILDING;

    return (
        <section id="departamentos" className="py-20 lg:py-32 bg-[#FDFDFD] overflow-hidden">
            <div className="container-page">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="text-center mb-16 lg:mb-24"
                >
                    <motion.div variants={itemVariants} className="inline-block mb-6">
                        <span className="px-5 py-2 bg-accent/5 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/10">
                            Propiedades Exclusivas
                        </span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
                        {building.name}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-secondary text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        {building.description}
                    </motion.p>
                </motion.div>

                {/* Building Info */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="mb-20 lg:mb-32"
                >
                    <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
                        <div className="grid lg:grid-cols-12 gap-0">
                            {/* Building Image */}
                            <div className="lg:col-span-7 relative h-80 lg:h-[600px] overflow-hidden group">
                                <Image
                                    src={building.gallery[0]}
                                    alt={building.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                        {building.status}
                                    </span>
                                </div>
                            </div>

                            {/* Building Details */}
                            <div className="lg:col-span-5 p-8 lg:p-14 flex flex-col justify-center">
                                <div className="space-y-10">
                                    <div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">La Arquitectura</h3>
                                        <p className="text-secondary leading-relaxed font-light text-lg">{building.about}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-accent-light/30 p-6 rounded-2xl border border-accent/5">
                                            <div className="text-3xl font-bold text-accent mb-1">{building.floors}</div>
                                            <div className="text-xs text-secondary font-bold uppercase tracking-widest">Niveles</div>
                                        </div>
                                        <div className="bg-accent-light/30 p-6 rounded-2xl border border-accent/5">
                                            <div className="text-3xl font-bold text-accent mb-1">{building.totalUnits}</div>
                                            <div className="text-xs text-secondary font-bold uppercase tracking-widest">Unidades</div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">Amenidades del Proyecto</h4>
                                        <div className="grid grid-cols-2 gap-y-4">
                                            {building.buildingFeatures.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 group">
                                                    <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                        <Icon name={feature.iconName} className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-secondary text-sm font-medium">{feature.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Available Apartments Heading */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                        <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4 flex items-center gap-4">
                            <span className="w-1.5 h-10 bg-accent rounded-full"></span>
                            Unidades Disponibles
                        </h3>
                        <p className="text-secondary font-light">
                            Selecciona el espacio que mejor se adapte a tu estilo de vida. Diseños optimizados para el máximo confort.
                        </p>
                    </div>
                </div>

                {/* Available Apartments Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 gap-8 lg:gap-10"
                >
                    {building.apartments.map((apartment, index) => (
                        <motion.div
                            key={apartment.id}
                            variants={itemVariants}
                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2"
                        >
                            {/* Apartment Image */}
                            <div className="relative h-64 lg:h-80 overflow-hidden">
                                <Image
                                    src={apartment.images[0]}
                                    alt={`Departamento Piso ${apartment.floor}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-primary text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                                        Piso {apartment.floor}
                                    </span>
                                </div>
                                {apartment.available && (
                                    <div className="absolute top-6 right-6">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                            Disponible
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <div className="text-white text-3xl font-light">
                                        Unit <span className="font-bold">{apartment.floor}01</span>
                                    </div>
                                </div>
                            </div>

                            {/* Apartment Details */}
                            <div className="p-8 lg:p-10">
                                <div className="flex items-center gap-6 mb-8 border-b border-neutral-50 pb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-1">Área</span>
                                        <span className="text-xl font-bold text-primary">{apartment.area} m²</span>
                                    </div>
                                    <div className="w-px h-8 bg-neutral-100"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-1">Dorms</span>
                                        <span className="text-xl font-bold text-primary">{apartment.bedrooms}</span>
                                    </div>
                                    <div className="w-px h-8 bg-neutral-100"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-1">Baños</span>
                                        <span className="text-xl font-bold text-primary">{apartment.bathrooms}</span>
                                    </div>
                                </div>

                                <p className="text-secondary text-base mb-8 line-clamp-2 leading-relaxed font-light">
                                    {apartment.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {apartment.features.slice(0, 3).map((feature, idx) => (
                                        <span key={idx} className="px-4 py-1.5 bg-neutral-50 text-neutral-500 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-neutral-100 group-hover:bg-accent/5 group-hover:text-accent group-hover:border-accent/10 transition-colors duration-300">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Price and CTA */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mb-1">Inversión desde</div>
                                        <div className="text-3xl font-bold text-accent">
                                            $ {formatNumber(apartment.price)}
                                        </div>
                                    </div>
                                    <Link
                                        href={`/departamentos/${apartment.id}`}
                                        className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-accent hover:shadow-xl hover:-rotate-6 group/btn"
                                    >
                                        <LucideIcons.ArrowUpRight size={24} className="group-hover:scale-110 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Common Areas */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 lg:mt-32 relative group"
                >
                    <div className="absolute inset-0 bg-accent/5 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700"></div>
                    <div className="relative bg-white p-10 lg:p-20 rounded-[3rem] border border-neutral-100 shadow-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/3">
                                <h3 className="text-3xl font-bold text-primary mb-4">Espacios Diseñados</h3>
                                <p className="text-secondary font-light">Cada rincón ha sido pensado para elevar tu experiencia de vida diaria.</p>
                            </div>
                            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                {building.commonAreas.map((area, idx) => (
                                    <div key={idx} className="flex flex-col p-6 bg-neutral-50 rounded-2xl border border-transparent hover:border-accent/20 hover:bg-white transition-all duration-300 group/area">
                                        <LucideIcons.CheckCircle2 className="text-accent mb-3 w-5 h-5 opacity-40 group-hover/area:opacity-100 transition-opacity" />
                                        <div className="text-sm text-primary font-bold uppercase tracking-widest leading-tight">{area}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 lg:mt-32 text-center"
                >
                    <div className="bg-primary rounded-[3rem] p-12 lg:p-24 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-accent/30 transition-colors duration-1000"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -ml-48 -mb-48 group-hover:bg-accent/20 transition-colors duration-1000"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                                Tu próxima historia comienza aquí
                            </h3>
                            <p className="text-neutral-400 text-lg lg:text-xl mb-12 font-light leading-relaxed">
                                Agenda una visita privada y descubre por qué {building.name} es la mejor elección para tu futuro. Nuestros asesores especializados están listos para guiarte.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a href="#contacto" className="px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 flex items-center justify-center gap-3 group/visit">
                                    <LucideIcons.Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Agendar visita
                                </a>
                                <a href="/financiamiento" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm group/finance">
                                    <LucideIcons.Calculator className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Simular crédito
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
