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
    title: "Brindizi",
    district: "San Carlos",
    area: 78,
    price: 185000,
    status: "Pre-venta",
    image: "/building/build1.png",
    bedrooms: 2,
    bathrooms: 2,
    description: "Departamentos modernos en el corazón de San Carlos. Diseño contemporáneo y acabados de lujo.",
    about: "Brindizi es un proyecto residencial exclusivo ubicado en una de las mejores zonas de San Carlos. Cada departamento ha sido diseñado pensando en el confort y la funcionalidad, con amplios espacios y acabados de primera calidad. El proyecto cuenta con tecnología de punta y sistemas de seguridad avanzados para garantizar tu tranquilidad y la de tu familia.",
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
  }
];

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find(project => project.id === id);
}

export function getOtherProjects(currentId: string): Project[] {
  return ALL_PROJECTS.filter(project => project.id !== currentId).slice(0, 3);
}


