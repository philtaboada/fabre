"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  User,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Zap,
  Clock,
  Award
} from "lucide-react";

interface ContactFormProps {
  defaultProjectId?: string;
}

export default function ContactForm({ defaultProjectId = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: defaultProjectId,
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Por favor ingresa tu nombre";
    if (!formData.email) newErrors.email = "Correo electrónico requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.phone) newErrors.phone = "Número de celular requerido";
    if (!formData.project) newErrors.project = "Selecciona un proyecto";
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

<<<<<<< HEAD
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);
=======
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          project: formData.project || undefined,
          bedrooms: formData.bedrooms || undefined,
          message: formData.message || undefined,
          marketing: formData.marketing,
          shareData: formData.shareData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Error al enviar el formulario");
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          lastname: "",
          email: "",
          phone: "",
          project: "",
          bedrooms: "",
          message: "",
          privacy: false,
          marketing: false,
          shareData: false,
        });
        setTouched({});
        setErrors({});
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Error al enviar el formulario. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
>>>>>>> 7e7c563 (Implement form submission logic in ContactForm component with error handling and API integration)
  };

  const inputClasses = (field: string) => `
    w-full bg-neutral-50 px-6 py-4 rounded-2xl border transition-all duration-300 outline-none
    ${errors[field] ? 'border-red-400 focus:ring-4 ring-red-50' : 'border-neutral-100 focus:border-accent focus:bg-white focus:ring-4 ring-accent/5'}
    text-primary font-medium placeholder:text-secondary/50
  `;

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-neutral-50 overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-8">
              Tu futuro hogar <br />
              <span className="text-accent underline decoration-accent-light underline-offset-8">comienza aquí</span>
            </h2>
            <p className="text-secondary text-lg mb-12 leading-relaxed max-w-lg">
              Solicita asesoría personalizada y descubre cómo facilitamos el camino hacia tu nuevo departamento.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Teléfono</h4>
                  <p className="text-blue-600 font-medium">+51 964 247 545</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Correo</h4>
                  <p className="text-blue-600 font-medium">gerencia@inmobiliariafabre.com</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Oficina</h4>
                  <p className="text-blue-600 font-medium">San Judas Tadeo 421, Huancayo</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Horario de Atención</h4>
                  <p className="text-blue-600 font-medium">Lun - Dom: 9am - 7pm</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-200 grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-green-500" />
                <span className="text-sm font-bold text-primary">Transacción 100% Segura</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <span className="text-sm font-bold text-primary">Garantía Inmobiliaria</span>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl border border-neutral-100 relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>

              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">¡Solicitud Enviada!</h3>
                    <p className="text-secondary text-lg">Un asesor te contactará en los próximos minutos.</p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 text-accent font-bold hover:underline"
                    >
                      Enviar otra consulta
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary flex items-center gap-2">
                          <User className="w-4 h-4 text-accent" /> Nombre completo
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Juan Pérez"
                          className={inputClasses('name')}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          value={formData.name}
                        />
                        {errors.name && <p className="text-red-500 text-xs font-bold pl-2">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary flex items-center gap-2">
                          <Mail className="w-4 h-4 text-accent" /> Correo electrónico
                        </label>
                        <input
                          type="email"
                          placeholder="juan@ejemplo.com"
                          className={inputClasses('email')}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          value={formData.email}
                        />
                        {errors.email && <p className="text-red-500 text-xs font-bold pl-2">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary flex items-center gap-2">
                          <Phone className="w-4 h-4 text-accent" /> Celular
                        </label>
                        <input
                          type="tel"
                          placeholder="+51 999 999 999"
                          className={inputClasses('phone')}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          value={formData.phone}
                        />
                        {errors.phone && <p className="text-red-500 text-xs font-bold pl-2">{errors.phone}</p>}
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-sm font-bold text-primary flex items-center gap-2">
                          <Zap className="w-4 h-4 text-accent" /> Proyecto
                        </label>
                        <select
                          className={`${inputClasses('project')} appearance-none cursor-pointer`}
                          onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                          value={formData.project}
                        >
                          <option value="">Selecciona proyecto</option>
                          <option value="brindizi">Brindizi (En curso)</option>
                          <option value="future">Próximos lanzamientos</option>
                        </select>
                        <ChevronDown className="absolute right-6 bottom-5 w-5 h-5 text-secondary pointer-events-none" />
                        {errors.project && <p className="text-red-500 text-xs font-bold pl-2">{errors.project}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-accent" /> Mensaje (Opcional)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Quisiera más información sobre los departamentos..."
                        className={inputClasses('message')}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        value={formData.message}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/95 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando solicitud...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Solicitar Información
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-secondary/60">
                      Al enviar, aceptas nuestras políiticas de tratamiento de datos personales.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-xs font-bold text-secondary">Respuesta en {'<'} 15 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-xs font-bold text-secondary">Ventas Oficiales</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
