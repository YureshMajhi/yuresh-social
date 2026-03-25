const Login = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#fcfaf7] overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{
          backgroundImage: "url('/login-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />

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
          <button className="w-full relative flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-700 text-lg font-medium py-4 px-8 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span>Continue with Google</span>
          </button>

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
