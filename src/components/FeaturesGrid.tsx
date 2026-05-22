import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Radio,
  ShieldCheck,
  Smartphone,
  Tv,
  Zap,
} from "lucide-react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

type Feature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: Radio,
    title: "Live rooms",
    desc: "Multiple broadcasts running side-by-side.",
  },
  {
    icon: Tv,
    title: "HD streams",
    desc: "Crisp video, low latency, multi-angle.",
  },
  {
    icon: Activity,
    title: "Crowd momentum",
    desc: "See where the action is, in real time.",
  },
  {
    icon: Zap,
    title: "Fast entry",
    desc: "Jump into a room in two taps.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    desc: "Designed for phones, scaled up cleanly.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted uptime",
    desc: "Premium streams, premium reliability.",
  },
];

export function FeaturesGrid() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="features"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-secondary">
          <Zap className="h-4 w-4 text-[#e1334f]" />
          Why Alopit
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-primary sm:text-4xl">
          Built for sabong fans, end-to-end.
        </h2>
        <p className="mt-3 text-sm font-medium leading-6 text-secondary sm:text-base">
          A focused product: live rooms, clear context, and the shortest path between watching and
          joining.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: index * 0.05, duration: 0.4 }
              }
              className="group flex h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white p-5 text-center shadow-[0_12px_40px_rgba(19,49,112,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_60px_rgba(31,94,255,0.1)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-bg text-accent transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-black text-primary">{feature.title}</h3>
                <p className="mt-1 text-[11px] font-medium leading-snug text-tertiary">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
