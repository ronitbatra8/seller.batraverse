"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, Phone, User as UserIcon, Check } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/Toast";
import Brand from "@/components/brand/Brand";
import {
  AuthShell,
  AuthHeading,
  AuthCard,
  Field,
  PasswordField,
  ErrorBanner,
  AuthFooter,
  inputCls,
} from "@/components/auth/auth-ui";
import { cn } from "@/lib/utils";
import { errMessage } from "@/lib/utils";
import { apiFetch } from "@/lib/api";

type Step = 1 | 2 | 3;

export default function SellerRegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInfo, setOtpInfo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) toast(error, "error");
  }, [error, toast]);

  const phoneOk = (v: string) => {
    const cleaned = v.replace(/[\s\-()+.]+/g, "");
    return /^[6-9]\d{9}$/.test(cleaned) || (cleaned.startsWith("91") && cleaned.length === 12 && /^[6-9]\d{9}$/.test(cleaned.slice(2)));
  };

  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const step1Ok = emailOk(email) && phoneOk(phone);
  const step2Ok = name.trim().length >= 2 && password.length >= 6 && password === confirmPassword;

  const goStep = (n: Step) => {
    if (n < step) setStep(n);
  };

  const handleSendOtp = async () => {
    setError("");
    if (!emailOk(email)) {
      setError("Enter a valid email address");
      return;
    }
    setLoading(true);
    setOtpSent(false);
    setOtpCode("");
    setOtpInfo("");
    try {
      const res = await apiFetch("/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });
      setOtpSent(true);
      setOtpInfo(res.message || `OTP sent to ${email.trim()}`);
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otpCode.trim()) {
      setError("Enter the OTP sent to your email");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: otpCode.trim() }),
      });
      setVerifyToken(res.verifyToken);
      setStep(2);
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!step1Ok) {
      setError("Enter a valid email and 10-digit phone number");
      return;
    }
    if (!otpSent) {
      return handleSendOtp();
    }
    return handleVerifyOtp();
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!step2Ok) {
      if (name.trim().length < 2) setError("Name must be at least 2 characters");
      else if (password.length < 6) setError("Password must be at least 6 characters");
      else if (password !== confirmPassword) setError("Passwords do not match");
      return;
    }
    setStep(3);
  };

  const handleRegister = async (withGst: boolean) => {
    if (withGst) {
      toast("GST registration isn't available yet. You can list products without a GSTIN.", "info");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const user = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: "SELLER",
        verifyToken,
      });
      // register signature may differ; fallback handled below
      router.replace("/seller");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const light = false;

  return (
    <SiteLayout>
      <div className="mx-auto mt-20 max-w-[100rem] px-5 sm:px-10">
        <h1 className="font-display text-3xl font-medium tracking-wide text-cream">
          Create seller account
        </h1>

        {/* Stepper */}
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
          {[
            { n: 1, label: "Contact" },
            { n: 2, label: "Account" },
            { n: 3, label: "GSTIN" },
          ].map((s, i) => (
            <Fragment key={s.n}>
              {i > 0 && (
                <div
                  className={`h-px w-8 sm:w-14 ${
                    step >= s.n ? "bg-gold" : "bg-white/10"
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => goStep(s.n as Step)}
                className={`flex items-center gap-2 ${s.n < step ? "cursor-pointer" : ""}`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                    step >= s.n
                      ? "bg-gold text-abyss"
                      : "bg-white/10 text-cream-dim/50"
                  }`}
                >
                  {s.n < step ? <Check size={12} /> : s.n}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                    step >= s.n ? "text-cream" : "text-cream-dim/40"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </Fragment>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3 sm:gap-10">
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1 — Contact (email + phone + OTP) */}
            {step === 1 && (
              <div className="rounded-2xl border border-white/5 bg-graphite p-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cream-dim/60">
                  1 — Contact Details
                </h2>
                <form onSubmit={handleStep1Submit} className="mt-5 space-y-5">
                  <div>
                    <label className="block text-xs text-dark-400 uppercase tracking-wider mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoFocus
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-4 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 uppercase tracking-wider mb-2 font-medium">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-4 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {otpSent && (
                    <>
                      {otpInfo && (
                        <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-cream-dim">
                          {otpInfo}
                        </div>
                      )}
                      <div>
                        <label className="block text-xs text-dark-400 uppercase tracking-wider mb-2 font-medium">
                          OTP
                        </label>
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter OTP"
                          required
                          className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-4 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </>
                  )}

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gold px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-abyss transition-all duration-500 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Please wait..."
                      : otpSent
                      ? "Verify OTP"
                      : "Send OTP"}
                  </button>

                  <p className="pt-2 text-center text-sm text-cream-dim">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-gold transition-colors duration-300 hover:text-gold-light">
                      Sign in
                    </a>
                  </p>
                </form>
              </div>
            )}

            {/* Step 2 — Account (name + password) */}
            {step === 2 && (
              <div className="rounded-2xl border border-white/5 bg-graphite p-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cream-dim/60">
                  2 — Account Details
                </h2>
                <form onSubmit={handleStep2Submit} className="mt-5 space-y-5">
                  <div>
                    <label className="block text-xs text-dark-400 uppercase tracking-wider mb-2 font-medium">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      autoFocus
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-4 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 uppercase tracking-wider mb-2 font-medium">
                      Create password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-4 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 uppercase tracking-wider mb-2 font-medium">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-4 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold hover:text-gold-light"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-gold px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-abyss transition-all duration-500 hover:bg-gold-400"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3 — GST choice */}
            {step === 3 && (
              <div className="rounded-2xl border border-white/5 bg-graphite p-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cream-dim/60">
                  3 — GST Details
                </h2>
                <p className="mt-3 text-sm text-cream-dim">
                  Do you have a GSTIN?
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => toast("GST registration isn't available yet. You can list products without a GSTIN.", "info")}
                    className="rounded-2xl border border-white/10 bg-dark-900/60 p-5 text-left transition-all duration-300 hover:border-gold/40 hover:bg-gold/5"
                  >
                    <p className="text-base font-semibold text-cream">I have a GSTIN</p>
                    <p className="mt-1 text-xs text-cream-dim/60">
                      GST verification isn't live yet.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegister(false)}
                    disabled={loading}
                    className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-left transition-all duration-300 hover:border-gold hover:bg-gold/20 disabled:opacity-50"
                  >
                    <p className="text-base font-semibold text-gold-light">I don't have a GSTIN</p>
                    <p className="mt-1 text-xs text-cream-dim/60">
                      Register and start selling without GSTIN.
                    </p>
                  </button>
                </div>

                {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold hover:text-gold-light"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/5 bg-graphite p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream-dim/60">
                Seller onboarding
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                Complete these steps to create your seller account and start listing
                products on BATRAVERSE.
              </p>
            </div>
          </div>
        </div>

      </div>
    </SiteLayout>
  );
}