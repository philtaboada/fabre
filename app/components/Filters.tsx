"use client";
import { ProjectStatus } from "../lib/projects";

export type FiltersValues = {
  district?: string;
  status?: ProjectStatus | "";
  search?: string;
};

export default function Filters({
  values,
  onChange
}: {
  values: FiltersValues;
  onChange: (f: Partial<FiltersValues>) => void;
}) {
  return (
    <div className="card p-3 md:p-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-end bg-white/50 backdrop-blur-sm shadow-xl border-white/20">
      <div className="flex-[2]">
        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 block">
          Buscar Proyecto
        </label>
        <input
          type="text"
          placeholder="Nombre del edificio..."
          value={values.search || ""}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>

      <div className="flex-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 block">
          Ubicación
        </label>
        <input
          type="text"
          placeholder="Ej. San Carlos"
          value={values.district || ""}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          onChange={(e) => onChange({ district: e.target.value })}
        />
      </div>

      <div className="flex-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 block">
          Estado
        </label>
        <div className="relative">
          <select
            value={values.status || ""}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all appearance-none pr-10"
            onChange={(e) => onChange({ status: e.target.value as ProjectStatus | "" })}
          >
            <option value="">Todos los estados</option>
            <option value="Pre-venta">Pre-venta</option>
            <option value="En construcción">En construcción</option>
            <option value="Entregado">Entregado</option>
            <option value="Entrega inmediata">Entregado</option>
            <option value="Pre venta">Pre venta</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <button
        className="lg:w-auto w-full rounded-xl bg-accent text-white px-8 py-3.5 font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all active:scale-95"
      >
        BUSCAR
      </button>
    </div>
  );
}


