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
    <div className="admin-gradient-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ton-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-ton-cyan/10 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-sm flex flex-col items-center z-10">
        <div className="mb-12 flex flex-col items-center gap-5">
          <div className="w-24 h-24 ton-gradient-button rounded-2xl flex items-center justify-center">
            <span className="material-icons-round text-white text-6xl">bolt</span>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-ton-primary to-ton-cyan bg-clip-text text-transparent">TON Predict</h1>
            <p className="text-slate-600 text-sm font-bold uppercase tracking-[0.25em] mt-2">Admin Panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-ton-primary ml-1">Email</label>
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-ton-primary/50 text-xl">person</span>
              <input
                className="w-full bg-white border-2 border-slate-200 focus:border-ton-primary rounded-xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-ton-primary ml-1">Password</label>
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-ton-primary/50 text-xl">lock</span>
              <input
                className="w-full bg-white border-2 border-slate-200 focus:border-ton-primary rounded-xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-sm"
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
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2">
              <span className="material-icons-round text-red-500 text-lg">error</span>
              <p className="text-sm text-red-700 font-medium" role="alert">
                {error}
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full ton-gradient-button text-white py-4 rounded-xl font-bold text-lg mt-6 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

      </div>

      <div className="absolute bottom-8 flex items-center gap-2 text-slate-500">
        <span className="material-icons-round text-base">shield</span>
        <span className="text-[11px] font-bold uppercase tracking-widest">Secure Admin Access</span>
      </div>
    </div>
  );
}
