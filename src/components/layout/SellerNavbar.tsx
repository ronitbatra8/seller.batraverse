"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Brand from "@/components/brand/Brand";
import { Menu, X as XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navTabs = [
  { label: "How it works", short: "How it works", href: "/how-it-works" },
  { label: "Shipping & Return", short: "Shipping", href: "/shipping" },
  { label: "Don't have GSTIN", short: "GSTIN", href: "/no-gstin" },
];

const pillFloating =
  "border-white/25 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_20px_60px_-10px_rgba(0,0,0,0.4)] backdrop-blur-2xl";

export default function SellerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header className="fixed inset-x-0 top-0 z-[56]">
      <nav
        className={cn(
          "relative mx-auto mt-3 flex h-16 w-[calc(100%-1.5rem)] max-w-[1400px] items-center justify-between rounded-2xl border px-4 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 sm:h-[4.5rem] sm:w-[calc(100%-4rem)] sm:px-6",
          pillFloating
        )}
      >
        {/* BV card + Seller label */}
        <Link
          href="/"
          aria-label="Batraverse Seller — home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <Brand light={false} heroWhite={false} wordmark={false} />
          <span className="hidden font-display text-base font-bold uppercase tracking-[0.12em] text-cream sm:inline-block">
            Seller
          </span>
        </Link>

        {/* Centre links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex xl:gap-4">
          {navTabs.map((t) => {
            const isActive = pathname === t.href;
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={cn(
                    "group relative whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.3em] transition-colors duration-300 xl:px-4",
                    isActive
                      ? "text-gold-light"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  <span className="xl:hidden">{t.short}</span>
                  <span className="hidden xl:inline">{t.label}</span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-px -translate-x-1/2 transition-all duration-500 bg-gold",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/register"
            className="inline-flex items-center rounded-xl border border-rose-500 bg-rose-500 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-abyss transition-all duration-300 hover:bg-rose-400 hover:shadow-[0_0_28px_rgba(244,63,94,0.45)] sm:px-5"
          >
            Register
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white lg:hidden"
          >
            {mobileOpen ? <XIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "mx-auto mt-2 w-[calc(100%-1.5rem)] max-w-[1400px] overflow-hidden rounded-2xl border border-white/15 bg-black/85 px-4 backdrop-blur-md transition-[max-height,opacity] duration-400 ease-out sm:w-[calc(100%-4rem)] lg:hidden",
          mobileOpen ? "max-h-[calc(100vh-5rem)] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1">
          {navTabs.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-baseline gap-4 rounded-lg px-3 py-2.5 text-[15px] font-light uppercase tracking-[0.18em] text-dark-300 transition-colors hover:bg-white/[0.05] hover:text-white sm:text-[16px]"
            >
              <span className="w-5 shrink-0 text-[10px] font-semibold tracking-[0.16em] text-rose-500">
                0{i + 1}
              </span>
              {t.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-rose-500 bg-rose-500 text-[11px] font-semibold uppercase tracking-[0.2em] text-abyss transition-colors hover:bg-rose-400"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}