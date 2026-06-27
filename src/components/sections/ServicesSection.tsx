import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Settings, Building2, Hammer, Move, Truck, Factory, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Wrench,
      title: "Maintenance Services",
      description: "Comprehensive preventive and corrective maintenance ensuring optimal equipment performance and longevity."
    },
    {
      icon: Settings,
      title: "Commissioning",
      description: "Expert commissioning ensuring systems operate efficiently and meet all operational specifications."
    },
    {
      icon: Building2,
      title: "Installation",
      description: "Precise installation of industrial equipment with adherence to safety protocols and quality standards."
    },
    {
      icon: Hammer,
      title: "Civil Repairs",
      description: "Structural repairs and rehabilitation work maintaining integrity of industrial infrastructure."
    },
    {
      icon: Move,
      title: "Lifting & Shifting",
      description: "Heavy machinery movement and positioning with specialized equipment and expert handling."
    },
    {
      icon: Truck,
      title: "Supply Services",
      description: "Quality material and equipment supply ensuring project continuity and reliability."
    },
    {
      icon: Factory,
      title: "Plant Operation",
      description: "Complete plant operation and management services optimizing production efficiency."
    },
    {
      icon: Clock,
      title: "Shutdown Support",
      description: "Rapid response industrial shutdown services minimizing downtime and ensuring safety."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card-item",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 bg-industrial-900 overflow-hidden perspective-1000">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-white/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            Our Expertise
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white drop-shadow-md">Comprehensive Industrial</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Solutions</span>
          </motion.h2>
        </div>

        {/* Premium Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card-item group cursor-crosshair relative"
              whileHover={{ y: -15, scale: 1.03, rotateX: 2, rotateY: -2, zIndex: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative h-full glass-premium glass-sweep rounded-3xl p-8 transition-all duration-500 overflow-hidden group-hover:shadow-[0_30px_60px_rgba(212,175,55,0.2)] group-hover:border-gold-500/30">
                
                {/* Glow Effect behind icon */}
                <div className="absolute top-8 left-8 w-24 h-24 bg-gold-500/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-industrial-800 to-industrial-700 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:border-gold-500/50 transition-colors duration-500 shadow-inner">
                    <service.icon className="w-8 h-8 text-gold-500 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  </div>
                  <motion.div 
                    className="p-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-lg border border-transparent hover:border-white/20 hover:shadow-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gold-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300 font-light">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Decorative Line */}
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
