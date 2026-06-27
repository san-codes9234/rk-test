import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, FlaskConical, Building2, Factory } from 'lucide-react';
import { FallbackImage } from '../ui/FallbackImage';
export const IndustriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      name: "Power Plants",
      image: "/hero-frames/frame_0110.png",
      icon: Zap,
      desc: "Thermal, hydro, and renewable energy facilities"
    },
    {
      name: "Steel Plants",
      image: "/hero-frames/frame_0120.png",
      icon: Gauge,
      desc: "Integrated steel manufacturing and processing"
    },
    {
      name: "Cement Plants",
      image: "/hero-frames/frame_0130.png",
      icon: FlaskConical,
      desc: "Raw material processing and kiln operations"
    },
    {
      name: "Industrial Infrastructure",
      image: "/hero-frames/frame_0140.png",
      icon: Building2,
      desc: "Heavy civil and structural frameworks"
    },
    {
      name: "Manufacturing Facilities",
      image: "/hero-frames/frame_0150.png",
      icon: Factory,
      desc: "Automotive and heavy equipment assembly"
    }
  ];

  return (
    <section id="industries" ref={sectionRef} className="relative py-32 bg-industrial-900 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-radial from-industrial-800/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            Industries Served
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white drop-shadow-md">Expertise Across</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Industrial Sectors</span>
          </motion.h2>
        </div>

        {/* Premium Industries Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl ${
                index === 0 || index === 4 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              <FallbackImage
                src={industry.image}
                alt={industry.name}
                fallbackText={industry.name.substring(0, 2).toUpperCase()}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              />
              
              {/* Premium Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/90 via-industrial-900/40 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-500 mix-blend-overlay" />
              
              {/* Content Panel */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-gold-500/20 group-hover:border-gold-500/50 transition-colors duration-500">
                    <industry.icon className="w-6 h-6 text-gold-500" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold">Sector Focus</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {industry.name}
                </h3>
                <p className="text-white/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  {industry.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
