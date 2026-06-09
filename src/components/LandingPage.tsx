import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Headphones,
  Play,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../lib/constants";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

const MARQUEE = [
  "LIVE ACTION",
  "REAL PASSION",
  "PREMIUM E-SABONG",
  "RINGSIDE FROM ANYWHERE",
  "ONE COMMUNITY",
  "BROADCAST DAILY",
  "ALOPIT",
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Safe & secure",
    body: "Trusted room entry and clear live context.",
  },
  {
    icon: Zap,
    title: "Fast & fair",
    body: "Low-friction access into live action.",
  },
  {
    icon: Trophy,
    title: "Big rooms",
    body: "Find where the crowd is moving today.",
  },
  {
    icon: Headphones,
    title: "Live support",
    body: "Help is close when the card is running.",
  },
];

const PILLARS = [
  {
    no: "01",
    title: "Cinema-grade broadcast",
    body: "Every wing, every clash, captured in HD across multi-angle feeds tuned for the pit.",
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

const FEATURES = [
  { no: "I", title: "HD streams", body: "Crisp video, low latency, multi-angle." },
  { no: "II", title: "Crowd momentum", body: "See where the action is, in real time." },
  { no: "III", title: "Fast entry", body: "Jump into a room in two taps." },
  { no: "IV", title: "Mobile-first", body: "Designed for phones, scaled up cleanly." },
  { no: "V", title: "Trusted uptime", body: "Premium streams, premium reliability." },
];

const STEPS = [
  { no: "I", title: "Browse the lobby", body: "Scan tonight's rooms by crowd and momentum." },
  { no: "II", title: "Pick your room", body: "Open the room card to preview details and odds." },
  { no: "III", title: "Tap join", body: "Enter the stream with no app install required." },
];

const ROOM_BOARD = [
  {
    title: "Sabong Traditional",
    state: "Live now",
  },
];

const PROMOS = [
  { src: "/images/banner-1.png", alt: "Alopit banner 1" },
  { src: "/images/banner-2.png", alt: "Alopit banner 2" },
  { src: "/images/banner-3.png", alt: "Alopit banner 3" },
  { src: "/images/banner-4.png", alt: "Alopit banner 4" },
  { src: "/images/banner-5.png", alt: "Alopit banner 5" },
];

const promoVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0.5 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0.5 }),
};

