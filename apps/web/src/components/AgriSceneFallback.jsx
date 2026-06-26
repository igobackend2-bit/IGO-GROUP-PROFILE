import React from 'react';

function AgriSceneFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0d2618 0%, #071a0e 45%, #0a1a10 100%)' }} />
      <div className="terrain-grid absolute inset-0 opacity-60" />
      <div
        className="liquid-blob absolute pointer-events-none"
        style={{ width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.07), transparent)', top: '-120px', right: '-100px' }}
      />
      <div
        className="liquid-blob-alt absolute pointer-events-none"
        style={{ width: '450px', height: '450px', background: 'radial-gradient(ellipse, rgba(200,168,75,0.06), transparent)', bottom: '-80px', left: '10%' }}
      />
      <div
        className="liquid-blob absolute pointer-events-none"
        style={{ width: '350px', height: '350px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.04), transparent)', top: '30%', left: '-80px', animationDelay: '-4s' }}
      />
      {/* Simulated terrain lines */}
      <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="0,260 150,210 300,240 450,170 600,190 750,140 900,168 1050,120 1200,145 1200,300 0,300" fill="rgba(74,222,128,0.03)" stroke="rgba(74,222,128,0.15)" strokeWidth="1" />
        <polyline points="0,275 150,240 300,258 450,210 600,225 750,185 900,205 1050,165 1200,180" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="1" />
        <polyline points="0,285 150,265 300,272 450,240 600,252 750,220 900,235 1050,200 1200,215" fill="none" stroke="rgba(74,222,128,0.04)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default AgriSceneFallback;
