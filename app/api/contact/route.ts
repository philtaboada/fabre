import { NextRequest, NextResponse } from "next/server";
import { UTM_MEDIUM_WEB, UTM_SOURCE_ORGANICO } from "../../lib/utm";

const SPERANT_API_BASE =
  process.env.SPERANT_API_BASE_URL ?? "https://demo.eterniasoft.com/v3";

/** Nombres a buscar para canal de entrada: página web (prioridad) */
const INPUT_CHANNEL_NAMES = ["página web", "pagina web", "web", "formulario web", "sitio web"];

/** Nombres a buscar para nivel de interés: alto/medio (prioridad) */
const INTEREST_TYPE_NAMES = ["alta", "alto", "media", "medio"];

/**
 * Obtiene el ID del canal de entrada "página web" desde la API.
 */
async function resolveInputChannelId(token: string): Promise<number | null> {
  const response = await fetch(`${SPERANT_API_BASE}/input_channels`, {
    headers: { Authorization: token },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { data?: Array<{ id?: string; attributes?: { id?: number; name?: string } }> };
  const items = data?.data ?? [];
  const nameLower = (n: string) => n.toLowerCase().trim();
  for (const searchName of INPUT_CHANNEL_NAMES) {
    const found = items.find((i) => nameLower(i.attributes?.name ?? "").includes(searchName));
    if (found) {
      const id = found.attributes?.id ?? (found.id ? parseInt(found.id, 10) : NaN);
      return typeof id === "number" && !Number.isNaN(id) ? id : null;
    }
  }
  return null;
}

/**
 * Obtiene el ID del nivel de interés "alta" o "media" desde la API.
 */
async function resolveInterestTypeId(token: string): Promise<number | null> {
  const response = await fetch(`${SPERANT_API_BASE}/interest_types`, {
    headers: { Authorization: token },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { data?: Array<{ id?: string; attributes?: { id?: number; name?: string } }> };
  const items = data?.data ?? [];
  const nameLower = (n: string) => n.toLowerCase().trim();
  for (const searchName of INTEREST_TYPE_NAMES) {
    const found = items.find(
      (i) => nameLower(i.attributes?.name ?? "") === searchName || nameLower(i.attributes?.name ?? "").includes(searchName)
    );
    if (found) {
      const id = found.attributes?.id ?? (found.id ? parseInt(found.id, 10) : NaN);
      return typeof id === "number" && !Number.isNaN(id) ? id : null;
    }
  }
  return null;
}

/**
 * Obtiene el ID del primer usuario disponible en Sperant.
 * Útil cuando la asignación automática falla con "No se encontró un vendedor para asignar".
 * @see https://sperant.gitbook.io/apiv3/recursos/usuarios
 */
async function fetchFirstUserId(token: string): Promise<number | null> {
  const url = `${SPERANT_API_BASE}/users`;
  const response = await fetch(url, {
    headers: { Authorization: token },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { data?: Array<{ id?: string; attributes?: { id?: number } }> };
  const first = data?.data?.[0];
  const id = first?.attributes?.id ?? (first?.id ? parseInt(first.id, 10) : NaN);
  return typeof id === "number" && !Number.isNaN(id) ? id : null;
}

/**
 * Obtiene el ID del primer proyecto en Sperant.
 * Usado cuando el formulario no envía proyecto pero la API lo exige.
 * @see https://sperant.gitbook.io/apiv3/proyecto/listar-proyectos
 */
async function fetchFirstProjectId(token: string): Promise<number | null> {
  const response = await fetch(`${SPERANT_API_BASE}/projects`, {
    headers: { Authorization: token },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as {
    data?: Array<{ id?: string; attributes?: { id?: number } }>;
  };
  const first = data?.data?.[0];
  const id = first?.attributes?.id ?? (first?.id ? parseInt(first.id, 10) : NaN);
  return typeof id === "number" && !Number.isNaN(id) ? id : null;
}

interface CreateClientPayload {
  fname: string;
  lname?: string;
  email?: string;
  phone?: string;
  input_channel_id: number;
  source_id: number;
  interest_type_id: number;
  agent_id?: number;
  publicity_consent?: boolean;
  email_consent?: boolean;
  project_id?: number;
  observation?: string;
  extra_fields?: Record<string, string>;
}

interface ContactRequestBody {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  project?: string;
  projectId?: number;
  bedrooms?: string;
  message?: string;
  marketing?: boolean;
  shareData?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

/**
 * Crea un cliente en Sperant CRM a partir de los datos del formulario de contacto.
 * @see https://sperant.gitbook.io/apiv3/clientes/crear-cliente
 */
async function createSperantClient(payload: CreateClientPayload): Promise<Response> {
  const token = process.env.SPERANT_API_TOKEN;
  if (!token) {
    throw new Error("SPERANT_API_TOKEN no está configurado");
  }

  const body: Record<string, unknown> = {
    fname: payload.fname,
    lname: payload.lname ?? "",
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    input_channel_id: payload.input_channel_id,
    source_id: payload.source_id,
    interest_type_id: payload.interest_type_id,
    publicity_consent: payload.publicity_consent ?? false,
    email_consent: payload.email_consent ?? true,
    ...(payload.project_id && { project_id: payload.project_id }),
    ...(payload.observation && { observation: payload.observation }),
    ...(payload.extra_fields && Object.keys(payload.extra_fields).length > 0 && {
      extra_fields: payload.extra_fields,
    }),
  };
  if (typeof payload.agent_id === "number") {
    body.agent_id = payload.agent_id;
  }

    const clientsUrl = `${SPERANT_API_BASE}/clients`;
    console.log("[Contact] URL:", clientsUrl, "| Datos:", JSON.stringify(body, null, 2));
    const response = await fetch(clientsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  return response;
}

/** Extrae mensaje legible de un item de error (string u objeto) */
function errorItemToString(e: unknown): string {
  if (typeof e === "string") return e;
  if (typeof e === "object" && e !== null) {
    const o = e as Record<string, unknown>;
    if (typeof o.message === "string") return o.message;
    if (typeof o.error === "string") return o.error;
    if (typeof o.detail === "string") return o.detail;
    if (typeof o.msg === "string") return o.msg;
    if (Array.isArray(o.messages)) return (o.messages as unknown[]).map(errorItemToString).join(", ");
  }
  return "";
}

/** Extrae mensaje legible de la respuesta de error de Sperant */
function extractErrorMessage(data: Record<string, unknown>): string | null {
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;
  if (Array.isArray(data?.errors)) {
    const parts = (data.errors as unknown[]).map(errorItemToString).filter(Boolean);
    return parts.length > 0 ? parts.join(". ") : null;
  }
  return null;
}

/**
 * POST /api/contact - Registra el contacto en Sperant CRM.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const token = process.env.SPERANT_API_TOKEN;
    let inputChannelId = 0;
    if (token) {
      const resolved = await resolveInputChannelId(token);
      if (resolved !== null) {
        inputChannelId = resolved;
        console.log("[Contact] Canal de entrada (página web):", inputChannelId);
      }
    }
    if (!inputChannelId) {
      inputChannelId = parseInt(process.env.SPERANT_INPUT_CHANNEL_ID ?? "", 10);
    }
    let interestTypeId = 0;
    if (token) {
      const resolved = await resolveInterestTypeId(token);
      if (resolved !== null) {
        interestTypeId = resolved;
        console.log("[Contact] Nivel de interés (alta/media):", interestTypeId);
      }
    }
    if (!interestTypeId) {
      interestTypeId = parseInt(process.env.SPERANT_INTEREST_TYPE_ID ?? "", 10) || 3;
    }
    const sourceId = parseInt(process.env.SPERANT_SOURCE_ID ?? "", 10);
    const agentIdRaw = process.env.SPERANT_AGENT_ID;
    const parsedAgentId = agentIdRaw ? parseInt(agentIdRaw, 10) : NaN;
    let agentId: number | undefined =
      agentIdRaw && !Number.isNaN(parsedAgentId) ? parsedAgentId : undefined;
    if (agentId === undefined && token) {
      const firstUserId = await fetchFirstUserId(token);
      if (firstUserId !== null) {
        agentId = firstUserId;
        console.log("[Contact] Usando primer usuario como vendedor (agent_id):", agentId);
      }
    }

    if (!inputChannelId || !sourceId) {
      return NextResponse.json(
        {
          error: "Configuración incompleta: SPERANT_INPUT_CHANNEL_ID y SPERANT_SOURCE_ID son requeridos",
        },
        { status: 500 }
      );
    }

    const extraFields: Record<string, string> = {};
    if (body.bedrooms) extraFields.dormitorios = body.bedrooms;
    if (body.project) extraFields.proyecto_interes = body.project;
    extraFields.utm_source = (body.utmSource ?? UTM_SOURCE_ORGANICO).trim();
    extraFields.utm_medium = (body.utmMedium ?? UTM_MEDIUM_WEB).trim();
    if (body.utmCampaign?.trim()) {
      extraFields.utm_campaign = body.utmCampaign.trim();
    }

    const projectId = body.projectId
      ? body.projectId
      : body.project
        ? parseInt(body.project, 10)
        : undefined;
    const validProjectId = projectId && !Number.isNaN(projectId) ? projectId : undefined;
    let resolvedProjectId: number | undefined = validProjectId;
    /**
     * Sin projectId en el body (formularios sin selector: financiamiento, terrenos, etc.):
     * 1) SPERANT_DEFAULT_PROJECT_ID en .env
     * 2) primer proyecto listado en Sperant
     */
    if (!resolvedProjectId) {
      const envProjectId = parseInt(
        process.env.SPERANT_DEFAULT_PROJECT_ID ??
          process.env.SPERANT_CONTACT_DEFAULT_PROJECT_ID ??
          "",
        10,
      );
      if (!Number.isNaN(envProjectId)) {
        resolvedProjectId = envProjectId;
        console.log("[Contact] project_id desde env (SPERANT_DEFAULT_PROJECT_ID):", envProjectId);
      }
    }
    if (!resolvedProjectId && token) {
      const firstProjectId = await fetchFirstProjectId(token);
      if (firstProjectId !== null) {
        resolvedProjectId = firstProjectId;
        console.log("[Contact] project_id por defecto (primer proyecto en Sperant):", firstProjectId);
      }
    }
    if (!resolvedProjectId) {
      return NextResponse.json(
        {
          error:
            "No se pudo asignar un proyecto. Define SPERANT_DEFAULT_PROJECT_ID en .env o verifica la lista de proyectos en Sperant.",
        },
        { status: 500 }
      );
    }

    const payload: CreateClientPayload = {
      fname: body.name.trim(),
      lname: body.lastname.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      input_channel_id: inputChannelId,
      source_id: sourceId,
      interest_type_id: interestTypeId,
      ...(typeof agentId === "number" && { agent_id: agentId }),
      publicity_consent: body.marketing ?? false,
      email_consent: body.shareData ?? false,
      project_id: resolvedProjectId,
      observation: body.message?.trim() ?? undefined,
      extra_fields: Object.keys(extraFields).length > 0 ? extraFields : undefined,
    };

    const response = await createSperantClient(payload);

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    const parseResponseBody = async (): Promise<Record<string, unknown>> => {
      const text = await response.text();
      if (!isJson || !text.trim().startsWith("{")) {
        console.error("[Sperant API] Respuesta no-JSON:", response.status, text.slice(0, 200));
        return { raw: text.slice(0, 500) };
      }
      try {
        return JSON.parse(text) as Record<string, unknown>;
      } catch {
        return { raw: text.slice(0, 500) };
      }
    };

    if (!response.ok) {
      const errorData = await parseResponseBody();
      console.error("[Sperant API Error]", response.status, errorData);
      const sperantMessage = extractErrorMessage(errorData);
      const errorMessage = sperantMessage
        ? `Sperant: ${sperantMessage}`
        : `Error al registrar en Sperant (${response.status}). Verifica la URL y el token.`;
      return NextResponse.json(
        {
          error: errorMessage,
          details: errorData,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await parseResponseBody();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      {
        error: "Error interno al procesar la solicitud",
      },
      { status: 500 }
    );
  }
}
