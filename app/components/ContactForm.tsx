"use client";
import { useState } from "react";

const projects = [
  { id: "1", name: "Malecón Vista Mar", district: "Miraflores" },
  { id: "2", name: "Parque Central", district: "San Isidro" },
  { id: "3", name: "Los Fresnos", district: "Surco" },
  { id: "4", name: "Costa Verde Premium", district: "Barranco" },
  { id: "5", name: "Jardines del Sol", district: "La Molina" },
  { id: "6", name: "Puente Piedra Gardens", district: "Puente Piedra" },
];

const bedrooms = [
  { value: "", label: "Seleccionar" },
  { value: "1", label: "1 dormitorio" },
  { value: "2", label: "2 dormitorios" },
  { value: "3", label: "3 dormitorios" },
];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert("¡Gracias por tu interés! Te contactaremos pronto.");
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="+51 999 999 999"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Proyecto de interés
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  >
                    <option value="">Seleccionar proyecto</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name} - {project.district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Número de dormitorios
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  >
                    {bedrooms.map(bedroom => (
                      <option key={bedroom.value} value={bedroom.value}>
                        {bedroom.label}
                      </option>
                    ))}
                  </select>
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                  placeholder="Cuéntanos más sobre tus necesidades..."
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent"
                  />
                  <label className="text-sm text-secondary">
                    Acepto las <a href="#" className="text-accent hover:underline">políticas de privacidad</a> *
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={formData.marketing}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent"
                  />
                  <label className="text-sm text-secondary">
                    Autorizo a que me envíen publicidad y promociones
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="shareData"
                    checked={formData.shareData}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-accent border-neutral-300 rounded focus:ring-accent"
                  />
                  <label className="text-sm text-secondary">
                    Autorizo a que mi información sea compartida con empresas del grupo
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                Enviar consulta
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
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
