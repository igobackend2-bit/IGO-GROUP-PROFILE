import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#071a0e' }}>
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="terrain-grid absolute inset-0 opacity-30 pointer-events-none" />
        <p className="font-serif font-bold mb-4 text-gradient-gold relative z-10" style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', lineHeight: 1 }}>404</p>
        <h1 className="font-serif text-3xl font-bold text-[#f0ece4] mb-4 relative z-10">Page Not Found</h1>
        <p className="mb-10 relative z-10" style={{ color: 'rgba(240,236,228,0.45)' }}>
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 rounded-full font-bold text-sm text-[#071a0e] hover:opacity-90 hover:-translate-y-1 transition-all duration-300 relative z-10"
          style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)' }}
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div
        className="flex min-h-[100dvh] flex-col antialiased"
        style={{ background: '#071a0e', color: '#f0ece4' }}
      >
        <AnimatedRoutes />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'border shadow-2xl rounded-2xl p-4',
          style: {
            background: 'rgba(13,38,24,0.97)',
            color: '#f0ece4',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </Router>
  );
}

export default App;
