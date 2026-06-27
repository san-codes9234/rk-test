import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', _honeypot: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      let response;
      
      // Mock API call in local Vite development to allow testing UI states
      if (import.meta.env.DEV) {
        console.log('[Dev Mode] Mocking contact form submission:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
        response = new Response(JSON.stringify({ success: true, message: 'Mock email sent successfully' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      const text = await response.text();
      let data;
      
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Failed to parse response:', text);
        throw new Error('Received invalid response from the server.');
      }

      // Check if it's a 404 (Happens when POSTing to /api in standard Vite dev mode)
      if (response.status === 404) {
         throw new Error('Email API is not available in local Vite development. Please test on the deployed Vercel site or run "vercel dev" locally.');
      }

      // Check if it's the Vite development server returning the index.html fallback
      if (text.trim().toLowerCase().startsWith('<!doctype html>')) {
         throw new Error('API routes are not available in standard Vite dev mode. Please use Vercel CLI (vercel dev) to test the contact form locally.');
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || data.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '', _honeypot: '' });
      
      // Reset success state after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error: any) {
      console.error('Contact Form Error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-industrial-900 overflow-hidden">
      {/* Premium Backgrounds */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gold-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p className="text-gold-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold">
            Get In Touch
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white drop-shadow-md">Let's Build</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Together</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-12">
              <motion.a
                href="https://goo.gl/maps/your-google-map-link-here"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-6 glass-premium glass-sweep p-6 rounded-3xl hover:border-gold-500/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-industrial-900 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-gold-500/50 transition-colors">
                  <MapPin className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-white/60 font-light leading-relaxed">Jamshedpur, Jharkhand, India</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+919110146650"
                className="flex items-start gap-6 glass-premium glass-sweep p-6 rounded-3xl hover:border-gold-500/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-industrial-900 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-gold-500/50 transition-colors">
                  <Phone className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone & Office</h3>
                  <p className="text-white/60 font-light leading-relaxed">
                    +91 9110146650<br />
                    +91 9431381900<br />
                    0657 2210 122
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:r.k.erectorsjsr@gmail.com"
                className="flex items-start gap-6 glass-premium glass-sweep p-6 rounded-3xl hover:border-gold-500/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-industrial-900 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-gold-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-white/60 font-light leading-relaxed">r.k.erectorsjsr@gmail.com</p>
                </div>
              </motion.a>

              {/* Quick Actions */}
              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="tel:+919110146650"
                  className="px-6 py-3 bg-white/10 hover:bg-gold-500 hover:text-industrial-900 border border-white/20 hover:border-gold-500 text-white text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919110146650"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-500/10 hover:bg-green-500 hover:text-white text-green-500 border border-green-500/30 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Premium Map Container */}
            <motion.div
              className="aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 mix-blend-overlay" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35296728196!2d86.15467759999999!3d22.8027969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31989f0e2b5%3A0xeeec8e81ce51e9!2sJamshedpur%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%) hue-rotate(180deg)' }}
                loading="lazy"
                title="Location Map"
              />
            </motion.div>
          </div>

          {/* Premium Contact Form */}
          <motion.div
            className="glass-premium-dark rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center h-full min-h-[400px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">Message Sent!</h3>
                  <p className="text-white/60 font-light text-center">Thank you for reaching out.<br />We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Honeypot Spam Protection Field */}
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Don't fill this out if you're human:
                      <input
                        type="text"
                        name="_honeypot"
                        tabIndex={-1}
                        value={formData._honeypot}
                        onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                      />
                    </label>
                  </div>

                  <p className="text-white/60 text-sm font-light italic mb-6">
                    <CheckCircle className="inline-block w-4 h-4 text-green-500 mr-2 -mt-0.5" />
                    Your message will be delivered directly to R.K. Erectors.
                  </p>


                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-3 ml-2">Name</label>
                      <input
                        type="text"
                        required
                        disabled={status === 'loading'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 bg-industrial-900/50 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-gold-500 focus:bg-white/5 focus:outline-none transition-all duration-300 font-light disabled:opacity-50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-3 ml-2">Email</label>
                      <input
                        type="email"
                        required
                        disabled={status === 'loading'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 bg-industrial-900/50 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-gold-500 focus:bg-white/5 focus:outline-none transition-all duration-300 font-light disabled:opacity-50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-3 ml-2">Company</label>
                    <input
                      type="text"
                      disabled={status === 'loading'}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-6 py-4 bg-industrial-900/50 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-gold-500 focus:bg-white/5 focus:outline-none transition-all duration-300 font-light disabled:opacity-50"
                      placeholder="Your Company Ltd. (Optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-3 ml-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      disabled={status === 'loading'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 bg-industrial-900/50 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:border-gold-500 focus:bg-white/5 focus:outline-none transition-all duration-300 font-light resize-none disabled:opacity-50"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-gradient-to-r from-gold-400 to-gold-600 text-industrial-900 font-bold rounded-2xl shadow-[0_10px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  >
                    {status === 'loading' ? (
                      <div className="w-6 h-6 border-2 border-industrial-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span className="tracking-wide">Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
