import { ProjectStatus } from "./projects";

export type Apartment = {
    id: string;
    floor: number;
    /** Tipo de departamento para mostrar (ej: Tipo 1, Tipo 2). Si no existe, se usa "Piso {floor}". */
    type?: number;
    area: number;
    price: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    features: string[];
    images: string[];
    available: boolean;
    study?: number;
    terrace?: number;
};

export type Building = {
    id: string;
    name: string;
    address: string;
    district: string;
    description: string;
    about: string;
    status: ProjectStatus;
    deliveryDate?: string;
    floors: number;
    totalUnits: number;
    commonAreas: string[];
    buildingFeatures: {
        name: string;
        iconName: string; // Lucide icon name
    }[];
    location: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        nearbyPlaces: {
            name: string;
            distance: string;
            iconName: string; // Lucide icon name
        }[];
    };
    gallery: string[];
    apartments: Apartment[];
};

// Edificio Wabi Sabi
export const WABI_SABI_BUILDING: Building = {
    id: "wabi-sabi",
    name: "Residencial Wabi Sabi",
    address: "Calle Edmundo Mezger 248",
    district: "San Carlos",
    description: "Diseño minimalista y funcional en el corazón de San Carlos.",
    about: "Wabi Sabi es un proyecto entregado que destaca por su diseño arquitectónico moderno y su integración con el entorno urbano.",
    status: "Entregado",
    floors: 10,
    totalUnits: 30,
    commonAreas: ["Lobby", "Gimnasio", "Terraza"],
    buildingFeatures: [{ name: "Seguridad 24/7", iconName: "Shield" }],
    location: {
        address: "Calle Edmundo Mezger 248, San Carlos",
        coordinates: { lat: -12.1121, lng: -77.0152 },
        nearbyPlaces: []
    },
    gallery: ["/wasi-wavi/wasi_wabi.webp"],
    apartments: []
};

// Edificio Brindizi
export const BRINDIZI_BUILDING: Building = {
    id: "brindizi",
    name: "Edificio Brindizi",
    address: "Calle Lorenzo de Brindizi 166, San Carlos",
    district: "San Carlos, Huancayo",
    description: "Departamentos exclusivos en ubicación estratégica en San Carlos, cerca de la Universidad Continental y el Parque de la Identidad Wanka.",
    about: "El Edificio Brindizi ofrece una ubicación privilegiada a solo 3 cuadras de la Universidad Continental, cerca de la UPLA, Universidad Roosevelt, clínicas y centros comerciales como MAKRO. Destaca por su tecnología de seguridad avanzada con cerraduras inteligentes (huella, clave, tarjeta) y servicios modernos incluidos.",
    status: "Entrega inmediata",
    deliveryDate: "2025",
    floors: 7,
    totalUnits: 12,
    commonAreas: [
        "Estacionamiento",
        "Zonas de Parrillas",
        "SSHH",
        "Zona de Tendales",
        "Lavandería",
        "Zona Pet Friendly",
        "Gimnasio Equipado",
        "Terraza Social & BBQ"
    ],
    buildingFeatures: [
        { name: "Seguridad Smart", iconName: "ShieldCheck" },
        { name: "Cerraduras Smart", iconName: "Lock" },
        { name: "Cámaras de Seguridad", iconName: "Camera" },
        { name: "Cerco Eléctrico", iconName: "Zap" },
        { name: "Ascensor", iconName: "ArrowUpCircle" },
        { name: "Ubicación Estratégica", iconName: "MapPin" },
        { name: "Edificio Sismorresistente", iconName: "Building2" },
        { name: "Luz LED en Fachada", iconName: "Sun" },
        { name: "Intercomunicador", iconName: "Phone" },
        { name: "Lavadero Multifuncional", iconName: "Droplets" }
    ],
    location: {
        address: "Calle Lorenzo de Brindizi 166, San Carlos",
        coordinates: {
            lat: -12.0560,
            lng: -75.2150
        },
        nearbyPlaces: [
            { name: "Univ. Continental", distance: "3 cuadras", iconName: "GraduationCap" },
            { name: "Parque Identidad Wanka", distance: "Cerca", iconName: "Trees" },
            { name: "UPLA", distance: "Cerca", iconName: "School" },
            { name: "MAKRO", distance: "Cerca", iconName: "ShoppingCart" }
        ]
    },
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
    apartments: [
        {
            id: "brindizi-tipo-1",
            floor: 5,
            type: 1,
            area: 77.84,
            price: 285000,
            bedrooms: 3,
            bathrooms: 2,
            description: "Departamento exclusivo en 5.º piso con vista a la calle, excelente distribución y abundante iluminación natural. Acabados de primera que garantizan confort y funcionalidad",
            features: [
                "Vista a la calle",
                "3 DORMITORIOS",
                "2 Baños",
                "Iluminación LED",
                "Cocina americana",
                "Lavadero independiente"
            ],
            images: [
                "/dep-2/DSC05376-HDR.webp",
                "/dep-2/DSC05377-HDR.webp"
            ],
            available: false
        },
        {
            id: "brindizi-tipo-2",
            floor: 6,
            type: 2,
            area: 77.84,
            price: 290000,
            bedrooms: 2,
            bathrooms: 2,
            study: 1,
            terrace: 1,
            description: "Elegante departamento en 6.º piso con impresionante vista a la calle, espacios optimizados y seguridad smart para una vida moderna y segura.",
            features: [
                "Vista a la calle",
                "2 Dormitorios",
                "2 Baños",
                "TERRAZA",
                "Iluminación natural",
                "1 Estudio",
                "Cocina americana",
                "Termas Sole instaladas"
            ],
            images: [
                "/dep-2/DSC05430-HDR.webp",
                "/dep-2/DSC05438-HDR.webp"
            ],
            available: false
        }
    ]
};

// Edificio Lumen Park
export const LUMEN_PARK_BUILDING: Building = {
    id: "lumen-park",
    name: "Edificio Lumen Park",
    address: "Paseo Las Retamas MZ B, Lote 11 ",
    district: "Lumen Park",
    description: "Proyecto Lumen Park.",
    about: "",
    status: "Pre venta",
    floors: 0,
    totalUnits: 0,
    commonAreas: [],
    buildingFeatures: [],
    location: {
        address: "Paseo Las Retamas MZ B, Lote 11 ",
        coordinates: { lat: 0, lng: 0 },
        nearbyPlaces: []
    },
    gallery: ["/lumen/Espectativa.webp"],
    apartments: []
};

export const BUILDINGS: Building[] = [
    WABI_SABI_BUILDING,
    BRINDIZI_BUILDING,
    LUMEN_PARK_BUILDING
];

export function getAllBuildings(): Building[] {
    return BUILDINGS;
}

export function getApartmentById(id: string): Apartment | undefined {
    return BUILDINGS.flatMap(b => b.apartments).find(apt => apt.id === id);
}

export function getAllApartments(): Apartment[] {
    return BUILDINGS.flatMap(b => b.apartments);
}

export function getBuilding(): Building {
    return BRINDIZI_BUILDING;
}

export function getBuildingById(id: string): Building | undefined {
    return BUILDINGS.find(b => b.id === id);
}
