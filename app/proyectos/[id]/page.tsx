import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import { getProjectById, getOtherProjects } from "../../lib/projects";
import ProjectCard from "../../components/ProjectCard";
import ContactForm from "../../components/ContactForm";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} - ${project.district} | Fabre Inmobiliaria`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  const otherProjects = getOtherProjects(id);

  if (!project) {
    notFound();
  }

  const priceLabel = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(project.price);

  const monthlyPayment = Math.round((project.price * 1.08) / 120);
  const monthlyPaymentLabel = new Intl.NumberFormat("es-PE", {
    maximumFractionDigits: 0,
  }).format(monthlyPayment);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Pre-venta":
        return {
          color: "bg-emerald-500",
          text: "Pre-venta",
        };
      case "En construcción":
        return {
          color: "bg-amber-500",
          text: "En construcción",
        };
      case "Entregado":
        return {
          color: "bg-slate-600",
          text: "Entregado",
        };
      default:
        return {
          color: "bg-gray-500",
          text: status,
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <div className="absolute inset-0 container-page flex items-end pb-12 lg:pb-16">
            <div className="w-full text-white animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-2 text-sm font-semibold rounded-full ${statusConfig.color} text-white shadow-lg`}>
                  {statusConfig.text}
                </span>
                {project.deliveryDate && (
                  <span className="px-4 py-2 text-sm font-semibold rounded-full bg-white/20 backdrop-blur-sm text-white">
                    Entrega: {project.deliveryDate}
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-3">{project.title}</h1>
              <div className="flex items-center gap-2 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{project.district}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-4 left-0 right-0 container-page z-10">
          <nav className="flex items-center gap-2 text-white/80 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/#proyectos" className="hover:text-white transition-colors">Proyectos</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
        <div className="container-page py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{priceLabel}</div>
              <div className="text-xs text-secondary">Precio desde</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{project.area}</div>
              <div className="text-xs text-secondary">m²</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{project.bedrooms}</div>
              <div className="text-xs text-secondary">Dormitorios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{project.bathrooms}</div>
              <div className="text-xs text-secondary">Baños</div>
            </div>
            {project.floors && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{project.floors}</div>
                <div className="text-xs text-secondary">Pisos</div>
              </div>
            )}
            {project.units && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{project.units}</div>
                <div className="text-xs text-secondary">Unidades</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sobre el Proyecto */}
      <section id="sobre-el-proyecto" className="py-16 lg:py-24 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                  Sobre el Proyecto
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {project.title}
              </h2>
              <div className="prose prose-lg max-w-none text-secondary leading-relaxed space-y-4">
                <p className="text-xl text-primary font-medium">{project.description}</p>
                <p>{project.about}</p>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-sand rounded-lg">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-sm font-medium text-primary">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="card p-6 lg:p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-primary mb-6">Información del Proyecto</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-secondary">Precio desde</span>
                    <span className="text-xl font-bold text-accent">{priceLabel}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-secondary">Cuota mensual</span>
                    <span className="text-lg font-semibold text-primary">S/ {monthlyPaymentLabel}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-secondary">Área</span>
                    <span className="font-semibold text-primary">{project.area} m²</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-secondary">Dormitorios</span>
                    <span className="font-semibold text-primary">{project.bedrooms}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                    <span className="text-secondary">Baños</span>
                    <span className="font-semibold text-primary">{project.bathrooms}</span>
                  </div>
                  {project.deliveryDate && (
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-secondary">Entrega</span>
                      <span className="font-semibold text-primary">{project.deliveryDate}</span>
                    </div>
                  )}
                  <div className="pt-4 space-y-3">
                    <Link href="#contactanos" className="w-full btn-primary justify-center text-center block">
                      Solicitar información
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href="https://wa.me/51978724604"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-secondary justify-center text-center block"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas Comunes */}
      <section id="areas-comunes" className="py-16 lg:py-24 bg-sand">
        <div className="container-page">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                Amenidades
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Áreas Comunes
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Disfruta de espacios diseñados para tu bienestar y el de tu familia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {project.commonAreas.map((area, index) => (
              <div
                key={index}
                className="card p-6 text-center hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary text-sm lg:text-base">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de Ambientes */}
      <section id="galeria" className="py-16 lg:py-24 bg-white">
        <div className="container-page">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                Galería
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Galería de Ambientes
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Conoce los espacios que te esperan en {project.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={image}
                  alt={`${project.title} - Imagen ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="py-16 lg:py-24 bg-sand">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                  Ubicación
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                Ubicación Estratégica
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Dirección</h3>
                    <p className="text-secondary">{project.location.address}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-primary text-lg">Cerca de ti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.location.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg card">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">{place.icon === "park" ? "🌳" : place.icon === "shopping" ? "🛍️" : place.icon === "hospital" ? "🏥" : place.icon === "school" ? "🎓" : place.icon === "beach" ? "🏖️" : place.icon === "transport" ? "🚇" : "📍"}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-primary">{place.name}</div>
                          <div className="text-sm text-secondary">{place.distance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${project.location.coordinates.lat},${project.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative w-full h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden card">
                <iframe
                  src={`https://www.google.com/maps?q=${project.location.coordinates.lat},${project.location.coordinates.lng}&hl=es&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contáctanos */}
      <section id="contactanos" className="py-16 lg:py-24 bg-white">
        <div className="container-page">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                Contacto
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              ¿Interesado en {project.title}?
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Completa el formulario y un asesor especializado te contactará para brindarte toda la información que necesitas
            </p>
          </div>
          <ContactForm defaultProjectId={project.id} />
        </div>
      </section>

      {/* Conoce Más Proyectos */}
      {otherProjects.length > 0 && (
        <section id="mas-proyectos" className="py-16 lg:py-24 bg-sand">
          <div className="container-page">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                  Más Proyectos
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                Conoce Más Proyectos
              </h2>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Explora otros proyectos que podrían interesarte
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {otherProjects.map((p, index) => (
                <div
                  key={p.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard {...p} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-in-up">
              <Link href="/#proyectos" className="btn-secondary">
                Ver todos los proyectos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

