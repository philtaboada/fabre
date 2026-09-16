"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Plus } from "lucide-react";

const VirtualTour = dynamic(() => import("./VirtualTour"), {
  ssr: false,
  loading: () => (
    <div className="h-[min(70vh,560px)] min-h-[380px] rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-white/70 text-sm">
      Cargando tour virtual...
    </div>
  ),
});

type SpaceImage = { src: string; alt: string; fit?: "cover" | "contain" };

type SpaceGallery = {
  id: string;
  title: string;
  subtitle?: string;
  kind?: "gallery" | "tour";
  images: SpaceImage[];
};

export default function ProjectSpaces({
  galleries,
  disclaimer,
}: {
  galleries: SpaceGallery[];
  disclaimer?: string;
}) {
  const [activeId, setActiveId] = useState(galleries[0]?.id);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const active = galleries.find((g) => g.id === activeId) ?? galleries[0];
  if (!active) return null;

  const images = active.images;
  const preview = images.slice(0, 5);
  const extra = images.length - 5;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-primary mb-2">Nuestros Espacios</h3>
        <p className="text-secondary text-sm">Áreas comunes, tour virtual y departamento piloto.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {galleries.map((gallery, i) => (
          <button
            key={gallery.id}
            type="button"
            onClick={() => {
              setActiveId(gallery.id);
              setOpen(false);
              setIndex(0);
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeId === gallery.id
                ? "bg-primary text-white shadow-md"
                : "bg-white text-primary border border-neutral-200 hover:border-accent"
            }`}
          >
            {i + 1}. {gallery.title}
          </button>
        ))}
      </div>

      {active.kind !== "tour" && active.subtitle && (
        <p className="text-accent font-bold text-sm uppercase tracking-wide">{active.subtitle}</p>
      )}

      {active.kind === "tour" ? (
        <VirtualTour subtitle={active.subtitle} />
      ) : (
      <div className={`grid gap-4 ${images.length <= 3 ? "grid-cols-1 md:grid-cols-3 h-auto md:h-[320px]" : "grid-cols-2 md:grid-cols-4 h-[400px] md:h-[500px]"}`}>
        {preview.map((img, i) => (
          <div
            key={img.src}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
              images.length > 3 && i === 0 ? "col-span-2 row-span-2" : "min-h-[180px]"
            }`}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`${img.fit === "contain" ? "object-contain bg-neutral-100" : "object-cover"} transition-transform duration-700 group-hover:scale-105`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
            <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-md">
              {img.alt}
            </span>
            {i === 4 && extra > 0 && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                <Plus size={32} strokeWidth={3} className="mb-2" />
                <span className="font-bold text-lg">+{extra}</span>
                <span className="text-xs uppercase tracking-wider">Ver más</span>
              </div>
            )}
          </div>
        ))}
      </div>
      )}

      {disclaimer && (
        <p className="text-xs text-secondary/80 italic leading-relaxed">{disclaimer}</p>
      )}

      {active.kind !== "tour" && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
          on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
          animation={{ fade: 300, swipe: 500 }}
          controller={{ closeOnBackdropClick: true }}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
        />
      )}
    </div>
  );
}
