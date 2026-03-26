"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { withUtm } from "../lib/utm";

const blogPosts = [
  {
    id: 1,
    title: "5 Consejos para comprar tu primer departamento en Lima",
    excerpt: "Descubre todo lo que necesitas saber antes de dar el gran paso hacia tu nuevo hogar.",
    category: "Guía de Compra",
    date: "15 Oct, 2023",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Tendencias de diseño de interiores para el 2024",
    excerpt: "Optimiza tus espacios con las últimas tendencias de arquitectura y decoración moderna.",
    category: "Arquitectura",
    date: "10 Oct, 2023",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Por qué invertir en preventa es la mejor decisión",
    excerpt: "Analizamos los beneficios financieros de adquirir un inmueble en las primeras etapas.",
    category: "Inversiones",
    date: "05 Oct, 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460472178825-e51c06239587?auto=format&fit=crop&q=80&w=800"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-3 block">Conocimiento</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-primary">
              Blog Inmobiliario
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href={withUtm("#blog")}
              className="group inline-flex items-center gap-2 text-accent font-bold hover:text-accent-dark transition-colors text-lg"
            >
              Ver todos los artículos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-primary px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-medium text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-accent" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-secondary line-clamp-2 text-sm lg:text-base">
                  {post.excerpt}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-3 transition-all">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
