"use client";

import { signInWithGoogle } from "../lib/actions/firebaseAuth";

const LoginWithGoogleButton = () => {
  return (
    <>
      <button
        className="w-full relative flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-700 text-lg font-medium py-4 px-8 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        onClick={signInWithGoogle}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-6 h-6"
        />
        <span>Continue with Google</span>
      </button>
    </>
  );
};

export default LoginWithGoogleButton;
