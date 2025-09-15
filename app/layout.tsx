import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";



const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {

  title: {
    default: "Fabre Inmobiliaria — Proyectos en Lima | Departamentos en Venta",
    template: "%s | Fabre Inmobiliaria",
  },
  description:
    "Proyectos inmobiliarios en Lima: pre-venta, en construcción y entregados. Viviendas de calidad en Miraflores, San Isidro, Surco y más distritos. Cotiza tu departamento ideal.",
  keywords: [
    "departamentos lima",
    "proyectos inmobiliarios",
    "casas venta lima",
    "pre-venta departamentos",
    "viviendas miraflores",
    "inmobiliaria lima",
    "compra casa lima"
  ],
  authors: [{ name: "Fabre Inmobiliaria" }],
  creator: "Fabre Inmobiliaria",
  publisher: "Fabre Inmobiliaria",
  metadataBase: new URL("https://www.fabre.pe"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fabre Inmobiliaria — Proyectos en Lima",
    description:
      "Descubre nuestros proyectos inmobiliarios en las mejores ubicaciones de Lima. Más de 15 años de experiencia y +1,200 familias satisfechas.",
    url: "https://www.fabre.pe",
    siteName: "Fabre Inmobiliaria",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fabre Inmobiliaria - Proyectos en Lima",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabre Inmobiliaria — Proyectos en Lima",
    description: "Proyectos inmobiliarios en Lima con enfoque en calidad y confianza.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B6B53",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#017956" />
        <meta name="msapplication-TileColor" content="#017956" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fabre" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${kanit.variable} min-h-screen bg-sand text-neutral-900 antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}