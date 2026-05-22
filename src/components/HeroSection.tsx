import { motion } from "framer-motion";
import {
  Activity,
  CalendarClock,
  Clock3,
  Flame,
  Gauge,
  Play,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "./shared/Badge";
import { DetailPill } from "./shared/DetailPill";
import { StatTile } from "./shared/StatTile";
import { liveRooms, lobbyStats, trustPills } from "../data/rooms";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

export function HeroSection() {
  const spotlight = liveRooms[0];
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6 },
        };

  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <motion.header
        {...fadeUp(0.05)}
        className="overflow-hidden rounded-[1.6rem] border border-border bg-white shadow-[0_24px_80px_rgba(19,49,112,0.08)]"
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-[#0b1020] sm:min-h-[360px] lg:min-h-[580px]">
            <img
              src="/images/e-sabong-thumbnail.jpg"
              alt="E-Sabong live broadcast arena"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
            <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-2">
              <Badge>Live lobby</Badge>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/14 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                <Radio className="h-3.5 w-3.5" />
                Main broadcast
              </span>
            </div>

            <motion.div {...fadeUp(0.2)} className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-md">
                <img src="/images/logo.png" alt="Alopit" className="h-4 w-auto" />
                Alopit E-Sabong
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/70">
                Premium live rooms
              </p>
              <h1 className="mt-2 max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Live E-Sabong rooms with clear momentum, crowd context, and fast entry.
              </h1>
              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-white/78 sm:text-base">
                A clean white surface, deep blue utility, and sharp red accents — built end-to-end
                for sabong fans who want to find the right room and jump in.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/15 bg-white/12 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex min-w-0 flex-col p-6 sm:p-7 lg:p-8">
            <motion.div {...fadeUp(0.1)} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-bg-alt px-3 py-1.5 text-xs font-bold text-secondary ring-1 ring-border-light">
                <CalendarClock className="h-4 w-4 text-accent" />
                Next rotation at 8:10 PM
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-warm-bg px-3 py-1.5 text-xs font-bold text-[#d12d49] ring-1 ring-[#e1334f]/10">
                <Flame className="h-4 w-4" />
                {spotlight.momentum}% top room
              </span>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="mt-7">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-secondary">
                <Activity className="h-4 w-4 text-accent" />
                E-Sabong Arena
              </p>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
                One room, one focus.
              </h2>
              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-secondary sm:text-base">
                A landing page built to convert attention into room entry. Sportsbook-grade
                hierarchy, stripped to the parts that matter for tonight's broadcast.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="mt-7 border-y border-border-light py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-tertiary">
                    Featured room
                  </p>
                  <h3 className="mt-1 truncate text-xl font-bold text-primary">
                    {spotlight.round}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-secondary">{spotlight.summary}</p>
                </div>
                <div className="shrink-0 rounded-2xl bg-bg-alt px-4 py-3 text-left sm:text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary">
                    Starts
                  </p>
                  <p className="mt-0.5 text-lg font-bold leading-none text-primary">
                    {spotlight.startTime}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <DetailPill icon={Users} label="Crowd" value={spotlight.viewers} />
                <DetailPill icon={Gauge} label="Handle" value={spotlight.handle} />
                <DetailPill icon={Clock3} label="Entry" value={spotlight.entryWindow} />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-secondary">
                  <span>Room momentum</span>
                  <span className="text-primary">{spotlight.momentum}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg-alt ring-1 ring-border-light">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#e1334f] via-[#f97316] to-[#1f5eff]"
                    style={{ width: `${spotlight.momentum}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="mt-6 grid gap-3 sm:grid-cols-2">
              {lobbyStats.slice(0, 4).map((stat) => (
                <StatTile key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#live-rooms"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e1334f] to-[#1f5eff] px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,94,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                Join Top Room
              </a>
              <a
                href="#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-2 text-sm font-semibold text-secondary shadow-[0_12px_30px_rgba(19,49,112,0.06)] transition-all duration-200 hover:border-accent/25 hover:text-accent active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                Explore the lobby
              </a>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </section>
  );
}
