import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { Leaf, Lightbulb, Shield, Heart, Globe, Zap } from 'lucide-react';

const values = [
  { icon: Leaf, name: 'Sustainability First', desc: 'Environmental stewardship in all agricultural and tech operations for net-positive impact on every community we touch.', color: '#4ade80' },
  { icon: Lightbulb, name: 'Continuous Innovation', desc: 'Leveraging R&D and AI to revolutionize traditional sectors and maintain industry leadership across all 26 brands.', color: '#c8a84b' },
  { icon: Shield, name: 'Ethical Leadership', desc: 'Absolute transparency, integrity, and respect for all stakeholders — from farm workers to investors.', color: '#87ceeb' },
  { icon: Heart, name: 'Community Enrichment', desc: 'Building ecosystems that uplift local farmers, retail partners, and the global workforce they depend on.', color: '#f472b6' },
  { icon: Globe, name: 'Global Vision', desc: 'Expanding sustainable agricultural practices from Indian farmlands to international markets and beyond.', color: '#a78bfa' },
  { icon: Zap, name: 'Agri-Tech Fusion', desc: 'Merging generations of farming wisdom with cutting-edge IoT, automation, and artificial intelligence.', color: '#fb923c' },
];

const milestones = [
  { year: '2009', event: 'IGO Group founded with a singular vision for sustainable, enterprise-scale agriculture.' },
  { year: '2012', event: 'Launched IGO Agritech Farms — the first brand under the conglomerate umbrella.' },
  { year: '2015', event: 'Expanded to 10 brands across Core Agri and Retail & Food sectors.' },
  { year: '2018', event: 'Launched the Tech & Digital vertical including IGO Farm Automation and IoT systems.' },
  { year: '2021', event: 'Crossed 2,000 employees globally across 20+ brands and 15 operational departments.' },
  { year: '2023', event: 'Launched Farmgate Mandi — digital farm gate buyback platform for transparent market access.' },
  { year: '2024', event: 'India Green App launched as the central digital hub for the entire ecosystem.' },
  { year: '2025', event: '26 active and upcoming brands. 18 departments. 32 core managers. Global expansion underway.' },
];

function AboutPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>About IGO Group — Our Legacy & Vision</title>
        <meta name="description" content="15+ years of transforming sustainable agriculture. Learn about IGO Group's vision, mission, core values, and milestones." />
      </Helmet>
      <Header />

      <main className="flex-1" style={{ background: '#071a0e' }}>

        {/* Hero */}
        <section className="pt-36 pb-24 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.05), transparent)', top: '-100px', right: '-100px' }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Our Legacy</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">15+ Years of Purpose</h1>
              <p className="text-xl font-light leading-relaxed max-w-2xl" style={{ color: 'rgba(240,236,228,0.52)' }}>
                From a single vision for sustainable agriculture to a conglomerate of 26 brands — IGO Group has redefined enterprise-scale farming for the 21st century.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision / Mission */}
        <section className="py-24" style={{ background: '#0d2618', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl relative overflow-hidden"
                style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.18)' }}
              >
                <div
                  className="liquid-blob absolute pointer-events-none"
                  style={{ width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(74,222,128,0.08), transparent)', top: '-50px', right: '-50px' }}
                />
                <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Vision</p>
                <h2 className="font-serif text-2xl font-bold text-[#f0ece4] mb-4">World's Most Trusted Agri Conglomerate</h2>
                <p className="leading-relaxed" style={{ color: 'rgba(240,236,228,0.55)' }}>
                  To fundamentally alter how humanity interacts with land, technology, and commerce for a truly sustainable future across generations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-3xl relative overflow-hidden"
                style={{ background: 'rgba(200,168,75,0.05)', border: '1px solid rgba(200,168,75,0.18)' }}
              >
                <div
                  className="liquid-blob-alt absolute pointer-events-none"
                  style={{ width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(200,168,75,0.08), transparent)', top: '-50px', right: '-50px' }}
                />
                <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#c8a84b' }}>Mission</p>
                <h2 className="font-serif text-2xl font-bold text-[#f0ece4] mb-4">Empower Communities Through Innovation</h2>
                <p className="leading-relaxed" style={{ color: 'rgba(240,236,228,0.55)' }}>
                  Engineer ecosystems that optimize resources through technology, delivering unparalleled value across our 26 brands, 18 departments, and global markets.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#4ade80' }}>What We Stand For</p>
              <h2 className="heading-section text-[#f0ece4]">Core Principles</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="group p-6 rounded-2xl flex gap-4 card-glow"
                    style={{ background: '#0d2618', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${val.color}14`, border: `1px solid ${val.color}25` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: val.color }} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#f0ece4] mb-2">{val.name}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,228,0.45)' }}>{val.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24" style={{ background: '#0d2618', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#4ade80' }}>Our Journey</p>
              <h2 className="heading-section text-[#f0ece4]">Milestones</h2>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="flex gap-6 mb-10 items-start"
                >
                  <div className="w-[72px] shrink-0 text-right pt-0.5">
                    <span className="text-sm font-bold" style={{ color: '#c8a84b' }}>{m.year}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 mt-1"
                      style={{ background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.5)', flexShrink: 0 }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,228,0.58)' }}>{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default AboutPage;
