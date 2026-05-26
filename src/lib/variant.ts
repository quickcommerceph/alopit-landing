import { useEffect, useState } from "react";

export type Variant = "1" | "2" | "3" | "4";

const DEFAULT_VARIANT: Variant = "1";

const HASH_BY_VARIANT: Record<Variant, string> = {
  1: "#v1",
  2: "#v2",
  3: "#v3",
  4: "#v4",
};

// Returns the variant encoded in the URL hash, or null when the hash is an
// in-page anchor (e.g. #rooms, #platform) rather than a variant route.
// Returning null lets CTA anchors scroll within the active variant instead of
// resetting it to the default variant.
function readVariantFromHash(): Variant | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.toLowerCase();
  if (hash === "#v1") return "1";
  if (hash === "#v2") return "2";
  if (hash === "#v3") return "3";
  if (hash === "#v4") return "4";
  return null;
}

export function useVariant(): [Variant, (v: Variant) => void] {
  const [variant, setVariant] = useState<Variant>(
    () => readVariantFromHash() ?? DEFAULT_VARIANT,
  );

  useEffect(() => {
    const syncFromHash = () => {
      const next = readVariantFromHash();
      // Only switch on real variant hashes. In-page anchor hashes
      // (#rooms, #platform, #entry, …) are ignored so clicking a CTA scrolls
      // within the current variant rather than falling back to variant 1.
      if (next) setVariant(next);
    };

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
