import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Icons from Lucide
import {
  Wrench,
  Settings,
  Building2,
  Hammer,
  Move,
  Truck,
  Factory,
  Clock,
  Shield,
  Award,
  Users,
  Target,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Zap,
  HardHat,
  Gauge,
  FlaskConical,
  CheckCircle
} from 'lucide-react';

// Components
const LoadingScreen = ({ progress }: { progress: number }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-industrial-900 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)]"
    style={{
      opacity: progress >= 100 ? 0 : 1,
      pointerEvents: progress >= 100 ? 'none' : 'auto',
      transform: progress >= 100 ? 'translateY(-20px)' : 'translateY(0)'
    }}
  >
    <div className="loader-content flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-3 tracking-wider drop-shadow-lg">R.K. ERECTORS</div>
      <div className="text-xs md:text-sm text-white/40 tracking-[0.4em] uppercase mb-12 font-medium">Engineering Excellence</div>

      {/* Premium thin progress bar */}
      <div className="w-64 md:w-80 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-gold-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="text-gold-500 text-sm tracking-widest font-mono font-medium">
          {Math.min(100, Math.round(progress)).toString().padStart(3, '0')}%
        </div>
        <div className="text-[10px] md:text-xs text-white/30 uppercase tracking-widest mt-3 font-medium">
          {progress >= 100 ? 'Initiating Sequence' : 'Preloading Cinematic Assets'}
        </div>
      </div>
    </div>
  </div>
);

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
  >
    <span className="text-xs tracking-[0.2em] uppercase text-white/50">Scroll to Explore</span>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-6 h-6 text-gold-500" />
    </motion.div>
  </motion.div>
);

