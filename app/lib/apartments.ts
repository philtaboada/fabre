export type Apartment = {
    id: string;
    floor: number;
    area: number;
    price: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    features: string[];
    images: string[];
    available: boolean;
};

export type Building = {
    id: string;
    name: string;
    address: string;
    district: string;
    description: string;
    about: string;
    status: "Pre-venta" | "En construcción" | "Entregado";
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

// Edificio Brindizi con 2 departamentos disponibles
export const BRINDIZI_BUILDING: Building = {
    id: "brindizi",
    name: "Edificio Brindizi",
    address: "Calle Lorenzo de Brindizi 166, San Carlos",
    district: "San Carlos, Huancayo",
    description: "Departamentos exclusivos en ubicación estratégica en San Carlos, cerca de la Universidad Continental y el Parque de la Identidad Wanka.",
    about: "El Edificio Brindizi ofrece una ubicación privilegiada a solo 3 cuadras de la Universidad Continental, cerca de la UPLA, Universidad Roosevelt, clínicas y centros comerciales como MAKRO. Destaca por su tecnología de seguridad avanzada con cerraduras inteligentes (huella, clave, tarjeta) y servicios modernos incluidos.",
    status: "En construcción",
    deliveryDate: "2025",
    floors: 6,
    totalUnits: 2,
    commonAreas: [
        "Cerradura inteligente (Huella, Clave, Tarjeta)",
        "Seguridad integrada",
        "Cámaras de seguridad",
        "Sistema de intercomunicador",
        "Área de lavadero con termas Sole"
    ],
    buildingFeatures: [
        { name: "Cerradura Smart", iconName: "Lock" },
        { name: "Seguridad Integrada", iconName: "ShieldCheck" },
        { name: "Ubicación Estratégica", iconName: "MapPin" },
        { name: "Agua Caliente", iconName: "Droplets" },
        { name: "Intercomunicador", iconName: "Phone" }
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
        "/building/build1.png",
        "/building/build1-1.png",
        "/building/build1-2.png",
        "/building/build1-3.png",
        "/building/build1-4.jpg",
        "/building/build1-5.jpg"
    ],
    apartments: [
        {
            id: "brindizi-2-dorm",
            floor: 2,
            area: 90,
            price: 85000,
            bedrooms: 2,
            bathrooms: 2,
            description: "Departamento funcional de 2 dormitorios diseñado para el equilibrio entre vida personal y trabajo. Cuenta con oficina independiente y balcón amplio.",
            features: [
                "2 Dormitorios amplios",
                "2 Baños modernos",
                "Área de estudios/oficina",
                "Balcón con vista exterior",
                "Cocina americana con barra",
                "Lavadero con terma Sole",
                "Cerradura inteligente"
            ],
            images: [
                "/dep-2/DSC05376-HDR.webp",
                "/dep-2/DSC05377-HDR.webp",
                "/dep-2/DSC05396-HDR.webp",
                "/dep-2/DSC05416-HDR.webp",
                "/dep-2/DSC05430-HDR.webp",
                "/dep-2/DSC05438-HDR.webp",
                "/dep-2/DSC05453-HDR.webp",
                "/dep-2/DSC05459-HDR.webp",
                "/dep-2/DSC05467-HDR.webp",
                "/dep-2/DSC05474-HDR.webp",
                "/dep-2/DSC05479-HDR.webp",
                "/dep-2/DSC05494-HDR.webp",
                "/dep-2/DSC05498-HDR.webp",
                "/dep-2/DSC05523-HDR.webp",
                "/dep-2/DSC05526-HDR.webp",
                "/dep-2/DSC05536-HDR.webp",
                "/dep-2/DSC05565-HDR.webp"
            ],
            available: true
        },
        {
            id: "brindizi-3-dorm",
            floor: 3,
            area: 110,
            price: 110000,
            bedrooms: 3,
            bathrooms: 2,
            description: "Departamento de 3 dormitorios enfocado en la amplitud familiar. Posee sala/comedor con grandes ventanales y cocina equipada con fregadero multifuncional.",
            features: [
                "3 Dormitorios",
                "2 Baños (Espejos LED)",
                "Sala/Comedor panorámica",
                "Cocina americana equipada",
                "Fregadero multifuncional",
                "Lavadero independiente",
                "Grandes ventanales"
            ],
            images: [
                "/dep-2/DSC05376-HDR.webp",
                "/dep-2/DSC05377-HDR.webp",
                "/dep-2/DSC05396-HDR.webp",
                "/dep-2/DSC05416-HDR.webp",
                "/dep-2/DSC05430-HDR.webp",
                "/dep-2/DSC05438-HDR.webp",
                "/dep-2/DSC05453-HDR.webp",
                "/dep-2/DSC05459-HDR.webp",
                "/dep-2/DSC05467-HDR.webp",
                "/dep-2/DSC05474-HDR.webp",
                "/dep-2/DSC05479-HDR.webp",
                "/dep-2/DSC05494-HDR.webp",
                "/dep-2/DSC05498-HDR.webp",
                "/dep-2/DSC05523-HDR.webp",
                "/dep-2/DSC05526-HDR.webp",
                "/dep-2/DSC05536-HDR.webp",
                "/dep-2/DSC05565-HDR.webp"
            ],
            available: true
        }
    ]
};

export function getApartmentById(id: string): Apartment | undefined {
    return BRINDIZI_BUILDING.apartments.find(apt => apt.id === id);
}

export function getAllApartments(): Apartment[] {
    return BRINDIZI_BUILDING.apartments;
}

export function getBuilding(): Building {
    return BRINDIZI_BUILDING;
}
