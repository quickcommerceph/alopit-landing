import type { ComponentType } from "react";
import { Radio, ShieldCheck, Trophy, Users } from "lucide-react";

export type LiveRoom = {
  id: string;
  title: string;
  arena: string;
  round: string;
  viewers: string;
  handle: string;
  startTime: string;
  status: string;
  momentum: number;
  entryWindow: string;
  quality: string;
  summary: string;
  accent: string;
};

export const liveRooms: LiveRoom[] = [
  {
    id: "sbng-1",
    title: "Sabong Traditional Worldwide",
    arena: "Main Broadcast",
    round: "Round 18",
    viewers: "12.4K",
    handle: "₱1.8M",
    startTime: "7:45 PM",
    status: "LIVE NOW",
    momentum: 92,
    entryWindow: "Open",
    quality: "HD stream",
    summary: "Largest active crowd with the fastest room movement.",
    accent: "from-[#e1334f] via-[#f97316] to-[#1f5eff]",
  },
  {
    id: "sbng-2",
    title: "Sabong World Cup",
    arena: "Championship Ring",
    round: "Round 12",
    viewers: "8.7K",
    handle: "₱980K",
    startTime: "8:10 PM",
    status: "HEATING UP",
    momentum: 74,
    entryWindow: "3 min",
    quality: "Multi-angle",
    summary: "Steady championship room with strong late entries.",
    accent: "from-[#1f5eff] via-[#2563eb] to-[#0f172a]",
  },
  {
    id: "sbng-3",
    title: "Sabong Grand Finals",
    arena: "Night Session",
    round: "Round 26",
    viewers: "15.1K",
    handle: "₱2.3M",
    startTime: "8:35 PM",
    status: "TRENDING",
    momentum: 88,
    entryWindow: "Open",
    quality: "Featured",
    summary: "Prime-time battle with the highest handle tonight.",
    accent: "from-[#111827] via-[#334155] to-[#e1334f]",
  },
];

export type LobbyStat = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

export const lobbyStats: LobbyStat[] = [
  { label: "Rooms live", value: "4", icon: Radio },
  { label: "Peak crowd", value: "15.1K", icon: Users },
  { label: "Total handle", value: "₱5.5M", icon: Trophy },
  { label: "Stream uptime", value: "98%", icon: ShieldCheck },
];

export const trustPills: string[] = [
  "Fast room switching",
  "Live crowd momentum",
  "Low-friction entry",
  "Mobile-first layout",
];
