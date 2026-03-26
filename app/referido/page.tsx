"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  ChevronDown, 
  CheckCircle2, 
  Users,
  Target,
  FileText
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ALL_PROJECTS, Project } from "../lib/projects";
import { withUtm } from "../lib/utm";

export default function ReferidoPage() {
  const [formData, setFormData] = useState({
    ref_name: "",
    ref_lastname: "",
    ref_dni: "",
    ref_phone: "",
    ref_email: "",
    referred_name: "",
    referred_lastname: "",
    referred_dni: "",
    referred_phone: "",
    referred_email: "",
    project: "",
    terms: false,
    privacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.ref_name) newErrors.ref_name = "Requerido";
    if (!formData.ref_lastname) newErrors.ref_lastname = "Requerido";
    if (!formData.ref_dni) newErrors.ref_dni = "Requerido";
    if (!formData.ref_phone) newErrors.ref_phone = "Requerido";
    if (!formData.ref_email) newErrors.ref_email = "Requerido";
    
    if (!formData.referred_name) newErrors.referred_name = "Requerido";
    if (!formData.referred_lastname) newErrors.referred_lastname = "Requerido";
    if (!formData.referred_dni) newErrors.referred_dni = "Requerido";
    if (!formData.referred_phone) newErrors.referred_phone = "Requerido";
    if (!formData.referred_email) newErrors.referred_email = "Requerido";
    
    if (!formData.project) newErrors.project = "Selecciona un proyecto";
    if (!formData.terms) newErrors.terms = "Debes aceptar los términos";
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const inputClasses = (field: string) => `
    w-full bg-white px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm
    ${errors[field] ? 'border-red-400 focus:ring-2 ring-red-50' : 'border-neutral-200 focus:border-accent focus:ring-2 ring-accent/5'}
    text-primary font-medium placeholder:text-secondary/40
  `;

  return (
    <div className="min-h-screen bg-sand">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-16">
        <div className="container-page">
          {/* Hero Section with Form */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
            
            {/* Left side: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[850px] group"
            >
              <Image 
                src="/referido.png" 
                alt="Referidos Fabre" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 lg:p-12">
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6"
                  >
                    Programa de beneficios
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
                  >
                    ¡Refiere, <br />
                    <span className="text-accent underline decoration-white/20 underline-offset-8">comparte</span> <br />
                    y gana!
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl lg:text-2xl text-white/90 font-medium max-w-md leading-relaxed"
                  >
                    Recomienda a tus amigos y obtén bonos exclusivos por cada cierre.
                  </motion.p>
                </div>

                {/* Floating Trust Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hidden lg:flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-[10px] uppercase tracking-wider font-bold">Programa Oficial</p>
                    <p className="text-white/70 text-[9px]">Garantía Fabre</p>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-12 right-12 w-24 h-24 border-t-2 border-r-2 border-white/20 rounded-tr-3xl"></div>
                <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-3xl"></div>
              </div>
            </motion.div>

            {/* Right side: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 lg:p-10 rounded-[2rem] shadow-xl border border-neutral-100 relative overflow-hidden"
            >
              {/* Decorative background shape */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <p className="text-secondary text-sm mb-8 leading-relaxed max-w-sm">
                  Déjanos los datos de tu referido y pronto unos de nuestros asesores se contactará con él.
                </p>

                <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">¡Datos Registrados!</h3>
                    <p className="text-secondary">Gracias por confiar en nosotros. Nos pondremos en contacto con tu referido pronto.</p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 btn-primary"
                    >
                      Referir a alguien más
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Sección 1: Datos del referente */}
                    <div className="space-y-4">
                      <h3 className="text-accent font-bold text-sm uppercase tracking-wider">Datos del referente</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="Nombres*" 
                          className={inputClasses('ref_name')}
                          value={formData.ref_name}
                          onChange={e => setFormData({...formData, ref_name: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="Apellidos*" 
                          className={inputClasses('ref_lastname')}
                          value={formData.ref_lastname}
                          onChange={e => setFormData({...formData, ref_lastname: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="DNI / CE*" 
                          className={inputClasses('ref_dni')}
                          value={formData.ref_dni}
                          onChange={e => setFormData({...formData, ref_dni: e.target.value})}
                        />
                        <input 
                          type="tel" 
                          placeholder="Celular*" 
                          className={inputClasses('ref_phone')}
                          value={formData.ref_phone}
                          onChange={e => setFormData({...formData, ref_phone: e.target.value})}
                        />
                      </div>
                      <input 
                        type="email" 
                        placeholder="Correo electrónico*" 
                        className={inputClasses('ref_email')}
                        value={formData.ref_email}
                        onChange={e => setFormData({...formData, ref_email: e.target.value})}
                      />
                    </div>

                    {/* Sección 2: Datos del referido */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-accent font-bold text-sm uppercase tracking-wider">Datos del referido</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="Nombres*" 
                          className={inputClasses('referred_name')}
                          value={formData.referred_name}
                          onChange={e => setFormData({...formData, referred_name: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="Apellidos*" 
                          className={inputClasses('referred_lastname')}
                          value={formData.referred_lastname}
                          onChange={e => setFormData({...formData, referred_lastname: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="DNI / CE*" 
                          className={inputClasses('referred_dni')}
                          value={formData.referred_dni}
                          onChange={e => setFormData({...formData, referred_dni: e.target.value})}
                        />
                        <input 
                          type="tel" 
                          placeholder="Celular*" 
                          className={inputClasses('referred_phone')}
                          value={formData.referred_phone}
                          onChange={e => setFormData({...formData, referred_phone: e.target.value})}
                        />
                      </div>
                      <input 
                        type="email" 
                        placeholder="Correo electrónico*" 
                        className={inputClasses('referred_email')}
                        value={formData.referred_email}
                        onChange={e => setFormData({...formData, referred_email: e.target.value})}
                      />
                    </div>

                    {/* Proyecto */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-accent font-bold text-sm uppercase tracking-wider">Proyecto de interés del referido *</h3>
                      <div className="relative">
                        <select 
                          className={`${inputClasses('project')} appearance-none cursor-pointer pr-10`}
                          value={formData.project}
                          onChange={e => setFormData({...formData, project: e.target.value})}
                        >
                          <option value="">Selecciona un proyecto</option>
                          {ALL_PROJECTS.map((project: Project) => (
                            <option key={project.id} value={project.id}>{project.title.toUpperCase()}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                      </div>
                      {errors.project && <p className="text-red-500 text-xs font-bold">{errors.project}</p>}
                    </div>

                    <p className="text-[10px] text-secondary/60">(*) Campos obligatorios</p>

                    {/* Checks */}
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-accent focus:ring-accent"
                          checked={formData.terms}
                          onChange={e => setFormData({...formData, terms: e.target.checked})}
                        />
                        <span className="text-xs text-secondary leading-tight group-hover:text-primary transition-colors">
                          He leído y acepto los <Link href={withUtm("/terms")} className="text-accent hover:underline font-bold">Términos y condiciones</Link> de Inmobiliaria Fabre
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-accent focus:ring-accent"
                          checked={formData.privacy}
                          onChange={e => setFormData({...formData, privacy: e.target.checked})}
                        />
                        <span className="text-xs text-secondary leading-tight group-hover:text-primary transition-colors">
                          Autorizo a Inmobiliaria Fabre para que realice las actividades de prospección comercial y marketing descritas en la <Link href={withUtm("/privacy")} className="text-accent hover:underline font-bold">Política de Privacidad</Link>
                        </span>
                      </label>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "ENVIAR"
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

          {/* Steps Section */}
          <section className="py-20 border-t border-neutral-200">
            <h2 className="text-2xl lg:text-4xl font-bold text-center text-primary mb-16">
              Para <span className="text-accent">referir</span>, solo debes seguir los siguientes pasos:
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  id: "1",
                  icon: <Mail className="w-12 h-12 text-accent" />,
                  title: "Ingresa tus datos y los de tu referido",
                  desc: "en el formulario"
                },
                {
                  id: "2",
                  icon: <Users className="w-12 h-12 text-accent" />,
                  title: "El referido será contactado",
                  desc: "por nuestro equipo comercial y cotizará un proyecto"
                },
                {
                  id: "3",
                  icon: <FileText className="w-12 h-12 text-accent" />,
                  title: "Si el referido separa y firma",
                  desc: "la minuta compra-venta, ¡Ganaste!"
                }
              ].map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100 text-center flex flex-col items-center group hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold mb-8 shadow-lg shadow-accent/20">
                    {step.id}
                  </div>
                  <div className="mb-6 p-4 bg-accent/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-primary mb-2 text-lg leading-tight">{step.title}</h4>
                  <p className="text-secondary text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
