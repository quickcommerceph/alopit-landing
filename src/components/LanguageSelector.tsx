import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const clipPath =
    "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedButton = buttonRef.current?.contains(target) ?? false;
      const clickedMenu = menuRef.current?.contains(target) ?? false;

      if (!clickedButton && !clickedMenu && rootRef.current) {
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

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const menuWidth = 184;
      const viewportPadding = 8;
      const left = Math.max(
        viewportPadding,
        Math.min(rect.left, window.innerWidth - menuWidth - viewportPadding),
      );

      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - left - menuWidth,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const handleSelect = (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale !== locale) {
      onChange(nextLocale);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`inline-flex p-px transition-colors duration-300 ${
          open ? "bg-[#f2c14e]/45" : "bg-[#f2c14e]/20 hover:bg-[#f2c14e]/45"
        }`}
        style={{ clipPath }}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Select language"
          aria-expanded={open}
          aria-haspopup="menu"
          className="inline-flex h-9 min-w-[5rem] items-center justify-center gap-1.5 bg-[#0a0a0a] px-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5f5f5]/90 transition duration-300 hover:bg-[#111111] hover:text-[#f2c14e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f2c14e]"
          style={{ clipPath }}
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
      </div>

      {open && (
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-50 min-w-[184px] overflow-hidden border border-[#f2c14e]/18 bg-[#080808] shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
            style={{
              top: `${menuPosition.top}px`,
              right: `${menuPosition.right}px`,
            }}
          >
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
          </div>,
          document.body,
        )
      )}
    </div>
  );
}
