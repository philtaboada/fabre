"use client";
import { useMemo, useState } from "react";
import Filters from "./Filters";
import ProjectCard from "./ProjectCard";

type Project = {
  id: string;
  title: string;
  district: string;
  area: number;
  price: number;
  status: "Pre-venta" | "En construcción" | "Entregado";
  image: string;
  bedrooms: number;
  bathrooms: number;
};

const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Malecón Vista Mar",
    district: "Miraflores",
    area: 78,
    price: 185000,
    status: "Pre-venta",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: "2",
    title: "Parque Central",
    district: "San Isidro",
    area: 92,
    price: 245000,
    status: "En construcción",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: "3",
    title: "Los Fresnos",
    district: "Surco",
    area: 70,
    price: 165000,
    status: "Entregado",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: "4",
    title: "Costa Verde Premium",
    district: "Barranco",
    area: 85,
    price: 220000,
    status: "Pre-venta",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: "5",
    title: "Jardines del Sol",
    district: "La Molina",
    area: 95,
    price: 280000,
    status: "En construcción",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    id: "6",
    title: "Puente Piedra Gardens",
    district: "Puente Piedra",
    area: 65,
    price: 140000,
    status: "Entregado",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
  }
];

export default function Catalog() {
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [district, setDistrict] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<"Pre-venta" | "En construcción" | "Entregado" | "">("");

  const onFiltersChange = (f: {
    priceMax?: number;
    district?: string;
    status?: "Pre-venta" | "En construcción" | "Entregado" | "";
  }) => {
    setPriceMax(f.priceMax);
    setDistrict(f.district);
    setStatus(f.status ?? "");
  };

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      if (priceMax && p.price > priceMax) return false;
      if (district && !p.district.toLowerCase().includes(district.toLowerCase())) return false;
      if (status && p.status !== status) return false;
      return true;
    });
  }, [priceMax, district, status]);

  return (
    <section id="proyectos" className="py-16 lg:py-24 bg-white">
      <div className="container-page">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Descubre nuestros proyectos inmobiliarios en las mejores ubicaciones de Lima.
            Cada uno diseñado pensando en tu comodidad y estilo de vida.
          </p>
        </div>

        <div className="space-y-8">
          <Filters onChange={onFiltersChange} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">No se encontraron proyectos con los filtros seleccionados.</p>
              <button
                onClick={() => onFiltersChange({})}
                className="mt-4 btn-secondary"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}