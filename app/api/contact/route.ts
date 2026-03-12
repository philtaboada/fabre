import { NextRequest, NextResponse } from "next/server";

const SPERANT_API_BASE = "https://api.sperant.com/v3";

/** Nivel de interés por defecto: "por contactar" */
const DEFAULT_INTEREST_TYPE_ID = 4;

interface CreateClientPayload {
  fname: string;
  lname?: string;
  email?: string;
  phone?: string;
  input_channel_id: number;
  source_id: number;
  interest_type_id: number;
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
  bedrooms?: string;
  message?: string;
  marketing?: boolean;
  shareData?: boolean;
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

  const body = {
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

  const response = await fetch(`${SPERANT_API_BASE}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  return response;
}

/**
 * POST /api/contact - Registra el contacto en Sperant CRM.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const inputChannelId = parseInt(process.env.SPERANT_INPUT_CHANNEL_ID ?? "", 10);
    const sourceId = parseInt(process.env.SPERANT_SOURCE_ID ?? "", 10);

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

    const payload: CreateClientPayload = {
      fname: body.name.trim(),
      lname: body.lastname.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      input_channel_id: inputChannelId,
      source_id: sourceId,
      interest_type_id: DEFAULT_INTEREST_TYPE_ID,
      publicity_consent: body.marketing ?? false,
      email_consent: body.shareData ?? false,
      observation: body.message?.trim() ?? undefined,
      extra_fields: Object.keys(extraFields).length > 0 ? extraFields : undefined,
    };

    const response = await createSperantClient(payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "Error al registrar en Sperant",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
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
