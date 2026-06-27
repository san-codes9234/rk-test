import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, CheckCircle } from 'lucide-react';

export const CompanyProfileSection = () => {
  const strengths = [
    "Industrial Engineering",
    "Maintenance Services",
    "Commissioning Services",
    "Installation Services",
    "Civil Repair Services",
    "Plant Operations",
    "Power, Steel and Cement Sector Experience"
  ];

  return (
    <section id="company-profile" className="relative py-32 bg-industrial-800 overflow-hidden perspective-1000">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
              Corporate Document
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              <span className="text-white drop-shadow-md">Complete Company</span>
              <br />
              <span className="text-gradient drop-shadow-lg">Profile</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light mb-8">
              <p>
                Explore our comprehensive corporate profile. This document contains detailed information regarding our history, services, mission, vision, and the executive leadership guiding R.K. Erectors.
              </p>
            </div>

            {/* Key Strengths */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-xl tracking-wide">Key Capabilities Highlighted</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strengths.map((strength, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-center gap-3 text-white/80 text-sm font-light"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.05), duration: 0.4 }}
                  >
                    <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Premium Animated PDF Viewer Card */}
          <motion.div
            className="relative perspective-1000 flex flex-col gap-6"
            initial={{ opacity: 0, rotateY: 15, x: 50 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="relative glass-premium bg-white/[0.02] rounded-3xl p-4 transition-transform duration-700 ease-out"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
              
              {/* Actual PDF Viewer */}
              <div className="aspect-[1/1.3] bg-industrial-900 border border-white/5 rounded-2xl overflow-hidden relative shadow-inner">
                <iframe 
                  src="/company-profile/RK_Erectors_Company_Profile.pdf?v=20260621#toolbar=0&navpanes=0&scrollbar=0"
                  className="w-full h-full border-0"
                  title="R.K. Erectors Company Profile"
                />
              </div>
            </motion.div>

            {/* Action Buttons with the PDF */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/company-profile/RK_Erectors_Company_Profile.pdf?v=20260621"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-sweep relative px-8 py-4 bg-gold-500 text-industrial-900 font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all hover:-translate-y-1 flex items-center gap-3 flex-1 justify-center max-w-xs"
              >
                <Eye className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Fullscreen</span>
              </a>
              
              <a
                href="/company-profile/RK_Erectors_Company_Profile.pdf?v=20260621"
                download
                className="group glass-sweep relative px-8 py-4 glass-premium text-white font-bold rounded-xl overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center gap-3 flex-1 justify-center max-w-xs"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <span>Download</span>
              </a>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gold-500/20 blur-[80px] -z-10 rounded-full opacity-50 transition-opacity duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
