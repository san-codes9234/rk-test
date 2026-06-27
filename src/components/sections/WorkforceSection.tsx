import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Users, Target, CheckCircle } from 'lucide-react';
import { FallbackImage } from '../ui/FallbackImage';
export const WorkforceSection = () => {
  const images = [
    "/hero-frames/frame_0080.png",
    "/hero-frames/frame_0090.png",
    "/hero-frames/frame_0100.png",
    "/hero-frames/frame_0110.png"
  ];

  return (
    <section className="relative py-32 bg-industrial-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            Our Team
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white drop-shadow-md">Workforce &</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Execution</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Our skilled workforce is the backbone of our success. Trained professionals committed to safety, quality, and precision execution.
          </p>
        </div>

        {/* Premium Masonry Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            >
              <FallbackImage
                src={img}
                alt={`Workforce ${index + 1}`}
                fallbackText={`0${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              />
              <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 transition-colors duration-500 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Premium Feature Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: HardHat, title: "Safety Culture", desc: "Zero-compromise protocols" },
            { icon: Users, title: "Expert Team", desc: "Certified workforce" },
            { icon: Target, title: "Precision", desc: "Accuracy in execution" },
            { icon: CheckCircle, title: "Training", desc: "Continuous skill growth" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass bg-white/5 backdrop-blur-xl text-center rounded-3xl p-8 border border-white/10 hover:border-gold-500/30 shadow-2xl group transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 mx-auto bg-industrial-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500/10 transition-colors duration-300">
                <item.icon className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-semibold mb-2 tracking-wide text-lg">{item.title}</h3>
              <p className="text-white/50 text-sm font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
