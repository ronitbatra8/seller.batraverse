"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/Toast";
import Brand from "@/components/brand/Brand";
import {
  AuthShell,
  AuthHeading,
  AuthCard,
  Field,
  PasswordField,
  SubmitBtn,
  ErrorBanner,
  AuthFooter,
} from "@/components/auth/auth-ui";
import { apiFetch } from "@/lib/api";
import { errCode, errMessage } from "@/lib/utils";
import { Mail, Lock } from "lucide-react";

export default function SellerLoginPage() {
  const router = useRouter();
  const { login, loginWithOtp } = useAuth();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [checkState, setCheckState] = useState<"idle" | "checking" | "found" | "missing">("idle");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpInfo, setOtpInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runAccountCheck(id: string) {
    if (!id) {
      setError("Enter your email or phone number");
      setCheckState("idle");
      return;
    }
    if (/@/.test(id) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
      setError("Enter a valid email address");
      setCheckState("idle");
      return;
    }
    if (!/@/.test(id) && !/^\d{10}$/.test(id.replace(/\s/g, ""))) {
      setError("Enter a valid phone number or email");
      setCheckState("idle");
      return;
    }
    setError("");
    setCheckState("checking");
    setPassword("");
    setOtpSent(false);
    setOtpCode("");
    setOtpInfo("");
    try {
      const res = await apiFetch("/auth/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: id, portal: "seller" }),
      });
      setCheckState(res.exists ? "found" : "missing");
    } catch (err) {
      if (errCode(err) === "CUSTOMER_PORTAL_ONLY") {
        setError("This account is not a seller account.");
        setCheckState("checking");
      } else {
        setError(errMessage(err));
        setCheckState("idle");
      }
    }
  }

  function handleIdentifierChange(v: string) {
    setIdentifier(v);
    setCheckState("idle");
    setError("");
    setPassword("");
    setOtpSent(false);
    setOtpCode("");
    setOtpInfo("");
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const id = identifier.trim();
    if (!id) {
      setError("Enter your email or phone number");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setLoading(true);
    try {
      const user = await login(id, password, "seller");
      if (user.role !== "SELLER") {
        setError("This account is not a seller account.");
        return;
      }
      router.replace("/seller");
    } catch (err) {
      if (errCode(err) === "NOT_FOUND") {
        setCheckState("missing");
        setError("");
      } else if (errCode(err) === "CUSTOMER_PORTAL_ONLY") {
        setError("This account is not a seller account.");
      } else {
        setError(errMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    setError("");
    const id = identifier.trim();
    if (!id) {
      setError("Enter your email or phone number");
      return;
    }
    setLoading(true);
    setOtpSent(false);
    setOtpCode("");
    setOtpInfo("");
    try {
      const res = await apiFetch("/auth/login/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: id }),
      });
      if (!res.maskedEmail) {
        throw new Error(res.error || "Could not send OTP");
      }
      setOtpSent(true);
      setOtpInfo(res.message || `OTP sent to ${res.maskedEmail}`);
    } catch (err) {
      if (errCode(err) === "NOT_FOUND") {
        setCheckState("missing");
        setError("");
      } else if (errCode(err) === "CUSTOMER_PORTAL_ONLY") {
        setError("This account is not a seller account.");
      } else {
        setError(errMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const id = identifier.trim();
    if (!id) {
      setError("Enter your email or phone number");
      return;
    }
    if (!otpCode.trim()) {
      setError("Enter the OTP sent to your email");
      return;
    }
    setLoading(true);
    try {
      const user = await loginWithOtp(id, otpCode.trim());
      if (user.role !== "SELLER") {
        setError("This account is not a seller account.");
        return;
      }
      router.replace("/seller");
    } catch (err) {
      if (errCode(err) === "NOT_FOUND") {
        setCheckState("missing");
        setError("");
      } else if (errCode(err) === "CUSTOMER_PORTAL_ONLY") {
        setError("This account is not a seller account.");
      } else {
        setError(errMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const id = identifier.trim();
    if (!id) {
      setError("Enter your email or phone number");
      return;
    }
    if (checkState === "missing") {
      router.push("/register");
      return;
    }
    if (otpSent) {
      return handleOtpSubmit(e);
    }
    if (checkState !== "found") {
      return runAccountCheck(id);
    }
    return handlePasswordSubmit(e);
  }

  return (
    <AuthShell topPad="pt-2 sm:pt-3" className="login-ui !items-start">
      <div className="mb-6 flex justify-center">
        <Brand light={false} size="lg" mobileWordmark />
      </div>

      <AuthHeading
        title={
          <>
            Seller <span className="text-gold-gradient">Sign In</span>
          </>
        }
        titleClassName="text-3xl sm:text-4xl"
        headingGap="mb-3"
      />

      <AuthCard>
        <ErrorBanner error={error} />

        <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-8">
          <Field label="Email or phone number" icon={<Mail size={16} />}>
            <input
              type="text"
              value={identifier}
              onChange={(e) => handleIdentifierChange(e.target.value)}
              placeholder="you@example.com or 98765 43210"
              autoFocus
              required
              className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
            />
          </Field>

          {checkState === "missing" && (
            <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-cream-dim">
              No account found. Create one to start selling.
            </div>
          )}

          {checkState === "found" && !otpSent && (
            <>
              <PasswordField
                value={password}
                onChange={setPassword}
                hint={
                  <a
                    href="/forgot-password"
                    className="text-[10px] font-medium uppercase tracking-wider text-gold/80 transition-colors duration-300 hover:text-gold-light"
                  >
                    Forgot password?
                  </a>
                }
              />

              <button
                type="button"
                disabled={loading}
                onClick={handleSendOtp}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-gold/40 bg-dark-950 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:border-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sign in with OTP
              </button>

              <SubmitBtn
                loading={loading}
                loadingText="Signing in..."
              >
                Sign In
              </SubmitBtn>
            </>
          )}

          {checkState === "found" && otpSent && (
            <>
              {otpInfo && (
                <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-cream-dim">
                  {otpInfo}
                </div>
              )}
              <Field label="OTP" icon={<Lock size={16} />}>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter OTP"
                  required
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
                />
              </Field>
              <SubmitBtn loading={loading} loadingText="Verifying...">
                Verify &amp; Sign In
              </SubmitBtn>
            </>
          )}

          {checkState !== "found" && checkState !== "missing" && (
            <SubmitBtn
              loading={loading}
              loadingText={checkState === "checking" ? "Checking..." : "Continue"}
            >
              Continue
            </SubmitBtn>
          )}
        </form>

        {checkState === "missing" && (
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="group mt-4 inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-500 bg-rose-500 text-abyss hover:bg-rose-400 hover:shadow-[0_0_40px_rgba(244,63,94,0.45)]"
          >
            Register
          </button>
        )}
      </AuthCard>

      <AuthFooter text="New to BATRAVERSE?" linkText="Create seller account" href="/register" />
    </AuthShell>
  );
}