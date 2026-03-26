/** Tráfico orgánico (web propia) — usar en enlaces y CRM. */
export const UTM_SOURCE_ORGANICO = "organico";

export const UTM_MEDIUM_WEB = "web";

/**
 * Añade utm_source y utm_medium a rutas internas y hashes (p. ej. `#contacto`).
 * No modifica URLs externas (http, mailto, tel).
 */
export function withUtm(href: string): string {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }
  const params = new URLSearchParams();
  params.set("utm_source", UTM_SOURCE_ORGANICO);
  params.set("utm_medium", UTM_MEDIUM_WEB);
  const utmQuery = params.toString();
  if (href.startsWith("#")) {
    return `?${utmQuery}${href}`;
  }
  const hashIdx = href.indexOf("#");
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const pathAndQuery = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const qIdx = pathAndQuery.indexOf("?");
  const path = qIdx >= 0 ? pathAndQuery.slice(0, qIdx) : pathAndQuery;
  const existing = qIdx >= 0 ? pathAndQuery.slice(qIdx + 1) : "";
  const merged = new URLSearchParams(existing);
  merged.set("utm_source", UTM_SOURCE_ORGANICO);
  merged.set("utm_medium", UTM_MEDIUM_WEB);
  const qs = merged.toString();
  const basePath = path || "/";
  return `${basePath}?${qs}${hash}`;
}

const WHATSAPP_UTM_SUFFIX = `\n\n— utm_source=${UTM_SOURCE_ORGANICO} · utm_medium=${UTM_MEDIUM_WEB}`;

/**
 * URL wa.me con mensaje que incluye el sufijo UTM para trazabilidad en el chat.
 */
export function buildWhatsAppHref(phoneDigits: string, message: string): string {
  const digits = phoneDigits.replace(/\D/g, "");
  const text = encodeURIComponent(`${message.trim()}${WHATSAPP_UTM_SUFFIX}`);
  return `https://wa.me/${digits}?text=${text}`;
}

/**
 * Valores UTM para el body de `/api/contact` (desde la URL actual o por defecto).
 */
export function getClientUtmForApi(): {
  utmSource: string;
  utmMedium: string;
  utmCampaign?: string;
} {
  if (typeof window === "undefined") {
    return { utmSource: UTM_SOURCE_ORGANICO, utmMedium: UTM_MEDIUM_WEB };
  }
  const p = new URLSearchParams(window.location.search);
  const campaign = p.get("utm_campaign");
  return {
    utmSource: p.get("utm_source") ?? UTM_SOURCE_ORGANICO,
    utmMedium: p.get("utm_medium") ?? UTM_MEDIUM_WEB,
    utmCampaign: campaign && campaign.length > 0 ? campaign : undefined,
  };
}
