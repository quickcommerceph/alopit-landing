import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../lib/constants";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

const PILLARS = [
  {
    no: "01",
    title: "Cinema-grade broadcast",
    body: "Every wing, every clash — captured in HD across multi-angle feeds tuned for the pit.",
  },
  {
    no: "02",
    title: "Crowd momentum, live",
    body: "Feel the roar before you place. Real-time crowd pulse turns every round into ringside.",
  },
  {
    no: "03",
    title: "One-tap into the ring",
    body: "No friction. No queues. From the menu to the main card in a single, deliberate tap.",
  },
];

const MARQUEE = [
  "EST · 2026",
  "MANILA",
  "PREMIUM E-SABONG",
  "BROADCAST DAILY",
  "RINGSIDE FROM ANYWHERE",
  "ALOPIT",
];

const FEATURES = [
  { no: "I", title: "Live rooms", body: "Multiple broadcasts running side-by-side." },
  { no: "II", title: "HD streams", body: "Crisp video, low latency, multi-angle." },
  { no: "III", title: "Crowd momentum", body: "See where the action is, in real time." },
  { no: "IV", title: "Fast entry", body: "Jump into a room in two taps." },
  { no: "V", title: "Mobile-first", body: "Designed for phones, scaled up cleanly." },
  { no: "VI", title: "Trusted uptime", body: "Premium streams, premium reliability." },
];

const STEPS = [
  { no: "I", title: "Browse the lobby", body: "Scan tonight's rooms by crowd and momentum." },
  { no: "II", title: "Pick your room", body: "Open the room card to preview details and odds." },
  { no: "III", title: "Tap join", body: "Enter the stream — no app install required." },
];

