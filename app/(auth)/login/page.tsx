"use client";

import LoginWithGoogleButton from "@/app/components/LoginWithGoogleButton";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <main className="z-10 w-full max-w-md mx-6 p-10 sm:p-12 flex flex-col items-center justify-between min-h-160 bg-white/50 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60">
        <div className="flex flex-col items-center text-center space-y-6 mt-4 w-full">
          <div className="flex flex-col items-center gap-5">
            <div className="w-20 h-20 bg-linear-to-br from-[#fbbd3f] via-[#f26d3d] to-[#d83c34] rounded-4xl rounded-br-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white text-4xl font-semibold tracking-tight">y</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-800 drop-shadow-sm">
              Yuresh Social
            </h1>
          </div>

          <p className="text-lg font-medium tracking-tight text-slate-600 leading-snug max-w-65">
            Connect with friends and the world around you.
          </p>
        </div>

        <div className="w-full flex flex-col items-center space-y-8 mt-24 mb-2">
          <LoginWithGoogleButton />

          <div className="flex items-center justify-center gap-6 text-base font-medium text-slate-500 w-full">
            <a href="#" className="hover:text-slate-800 transition-colors">
              Create New Account
            </a>
            <div className="w-px h-4 bg-slate-300"></div>
            <a href="#" className="hover:text-slate-800 transition-colors">
              Forgot Password?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
