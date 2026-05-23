import { useEffect, useState } from "react";

export type Variant = "1" | "2" | "3" | "4";

const DEFAULT_VARIANT: Variant = "1";

const HASH_BY_VARIANT: Record<Variant, string> = {
  1: "#v1",
  2: "#v2",
  3: "#v3",
  4: "#v4",
};

function readHash(): Variant {
  if (typeof window === "undefined") return DEFAULT_VARIANT;
  const hash = window.location.hash.toLowerCase();
  if (hash === "#v1") return "1";
  if (hash === "#v2") return "2";
  if (hash === "#v3") return "3";
  if (hash === "#v4") return "4";
  return DEFAULT_VARIANT;
}

export function useVariant(): [Variant, (v: Variant) => void] {
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);

  useEffect(() => {
    const syncFromHash = () => setVariant(readHash());

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const update = (v: Variant) => {
    setVariant(v);
    if (typeof window !== "undefined") {
      const nextHash = HASH_BY_VARIANT[v];
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    }
  };

  return [variant, update];
}
