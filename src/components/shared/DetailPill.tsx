import type { ComponentType } from "react";

export function DetailPill({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-bg px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-accent" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">{label}</p>
        <p className="truncate text-sm font-black text-primary">{value}</p>
      </div>
    </div>
  );
}
