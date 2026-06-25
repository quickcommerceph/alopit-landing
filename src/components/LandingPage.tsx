import { AnimatePresence, motion } from "framer-motion";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Headphones,
  Play,
  ShieldCheck,
  Smartphone,
  Trophy,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { ALOWIN_URL, LOGIN_URL, REGISTER_URL } from "../lib/constants";
import { LanguageSelector } from "./LanguageSelector";
import { openLiveChat } from "../lib/liveChat";
import { COPY } from "../lib/copy";
import {
  getInitialLocale,
  persistLocale,
  type Locale,
} from "../lib/i18n";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { capture } from "../lib/analytics";

const ROOM_BOARD = [
  {
    title: "Sabong Traditional",
    state: "Live now",
  },
];

const TRUST_ICONS = [ShieldCheck, Zap, Smartphone, Headphones] as const;

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

const AGENT_TIERS = [
  {
    tier: "Gold",
    headerGradient: "linear-gradient(135deg, #b8860b, #5c4a1e)",
    accent: "#f5d880",
    commission: "3%",
    badge: "Recommended" as string | null,
    features: [
      { text: "Turnover-based commissions", included: true },
      { text: "Separate commission wallet", included: true },
      { text: "Transfer-to-balance anytime", included: true },
      { text: "Create Silver & Bronze affiliates", included: true },
      { text: "Full deposit/withdraw to downlines", included: true },
    ],
    createdBy: "Master affiliate only",
  },
  {
    tier: "Silver",
    headerGradient: "linear-gradient(135deg, #4a5568, #1a2332)",
    accent: "#94a8bc",
    commission: "2%",
    badge: null as string | null,
    features: [
      { text: "Turnover-based commissions", included: true },
      { text: "Separate commission wallet", included: true },
      { text: "Transfer-to-balance anytime", included: true },
      { text: "Create Bronze affiliates", included: true },
      { text: "Deposit/Withdraw to downlines", included: false },
    ],
    createdBy: "Gold or Master affiliate",
  },
  {
    tier: "Bronze",
    headerGradient: "linear-gradient(135deg, #6d4c41, #33211a)",
    accent: "#a87850",
    commission: "1%",
    badge: null as string | null,
    features: [
      { text: "Turnover-based commissions", included: true },
      { text: "Separate commission wallet", included: true },
      { text: "Transfer-to-balance anytime", included: true },
      { text: "Can create downline affiliates", included: false },
      { text: "Deposit/Withdraw to downlines", included: false },
    ],
    createdBy: "Gold, Silver, or Master affiliate",
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

const GAME_CATEGORIES = ["all", "casino", "liveCasino", "games"] as const;
type GameCategory = (typeof GAME_CATEGORIES)[number];

const ALOWIN_SPORTSBOOK_URL = "https://www.alowin.club/en/sports/pre-match";
const ALOWIN_SPORTSBOOK_LIVE_URL = "https://www.alowin.club/en/sports/live";
const GAME_THUMB_FALLBACK = "/images/alowin-games/fallback.svg";

const SPORTSBOOK_MODES = [
  {
    mode: "Live",
    title: "Follow the action as it happens",
    body: "Jump into active games and keep the matchday energy moving inside the Alowin sportsbook experience.",
    cta: "Open live sports",
    href: ALOWIN_SPORTSBOOK_LIVE_URL,
  },
  {
    mode: "Pre-match",
    title: "Plan before kickoff",
    body: "Browse upcoming fixtures, choose your sport, and enter before the game starts.",
    cta: "View pre-match sports",
    href: ALOWIN_SPORTSBOOK_URL,
  },
];

const ALOWIN_GAMES: {
  name: string;
  category: GameCategory;
  thumb: string;
  path: string;
}[] = [
  {
    name: "Super Ace Deluxe",
    category: "casino",
    thumb: "/images/alowin-games/super-ace-deluxe.webp",
    path: "/en/casino/slots/",
  },
  {
    name: "Sweet Bonanza 1000",
    category: "casino",
    thumb: "/images/alowin-games/sweet-bonanza-1000.svg",
    path: "/en/casino/slots/",
  },
  {
    name: "Gates of Olympus Super Scatter",
    category: "casino",
    thumb: "/images/alowin-games/gates-of-olympus-super-scatter.svg",
    path: "/en/casino/slots/",
  },
  {
    name: "Pinata Wins",
    category: "casino",
    thumb: "/images/alowin-games/pinata-wins.webp",
    path: "/en/casino/slots/",
  },
  {
    name: "Super Ace 2",
    category: "casino",
    thumb: "/images/alowin-games/super-ace-2.webp",
    path: "/en/casino/slots/",
  },
  {
    name: "Super Color Game",
    category: "liveCasino",
    thumb: "/images/alowin-games/super-color-game.webp",
    path: "/en/live-casino/home",
  },
  {
    name: "Speed Baccarat A",
    category: "liveCasino",
    thumb: "/images/alowin-games/speed-baccarat-a.webp",
    path: "/en/live-casino/home",
  },
  {
    name: "Klasik Free Bet Blackjack 1",
    category: "liveCasino",
    thumb: "/images/alowin-games/klasik-free-bet-blackjack-1.webp",
    path: "/en/live-casino/home",
  },
  {
    name: "Turkish Crazy Time",
    category: "liveCasino",
    thumb: "/images/alowin-games/turkish-crazy-time.webp",
    path: "/en/live-casino/home",
  },
  {
    name: "VIP Always 6 Blackjack 1",
    category: "liveCasino",
    thumb: "/images/alowin-games/vip-always-6-blackjack-1.webp",
    path: "/en/live-casino/home",
  },
  {
    name: "Color Game",
    category: "games",
    thumb: "/images/alowin-games/color-game.webp",
    path: "/en/games/home",
  },
  {
    name: "Color Hunt",
    category: "games",
    thumb: "/images/alowin-games/color-hunt.webp",
    path: "/en/games/home",
  },
  {
    name: "Chicky Choice",
    category: "games",
    thumb: "/images/alowin-games/chicky-choice.gif",
    path: "/en/games/home",
  },
  {
    name: "Fruit X",
    category: "games",
    thumb: "/images/alowin-games/fruit-x.webp",
    path: "/en/games/home",
  },
  {
    name: "Mines",
    category: "games",
    thumb: "/images/alowin-games/mines.svg",
    path: "/en/games/home",
  },
];

export function LandingPage() {
  const reduced = usePrefersReducedMotion();
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTicking = useRef(false);
  const scrollFrame = useRef<number | null>(null);

  const [[promoIndex, promoDir], setPromo] = useState<[number, number]>([0, 0]);
  const [activeCategory, setActiveCategory] = useState<GameCategory>("all");
  const [promoPaused, setPromoPaused] = useState(false);
  const promoSwipeRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    active: false,
    dragging: false,
  });
  const goToPromo = (i: number) => setPromo(([cur]) => [i, i >= cur ? 1 : -1]);

  const copy = COPY[locale];

  useEffect(() => {
    if (reduced || promoPaused) return;
    const id = setInterval(
      () => setPromo(([cur]) => [(cur + 1) % PROMOS.length, 1]),
      5000,
    );
    return () => clearInterval(id);
  }, [reduced, promoIndex, promoPaused]);

  useEffect(() => {
    persistLocale(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const updateHeaderState = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const nearTop = currentY < 24;

      setHeaderScrolled(!nearTop);

      if (nearTop || delta < -8) {
        setHeaderVisible(true);
      } else if (delta > 8) {
        setHeaderVisible(false);
      }

      lastScrollY.current = currentY;
      scrollTicking.current = false;
    };

    const onScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      scrollFrame.current = window.requestAnimationFrame(updateHeaderState);
    };

    lastScrollY.current = window.scrollY;
    updateHeaderState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

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

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };
  const handlePromoSwipeEnd = (nextIndex: number) => {
    setPromo(([cur]) => [nextIndex, nextIndex >= cur ? 1 : -1]);
    capture("promo_slide_navigated", { slide_index: nextIndex });
  };
  const handlePromoPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || event.button !== 0) return;

    const swipe = promoSwipeRef.current;
    swipe.pointerId = event.pointerId;
    swipe.startX = event.clientX;
    swipe.startY = event.clientY;
    swipe.lastX = event.clientX;
    swipe.lastY = event.clientY;
    swipe.active = true;
    swipe.dragging = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setPromoPaused(true);
  };
  const handlePromoPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const swipe = promoSwipeRef.current;
    if (!swipe.active || swipe.pointerId !== event.pointerId) return;

    swipe.lastX = event.clientX;
    swipe.lastY = event.clientY;

    const deltaX = event.clientX - swipe.startX;
    const deltaY = event.clientY - swipe.startY;

    if (!swipe.dragging) {
      if (Math.abs(deltaX) < 10 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      swipe.dragging = true;
    }

    event.preventDefault();
  };
  const finishPromoSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const swipe = promoSwipeRef.current;
    if (!swipe.active || swipe.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const deltaX = event.clientX - swipe.startX;
    const deltaY = event.clientY - swipe.startY;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    const shouldChange = swipe.dragging && isHorizontal && Math.abs(deltaX) > 56;

    swipe.pointerId = null;
    swipe.active = false;
    swipe.dragging = false;
    setPromoPaused(false);

    if (!shouldChange) return;

    const direction = deltaX < 0 ? 1 : -1;
    const nextIndex = (promoIndex + direction + PROMOS.length) % PROMOS.length;
    handlePromoSwipeEnd(nextIndex);
  };
  const navClipPath =
    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";
  const smallButtonClipPath =
    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

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

      <header
        className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5 lg:px-8"
        aria-hidden={!headerVisible}
        style={{
          pointerEvents: headerVisible ? "auto" : "none",
        }}
      >
        <motion.nav
          initial={false}
          animate={
            headerVisible ? { y: 0, opacity: 1 } : { y: -120, opacity: 0 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
          }
          className={`mx-auto max-w-[1344px] p-px transition-colors duration-300 ${
            headerScrolled ? "bg-[#f2c14e]/18" : "bg-white/8"
          }`}
          style={{
            clipPath: navClipPath,
            boxShadow: headerScrolled
              ? "0 16px 60px rgba(0, 0, 0, 0.28)"
              : undefined,
          }}
        >
          <div
            className="flex flex-col gap-3 bg-[#050505]/82 px-3 py-3 backdrop-blur-xl sm:px-5 lg:flex-row lg:items-center lg:justify-between"
            style={{
              clipPath: navClipPath,
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <a href="#top" className="inline-flex items-center gap-2" aria-label="Alopit home">
                <img src="/images/logo.png" alt="" className="h-7 w-auto opacity-90" />
                <span className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#f5f5f5]">
                  Alopit
                </span>
              </a>

              <div className="h-px flex-1 bg-gradient-to-r from-[#f2c14e]/35 via-[#d91f26]/28 to-transparent lg:hidden" />
            </div>

            <div className="grid grid-cols-[5rem_minmax(0,0.9fr)_minmax(0,1.25fr)] items-stretch gap-2 lg:hidden">
              <LanguageSelector locale={locale} onChange={handleLocaleChange} />
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => capture("login_clicked", { location: "header" })}
                className="inline-flex min-w-0 items-center justify-center border border-[#ff7a00]/60 bg-[#d91f26] px-2.5 text-center text-[clamp(8px,2.35vw,10px)] font-bold uppercase leading-none tracking-[0.12em] text-white transition duration-300 hover:bg-[#ff3a2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f2c14e] active:scale-[0.98]"
                style={{
                  clipPath: smallButtonClipPath,
                }}
              >
                {copy.header.login}
              </a>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => capture("register_clicked", { location: "header" })}
                className="group inline-flex min-w-0 items-center justify-center gap-1 border border-[#f2c14e]/60 bg-[#f2c14e] px-2.5 text-center text-[clamp(8px,2.35vw,10px)] font-bold uppercase leading-none tracking-[0.12em] text-[#050505] transition duration-300 hover:bg-[#ff7a00] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white active:scale-[0.98]"
                style={{
                  clipPath: smallButtonClipPath,
                }}
              >
                <span className="min-w-0">{copy.header.register}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>

            <div className="hidden items-center gap-5 lg:flex">
              <LanguageSelector locale={locale} onChange={handleLocaleChange} />
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-[#ff7a00]/60 bg-[#d91f26] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#ff3a2f] active:scale-[0.98]"
                style={{
                  clipPath: smallButtonClipPath,
                }}
              >
                {copy.header.login}
              </a>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 border border-[#f2c14e]/60 bg-[#f2c14e] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#050505] transition duration-300 hover:bg-[#ff7a00] hover:text-white active:scale-[0.98]"
                style={{
                  clipPath: smallButtonClipPath,
                }}
              >
                {copy.header.register}
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>
          </div>
        </motion.nav>
      </header>

      <main className="relative z-10">
        <section id="top" className="relative isolate min-h-[88svh] overflow-hidden">
            <img
              src="/images/e-sabong-thumbnail.jpg"
              alt={copy.hero.alt}
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
                alt={copy.hero.alt}
                className="relative w-full select-none object-contain drop-shadow-[0_0_34px_rgba(217,31,38,0.42)]"
                draggable={false}
              />
            </motion.div>

            <div className="grid items-end gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="max-w-5xl">
                <h1
                  className="max-w-5xl text-6xl leading-none text-[#f5f5f5] sm:text-7xl lg:text-9xl"
                  style={{
                    fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace',
                    textShadow:
                      "0 0 30px rgba(217,31,38,0.42), 0 18px 60px rgba(0,0,0,0.55)",
                  }}
                >
                  <span className="block overflow-hidden">
                    <motion.span {...reveal(1)} className="inline-block">
                      {copy.hero.titleLead}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span {...reveal(2)} className="inline-block text-[#f2c14e]">
                      {copy.hero.titleAccent}
                    </motion.span>
                  </span>
                </h1>

                <motion.p
                  {...reveal(3)}
                  className="mt-6 max-w-2xl text-base leading-7 text-[#d7d7d7] sm:text-lg"
                  style={{ fontFamily: '"Fraunces", serif' }}
                >
                  {copy.hero.body}
                </motion.p>

                <motion.div {...reveal(4)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => capture("cta_clicked", { location: "hero" })}
                    className="group inline-flex min-h-14 items-center justify-center gap-3 border border-[#ff7a00]/60 bg-[#d91f26] px-7 py-3 text-sm font-bold uppercase text-white shadow-[0_22px_60px_rgba(217,31,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff3a2f] active:scale-[0.98]"
                    style={{
                      clipPath:
                        "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    }}
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {copy.hero.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </motion.div>
              </div>


            </div>

            <motion.div
              {...reveal(6)}
              className="mt-8 grid border border-[#f2c14e]/24 bg-black/58 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
            >
              {copy.trust.map((item, index) => {
                const isLiveSupport = "liveChat" in item && item.liveChat;
                const Icon = TRUST_ICONS[index];
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#f2c14e]/40 bg-[#f2c14e]/10 text-[#f2c14e]">
                      <Icon className="h-5 w-5" />
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
                      onClick={() => { capture("live_chat_opened"); openLiveChat(); }}
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
              {[...copy.marquee, ...copy.marquee, ...copy.marquee, ...copy.marquee].map((item, i) => (
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
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Promotion carousel"
            className="block relative overflow-hidden border border-[#f2c14e]/18 bg-[#070707]"
            style={{
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              touchAction: "pan-y",
            }}
            onMouseEnter={() => setPromoPaused(true)}
            onMouseLeave={() => {
              const swipe = promoSwipeRef.current;
              if (!swipe.active) {
                setPromoPaused(false);
              }
            }}
            onPointerDown={handlePromoPointerDown}
            onPointerMove={handlePromoPointerMove}
            onPointerUp={finishPromoSwipe}
            onPointerCancel={finishPromoSwipe}
          >
            <div className="relative" style={{ aspectRatio: "1365 / 455" }}>
               <AnimatePresence initial={false} custom={promoDir}>
                  <motion.img
                    key={promoIndex}
                    src={PROMOS[promoIndex].src}
                    alt={`${copy.promo.ariaPrefix} ${promoIndex + 1}`}
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
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            {PROMOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { goToPromo(i); capture("promo_slide_navigated", { slide_index: i }); }}
                aria-label={`${copy.promo.ariaPrefix} ${i + 1}`}
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
                {copy.why.eyebrow}
              </p>
              <h2
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                {copy.why.titleLead}{" "}
                <span className="text-[#d91f26]">{copy.why.titleAccent}</span>
              </h2>
              <p
                className="mt-6 max-w-md text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.why.body}
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
                        Alopit Arena · {copy.why.roomState}
                      </p>
                      <p className="mt-1 text-sm font-bold uppercase text-[#f5f5f5]">
                        {copy.why.roomTitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-px sm:grid-cols-2 lg:col-span-7">
              {copy.why.features.map((feature, i) => (
                <motion.article
                  key={feature}
                  {...viewReveal(i)}
                  className="group bg-[#080808] p-6 transition duration-300 hover:bg-[#0f1118]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-4xl leading-none text-[#f2c14e]"
                      style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                    >
                      {["I", "II", "III", "IV", "V"][i]}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-white/32">
                      {copy.why.featureLabel}
                    </span>
                  </div>
                  <h3
                    className="mt-7 text-3xl leading-none text-[#f5f5f5]"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {feature}
                  </h3>
                  <p
                    className="mt-4 text-[14px] leading-6 text-[#d7d7d7]/72"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                      {copy.why.featureBodies[i]}
                  </p>
                  <div className="mt-7 h-px w-full origin-left scale-x-0 bg-[#d91f26] transition duration-500 group-hover:scale-x-100" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="payments" className="border-y border-[#1e4fa8]/20 bg-[#080808]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="text-center">
              <motion.div {...viewReveal(0)} className="inline-flex items-center gap-3">
                <Wallet className="h-5 w-5 text-[#f2c14e]" />
                <span className="text-[10px] font-bold uppercase text-[#f2c14e]">
                  {copy.payments.eyebrow}
                </span>
              </motion.div>
              <motion.h2
                {...viewReveal(1)}
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                {copy.payments.titleLead}{" "}
                <span className="text-[#f2c14e]">{copy.payments.titleAccent}</span>
              </motion.h2>
              <motion.p
                {...viewReveal(2)}
                className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.payments.body}
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
                    {copy.payments.paymentBodies[i as 0 | 1 | 2]}
                  </p>
                  <div className="mt-6 flex items-center gap-2 border-t border-white/6 pt-4">
                    <span
                      className="h-1.5 w-6 rounded-full"
                      style={{ backgroundColor: pm.color }}
                    />
                    <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/52">
                      {copy.payments.supported}
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
                {copy.payments.statusLabels[0]}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d91f26]" />
                {copy.payments.statusLabels[1]}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f2c14e]" />
                {copy.payments.statusLabels[2]}
              </span>
            </motion.div>
          </div>
        </section>


        <section id="affiliate" className="relative border-y border-[#f2c14e]/16 bg-[#070707]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="text-center">
              <motion.p {...viewReveal(0)} className="text-[10px] font-bold uppercase text-[#f2c14e]">
                {copy.affiliate.eyebrow}
              </motion.p>
              <motion.h2
                {...viewReveal(1)}
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                {copy.affiliate.titleLead}{" "}
                <span className="text-[#f2c14e]">{copy.affiliate.titleAccent}</span>
              </motion.h2>
              <motion.p
                {...viewReveal(2)}
                className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.affiliate.body}
              </motion.p>
            </div>

            <div className="mt-14 grid items-end gap-5 lg:grid-cols-3">
              {AGENT_TIERS.map((visualTier, i) => (
                <motion.div
                  key={copy.affiliate.tiers[i].tierLabel}
                  {...viewReveal(i)}
                  className={`relative p-px ${
                    copy.affiliate.tiers[i].badge
                      ? "bg-[#f5d880]/30 lg:-mt-6 shadow-[0_20px_80px_rgba(184,134,11,0.18)]"
                      : "bg-white/8"
                  }`}
                  style={{
                    clipPath:
                      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                  }}
                >
                  <div
                    className="relative overflow-hidden bg-[#0a0a0a]"
                    style={{
                      clipPath:
                        "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    }}
                  >
                    {copy.affiliate.tiers[i].badge && (
                      <div
                        className="absolute top-4 right-4 z-10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: visualTier.accent,
                          color: "#1a1a1a",
                          clipPath:
                            "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
                        }}
                      >
                        {copy.affiliate.tiers[i].badge}
                      </div>
                    )}

                    <div
                      className="px-7 pt-8 pb-6"
                      style={{ background: visualTier.headerGradient }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                        {copy.affiliate.tiers[i].tierLabel} Affiliate
                      </p>
                      <p
                        className="mt-2 text-5xl leading-none text-white sm:text-6xl"
                        style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                      >
                        {copy.affiliate.tiers[i].commission}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-white/56">
                        {copy.affiliate.tiers[i].maxLabel}
                      </p>
                    </div>

                    <div className="px-7 pt-6 pb-7">
                      <div className="space-y-3.5">
                        {copy.affiliate.tiers[i].features.map((feature, featureIndex) => {
                          const included = visualTier.features[featureIndex]?.included ?? true;
                          const FeatureIcon = included ? Check : X;

                          return (
                            <div key={feature} className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: included
                                    ? visualTier.accent + "24"
                                    : "rgba(255,255,255,0.06)",
                                }}
                              >
                                <FeatureIcon
                                  className={`h-3 w-3 ${included ? "" : "text-white/24"}`}
                                  style={included ? { color: visualTier.accent } : undefined}
                                />
                              </span>
                              <span
                                className={`text-[13px] leading-5 ${
                                  included ? "text-[#d7d7d7]/80" : "text-white/26 line-through"
                                }`}
                                style={{ fontFamily: '"Fraunces", serif' }}
                              >
                                {feature}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8">
                        <a
                          href="https://wkf.ms/4uzhYLR"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => capture("affiliate_apply_clicked", { tier: copy.affiliate.tiers[i].tierLabel })}
                          className="group inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-wider transition duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                          style={{
                            backgroundColor: visualTier.accent,
                            color: "#0a0a0a",
                            clipPath:
                              "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                          }}
                        >
                          {copy.affiliate.cta}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                        </a>
                      </div>

                      <p className="mt-4 text-center text-[10px] text-white/26">
                        {copy.affiliate.createdByLabel} {copy.affiliate.tiers[i].createdBy}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...viewReveal(3)}
              className="mt-16 flex flex-col items-center"
            >
              <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                {copy.affiliate.hierarchyEyebrow}
              </p>
              <div className="mt-5 flex items-center">
                {AGENT_HIERARCHY.map((h, i) => (
                  <Fragment key={h.label}>
                    <div className="flex flex-col items-center">
                      <span
                        className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-[10px] font-bold uppercase"
                        style={{
                          borderColor: h.color,
                          color: h.color,
                          backgroundColor: `${h.color}14`,
                        }}
                      >
                        {h.label}
                      </span>
                    </div>
                    {i < AGENT_HIERARCHY.length - 1 && (
                      <ChevronRight className="mx-2 h-5 w-5 text-[#d7d7d7]/24 sm:mx-4" />
                    )}
                  </Fragment>
                ))}
              </div>
              <p
                className="mt-4 max-w-md text-center text-[12px] text-[#d7d7d7]/44"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.affiliate.hierarchyNote}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/6 bg-[#050505]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="text-center">
              <motion.p {...viewReveal(0)} className="text-[10px] font-bold uppercase text-[#f2c14e]">
                {copy.beyond.eyebrow}
              </motion.p>
              <motion.h2
                {...viewReveal(1)}
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-6xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                {copy.beyond.titleLead}{" "}
                <span className="text-[#f2c14e]">{copy.beyond.titleAccent}</span>
              </motion.h2>
              <motion.p
                {...viewReveal(2)}
                className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.beyond.body}
              </motion.p>
            </div>

            <motion.div
              {...viewReveal(3)}
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {copy.beyond.categories.map((cat, index) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(GAME_CATEGORIES[index])}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition duration-300"
                  style={{
                    backgroundColor:
                      activeCategory === GAME_CATEGORIES[index] ? "#f2c14e" : "transparent",
                    color:
                      activeCategory === GAME_CATEGORIES[index] ? "#050505" : "rgba(215,215,215,0.72)",
                    border: `1px solid ${
                      activeCategory === GAME_CATEGORIES[index] ? "#f2c14e" : "rgba(255,255,255,0.1)"
                    }`,
                    clipPath:
                      "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {ALOWIN_GAMES.filter(
                (g) => activeCategory === "all" || g.category === activeCategory,
              ).map((game, i) => (
                <motion.a
                  key={game.name}
                  href={`${ALOWIN_URL}${game.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => capture("game_clicked", { game_name: game.name, game_category: game.category })}
                  {...viewReveal(i)}
                  className="group overflow-hidden border border-white/8 bg-[#0a0a0a] transition duration-300 hover:-translate-y-1 hover:border-[#f2c14e]/30 hover:bg-[#0f1118]"
                  style={{
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                    <img
                      src={game.thumb}
                      alt={game.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src = GAME_THUMB_FALLBACK;
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.62) 100%)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-bold uppercase text-[#f5f5f5]">
                        {game.name}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase text-[#f2c14e]/70">
                        Alowin
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#d7d7d7]/36 transition duration-300 group-hover:rotate-45 group-hover:text-[#f2c14e]" />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div {...viewReveal(5)} className="mt-12 text-center">
              <a
                href={ALOWIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#f2c14e] px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#050505] transition duration-300 hover:bg-[#ff7a00] hover:text-white"
                style={{
                  clipPath:
                    "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                }}
              >
                {copy.beyond.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <p
                className="mt-4 text-[12px] text-[#d7d7d7]/48"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.beyond.footer}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#080808]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 78% 28%, rgba(30,79,168,0.22), transparent 34%), linear-gradient(135deg, rgba(242,193,78,0.08), transparent 42%)",
            }}
          />
          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:py-24">
            <motion.div {...viewReveal(0)} className="max-w-2xl self-center">
              <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                {copy.sportsbook.eyebrow}
              </p>
              <h2
                className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
              >
                {copy.sportsbook.titleLead}{" "}
                <span className="text-[#f2c14e]">{copy.sportsbook.titleAccent}</span>
              </h2>
              <p
                className="mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                {copy.sportsbook.body}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {copy.sportsbook.tags.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase text-[#d7d7d7]/75"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f2c14e]" />
                    {label}
                  </span>
                ))}
              </div>
              <a
                href={ALOWIN_SPORTSBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => capture("sportsbook_cta_clicked", { mode: "main" })}
                className="group mt-9 inline-flex items-center gap-2 bg-[#f2c14e] px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#050505] transition duration-300 hover:bg-[#ff7a00] hover:text-white"
                style={{
                  clipPath:
                    "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                }}
              >
                {copy.sportsbook.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </motion.div>

            <motion.div
              {...viewReveal(2)}
              className="relative bg-[#f2c14e]/16 p-px shadow-[0_24px_90px_rgba(0,0,0,0.34)]"
              style={{
                clipPath:
                  "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
              }}
            >
              <div
                className="bg-[#050505]/78 p-4 sm:p-6"
                style={{
                  clipPath:
                    "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
                }}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                        {copy.sportsbook.boardEyebrow}
                      </p>
                      <p className="mt-1 text-[12px] font-bold uppercase text-[#f5f5f5]">
                        {copy.sportsbook.boardTitle}
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-[#f2c14e]/35 bg-[#f2c14e]/10 text-[#f2c14e]">
                      <Trophy className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {copy.sportsbook.modes.map((item, index) => (
                      <div
                        key={item.mode}
                        className="group border border-white/8 bg-black/24 p-4 transition duration-300 hover:border-[#f2c14e]/28 hover:bg-[#f2c14e]/[0.04]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                              {item.mode}
                            </p>
                            <p className="mt-1 text-[13px] font-bold uppercase text-[#f5f5f5]">
                              {item.title}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#d7d7d7]/34 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f2c14e]" />
                        </div>
                        <p
                          className="mt-3 max-w-xl text-[13px] leading-6 text-[#d7d7d7]/66"
                          style={{ fontFamily: '"Fraunces", serif' }}
                        >
                          {item.body}
                        </p>
                        <a
                          href={SPORTSBOOK_MODES[index].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex min-h-9 items-center gap-2 border border-white/10 px-3 py-2 text-[10px] font-bold uppercase text-[#d7d7d7]/70 transition hover:border-[#f2c14e]/40 hover:text-[#f2c14e]"
                        >
                          {item.cta}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border border-[#f2c14e]/16 bg-[#f2c14e]/[0.05] p-4">
                    <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                      {copy.sportsbook.flowEyebrow}
                    </p>
                    <p
                      className="mt-2 text-[14px] leading-6 text-[#d7d7d7]/78"
                      style={{ fontFamily: '"Fraunces", serif' }}
                    >
                      {copy.sportsbook.flowBody}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#050505] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <motion.div
            {...viewReveal(0)}
            className="relative mx-auto max-w-[1440px] bg-[#f2c14e]/24 p-px"
            style={{
              clipPath:
                "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
            }}
          >
            <div
              className="relative overflow-hidden bg-[#0a0a0a]"
              style={{
                clipPath:
                  "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(217,31,38,0.22), transparent 38%), radial-gradient(circle at 86% 18%, rgba(30,79,168,0.26), transparent 30%)",
                }}
              />
              <div className="relative grid items-end gap-8 p-6 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:p-16">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#f2c14e]">
                    {copy.final.eyebrow}
                  </p>
                  <h2
                    className="mt-4 text-5xl leading-none text-[#f5f5f5] sm:text-7xl"
                    style={{ fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace' }}
                  >
                    {copy.final.titleLead}{" "}
                    <span className="text-[#d91f26]">{copy.final.titleAccent}</span>
                  </h2>
                  <p
                    className="mt-5 max-w-xl text-[15px] leading-7 text-[#d7d7d7]/76"
                    style={{ fontFamily: '"Fraunces", serif' }}
                  >
                    {copy.final.body}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => capture("register_clicked", { location: "final_cta" })}
                    className="group inline-flex items-center gap-2 bg-[#f2c14e] px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-[#050505] transition duration-300 hover:bg-[#ff7a00] hover:text-white"
                    style={{
                      clipPath:
                        "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    }}
                  >
                    {copy.final.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                  <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/52">
                    {copy.final.note}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#f2c14e]/16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 px-5 py-9 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-7 w-auto opacity-85" />
            <span className="text-[10px] font-bold uppercase text-[#d7d7d7]/54">
              {copy.footer.brand}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase text-[#d7d7d7]/45">
            <span>{copy.footer.copyright}</span>
            <span>{copy.footer.responsible}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
