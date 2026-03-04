"use client";
import { useMemo, useState } from "react";
import Filters, { FiltersValues } from "./Filters";
import ProjectCard from "./ProjectCard";
import { ALL_PROJECTS, ProjectStatus } from "../lib/projects";

export default function Catalog() {
  const [district, setDistrict] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ProjectStatus | "">("");
  const [search, setSearch] = useState<string>("");

  const onFiltersChange = (f: Partial<FiltersValues>) => {
    if (f.district !== undefined) setDistrict(f.district);
    if (f.status !== undefined) setStatus(f.status);
    if (f.search !== undefined) setSearch(f.search);
  };

  const resetFilters = () => {
    setDistrict("");
    setStatus("");
    setSearch("");
  };

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      if (district && !p.district.toLowerCase().includes(district.toLowerCase())) return false;
      if (status && p.status !== status) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [district, status, search]);

  const currentFilters: FiltersValues = {
    district,
    status,
    search
  };

  return (
    <section id="proyectos" className="py-16 lg:py-24 bg-gradient-to-b from-white to-sand">
      <div className="container-page">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
              Portafolio de Proyectos
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            Descubre nuestros proyectos inmobiliarios en las mejores ubicaciones de Lima.
            Cada uno diseñado pensando en tu comodidad y estilo de vida.
          </p>
        </div>

        <div className="space-y-10">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Filters values={currentFilters} onChange={onFiltersChange} />
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-8">
              {/* Contador de resultados */}
              <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <p className="text-secondary">
                  <span className="font-semibold text-primary">{filtered.length}</span> proyecto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </p>
                {filtered.length !== ALL_PROJECTS.length && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-accent hover:underline font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Limpiar filtros
                  </button>
                )}
              </div>

              {/* Proyecto destacado (primero) */}
              {filtered.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                      <span className="w-1 h-6 bg-accent rounded-full"></span>
                      Proyecto Destacado
                    </h3>
                  </div>
                  <ProjectCard {...filtered[0]} featured />
                </div>
              )}

              {/* Grid de proyectos restantes */}
              {filtered.length > 1 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                      <span className="w-1 h-6 bg-accent rounded-full"></span>
                      Más Proyectos
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filtered.slice(1).map((p, index) => (
                      <div
                        key={p.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <ProjectCard {...p} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">No se encontraron proyectos</h3>
                <p className="text-secondary text-lg mb-6">
                  No hay proyectos que coincidan con los filtros seleccionados.
                  Intenta ajustar tus criterios de búsqueda.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}