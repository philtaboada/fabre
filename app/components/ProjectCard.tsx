import Image from "next/image";
import Link from "next/link";

type Status = "Pre-venta" | "En construcción" | "Entregado" | "Entrega inmediata" | "Próximo lanzamiento";

export default function ProjectCard({
  id,
  title,
  district,
  area,
  status,
  image,
  bedrooms,
  bathrooms,
  featured = false,
}: {
  id: string;
  title: string;
  district: string;
  area: number; // m²
  price: number; // mantiene compatibilidad con datos, no se muestra
  status: Status;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
}) {
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case "Pre-venta":
        return {
          color: "bg-emerald-500",
          text: "Pre-venta",
          urgency: "¡Oportunidad única!"
        };
      case "En construcción":
        return {
          color: "bg-amber-500",
          text: "En construcción",
          urgency: "Entrega pronto"
        };
      case "Entregado":
        return {
          color: "bg-slate-600",
          text: "Entregado",
          urgency: "Listo para vivir"
        };
      case "Entrega inmediata":
        return {
          color: "bg-blue-600",
          text: "Entrega inmediata",
          urgency: "¡Múdate ya!"
        };
      case "Próximo lanzamiento":
        return {
          color: "bg-purple-600",
          text: "Próximo lanzamiento",
          urgency: "Sé el primero"
        };
      default:
        return {
          color: "bg-gray-500",
          text: status,
          urgency: ""
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <article className={`card overflow-hidden group hover-lift animate-fade-in-up relative ${featured ? 'lg:col-span-2' : ''}`}>
      <Link href={`/proyectos/${id}`} className="block">
        <div className={`relative ${featured ? 'aspect-[21/9] lg:aspect-[16/7]' : 'aspect-[4/3]'} overflow-hidden`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${statusConfig.color} shadow-lg`}>
              {statusConfig.text}
            </span>
            {status === "Pre-venta" && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white animate-pulse-soft shadow-lg">
                Últimas unidades
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <button className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Urgency Message */}
          {statusConfig.urgency && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                <span className="text-xs font-semibold text-accent">{statusConfig.urgency}</span>
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className={`p-5 ${featured ? 'lg:p-8' : ''}`}>
        <div className="mb-3">
          <h3 className={`font-bold ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'} text-primary group-hover:text-accent transition-colors mb-1`}>
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-secondary text-sm font-medium">{district}</p>
          </div>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-sand rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-xs font-semibold text-primary">{bedrooms}</span>
            </div>
            <div className="text-xs text-secondary">dorm</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-xs font-semibold text-primary">{bathrooms}</span>
            </div>
            <div className="text-xs text-secondary">baño</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="text-xs font-semibold text-primary">{area}</span>
            </div>
            <div className="text-xs text-secondary">m²</div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className={`flex gap-2 ${featured ? 'lg:flex-row lg:gap-4' : ''}`}>
          <Link
            href={`/proyectos/${id}`}
            className={`flex-1 btn-primary text-center justify-center ${featured ? 'text-base py-3 lg:py-4' : 'text-sm py-2.5'}`}
          >
            Ver detalles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#contacto"
            className={`${featured ? 'px-6 py-3 lg:py-4' : 'px-3 py-2.5'} border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-300 font-medium flex items-center justify-center`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}