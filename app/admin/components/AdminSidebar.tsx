"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

type AdminTab = "overview" | "markets" | "deploy" | "history" | "factory" | "settings";

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveTab = (): AdminTab => {
    if (pathname === "/admin") return "overview";
    if (pathname.startsWith("/admin/markets")) return "markets";
    if (pathname.startsWith("/admin/deploy")) return "deploy";
    if (pathname.startsWith("/admin/history")) return "history";
    if (pathname.startsWith("/admin/factory")) return "factory";
    if (pathname.startsWith("/admin/settings")) return "settings";
    return "overview";
  };

  const activeTab = getActiveTab();

  async function handleSignOut() {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
      window.location.href = "/admin/login";
    }
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: "dashboard", href: "/admin" },
    { id: "markets", label: "Markets", icon: "analytics", href: "/admin/markets" },
    { id: "deploy", label: "Deploy", icon: "add_circle", href: "/admin/deploy" },
    { id: "history", label: "History", icon: "history", href: "/admin/history" },
    { id: "factory", label: "Factory", icon: "precision_manufacturing", href: "/admin/factory" },
    { id: "settings", label: "Settings", icon: "settings", href: "/admin/settings" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-60 w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg"
      >
        <span className="material-icons-round text-white">
          {mobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="w-10 h-10 ton-gradient-button rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-icons-round text-white text-xl">bolt</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">TON Predict</h1>
              <p className="text-slate-400 text-xs mt-1">Admin Console</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="material-icons-round text-xl">{item.icon}</span>
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="px-4 py-3 bg-slate-800 rounded-xl">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Factory Address</p>
            <p className="text-xs font-mono text-slate-300">EQD4...9zK2</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
          >
            <span className="material-icons-round text-xl">logout</span>
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
