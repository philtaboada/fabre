"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Heart,
    Home,
    GraduationCap,
    Hammer,
    Utensils,
    Pause,
    Volume2,
    VolumeX,
    ArrowRight,
    Users,
    HandHeart,
    Building2,
    Trophy,
    Smile,
    Target,
    Compass,
    ShieldCheck,
    CheckCircle2,
    Zap,
    Handshake
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import Link from "next/link";
import FloatingCTA from "../components/FloatingCTA";
import Script from "next/script";


export default function NosotrosPage() {
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

    const businessStats = [
        {
            number: "+7",
            label: "Años de experiencia",
            description: "Desarrollando proyectos extraordinarios",
            icon: Building2
        },
        {
            number: "+25",
            label: "Familias felices",
            description: "Hogares construidos con calidad",
            icon: Smile
        },
        {
            number: "+2",
            label: "Proyectos entregados",
            description: "Satisfacción garantizada",
            icon: Home
        },
        {
            number: "+2500",
            label: "m² construidos",
            description: "Espacios de vida premium",
            icon: Trophy
        }
    ];

    const socialStats = [
        { icon: Users, number: "500+", label: "Familias Beneficiadas" },
        { icon: Home, number: "10", label: "Comunidades Alcanzadas" },
        { icon: GraduationCap, number: "50+", label: "Jóvenes Becados" },
        { icon: Heart, number: "+7", label: "Años de Compromiso" },
    ];

    const initiatives = [
        {
            icon: Home,
            title: "Multifamiliares",
            description: "Desarrollamos proyectos multifamiliares pensados para vivir mejor. No solo construimos edificios, creamos hogares con calidad, seguridad y una distribución funcional.",
            color: "bg-blue-500",
            lightColor: "bg-blue-50"
        },
        {
            icon: GraduationCap,
            title: "Convenios institucionales",
            description: "Establecemos alianzas estratégicas con instituciones públicas y privadas para brindar mayores beneficios, facilidades y respaldo a nuestros clientes.",
            color: "bg-emerald-500",
            lightColor: "bg-emerald-50",
            logo: "/cahyo.png"
        }
    ];

    const values = [
        {
            title: "Ética",
            description: "Actuamos con honestidad, transparencia e integridad en todas nuestras operaciones, manteniendo relaciones comerciales y laborales basadas en el respeto.",
            icon: ShieldCheck,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Responsabilidad",
            description: "Asumimos nuestros compromisos con profesionalismo y calidad, garantizando el cumplimiento de los plazos y estándares técnicos.",
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Proactividad",
            description: "Nos anticipamos a las necesidades y desafíos, proponiendo soluciones oportunas y eficientes que contribuyen a la mejora continua.",
            icon: Zap,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "Confianza",
            description: "Construimos relaciones sólidas y duraderas con nuestros clientes, colaboradores y aliados estratégicos.",
            icon: Handshake,
            color: "text-accent",
            bg: "bg-accent/5"
        }
    ];

    return (
        <main className="min-h-screen bg-white font-sans text-primary overflow-hidden">
            <Header />

            {/* Hero Section - About Us Focus */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-sand/30 z-0" />
                {/* Decorative background elements matching site aesthetic */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container-page relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        {/* Content */}
                        <motion.div variants={fadeIn}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-100 text-accent font-semibold text-sm mb-8"
                            >
                                <Building2 size={16} />
                                <span>Sobre Fabre Inmobiliaria</span>
                            </motion.div>

                            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-8 leading-[1.1]">
                                <span className="text-primary">Construyendo sueños de calidad</span>
                            </h1>

                            <p className="text-secondary text-lg lg:text-xl mb-8 leading-relaxed">
                                En Fabre Inmobiliaria nos especializamos en el desarrollo de proyectos inmobiliarios
                                que combinan diseño moderno, calidad superior y ubicación estratégica. Cada proyecto
                                es una oportunidad para crear espacios que mejoren la calidad de vida de nuestras familias.
                            </p>

                            <p className="text-secondary text-base lg:text-lg mb-10 leading-relaxed border-l-4 border-accent/20 pl-6">
                                Nuestra experiencia nos permite anticipar tendencias, gestionar riesgos y garantizar
                                entregas puntuales. Trabajamos con los mejores arquitectos, ingenieros y constructores
                                para asegurar que cada detalle supere las expectativas.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/#proyectos" className="btn-primary">
                                    Nuestros proyectos
                                </Link>
                                <a href="#impacto" className="btn-secondary">
                                    Nuestro Impacto Social
                                </a>
                            </div>
                        </motion.div>

                        {/* Business Stats Grid */}
                        <motion.div variants={fadeIn} className="grid grid-cols-2 gap-6 relative">
                            {/* Decorative floaty elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />

                            {businessStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                                    className="text-center p-8 bg-white rounded-[2rem] shadow-soft border border-neutral-50 flex flex-col items-center justify-center h-full transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-accent/5 text-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                        <stat.icon size={28} />
                                    </div>
                                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="font-semibold text-neutral-800 mb-2 leading-tight">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-secondary leading-snug">
                                        {stat.description}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

            {/* Mission, Vision & Values Section */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="container-page relative z-10">
                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-sand/30 p-8 lg:p-10 rounded-[2.5rem] border border-neutral-100 flex flex-col h-full"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent mb-6 shrink-0">
                                <Compass size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-primary mb-4">Nuestra Misión</h3>
                            <p className="text-lg text-secondary leading-relaxed">
                                Desarrollar proyectos multifamiliares con altos estándares de calidad y seguridad, trabajando de manera colaborativa con nuestro equipo para acompañar, asesorar y satisfacer las necesidades de nuestros clientes en cada etapa del proceso.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-primary p-8 lg:p-10 rounded-[2.5rem] text-white shadow-xl flex flex-col h-full"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-accent-light mb-6 shrink-0">
                                <Target size={28} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Nuestra Visión</h3>
                            <p className="text-lg text-white/80 leading-relaxed">
                                Ser una inmobiliaria líder en proyectos multifamiliares, reconocida por su calidad constructiva, seguridad y transparencia, con capacidad de expansión a nivel nacional e internacional.
                            </p>
                        </motion.div>
                    </div>

                    {/* Values */}
                    <div className="mt-24 lg:mt-32">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Nuestros Valores</h3>
                            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-soft hover:shadow-strong transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className={`w-12 h-12 ${val.bg} ${val.color} rounded-xl flex items-center justify-center mb-6 shrink-0`}>
                                        <val.icon size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-primary mb-3">{val.title}</h4>
                                    <p className="text-secondary text-sm leading-relaxed flex-grow">{val.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Impact Transition */}
            <section id="impacto" className="relative py-24 lg:py-32 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="container-page relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-8 cursor-default"
                        >
                            <Heart size={16} className="fill-accent" />
                            <span>Compromiso Fabre</span>
                        </motion.div>

                        <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-primary">
                            Creando valor más allá del <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-500">Ladrillo y Cemento</span>
                        </h2>

                        <p className="text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
                            En Fabre Inmobiliaria, el éxito no se mide solo en metros cuadrados, sino en el impacto positivo que dejamos en nuestra comunidad.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Initiatives Grid */}
            <section className="pb-24 pt-10 relative">
                <div className="container-page">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
                        {initiatives.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-8 lg:p-10 rounded-[2.5rem] border border-neutral-100 bg-white hover:border-accent/20 shadow-soft hover:shadow-strong transition-all duration-500 overflow-hidden"
                            >
                                {/* Background blob on hover */}
                                <div className={`absolute top-0 right-0 w-64 h-64 ${item.lightColor} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`rounded-2xl flex items-center justify-center p-2 mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg overflow-hidden ${item.logo ? "w-32 h-14 bg-white border border-neutral-100" : `w-16 h-16 ${item.color}`}`}>
                                        {"logo" in item && item.logo ? (
                                            <Image src={item.logo} alt="Colegio de Abogados de Lima" width={128} height={56} className="object-contain" />
                                        ) : (
                                            <item.icon size={32} className="text-white" />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-primary transition-colors duration-300">{item.title}</h3>
                                    <p className="text-lg text-secondary leading-relaxed group-hover:text-neutral-600 transition-colors duration-300">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Video Feature Section - Redesigned for Reel Format */}
            <section id="fundacion" className="py-24 lg:py-32 bg-neutral-900 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container-page relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-left"
                        >
                            <div className="mb-10">
                                <Image
                                    src="/logo-fundacion-fabre.png"
                                    alt="Fundación Fabre"
                                    width={516}
                                    height={230}
                                    className="object-contain object-left w-auto h-16 sm:h-20 md:h-24 lg:h-28"
                                    priority
                                />
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold leading-tight text-white mb-8">
                                Transformando vidas, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Una historia a la vez</span>
                            </h2>

                            <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-8">
                                Descubre cómo nuestras iniciativas han cambiado la realidad de cientos de familias en Huancayo. A través de este video, compartimos la emoción y el impacto real de nuestro compromiso social.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Gestión Directa", desc: "Supervisamos cada paso del proceso social." },
                                    { title: "Resultados Tangibles", desc: "Más de 500 familias beneficiadas directamente." },
                                    { title: "Compromiso Local", desc: "Enfocados en el crecimiento de nuestra región." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-white/50 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Video Column - Reel Style */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative flex justify-center w-full"
                        >
                            {/* Smartphone frame effect - Increased size to show more video */}
                            <div className="relative w-full max-w-[320px] aspect-[9/16] bg-neutral-800 rounded-[3rem] p-3 border-[8px] border-neutral-800 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                                {/* Video Container */}
                                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black group">
                                    <iframe
                                        src="https://www.tiktok.com/embed/v2/7597624849447669013"
                                        className="w-full h-full border-none"
                                        scrolling="no"
                                        allow="encrypted-media; fullscreen"
                                    />


                                    {/* Glass reflection effect */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                                </div>

                                {/* Dynamic light effect behind the phone */}
                                <div className="absolute -inset-10 bg-accent/20 blur-[100px] -z-10 animate-pulse" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand/50" />
                <div className="container-page max-w-3xl mx-auto relative z-10">
                    <motion.div
                        whileInView={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                        <HandHeart size={64} className="mx-auto text-accent mb-8" />
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8">¿Quieres ser parte del cambio?</h2>
                    <p className="text-xl text-secondary mb-12 leading-relaxed">
                        Estamos abiertos a colaboraciones y voluntariado. Si compartes nuestra visión de un mundo más solidario, contáctanos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="https://wa.me/+51964247545?text=Hola%2C%20estoy%20interesado%20en%20ser%20voluntario%20o%20colaborar%20con%20su%20fundaci%C3%B3n.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F" className="btn-primary text-lg px-10 py-4 shadow-lg shadow-accent/20">
                            Contáctanos Ahora
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <FloatingCTA />
            <WhatsAppButton />
            <Footer />
            <Script src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />
        </main>
    );
}
