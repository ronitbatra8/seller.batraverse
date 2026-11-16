"use client";

import SiteLayout from "@/components/layout/SiteLayout";
import SellerNavbar from "@/components/layout/SellerNavbar";
import { CheckCircle2, FileText, ShieldCheck, Mail } from "lucide-react";

const benefits = [
  {
    title: "Register Without GSTIN",
    desc: "Create your seller account with shop name, pickup address, and payout details — no GSTIN required to get started.",
  },
  {
    title: "Platform Handles Compliance",
    desc: "Your products are listed and sold normally. Tax compliance on your behalf is managed by the platform.",
  },
  {
    title: "Add GSTIN Later",
    desc: "Once you obtain a GSTIN, add it from your Profile tab. No re-registration needed — your account and products stay intact.",
  },
  {
    title: "Full Seller Features",
    desc: "List products, manage orders, track payouts, and view analytics — everything works the same without a GSTIN.",
  },
];

const steps = [
  "Sign up with your email and verify it with a one-time OTP.",
  "Complete your profile: shop name, pickup address, and payout details.",
  "Wait for the owner to review and approve your account.",
  "Start listing products and selling — GSTIN can be added anytime later.",
];

const faqs = [
  {
    q: "Is there any limit on sales without a GSTIN?",
    a: "The platform manages compliance on your behalf. Contact support for any threshold-related questions.",
  },
  {
    q: "Will my payouts be affected?",
    a: "No — payouts are settled at your seller price regardless of GSTIN status.",
  },
  {
    q: "Can I update my GSTIN after registration?",
    a: "Yes, add or update it anytime from the Profile tab. No re-registration required.",
  },
  {
    q: "Who do I contact for help?",
    a: "Reach BATRAVERSE support at batraverse.shopeverything@gmail.com.",
  },
];

export default function NoGstinPage() {
  return (
    <SiteLayout>
      <SellerNavbar />
      <section className="relative px-6 pb-20 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 flex flex-col items-center text-center">
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Don&apos;t have a{" "}
              <span className="text-gold-gradient">GSTIN?</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-400">
              You can still sell on BATRAVERSE. Here&apos;s how.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <ShieldCheck size={20} strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              Why you can still sell
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/[0.15] p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.35)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-xl transition-all duration-500 group-hover:bg-gold-500/20" />
                <div className="relative">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dark-400">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="mb-6 mt-16 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <FileText size={20} strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              How to get started
            </h2>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/[0.15] p-8 backdrop-blur-md">
            <ul className="space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm text-dark-300">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-xs font-bold text-gold-400">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="mb-6 mt-16 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <Mail size={20} strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              Frequently asked
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-white/30 bg-white/[0.15] p-6 backdrop-blur-md transition duration-300 hover:border-gold-500/40"
              >
                <h3 className="mb-2 text-base font-semibold text-white">
                  {f.q}
                </h3>
                <p className="text-sm leading-relaxed text-dark-400">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-16 rounded-3xl border border-gold-500/20 bg-gold-500/5 p-8 text-center">
            <p className="text-sm leading-relaxed text-dark-300">
              No GSTIN? No problem. Register today, complete onboarding, and start
              selling. You can add your GSTIN anytime from your Profile tab.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}