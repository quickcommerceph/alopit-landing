export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/14 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.7)]" />
      {children}
    </span>
  );
}