const Navigation = ({ isVisible = true }: { isVisible?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: '' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Industries', id: 'industries' },
    { label: 'Projects', id: 'experience' },
    { label: 'Company Profile', id: 'company-profile' },
    { label: 'Certificates', id: 'certificates' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark py-4' : 'py-6'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-bold text-gradient">R.K. ERECTORS</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.id === '' ? '#' : `#${item.id}`}
              className="text-sm text-white/70 hover:text-gold-500 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 bg-gold-500 text-industrial-900 text-sm font-medium rounded-full hover:bg-gold-400 transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass-dark absolute top-full left-0 right-0 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.id === '' ? '#' : `#${item.id}`}
                className="block py-3 text-white/70 hover:text-gold-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Section 1: Cinematic Hero
const CinematicHeroSection = ({
  onComplete,
  onProgress
}: {
  onComplete: (completed: boolean) => void,
  onProgress: (progress: number) => void
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(-1);

  const FRAME_COUNT = 161;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const texts = [
    { start: 1, end: 25, text: "Every Great Structure Begins With A Vision" },
    { start: 26, end: 50, text: "Where Nature Inspires Human Innovation" },
    { start: 51, end: 90, text: "Vision Becomes Engineering" },
    { start: 91, end: 120, text: "Precision. Strength. Execution." },
    { start: 121, end: 145, text: "Building The Future" }
  ];

  // Preload Logic
  useEffect(() => {
    let loadedCount = 0;
    let isCancelled = false;

    const loadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        if (isCancelled) break;
        const img = new Image();
        img.src = `/hero-frames/frame_${String(i).padStart(4, '0')}.png`;

        const onload = () => {
          if (isCancelled) return;
          loadedCount++;
          onProgress((loadedCount / FRAME_COUNT) * 100);
        };

        img.onload = onload;
        img.onerror = onload;
        imagesRef.current[i - 1] = img;
      }
    };

    loadImages();
    return () => { isCancelled = true; };
  }, [onProgress]);

  // Canvas & Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    // Disable alpha for performance optimization since frames have no transparency
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return;

    // Hardware acceleration hint
    canvas.style.transform = 'translateZ(0)';

    let animationFrameId: number;
    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      currentFrameRef.current = -1; // Force redraw
    };

    const drawImageCover = (img: HTMLImageElement) => {
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let renderWidth, renderHeight, x, y;

      if (imgRatio > canvasRatio) {
        renderHeight = canvas.height;
        renderWidth = canvas.height * imgRatio;
        x = (canvas.width - renderWidth) / 2;
        y = 0;
      } else {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      }

      // Use integers for rendering performance
      context.drawImage(img, Math.round(x), Math.round(y), Math.round(renderWidth), Math.round(renderHeight));
    };

    const renderLoop = () => {
      if (currentFrameRef.current !== targetFrameRef.current) {
        const frameIndex = targetFrameRef.current;
        const img = imagesRef.current[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          drawImageCover(img);
          currentFrameRef.current = frameIndex;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    });
    resizeCanvas();
    renderLoop();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'hero-sequence',
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%", // 5 screens of scrolling for prolonged cinematic feel
        pin: true,
        scrub: 1.2, // increased scrub duration for extremely smooth playback
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          targetFrameRef.current = Math.min(
            Math.floor(progress * (FRAME_COUNT - 1)),
            FRAME_COUNT - 1
          );

          const currentFrame = targetFrameRef.current + 1;

          // Dynamically interpolate text opacity & blur
          texts.forEach((t, i) => {
            const el = document.getElementById(`hero-text-${i}`);
            if (el) {
              const center = (t.start + t.end) / 2;
              const range = (t.end - t.start) / 2;
              const distance = Math.abs(currentFrame - center);

              if (distance > range + 4) {
                el.style.opacity = '0';
                el.style.filter = isMobile ? 'none' : 'blur(8px)';
                el.style.transform = 'scale(0.96)';
              } else {
                let intensity = 1 - Math.max(0, distance - range + 4) / 8;
                intensity = Math.max(0, Math.min(1, intensity));

                el.style.opacity = intensity.toString();
                if (!isMobile) el.style.filter = `blur(${(1 - intensity) * 8}px)`;
                el.style.transform = `scale(${0.96 + intensity * 0.04})`;
              }
            }
          });

          // Special handling for the finale text
          const lastTextEl = document.getElementById('hero-text-last');
          if (lastTextEl) {
            const start = 146;
            if (currentFrame >= start - 3) {
              let intensity = Math.min(1, (currentFrame - (start - 3)) / 8);
              lastTextEl.style.opacity = intensity.toString();
              if (!isMobile) lastTextEl.style.filter = `blur(${(1 - intensity) * 10}px)`;
              lastTextEl.style.transform = `scale(${0.96 + intensity * 0.04})`;
            } else {
              lastTextEl.style.opacity = '0';
              if (!isMobile) lastTextEl.style.filter = 'blur(10px)';
              lastTextEl.style.transform = 'scale(0.96)';
            }
          }

          if (progress > 0.95) {
            onComplete(true);
          } else {
            onComplete(false);
          }
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onComplete]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-industrial-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Advanced Atmospheric Fog and Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 15, 20, 0.5) 100%)'
      }} />
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-industrial-900/30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-industrial-900 via-industrial-900/50 to-transparent pointer-events-none" />

      {/* Dynamic Text Container */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
        {texts.map((t, i) => (
          <div
            key={i}
            id={`hero-text-${i}`}
            className="absolute max-w-5xl transition-all duration-100 ease-out"
            style={{ opacity: 0, transform: 'scale(0.96)' }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide leading-tight drop-shadow-2xl text-shadow-lg">
              {t.text}
            </h2>
          </div>
        ))}

        <div
          id="hero-text-last"
          className="absolute max-w-5xl transition-all duration-100 ease-out flex flex-col items-center justify-center"
          style={{ opacity: 0, transform: 'scale(0.96)' }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 text-gradient drop-shadow-2xl">
            R.K. ERECTORS
          </h1>
          <p className="text-xl md:text-3xl text-white font-medium tracking-[0.2em] uppercase drop-shadow-lg">
            Engineering Vision Into Reality
          </p>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

import { AboutSection } from './components/sections/AboutSection';
import { TransformationSection } from './components/sections/TransformationSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { IndustriesSection } from './components/sections/IndustriesSection';
import { LeadershipSection } from './components/sections/LeadershipSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { WorkforceSection } from './components/sections/WorkforceSection';
import { CompanyProfileSection } from './components/sections/CompanyProfileSection';
import { FinalCinematicSection } from './components/sections/FinalCinematicSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

// Main App
function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isHeroComplete, setIsHeroComplete] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Loading logic is now handled by CinematicHeroSection's real preload progress

  return (
    <>
      <LoadingScreen progress={loadingProgress} />
      <div className="noise-overlay" />
      <Navigation isVisible={isHeroComplete} />
      <main>
        <CinematicHeroSection
          onComplete={setIsHeroComplete}
          onProgress={setLoadingProgress}
        />
        <CompanyProfileSection />
        <AboutSection />
        <ServicesSection />
        <IndustriesSection />
        <ExperienceSection />
        <LeadershipSection />
        <CertificationsSection />
        <TransformationSection />
        <WorkforceSection />
        <FinalCinematicSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
