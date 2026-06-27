import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { FallbackImage } from '../ui/FallbackImage';
export const FinalCinematicSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <FallbackImage
          src="/hero-frames/frame_0160.png"
          alt="Industrial Achievement"
          fallbackText="FIN"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-industrial-900/80 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-900/80 via-transparent to-industrial-900/80" />

        {/* Cinematic Fog Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-black via-black/80 to-transparent" />
      </motion.div>

      {/* Volumetric Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-full bg-gradient-radial from-gold-500/10 via-transparent to-transparent pointer-events-none mix-blend-overlay" />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="w-24 h-[1px] bg-gold-500 mx-auto mb-8 shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            <span className="text-white">Building Tomorrow.</span>
            <br />
            <span className="text-gradient">Erecting Excellence.</span>
          </h2>
          
          <p className="text-white/60 text-lg md:text-2xl mb-12 font-light tracking-[0.2em] uppercase">
            Trusted Industrial Partner Since 2006
          </p>
          
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gold-500 text-industrial-900 font-bold rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <Mail className="w-6 h-6 relative z-10" />
            <span className="relative z-10 tracking-wider">Start Your Project</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-gold-500 opacity-60" />
        </motion.div>
      </div>
    </section>
  );
};
