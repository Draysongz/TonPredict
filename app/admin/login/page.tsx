"use client";

import { useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const auth = getFirebaseAuth();
    if (!auth) {
      setError("Auth not available. Check your environment.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Full page navigation so the app loads with auth state already restored;
      // avoids race where layout sees null and redirects back to login.
      window.location.href = "/admin";
      return;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      if (typeof message === "string" && message.includes("auth/")) {
        setError("Invalid email or password.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background-dark text-slate-900 min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="w-full max-w-sm flex flex-col items-center z-10">
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-primary rounded-[24px] flex items-center justify-center shadow-[0_0_30px_rgba(0,136,204,0.2)]">
            <span className="material-icons-round text-white text-5xl">bolt</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">TON Predict</h1>
            <p className="text-primary/60 text-sm font-semibold uppercase tracking-[0.2em] mt-1">Admin Panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-4">Email</label>
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-lg">person</span>
              <input
                className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-4">Password</label>
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-lg">lock</span>
              <input
                className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-400 text-center" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg mt-4 active:scale-[0.98] transition-transform shadow-lg shadow-primary/20 disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

      </div>

      <div className="absolute bottom-8 flex items-center gap-2 opacity-30">
        <span className="material-icons-round text-sm">shield</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Secure Admin Access</span>
      </div>
    </div>
  );
}
