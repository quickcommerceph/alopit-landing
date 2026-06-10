import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Headphones,
  Play,
  ShieldCheck,
  Smartphone,
  Trophy,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../lib/constants";
import { openLiveChat } from "../lib/liveChat";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

const MARQUEE = [
  "LIVE ACTION",
  "REAL PASSION",
  "PREMIUM E-SABONG",
  "RINGSIDE FROM ANYWHERE",
  "ONE COMMUNITY",
  "BROADCAST DAILY",
  "ALOPIT",
  "MAS SIMPLE",
  "MAS CONVENIENT",
  "ORIGINAL LIVE FEED",
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Safe & secure",
    body: "Trusted room entry and reliable system.",
  },
  {
    icon: Zap,
    title: "Self cash-in & out",
    body: "Fast deposits and withdrawals on your terms.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    body: "Designed for phones, scaled up cleanly.",
  },
  {
    icon: Headphones,
    title: "Live support",
    body: "Help is close when you need it most.",
    liveChat: true,
  },
];

const FEATURES = [
  { no: "I", title: "Original live feed", body: "Crystal-clear HD streams with low latency. Not all live viewing is created equal." },
  { no: "II", title: "Self-service transactions", body: "Cash in and cash out anytime — no manual process, no waiting." },
  { no: "III", title: "Multiple payment channels", body: "GCash, Maya, and QRPH-supported banks all in one platform." },
  { no: "IV", title: "Smooth viewing", body: "A dedicated platform environment built for uninterrupted streaming." },
  { no: "V", title: "Exclusive community", body: "Invite players, grow your network, and unlock more rewards together." },
];

const ROOM_BOARD = [
  {
    title: "Sabong Traditional",
    state: "Live now",
  },
];

const PAYMENTS = [
  {
    name: "GCash",
    body: "Instant cash-in and cash-out via GCash wallet.",
    color: "#1e4fa8",
    logo: "/images/gcash-logo.svg",
  },
  {
    name: "Maya",
    body: "Seamless transactions with Maya support.",
    color: "#d91f26",
    logo: "/images/maya-logo.svg",
  },
  {
    name: "QRPH Banks",
    body: "Supported bank transfers via QRPH nationwide.",
    color: "#f2c14e",
    logo: "/images/qrph-logo.svg",
  },
];

const COMMUNITY_PERKS = [
  {
    icon: Users,
    step: "01",
    title: "Invite Easily",
    body: "Simple tools to invite more players in just a few clicks.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Grow Faster",
    body: "More invites, stronger community. Build your network.",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Earn Rewards",
    body: "Grow with your players and unlock more opportunities.",
  },
];

const AGENT_TIERS = [
  {
    tier: "Bronze",
    headerGradient: "linear-gradient(135deg, #6d4c41, #33211a)",
    accent: "#a87850",
    commission: "2%",
    badge: null as string | null,
    features: [
      { text: "GGR or Turnover-based commissions", included: true },
      { text: "Separate commission wallet", included: true },
      { text: "Transfer-to-balance anytime", included: true },
      { text: "Can create downline agents", included: false },
      { text: "Deposit/Withdraw to downlines", included: false },
    ],
    createdBy: "Gold, Silver, or Master agent",
  },
  {
    tier: "Gold",
    headerGradient: "linear-gradient(135deg, #b8860b, #5c4a1e)",
    accent: "#f5d880",
    commission: "5%",
    badge: "Recommended" as string | null,
    features: [
      { text: "GGR or Turnover-based commissions", included: true },
      { text: "Separate commission wallet", included: true },
      { text: "Transfer-to-balance anytime", included: true },
      { text: "Create Silver & Bronze agents", included: true },
      { text: "Full deposit/withdraw to downlines", included: true },
    ],
    createdBy: "Master agent only",
  },
  {
    tier: "Silver",
    headerGradient: "linear-gradient(135deg, #4a5568, #1a2332)",
    accent: "#94a8bc",
    commission: "3.5%",
    badge: null as string | null,
    features: [
      { text: "GGR or Turnover-based commissions", included: true },
      { text: "Separate commission wallet", included: true },
      { text: "Transfer-to-balance anytime", included: true },
      { text: "Create Bronze agents", included: true },
      { text: "Deposit/Withdraw to downlines", included: false },
    ],
    createdBy: "Gold or Master agent",
  },
];

const AGENT_HIERARCHY = [
  { label: "Master", color: "#d91f26" },
  { label: "Gold", color: "#b8860b" },
  { label: "Silver", color: "#4a5568" },
  { label: "Bronze", color: "#6d4c41" },
];

