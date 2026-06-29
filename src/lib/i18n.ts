export const locales = ["en", "th", "ms", "id", "vi", "es", "hi"] as const;
export type Locale = (typeof locales)[number];

export const LOCALE_STORAGE_KEY = "alopit-locale";

export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "Thai",
  ms: "Malay",
  id: "Indonesian",
  vi: "Vietnamese",
  es: "Mexico",
  hi: "Hindi",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  ms: "MY",
  id: "ID",
  vi: "VI",
  es: "MX",
  hi: "HI",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getBrowserLocale(): Locale | null {
  if (typeof navigator === "undefined") {
    return null;
  }

  const candidate = navigator.language?.toLowerCase();
  if (candidate?.startsWith("th")) {
    return "th";
  }

  if (candidate?.startsWith("ms")) {
    return "ms";
  }

  if (candidate?.startsWith("id")) {
    return "id";
  }

  if (candidate?.startsWith("vi")) {
    return "vi";
  }

  if (candidate?.startsWith("es")) {
    return "es";
  }

  if (candidate?.startsWith("hi")) {
    return "hi";
  }

  return "en";
}

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage access failures and fall back to browser/default locale.
  }

  return getBrowserLocale() ?? "en";
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage access failures.
  }
}
