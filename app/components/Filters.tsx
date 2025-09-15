"use client";
import { useState } from "react";

type Filters = {
  priceMax?: number;
  district?: string;
  status?: "Pre-venta" | "En construcción" | "Entregado" | "";
};

export default function Filters({ onChange }: { onChange: (f: Filters) => void }) {
  const [filters, setFilters] = useState<Filters>({ status: "" });

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onChange(next);
  };

  return (
    <div className="card p-3 md:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
      <div className="flex-1">
        <label className="text-xs text-neutral-600">Precio máx. (USD)</label>
        <input
          type="number"
          inputMode="numeric"
          placeholder="200000"
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/30"
          onChange={(e) => update({ priceMax: Number(e.target.value) || undefined })}
        />
      </div>

      <div className="flex-1">
        <label className="text-xs text-neutral-600">Distrito</label>
        <input
          type="text"
          placeholder="Miraflores"
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/30"
          onChange={(e) => update({ district: e.target.value || undefined })}
        />
      </div>

      <div className="flex-1">
        <label className="text-xs text-neutral-600">Estado</label>
        <select
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/30"
          onChange={(e) => update({ status: e.target.value as Filters["status"] })}
        >
          <option value="">Todos</option>
          <option>Pre-venta</option>
          <option>En construcción</option>
          <option>Entregado</option>
        </select>
      </div>

      <button
        className="rounded-lg bg-accent text-white px-4 py-2 shadow hover:opacity-95"
        onClick={() => onChange(filters)}
      >
        Filtrar
      </button>
    </div>
  );
}


