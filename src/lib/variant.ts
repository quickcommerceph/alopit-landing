import { useEffect, useState } from "react";

export type Variant = "1" | "2";

const STORAGE_KEY = "alopit:variant";
const DEFAULT_VARIANT: Variant = "1";

function readStored(): Variant {
  if (typeof window === "undefined") return DEFAULT_VARIANT;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "1" || v === "2" ? v : DEFAULT_VARIANT;
}

export function useVariant(): [Variant, (v: Variant) => void] {
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);

  useEffect(() => {
    setVariant(readStored());
  }, []);

  const update = (v: Variant) => {
    setVariant(v);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, v);
    }
  };

  return [variant, update];
}
