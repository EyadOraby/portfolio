import { uiArabic } from "./i18n.ar";

export type Lang = "en" | "ar";

/** Reads `?lang=` (and remembers it) or the visitor's last choice. */
function detect(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "ar" || fromUrl === "en") {
      localStorage.setItem("lang", fromUrl);
      return fromUrl;
    }
    return localStorage.getItem("lang") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

/** The language for this page load. Switching reloads the page. */
export const lang: Lang = detect();
export const isAr = lang === "ar";

/** Translates a UI string; anything without an Arabic entry stays English. */
export function t(en: string): string {
  return isAr ? (uiArabic[en] ?? en) : en;
}

export function switchLang(next: Lang) {
  try {
    localStorage.setItem("lang", next);
  } catch {
    /* private mode: the URL still carries the choice */
  }
  const url = new URL(window.location.href);
  url.searchParams.set("lang", next);
  window.location.replace(url.toString());
}

/** Sets the document language and direction. Call once at startup. */
export function applyDocumentLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";
}
