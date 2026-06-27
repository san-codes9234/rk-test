import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield } from 'lucide-react';
import { FallbackImage } from '../ui/FallbackImage';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        Array.from(sectionRef.current.querySelectorAll('.reveal-item')),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "18+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100+", label: "Team Members" },
    { number: "99%", label: "Safety Record" }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-industrial-900 overflow-hidden">
      {/* Background Grid & Fog */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-industrial-800/30 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 reveal-item font-semibold">
              Who We Are
            </motion.p>
            <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 reveal-item leading-tight tracking-tight">
              <span className="text-white drop-shadow-md">Trusted Industrial</span>
              <br />
              <span className="text-gradient drop-shadow-lg">Service Provider</span>
            </motion.h2>
            <div className="space-y-6 mb-12">
              <motion.p className="text-white/70 text-lg leading-relaxed reveal-item font-light">
                Established in Jamshedpur, R.K. Erectors has been a cornerstone of industrial excellence
                since 2006. We specialize in providing comprehensive industrial services across power plants,
                steel plants, cement plants, and infrastructure projects.
              </motion.p>
              <motion.p className="text-white/70 text-lg leading-relaxed reveal-item font-light">
                Our commitment to reliability, precision, safety, and execution has made us a trusted partner
                for India's leading industrial conglomerates. We transform visions into reality through
                human engineering excellence.
              </motion.p>
            </div>

            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-item bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Premium Image Grid */}
          <motion.div className="relative reveal-item h-full">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <FallbackImage
                    src="/hero-frames/frame_0080.png"
                    alt="Steel Structure"
                    fallbackText="RK"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <FallbackImage
                    src="/hero-frames/frame_0100.png"
                    alt="Industrial Worker"
                    fallbackText="RK"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <FallbackImage
                    src="/hero-frames/frame_0120.png"
                    alt="Industrial Construction"
                    fallbackText="RK"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <FallbackImage
                    src="/hero-frames/frame_0140.png"
                    alt="Steel Framework"
                    fallbackText="RK"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  />
                </div>
              </div>
            </div>

            {/* Premium Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-industrial-800/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 group hover:scale-105 transition-transform duration-500 cursor-default">
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow">
                <Shield className="w-7 h-7 text-industrial-900" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide">ISO Certified</div>
                <div className="text-xs text-white/60 tracking-wider mt-1 font-mono">9001 • 14001 • 45001</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
