import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BrandCard from '@/components/BrandCard.jsx';
import BrandModal from '@/components/BrandModal.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { brands, brandCategories } from '@/data/brands.js';

function BrandsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return brands.filter((b) => {
      const matchSearch =
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      const matchCat = category === 'All' || b.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <PageTransition>
      <Helmet>
        <title>Brand Ecosystem — IGO Group</title>
        <meta
          name="description"
          content="Explore IGO Group's 26 premium brands across Core Agri, Retail, Tech, Finance, and Sustainability."
        />
      </Helmet>
      <Header />

      <main className="flex-1" style={{ background: '#071a0e' }}>

        {/* Page header */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div
            className="liquid-blob absolute pointer-events-none"
            style={{ width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.05), transparent)', top: '-100px', right: '-80px' }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4" style={{ color: '#4ade80' }}>Our Portfolio</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">Brand Ecosystem</h1>
              <p className="text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(240,236,228,0.5)' }}>
                26 ventures engineered to synergize across agriculture, technology, finance, and sustainability.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,236,228,0.3)' }} />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search brands, categories..."
                  className="pl-11 h-12 rounded-xl text-[#f0ece4] placeholder:text-[#f0ece4]/25 focus-visible:ring-[#c8a84b]"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {brandCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={
                      category === cat
                        ? { background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)', color: '#071a0e' }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,236,228,0.5)' }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="w-6 h-px" style={{ background: '#4ade80' }} />
              <p className="text-sm font-semibold" style={{ color: 'rgba(240,236,228,0.3)' }}>
                Showing <span style={{ color: '#4ade80' }}>{filtered.length}</span> of 26 brands
              </p>
            </div>

            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl border p-16 text-center max-w-xl mx-auto my-12"
                  style={{ background: '#0d2618', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <AlertCircle className="h-12 w-12 mx-auto mb-4" style={{ color: 'rgba(240,236,228,0.2)' }} />
                  <h3 className="font-serif text-2xl font-bold text-[#f0ece4] mb-3">No brands found</h3>
                  <p className="mb-8" style={{ color: 'rgba(240,236,228,0.4)' }}>Try adjusting your search or filters.</p>
                  <Button
                    onClick={() => { setSearch(''); setCategory('All'); }}
                    className="rounded-full border-0 font-bold text-[#071a0e]"
                    style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)' }}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {filtered.map((brand, i) => (
                    <BrandCard
                      key={brand.id}
                      brand={brand}
                      index={i}
                      onOpenModal={setSelectedBrand}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />

      <BrandModal
        brand={selectedBrand}
        isOpen={!!selectedBrand}
        onClose={() => setSelectedBrand(null)}
      />
    </PageTransition>
  );
}

export default BrandsPage;
