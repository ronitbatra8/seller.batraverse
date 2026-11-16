"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { errMessage } from "@/lib/utils";
import { Mail, KeyRound, Lock } from "lucide-react";

export default function SellerForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const id = identifier.trim();
    if (!id) {
      setError("Enter your email or phone number");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: id }),
      });
      setInfo(res.maskedEmail ? `A verification code was sent to ${res.maskedEmail}.` : "A verification code was sent.");
      setStep(2);
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const id = identifier.trim();
    if (!code.trim()) {
      setError("Enter the verification code");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch("/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: id, code: code.trim() }),
      });
      setResetToken(res.resetToken);
      setStep(3);
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      toast("Password reset successfully. Please sign in.", "success");
      router.replace("/login");
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell topPad="pt-2 sm:pt-3" className="login-ui !items-start">
      <div className="mb-6 flex justify-center">
        <Brand light={false} size="lg" mobileWordmark />
      </div>

      <AuthHeading
        title={
          <>
            Forgot <span className="text-gold-gradient">Password</span>
          </>
        }
        titleClassName="text-3xl sm:text-4xl"
        headingGap="mb-3"
        subtitle={
          step === 1
            ? "Enter the email or phone on your account and we'll send a one-time code."
            : step === 2
            ? "Enter the code sent to your email."
            : "Choose a new password for your account."
        }
      />

      <AuthCard>
        <ErrorBanner error={error} />

        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-5 sm:space-y-8">
            <Field label="Email or phone" icon={<Mail size={16} />}>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or 98765 43210"
                autoFocus
                required
                className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
              />
            </Field>
            <SubmitBtn loading={loading} loadingText="Sending code...">
              Send Verification Code
            </SubmitBtn>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-5 sm:space-y-8">
            {info && (
              <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-cream-dim">
                {info}
              </div>
            )}
            <Field label="Verification code" icon={<KeyRound size={16} />}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                autoFocus
                required
                className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-gold transition-colors"
              />
            </Field>
            <SubmitBtn loading={loading} loadingText="Verifying...">
              Verify Code
            </SubmitBtn>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setCode("");
                setError("");
                setInfo("");
              }}
              className="w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80 transition-colors duration-300 hover:text-gold-light"
            >
              Back
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5 sm:space-y-8">
            <PasswordField
              value={newPassword}
              onChange={setNewPassword}
              label="New password"
              hint={null}
            />
            <PasswordField
              value={confirmPassword}
              onChange={setConfirmPassword}
              label="Confirm password"
              hint={null}
            />
            <SubmitBtn loading={loading} loadingText="Resetting...">
              Reset Password
            </SubmitBtn>
          </form>
        )}
      </AuthCard>

      <AuthFooter text="Remembered it?" linkText="Sign in" href="/login" />
    </AuthShell>
  );
}