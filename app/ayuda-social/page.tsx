"use client";

import { motion } from "framer-motion";
import {
    Heart,
    Home,
    GraduationCap,
    Hammer,
    Utensils,
    Play,
    ArrowRight,
    Users,
    HandHeart
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import Link from "next/link";
import FloatingCTA from "../components/FloatingCTA";

export default function AyudaSocialPage() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const stats = [
        { icon: Users, number: "500+", label: "Familias Beneficiadas" },
        { icon: Home, number: "10", label: "Comunidades Alcanzadas" },
        { icon: GraduationCap, number: "50+", label: "Jóvenes Becados" },
        { icon: Heart, number: "15", label: "Años de Compromiso" },
    ];

    const initiatives = [
        {
            icon: Home,
            title: "Vivienda Digna",
            description: "No solo construimos edificios, construimos hogares. Apoyamos activamente en el mejoramiento de infraestructura en zonas vulnerables.",
            color: "bg-blue-500"
        },
        {
            icon: GraduationCap,
            title: "Educación & Futuro",
            description: "Creemos en el talento. Otorgamos becas integrales y útiles escolares para asegurar que el futuro de nuestra comunidad sea brillante.",
            color: "bg-emerald-500"
        },
        {
            icon: Hammer,
            title: "Capacitación Técnica",
            description: "Brindamos talleres gratuitos de oficios relacionados a la construcción, empoderando a las personas con herramientas para el trabajo.",
            color: "bg-orange-500"
        },
        {
            icon: Utensils,
            title: "Nutrición Solidaria",
            description: "Apoyo constante a comedores populares y ollas comunes, garantizando la seguridad alimentaria de quienes más lo necesitan.",
            color: "bg-pink-500"
        }
    ];

    return (
        <main className="min-h-screen bg-sand/20 font-sans text-primary overflow-hidden">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl z-0" />
                {/* Abstract Background Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="container-page relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20">
                            <Heart size={16} className="fill-accent" />
                            <span>Compromiso Fabre</span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                            Creando valor más allá del <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Ladrillo y Cemento</span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
                            En Fabre Inmobiliaria, el éxito no se mide en metros cuadrados, sino en el impacto positivo que dejamos en nuestra comunidad.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Initiatives Grid */}
            <section className="py-20 relative bg-white">
                <div className="container-page">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {initiatives.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-8 rounded-[2.5rem] border border-neutral-100 bg-white hover:border-neutral-200 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg ${item.color}`}>
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">{item.title}</h3>
                                <p className="text-lg text-secondary leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Feature Section */}
            <section className="py-20 bg-secondary-dark relative text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                <div className="container-page relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                                Transformando vidas, <br />
                                <span className="text-accent">Una historia a la vez</span>
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Descubre cómo nuestras iniciativas han cambiado la realidad de cientos de familias en Huancayo. Cada proyecto social es una promesa cumplida de construir un futuro mejor.
                            </p>
                            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white font-semibold transition-all group border border-white/10">
                                <Play size={20} className="fill-white" />
                                Ver Documental
                            </button>
                        </div>
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                    <span className="text-white/50 font-medium">Video Próximamente</span>
                                </div>
                                {/* Placeholder overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                                        <Play size={32} className="fill-white ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Numbers */}
            <section className="py-24 bg-sand/30">
                <div className="container-page">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                                    <stat.icon size={24} />
                                </div>
                                <h4 className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</h4>
                                <p className="text-secondary font-medium uppercase tracking-wide text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container-page max-w-3xl mx-auto">
                    <HandHeart size={48} className="mx-auto text-accent mb-6" />
                    <h2 className="text-4xl font-bold text-primary mb-6">¿Quieres ser parte del cambio?</h2>
                    <p className="text-xl text-secondary mb-10 leading-relaxed">
                        Estamos abiertos a colaboraciones y voluntariado. Si compartes nuestra visión de un mundo más solidario, contáctanos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contacto" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1">
                            Contáctanos Ahora
                            <ArrowRight size={20} />
                        </Link>
                        <Link href="/nosotros" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sand text-primary rounded-2xl font-bold hover:bg-sand-dark transition-all">
                            Conoce al Equipo
                        </Link>
                    </div>
                </div>
            </section>

            <FloatingCTA />
            <WhatsAppButton />
            <Footer />
        </main>
    );
}


