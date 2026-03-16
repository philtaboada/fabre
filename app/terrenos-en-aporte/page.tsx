"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WHATSAPP_PHONE = "51964247545";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, tengo un terreno que me gustaría ofrecer en aporte. ¿Podrían darme más información?"
);

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.79 0 .67 5.12.67 11.4c0 2.01.52 3.95 1.5 5.68L0 24l7.1-2.23a11.3 11.3 0 0 0 4.96 1.15h.01c6.28 0 11.4-5.12 11.4-11.4 0-3.04-1.18-5.9-3.35-8.04zM12.06 21.2h-.01a9.8 9.8 0 0 1-4.7-1.2l-.34-.18-4.2 1.32 1.36-4.09-.2-.35a9.8 9.8 0 0 1-1.42-5.1c0-5.42 4.41-9.83 9.83-9.83 2.63 0 5.1 1.02 6.96 2.88 1.86 1.87 2.88 4.34 2.88 6.96 0 5.42-4.41 9.83-9.83 9.83zm5.39-7.35c-.29-.14-1.72-.85-1.98-.95-.27-.1-.46-.14-.66.14-.19.29-.76.94-.93 1.13-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.5-.17 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 1-.1 2.43.9 1.44 2.06 2.48 3.43 3.2.48.26.86.41 1.16.52.49.16.94.14 1.29.09.39-.06 1.2-.49 1.37-.96.17-.48.17-.89.12-.98-.05-.1-.19-.15-.48-.29z" />
    </svg>
  );
}

