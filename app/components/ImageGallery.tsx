"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Plus } from "lucide-react";

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const displayImages = images.slice(0, 5);
    const remainingImagesCount = images.length - 5;

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-primary mb-6">Galería de Imágenes</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
                {/* Main Large Image */}
                <div
                    className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => {
                        setIndex(0);
                        setOpen(true);
                    }}
                >
                    <Image
                        src={images[0]}
                        alt="Vista Principal"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Secondary Images */}
                {displayImages.slice(1).map((img, i) => (
                    <div
                        key={i + 1}
                        className="relative rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => {
                            setIndex(i + 1);
                            setOpen(true);
                        }}
                    >
                        <Image
                            src={img}
                            alt={`Vista ${i + 2}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                        {/* Overlay for the last visible image if there are more */}
                        {i === 3 && remainingImagesCount > 0 && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm group-hover:bg-black/70 transition-colors">
                                <Plus size={32} strokeWidth={3} className="mb-2" />
                                <span className="font-bold text-lg">+{remainingImagesCount}</span>
                                <span className="text-xs font-medium uppercase tracking-wider">Ver más</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map((src) => ({ src }))}
                on={{
                    view: ({ index: currentIndex }) => setIndex(currentIndex),
                }}
                animation={{ fade: 300, swipe: 500 }}
                controller={{ closeOnBackdropClick: true }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
                }}
            />
        </div>
    );
}
