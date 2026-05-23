import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Headphones,
  Play,
  Radio,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../lib/constants";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

const PALETTE = {
  bg: "#050505",
  ink: "#f5f5f5",
  muted: "#d7d7d7",
  gold: "#f2c14e",
  blue: "#1e4fa8",
  red: "#d91f26",
  orange: "#ff7a00",
};

const LIVE_ROOMS = [
  {
    title: "Sabong Traditional Worldwide",
    meta: "Main pit feed",
    heat: 94,
    viewers: "12.4K",
    status: "Live now",
  },
  {
    title: "Sabong World Cup",
    meta: "Championship desk",
    heat: 78,
    viewers: "8.7K",
    status: "Opening rush",
  },
  {
    title: "Sabong Grand Finals",
    meta: "Night card",
    heat: 89,
    viewers: "15.1K",
    status: "Trending",
  },
];

const SIGNALS = [
  { label: "Active rooms", value: "4", icon: Radio },
  { label: "Peak crowd", value: "15.1K", icon: Users },
  { label: "Stream uptime", value: "98%", icon: ShieldCheck },
  { label: "Support desk", value: "24/7", icon: Headphones },
];

const MODULES = [
  {
    no: "01",
    title: "Ringside HD feeds",
    body: "A sharper view of the action with live room context, clean overlays, and fast switching when the card changes.",
    icon: Play,
  },
  {
    no: "02",
    title: "Heat-map lobby",
    body: "Spot which rooms are building momentum before you enter. Crowd pulse, status, and room intensity stay visible.",
    icon: Zap,
  },
  {
    no: "03",
    title: "Trusted account flow",
    body: "Clear entry points, account access, and support cues keep the experience focused from first tap to live room.",
    icon: ShieldCheck,
  },
];

const CARD_STACK = [
  {
    label: "Pre-card",
    title: "Scan tonight's rooms",
    body: "Compare active feeds, crowd heat, and room status before the first tap.",
  },
  {
    label: "Live card",
    title: "Follow the pit pulse",
    body: "Stay close to round movement with a lobby built for quick decisions on mobile.",
  },
  {
    label: "After round",
    title: "Switch cleanly",
    body: "Jump to the next active room without losing orientation or waiting on page reloads.",
  },
];

const TICKER = [
  "E-SABONG LIVE ROOMS",
  "HD BROADCAST",
  "CROWD HEAT",
  "FAST ENTRY",
  "MOBILE FIRST",
  "RESPONSIBLE PLAY 21+",
];

const COMPLIANCE = [
  "For eligible adults only",
  "Use only where legal and licensed",
  "Play responsibly",
];

