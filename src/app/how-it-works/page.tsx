import SiteLayout from "@/components/layout/SiteLayout";
import SellerNavbar from "@/components/layout/SellerNavbar";
import { CheckCircle2, User, Store, ShieldCheck, Package, Coins } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: User,
    title: "Register your seller account",
    desc: "Create your account with email verification and set up your login credentials.",
    points: [
      "Sign up with your email address and verify it with a one-time OTP.",
      "Set a secure password and complete the basic account details.",
      "Your account is created with the Seller role and is ready for onboarding.",
    ],
  },
  {
    n: "02",
    icon: Store,
    title: "Complete your seller profile",
    desc: "Fill in your shop, pickup, and payout details — all are mandatory before approval.",
    points: [
      "Add your shop name and a short description of what you sell.",
      "Enter a pickup address (street, city, state, pincode) for order shipments.",
      "Provide payout details — bank account or UPI — for receiving earnings.",
      "GSTIN is optional; you can add it later from your Profile tab.",
    ],
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Get approved by the owner",
    desc: "The owner reviews your profile and approves your account before you can sell.",
    points: [
      "The owner verifies your shop details and payout information.",
      "You receive a notification once your account is approved.",
      "Until approved, your account is in review and products cannot go live.",
    ],
  },
  {
    n: "04",
    icon: Package,
    title: "Add your products",
    desc: "List products with images, variants, pricing, and return windows for review.",
    points: [
      "Add up to 10 images per product, or paste image URLs.",
      "Set your seller price, declare packaging weight, and choose a return window.",
      "The owner reviews and approves each product before it goes live.",
    ],
  },
  {
    n: "05",
    icon: Coins,
    title: "Manage orders and track payouts",
    desc: "Handle orders end-to-end and watch your earnings settle transparently.",
    points: [
      "See every order containing your products with customer and shipping details.",
      "Track order states: pending, confirmed, packed, shipped, delivered, returned.",
      "A payout record is created at your seller price when an order is delivered.",
      "The owner marks payouts as paid once funds are transferred to you.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <SiteLayout>
      <SellerNavbar />
      <section className="relative px-6 pb-20 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 flex flex-col items-center text-center">
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              How it{" "}
              <span className="text-gold-gradient">works</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-dark-400">
              Everything you need to start selling on BATRAVERSE.
            </p>
          </div>

          <div className="relative space-y-6">
            <div className="pointer-events-none absolute left-[34px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-gold-500/40 via-white/10 to-transparent sm:block" />

            {steps.map((s) => (
              <div
                key={s.n}
                className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/[0.15] p-7 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.35)] sm:pl-20"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-xl transition-all duration-500 group-hover:bg-gold-500/20" />
                <div className="absolute left-7 top-7 hidden h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 transition-all duration-500 group-hover:scale-110 group-hover:border-gold-500/60 group-hover:bg-gold-500/20 group-hover:text-gold-300 sm:flex">
                  <s.icon size={16} strokeWidth={2} />
                </div>

                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-gold-500/40 transition-colors duration-500 group-hover:text-gold-400">
                      {s.n}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-dark-300">
                    {s.desc}
                  </p>
                  <ul className="space-y-2">
                    {s.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-dark-400"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-gold-500/70"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/30 bg-white/[0.15] p-12 text-center backdrop-blur-md">
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to start selling?
          </h2>
          <p className="mt-4 text-dark-300">
            Create your seller account and reach customers across India.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-3.5 text-sm font-semibold text-dark-950 transition-all hover:bg-gold-400"
            >
              Register
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-rose-500 px-8 py-3.5 text-sm font-semibold text-rose-400 transition-all hover:bg-rose-500/10 hover:text-rose-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}