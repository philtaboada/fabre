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
import { getProjectById, getOtherProjects } from "../../lib/projects";
import { formatNumber } from "../../lib/utils";
import ImageGallery from "../../components/ImageGallery";
import ContactForm from "../../components/ContactForm";
import ProjectCard from "../../components/ProjectCard";

// Helper for dynamic icons
const Icon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-expect-error Dynamic access
  const LucideIcon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <LucideIcon className={className} size={20} />;
};

// Map string icons to Lucide icons
const getFeatureIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "🔒": return LucideIcons.Lock;
    case "📱": return LucideIcons.Smartphone;
    case "🛗": return LucideIcons.ArrowUpCircle;
    case "🌿": return LucideIcons.Leaf;
    case "park": return LucideIcons.Trees;
    case "shopping": return LucideIcons.ShoppingCart;
    case "hospital": return LucideIcons.Hospital;
    case "school": return LucideIcons.GraduationCap;
    case "beach": return LucideIcons.Waves;
    case "transport": return LucideIcons.Bus;
    default: return LucideIcons.CheckCircle2;
  }
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const project = getProjectById(resolvedParams.id);
  const otherProjects = getOtherProjects(resolvedParams.id);

  if (!project) {
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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Pre-venta":
        return { color: "bg-emerald-500", text: "Pre-venta" };
      case "En construcción":
        return { color: "bg-amber-500", text: "En construcción" };
      case "Entregado":
        return { color: "bg-slate-600", text: "Entregado" };
      default:
        return { color: "bg-gray-500", text: status };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <main className="min-h-screen bg-sand/30 font-sans text-primary">
      <Header />

      {/* Immersive Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="absolute inset-0 flex items-end pb-12 lg:pb-20">
          <div className="container-page">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6 text-white/90 font-medium">
                <Link href="/#proyectos" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <div className="p-2 bg-white/10 rounded-full group-hover:bg-accent hover:border-accent border border-white/20 transition-all">
                    <LucideIcons.ArrowLeft size={18} />
                  </div>
                  Volver a proyectos
                </Link>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 ${statusConfig.color} text-white text-sm font-semibold rounded-full shadow-lg`}>
                  {statusConfig.text}
                </span>
                {project.deliveryDate && (
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold rounded-full flex items-center gap-2">
                    <LucideIcons.Calendar size={14} className="text-accent" />
                    Entrega: {project.deliveryDate}
                  </span>
                )}
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-4xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {project.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-white">
                  en {project.district}
                </span>
              </motion.h1>

              <motion.div variants={fadeIn} className="flex items-center gap-4 text-white/80 text-lg lg:text-xl">
                <LucideIcons.MapPin className="text-accent" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors underline underline-offset-4"
                >
                  {project.location.address}
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
                    <p className="text-sm text-secondary font-medium">Área</p>
                    <p className="text-2xl font-bold text-primary">{project.area} m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                  <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                    <LucideIcons.BedDouble size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium">Dormitorios</p>
                    <p className="text-2xl font-bold text-primary">{project.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                  <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                    <LucideIcons.Bath size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium">Baños</p>
                    <p className="text-2xl font-bold text-primary">{project.bathrooms}</p>
                  </div>
                </div>
                {project.floors && (
                  <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                    <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                      <LucideIcons.Building size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-secondary font-medium">Pisos</p>
                      <p className="text-2xl font-bold text-primary">{project.floors}</p>
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
                  <h2 className="text-3xl font-bold text-primary mb-6">Sobre el Proyecto</h2>
                  <div className="space-y-4 bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
                    <p className="text-xl text-primary font-medium leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-secondary text-lg leading-relaxed">
                      {project.about}
                    </p>
                  </div>
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
                    Características Principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => {
                      const FeatureIcon = getFeatureIcon(feature.icon);
                      return (
                        <motion.div
                          key={idx}
                          variants={fadeIn}
                          className="bg-white p-4 rounded-2xl border border-neutral-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                            <FeatureIcon size={20} className="text-secondary group-hover:text-white" />
                          </div>
                          <span className="font-medium text-secondary">{feature.name}</span>
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
                  <ImageGallery images={project.gallery} />
                </motion.div>
              </div>

              {/* Common Areas */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-primary text-white p-8 lg:p-12 rounded-[2.5rem] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8">Áreas Comunes y Amenidades</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {project.commonAreas.map((area, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                        <div className="p-3 bg-accent rounded-full mb-2 shadow-lg shadow-accent/20">
                          <LucideIcons.CheckCircle2 className="text-white" size={20} />
                        </div>
                        <span className="text-sm font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </motion.div>

              {/* Location Section */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <LucideIcons.Map className="text-accent" />
                  Ubicación Estratégica
                </h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm">
                      <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-accent/20">
                        <LucideIcons.MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-1">Dirección</h4>
                        <p className="text-secondary">{project.location.address}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {project.location.nearbyPlaces.map((place, index) => {
                        const PlaceIcon = getFeatureIcon(place.icon);
                        return (
                          <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                            <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center flex-shrink-0">
                              <PlaceIcon size={20} className="text-secondary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-primary text-sm">{place.name}</div>
                              <div className="text-xs text-secondary">{place.distance}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] lg:aspect-auto h-full rounded-[2rem] overflow-hidden shadow-xl border border-white">
                    <iframe
                      src={`https://www.google.com/maps?q=${project.location.coordinates.lat},${project.location.coordinates.lng}&hl=es&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                id="contactanos"
                className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-neutral-100"
              >
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-primary mb-4">¿Te interesa este proyecto?</h3>
                  <p className="text-secondary">Déjanos tus datos y un asesor te contactará a la brevedad.</p>
                </div>
                <ContactForm defaultProjectId={project.id} />
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
                  <div className="text-center mb-8">
                    <p className="text-secondary text-sm font-bold uppercase tracking-widest mb-2">Precio desde</p>
                    <div className="text-4xl lg:text-5xl font-bold text-primary tracking-tight">
                      S/ {formatNumber(project.price)}<span className="text-2xl text-neutral-400 font-normal">.00</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold">
                      <LucideIcons.Calculator size={14} />
                      Cerrar a cuotas
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/51964247545?text=Hola,%20estoy%20interesado%20en%20el%20proyecto%20${project.title}.`}
                      target="_blank"
                      className="block w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-bold text-center transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                    >
                      <LucideIcons.MessageCircle size={20} />
                      WhatsApp Directo
                    </a>
                    <a
                      href="#contactanos"
                      className="block w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2"
                    >
                      <LucideIcons.Mail size={20} />
                      Más Información
                    </a>
                    <Link
                      href="/financiamiento"
                      className="block w-full py-4 bg-sand hover:bg-sand-dark text-primary rounded-2xl font-bold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <LucideIcons.TrendingUp size={20} />
                      Plan de Inversión
                    </Link>
                  </div>

                  <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                    <p className="text-sm text-secondary mb-4">¿Deseas una presentación guiada?</p>
                    <div className="flex items-center justify-center gap-2 text-accent font-bold">
                      <LucideIcons.PhoneCall size={18} />
                      +51 964 247 545
                    </div>
                  </div>
                </motion.div>

                <div className="bg-accent/5 p-6 rounded-[2rem] border border-accent/10">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <LucideIcons.ShieldCheck className="text-accent" size={20} />
                    Inversión Segura
                  </h4>
                  <p className="text-sm text-secondary leading-relaxed">
                    Proyecto respaldado por Fabre Inmobiliaria. Procesos transparentes y entrega garantizada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <section className="mt-20 pt-20 border-t border-neutral-200">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Conoce Otros Proyectos</h2>
                <p className="text-secondary">Explora más opciones exclusivas para tu próximo hogar.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((p, index) => (
                  <ProjectCard key={p.id} {...p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <FloatingCTA />
      <WhatsAppButton />
      <MarketingBonus />
      <Footer />
    </main>
  );
}