export function Variant4() {
  const reduced = usePrefersReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const reveal = (i: number) =>
    reduced
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 + i * 0.075, duration: 0.74, ease },
        };

  const viewReveal = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: reduced
      ? { duration: 0 }
      : { delay: i * 0.07, duration: 0.72, ease },
  });

  return (
    <div
      className="relative min-h-screen overflow-x-clip"
      style={{
        backgroundColor: PALETTE.bg,
        color: PALETTE.ink,
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.09] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='170' height='170'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(30,79,168,0.38), transparent 30%), radial-gradient(circle at 84% 14%, rgba(217,31,38,0.26), transparent 28%), radial-gradient(circle at 48% 98%, rgba(242,193,78,0.18), transparent 34%), linear-gradient(180deg, #050505 0%, #070707 48%, #050505 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,193,78,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,193,78,0.09) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 78%)",
        }}
      />

      <header className="relative z-20 border-b border-[#f2c14e]/16 bg-[#050505]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1460px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" aria-label="Alopit home">
            <img src="/images/logo.png" alt="" className="h-8 w-auto" />
            <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#f5f5f5]">
              Alopit
            </span>
          </a>
          <div className="hidden items-center gap-6 text-[10px] font-bold uppercase text-[#d7d7d7]/58 md:flex">
            <a href="#rooms" className="transition hover:text-[#f2c14e]">
              Live rooms
            </a>
            <a href="#platform" className="transition hover:text-[#f2c14e]">
              Platform
            </a>
            <a href="#entry" className="transition hover:text-[#f2c14e]">
              Join
            </a>
          </div>
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 border border-[#f2c14e]/32 bg-[#f2c14e]/10 px-4 py-2 text-[10px] font-bold uppercase text-[#f2c14e] transition duration-300 hover:border-[#f2c14e]/70 hover:bg-[#f2c14e]/18 sm:inline-flex"
            style={{
              clipPath:
                "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            Account access
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section id="top" className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 -z-10 h-[640px] opacity-42"
            style={{
              background:
                "linear-gradient(120deg, rgba(30,79,168,0.32), transparent 32%, rgba(242,193,78,0.12) 52%, transparent 63%, rgba(217,31,38,0.34))",
            }}
          />
          <div className="mx-auto grid min-h-[calc(100svh-65px)] max-w-[1460px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_560px] lg:px-12 lg:py-20">
            <div className="max-w-4xl">
              <motion.div
                {...reveal(0)}
                className="inline-flex items-center gap-3 border border-[#1e4fa8]/70 bg-[#050505]/72 px-4 py-2 text-[10px] font-bold uppercase text-[#f2c14e] backdrop-blur-md"
                style={{
                  clipPath:
                    "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                }}
              >
                <span className="h-2 w-2 rounded-full bg-[#d91f26] shadow-[0_0_18px_rgba(217,31,38,0.8)]" />
                E-sabong command deck
              </motion.div>

              <h1
                className="mt-7 max-w-5xl text-[4.7rem] leading-[0.82] tracking-[-0.04em] text-[#f5f5f5] sm:text-[7rem] lg:text-[9.8rem]"
                style={{
                  fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                  textShadow:
                    "0 0 42px rgba(30,79,168,0.34), 0 18px 70px rgba(0,0,0,0.72)",
                }}
              >
                <span className="block overflow-hidden">
                  <motion.span {...reveal(1)} className="inline-block">
                    Follow the
                  </motion.span>
                </span>
                <span className="block overflow-hidden text-[#f2c14e]">
                  <motion.span {...reveal(2)} className="inline-block">
                    fight-night
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span {...reveal(3)} className="inline-block">
                    signal.
                  </motion.span>
                </span>
              </h1>

              <motion.p
                {...reveal(4)}
                className="mt-7 max-w-2xl text-[15px] leading-7 text-[#d7d7d7]/78 sm:text-lg sm:leading-8"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Alopit turns the e-sabong lobby into a live broadcast desk with HD room
                feeds, crowd heat, clear status, and fast entry for every active card.
              </motion.p>

              <motion.div
                {...reveal(5)}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 border border-[#f2c14e]/70 bg-[#f2c14e] px-7 py-3 text-sm font-bold uppercase text-[#050505] shadow-[0_22px_70px_rgba(242,193,78,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a00] active:scale-[0.98]"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  Join the live rooms
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </a>
                <a
                  href="#rooms"
                  className="inline-flex min-h-14 items-center justify-center gap-3 border border-[#1e4fa8]/70 bg-[#050505]/72 px-7 py-3 text-sm font-bold uppercase text-[#f5f5f5] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#f2c14e]/80 active:scale-[0.98]"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  <Radio className="h-4 w-4 text-[#1e4fa8]" />
                  View room board
                </a>
              </motion.div>

              <motion.div
                {...reveal(6)}
                className="mt-8 flex flex-wrap gap-2 text-[10px] font-bold uppercase text-[#d7d7d7]/58"
              >
                {COMPLIANCE.map((item) => (
                  <span
                    key={item}
                    className="border border-white/10 bg-white/[0.035] px-3 py-2"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              {...reveal(7)}
              className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
            >
              <div
                aria-hidden
                className="absolute -inset-8 rounded-full opacity-80 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(217,31,38,0.34), transparent 48%), radial-gradient(circle at 42% 62%, rgba(30,79,168,0.34), transparent 54%)",
                }}
              />

              <div className="relative overflow-hidden border border-[#f2c14e]/24 bg-[#080808]/88 shadow-[0_36px_120px_rgba(0,0,0,0.58)] backdrop-blur-xl">
                <div className="grid grid-cols-[1fr_auto] items-center border-b border-[#f2c14e]/16 px-4 py-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                      Live control
                    </p>
                    <p className="mt-1 text-[11px] uppercase text-[#d7d7d7]/50">
                      Manila room signal
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d91f26]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f2c14e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1e4fa8]" />
                  </div>
                </div>

                <div className="relative grid min-h-[480px] gap-0 lg:grid-cols-[1fr_210px]">
                  <div className="relative overflow-hidden border-b border-[#f2c14e]/16 lg:border-b-0 lg:border-r">
                    <img
                      src="/images/e-sabong-thumbnail.jpg"
                      alt="Live e-sabong arena"
                      className="absolute inset-0 h-full w-full object-cover opacity-46"
                      draggable={false}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.74) 58%, #050505 100%), linear-gradient(90deg, rgba(30,79,168,0.32), transparent 44%, rgba(217,31,38,0.3))",
                      }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f2c14e]/40"
                      animate={
                        reduced
                          ? undefined
                          : {
                              scale: [1, 1.08, 1],
                              opacity: [0.46, 0.82, 0.46],
                            }
                      }
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-x-5 bottom-5">
                      <div className="border border-white/12 bg-black/55 p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                              Featured room
                            </p>
                            <p
                              className="mt-2 text-3xl leading-none text-[#f5f5f5]"
                              style={{
                                fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                              }}
                            >
                              Grand finals desk
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className="text-5xl leading-none text-[#d91f26]"
                              style={{
                                fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                              }}
                            >
                              89
                            </p>
                            <p className="text-[10px] font-bold uppercase text-white/44">
                              heat
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-[#f2c14e]/14 lg:grid-cols-1">
                    {SIGNALS.map((signal) => (
                      <div key={signal.label} className="bg-[#070707] p-4">
                        <signal.icon className="h-5 w-5 text-[#f2c14e]" />
                        <p
                          className="mt-5 text-4xl leading-none text-[#f5f5f5]"
                          style={{
                            fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                          }}
                        >
                          {signal.value}
                        </p>
                        <p className="mt-1 text-[10px] font-bold uppercase text-[#d7d7d7]/48">
                          {signal.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="relative overflow-hidden border-y border-[#f2c14e]/16 bg-[#090909] py-4">
          <motion.div
            className="flex whitespace-nowrap"
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-8 inline-flex shrink-0 items-center gap-3 text-[11px] font-bold uppercase text-[#f5f5f5]/58"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#d91f26]" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <section id="rooms" className="mx-auto max-w-[1460px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                Live room board
              </p>
              <h2
                className="mt-4 max-w-xl text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                Market the room before the viewer enters.
              </h2>
              <p
                className="mt-5 max-w-md text-[15px] leading-7 text-[#d7d7d7]/74"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                V4 puts the e-sabong product benefits up front: room discovery, live
                crowd heat, HD context, and a direct path to the active broadcast.
              </p>
            </div>

            <div className="space-y-4">
              {LIVE_ROOMS.map((room, i) => (
                <motion.article
                  key={room.title}
                  {...viewReveal(i)}
                  className="group relative overflow-hidden border border-[#f2c14e]/16 bg-[#080808] p-5 transition duration-300 hover:border-[#f2c14e]/42 hover:bg-[#0d0d0d]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#1e4fa8] via-[#f2c14e] to-[#d91f26]"
                  />
                  <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="border border-[#d91f26]/40 bg-[#d91f26]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#d91f26]">
                          {room.status}
                        </span>
                        <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/44">
                          {room.meta}
                        </span>
                      </div>
                      <h3
                        className="mt-4 text-4xl leading-none text-[#f5f5f5] sm:text-5xl"
                        style={{
                          fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                        }}
                      >
                        {room.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:w-52">
                      <div className="border border-white/10 bg-black/30 p-3">
                        <p
                          className="text-4xl leading-none text-[#f2c14e]"
                          style={{
                            fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                          }}
                        >
                          {room.viewers}
                        </p>
                        <p className="text-[10px] font-bold uppercase text-white/42">
                          crowd
                        </p>
                      </div>
                      <div className="border border-white/10 bg-black/30 p-3">
                        <p
                          className="text-4xl leading-none text-[#1e4fa8]"
                          style={{
                            fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                          }}
                        >
                          {room.heat}
                        </p>
                        <p className="text-[10px] font-bold uppercase text-white/42">
                          heat
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 h-1.5 overflow-hidden bg-white/8">
                    <div
                      className="h-full bg-gradient-to-r from-[#1e4fa8] via-[#f2c14e] to-[#d91f26] transition-all duration-500 group-hover:brightness-125"
                      style={{ width: `${room.heat}%` }}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="border-y border-[#1e4fa8]/24 bg-[#070707]">
          <div className="mx-auto max-w-[1460px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                  Product story
                </p>
                <h2
                  className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                  style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                >
                  Built to sell the live e-sabong moment.
                </h2>
              </div>
              <p
                className="max-w-lg text-[15px] leading-7 text-[#d7d7d7]/72 lg:col-span-5"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                The page frames Alopit as a premium, mobile-first way to find the
                right room, understand the action, and enter without extra friction.
              </p>
            </div>

            <div className="mt-14 grid gap-px bg-[#f2c14e]/16 lg:grid-cols-3">
              {MODULES.map((module, i) => (
                <motion.article
                  key={module.no}
                  {...viewReveal(i)}
                  className="group min-h-[340px] bg-[#080808] p-6 transition duration-300 hover:bg-[#0e1018]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="text-6xl leading-none text-[#f2c14e]"
                      style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                    >
                      {module.no}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center border border-[#f2c14e]/32 bg-[#f2c14e]/10 text-[#f2c14e]">
                      <module.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3
                    className="mt-16 text-4xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {module.title}
                  </h3>
                  <p
                    className="mt-5 text-[15px] leading-7 text-[#d7d7d7]/72"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {module.body}
                  </p>
                  <div className="mt-7 h-px w-full origin-left scale-x-0 bg-[#d91f26] transition duration-500 group-hover:scale-x-100" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(145deg, transparent 0 31%, rgba(242,193,78,0.16) 31% 32%, transparent 32% 54%, rgba(30,79,168,0.26) 54% 55%, transparent 55% 100%)",
            }}
          />
          <div className="relative mx-auto max-w-[1460px]">
            <div className="grid gap-5 lg:grid-cols-3">
              {CARD_STACK.map((item, i) => (
                <motion.article
                  key={item.label}
                  {...viewReveal(i)}
                  className="relative min-h-[320px] overflow-hidden border border-[#f2c14e]/18 bg-black/52 p-6 backdrop-blur-sm"
                >
                  <span
                    className="absolute -right-5 top-3 text-[9rem] leading-none text-transparent"
                    style={{
                      fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                      WebkitTextStroke: "1px rgba(242,193,78,0.26)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                    {item.label}
                  </p>
                  <h3
                    className="mt-28 text-4xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-5 text-[15px] leading-7 text-[#d7d7d7]/72"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {item.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="entry" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="relative mx-auto max-w-[1460px] overflow-hidden border border-[#f2c14e]/24 bg-[#080808]">
            <img
              src="/images/e-sabong-thumbnail.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-18"
              draggable={false}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.9) 45%, rgba(5,5,5,0.68) 100%)",
              }}
            />
            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                  Final call
                </p>
                <h2
                  className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                  style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                >
                  Turn room traffic into live entries.
                </h2>
                <p
                  className="mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                  style={{ fontFamily: '"Fraunces", serif' }}
                >
                  A marketing page for e-sabong should make the value obvious in
                  seconds: see the active rooms, feel the room heat, and enter the
                  broadcast with confidence.
                </p>
              </div>
              <div className="flex flex-col items-start justify-end gap-4 lg:items-end">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 border border-[#d91f26]/70 bg-[#d91f26] px-7 py-3 text-sm font-bold uppercase text-white shadow-[0_22px_70px_rgba(217,31,38,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff3a2f] active:scale-[0.98]"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  Create account
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </a>
                <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/52">
                  Web access / No download / 21+
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#f2c14e]/16">
        <div className="mx-auto flex max-w-[1460px] flex-col items-start justify-between gap-5 px-5 py-9 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-7 w-auto opacity-85" />
            <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/54">
              Alopit / E-sabong live rooms
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase text-[#d7d7d7]/45">
            <span>2026 Alopit</span>
            <span>Eligible adults only</span>
            <span>Play responsibly</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
