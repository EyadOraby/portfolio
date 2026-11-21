import { isAr, switchLang } from "../i18n";

/** Switches between English and Arabic (reloads the page in the other language). */
export function LangToggle() {
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => switchLang(isAr ? "en" : "ar")}
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      lang={isAr ? "en" : "ar"}
    >
      {isAr ? "EN" : "ع"}
    </button>
  );
}
