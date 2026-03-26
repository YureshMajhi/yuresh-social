"use client";

import React, { useEffect, useState } from "react";
import NavIcons from "@/components/NavIcons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<String | null>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user?.displayName);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading</div>;
  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-orange-200 via-[#fcf5eb] to-amber-100 text-gray-800 antialiased flex flex-col">
        <div className="p-4 md:p-6 pb-0 shrink-0 max-w-7xl mx-auto w-full">
          <nav className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm rounded-full px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0714b] text-white flex items-center justify-center font-medium text-lg">
                y
              </div>
              <h1 className="text-xl tracking-tight font-medium text-gray-900 hidden sm:block">
                Hello {user?.split(" ")[0]}
              </h1>
            </div>

            <div className="flex-1 max-w-xl px-8 hidden md:block relative">
              <i
                data-lucide="search"
                className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              ></i>
              <input
                type="text"
                placeholder="Search for people, messages, posts..."
                className="w-full bg-white/50 border border-gray-200/80 rounded-full pl-12 pr-6 py-2.5 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 focus:bg-white transition-all"
              />
            </div>

            <NavIcons />
          </nav>
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
