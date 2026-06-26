import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { departments } from '@/data/departments.js';

function DeptCard({ dept, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 9) * 0.05, duration: 0.45 }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-left rounded-2xl overflow-hidden group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a84b]"
        style={{
          background: open ? '#162d1e' : '#0d2618',
          border: open ? '1px solid rgba(74,222,128,0.28)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Header row */}
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors duration-300"
              style={{ background: open ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.05)' }}
            >
              {dept.icon}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-0.5" style={{ color: 'rgba(74,222,128,0.5)' }}>
                Dept {dept.id}
              </p>
              <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: '#f0ece4' }}>
                {dept.name}
              </h3>
            </div>
          </div>
          <ChevronDown
            className="w-5 h-5 shrink-0 transition-transform duration-300"
            style={{ color: open ? '#4ade80' : 'rgba(240,236,228,0.28)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,236,228,0.55)' }}>
                  {dept.focus}
                </p>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.1)' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-xs shrink-0"
                    style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}
                  >
                    {dept.head.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: 'rgba(240,236,228,0.3)' }}>Leadership</p>
                    <p className="text-sm font-semibold" style={{ color: 'rgba(240,236,228,0.7)' }}>{dept.head}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

function DepartmentsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return departments.filter(
      d => d.name.toLowerCase().includes(q) || d.focus.toLowerCase().includes(q) || d.head.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <PageTransition>
      <Helmet>
        <title>Departments — IGO Group</title>
        <meta name="description" content="IGO Group's 18 operational departments driving excellence across the conglomerate." />
      </Helmet>
      <Header />

      <main className="flex-1" style={{ background: '#071a0e' }}>

        {/* Page header */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '550px', height: '550px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.05), transparent)', top: '-100px', left: '-100px' }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Operational Core</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">18 Departments</h1>
              <p className="text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(240,236,228,0.5)' }}>
                Specialized operational centers working in seamless synergy to drive IGO Group's mission forward.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,236,228,0.3)' }} />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search departments..."
                  className="pl-11 h-12 rounded-xl text-[#f0ece4] placeholder:text-[#f0ece4]/25 focus-visible:ring-[#c8a84b]"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dept grid */}
        <section className="pb-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="w-6 h-px" style={{ background: '#4ade80' }} />
              <p className="text-sm font-semibold" style={{ color: 'rgba(240,236,228,0.3)' }}>
                Showing <span style={{ color: '#4ade80' }}>{filtered.length}</span> of 18 departments
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((dept, i) => (
                <DeptCard key={dept.id} dept={dept} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default DepartmentsPage;
