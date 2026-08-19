import React from "react";

export default function AuthLayout({
  children,
  headline = "Connect. Share. Chat.",
  description = "Connect with your friends, share your moments, discover new people and chat in real-time.",
  showDots = false,
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#faf5ff] via-[#fff1f2] to-[#fff7ed] flex items-center justify-center p-4 sm:p-6 md:p-8 select-none">
      <div className="w-full max-w-4xl bg-white rounded-3xl md:rounded-[32px] shadow-2xl shadow-purple-900/10 border border-purple-100/50 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[580px]">

        <div className="relative bg-gradient-to-br from-[#9333ea] via-[#ec4899] to-[#f97316] p-8 sm:p-10 md:p-12 flex flex-col justify-between text-white overflow-hidden min-h-[320px] md:min-h-full">

          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-black/10 rounded-full blur-2xl pointer-events-none" />


          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">

              <div className="w-7 h-7 rounded-xl border-[2.5px] border-white flex items-center justify-center relative">
                <div className="w-3 h-3 rounded-full border-[2px] border-white" />
                <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              Instagram
            </span>
          </div>


          <div className="relative z-10 my-auto py-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 leading-snug">
              {headline}
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
              {description}
            </p>


            {showDots && (
              <div className="flex items-center gap-2 mt-8">
                <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition" />
                <span className="w-3 h-3 rounded-full bg-white/40 hover:bg-white/60 transition" />
              </div>
            )}
          </div>


          <div className="relative z-10 text-xs text-white/70">
            © {new Date().getFullYear()} Instagram • All rights reserved
          </div>
        </div>


        <div className="bg-white p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
