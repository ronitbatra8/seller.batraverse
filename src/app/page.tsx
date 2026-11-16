"use client";

import SiteLayout from "@/components/layout/SiteLayout";
import SellerNavbar from "@/components/layout/SellerNavbar";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  Coins,
  BarChart3,
  ShieldCheck,
  Upload,
  ArrowRight,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const features = [
  { icon: Package, title: "List Products", desc: "Add products with images, variants, pricing, and return windows. Owner reviews and approves before they go live." },
  { icon: ShoppingBag, title: "Manage Orders", desc: "See every order that contains your products, with customer and shipping details." },
  { icon: Coins, title: "Track Payouts", desc: "A transparent settlement ledger — pending, paid, and voided earnings per order item." },
  { icon: BarChart3, title: "Analytics", desc: "Products, orders, and top performers at a glance." },
  { icon: Upload, title: "Image Uploads", desc: "Drag-and-drop product images or paste URLs. Up to 10 images per product." },
  { icon: ShieldCheck, title: "Secure & Approved", desc: "Every seller is verified. Your products go live only after owner approval." },
];

export default function SellerLandingPage() {

  return (
    <SiteLayout>
      <SellerNavbar />
      {/* Hero — full-width image card with content overlaid */}
      <section id="home" className="relative px-3 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto flex w-full max-w-[1200px] flex-col lg:overflow-hidden lg:rounded-3xl lg:border lg:border-white/10 lg:bg-dark-950 lg:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        >
          {/* Image — full frame on small screens, fixed-height banner on desktop */}
          <div className="relative order-2 overflow-hidden rounded-3xl border border-white/10 bg-dark-950 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] lg:order-none lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
            <img
              src="/hero_seller.png"
              alt="Shop the BATRAVERSE collection"
              width={1672}
              height={941}
              className="block h-auto w-full object-cover object-top lg:h-[560px]"
            />
            {/* Scrims — same treatment as the main site hero */}
            <div className="pointer-events-none absolute inset-0 bg-black/25" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/5" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          </div>

          {/* Overlaid copy — left-aligned on mobile, centered on desktop (main-site style) */}
          <div className="relative order-1 p-4 sm:p-6 lg:order-none lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:p-10">
            <div className="w-full rounded-2xl border border-white/25 bg-white/20 p-6 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:max-w-[416px] lg:-translate-x-36 lg:rounded-3xl lg:px-10 lg:py-12 lg:text-center xl:-translate-x-56">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
              >
                Start <span className="text-gold-200">Small</span>
              </motion.h1>

              {/* Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/80 sm:mx-auto sm:text-base"
              >
                Reach shoppers across India.
                <span className="block">Transparent payouts, no monthly fees.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                className="mt-8 flex flex-col gap-6 sm:mt-10"
              >
                <div className="flex flex-col gap-2.5">
                  <p className="text-center text-[10px] font-medium uppercase tracking-[0.24em] text-white/60">
                    Already part of BATRAVERSE?
                  </p>
                  <Link
                    href="/login"
                    className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-gold-300/70 px-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-200 transition-all duration-300 hover:-translate-y-0.5 hover:text-dark-950 hover:shadow-[0_0_30px_-8px_rgba(212,175,55,0.6)] active:translate-y-0 active:scale-[0.98] sm:px-9"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 transition-transform duration-500 ease-out group-hover:translate-y-0"
                    />
                    <span className="relative">Access Dashboard</span>
                    <ArrowRight
                      size={15}
                      strokeWidth={2.25}
                      className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>

                <div className="flex flex-col gap-2.5">
                  <p className="text-center text-[10px] font-medium uppercase tracking-[0.24em] text-white/60">
                    Not part of BATRAVERSE yet?
                  </p>
                  <Link
                    href="/register"
                    className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-rose-500 bg-rose-500 px-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-abyss transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-400 hover:text-abyss hover:shadow-[0_0_30px_-8px_rgba(244,63,94,0.65)] active:translate-y-0 active:scale-[0.98] sm:px-9"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />
                    <span className="relative">Register</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features — bento grid */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-center text-center">
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Everything you{" "}
              <span className="text-gold-gradient">need</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-400">
              From{" "}
              <span className="font-semibold text-gold-400">A</span>pproval to{" "}
              <span className="font-semibold text-gold-400">Z</span>enith.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/[0.15] p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.35)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-xl transition duration-300 group-hover:bg-gold-500/20" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400 transition duration-300 group-hover:scale-110 group-hover:border-gold-500/50 group-hover:bg-gold-500/20 group-hover:text-gold-300">
                    <f.icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dark-400">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why BATRAVERSE */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-center text-center">
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Why{" "}
              <span className="text-gold-gradient">BATRAVERSE</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-400">
              Built for sellers who want clarity, control, and growth.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: ShieldCheck, title: "Verified & Secure", desc: "Every seller is verified. Your products go live only after owner approval." },
              { icon: Coins, title: "Transparent Payouts", desc: "A clear settlement ledger — pending, paid, and voided earnings per item." },
              { icon: ShoppingBag, title: "Reach Shoppers", desc: "List once and reach customers across India with standard and express delivery." },
              { icon: BarChart3, title: "Actionable Analytics", desc: "Track products, orders, and top performers at a glance." },
            ].map((w) => (
              <div
                key={w.title}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/[0.15] p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.35)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-xl transition duration-300 group-hover:bg-gold-500/20" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400 transition duration-300 group-hover:scale-110 group-hover:border-gold-500/50 group-hover:bg-gold-500/20 group-hover:text-gold-300">
                    <w.icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {w.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dark-400">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-10 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-dark-400">
            Trusted partners powering BATRAVERSE
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16"
          >
            {[
              { name: "Delhivery", color: "text-rose-400", sub: "Logistics" },
              { name: "Razorpay", color: "text-sky-400", sub: "Payments" },
              { name: "Resend", color: "text-cream", sub: "Email" },
            ].map((p) => (
              <div
                key={p.name}
                className="group flex flex-col items-center gap-1.5 opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                <span
                  className={`font-display text-2xl font-bold tracking-tight ${p.color} transition-all duration-300 group-hover:drop-shadow-[0_0_12px_currentColor]`}
                >
                  {p.name}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-dark-500">
                  {p.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/[0.15] p-12 text-center backdrop-blur-md"
        >
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to start selling?
          </h2>
          <p className="mt-4 text-dark-300">
            Create your seller account and reach customers across India.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 text-sm font-semibold text-dark-950 transition-all hover:bg-gold-400"
            >
              Register <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-rose-500 px-8 py-3.5 text-sm font-semibold text-rose-400 transition-all hover:bg-rose-500/10 hover:text-rose-300"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}