const PROMOS = [
  { src: "/images/banner-1.png", alt: "Alopit banner 1" },
  { src: "/images/banner-2.png", alt: "Alopit banner 2" },
  { src: "/images/banner-3.png", alt: "Alopit banner 3" },
  { src: "/images/banner-4.png", alt: "Alopit banner 4" },
  { src: "/images/banner-5.png", alt: "Alopit banner 5" },
  { src: "/images/banner-6.png", alt: "Alopit banner 6" },
  { src: "/images/banner-7.png", alt: "Alopit banner 7" },
  { src: "/images/banner-8.png", alt: "Alopit banner 8" },
  { src: "/images/banner-9.png", alt: "Alopit banner 9" },
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
                  Original live feeds. Self-service transactions. GCash, Maya, QRPH
                  — all in one platform. A premium experience built for sabong fans
                  who demand more.
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
              {TRUST.map((item) => {
                const isLiveSupport = "liveChat" in item && item.liveChat;
                const content = (
                  <>
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
                  </>
                );

                const className =
                  "flex items-center gap-3 border-[#f2c14e]/14 px-4 py-4 even:border-t sm:even:border-t-0 sm:[&:not(:last-child)]:border-r";

                if (isLiveSupport) {
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={openLiveChat}
                      className={`${className} text-left transition hover:bg-[#f2c14e]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f2c14e]`}
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <div key={item.title} className={className}>
                    {content}
                  </div>
                );
              })}
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
                Original feeds, smooth viewing, self-service transactions —
                everything you need in one platform.
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

        <section className="border-y border-[#1e4fa8]/20 bg-[#080808]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="text-center">
              <motion.div {...viewReveal(0)} className="inline-flex items-center gap-3">
                <Wallet className="h-5 w-5 text-[#f2c14e]" />
                <span className="text-[10px] font-bold uppercase text-[#f2c14e]">
                  Convenience Matters
                </span>
              </motion.div>
              <motion.h2
                {...viewReveal(1)}
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                Self-service{" "}
                <span className="text-[#f2c14e]">transactions.</span>
              </motion.h2>
              <motion.p
                {...viewReveal(2)}
                className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Smooth deposits, fast withdrawals, multiple payment channels — all
                in one reliable platform. No manual process, no waiting.
              </motion.p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {PAYMENTS.map((pm, i) => (
                <motion.div
                  key={pm.name}
                  {...viewReveal(i)}
                  className="relative overflow-hidden border border-white/8 bg-[#050505] p-8 transition duration-300 hover:border-white/16"
                  style={{
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: pm.color }}
                  />
                  <span
                    className="flex h-20 w-20 items-center justify-center border p-3"
                    style={{
                      borderColor: pm.color + "30",
                      backgroundColor: pm.color + "12",
                    }}
                  >
                    <img
                      src={pm.logo}
                      alt={pm.name}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <p
                    className="mt-5 text-2xl font-bold text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {pm.name}
                  </p>
                  <p
                    className="mt-3 text-[13px] leading-6 text-[#d7d7d7]/68"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {pm.body}
                  </p>
                  <div className="mt-6 flex items-center gap-2 border-t border-white/6 pt-4">
                    <span
                      className="h-1.5 w-6 rounded-full"
                      style={{ backgroundColor: pm.color }}
                    />
                    <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/52">
                      Supported
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...viewReveal(3)}
              className="mt-10 flex flex-wrap items-center justify-center gap-8 text-[10px] font-bold uppercase text-[#d7d7d7]/48"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1e4fa8]" />
                Self Cash-In
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d91f26]" />
                Self Cash-Out
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2c14e]" />
                Fast Processing
              </span>
            </motion.div>
          </div>
        </section>


        <section className="border-y border-[#f2c14e]/16 bg-[#070707]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="text-center">
              <motion.p {...viewReveal(0)} className="text-[10px] font-bold uppercase text-[#f2c14e]">
                Community
              </motion.p>
              <motion.h2
                {...viewReveal(1)}
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                Grow with{" "}
                <span className="text-[#f2c14e]">less stress.</span>
              </motion.h2>
              <motion.p
                {...viewReveal(2)}
                className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                When the process is simpler, it's easier to focus on building
                your community. Invite more players, grow together.
              </motion.p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {COMMUNITY_PERKS.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  {...viewReveal(i)}
                  className="relative border border-[#f2c14e]/16 bg-[#050505] p-8"
                  style={{
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-3xl leading-none text-[#f2c14e]/32"
                      style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                    >
                      {perk.step}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#f2c14e]/30 bg-[#f2c14e]/8 text-[#f2c14e]">
                      <perk.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3
                    className="mt-6 text-2xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {perk.title}
                  </h3>
                  <p
                    className="mt-3 text-[13px] leading-6 text-[#d7d7d7]/68"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {perk.body}
                  </p>
                  {i < COMMUNITY_PERKS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[#f2c14e]/32 sm:block"
                    >
                      <ArrowUpRight className="h-5 w-5 -rotate-0" />
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              {...viewReveal(3)}
              className="mt-12 text-center"
            >
              <a
                href="https://wkf.ms/4uzhYLR"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-[#f2c14e]/60 bg-[#f2c14e] px-7 py-3 text-sm font-bold uppercase text-[#050505] shadow-[0_22px_60px_rgba(242,193,78,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a00] active:scale-[0.98]"
                style={{
                  clipPath:
                    "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                }}
              >
                Invite more players
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <p
                className="mt-4 text-[12px] text-[#d7d7d7]/48"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Build a stronger community together
              </p>
            </motion.div>
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#1e4fa8] via-[#f2c14e] to-[#d91f26]"
          />
        </section>

        <section className="relative border-y border-[#f2c14e]/16 bg-[#070707]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="text-center">
              <motion.p {...viewReveal(0)} className="text-[10px] font-bold uppercase text-[#f2c14e]">
                Agent Partner Program
              </motion.p>
              <motion.h2
                {...viewReveal(1)}
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                Grow your network,{" "}
                <span className="text-[#f2c14e]">earn real commissions.</span>
              </motion.h2>
              <motion.p
                {...viewReveal(2)}
                className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Become an Alopit agent and earn commissions from downline betting
                turnover across Sabong Arena. Choose GGR or Turnover-based commissions — your network, your earnings.
              </motion.p>
            </div>

            <div className="mt-14 grid items-end gap-5 lg:grid-cols-3">
              {AGENT_TIERS.map((t, i) => (
                <motion.div
                  key={t.tier}
                  {...viewReveal(i)}
                  className={`relative overflow-hidden border ${
                    t.badge
                      ? "border-[#f5d880]/30 lg:-mt-6 shadow-[0_20px_80px_rgba(184,134,11,0.18)]"
                      : "border-white/8"
                  }`}
                  style={{
                    background: "#0a0a0a",
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  {t.badge && (
                    <div
                      className="absolute top-4 right-4 z-10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: t.accent,
                        color: "#1a1a1a",
                        clipPath:
                          "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
                      }}
                    >
                      {t.badge}
                    </div>
                  )}

                  <div
                    className="px-7 pt-8 pb-6"
                    style={{ background: t.headerGradient }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                      {t.tier} Agent
                    </p>
                    <p
                      className="mt-2 text-5xl leading-none text-white sm:text-6xl"
                      style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                    >
                      {t.commission}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-white/56">
                      max commission rate
                    </p>
                  </div>

                  <div className="px-7 pt-6 pb-7">
                    <div className="space-y-3.5">
                      {t.features.map((f) => (
                        <div key={f.text} className="flex items-start gap-3">
                          {f.included ? (
                            <span
                              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: t.accent + "24" }}
                            >
                              <Check className="h-3 w-3" style={{ color: t.accent }} />
                            </span>
                          ) : (
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/6">
                              <X className="h-3 w-3 text-white/24" />
                            </span>
                          )}
                          <span
                            className={`text-[13px] leading-5 ${
                              f.included ? "text-[#d7d7d7]/80" : "text-white/26 line-through"
                            }`}
                            style={{ fontFamily: '"Fraunces", serif' }}
                          >
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <a
                        href="https://wkf.ms/4uzhYLR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-wider transition duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                        style={{
                          backgroundColor: t.accent,
                          color: "#0a0a0a",
                          clipPath:
                            "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                        }}
                      >
                        Become a Partner
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                      </a>
                    </div>

                    <p className="mt-4 text-center text-[10px] text-white/26">
                      Created by: {t.createdBy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...viewReveal(3)}
              className="mt-16 flex flex-col items-center"
            >
              <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                Recruitment Hierarchy
              </p>
              <div className="mt-5 flex items-center">
                {AGENT_HIERARCHY.map((h, i) => (
                  <Fragment key={h.label}>
                    {i > 0 && (
                      <div className="mx-2 flex items-center sm:mx-3">
                        <div className="h-px w-4 bg-white/12 sm:w-8" />
                        <ChevronRight className="h-3.5 w-3.5 text-white/24" />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-[9px] font-bold uppercase text-white sm:h-14 sm:w-14 sm:text-[10px]"
                        style={{
                          borderColor: h.color,
                          backgroundColor: h.color + "18",
                          boxShadow: `0 0 24px ${h.color}20`,
                        }}
                      >
                        {h.label}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
              <p
                className="mt-4 max-w-md text-center text-[12px] text-[#d7d7d7]/44"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                Each tier can recruit and manage agents below them in the chain
              </p>
            </motion.div>
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#1e4fa8] via-[#f2c14e] to-[#d91f26]"
          />
        </section>

        <section className="px-5 pb-20 pt-20 sm:px-8 lg:px-12 lg:pb-28 lg:pt-28">
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
                  Join today
                </p>
                <h2
                  className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                  style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                >
                  Welcome to the{" "}
                  <span className="text-[#d91f26]">Alopit community.</span>
                </h2>
                <p
                  className="mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                  style={{ fontFamily: '"Fraunces", serif' }}
                >
                  Where convenience meets community. Self-service transactions,
                  premium streams, and exclusive access — all in one platform.
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