export function Variant2() {
  const reduced = usePrefersReducedMotion();

  const reveal = (i: number) =>
    reduced
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.15 + i * 0.09,
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-clip"
      style={{
        backgroundColor: "#0f0a0a",
        color: "#f3eee5",
        fontFamily: '"Fraunces", "Geist", serif',
      }}
    >
      {/* Grain + vignette layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(168,28,52,0.28), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(200,153,104,0.18), transparent 55%)",
        }}
      />

      {/* Top sliver: tiny editorial nav */}
      <header className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-center px-6 pt-8 sm:justify-between sm:px-10 lg:px-14">
        <a href="#top" className="flex items-center gap-3">
          <img src="/images/hero-img.svg" alt="Alopit" className="h-28 w-auto" />
        </a>
      </header>

      {/* HERO */}
      <section id="top" className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        <div className="grid items-end gap-10 pt-16 lg:grid-cols-12 lg:gap-6 lg:pt-24">
          {/* Left: editorial type */}
          <div className="lg:col-span-7 lg:pr-10">
            <motion.div
              {...reveal(0)}
              className="flex items-center justify-center gap-3 text-[10px] uppercase lg:justify-start"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: "0.34em",
                color: "#c89968",
              }}
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ background: "#e1334f" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: "#e1334f" }}
                />
              </span>
              <span>Premium E-Sabong</span>
              <span className="h-2 w-px" style={{ background: "#3a2c2c" }} />
              <span>Broadcast Daily</span>
            </motion.div>

            <h1
              className="mt-7 text-center font-light leading-[0.92] tracking-[-0.04em] text-[#f3eee5] lg:text-left"
              style={{
                fontFamily: '"Fraunces", serif',
                fontVariationSettings: '"opsz" 144, "SOFT" 50',
                fontSize: "clamp(3.6rem, 9vw, 9rem)",
              }}
            >
              <span className="block overflow-hidden">
                <motion.span {...reveal(1)} className="inline-block">
                  Where the
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  {...reveal(2)}
                  className="inline-block italic"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                    color: "#c89968",
                  }}
                >
                  pit
                </motion.span>
                <motion.span {...reveal(2)} className="inline-block">
                  &nbsp;meets the
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  {...reveal(3)}
                  className="inline-block italic"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                    color: "#e1334f",
                  }}
                >
                  pulse.
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...reveal(4)}
              className="mx-auto mt-10 max-w-xl text-center text-[1.05rem] leading-[1.7] sm:text-[1.15rem] lg:mx-0 lg:text-left"
              style={{
                fontFamily: '"Fraunces", serif',
                fontVariationSettings: '"opsz" 14',
                color: "#c8bcae",
              }}
            >
              HD streams. Real-time crowd momentum. One-tap entry into the night's
              hottest cards. Built for sabong fans who don't want to miss a single
              wing.
            </motion.p>

            <motion.div {...reveal(5)} className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row lg:items-start lg:justify-start">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 hover:gap-6 hover:-translate-y-0.5"
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  background: "linear-gradient(135deg, #e1334f 0%, #7a1422 100%)",
                  color: "#fff7ed",
                  boxShadow:
                    "0 26px 70px -20px rgba(225,51,79,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
              >
                <span>Step into the ring</span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
                  style={{ background: "rgba(255,247,237,0.16)" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>

            </motion.div>
          </div>

          {/* Right: portrait image with arch + glow */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] lg:max-w-none">
              {/* Halo */}
              <motion.div
                aria-hidden
                className="absolute inset-0 -m-10"
                animate={
                  reduced
                    ? undefined
                    : { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(225,51,79,0.45), transparent 55%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Arched frame */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderTopLeftRadius: "50% 40%",
                  borderTopRightRadius: "50% 40%",
                  borderBottomLeftRadius: "12px",
                  borderBottomRightRadius: "12px",
                  border: "1px solid rgba(200,153,104,0.3)",
                  boxShadow:
                    "inset 0 -120px 120px -60px rgba(15,10,10,0.95), 0 40px 80px -20px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(122,20,34,0.4) 0%, rgba(15,10,10,0.2) 50%, rgba(15,10,10,0.95) 100%)",
                  }}
                />
                <motion.img
                  src="/images/hero-img.svg"
                  alt="Live sabong arena"
                  draggable={false}
                  animate={reduced ? undefined : { y: [0, -12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full select-none object-cover object-center"
                  style={{ mixBlendMode: "luminosity", opacity: 0.92 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 30%, rgba(15,10,10,0.6) 100%)",
                  }}
                />
              </div>

              {/* Inner ring */}
              <div
                className="pointer-events-none absolute inset-3 opacity-60"
                style={{
                  borderTopLeftRadius: "50% 40%",
                  borderTopRightRadius: "50% 40%",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  border: "1px solid rgba(200,153,104,0.18)",
                }}
              />

              {/* Caption label */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: 0.95, duration: 0.6 }
                }
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-2.5"
                style={{
                  background: "rgba(15,10,10,0.85)",
                  border: "1px solid rgba(200,153,104,0.35)",
                  backdropFilter: "blur(8px)",
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.34em]"
                  style={{ color: "#c89968" }}
                >
                  The Arena
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee divider */}
      <div
        className="relative z-10 mt-28 overflow-hidden border-y py-5"
        style={{
          borderColor: "rgba(200,153,104,0.18)",
          background:
            "linear-gradient(90deg, rgba(122,20,34,0.18), rgba(15,10,10,0.0) 30%, rgba(15,10,10,0.0) 70%, rgba(122,20,34,0.18))",
        }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="mx-10 inline-flex shrink-0 items-center gap-10 text-[11px] uppercase"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: "0.36em",
                color: "#8a7e74",
              }}
            >
              {item}
              <span
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: "#c89968" }}
              />
            </span>
          ))}
        </motion.div>
      </div>

      {/* PILLARS */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-28 sm:px-10 lg:px-14 lg:py-36">
        <div className="grid gap-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: "0.34em",
                color: "#c89968",
              }}
            >
              § The proposition
            </p>
            <h2
              className="mt-5 font-light leading-[0.95] tracking-[-0.03em]"
              style={{
                fontFamily: '"Fraunces", serif',
                fontVariationSettings: '"opsz" 144, "SOFT" 60',
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                color: "#f3eee5",
              }}
            >
              An arena{" "}
              <span
                className="italic"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: "#c89968",
                }}
              >
                in your pocket.
              </span>
            </h2>
          </div>

          <div className="grid gap-px lg:col-span-8 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.no}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                }
                className="group relative flex flex-col gap-5 p-7 transition-colors duration-300 hover:bg-[rgba(200,153,104,0.04)]"
                style={{ border: "1px solid rgba(200,153,104,0.14)" }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[11px] uppercase"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      letterSpacing: "0.32em",
                      color: "#c89968",
                    }}
                  >
                    {p.no}
                  </span>
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      letterSpacing: "0.3em",
                      color: "#6b5e54",
                    }}
                  >
                    Feature
                  </span>
                </div>
                <h3
                  className="text-[1.7rem] leading-[1.05] tracking-[-0.02em]"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings: '"opsz" 72, "SOFT" 50',
                    color: "#f3eee5",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.65]"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings: '"opsz" 14',
                    color: "#a89a8d",
                  }}
                >
                  {p.body}
                </p>
                <div
                  className="mt-auto h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: "#c89968" }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ALOPIT */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: "0.34em",
                color: "#c89968",
              }}
            >
              § Why Alopit
            </p>
            <h2
              className="mt-5 font-light leading-[0.95] tracking-[-0.03em]"
              style={{
                fontFamily: '"Fraunces", serif',
                fontVariationSettings: '"opsz" 144, "SOFT" 60',
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                color: "#f3eee5",
              }}
            >
              Built for sabong fans,{" "}
              <span
                className="italic"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: "#c89968",
                }}
              >
                end to end.
              </span>
            </h2>
            <p
              className="mt-7 max-w-md text-[15px] leading-[1.7]"
              style={{
                fontFamily: '"Fraunces", serif',
                fontVariationSettings: '"opsz" 14',
                color: "#a89a8d",
              }}
            >
              A focused product: live rooms, clear context, and the shortest
              path between watching and joining.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-16" style={{ background: "#c89968" }} />
              <span
                className="text-[10px] uppercase tracking-[0.34em]"
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: "#6b5e54",
                }}
              >
                Six chapters
              </span>
            </div>
          </div>

          <div className="grid gap-px sm:grid-cols-2 lg:col-span-8">
            {FEATURES.map((f, i) => (
              <motion.article
                key={f.no}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        delay: (i % 2) * 0.06 + Math.floor(i / 2) * 0.1,
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="group relative flex flex-col gap-4 p-7 transition-colors duration-300 hover:bg-[rgba(200,153,104,0.04)]"
                style={{ border: "1px solid rgba(200,153,104,0.14)" }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="italic"
                    style={{
                      fontFamily: '"Fraunces", serif',
                      fontVariationSettings:
                        '"opsz" 144, "SOFT" 100, "WONK" 1',
                      fontSize: "1.75rem",
                      color: "#c89968",
                      lineHeight: 0.9,
                    }}
                  >
                    {f.no}
                  </span>
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      letterSpacing: "0.3em",
                      color: "#6b5e54",
                    }}
                  >
                    Feature
                  </span>
                </div>
                <h3
                  className="mt-1 text-[1.45rem] leading-[1.1] tracking-[-0.02em]"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings: '"opsz" 72, "SOFT" 50',
                    color: "#f3eee5",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings: '"opsz" 14',
                    color: "#a89a8d",
                  }}
                >
                  {f.body}
                </p>
                <div
                  className="mt-auto h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: "#c89968" }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative z-10 border-y"
        style={{
          borderColor: "rgba(200,153,104,0.18)",
          background:
            "linear-gradient(180deg, rgba(15,10,10,0) 0%, rgba(26,15,16,0.6) 50%, rgba(15,10,10,0) 100%)",
        }}
      >
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
          <div className="mb-20 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p
                className="text-[10px] uppercase"
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: "0.34em",
                  color: "#c89968",
                }}
              >
                § How it works
              </p>
              <h2
                className="mt-5 font-light leading-[0.95] tracking-[-0.035em]"
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontVariationSettings: '"opsz" 144, "SOFT" 60',
                  fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
                  color: "#f3eee5",
                }}
              >
                From lobby to live in{" "}
                <span
                  className="italic"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                    color: "#e1334f",
                  }}
                >
                  three taps.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <p
                className="text-[15px] leading-[1.7]"
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontVariationSettings: '"opsz" 14',
                  color: "#a89a8d",
                }}
              >
                Pick a room, hit join, and you're in. No friction. No queues.
                No waiting room theatrics.
              </p>
            </div>
          </div>

          <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.no}
                initial={reduced ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        delay: i * 0.15,
                        duration: 0.95,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="group relative pt-10"
                style={{ borderTop: "1px solid rgba(200,153,104,0.3)" }}
              >
                <span
                  aria-hidden
                  className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full"
                  style={{
                    background: "#0f0a0a",
                    boxShadow: "inset 0 0 0 1px #c89968, 0 0 0 4px #0f0a0a",
                  }}
                />
                <p
                  className="text-[10px] uppercase"
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    letterSpacing: "0.34em",
                    color: "#c89968",
                  }}
                >
                  Step · {String(i + 1).padStart(2, "0")}
                </p>

                <div
                  className="mt-2 select-none italic transition-all duration-700 group-hover:translate-x-1"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings:
                      '"opsz" 144, "SOFT" 100, "WONK" 1',
                    fontSize: "clamp(6rem, 9vw, 9rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(200,153,104,0.55)",
                    fontWeight: 300,
                    lineHeight: 0.82,
                  }}
                >
                  {s.no}
                </div>

                <h3
                  className="mt-6 text-[1.9rem] leading-[1.05] tracking-[-0.02em]"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings: '"opsz" 72, "SOFT" 50',
                    color: "#f3eee5",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-4 max-w-xs text-[15px] leading-[1.7]"
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontVariationSettings: '"opsz" 14',
                    color: "#a89a8d",
                  }}
                >
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="relative z-10 mx-auto max-w-[1100px] px-6 py-24 text-center sm:px-10">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }
          className="leading-[1.15] tracking-[-0.025em]"
          style={{
            fontFamily: '"Fraunces", serif',
            fontVariationSettings: '"opsz" 144, "SOFT" 80',
            fontSize: "clamp(2rem, 4.4vw, 3.8rem)",
            color: "#f3eee5",
            fontWeight: 300,
          }}
        >
          <span
            className="italic"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              color: "#c89968",
            }}
          >
            “
          </span>
          Cinematic, curated, and just a tap away —{" "}
          <span
            className="italic"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              color: "#c89968",
            }}
          >
            Alopit
          </span>{" "}
          is what happens when the pit comes home with you.
          <span
            className="italic"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              color: "#c89968",
            }}
          >
            ”
          </span>
        </motion.p>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-28 sm:px-10 lg:px-14">
        <div
          className="relative isolate overflow-hidden p-10 sm:p-16 lg:p-24"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(225,51,79,0.35), transparent 70%), linear-gradient(180deg, #1a0f10 0%, #0f0a0a 100%)",
            border: "1px solid rgba(200,153,104,0.25)",
          }}
        >
          {/* corner cuts */}
          <span
            aria-hidden
            className="absolute left-4 top-4 h-5 w-5"
            style={{
              borderTop: "1px solid #c89968",
              borderLeft: "1px solid #c89968",
            }}
          />
          <span
            aria-hidden
            className="absolute right-4 top-4 h-5 w-5"
            style={{
              borderTop: "1px solid #c89968",
              borderRight: "1px solid #c89968",
            }}
          />
          <span
            aria-hidden
            className="absolute left-4 bottom-4 h-5 w-5"
            style={{
              borderBottom: "1px solid #c89968",
              borderLeft: "1px solid #c89968",
            }}
          />
          <span
            aria-hidden
            className="absolute right-4 bottom-4 h-5 w-5"
            style={{
              borderBottom: "1px solid #c89968",
              borderRight: "1px solid #c89968",
            }}
          />

          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p
                className="text-[10px] uppercase"
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: "0.34em",
                  color: "#c89968",
                }}
              >
                § Today's card · Live now
              </p>
              <h2
                className="mt-6 leading-[0.92] tracking-[-0.035em]"
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontVariationSettings: '"opsz" 144, "SOFT" 60',
                  fontSize: "clamp(3rem, 6.5vw, 6rem)",
                  fontWeight: 300,
                  color: "#f3eee5",
                }}
              >
                The roar is{" "}
                <span
                  className="italic"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                    color: "#e1334f",
                  }}
                >
                  already starting.
                </span>
              </h2>
              <p
                className="mt-6 max-w-xl text-[15px] leading-[1.7]"
                style={{
                  fontFamily: '"Fraunces", serif',
                  fontVariationSettings: '"opsz" 14',
                  color: "#a89a8d",
                }}
              >
                No sign-up theatrics, no waiting room. Just a single tap into the
                rooms our regulars are filling today.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 rounded-full px-10 py-6 text-[13px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1"
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  background: "#f3eee5",
                  color: "#0f0a0a",
                  boxShadow:
                    "0 30px 80px -20px rgba(243,238,229,0.35), inset 0 -2px 0 rgba(0,0,0,0.1)",
                }}
              >
                <span>Enter the arena</span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
                  style={{ background: "#0f0a0a", color: "#f3eee5" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: "#8a7e74",
                }}
              >
                Free · Web · No download
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 border-t"
        style={{ borderColor: "rgba(200,153,104,0.15)" }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10 lg:px-14">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-6 w-auto opacity-80" />
            <span
              className="text-[11px] uppercase tracking-[0.32em]"
              style={{ fontFamily: '"IBM Plex Mono", monospace', color: "#8a7e74" }}
            >
              Alopit · MNL
            </span>
          </div>
          <div
            className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: '"IBM Plex Mono", monospace', color: "#6b5e54" }}
          >
            <span>© 2026 Alopit</span>
            <span className="h-3 w-px" style={{ background: "#3a2c2c" }} />
            <span>Play responsibly · 21+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
