"use client";
import { useState, useMemo, useEffect } from "react";
import { BUILDINGS } from "../lib/apartments";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import FiltersComponent, { FiltersValues } from "./Filters";
import { withUtm } from "../lib/utm";

// Dynamic Icon Component
const Icon = ({ name, className }: { name: string; className?: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/** Mapa building id → ruta del logo en public/logos-depas */
const BUILDING_LOGOS: Record<string, string> = {
    "wabi-sabi": "/logos-depas/LOGO RESIDENCIAL WABI SABI.png",
    "brindizi": "/logos-depas/LOGO EDIFICIO BRINDIZI_.png",
    "lumen-park": "/logos-depas/lumen-park.png"
};

export default function ApartmentCatalog() {
    const [filters, setFilters] = useState<FiltersValues>({
        search: "",
        district: "",
        status: ""
    });
    const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);

    const handleFilterChange = (newFilters: Partial<FiltersValues>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setComingSoonModalOpen(false);
        };
        if (comingSoonModalOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [comingSoonModalOpen]);

    const filteredBuildings = useMemo(() => {
        return BUILDINGS.filter(building => {
            const searchStr = (filters.search || "").trim().toLowerCase();
            const districtStr = (filters.district || "").trim().toLowerCase();
            const statusStr = filters.status;

            const matchesSearch = !searchStr ||
                building.name.toLowerCase().includes(searchStr);

            const matchesDistrict = !districtStr ||
                building.district.toLowerCase().includes(districtStr) ||
                building.address.toLowerCase().includes(districtStr);

            const matchesStatus = !statusStr ||
                building.status === statusStr;

            return matchesSearch && matchesDistrict && matchesStatus;
        });
    }, [filters]);

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
                        Nuestros Proyectos
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-secondary text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Descubre edificios diseñados para elevar tu estilo de vida, ubicados en las zonas más estratégicas.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <FiltersComponent
                        values={filters}
                        onChange={handleFilterChange}
                    />
                </motion.div>

                <motion.div
                    key={`${filters.status}-${filters.search}-${filters.district}`}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                >
                    {filteredBuildings.map((building) => {
                        const isDelivered = building.status === 'Entregado';
                        const isComingSoon = building.status === 'Pre venta';
                        const cardContent = (
                            <>
                                <Image
                                    src={building.gallery[0] || "/building/build1.png"}
                                    alt={building.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Status Overlay - solo badge (la ubicación va debajo del logo) */}
                                <div className="absolute inset-0 p-8 flex flex-col z-10">
                                    <div className={`inline-block px-4 py-1 rounded text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg w-fit
                                        ${building.status === 'Entregado' ? 'bg-[#98CB00]' :
                                            building.status === 'Entrega inmediata' ? 'bg-[#98CB00]' :
                                                building.status === 'Pre venta' ? 'bg-[#FF3B30]' : 'bg-orange-500'}`}
                                    >
                                        {(building.status === 'Entrega inmediata' ? 'Entregado' : building.status).toUpperCase()}
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            </>
                        );

                        const logoPath = BUILDING_LOGOS[building.id];
                        const isLumenPark = building.id === "lumen-park";
                        const logoContainerClass = isLumenPark
                            ? "relative h-12 lg:h-14 w-full max-w-[180px]"
                            : "relative h-14 lg:h-16 w-full max-w-[200px]";
                        const titleBlock = (
                            <div className="bg-[#FDFDFD] px-6 py-5">
                                <div className="text-[10px] text-secondary font-black uppercase tracking-[0.3em] mb-2">
                                    DEPARTAMENTOS
                                </div>
                                {logoPath ? (
                                    <div className={logoContainerClass}>
                                        <Image
                                            src={logoPath}
                                            alt={building.name}
                                            fill
                                            className="object-contain object-left"
                                            sizes={isLumenPark ? "180px" : "200px"}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-2xl lg:text-3xl font-black text-[#007AFF] uppercase leading-none tracking-tighter">
                                            {building.district.split(',')[0]}
                                        </span>
                                        <span className="text-xl lg:text-2xl font-black text-[#FF3B30] uppercase leading-none tracking-tighter mt-1">
                                            {(building.name || '').replace('Residencial ', '').replace('Edificio ', '').toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="mt-3 text-primary font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                                    <LucideIcons.MapPin size={14} className="text-[#98CB00] shrink-0" />
                                    {building.district.split(',')[0]} - {building.address}
                                </div>
                            </div>
                        );

                        return (
                            <motion.div
                                key={building.id}
                                variants={itemVariants}
                                className={`group relative bg-white overflow-hidden transition-all duration-500 ${!isDelivered ? 'hover:-translate-y-2' : ''}`}
                            >
                                {/* Building Image */}
                                {isDelivered ? (
                                    <div className="block relative aspect-[4/5] overflow-hidden cursor-default">
                                        {cardContent}
                                    </div>
                                ) : isComingSoon ? (
                                    <button
                                        type="button"
                                        onClick={() => setComingSoonModalOpen(true)}
                                        className="block relative aspect-[4/5] overflow-hidden cursor-pointer w-full text-left"
                                    >
                                        {cardContent}
                                    </button>
                                ) : (
                                    <Link href={withUtm(`/proyectos/${building.id}`)} className="block relative aspect-[4/5] overflow-hidden cursor-pointer">
                                        {cardContent}
                                    </Link>
                                )}

                                {/* Título debajo de la imagen - estilo franja inferior */}
                                {titleBlock}

                                {/* CTA */}
                                <div className="mt-6 px-6 pb-6">
                                    {isDelivered ? (
                                        <div className="inline-flex items-center gap-4 text-secondary font-black text-xs uppercase tracking-[0.2em] cursor-default opacity-60">
                                            <span className="inline-block py-2">
                                                PROYECTO ENTREGADO
                                            </span>
                                        </div>
                                    ) : isComingSoon ? (
                                        <button
                                            type="button"
                                            onClick={() => setComingSoonModalOpen(true)}
                                            className="group/btn inline-flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.2em] transition-all hover:text-accent"
                                        >
                                            <span className="inline-block py-2 border-b-2 border-primary/20 group-hover/btn:border-accent transition-all">
                                                VER PROYECTO
                                            </span>
                                            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent group-hover/btn:text-white transition-all">
                                                <LucideIcons.ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </button>
                                    ) : (
                                        <Link
                                            href={withUtm(`/proyectos/${building.id}`)}
                                            className="group/btn inline-flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.2em] transition-all hover:text-accent"
                                        >
                                            <span className="inline-block py-2 border-b-2 border-primary/20 group-hover/btn:border-accent transition-all">
                                                VER PROYECTO
                                            </span>
                                            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent group-hover/btn:text-white transition-all">
                                                <LucideIcons.ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}

                    {filteredBuildings.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-secondary text-xl font-light">
                                No se encontraron proyectos que coincidan con tu búsqueda.
                            </p>
                            <button
                                onClick={() => setFilters({ search: "", district: "", status: "" })}
                                className="mt-6 text-accent font-bold uppercase tracking-widest text-sm border-b-2 border-accent/20 hover:border-accent transition-all"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
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
                                Agenda una visita privada y descubre por qué Fabre es la mejor elección para tu futuro. Nuestros asesores especializados están listos para guiarte.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a href={withUtm("#contacto")} className="px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 flex items-center justify-center gap-3 group/visit">
                                    <LucideIcons.Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Agendar visita
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Modal Pre venta */}
                {comingSoonModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setComingSoonModalOpen(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="coming-soon-title"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md rounded-3xl bg-[#FDFDFD] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 lg:p-10 text-center">
                                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                    <LucideIcons.Sparkles className="w-8 h-8 text-accent" />
                                </div>
                                <h3 id="coming-soon-title" className="text-2xl lg:text-3xl font-bold text-primary mb-3 tracking-tight">
                                    Pronto sabrás más
                                </h3>
                                <p className="text-secondary text-base lg:text-lg leading-relaxed mb-6">
                                    Este proyecto está en fase de lanzamiento. Estamos preparando cada detalle para que lo conozcas muy pronto. Mantente atento: las novedades están a la vuelta de la esquina.
                                </p>
                                <p className="text-primary/80 text-sm font-medium mb-8">
                                    ¿Quieres que te avisemos cuando esté listo?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <a
                                        href={withUtm("#contacto")}
                                        onClick={() => setComingSoonModalOpen(false)}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all"
                                    >
                                        <LucideIcons.Bell className="w-4 h-4" />
                                        Avísame
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setComingSoonModalOpen(false)}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary/20 text-primary font-bold rounded-xl hover:border-accent hover:text-accent transition-all"
                                    >
                                        Entendido
                                    </button>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setComingSoonModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                                aria-label="Cerrar"
                            >
                                <LucideIcons.X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
