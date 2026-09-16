export type ProjectStatus = "Pre-venta" | "En construcción" | "Entregado" | "Entrega inmediata" | "Pre venta" | "En Acabados";

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
    mapsUrl?: string;
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
  brochureUrl?: string;
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
    id: "lumen-park",
    title: "Edificio Lumen Park",
    district: "Huancayo",
    area: 53,
    price: 0,
    status: "En Acabados",
    image: "/lumen/Espectativa.webp",
    bedrooms: 2,
    bathrooms: 2,
    description: "Vive frente al parque, cerca de todo lo que necesitas.",
    about: "Lumen Park es un proyecto residencial ubicado estratégicamente frente a un parque en Huancayo, pensado para quienes buscan tranquilidad, comodidad y una excelente conexión con la ciudad. Su ubicación permite estar a pocos minutos de colegios, universidades, tiendas y servicios esenciales, convirtiéndolo en una excelente alternativa tanto para vivir como para invertir. El proyecto ofrece departamentos y dúplex con distribuciones funcionales, diseño exclusivo y acabados de primera, creando espacios modernos y confortables para disfrutar en familia. Equipado con muebles altos y bajos, lavadero multifuncional, cerradura inteligente y vanitorio.",
    commonAreas: [],
    gallery: ["/lumen/Espectativa.webp"],
    location: {
      address: "Paseo Las Retamas Mz. B Lote 11, Huancayo",
      mapsUrl: "https://maps.app.goo.gl/PFwAtLgpWFwJCHNU7",
      coordinates: { lat: -12.038552, lng: -75.189278 },
      nearbyPlaces: [
        { name: "Innova Schools", distance: "Cerca", icon: "school" },
        { name: "UPLA", distance: "Cerca", icon: "school" },
        { name: "Parque", distance: "Frente al proyecto", icon: "park" }
      ]
    },
    features: [
      { name: "Edificio Sismorresistente", icon: "building" },
      { name: "Cámaras de seguridad", icon: "camera" },
      { name: "Cerco eléctrico", icon: "zap" },
      { name: "Luces con sensor", icon: "lightbulb" },
      { name: "Luces LED en fachada", icon: "sun" },
      { name: "Ascensor", icon: "elevator" }
    ],
    deliveryDate: "Marzo 2027",
    floors: 7,
    units: 9,
    brochureUrl: "/lumen/docs/brochure-lumen-park.pdf"
  },
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
      address: "Lorenzo de Brindisi N°166, San Carlos",
      mapsUrl: "https://maps.app.goo.gl/tbTAdPSKpNDmUJ8z6",
      coordinates: { lat: -12.0462075, lng: -75.1997707 },
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


