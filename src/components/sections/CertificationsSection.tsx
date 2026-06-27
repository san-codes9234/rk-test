import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { Award, FileCheck, X } from 'lucide-react';

const Counter = ({ value, label, suffix = "+" }: { value: number, label: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true });
  
  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);
  
  return (
    <div ref={containerRef} className="text-center p-8 glass-premium glass-sweep rounded-3xl transform transition-transform duration-500 hover:-translate-y-2">
      <div ref={nodeRef} className="text-5xl font-bold text-gradient mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">0{suffix}</div>
      <div className="text-xs md:text-sm text-white/80 uppercase tracking-[0.2em] font-medium">{label}</div>
    </div>
  );
};

export const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  const certifications = [
    { code: "ISO 9001", title: "Quality Management", desc: "Excellence in quality processes and standards." },
    { code: "ISO 14001", title: "Environmental Management", desc: "Commitment to sustainable operations." },
    { code: "ISO 45001", title: "Occupational Safety", desc: "Strict workplace safety standards." },
    { code: "GST", title: "Tax Compliance", desc: "Goods and Services Tax registered." },
    { code: "PF", title: "Provident Fund", desc: "Employee social security compliance." },
    { code: "ESIC", title: "State Insurance", desc: "Health and medical insurance compliance." },
    { code: "Udyam", title: "MSME Registration", desc: "Registered micro, small & medium enterprise." }
  ];

  return (
    <section id="certificates" className="relative py-32 bg-industrial-900 overflow-hidden perspective-1000">
      {/* Dynamic Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            Trust & Compliance Center
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white drop-shadow-md">Certified</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Excellence</span>
          </motion.h2>
        </div>

        {/* Trust Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          <Counter value={20} label="Years Experience" />
          <Counter value={150} label="Projects Completed" />
          <Counter value={500} label="Skilled Workforce" />
          <Counter value={50} label="Industrial Clients" />
        </div>

        {/* Premium Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-badge group cursor-pointer relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10, zIndex: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] blur-2xl -z-10" />
              <div className="relative glass-premium glass-sweep text-center rounded-[24px] p-8 h-full flex flex-col items-center justify-center group-hover:border-gold-500/50 group-hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-industrial-800 to-industrial-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:border-gold-500/50 transition-colors duration-500">
                  <FileCheck className="w-8 h-8 text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-2">{cert.code}</div>
                <h3 className="text-sm font-semibold text-white tracking-wide">{cert.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-industrial-900/80 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative glass-premium p-10 max-w-lg w-full text-center"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-gold-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-industrial-800 to-industrial-900 border border-gold-500/30 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <Award className="w-12 h-12 text-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
              </div>
              <h2 className="text-4xl font-bold text-gradient mb-4">{selectedCert.code}</h2>
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">{selectedCert.title}</h3>
              <p className="text-white/60 leading-relaxed font-light">{selectedCert.desc}</p>
              
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs text-white/40 uppercase tracking-widest">Verified Corporate Document</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
