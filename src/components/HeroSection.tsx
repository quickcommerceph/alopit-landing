import { motion } from "framer-motion";
import { ArrowRight, Flame, Play, Radio, Users } from "lucide-react";
import { liveRooms } from "../data/rooms";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

const HEADLINE = [
  { text: "The pit.", gradient: false },
  { text: "The pulse.", gradient: false },
  { text: "The pay-off.", gradient: true },
];

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const stagger = (i: number) =>
    prefersReducedMotion
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.15 + i * 0.11,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };

  const marqueeItems = liveRooms.map(
    (r) => `${r.round.toUpperCase()} · ${r.title} · ${r.viewers} watching`
  );
  const marqueeFull = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-28 pb-10 lg:pt-32 lg:pb-14"
    >
      {/* Dot grid background */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-tertiary/40"
      >
        <defs>
          <pattern id="hero-dots" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
          </pattern>
          <radialGradient id="hero-dot-fade" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
        <rect width="100%" height="100%" fill="url(#hero-dot-fade)" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: editorial text block */}
          <div className="relative z-10">
            <motion.div
              {...stagger(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/85 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(31,94,255,0.06)] backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e1334f] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e1334f]" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-secondary">
                Live tonight · Premium E-Sabong
              </span>
            </motion.div>

            <h1 className="mt-7 text-[2.7rem] font-black leading-[1] tracking-tighter text-primary sm:text-6xl lg:text-[5.2rem]">
              {HEADLINE.map((part, i) => (
                <span key={part.text} className="block overflow-hidden pb-[0.15em]">
                  <motion.span {...stagger(i + 1)} className="inline-block">
                    {part.gradient ? (
                      <motion.span
                        className="bg-gradient-to-r from-[#e1334f] via-[#f97316] to-[#1f5eff] bg-clip-text text-transparent"
                        style={{ backgroundSize: "220% auto" }}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                        }
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {part.text}
                      </motion.span>
                    ) : (
                      part.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...stagger(4)}
              className="mt-7 max-w-xl text-base font-medium leading-7 text-secondary sm:text-lg"
            >
              HD streams. Real-time crowd momentum. One-tap entry into the night's
              hottest cards. Built for sabong fans who don't want to miss a single wing.
            </motion.p>

            <motion.div {...stagger(5)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#live-rooms"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e1334f] to-[#1f5eff] px-7 py-2 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(31,94,255,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(31,94,255,0.34)] active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch live now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#top-room"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-2 text-sm font-semibold text-secondary shadow-[0_12px_30px_rgba(19,49,112,0.06)] transition-all duration-200 hover:border-accent/30 hover:text-accent active:scale-95"
              >
                <Radio className="h-4 w-4" />
                See tonight's card
              </a>
            </motion.div>

            <motion.div
              {...stagger(6)}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-secondary"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>
                  <span className="font-black text-primary">12.4K</span> watching now
                </span>
              </span>
              <span className="hidden h-4 w-px bg-border sm:inline-block" />
              <span>
                <span className="font-black text-primary">₱5.5M</span> handle tonight
              </span>
              <span className="hidden h-4 w-px bg-border sm:inline-block" />
              <span>
                <span className="font-black text-primary">98%</span> stream uptime
              </span>
            </motion.div>
          </div>

          {/* Right: hero image with aura + floating cards */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { delay: 0.2, duration: 0.95, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Aura */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(225,51,79,0.22), transparent 55%)",
                  filter: "blur(20px)",
                }}
                animate={
                  prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-[35%] top-[55%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(31,94,255,0.28), transparent 55%)",
                  filter: "blur(20px)",
                }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1.05, 1, 1.05], opacity: [0.9, 1, 0.9] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Concentric ring frame */}
            <div className="pointer-events-none absolute inset-[-6%] -z-10 rounded-full border border-border/60" />
            <div className="pointer-events-none absolute inset-[6%] -z-10 rounded-full border border-border-light" />

            <motion.img
              src="/images/hero-img.svg"
              alt="Live sabong arena illustration"
              loading="eager"
              animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full select-none drop-shadow-[0_30px_60px_rgba(19,49,112,0.18)]"
              draggable={false}
            />

            {/* Floating card — top right */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.7, duration: 0.55, ease: [0.16, 1, 0.3, 1] }
              }
              className="absolute -top-2 right-2 inline-flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3.5 py-2.5 shadow-[0_18px_40px_rgba(19,49,112,0.12)] sm:right-6 lg:-right-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-warm-bg text-[#e1334f]">
                <Flame className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-tertiary">
                  Tonight
                </p>
                <p className="text-sm font-black leading-tight text-primary">
                  3 live rounds
                </p>
              </div>
            </motion.div>

            {/* Floating card — bottom left */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.85, duration: 0.55, ease: [0.16, 1, 0.3, 1] }
              }
              className="absolute -bottom-3 left-2 inline-flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3.5 py-2.5 shadow-[0_18px_40px_rgba(19,49,112,0.12)] sm:left-6 lg:-left-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-bg text-accent">
                <Users className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-tertiary">
                  Peak crowd
                </p>
                <p className="text-sm font-black leading-tight text-primary">15.1K</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* On-air marquee ticker */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
          className="mt-14 overflow-hidden rounded-2xl border border-border-light bg-white/75 shadow-[0_14px_50px_rgba(19,49,112,0.06)] backdrop-blur-md"
        >
          <div className="flex items-center gap-3 border-b border-border-light px-5 py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e1334f] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e1334f]" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
              On Air
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-tertiary">
              Now broadcasting
            </span>
          </div>
          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
            <motion.div
              className="flex whitespace-nowrap py-3"
              animate={prefersReducedMotion ? undefined : { x: ["0%", "-33.333%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              {marqueeFull.map((item, i) => (
                <span
                  key={i}
                  className="mx-7 inline-flex shrink-0 items-center gap-3 text-sm font-bold tracking-tight text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e1334f]" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
