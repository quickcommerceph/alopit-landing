import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { localeNames, localeShortLabels, locales, type Locale } from "../lib/i18n";

const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  th: "🇹🇭",
  ms: "🇲🇾",
  id: "🇮🇩",
  vi: "🇻🇳",
  es: "🇪🇸",
  hi: "🇮🇳",
};

interface LanguageSelectorProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export function LanguageSelector({ locale, onChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleSelect = (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale !== locale) {
      onChange(nextLocale);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Select language"
        aria-expanded={open}
        className="inline-flex h-9 min-w-[5rem] items-center justify-center gap-1.5 border border-[#f2c14e]/20 bg-[#0a0a0a] px-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5f5f5]/90 transition duration-300 hover:border-[#f2c14e]/45 hover:bg-[#111111] hover:text-[#f2c14e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2c14e]"
        style={{
          clipPath:
            "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
        }}
      >
        <span aria-hidden className="text-sm leading-none">
          {localeFlags[locale]}
        </span>
        <span>{localeShortLabels[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : "opacity-70"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.45rem)] z-50 min-w-[152px] overflow-hidden border border-[#f2c14e]/18 bg-[#080808] shadow-[0_16px_36px_rgba(0,0,0,0.28)]">
          {locales.map((item) => {
            const active = item === locale;

            return (
              <button
                key={item}
                type="button"
                onClick={() => handleSelect(item)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.14em] transition duration-300 ${
                  active
                    ? "bg-[#f2c14e] text-[#050505]"
                    : "text-[#f5f5f5]/82 hover:bg-white/[0.05] hover:text-[#f2c14e]"
                }`}
              >
                <span aria-hidden className="text-sm leading-none">
                  {localeFlags[item]}
                </span>
                <span className="flex min-w-0 flex-1 flex-col leading-none">
                  <span className="text-[10px] tracking-[0.18em]">
                    {localeShortLabels[item]}
                  </span>
                  <span
                    className={`mt-0.5 truncate text-[9px] font-medium uppercase tracking-[0.12em] ${
                      active ? "text-[#050505]/72" : "text-[#d7d7d7]/62"
                    }`}
                  >
                    {localeNames[item]}
                  </span>
                </span>
                {active && <Check className="h-3 w-3 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
