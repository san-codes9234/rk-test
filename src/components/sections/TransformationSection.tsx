import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FallbackImage } from '../ui/FallbackImage';

gsap.registerPlugin(ScrollTrigger);

export const TransformationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      image: "/hero-frames/frame_0010.png",
      title: "Nature's Foundation",
      subtitle: "Every Great Structure Begins With A Vision",
      description: "Just as nature creates landscapes of breathtaking beauty, human vision seeds the blueprint for industrial excellence."
    },
    {
      image: "/hero-frames/frame_0060.png",
      title: "Vision Becomes Engineering",
      subtitle: "Transforming Ideas Into Plans",
      description: "The journey from concept to engineering precision. Where nature's inspiration meets human innovation."
    },
    {
      image: "/hero-frames/frame_0110.png",
      title: "Engineering Becomes Reality",
      subtitle: "Steel Rises, Vision Materializes",
      description: "Where blueprints become steel frameworks, and engineering precision transforms into tangible industrial power."
    },
    {
      image: "/hero-frames/frame_0150.png",
      title: "Industrial Achievement",
      subtitle: "Vision Fully Realized",
      description: "The culmination of human engineering - standing tall as testament to vision, dedication, and excellence."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newPhase = Math.min(Math.floor(progress * phases.length), phases.length - 1);
            setActivePhase(newPhase);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background Images with Cinematic Crossfades */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activePhase}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <FallbackImage
            src={phases[activePhase].image}
            alt={phases[activePhase].title}
            fallbackText={phases[activePhase].title}
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </motion.div>
      </AnimatePresence>

      {/* Advanced Vignette & Shadows */}
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-900/90 via-industrial-900/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative h-full flex items-center z-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-black/20 backdrop-blur-md border border-white/10 p-10 rounded-3xl shadow-2xl"
              >
                <p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-semibold flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-gold-500 block" />
                  {phases[activePhase].title}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight text-white drop-shadow-md">
                  {phases[activePhase].subtitle.split(' ').map((word, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 1 ? (
                        <span className="text-gradient font-extrabold">{word}</span>
                      ) : (
                        <span className="">{word} </span>
                      )}
                    </span>
                  ))}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed font-light">
                  {phases[activePhase].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Premium Progress Indicator */}
            <div className="mt-12 flex gap-4 ml-2">
              {phases.map((_, index) => (
                <div key={index} className="relative cursor-pointer group" onClick={() => setActivePhase(index)}>
                  <div className={`h-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                    index === activePhase ? 'w-20 bg-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'w-8 bg-white/20 group-hover:bg-white/40 group-hover:w-12'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
