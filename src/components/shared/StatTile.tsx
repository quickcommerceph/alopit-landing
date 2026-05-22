import type { ComponentType } from "react";

export function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border-light bg-bg-alt/70 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-sm ring-1 ring-border-light">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary">
            {label}
          </p>
          <p className="mt-0.5 text-lg font-black leading-none text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}
