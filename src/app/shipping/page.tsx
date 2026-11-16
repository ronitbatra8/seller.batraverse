"use client";

import SiteLayout from "@/components/layout/SiteLayout";
import SellerNavbar from "@/components/layout/SellerNavbar";
import { CheckCircle2, Truck, RotateCcw, Package, ClipboardList } from "lucide-react";

const shippingPoints = [
  {
    title: "Pickup Address",
    desc: "You provide a pickup address during onboarding (street, city, state, pincode). All orders are shipped from this location.",
  },
  {
    title: "Delivery Options",
    desc: "Standard and express delivery options are available to customers at checkout. You don't manage couriers — the platform handles dispatch.",
  },
  {
    title: "Packaging Weight Slab",
    desc: "Declare a packaging weight slab per product. This determines the shipping fee charged to the customer at checkout.",
  },
  {
    title: "Order Tracking",
    desc: "Track every order through pending, confirmed, packed, shipped, delivered, and return states — all visible in your Orders tab.",
  },
];

const returnPoints = [
  {
    title: "Return Window Choices",
    desc: "You choose a return window per product: no returns, 6 hours, 12 hours, 24 hours, 3 days, 5 days, or 7 days. This is shown to customers at checkout.",
  },
  {
    title: "How Returns Work",
    desc: "When a customer requests a return within the window, the order moves to a return state. You're notified and can review the request.",
  },
  {
    title: "Refund Settlement",
    desc: "Refunded orders are reflected in your payout ledger. Voided earnings are tracked separately so your records stay clean.",
  },
  {
    title: "Packaging & Condition",
    desc: "Products must be returned in original packaging. Damaged or misused items may be rejected at the platform's discretion.",
  },
];

const faqs = [
  {
    q: "Who pays for shipping?",
    a: "The customer pays the shipping fee at checkout, calculated from your declared packaging weight slab.",
  },
  {
    q: "Can I change my pickup address?",
    a: "Yes — update it anytime from your Profile tab. Future orders will ship from the new address.",
  },
  {
    q: "What if a package is lost in transit?",
    a: "The platform coordinates with the courier. You'll be notified and the order status will reflect the resolution.",
  },
  {
    q: "Can I disable returns for a product?",
    a: "Yes — choose 'no returns' as the return window when creating or editing the product.",
  },
];

export default function ShippingPage() {
  return (
    <SiteLayout>
      <SellerNavbar />
      <section className="relative px-6 pb-20 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-center text-base leading-relaxed text-dark-400">
            How orders are shipped and how returns work for your products.
          </p>

          {/* Shipping */}
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <Truck size={20} strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              Shipping
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {shippingPoints.map((it) => (
              <div
                key={it.title}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/[0.15] p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.35)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-xl transition-all duration-500 group-hover:bg-gold-500/20" />
                <div className="relative">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {it.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dark-400">
                    {it.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Returns */}
          <div className="mb-6 mt-16 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <RotateCcw size={20} strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              Returns
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {returnPoints.map((it) => (
              <div
                key={it.title}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/[0.15] p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.35)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-xl transition-all duration-500 group-hover:bg-gold-500/20" />
                <div className="relative">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {it.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dark-400">
                    {it.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-6 mt-16 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <ClipboardList size={20} strokeWidth={1.75} />
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
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-400">
              <Package size={22} strokeWidth={1.75} />
            </div>
            <p className="text-sm leading-relaxed text-dark-300">
              Declare packaging weight per product, choose your return window, and
              let the platform handle dispatch and tracking. You focus on selling.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}