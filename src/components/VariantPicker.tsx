import { motion } from "framer-motion";
import type { Variant } from "../lib/variant";

type Props = {
  variant: Variant;
  onChange: (v: Variant) => void;
};

const OPTIONS: Variant[] = ["1", "2", "3"];

export function VariantPicker({ variant, onChange }: Props) {
  return (
    <div
      className="fixed bottom-5 right-5 z-[100] select-none sm:bottom-6 sm:right-6"
      role="group"
      aria-label="Choose landing variant"
    >
      <div
        className="flex items-center gap-1 rounded-full border p-1 backdrop-blur-xl"
        style={{
          background: "rgba(15, 10, 10, 0.78)",
          borderColor: "rgba(255, 255, 255, 0.14)",
          boxShadow:
            "0 18px 50px -10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        <span
          className="pl-3 pr-2 text-[9px] font-semibold uppercase tracking-[0.28em]"
          style={{
            fontFamily:
              '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
            color: "rgba(243,238,229,0.55)",
          }}
        >
          Variant
        </span>
        <div className="relative flex items-center">
          {OPTIONS.map((opt) => {
            const active = variant === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                aria-pressed={active}
                aria-label={`Show variant ${opt}`}
                className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-colors duration-200"
                style={{
                  fontFamily:
                    '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                  color: active ? "#0f0a0a" : "rgba(243,238,229,0.7)",
                }}
              >
                {active && (
                  <motion.span
                    layoutId="variant-pill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "#f3eee5",
                      boxShadow:
                        "0 6px 18px -6px rgba(0,0,0,0.5), inset 0 -2px 0 rgba(0,0,0,0.08)",
                    }}
                  />
                )}
                <span className="relative">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
