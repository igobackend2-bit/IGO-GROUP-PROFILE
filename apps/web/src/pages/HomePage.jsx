import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sprout, BarChart3, ShieldCheck, Globe, Zap, Leaf } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import AgriSceneFallback from '@/components/AgriSceneFallback.jsx';
import { departments } from '@/data/departments.js';

const AgriScene = lazy(() => import('@/components/AgriScene.jsx'));

function useWebGLSupport() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setSupported(!!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

const bentoSectors = [
  {
    icon: Sprout,
    label: 'Core Agri',
    desc: 'Farm engineering, agritech automation, nursery, and precision produce distribution.',
    accent: '#4ade80',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    icon: BarChart3,
    label: 'Finance & Realty',
    desc: 'Micro-finance, wealth management, farmland estates, and farm loans.',
    accent: '#c8a84b',
    span: '',
  },
  {
    icon: ShieldCheck,
    label: 'Health & Wellness',
    desc: 'Holistic healthcare, Ayurveda pharmacy, and organic natural cosmetics.',
    accent: '#87ceeb',
    span: '',
  },
  {
    icon: Zap,
    label: 'Tech & Digital',
    desc: 'IoT sensors, AI-driven automation, and the India Green App ecosystem.',
    accent: '#a78bfa',
    span: '',
  },
  {
    icon: Globe,
    label: 'Trade & Export',
    desc: 'Premium agri export, international markets, and farm factory outputs.',
    accent: '#fb923c',
    span: '',
  },
];

const stats = [
  { value: 26, suffix: '', label: 'Active Brands' },
  { value: 18, suffix: '', label: 'Departments' },
  { value: 32, suffix: '', label: 'Core Managers' },
  { value: 2000, suffix: '+', label: 'Global Staff' },
];

function HomePage() {
  const webglSupported = useWebGLSupport();
  const prefersReduced = useReducedMotion();
  const show3D = webglSupported && !prefersReduced;

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], [0, 180]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <PageTransition>
      <Helmet>
        <title>IGO Group of Companies — Built on Land. Driven by Purpose.</title>
        <meta
          name="description"
          content="IGO Group is a premier agricultural conglomerate with 26 brands, 18 departments, and 32 core managers spanning agri, tech, retail, and sustainability."
        />
      </Helmet>
      <Header />

      <main className="flex-1" style={{ background: '#071a0e' }}>

        {/* ─── HERO ─── */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          {show3D ? (
            <Suspense fallback={<AgriSceneFallback />}>
              <AgriScene />
            </Suspense>
          ) : (
            <AgriSceneFallback />
          )}

          {/* Vignette overlay */}
          <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(7,26,14,0.6) 100%)' }} />

          <motion.div
            className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24"
            style={prefersReduced ? {} : { y: yHero, opacity: opacityHero }}
          >
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
                style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.22)' }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-[#4ade80]"
                  style={{ boxShadow: '0 0 10px #4ade80, 0 0 20px rgba(74,222,128,0.4)', animation: 'pulse-glow 2s ease-in-out infinite' }}
                />
                <span className="text-xs font-bold tracking-[2.5px] uppercase text-[#86efac]">
                  Premier Agricultural Conglomerate — Est. 2009
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="heading-hero text-[#f0ece4] mb-6"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
              >
                Built on Land.<br />
                <span className="text-gradient-gold">Driven by Purpose.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed font-light"
                style={{ color: 'rgba(240,236,228,0.62)' }}
              >
                26 brands across agriculture, technology, healthcare, finance, and sustainability —
                creating lasting global value from the ground up.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base rounded-full border-0 font-bold shadow-2xl hover:opacity-90 hover:-translate-y-1 transition-all duration-300 text-[#071a0e]"
                  style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)', boxShadow: '0 8px 32px rgba(200,168,75,0.35)' }}
                >
                  <Link to="/brands">
                    Explore Ecosystem <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base rounded-full text-[#f0ece4] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
                >
                  <Link to="/about">
                    <Leaf className="mr-2 w-5 h-5 text-[#4ade80]" /> Our Vision
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: 'rgba(240,236,228,0.3)' }}
          >
            <span className="text-[10px] uppercase tracking-[4px] font-bold">Scroll</span>
            <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                animate={{ y: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-full h-1/2 absolute top-0"
                style={{ background: 'rgba(74,222,128,0.7)' }}
              />
            </div>
          </motion.div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="relative z-20 -mt-10 mx-4 sm:mx-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="container mx-auto glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ borderRight: 'none' }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="px-4 text-center"
                  style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                >
                  <div className="font-serif font-bold mb-2 text-gradient-gold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[3px]" style={{ color: 'rgba(240,236,228,0.38)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── BENTO SECTORS ─── */}
        <section className="py-32 relative overflow-hidden">
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.05), transparent)', top: '-100px', right: '-150px' }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Brand Ecosystem</p>
              <h2 className="heading-section text-[#f0ece4] mb-6">A Powerful Brand Ecosystem</h2>
              <p className="text-xl font-light leading-relaxed" style={{ color: 'rgba(240,236,228,0.5)' }}>
                From precision agritech to sustainable energy — 26 brands engineered to build synergistic value across India and beyond.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
              {bentoSectors.map((sector, i) => {
                const Icon = sector.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className={`${sector.span} group relative rounded-3xl overflow-hidden p-8 flex flex-col justify-end cursor-pointer card-glow`}
                    style={{ background: '#0d2618', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="liquid-blob absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ width: '220px', height: '220px', background: `radial-gradient(circle, ${sector.accent}14, transparent)`, top: '-60px', right: '-60px' }}
                    />
                    <Icon
                      className="mb-4 transition-all duration-500 group-hover:-translate-y-1.5"
                      style={{ color: sector.accent, width: '2.25rem', height: '2.25rem' }}
                    />
                    <h3 className="font-serif text-xl font-bold text-[#f0ece4] mb-2">{sector.label}</h3>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'rgba(240,236,228,0.45)' }}>
                      {sector.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="rounded-full font-bold border-0 shadow-xl px-8 hover:opacity-90 hover:-translate-y-1 transition-all duration-300 text-[#071a0e]"
                style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)' }}
              >
                <Link to="/brands">View All 26 Brands <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── DEPARTMENTS STRIP ─── */}
        <section className="py-20 overflow-hidden" style={{ background: '#0d2618', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#4ade80' }}>Operational Core</p>
              <h2 className="heading-section text-[#f0ece4]">18 Departments</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((dept, i) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to="/departments"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(240,236,228,0.55)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.1)'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)'; e.currentTarget.style.color = '#4ade80'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,236,228,0.55)'; }}
                  >
                    <span>{dept.icon}</span> {dept.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                className="rounded-full transition-all duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(240,236,228,0.55)', background: 'transparent' }}
              >
                <Link to="/departments">
                  Explore All Departments <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="py-36 relative overflow-hidden">
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '900px', height: '900px', background: 'radial-gradient(ellipse, rgba(200,168,75,0.05), transparent)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#c8a84b' }}>Partner With Us</p>
              <h2 className="heading-section text-[#f0ece4] mb-6">Ready to Grow Together?</h2>
              <p className="text-xl font-light mb-14 leading-relaxed" style={{ color: 'rgba(240,236,228,0.5)' }}>
                Franchise opportunities, investment partnerships, and strategic alliances available across all 26 brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 rounded-full border-0 font-bold text-base shadow-2xl hover:opacity-90 hover:-translate-y-1 transition-all duration-300 text-[#071a0e]"
                  style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)', boxShadow: '0 8px 32px rgba(200,168,75,0.3)' }}
                >
                  <Link to="/contact">
                    Get In Touch <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 rounded-full text-base hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(240,236,228,0.65)', background: 'rgba(255,255,255,0.04)' }}
                >
                  <Link to="/brands">Browse Brands</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default HomePage;
