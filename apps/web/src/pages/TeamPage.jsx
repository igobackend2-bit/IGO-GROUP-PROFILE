import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, ChevronDown, Quote, Star } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import { managers, managerDepartments } from '@/data/team.js';

const ACCENT_COLORS = ['#4ade80', '#c8a84b', '#87ceeb', '#a78bfa', '#fb923c', '#f472b6', '#34d399', '#fbbf24'];

/* ─── CEO HERO CARD ─── */
function CeoCard({ manager }) {
  const [eduOpen, setEduOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden mb-12"
      style={{ background: 'linear-gradient(135deg, #0d2618 0%, #0a1f14 60%, #112a1a 100%)', border: '1px solid rgba(200,168,75,0.22)' }}
    >
      {/* Gold top bar */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #c8a84b, #f0d060, #a07820, transparent)' }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="liquid-blob absolute" style={{ width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(200,168,75,0.07), transparent)', top: '-100px', right: '-100px' }} />
        <div className="liquid-blob-alt absolute" style={{ width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.04), transparent)', bottom: '-80px', left: '-80px' }} />
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Photo */}
          <div className="shrink-0">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(200,168,75,0.3), rgba(74,222,128,0.1))', transform: 'translate(6px, 6px)', borderRadius: '24px' }}
              />
              <img
                src={manager.photo}
                alt={manager.name}
                className="relative w-48 h-56 lg:w-56 lg:h-64 object-cover rounded-3xl shadow-2xl"
                style={{ border: '2px solid rgba(200,168,75,0.35)' }}
              />
              <div
                className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[2px] uppercase shadow-lg"
                style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060)', color: '#071a0e' }}
              >
                <Star className="w-3 h-3 inline mr-1" />Founder & CEO
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-[3px] uppercase mb-2" style={{ color: '#4ade80' }}>Leadership</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#f0ece4] mb-1">{manager.name}</h2>
            <p className="text-lg font-bold tracking-[1.5px] uppercase mb-5" style={{ color: '#c8a84b' }}>{manager.title}</p>

            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[2px] mb-6"
              style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: 'rgba(74,222,128,0.75)' }}
            >
              {manager.department}
            </div>

            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(240,236,228,0.65)' }}>{manager.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(200,168,75,0.06)', border: '1px solid rgba(200,168,75,0.12)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4" style={{ color: '#c8a84b' }} />
                  <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(200,168,75,0.7)' }}>Experience</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,228,0.55)' }}>{manager.experience}</p>
              </div>

              <div className="p-4 rounded-2xl" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4" style={{ color: '#4ade80' }} />
                  <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(74,222,128,0.7)' }}>Education</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,228,0.55)' }}>{manager.education}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MANAGER CARD ─── */
