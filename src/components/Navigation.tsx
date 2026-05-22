import { useState } from "react";
import { Menu, Play, X } from "lucide-react";

const navLinks = [
  { label: "Live Rooms", href: "#live-rooms" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="Alopit" className="h-9 w-auto" />
            <span className="text-lg font-black tracking-tight text-primary">Alopit</span>
            <span className="hidden rounded-full bg-accent-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent sm:inline-block">
              E-Sabong
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-secondary transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#live-rooms"
              className="hidden sm:inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-[#e1334f] to-[#1f5eff] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,94,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              <Play className="h-4 w-4 fill-current" />
              Join Top Room
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-secondary transition-colors hover:text-primary"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-light py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-bg-alt hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#live-rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="sm:hidden mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e1334f] to-[#1f5eff] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,94,255,0.2)]"
              >
                <Play className="h-4 w-4 fill-current" />
                Join Top Room
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
