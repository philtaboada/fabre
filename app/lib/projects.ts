export type ProjectStatus = "Pre-venta" | "En construcción" | "Entregado" | "Entrega inmediata" | "Pre venta";

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
    status: "Entrega inmediata",
    image: "/wasi-wavi/wasi_wabi.webp",
    bedrooms: 3,
    bathrooms: 2,
    description: "Diseño minimalista y funcional en el corazón de San Carlos.",
    about: "Wabi Sabi es un proyecto entregado que destaca por su diseño arquitectónico moderno y su integración con el entorno urbano.",
    commonAreas: ["Lobby", "Gimnasio", "Terraza"],
    gallery: ["/wasi-wavi/wasi_wabi.webp"],
    location: {
      address: "Calle Edmundo Mezger 164, San Carlos",
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
    status: "Entrega inmediata",
    image: "/Brindizi/brindizi.webp",
    bedrooms: 2,
    bathrooms: 2,
    description: "Departamentos modernos en el corazón de San Carlos. Diseño contemporáneo y acabados de lujo.",
    about: "Brindizi es un proyecto residencial exclusivo ubicado en una de las mejores zonas de San Carlos. Cada departamento ha sido diseñado pensando en el confort y la funcionalidad.",
    commonAreas: [
      "Estacionamiento",
      "Gimnasio Equipado",
      "Terraza Social",
      "Zona Pet Friendly",
      "Lavandería",
      "Zona de Tendales"
    ],
    gallery: [
      "/Brindizi/brindizi.webp",
      "/Brindizi/comun_areas/DSC06466.jpg",
      "/Brindizi/comun_areas/DSC06467.jpg",
      "/Brindizi/comun_areas/DSC06475.jpg",
      "/Brindizi/comun_areas/DSC06476.jpg",
      "/Brindizi/comun_areas/DSC06477.jpg",
      "/Brindizi/comun_areas/DSC06482.jpg",
      "/Brindizi/comun_areas/DSC06483.jpg",
      "/Brindizi/comun_areas/DSC06485.jpg",
      "/Brindizi/comun_areas/DSC06487.jpg",
      "/Brindizi/comun_areas/DSC06488.jpg",
      "/Brindizi/comun_areas/DSC06490.jpg",
      "/Brindizi/comun_areas/DSC06496.jpg",
      "/Brindizi/comun_areas/DSC07571.jpg",
      "/Brindizi/comun_areas/DSC07573.jpg",
      "/Brindizi/comun_areas/DSC07574.jpg",
      "/Brindizi/comun_areas/DSC07575.jpg"
    ],
    location: {
      address: "Calle Lorenzo de Brindizi 166, San Carlos",
      coordinates: { lat: -12.0560, lng: -75.2150 },
      nearbyPlaces: []
    },
    features: [],
    deliveryDate: "Diciembre 2025",
    floors: 7,
    units: 12
  }
];

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find(project => project.id === id);
}

export function getOtherProjects(currentId: string): Project[] {
  return ALL_PROJECTS.filter(project => project.id !== currentId).slice(0, 3);
}