export function LandingPage() {
  const reduced = usePrefersReducedMotion();

  const [[promoIndex, promoDir], setPromo] = useState<[number, number]>([0, 0]);
  const goToPromo = (i: number) => setPromo(([cur]) => [i, i >= cur ? 1 : -1]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setPromo(([cur]) => [(cur + 1) % PROMOS.length, 1]),
      5000,
    );
    return () => clearInterval(id);
  }, [reduced, promoIndex]);

  const reveal = (i: number) =>
    reduced
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.12 + i * 0.08,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };

  const viewReveal = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: reduced
      ? { duration: 0 }
      : {
          delay: i * 0.08,
          duration: 0.78,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
  });

  return (
    <div
      className="relative min-h-screen overflow-x-clip"
      style={{
        backgroundColor: "#050505",
        color: "#f5f5f5",
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <span className="hidden text-[10px] font-bold uppercase text-[#f2c14e] sm:inline">
            Premium E-Sabong
          </span>
          <a href="#top" className="mx-auto text-[11px] font-bold uppercase tracking-[0.42em] text-[#f5f5f5] sm:mx-0" aria-label="Alopit home">
            Alopit
          </a>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5f5f5]/75 transition hover:text-[#f2c14e]"
            >
              Login
            </a>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 border border-[#f2c14e]/60 bg-[#f2c14e] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#050505] transition duration-300 hover:bg-[#ff7a00] hover:text-white active:scale-[0.98]"
              style={{
                clipPath:
                  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              }}
            >
              Register
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="top" className="relative isolate min-h-[88svh] overflow-hidden">
          <img
            src="/images/e-sabong-thumbnail.jpg"
            alt="Live sabong arena"
            className="absolute inset-0 -z-30 h-full w-full object-cover object-[58%_center]"
            draggable={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.78) 38%, rgba(5,5,5,0.35) 62%, rgba(5,5,5,0.88) 100%), linear-gradient(180deg, rgba(5,5,5,0.64) 0%, rgba(5,5,5,0.18) 46%, #050505 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-80"
            style={{
              background:
                "linear-gradient(115deg, transparent 0%, rgba(30,79,168,0.32) 18%, transparent 24%, transparent 70%, rgba(217,31,38,0.34) 78%, transparent 84%), repeating-linear-gradient(115deg, transparent 0 56px, rgba(242,193,78,0.08) 57px 58px, transparent 59px 132px)",
            }}
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e4fa8] via-[#f2c14e] to-[#d91f26]"
          />

          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-12">
            <motion.div
              aria-hidden
              initial={reduced ? false : { opacity: 0, scale: 0.86, y: 24 }}
              animate={
                reduced
                  ? { opacity: 0.82, scale: 1, y: 0 }
                  : {
                      opacity: [0.78, 0.94, 0.78],
                      scale: [1, 1.035, 1],
                      y: [0, -16, 0],
                    }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 7.2, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
                  }
              }
              className="pointer-events-none relative mx-auto mb-6 w-[min(72vw,560px)] sm:mb-8 lg:mb-10"
            >
              <motion.div
                className="absolute inset-[9%] rounded-full"
                animate={
                  reduced
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 50px rgba(30,79,168,0.28), 0 0 90px rgba(217,31,38,0.18)",
                          "0 0 70px rgba(242,193,78,0.26), 0 0 130px rgba(30,79,168,0.24)",
                          "0 0 50px rgba(30,79,168,0.28), 0 0 90px rgba(217,31,38,0.18)",
                        ],
                      }
                }
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src="/images/hero-img.svg"
                alt=""
                className="relative w-full select-none object-contain drop-shadow-[0_0_34px_rgba(217,31,38,0.42)]"
                draggable={false}
              />
            </motion.div>

            <div className="grid items-end gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="max-w-5xl">
                <motion.div
                  {...reveal(0)}
                  className="inline-flex items-center gap-3 border border-[#f2c14e]/35 bg-[#050505]/70 px-4 py-2 text-[10px] font-bold uppercase text-[#f2c14e] backdrop-blur-md"
                  style={{
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d91f26] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d91f26]" />
                  </span>
                  Broadcast daily · Manila
                </motion.div>

                <h1
                  className="mt-6 max-w-5xl text-6xl leading-none text-[#f5f5f5] sm:text-7xl lg:text-9xl"
                  style={{
                    fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                    textShadow:
                      "0 0 30px rgba(217,31,38,0.42), 0 18px 60px rgba(0,0,0,0.55)",
                  }}
                >
                  <span className="block overflow-hidden">
                    <motion.span {...reveal(1)} className="inline-block">
                      Where the pit
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span {...reveal(2)} className="inline-block text-[#f2c14e]">
                      meets the pulse.
                    </motion.span>
                  </span>
                </h1>

                <motion.p
                  {...reveal(3)}
                  className="mt-6 max-w-2xl text-base leading-7 text-[#d7d7d7] sm:text-lg"
                  style={{ fontFamily: '"Fraunces", serif' }}
                >
                  HD streams. Real-time crowd momentum. One-tap entry into the night's
                  hottest cards. Built for sabong fans who don't want to miss a single
                  wing.
                </motion.p>

                <motion.div {...reveal(4)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 border border-[#ff7a00]/60 bg-[#d91f26] px-7 py-3 text-sm font-bold uppercase text-white shadow-[0_22px_60px_rgba(217,31,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff3a2f] active:scale-[0.98]"
                    style={{
                      clipPath:
                        "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    }}
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Step into the ring
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </motion.div>
              </div>

            
            </div>

            <motion.div
              {...reveal(6)}
              className="mt-8 grid border border-[#f2c14e]/24 bg-black/58 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
            >
              {TRUST.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 border-[#f2c14e]/14 px-4 py-4 even:border-t sm:even:border-t-0 sm:[&:not(:last-child)]:border-r"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#f2c14e]/40 bg-[#f2c14e]/10 text-[#f2c14e]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase text-[#f5f5f5]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-4 text-[#d7d7d7]/72">
                      {item.body}
                    </span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="relative overflow-hidden border-y border-[#f2c14e]/16 bg-[#090909] py-4">
          <motion.div
            className="flex whitespace-nowrap"
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
              {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="mx-8 inline-flex shrink-0 items-center text-[11px] font-bold uppercase text-[#f5f5f5]/58"
                >
                  {item}
                </span>
              ))}
            </motion.div>
        </div>

        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative overflow-hidden border border-[#f2c14e]/18 bg-[#070707] cursor-pointer"
            style={{
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            }}
          >
            <div className="relative" style={{ aspectRatio: "1365 / 455" }}>
               <AnimatePresence initial={false} custom={promoDir}>
                  <motion.img
                    key={promoIndex}
                    src={PROMOS[promoIndex].src}
                    alt={PROMOS[promoIndex].alt}
                    width={1365}
                    height={455}
                    custom={promoDir}
                    variants={promoVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.35 },
                          }
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                </AnimatePresence>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(5,5,5,0.55) 0%, transparent 22%, transparent 78%, rgba(5,5,5,0.55) 100%), linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.75) 100%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#1e4fa8] via-[#f2c14e] to-[#d91f26]"
              />
            </div>
          </a>

          <div className="mt-5 flex items-center justify-center gap-3">
            {PROMOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPromo(i)}
                aria-label={`Show promotion ${i + 1}`}
                aria-current={i === promoIndex}
                className="group flex h-10 items-center justify-center px-1"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === promoIndex
                      ? "w-12 bg-[#f2c14e] shadow-[0_0_14px_rgba(242,193,78,0.65)]"
                      : "w-2.5 bg-white/45 group-hover:w-5 group-hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-20 pt-10">
          <div className="grid gap-9 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                The proposition
              </p>
              <h2
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                An arena{" "}
                <span className="text-[#ff7a00]">in your pocket.</span>
              </h2>
            </div>

            <div className="grid gap-px bg-[#f2c14e]/16 lg:col-span-8 lg:grid-cols-3">
              {PILLARS.map((pillar, i) => (
                <motion.article
                  key={pillar.no}
                  {...viewReveal(i)}
                  className="group relative min-h-72 bg-[#080808] p-6 transition duration-300 hover:bg-[#100b0b]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-[#f2c14e]">
                      {pillar.no}
                    </span>
                    <span className="h-px w-12 bg-[#d91f26]" />
                  </div>
                  <h3
                    className="mt-8 text-4xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="mt-5 text-[15px] leading-7 text-[#d7d7d7]/76"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {pillar.body}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-[#1e4fa8] via-[#f2c14e] to-[#d91f26] transition duration-500 group-hover:scale-x-100" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="rooms" className="border-y border-[#1e4fa8]/24 bg-[#070707]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                Why Alopit
              </p>
              <h2
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                Built for sabong fans,{" "}
                <span className="text-[#d91f26]">end to end.</span>
              </h2>
              <p
                className="mt-6 max-w-md text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                A focused product: clear context, and the shortest path
                between watching and joining.
              </p>

              <div className="mt-10 space-y-3">
                {ROOM_BOARD.map((room, i) => (
                  <motion.div
                    key={room.title}
                    {...viewReveal(i)}
                    className="grid grid-cols-[1fr_auto] gap-4 border border-white/10 bg-black/34 p-4"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                        Alopit Arena · {room.state}
                      </p>
                      <p className="mt-1 text-sm font-bold uppercase text-[#f5f5f5]">
                        {room.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-px sm:grid-cols-2 lg:col-span-7">
              {FEATURES.map((feature, i) => (
                <motion.article
                  key={feature.no}
                  {...viewReveal(i)}
                  className="group bg-[#080808] p-6 transition duration-300 hover:bg-[#0f1118]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-4xl leading-none text-[#f2c14e]"
                      style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                    >
                      {feature.no}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-white/32">
                      Feature
                    </span>
                  </div>
                  <h3
                    className="mt-7 text-3xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="mt-4 text-[14px] leading-6 text-[#d7d7d7]/72"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {feature.body}
                  </p>
                  <div className="mt-7 h-px w-full origin-left scale-x-0 bg-[#d91f26] transition duration-500 group-hover:scale-x-100" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, transparent 0 35%, rgba(30,79,168,0.25) 35% 36%, transparent 36% 58%, rgba(217,31,38,0.28) 58% 59%, transparent 59% 100%)",
            }}
          />
          <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                  How it works
                </p>
                <h2
                  className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                  style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                >
                  From lobby to live in{" "}
                  <span className="text-[#d91f26]">three taps.</span>
                </h2>
              </div>
              <p
                className="max-w-lg text-[15px] leading-7 text-[#d7d7d7]/76 lg:col-span-5"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Pick a room, hit join, and you're in. No friction. No queues. No
                waiting room theatrics.
              </p>
            </div>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {STEPS.map((step, i) => (
                <motion.article
                  key={step.no}
                  {...viewReveal(i)}
                  className="relative min-h-80 border border-[#f2c14e]/20 bg-black/58 p-6"
                >
                  <span
                    className="absolute right-5 top-5 text-8xl leading-none text-transparent"
                    style={{
                      fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                      WebkitTextStroke: "1px rgba(242,193,78,0.42)",
                    }}
                  >
                    {step.no}
                  </span>
                  <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-24 text-4xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-5 text-[15px] leading-7 text-[#d7d7d7]/76"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {step.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 py-20 text-center sm:px-8 lg:py-28">
          <motion.p
            {...viewReveal(0)}
            className="text-5xl leading-tight text-[#f5f5f5] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
          >
            <span className="text-[#f2c14e]">Live action.</span>{" "}
            <span className="text-[#d91f26]">Real passion.</span> Alopit is what
            happens when the pit comes home with you.
          </motion.p>
        </section>

        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden border border-[#f2c14e]/24 bg-[#080808]">
            <img
              src="/images/e-sabong-thumbnail.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              draggable={false}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.88) 48%, rgba(5,5,5,0.64) 100%)",
              }}
            />
            <div className="relative grid items-end gap-8 p-6 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:p-16">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                  Live now
                </p>
                <h2
                  className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                  style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                >
                  The roar is{" "}
                  <span className="text-[#d91f26]">already starting.</span>
                </h2>
                <p
                  className="mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                  style={{ fontFamily: '"Fraunces", serif' }}
                >
                  No sign-up theatrics, no waiting room. Just a single tap into the
                  rooms our regulars are filling today.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 border border-[#f2c14e]/60 bg-[#f2c14e] px-7 py-3 text-sm font-bold uppercase text-[#050505] shadow-[0_22px_60px_rgba(242,193,78,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a00] active:scale-[0.98]"
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  Enter the arena
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </a>
                <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/52">
                  Free · Web · No download
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#f2c14e]/16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 px-5 py-9 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-7 w-auto opacity-85" />
            <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/54">
              Alopit · MNL
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase text-[#d7d7d7]/45">
            <span>© 2026 Alopit</span>
            <span>Play responsibly · 21+</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
