import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function BrandCard({ brand, index, onOpenModal }) {
  const isUpcoming = brand.status === 'Upcoming';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.6) }}
      layout
    >
      <button
        onClick={() => onOpenModal(brand)}
        className="group w-full text-left relative rounded-2xl overflow-hidden p-6 flex flex-col gap-4 card-glow focus-visible:outline-none focus-visible:ring-2"
        style={{
          background: '#0d2618',
          border: '1px solid rgba(255,255,255,0.06)',
          focusVisibleRingColor: '#c8a84b',
          minHeight: '200px',
        }}
        aria-label={`View details for ${brand.name}`}
      >
        {/* Liquid hover blob */}
        <div
          className="liquid-blob absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(74,222,128,0.08), transparent)',
            top: '-50px',
            right: '-50px',
          }}
        />

        {/* Top row: emoji + status */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <span className="text-3xl leading-none">{brand.emoji}</span>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full shrink-0"
            style={
              isUpcoming
                ? { background: 'rgba(200,168,75,0.12)', color: '#c8a84b', border: '1px solid rgba(200,168,75,0.22)' }
                : { background: 'rgba(74,222,128,0.10)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.22)' }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isUpcoming ? '#c8a84b' : '#4ade80' }}
            />
            {brand.status}
          </span>
        </div>

        {/* Category + name */}
        <div className="relative z-10">
          <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: 'rgba(74,222,128,0.55)' }}>
            {brand.category}
          </p>
          <h3 className="font-serif text-xl font-bold leading-tight transition-all duration-300 group-hover:text-gradient-gold" style={{ color: '#f0ece4' }}>
            {brand.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed line-clamp-2 flex-1 relative z-10" style={{ color: 'rgba(240,236,228,0.42)' }}>
          {brand.description}
        </p>

        {/* Footer link */}
        <div
          className="flex items-center text-xs font-bold transition-colors duration-200 group-hover:text-[#c8a84b] relative z-10"
          style={{ color: 'rgba(200,168,75,0.5)' }}
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </button>
    </motion.div>
  );
}

export default BrandCard;