function ManagerCard({ manager, index }) {
  const [expanded, setExpanded] = useState(false);
  const initials = manager.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const color = ACCENT_COLORS[manager.id % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 9) * 0.05, duration: 0.45 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col card-glow"
      style={{ background: '#0d2618', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${color}08, transparent 60%)` }}
      />

      {/* Top accent bar */}
      <div className="h-0.5 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${color}90, ${color}20, transparent)` }} />

      <div className="p-6 flex flex-col gap-4 relative z-10 flex-1">

        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          {manager.photo ? (
            <img
              src={manager.photo}
              alt={manager.name}
              className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-lg"
              style={{ border: `2px solid ${color}35` }}
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-bold text-xl shrink-0 shadow-lg"
              style={{ background: `${color}15`, color, border: `1.5px solid ${color}30`, letterSpacing: '0.05em' }}
            >
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: '#f0ece4' }}>
              {manager.name}
            </h3>
            <p className="text-[11px] font-bold tracking-[1.5px] uppercase mt-0.5" style={{ color }}>
              {manager.title}
            </p>
          </div>
        </div>

        {/* Dept pill */}
        <span
          className="self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[1.5px]"
          style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.14)', color: 'rgba(74,222,128,0.6)' }}
        >
          {manager.department}
        </span>

        {/* Bio */}
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,228,0.52)' }}>
          {manager.bio}
        </p>

        {/* Divider */}
        <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Experience */}
        <div className="flex gap-3 items-start">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(200,168,75,0.12)' }}>
            <Briefcase className="w-3.5 h-3.5" style={{ color: '#c8a84b' }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] mb-0.5" style={{ color: 'rgba(200,168,75,0.6)' }}>Experience</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,236,228,0.48)' }}>{manager.experience}</p>
          </div>
        </div>

        {/* Education accordion */}
        <div className="mt-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left py-2.5 px-3 rounded-xl transition-all duration-200 focus-visible:outline-none"
            style={{
              background: expanded ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${expanded ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.05)'}`,
            }}
            aria-expanded={expanded}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />
              <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(74,222,128,0.7)' }}>Education</span>
            </div>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform duration-300 shrink-0"
              style={{ color: 'rgba(240,236,228,0.3)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="text-xs leading-relaxed pt-3 px-1" style={{ color: 'rgba(240,236,228,0.48)' }}>
                  {manager.education}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}

const STATS = [
  { value: 32, suffix: '', label: 'Core Managers' },
  { value: 2000, suffix: '+', label: 'Global Employees' },
  { value: 26, suffix: '', label: 'Brands Led' },
  { value: 18, suffix: '', label: 'Departments' },
];

function TeamPage() {
  const [deptFilter, setDeptFilter] = useState('All');

  const ceo = managers.find(m => m.featured);
  const rest = managers.filter(m => !m.featured);

  const filtered = useMemo(() => {
    const pool = deptFilter === 'All' ? rest : rest.filter(m => m.department === deptFilter);
    return pool;
  }, [deptFilter, rest]);

  return (
    <PageTransition>
      <Helmet>
        <title>Leadership Team — IGO Group</title>
        <meta name="description" content="Meet IGO Group's 32 core managers driving sustainable farming across 26 brands and 18 departments." />
      </Helmet>
      <Header />

      <main className="flex-1" style={{ background: '#071a0e' }}>

        {/* ── HERO ── */}
        <section className="pt-36 pb-12 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-30" />
          <div className="liquid-blob absolute pointer-events-none" style={{ width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(200,168,75,0.05), transparent)', top: '-120px', right: '-100px' }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Our People</p>
              <h1 className="heading-hero text-[#f0ece4] mb-4">The Leadership Team</h1>
              <p className="text-xl font-light max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(240,236,228,0.5)' }}>
                32 experts, one mission — transforming Indian farming into a world-class enterprise.
              </p>
            </motion.div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="text-center p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="font-serif text-3xl font-bold text-gradient-gold mb-1">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[2.5px]" style={{ color: 'rgba(240,236,228,0.35)' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CEO Featured Card */}
            {ceo && <CeoCard manager={ceo} />}
          </div>
        </section>

        {/* ── MANAGEMENT GRID ── */}
        <section className="pb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-bold tracking-[3px] uppercase mb-1" style={{ color: '#4ade80' }}>Management</p>
                <h2 className="font-serif text-2xl font-bold text-[#f0ece4]">Senior Leadership</h2>
              </div>
              <p className="text-sm font-semibold" style={{ color: 'rgba(240,236,228,0.3)' }}>
                Showing <span style={{ color: '#c8a84b' }}>{filtered.length}</span> of {rest.length} managers
              </p>
            </div>

            {/* Dept filter pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {managerDepartments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDeptFilter(dept)}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[1px] transition-all duration-200"
                  style={
                    deptFilter === dept
                      ? { background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)', color: '#071a0e' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,236,228,0.45)' }
                  }
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((m, i) => (
                <ManagerCard key={m.id} manager={m} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CEO QUOTE ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: '#0d2618', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="liquid-blob absolute pointer-events-none" style={{ width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.04), transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Quote className="w-12 h-12 mx-auto mb-8" style={{ color: 'rgba(200,168,75,0.2)' }} />
              <p className="font-serif text-3xl md:text-4xl font-bold text-[#f0ece4] leading-tight mb-8">
                "Great companies are not just built on solid ground,<br className="hidden md:block" /> but by exceptional people with extraordinary purpose."
              </p>
              <div className="flex items-center justify-center gap-4">
                {ceo && (
                  <img
                    src={ceo.photo}
                    alt={ceo.name}
                    className="w-12 h-12 rounded-full object-cover"
                    style={{ border: '2px solid rgba(200,168,75,0.4)' }}
                  />
                )}
                <div className="text-left">
                  <p className="font-bold text-sm" style={{ color: '#c8a84b' }}>Dr. John Yesudhas</p>
                  <p className="text-xs" style={{ color: 'rgba(240,236,228,0.4)' }}>Founder & Group CEO, IGO Group</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </PageTransition>
  );
}

export default TeamPage;
