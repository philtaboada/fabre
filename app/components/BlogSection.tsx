import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Guía completa para comprar tu primer departamento en Lima",
    excerpt: "Descubre los pasos esenciales, consejos financieros y aspectos legales que debes considerar antes de invertir en tu primer hogar.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    category: "Guías",
    readTime: "8 min",
    date: "15 Sep 2025",
    author: "María González"
  },
  {
    id: 2,
    title: "¿Cuánto dura el proceso de compra de un departamento?",
    excerpt: "Te explicamos paso a paso cuánto tiempo toma cada etapa del proceso de compra inmobiliaria en Perú.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    category: "Proceso",
    readTime: "6 min",
    date: "10 Sep 2025",
    author: "Carlos Mendoza"
  },
  {
    id: 3,
    title: "Tendencias inmobiliarias en Lima para 2025",
    excerpt: "Descubre las nuevas tendencias en diseño, ubicación y tecnología que están transformando el mercado inmobiliario.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    category: "Tendencias",
    readTime: "10 min",
    date: "5 Sep 2025",
    author: "Ana Rivera"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 lg:py-24 bg-white">
      <div className="container-page">
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Blog Inmobiliario
            </h2>
            <p className="text-secondary text-lg">
              Información útil y consejos para tu próximo proyecto inmobiliario
            </p>
          </div>
          <Link
            href="#blog"
            className="hidden md:inline-flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors"
          >
            Ver todos los artículos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="card overflow-hidden group hover-lift animate-slide-in-bottom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-secondary mb-3">
                  <span>{post.date}</span>
                  <span>{post.readTime} de lectura</span>
                </div>

                <h3 className="font-semibold text-lg text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-secondary text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent-light rounded-full flex items-center justify-center">
                      <span className="text-accent font-medium text-sm">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-secondary">{post.author}</span>
                  </div>

                  <Link
                    href="#blog"
                    className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors text-sm"
                  >
                    Leer más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center md:hidden">
          <Link href="#blog" className="btn-secondary">
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}
