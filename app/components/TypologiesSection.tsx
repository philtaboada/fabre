"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { buildWhatsAppHref } from "../lib/utm";

type Typology = {
  id: string;
  name: string;
  image: string;
  area?: number;
  available: boolean;
};

export default function TypologiesSection({
  typologies,
  projectTitle,
  whatsappPhone,
}: {
  typologies: Typology[];
  projectTitle: string;
  whatsappPhone: string;
}) {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  const tipo = typologies[selected];

  return (
    <div className="space-y-6 py-4">
      <h3 className="text-2xl font-bold text-primary">Tipologías</h3>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {typologies.map((item, i) => (
            <div key={item.id} className="min-w-0 flex-[0_0_100%] px-0.5">
              <div className="bg-white rounded-[1.75rem] border border-neutral-100 shadow-soft overflow-hidden">
                <div className="p-5 pb-3 flex justify-between items-center gap-3">
                  <h4 className="text-xl font-bold text-primary">{item.name}</h4>
                  <span
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                      item.available ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {item.available ? "Disponible" : "Vendido"}
                  </span>
                </div>

                <button
                  type="button"
                  className="relative w-full aspect-[16/11] sm:aspect-[4/3] bg-neutral-50"
                  onClick={() => {
                    setLightboxIndex(i);
                    setOpen(true);
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`Plano ${item.name}`}
                    fill
                    className="object-contain p-3 sm:p-6"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority={i === 0}
                  />
                </button>

                <div className="p-5 pt-3 flex items-center justify-between">
                  {item.area ? (
                    <p className="flex items-center gap-2 text-secondary text-sm font-medium">
                      <Maximize2 size={16} className="text-accent" />
                      {item.area} m²
                    </p>
                  ) : (
                    <span className="text-sm text-secondary/70">Plano {item.name}</span>
                  )}
                  {item.available ? (
                    <a
                      href={buildWhatsAppHref(
                        whatsappPhone,
                        `Hola, estoy interesado en ${item.name} de ${projectTitle}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-neutral-100 hover:bg-accent hover:text-white text-primary rounded-xl text-sm font-medium transition-all"
                    >
                      Consultar
                    </a>
                  ) : (
                    <span className="text-sm text-secondary">No disponible</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-primary hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center justify-center shadow-sm"
            aria-label="Tipología anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex items-center gap-2">
            {typologies.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  selected === i ? "w-8 bg-accent" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Ver ${item.name}`}
                aria-current={selected === i ? true : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="w-11 h-11 rounded-full border border-neutral-200 bg-white text-primary hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center justify-center shadow-sm"
            aria-label="Tipología siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </div>
        {tipo && (
          <p className="text-sm text-secondary">
            {selected + 1} / {typologies.length} · {tipo.name}
          </p>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={typologies.map((t) => ({ src: t.image, alt: t.name }))}
        on={{ view: ({ index: currentIndex }) => setLightboxIndex(currentIndex) }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
      />
    </div>
  );
}
