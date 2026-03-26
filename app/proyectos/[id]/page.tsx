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
import { getBuildingById } from "../../lib/apartments";
import ImageGallery from "../../components/ImageGallery";
import { buildWhatsAppHref, withUtm } from "../../lib/utm";
import ProjectCard from "../../components/ProjectCard";

// Helper for dynamic icons
const Icon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-expect-error Dynamic access
  const LucideIcon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <LucideIcon className={className} size={20} />;
};

/** Normaliza el nombre para desduplicar (ej: "Cerradura Smart" y "Cerraduras Smart" → misma clave). */
function getAmenityDedupKey(name: string): string {
  const n = name.toLowerCase().trim().replace(/\s+/g, " ");
  if ((n.includes("cerradura") || n.includes("cerraduras")) && n.includes("smart")) return "cerraduras smart";
  return n;
}

const getItemIcon = (name: string, iconKey?: string) => {
  const n = (name + " " + (iconKey || "")).toLowerCase();

  // Orden: más específico primero para evitar que varios caigan en el mismo ícono
  if (n.includes("intercomunicador") || n.includes("phone")) return LucideIcons.Phone;
  if (n.includes("cámara") || n.includes("camera")) return LucideIcons.Camera;
  if (n.includes("cerco") || n.includes("zap")) return LucideIcons.Zap;
  if ((n.includes("cerradura") || n.includes("cerraduras")) && n.includes("smart")) return LucideIcons.Lock;
  if (n.includes("seguridad") && n.includes("smart")) return LucideIcons.ShieldCheck;
  if (n.includes("ascensor") || n.includes("elevator") || n.includes("arrowupcircle")) return LucideIcons.ArrowUpCircle;
  if (n.includes("sismo") || n.includes("estructura") || n.includes("building")) return LucideIcons.Building2;
  if (n.includes("led") || n.includes("luz") || n.includes("iluminación") || n.includes("sun")) return LucideIcons.Sun;
  if (n.includes("ubicación") || n.includes("estratégica") || n.includes("mappin")) return LucideIcons.MapPin;
  if (n.includes("estacionamiento") || n.includes("car") || n.includes("cochera")) return LucideIcons.Car;
  if (n.includes("parrilla") || n.includes("bbq") || n.includes("flame")) return LucideIcons.Flame;
  if (n.includes("terraza") && n.includes("social")) return LucideIcons.TreePine;
  if (n.includes("terraza") || n.includes("sky")) return LucideIcons.TreePine;
  if (n.includes("sshh") || n.includes("baño") || n.includes("bath")) return LucideIcons.Bath;
  if (n.includes("tendal") || n.includes("viento") || n.includes("wind")) return LucideIcons.Wind;
  if (n.includes("lavadero") && n.includes("multifuncional")) return LucideIcons.Droplets;
  if (n.includes("lavandería") || n.includes("lavadero") || n.includes("wash") || n.includes("droplets")) return LucideIcons.Shirt;
  if (n.includes("pet") || n.includes("perro")) return LucideIcons.Dog;
  if (n.includes("gimnasio") || n.includes("gym") || n.includes("dumbbell")) return LucideIcons.Dumbbell;
  if (n.includes("lobby") || n.includes("recepción")) return LucideIcons.Armchair;
  if (n.includes("coworking") || n.includes("oficina")) return LucideIcons.Laptop;
  if (n.includes("piscina") || n.includes("pool")) return LucideIcons.Waves;

  return LucideIcons.CheckCircle2;
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
  const buildingData = getBuildingById(resolvedParams.id);

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
      case "Entrega inmediata":
        return { color: "bg-blue-600", text: "Entregado" };
      case "Pre venta":
        return { color: "bg-purple-600", text: "Pre venta" };
      default:
        return { color: "bg-gray-500", text: status };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <main className="min-h-screen bg-sand/30 font-sans text-primary">
      <Header />

      {/* Immersive Hero Section */}
      <section className="relative h-[70vh] lg:h-[80vh] w-full overflow-hidden">
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
            <Link
              href={withUtm("/#proyectos")}
              className="absolute top-24 lg:top-28 left-4 lg:left-8 z-20 hover:opacity-80 transition-all flex items-center gap-3 text-white/90 font-medium group"
            >
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all group-hover:bg-white/20">
                <LucideIcons.ArrowLeft size={20} />
              </div>
              <span className="text-shadow-sm">Volver a proyectos</span>
            </Link>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >

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

              {/* Stats Bar - Building Focused */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-black/5 flex flex-wrap justify-between gap-6 border border-white/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                  <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                    <LucideIcons.Building size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium">Pisos</p>
                    <p className="text-2xl font-bold text-primary">{project.floors || buildingData?.floors || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                  <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                    <LucideIcons.LayoutGrid size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium">Unidades Totales</p>
                    <p className="text-2xl font-bold text-primary">{project.units || buildingData?.totalUnits || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-4 border-r border-neutral-100 last:border-0 grow sm:grow-0">
                  <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                    <LucideIcons.ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium">Estado</p>
                    <p className="text-xl font-bold text-primary">{project.status}</p>
                  </div>
                </div>
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

                {/* Available Apartments Section - Prioritized Position */}
                {buildingData && buildingData.apartments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <LucideIcons.LayoutGrid className="text-accent" />
                        Departamentos Disponibles
                      </h3>
                      <span className="px-4 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase">
                        {buildingData.apartments.filter(a => a.available).length} unidades disponibles
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {buildingData.apartments.map((apt) => {
                        const cardImage = apt.type === 1 ? "/Brindizi/TIPO 1.webp" : apt.type === 2 ? "/Brindizi/TIPO 5.webp" : apt.images[0];
                        return (
                        <motion.div
                          key={apt.id}
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-2xl border border-neutral-100 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden"
                        >
                          {/* Header: título, ID y badge */}
                          <div className="p-6 pb-4 flex justify-between items-start">
                            <h4 className="text-xl font-bold text-primary">{apt.type ? `Tipo ${apt.type}` : `Piso ${apt.floor}`}</h4>
                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${apt.available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                              {apt.available ? 'Disponible' : 'Vendido'}
                            </span>
                          </div>

                          {/* Imagen del plano */}
                          <div className="relative w-full aspect-[4/3] bg-neutral-50 px-4">
                            <Image
                              src={cardImage}
                              alt={apt.type ? `Tipo ${apt.type} - Brindizi` : `Piso ${apt.floor}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>

                          {/* Especificaciones */}
                          <div className="p-6 pt-4">
                            <div className="flex flex-wrap gap-6 mb-5">
                              <div className="flex items-center gap-2 text-secondary">
                                <LucideIcons.Maximize2 size={18} className="text-accent" />
                                <span className="text-sm font-medium">{apt.area} m²</span>
                              </div>
                              <div className="flex items-center gap-2 text-secondary">
                                <LucideIcons.BedDouble size={18} className="text-accent" />
                                <span className="text-sm font-medium">{apt.bedrooms} Dorm.</span>
                              </div>
                              <div className="flex items-center gap-2 text-secondary">
                                <LucideIcons.Bath size={18} className="text-accent" />
                                <span className="text-sm font-medium">{apt.bathrooms} Baños</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                              <p className="text-sm text-secondary font-medium">
                                {apt.available ? 'Disponible' : 'Vendido'}
                              </p>
                              <Link
                                href={withUtm(`/departamentos/${apt.id}`)}
                                className="px-5 py-2.5 bg-neutral-100 hover:bg-accent hover:text-white text-primary rounded-xl text-sm font-medium transition-all"
                              >
                                Ver Detalles
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      );})}
                    </div>
                  </motion.div>
                )}

                {/* Galería general (solo para proyectos que no son Brindizi) */}
                {resolvedParams.id !== "brindizi" && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <ImageGallery images={project.gallery} />
                  </motion.div>
                )}

                {/* Unified Services & Amenities - High Impact */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <LucideIcons.Sparkles className="text-accent" />
                      Servicios y Amenidades
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {([
                      ...(project.features || []).map(f => ({ name: f.name, icon: f.icon, type: 'feature' })),
                      ...(project.commonAreas || []).map(a => ({ name: a, icon: undefined, type: 'amenity' })),
                      ...(buildingData?.buildingFeatures || []).map(f => ({ name: f.name, icon: f.iconName, type: 'building' }))
                    ]
                      .filter((v): v is { name: string; icon: string | undefined; type: string } => Boolean(v.name))
                      .filter((v, i, a) => a.findIndex(t => getAmenityDedupKey(t.name) === getAmenityDedupKey(v.name)) === i)
                      .map((item, idx) => {
                        const ItemIcon = getItemIcon(item.name, item.icon) || LucideIcons.CheckCircle2;
                        return (
                          <motion.div
                            key={idx}
                            variants={fadeIn}
                            className="bg-white p-6 rounded-[2rem] border border-neutral-100 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                          >
                            <div className="w-12 h-12 bg-sand rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                              {ItemIcon && <ItemIcon size={20} className="text-secondary group-hover:text-white" />}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary leading-tight px-1">
                              {item.name}
                            </span>
                          </motion.div>
                        );
                      }))}
                    {(!project.features?.length && !project.commonAreas?.length && !buildingData?.buildingFeatures?.length) && (
                      <div className="col-span-full py-10 text-center text-secondary italic">
                        Servicios en actualización...
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

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
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mx-auto mb-6">
                      <LucideIcons.Key size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Solicitar Información</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Si buscas un nuevo hogar o una inversión segura, déjanos tus datos y un asesor te guiará en el proceso.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={buildWhatsAppHref(
                        "51964247545",
                        `Hola, estoy interesado en el proyecto ${project.title}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-bold text-center transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                    >
                      <LucideIcons.MessageCircle size={20} />
                      WhatsApp Directo
                    </a>
                    <a
                      href={withUtm("#contactanos")}
                      className="block w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2"
                    >
                      <LucideIcons.Mail size={20} />
                      Más Información
                    </a>
                    <Link
                      href={withUtm("/financiamiento")}
                      className="block w-full py-4 bg-sand hover:bg-sand-dark text-primary rounded-2xl font-bold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <LucideIcons.Calculator size={20} />
                      Opciones de Crédito
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


