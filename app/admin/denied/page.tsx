"use client";

import Link from "next/link";

export default function AdminDeniedPage() {
  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-10">
      <div className="absolute inset-0 radial-glow-denied pointer-events-none" />
      <div className="w-full max-w-sm flex flex-col items-center z-10 text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            <span
              className="material-symbols-outlined text-red-500 text-6xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
            >
              gpp_bad
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Unauthorized Access
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            You do not have the necessary permissions to access the Admin Panel. Please contact the system administrator if you believe this is an error.
          </p>
        </div>

        <div className="w-full space-y-6 flex flex-col items-center">
          <Link
            href="/"
            className="w-full bg-primary text-background-dark py-4 rounded-2xl font-bold text-lg active:scale-[0.98] transition-transform shadow-lg shadow-primary/20 text-center"
          >
            Back to Home
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary/60 text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-icons-round text-sm">support_agent</span>
            Contact Support
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 opacity-30">
        <span className="material-icons-round text-sm">lock</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Protected Environment</span>
      </div>
    </div>
  );
}
