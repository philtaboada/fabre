export type ProjectStatus = "Pre-venta" | "En construcción" | "Entregado";

export type Project = {
  id: string;
  title: string;
  district: string;
  area: number;
  price: number;
  status: ProjectStatus;
  image: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  about: string;
  commonAreas: string[];
  gallery: string[];
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearbyPlaces: {
      name: string;
      distance: string;
      icon: string;
    }[];
  };
  features: {
    name: string;
    icon: string;
  }[];
  deliveryDate?: string;
  floors?: number;
  units?: number;
};

export const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Malecón Vista Mar",
    district: "Miraflores",
    area: 78,
    price: 185000,
    status: "Pre-venta",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    description: "Departamentos modernos con vista al mar en el corazón de Miraflores. Diseño contemporáneo y acabados de lujo.",
    about: "Malecón Vista Mar es un proyecto residencial exclusivo ubicado en una de las mejores zonas de Miraflores. Cada departamento ha sido diseñado pensando en el confort y la funcionalidad, con amplios espacios y acabados de primera calidad. El proyecto cuenta con tecnología de punta y sistemas de seguridad avanzados para garantizar tu tranquilidad y la de tu familia.",
    commonAreas: [
      "Piscina temperada",
      "Gimnasio equipado",
      "Sala de eventos",
      "Terraza con vista al mar",
      "Área de juegos infantiles",
      "Salón de usos múltiples",
      "Estacionamiento subterráneo",
      "Zona de BBQ",
      "Spa y sauna",
      "Business center"
    ],
    gallery: [
      "/building/build1.png",
      "/building/build1-1.png",
      "/building/build1-2.png",
      "/building/build1-3.png",
      "/building/build1-4.jpg",
      "/building/build1-5.jpg"
    ],
    location: {
      address: "Av. Malecón de la Reserva 123, Miraflores",
      coordinates: {
        lat: -12.1194,
        lng: -77.0303
      },
      nearbyPlaces: [
        { name: "Parque Kennedy", distance: "200 m", icon: "park" },
        { name: "Larcomar", distance: "500 m", icon: "shopping" },
        { name: "Playa Waikiki", distance: "300 m", icon: "beach" },
        { name: "Hospital Clínica Ricardo Palma", distance: "800 m", icon: "hospital" },
        { name: "Colegio Markham", distance: "1.2 km", icon: "school" }
      ]
    },
    features: [
      { name: "Vista al mar", icon: "🌊" },
      { name: "Acabados de lujo", icon: "✨" },
      { name: "Seguridad 24/7", icon: "🔒" },
      { name: "Ascensores", icon: "🛗" },
      { name: "Cocina integral", icon: "🍳" },
      { name: "Closets empotrados", icon: "👔" }
    ],
    deliveryDate: "Diciembre 2025",
    floors: 15,
    units: 120
  },
  {
    id: "2",
    title: "Parque Central",
    district: "San Isidro",
    area: 92,
    price: 245000,
    status: "En construcción",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    description: "Residencia de lujo en el distrito financiero de Lima. Perfecto equilibrio entre elegancia y funcionalidad.",
    about: "Parque Central representa lo mejor de la vida urbana en San Isidro. Este proyecto combina diseño arquitectónico de vanguardia con espacios verdes, creando un ambiente único donde la naturaleza y la ciudad se encuentran. Los departamentos cuentan con amplios balcones, iluminación natural en todos los ambientes y sistemas inteligentes de domótica.",
    commonAreas: [
      "Piscina y jacuzzi",
      "Gimnasio completo",
      "Sala de cine",
      "Terraza panorámica",
      "Parque infantil",
      "Coworking space",
      "Estacionamiento techado",
      "Zona de mascotas",
      "Lobby de lujo",
      "Concierge 24/7"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop"
    ],
    location: {
      address: "Av. Javier Prado Este 4200, San Isidro",
      coordinates: {
        lat: -12.0931,
        lng: -77.0265
      },
      nearbyPlaces: [
        { name: "Parque El Olivar", distance: "300 m", icon: "park" },
        { name: "Centro Comercial Real Plaza", distance: "600 m", icon: "shopping" },
        { name: "Hospital Nacional Edgardo Rebagliati", distance: "1 km", icon: "hospital" },
        { name: "Universidad del Pacífico", distance: "800 m", icon: "school" },
        { name: "Estación de Metropolitano", distance: "400 m", icon: "transport" }
      ]
    },
    features: [
      { name: "Domótica", icon: "🏠" },
      { name: "Vista panorámica", icon: "🏙️" },
      { name: "Acabados premium", icon: "💎" },
      { name: "Seguridad avanzada", icon: "🛡️" },
      { name: "Cocina italiana", icon: "🍝" },
      { name: "Pisos flotantes", icon: "🪵" }
    ],
    deliveryDate: "Marzo 2026",
    floors: 20,
    units: 180
  },
  {
    id: "3",
    title: "Los Fresnos",
    district: "Surco",
    area: 70,
    price: 165000,
    status: "Entregado",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
    description: "Viviendas acogedoras en una zona residencial tranquila. Ideal para familias jóvenes y profesionales.",
    about: "Los Fresnos es un proyecto que prioriza la calidad de vida familiar. Ubicado en una zona residencial consolidada de Surco, ofrece tranquilidad y seguridad. Los departamentos están diseñados para maximizar el espacio útil, con distribución inteligente que permite múltiples usos. El proyecto ya está entregado y habitado, con excelente reputación entre sus residentes.",
    commonAreas: [
      "Piscina",
      "Área de juegos",
      "Salón comunal",
      "Estacionamiento",
      "Zona verde",
      "Cancha deportiva",
      "Gimnasio básico",
      "Área de lavandería"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
    ],
    location: {
      address: "Av. Los Fresnos 456, Surco",
      coordinates: {
        lat: -12.1355,
        lng: -76.9904
      },
      nearbyPlaces: [
        { name: "Parque de la Amistad", distance: "500 m", icon: "park" },
        { name: "Megaplaza", distance: "1.5 km", icon: "shopping" },
        { name: "Hospital Nacional Arzobispo Loayza", distance: "2 km", icon: "hospital" },
        { name: "Colegio San Silvestre", distance: "800 m", icon: "school" },
        { name: "Metro de Lima", distance: "600 m", icon: "transport" }
      ]
    },
    features: [
      { name: "Listo para vivir", icon: "✅" },
      { name: "Zona residencial", icon: "🏘️" },
      { name: "Buen acabado", icon: "⭐" },
      { name: "Seguridad", icon: "🔐" },
      { name: "Cocina completa", icon: "🍴" },
      { name: "Áreas verdes", icon: "🌳" }
    ],
    floors: 8,
    units: 64
  }
];

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find(project => project.id === id);
}

export function getOtherProjects(currentId: string): Project[] {
  return ALL_PROJECTS.filter(project => project.id !== currentId).slice(0, 3);
}