export default function TerrenosEnAportePage() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccionTerreno: "",
    metrajeTerreno: "",
    mensaje: "",
    politicaPrivacidad: false,
    autorizacionMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombres.trim()) newErrors.nombres = "Campo obligatorio";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Campo obligatorio";
    if (!formData.email.trim()) newErrors.email = "Campo obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.telefono.trim()) newErrors.telefono = "Campo obligatorio";
    if (!formData.direccionTerreno.trim()) newErrors.direccionTerreno = "Campo obligatorio";
    if (!formData.metrajeTerreno.trim()) newErrors.metrajeTerreno = "Campo obligatorio";
    if (!formData.mensaje.trim()) newErrors.mensaje = "Campo obligatorio";
    if (!formData.politicaPrivacidad) newErrors.politicaPrivacidad = "Debes aceptar la Política de Privacidad";
    if (!formData.autorizacionMarketing) newErrors.autorizacionMarketing = "Debes autorizar las actividades descritas";
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nombres,
          lastname: formData.apellidos,
          email: formData.email,
          phone: formData.telefono,
          message: `[Terrenos en aporte]\nDirección: ${formData.direccionTerreno}\nMetraje: ${formData.metrajeTerreno}\n\n${formData.mensaje}`,
          marketing: formData.autorizacionMarketing,
          shareData: formData.politicaPrivacidad,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Error al enviar el formulario");
      }

      setSubmitSuccess(true);
      setFormData({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        direccionTerreno: "",
        metrajeTerreno: "",
        mensaje: "",
        politicaPrivacidad: false,
        autorizacionMarketing: false,
      });
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Error al enviar el formulario. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-neutral-50 px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm
    ${errors[field] ? "border-red-400 focus:ring-2 ring-red-50" : "border-neutral-200 focus:border-accent focus:ring-2 ring-accent/5"}
    text-primary font-medium placeholder:text-secondary/40`;

  return (
    <div className="min-h-screen bg-sand">
      <Header />

      <main className="pt-24 lg:pt-32 pb-16">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-bold rounded-full mb-4">
              Buscamos terrenos en aporte
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
              Terrenos en aporte
            </h1>
            <div className="text-secondary mb-6 space-y-3 max-w-2xl mx-auto">
              <p className="text-lg">
                Si tienes un terreno bien ubicado, puedes obtener mucho más que solo el valor de tu terreno.
              </p>
              <p className="text-lg">
                Desarrollamos el proyecto y el propietario recibe el precio de su terreno más su rentabilidad.
              </p>
              <p className="font-medium text-primary">
                Registra tus datos para evaluar tu terreno y recibir más información.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="tel:+51964247545"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors underline decoration-primary/30 hover:decoration-accent"
              >
                <Phone className="w-4 h-4" />
                +51 964 247 545
              </a>
              <a
                href="mailto:gerencia@inmobiliariafabre.com"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors underline decoration-primary/30 hover:decoration-accent"
              >
                <Mail className="w-4 h-4" />
                gerencia@inmobiliariafabre.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 lg:p-10 rounded-[2rem] shadow-xl border border-neutral-100 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

            <div className="relative z-10">
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
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      ¡Solicitud enviada!
                    </h3>
                    <p className="text-secondary mb-8">
                      Un asesor te contactará pronto para evaluar tu terreno.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="btn-primary"
                    >
                      Enviar otra solicitud
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    exit={{ opacity: 0 }}
                  >
                    {errors.general && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                        {errors.general}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary">
                          Nombres <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Escribe tus nombres aquí"
                          className={inputClasses("nombres")}
                          value={formData.nombres}
                          onChange={(e) =>
                            setFormData({ ...formData, nombres: e.target.value })
                          }
                        />
                        {errors.nombres && (
                          <p className="text-red-500 text-xs font-bold">
                            {errors.nombres}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary">
                          Apellidos <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Escribe tus apellidos aquí"
                          className={inputClasses("apellidos")}
                          value={formData.apellidos}
                          onChange={(e) =>
                            setFormData({ ...formData, apellidos: e.target.value })
                          }
                        />
                        {errors.apellidos && (
                          <p className="text-red-500 text-xs font-bold">
                            {errors.apellidos}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary">
                          Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Ej. nombre@correo.com"
                          className={inputClasses("email")}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs font-bold">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary">
                          Teléfono <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Escribe tu teléfono o celular"
                          className={inputClasses("telefono")}
                          value={formData.telefono}
                          onChange={(e) =>
                            setFormData({ ...formData, telefono: e.target.value })
                          }
                        />
                        {errors.telefono && (
                          <p className="text-red-500 text-xs font-bold">
                            {errors.telefono}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary">
                          Dirección del terreno <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Escribe la dirección aquí"
                          className={inputClasses("direccionTerreno")}
                          value={formData.direccionTerreno}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              direccionTerreno: e.target.value,
                            })
                          }
                        />
                        {errors.direccionTerreno && (
                          <p className="text-red-500 text-xs font-bold">
                            {errors.direccionTerreno}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary">
                          Metraje del terreno <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ingresa el metraje"
                          className={inputClasses("metrajeTerreno")}
                          value={formData.metrajeTerreno}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              metrajeTerreno: e.target.value,
                            })
                          }
                        />
                        {errors.metrajeTerreno && (
                          <p className="text-red-500 text-xs font-bold">
                            {errors.metrajeTerreno}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">
                        Mensaje <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Escríbenos aquí..."
                        className={inputClasses("mensaje")}
                        value={formData.mensaje}
                        onChange={(e) =>
                          setFormData({ ...formData, mensaje: e.target.value })
                        }
                      />
                      {errors.mensaje && (
                        <p className="text-red-500 text-xs font-bold">
                          {errors.mensaje}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-secondary">(*) Campos obligatorios</p>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-accent focus:ring-accent"
                          checked={formData.politicaPrivacidad}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              politicaPrivacidad: e.target.checked,
                            })
                          }
                        />
                        <span className="text-xs text-secondary leading-tight group-hover:text-primary transition-colors">
                          He leído la{" "}
                          <Link
                            href="/terms"
                            className="text-accent hover:underline font-bold"
                          >
                            Política de Privacidad
                          </Link>{" "}
                          de Inmobiliaria Fabre.
                        </span>
                      </label>
                      {errors.politicaPrivacidad && (
                        <p className="text-red-500 text-xs font-bold">
                          {errors.politicaPrivacidad}
                        </p>
                      )}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-accent focus:ring-accent"
                          checked={formData.autorizacionMarketing}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              autorizacionMarketing: e.target.checked,
                            })
                          }
                        />
                        <span className="text-xs text-secondary leading-tight group-hover:text-primary transition-colors">
                          Autorizo a{" "}
                          <Link
                            href="/terms"
                            className="text-accent hover:underline font-bold"
                          >
                            Fabre
                          </Link>{" "}
                          para que realice las actividades de prospección comercial y
                          marketing descritas en la{" "}
                          <Link
                            href="/terms"
                            className="text-accent hover:underline font-bold"
                          >
                            Política de Privacidad
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.autorizacionMarketing && (
                        <p className="text-red-500 text-xs font-bold">
                          {errors.autorizacionMarketing}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          "ENVIAR"
                        )}
                      </button>
                      <span className="text-secondary text-sm">o</span>
                      <a
                        href={`https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MESSAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                      >
                        <WhatsAppIcon className="w-6 h-6" />
                        Escríbenos por WhatsApp
                      </a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
