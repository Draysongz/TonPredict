"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
      <div className="bg-background-dark min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-primary/80 text-sm">Checking auth…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
