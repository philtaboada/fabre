"use client";
import { useState, useEffect } from "react";

const projects = [
  { id: "1", name: "Malec", district: "San Carlos" },
  { id: "2", name: "Parque Central", district: "San Isidro" },
  { id: "3", name: "Los Fresnos", district: "Surco" },

];

const bedrooms = [
  { value: "", label: "Seleccionar" },
  { value: "1", label: "1 dormitorio" },
  { value: "2", label: "2 dormitorios" },
  { value: "3", label: "3 dormitorios" },
  { value: "4", label: "4+ dormitorios" },
];

interface FormErrors {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  project?: string;
  bedrooms?: string;
  privacy?: string;
  general?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validaciones
  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'name':
      case 'lastname':
        if (!value) return 'Este campo es obligatorio';
        if (typeof value === 'string' && value.length < 2) return 'Debe tener al menos 2 caracteres';
        if (typeof value === 'string' && !/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Solo letras y espacios';
        return '';

      case 'email':
        if (!value) return 'El email es obligatorio';
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Ingresa un email válido';
        }
        return '';

      case 'phone':
        if (!value) return 'El teléfono es obligatorio';
        if (typeof value === 'string' && !/^(\+51|51)?\s?9\d{8}$/.test(value.replace(/\s/g, ''))) {
          return 'Ingresa un número válido (+51 999 999 999)';
        }
        return '';

      case 'privacy':
        if (!value) return 'Debes aceptar las políticas de privacidad';
        return '';

      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validar campos requeridos
    Object.keys(formData).forEach(key => {
      if (key !== 'marketing' && key !== 'shareData' && key !== 'message' && key !== 'bedrooms') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const fieldValue = type === 'checkbox' ? checked : value;
    const error = validateField(name, fieldValue);

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Formatear teléfono automáticamente
  useEffect(() => {
    if (formData.phone && !formData.phone.includes('+51') && formData.phone.length >= 9) {
      const cleaned = formData.phone.replace(/\D/g, '');
      if (cleaned.length === 9) {
        setFormData(prev => ({
          ...prev,
          phone: `+51 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
        }));
      }
    }
  }, [formData.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Marcar todos los campos como tocados para mostrar errores
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío (reemplazar con tu lógica real)
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Formulario enviado:", formData);
      setSubmitSuccess(true);

      // Resetear formulario después del éxito
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
      setErrors({ general: "Error al enviar el formulario. Inténtalo de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-sand">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 animate-fade-in-up">
              ¿Listo para tu nuevo hogar?
            </h2>
            <p className="text-secondary text-lg mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Completa el formulario y un asesor especializado te contactará para
              guiarte en el proceso de compra de tu departamento ideal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {/* Mensaje de éxito */}
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-green-800 font-medium">¡Mensaje enviado exitosamente!</p>
                  </div>
                  <p className="text-green-700 text-sm mt-1">Te contactaremos pronto con más información.</p>
                </div>
              )}

              {/* Error general */}
              {errors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-red-800 font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Nombres *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.name && touched.name
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                          : 'border-neutral-300 focus:ring-accent/30 focus:border-accent'
                      }`}
                      placeholder="Tu nombre"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {errors.name && touched.name ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ) : formData.name && !errors.name ? (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ) : null}
                    </div>
                  </div>
                  {errors.name && touched.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Apellidos *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.lastname && touched.lastname
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                          : 'border-neutral-300 focus:ring-accent/30 focus:border-accent'
                      }`}
                      placeholder="Tus apellidos"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {errors.lastname && touched.lastname ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ) : formData.lastname && !errors.lastname ? (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ) : null}
                    </div>
                  </div>
                  {errors.lastname && touched.lastname && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email && touched.email
                        ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                        : 'border-neutral-300 focus:ring-accent/30 focus:border-accent'
                    }`}
                    placeholder="tu@email.com"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {errors.email && touched.email ? (
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) : formData.email && !errors.email ? (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) : null}
                  </div>
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.phone && touched.phone
                        ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                        : 'border-neutral-300 focus:ring-accent/30 focus:border-accent'
                    }`}
                    placeholder="+51 999 999 999"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {errors.phone && touched.phone ? (
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) : formData.phone && !errors.phone ? (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ) : null}
                  </div>
                </div>
                {errors.phone && touched.phone && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Proyecto de interés
                  </label>
                  <div className="relative">
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 appearance-none bg-white ${
                        errors.project && touched.project
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                          : 'border-neutral-300 focus:ring-accent/30 focus:border-accent'
                      }`}
                    >
                      <option value="">Seleccionar proyecto</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name} - {project.district}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Número de dormitorios
                  </label>
                  <div className="relative">
                    <select
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none bg-white transition-all duration-200"
                    >
                      {bedrooms.map(bedroom => (
                        <option key={bedroom.value} value={bedroom.value}>
                          {bedroom.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Mensaje adicional
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none transition-all duration-200"
                  placeholder="Cuéntanos más sobre tus necesidades, presupuesto, requisitos especiales..."
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent focus:ring-2"
                    />
                    {errors.privacy && touched.privacy && (
                      <div className="absolute -top-1 -right-1">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-secondary cursor-pointer">
                      Acepto las <a href="#" className="text-accent hover:underline font-medium">políticas de privacidad</a> *
                    </label>
                    {errors.privacy && touched.privacy && (
                      <p className="text-red-600 text-xs mt-1">{errors.privacy}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={formData.marketing}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent focus:ring-2"
                  />
                  <label className="text-sm text-secondary cursor-pointer">
                    Autorizo a que me envíen publicidad y promociones
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="shareData"
                    checked={formData.shareData}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent focus:ring-2"
                  />
                  <label className="text-sm text-secondary cursor-pointer">
                    Autorizo a que mi información sea compartida con empresas del grupo
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? 'bg-neutral-400 cursor-not-allowed'
                      : 'btn-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                      Enviar consulta
                    </>
                  )}
                </button>

                <p className="text-xs text-secondary text-center mt-3">
                  Tu información está segura y será tratada con confidencialidad
                </p>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-right">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Información de contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4 hover-lift transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Teléfono</h4>
                  <p className="text-secondary">+51 978 724 604</p>
                  <p className="text-sm text-secondary">Lunes a domingo: 10am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover-lift transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Email</h4>
                  <p className="text-secondary">atencionalcliente@fabre.pe</p>
                  <p className="text-sm text-secondary">Respuesta en menos de 24 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover-lift transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Oficina</h4>
                  <p className="text-secondary">Calle Jose Gálvez N°690, Ofic. 402</p>
                  <p className="text-secondary">Miraflores, Lima</p>
                  <p className="text-sm text-secondary">Lunes a viernes: 8am - 6pm</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl card">
              <h4 className="font-semibold text-primary mb-4">¿Por qué elegirnos?</h4>
              <ul className="space-y-3 text-sm text-secondary">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Más de 15 años de experiencia
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Entregas puntuales garantizadas
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Asesoría financiera incluida
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Post-venta 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
