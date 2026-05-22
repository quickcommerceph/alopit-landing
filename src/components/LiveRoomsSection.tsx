import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import { RoomCard } from "./shared/RoomCard";
import { liveRooms } from "../data/rooms";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

export function LiveRoomsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const spotlight = liveRooms[0];

  return (
    <section
      id="live-rooms"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-secondary">
            <Zap className="h-4 w-4 text-[#e1334f]" />
            Live Rooms
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-primary sm:text-4xl">
            Current battles on deck
          </h2>
          <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-secondary sm:text-base">
            Tonight's broadcasts, ranked by crowd movement. Jump into any room with one tap.
          </p>
        </div>

        <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-secondary ring-1 ring-border">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            3 broadcasts active
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-secondary ring-1 ring-border">
            <Flame className="h-3.5 w-3.5 text-[#e1334f]" />
            Top room: {spotlight.momentum}%
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {liveRooms.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} />
        ))}
      </div>
    </section>
  );
}
