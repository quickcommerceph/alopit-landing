import { motion } from "framer-motion";
import { ArrowRight, Flame, Play } from "lucide-react";
import { liveRooms } from "../data/rooms";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { LOGIN_URL } from "../lib/constants";

const steps = [
  { num: "01", title: "Browse the lobby", desc: "Scan tonight's rooms by crowd and momentum." },
  { num: "02", title: "Pick your room", desc: "Open the room card to preview details and odds." },
  { num: "03", title: "Tap join", desc: "Enter the stream — no app install required." },
];

export function PromotionsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const spotlight = liveRooms[0];

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? { initial: false, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { delay, duration: 0.5 },
        };

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mb-8 max-w-2xl">
        <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-secondary">
          <Flame className="h-4 w-4 text-[#e1334f]" />
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-primary sm:text-4xl">
          From lobby to live in three taps.
        </h2>
        <p className="mt-3 text-sm font-medium leading-6 text-secondary sm:text-base">
          Pick a room, hit join, and you're in.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <motion.div
          {...fadeUp(0.05)}
          className="rounded-[1.4rem] border border-border bg-white p-6 shadow-[0_24px_80px_rgba(19,49,112,0.05)]"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-tertiary">
            Walkthrough
          </p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-primary">
            Three steps to your seat
          </h3>
          <ol className="mt-5 space-y-4">
            {steps.map((step) => (
              <li key={step.num} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e1334f] to-[#1f5eff] text-xs font-black text-white shadow-[0_8px_20px_rgba(31,94,255,0.18)]">
                  {step.num}
                </span>
                <div>
                  <p className="text-sm font-black text-primary">{step.title}</p>
                  <p className="mt-0.5 text-sm font-medium text-secondary">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.a
          {...fadeUp(0.1)}
          href={LOGIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-[1.4rem] border border-border bg-white p-6 shadow-[0_24px_80px_rgba(19,49,112,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_30px_100px_rgba(31,94,255,0.12)]"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-bg blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-accent-warm-bg blur-3xl" />

          <div className="relative flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-warm-bg px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#d12d49]">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Tonight's featured
            </span>
            <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-primary sm:text-3xl">
              {spotlight.title}
            </h3>
            <p className="mt-2 max-w-md text-sm font-medium leading-6 text-secondary">
              {spotlight.summary} Starts at {spotlight.startTime} — entry is currently{" "}
              <span className="font-black text-primary">{spotlight.entryWindow.toLowerCase()}</span>
              .
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-bg-alt px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                  Crowd
                </p>
                <p className="mt-0.5 text-sm font-black text-primary">{spotlight.viewers}</p>
              </div>
              <div className="rounded-xl bg-bg-alt px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                  Handle
                </p>
                <p className="mt-0.5 text-sm font-black text-primary">{spotlight.handle}</p>
              </div>
              <div className="rounded-xl bg-bg-alt px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                  Momentum
                </p>
                <p className="mt-0.5 text-sm font-black text-primary">{spotlight.momentum}%</p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e1334f] to-[#1f5eff] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,94,255,0.2)] transition-transform duration-200 group-hover:-translate-y-0.5">
                <Play className="h-4 w-4 fill-current" />
                Join now
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
