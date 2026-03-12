import { NextResponse } from "next/server";

const SPERANT_API_BASE =
  process.env.SPERANT_API_BASE_URL ?? "https://demo.eterniasoft.com/v3";

interface SperantProject {
  type: string;
  id: string;
  attributes: {
    id: number;
    code: string;
    name: string;
    slug: string;
    budget_web_link?: string;
    logo?: string | null;
  };
}

interface SperantProjectsResponse {
  data?: SperantProject[];
  links?: Record<string, string>;
  meta?: Record<string, unknown>;
}

/**
 * GET /api/projects - Lista proyectos desde Sperant.
 * @see https://sperant.gitbook.io/apiv3/proyecto/listar-proyectos
 */
export async function GET() {
  try {
    const token = process.env.SPERANT_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "SPERANT_API_TOKEN no está configurado" },
        { status: 500 }
      );
    }

    const response = await fetch(`${SPERANT_API_BASE}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const text = await response.text();

    if (!response.ok) {
      console.error("[Sperant Projects API Error]", response.status, text.slice(0, 300));
      return NextResponse.json(
        {
          error: "Error al obtener proyectos",
          status: response.status,
        },
        { status: response.status }
      );
    }

    if (!isJson || !text.trim().startsWith("{")) {
      console.error("[Sperant Projects API] Respuesta no-JSON:", text.slice(0, 200));
      return NextResponse.json(
        { error: "Respuesta inválida de Sperant", projects: [] },
        { status: 502 }
      );
    }

    const data = JSON.parse(text) as SperantProjectsResponse;
    const projects =
      data.data?.map((p) => ({
        id: p.attributes.id,
        code: p.attributes.code,
        name: p.attributes.name,
        slug: p.attributes.slug,
      })) ?? [];

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error en /api/projects:", error);
    return NextResponse.json(
      { error: "Error interno al obtener proyectos", projects: [] },
      { status: 500 }
    );
  }
}
