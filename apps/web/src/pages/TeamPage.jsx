import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import { managers, managerDepartments } from '@/data/team.js';
import { Quote } from 'lucide-react';

const ACCENT_COLORS = ['#4ade80', '#c8a84b', '#87ceeb', '#a78bfa', '#fb923c', '#f472b6', '#34d399', '#fbbf24'];

function ManagerCard({ manager, index }) {
  const initials = manager.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = ACCENT_COLORS[manager.id % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 9) * 0.05, duration: 0.45 }}
      className="group relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4 card-glow"
      style={{ background: '#0d2618', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Liquid hover accent */}
      <div
        className="liquid-blob absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          width: '160px',
          height: '160px',
          background: `radial-gradient(circle, ${color}10, transparent)`,
          top: '-40px',
          right: '-40px',
        }}
      />

      {/* Avatar + featured badge */}
      <div className="flex items-center gap-4 relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-lg"
          style={{ background: `${color}18`, color, border: `1px solid ${color}28` }}
        >
          {initials}
        </div>
        {manager.featured && (
          <span
            className="text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-full"
            style={{ background: 'rgba(200,168,75,0.14)', color: '#c8a84b', border: '1px solid rgba(200,168,75,0.25)' }}
          >
            Founder & CEO
          </span>
        )}
      </div>

      {/* Name + title */}
      <div className="relative z-10">
        <h3 className="font-serif text-lg font-bold leading-tight mb-1" style={{ color: '#f0ece4' }}>
          {manager.name}
        </h3>
        <p className="text-xs font-bold tracking-[1.5px] uppercase" style={{ color: 'rgba(240,236,228,0.38)' }}>
          {manager.title}
        </p>
      </div>

      {/* Bio */}
      <p className="text-sm leading-relaxed line-clamp-2 flex-1 relative z-10" style={{ color: 'rgba(240,236,228,0.44)' }}>
        {manager.bio}
      </p>

      {/* Department tag */}
      <div
        className="mt-auto pt-3 relative z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(74,222,128,0.5)' }}>
          {manager.department}
        </p>
      </div>
    </motion.div>
  );
}

const DIVERSITY_STATS = [
  { value: 42, suffix: '%', label: 'Women in Leadership' },
  { value: 2000, suffix: '+', label: 'Global Employees' },
  { value: 32, suffix: '', label: 'Core Managers' },
  { value: 12, suffix: '', label: 'Countries Represented' },
];

function TeamPage() {
  const [deptFilter, setDeptFilter] = useState('All');
  const visibleDepts = managerDepartments.slice(0, 8);

  const filtered = useMemo(() => {
    if (deptFilter === 'All') return managers;
    return managers.filter(m => m.department === deptFilter);
  }, [deptFilter]);

  return (
    <PageTransition>
      <Helmet>
        <title>Leadership Team — IGO Group</title>
        <meta name="description" content="Meet IGO Group's 32 core managers driving sustainable agriculture across 26 brands and 18 departments." />
      </Helmet>
      <Header />

      <main className="flex-1" style={{ background: '#071a0e' }}>

        {/* Page header */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '550px', height: '550px', background: 'radial-gradient(ellipse, rgba(200,168,75,0.05), transparent)', top: '-100px', right: '-80px' }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Our People</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">32 Core Managers</h1>
              <p className="text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(240,236,228,0.5)' }}>
                Decades of combined expertise, unified by one mission: sustainable agricultural enterprise at scale.
              </p>

              {/* Dept filter pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {visibleDepts.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setDeptFilter(dept)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={
                      deptFilter === dept
                        ? { background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)', color: '#071a0e' }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,236,228,0.5)' }
                    }
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Managers grid */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="w-6 h-px" style={{ background: '#c8a84b' }} />
              <p className="text-sm font-semibold" style={{ color: 'rgba(240,236,228,0.3)' }}>
                Showing <span style={{ color: '#c8a84b' }}>{filtered.length}</span> of 32 managers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((m, i) => (
                <ManagerCard key={m.id} manager={m} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Quote + diversity stats */}
        <section
          className="py-24 relative overflow-hidden"
          style={{ background: '#0d2618', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.05), transparent)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Quote className="w-10 h-10 mb-6" style={{ color: 'rgba(74,222,128,0.25)' }} />
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#f0ece4] leading-tight mb-6">
                  "Great companies are not just built on solid ground, but by exceptional people."
                </p>
                <p className="text-sm font-bold" style={{ color: '#c8a84b' }}>
                  — Dr. John Yesudhas, Founder & Group CEO
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {DIVERSITY_STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="font-serif text-3xl font-bold text-gradient-gold mb-1">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: 'rgba(240,236,228,0.38)' }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default TeamPage;
