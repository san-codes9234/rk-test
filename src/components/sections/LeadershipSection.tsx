import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { FallbackImage } from '../ui/FallbackImage';

const LeadershipCard = ({ leader, index }: { leader: any, index: number }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
    >
      {/* Premium Leadership Card */}
      <div className="glass-premium glass-sweep bg-white/[0.02] rounded-[2.5rem] p-4 pb-8 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] hover:border-gold-500/30">

        {/* Image Container */}
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent z-10 opacity-60" />
          <FallbackImage
            src={leader.image}
            alt={leader.name}
            fallbackText={leader.initials}
            fallbackClassName="bg-industrial-800"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] contrast-[1.1]"
            loading="lazy"
            decoding="async"
          />

          {/* Floating Action Buttons */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <a href={leader.social.email} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold-500 hover:text-industrial-900 hover:border-transparent transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-2">{leader.name}</h3>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-sm font-semibold tracking-wide mb-6">
            {leader.role}
          </div>
          <p className="text-white/60 font-light leading-relaxed">{leader.bio}</p>
        </div>

      </div>
    </motion.div>
  );
};

export const LeadershipSection = () => {
  const leaders = [
    {
      name: "Rajesh Kumar",
      role: "Proprietor",
      // Store real photographs in the /public/team/ folder to replace them automatically
      image: "/team/rajesh-kumar.jpeg",
      initials: "RK",
      bio: "As the Founder and Proprietor of R.K. Erectors, Rajesh Kumar provides visionary leadership and strategic direction for the company. Backed by long-term industrial experience, his guidance drives company growth and fosters unwavering client trust.",
      social: {
        linkedin: "#",
        email: "mailto:rk.erectorsjsr@gmail.com"
      }
    },
    {
      name: "Binod Kumar",
      role: "Managing Director",
      // Store real photographs in the /public/team/ folder to replace them automatically
      image: "/team/binod-kumar.jpeg",
      initials: "BK",
      bio: "As Managing Director, Binod Kumar oversees comprehensive operations management and project execution. His dedicated workforce leadership ensures exceptional client delivery while maintaining rigorous quality and safety oversight.",
      social: {
        linkedin: "#",
        email: "mailto:rk.erectorsjsr@gmail.com"
      }
    }
  ];

  return (
    <section className="py-32 bg-industrial-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-gold-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            Executive Leadership
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white drop-shadow-md">Visionary</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Direction</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <LeadershipCard key={index} leader={leader} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
