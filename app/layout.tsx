import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";



const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

const localBusinessJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Fabre Inmobiliaria",
  description:
    "Inmobiliaria en Huancayo, Junín. Proyectos y departamentos en venta. Oficina en Jr. Libertad 129, Huancayo.",
  url: "https://www.fabre.pe",
  telephone: "+51-964-247545",
  email: "gerencia@inmobiliariafabre.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jr. Libertad 129",
    addressLocality: "Huancayo",
    addressRegion: "Junín",
    addressCountry: "PE",
  },
  areaServed: {
    "@type": "City",
    name: "Huancayo",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Junín",
    },
  },
};

export const metadata: Metadata = {

  title: {
    default: "Fabre Inmobiliaria — Inmobiliaria en Huancayo | Departamentos en venta",
    template: "%s | Fabre Inmobiliaria",
  },
  description:
    "Inmobiliaria en Huancayo (Junín): proyectos inmobiliarios, departamentos en venta y preventa. Visítanos en Jr. Libertad 129, Huancayo. Más de 15 años construyendo confianza.",
  keywords: [
    "inmobiliaria huancayo",
    "departamentos huancayo",
    "proyectos inmobiliarios huancayo",
    "casas venta huancayo",
    "inmobiliaria junín",
    "preventa departamentos huancayo",
    "compra departamento huancayo",
    "Fabre Inmobiliaria Huancayo",
  ],
  authors: [{ name: "Fabre Inmobiliaria" }],
  creator: "Fabre Inmobiliaria",
  publisher: "Fabre Inmobiliaria",
  metadataBase: new URL("https://www.fabre.pe"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fabre Inmobiliaria — Inmobiliaria en Huancayo",
    description:
      "Proyectos y departamentos en Huancayo, Junín. Calidad, confianza y asesoría cercana. Oficina en Jr. Libertad 129, Huancayo.",
    url: "https://www.fabre.pe",
    siteName: "Fabre Inmobiliaria",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fabre Inmobiliaria — proyectos en Huancayo",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabre Inmobiliaria — Inmobiliaria en Huancayo",
    description:
      "Departamentos y proyectos inmobiliarios en Huancayo. Calidad y confianza en Junín.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}