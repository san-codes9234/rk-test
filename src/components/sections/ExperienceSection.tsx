import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: "Tata Power",
      year: "2018 - Present",
      work: "Major maintenance and installation projects across power generation facilities"
    },
    {
      company: "Tata Steel",
      year: "2015 - Present",
      work: "Ongoing steel plant services including fabrication, installation, and maintenance"
    },
    {
      company: "Nuvoco",
      year: "2014 - Present",
      work: "Cement plant services including shutdown support and maintenance"
    },
    {
      company: "Industrial Energy Ltd.",
      year: "2012 - Present",
      work: "Comprehensive plant operation and maintenance services"
    },
    {
      company: "Linde",
      year: "2018 - Present",
      work: "Industrial gas plant maintenance and structural works"
    },
    {
      company: "Power Mech",
      year: "2019 - Present",
      work: "Power plant infrastructure and equipment erection"
    },
    {
      company: "Adhunik Metallics",
      year: "2016 - Present",
      work: "Industrial services and plant operation support"
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 bg-industrial-900 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gold-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            20+ Years of Industrial Excellence
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white drop-shadow-md">Trusted By Industry</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Leaders</span>
          </motion.h2>
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Track Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10" />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`relative flex items-center justify-between md:justify-normal w-full mb-16 last:mb-0 ${
                  isEven ? 'md:flex-row-reverse' : 'flex-row'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-industrial-900 border-2 border-gold-500 transform -translate-x-1/2 shadow-[0_0_10px_rgba(212,175,55,0.5)] z-10" />

                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                  <div className={`glass-premium glass-sweep bg-white/[0.01] hover:border-gold-500/40 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="text-gold-500 text-xs tracking-widest font-mono font-medium bg-gold-500/10 px-3 py-1 rounded-full w-fit">
                        {exp.year}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed font-light">{exp.work}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
