import { motion } from "framer-motion";
import { lobbyStats } from "../data/rooms";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

export function StatsStrip() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="stats"
      className="relative scroll-mt-24 border-y border-border-light bg-white/60 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
            Tonight, by the numbers
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-primary sm:text-4xl">
            Trusted by sabong fans every night.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {lobbyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { delay: index * 0.08, duration: 0.4 }
                }
                className="text-left"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-bg text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-tertiary">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
