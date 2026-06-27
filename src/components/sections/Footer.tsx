import React from 'react';

export const Footer = () => (
  <footer className="relative py-16 bg-black border-t border-white/10 overflow-hidden">
    {/* Subtle Glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-[100px] pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-2xl font-bold text-gradient drop-shadow-md">R.K. ERECTORS</div>
        <p className="text-white/40 text-sm font-light tracking-wide text-center md:text-left">
          © {new Date().getFullYear()} R.K. Erectors. All rights reserved. Engineering Vision Into Reality.
        </p>
        <div className="flex items-center gap-6">
          {['About', 'Services', 'Industries', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium tracking-wider uppercase text-white/40 hover:text-gold-500 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
