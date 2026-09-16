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
        mapsUrl?: string;
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
    brochureUrl?: string;
    salesPhones?: { label: string; display: string; tel: string; whatsapp: string }[];
    galleryDisclaimer?: string;
    spaceGalleries?: {
        id: string;
        title: string;
        subtitle?: string;
        kind?: "gallery" | "tour";
        images: { src: string; alt: string; fit?: "cover" | "contain" }[];
    }[];
    typologies?: {
        id: string;
        name: string;
        image: string;
        area?: number;
        available: boolean;
    }[];
};

// Edificio Wabi Sabi
export const WABI_SABI_BUILDING: Building = {
    id: "wabi-sabi",
    name: "Residencial Wabi Sabi",
    address: "Calle Edmundo Mezger 164",
    district: "San Carlos",
    description: "Diseño minimalista y funcional en el corazón de San Carlos.",
    about: "Wabi Sabi es un proyecto entregado que destaca por su diseño arquitectónico moderno y su integración con el entorno urbano.",
    status: "Entregado",
    floors: 10,
    totalUnits: 30,
    commonAreas: ["Lobby", "Gimnasio", "Terraza"],
    buildingFeatures: [{ name: "Seguridad 24/7", iconName: "Shield" }],
    location: {
        address: "Calle Edmundo Mezger 164, San Carlos",
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
    address: "Lorenzo de Brindisi N°166, San Carlos",
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
        address: "Lorenzo de Brindisi N°166, San Carlos",
        mapsUrl: "https://maps.app.goo.gl/tbTAdPSKpNDmUJ8z6",
        coordinates: {
            lat: -12.0462075,
            lng: -75.1997707
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

const LUMEN_GALLERY_DISCLAIMER =
    "Las áreas mostradas están sujetas a cambios durante el desarrollo del proyecto final. La decoración, accesorios, muebles y equipamiento del departamento no están incluidos.";

// Edificio Lumen Park
export const LUMEN_PARK_BUILDING: Building = {
    id: "lumen-park",
    name: "Edificio Lumen Park",
    address: "Paseo Las Retamas Mz. B Lote 11",
    district: "Huancayo",
    description: "Vive frente al parque, cerca de todo lo que necesitas.",
    about: "Lumen Park es un proyecto residencial ubicado estratégicamente frente a un parque en Huancayo, pensado para quienes buscan tranquilidad, comodidad y una excelente conexión con la ciudad. Su ubicación permite estar a pocos minutos de colegios, universidades, tiendas y servicios esenciales, convirtiéndolo en una excelente alternativa tanto para vivir como para invertir. El proyecto ofrece departamentos y dúplex con distribuciones funcionales, diseño exclusivo y acabados de primera, creando espacios modernos y confortables para disfrutar en familia. Equipado con muebles altos y bajos, lavadero multifuncional, cerradura inteligente y vanitorio.",
    status: "En Acabados",
    deliveryDate: "Marzo 2027",
    floors: 7,
    totalUnits: 9,
    commonAreas: [],
    buildingFeatures: [
        { name: "Edificio Sismorresistente", iconName: "Building2" },
        { name: "Cámaras de seguridad", iconName: "Camera" },
        { name: "Cerco eléctrico", iconName: "Zap" },
        { name: "Luces con sensor", iconName: "Lightbulb" },
        { name: "Luces LED en fachada", iconName: "Sun" },
        { name: "Ascensor", iconName: "ArrowUpCircle" }
    ],
    location: {
        address: "Paseo Las Retamas Mz. B Lote 11, Huancayo",
        mapsUrl: "https://maps.app.goo.gl/PFwAtLgpWFwJCHNU7",
        coordinates: { lat: -12.038552, lng: -75.189278 },
        nearbyPlaces: [
            { name: "Innova Schools", distance: "Cerca", iconName: "School" },
            { name: "UPLA", distance: "Cerca", iconName: "GraduationCap" },
            { name: "Parque", distance: "Frente al proyecto", iconName: "Trees" }
        ]
    },
    gallery: ["/lumen/Espectativa.webp"],
    apartments: [],
    brochureUrl: "/lumen/docs/brochure-lumen-park.pdf",
    salesPhones: [
        { label: "Ventas 1", display: "+51 964 247 545", tel: "+51964247545", whatsapp: "51964247545" },
        { label: "Ventas 2", display: "+51 933 262 614", tel: "+51933262614", whatsapp: "51933262614" }
    ],
    galleryDisclaimer: LUMEN_GALLERY_DISCLAIMER,
    spaceGalleries: [
        {
            id: "areas-comunes",
            title: "Áreas Comunes",
            images: [
                { src: "/lumen/areas-comunes/01-zona-de-parrillas.jpg", alt: "Zona de parrillas" },
                { src: "/lumen/areas-comunes/02-sala-de-usos-multiples.jpg", alt: "Sala de usos múltiples" },
                { src: "/lumen/areas-comunes/03-estacionamiento-bicicletas.jpg", alt: "Estacionamiento de bicicletas" },
                { src: "/lumen/areas-comunes/04-lavanderia-tendales.jpg", alt: "Lavandería y tendales" },
                { src: "/lumen/areas-comunes/05-ascensor.jpg", alt: "Ascensor" }
            ]
        },
        {
            id: "tour-virtual",
            title: "Tour Virtual Piloto",
            subtitle: "Tipo 1 · 53 m²",
            kind: "tour",
            images: [
                { src: "/lumen/tour/t1-360-sala.jpg", alt: "Tour 360 — Sala", fit: "contain" },
                { src: "/lumen/tour/t1-360-dorm-1.jpg", alt: "Tour 360 — Dormitorio 1", fit: "contain" },
                { src: "/lumen/tour/t1-360-dorm-2.jpg", alt: "Tour 360 — Dormitorio 2", fit: "contain" }
            ]
        },
        {
            id: "departamento-piloto",
            title: "Departamento Piloto",
            images: [
                { src: "/lumen/piloto/01-sala.jpg", alt: "Sala" },
                { src: "/lumen/piloto/02-sala-comedor.jpg", alt: "Sala-comedor" },
                { src: "/lumen/piloto/03-cocina.jpg", alt: "Cocina" },
                { src: "/lumen/piloto/04-dormitorio-1.jpg", alt: "Dormitorio 1" },
                { src: "/lumen/piloto/05-dormitorio-2.jpg", alt: "Dormitorio 2" },
                { src: "/lumen/piloto/06-lavanderia.jpg", alt: "Lavandería" },
                { src: "/lumen/piloto/07-bano.jpg", alt: "Baño" }
            ]
        }
    ],
    typologies: [
        { id: "tipo-1", name: "Tipo 1", image: "/lumen/tipos/tipo-1.jpg", area: 53, available: true },
        { id: "tipo-2", name: "Tipo 2", image: "/lumen/tipos/tipo-2.jpg", available: true },
        { id: "tipo-3", name: "Tipo 3", image: "/lumen/tipos/tipo-3.jpg", available: true },
        { id: "tipo-1-duplex", name: "Tipo 1 Dúplex", image: "/lumen/tipos/tipo-1-duplex.jpg", available: true },
        { id: "tipo-2-duplex", name: "Tipo 2 Dúplex", image: "/lumen/tipos/tipo-2-duplex.jpg", available: false }
    ]
};

export const BUILDINGS: Building[] = [
    LUMEN_PARK_BUILDING,
    BRINDIZI_BUILDING,
    WABI_SABI_BUILDING
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
