"use client";
import { useState, useMemo } from "react";
import { BUILDINGS } from "../lib/apartments";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { formatNumber } from "../lib/utils";
import FiltersComponent from "./Filters";

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

export default function ApartmentCatalog() {
    const [filters, setFilters] = useState({
        search: "",
        district: "",
        status: ""
    });

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const filteredBuildings = useMemo(() => {
        return BUILDINGS.filter(building => {
            const searchStr = filters.search.trim().toLowerCase();
            const districtStr = filters.district.trim().toLowerCase();
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
                    {filteredBuildings.map((building) => (
                        <motion.div
                            key={building.id}
                            variants={itemVariants}
                            className="group relative bg-white overflow-hidden transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Building Image */}
                            <Link href={`/proyectos/${building.id}`} className="block relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={building.gallery[0] || "/building/build1.png"}
                                    alt={building.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Status Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                    <div className="mb-auto">
                                        <div className={`inline-block px-4 py-1 rounded text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg
                                            ${building.status === 'ENTREGADO' ? 'bg-[#98CB00]' :
                                                building.status === 'ENTREGA INMEDIATA' ? 'bg-[#98CB00]' :
                                                    building.status === 'PROXIMO LANZAMIENTO' ? 'bg-[#FF3B30]' : 'bg-orange-500'}`}
                                        >
                                            {building.status}
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <div className="text-[10px] text-white/90 font-black uppercase tracking-[0.3em] mb-1">
                                            DEPARTAMENTOS
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-4xl lg:text-5xl font-black text-[#007AFF] uppercase leading-none tracking-tighter">
                                                {building.district.split(',')[0]}
                                            </span>
                                            <span className="text-3xl lg:text-4xl font-black text-[#FF3B30] uppercase leading-none tracking-tighter mt-1">
                                                {(building.name || '').replace('Residencial ', '').replace('Edificio ', '').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <div className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <LucideIcons.MapPin size={14} className="text-[#98CB00]" />
                                            {building.address}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            </Link>

                            {/* CTA */}
                            <div className="mt-8">
                                <Link
                                    href={`/proyectos/${building.id}`}
                                    className="group/btn inline-flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.2em] transition-all hover:text-accent"
                                >
                                    <span className="inline-block py-2 border-b-2 border-primary/20 group-hover/btn:border-accent transition-all">
                                        VER PROYECTO
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent group-hover/btn:text-white transition-all">
                                        <LucideIcons.ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}

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
                                <a href="#contacto" className="px-10 py-5 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 flex items-center justify-center gap-3 group/visit">
                                    <LucideIcons.Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Agendar visita
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
