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
    status: "Pre-venta" | "En construcción" | "Entregado" | "Entrega inmediata" | "PROXIMO LANZAMIENTO";
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
    status: "Entrega inmediata",
    deliveryDate: "2025",
    floors: 12,
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
            id: "brindizi-piso-5",
            floor: 5,
            area: 78,
            price: 285000,
            bedrooms: 2,
            bathrooms: 2,
            description: "Departamento exclusivo con vista a la calle, diseñado para maximizar la iluminación natural y el confort. Acabados de primera y distribución eficiente.",
            features: [
                "Vista a la calle",
                "2 Dormitorios",
                "2 Baños",
                "Iluminación LED",
                "Cocina americana",
                "Lavadero independiente",
                "Cerradura inteligente"
            ],
            images: [
                "/dep-2/DSC05376-HDR.webp",
                "/dep-2/DSC05377-HDR.webp"
            ],
            available: false
        },
        {
            id: "brindizi-piso-6",
            floor: 6,
            area: 78,
            price: 290000,
            bedrooms: 2,
            bathrooms: 2,
            description: "Elegante departamento en el piso 6 con impresionante vista a la calle. Espacios optimizados y tecnología smart de seguridad incluída.",
            features: [
                "Vista a la calle",
                "2 Dormitorios",
                "2 Baños",
                "1 Estudio",
                "1 Terraza",
                "Balcón privado",
                "Iluminación natural",
                "Cerradura biométrica",
                "Termas Sole instaladas",
                "Cocina americana"
            ],
            images: [
                "/dep-2/DSC05430-HDR.webp",
                "/dep-2/DSC05438-HDR.webp"
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
