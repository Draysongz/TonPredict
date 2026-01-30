"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AdminSidebar } from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setChecking(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isLoginPage) {
        if (user) {
          router.replace("/admin");
        }
        setChecking(false);
        return;
      }

      if (!user) {
        router.replace("/admin/login");
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [isLoginPage, router]);

  if (checking && !isLoginPage) {
    return (
      <div className="admin-gradient-bg min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-ton-primary rounded-full animate-spin" />
          <p className="text-ton-primary font-semibold text-sm">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 w-full">
        {children}
      </main>
    </div>
  );
}
