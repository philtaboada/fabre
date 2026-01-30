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
    id: "wabi-sabi",
    title: "Residencial Wabi Sabi",
    district: "San Carlos",
    area: 75,
    price: 250000,
    status: "Entregado",
    image: "/building/build1.png",
    bedrooms: 3,
    bathrooms: 2,
    description: "Diseño minimalista y funcional en el corazón de San Carlos.",
    about: "Wabi Sabi es un proyecto entregado que destaca por su diseño arquitectónico moderno y su integración con el entorno urbano.",
    commonAreas: ["Lobby", "Gimnasio", "Terraza"],
    gallery: ["/building/build1.png"],
    location: {
      address: "Calle Edmundo Mezger 248, San Carlos",
      coordinates: { lat: -12.1121, lng: -77.0152 },
      nearbyPlaces: []
    },
    features: [
      { name: "Seguridad 24/7", icon: "🔒" }
    ],
    deliveryDate: "Entregado",
    floors: 10,
    units: 30
  },
  {
    id: "brindizi",
    title: "Edificio Brindizi",
    district: "San Carlos",
    area: 78,
    price: 285000,
    status: "En construcción",
    image: "/building/build1-1.png",
    bedrooms: 2,
    bathrooms: 2,
    description: "Departamentos modernos en el corazón de San Carlos. Diseño contemporáneo y acabados de lujo.",
    about: "Brindizi es un proyecto residencial exclusivo ubicado en una de las mejores zonas de San Carlos. Cada departamento ha sido diseñado pensando en el confort y la funcionalidad.",
    commonAreas: ["Zona BBQ", "Gimnasio", "Sala Social"],
    gallery: ["/building/build1-1.png", "/building/build1-2.png"],
    location: {
      address: "Calle Lorenzo de Brindizi 166, San Carlos",
      coordinates: { lat: -12.0560, lng: -75.2150 },
      nearbyPlaces: []
    },
    features: [
      { name: "Seguridad smart", icon: "📱" },
      { name: "Ascensor", icon: "🛗" }
    ],
    deliveryDate: "Diciembre 2025",
    floors: 7,
    units: 12
  },
  {
    id: "mora",
    title: "Mora",
    district: "San Carlos",
    area: 85,
    price: 320000,
    status: "Pre-venta",
    image: "/building/build1-2.png",
    bedrooms: 3,
    bathrooms: 2,
    description: "Próximo lanzamiento en una de las zonas más conectadas de la ciudad.",
    about: "Mora es nuestro próximo gran proyecto, diseñado para quienes buscan conectividad y modernidad.",
    commonAreas: ["Piscina", "Coworking", "Sky Bar"],
    gallery: ["/building/build1-2.png"],
    location: {
      address: "Av. Aramburú 638, San Carlos",
      coordinates: { lat: -12.1023, lng: -77.0234 },
      nearbyPlaces: []
    },
    features: [
      { name: "Eco-friendly", icon: "🌿" }
    ],
    deliveryDate: "2026",
    floors: 15,
    units: 60
  }
];

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find(project => project.id === id);
}

export function getOtherProjects(currentId: string): Project[] {
  return ALL_PROJECTS.filter(project => project.id !== currentId).slice(0, 3);
}


