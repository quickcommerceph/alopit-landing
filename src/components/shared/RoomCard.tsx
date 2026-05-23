import { ArrowRight, Clock3, Gauge, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { LiveRoom } from "../../data/rooms";
import { DetailPill } from "./DetailPill";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import { LOGIN_URL } from "../../lib/constants";

export function RoomCard({ room, index }: { room: LiveRoom; index: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-border bg-white shadow-[0_24px_80px_rgba(19,49,112,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_30px_100px_rgba(31,94,255,0.12)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.08, duration: 0.5 }}
    >
      <div className="relative h-44 overflow-hidden bg-[#0b1020]">
        <img
          src="/images/e-sabong-thumbnail.jpg"
          alt={room.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-warm-bg px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d12d49] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            {room.status}
          </span>
          <span className="rounded-md bg-white/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {room.quality}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
            {room.arena}
          </p>
          <h3 className="mt-1 text-2xl font-black leading-tight tracking-tight text-white">
            {room.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary">
              {room.round}
            </p>
            <p className="mt-1 text-sm font-medium text-secondary">{room.summary}</p>
          </div>
          <span className="shrink-0 rounded-full bg-accent-bg px-3 py-1.5 text-xs font-semibold text-accent">
            {room.startTime}
          </span>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <DetailPill icon={Users} label="Crowd" value={room.viewers} />
          <DetailPill icon={Gauge} label="Handle" value={room.handle} />
          <DetailPill icon={Clock3} label="Entry" value={room.entryWindow} />
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-secondary">
            <span>Room momentum</span>
            <span className="text-primary">{room.momentum}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-bg-alt ring-1 ring-border-light">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${room.accent}`}
              style={{ width: `${room.momentum}%` }}
            />
          </div>
        </div>

        <a
          href={LOGIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e1334f] to-[#1f5eff] px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,94,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          Join Room
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}
