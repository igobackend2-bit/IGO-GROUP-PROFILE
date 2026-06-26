
import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

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
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-[100dvh] flex-col bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
        <AnimatedRoutes />
      </div>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'bg-card text-card-foreground border-border shadow-2xl rounded-2xl p-4 font-sans',
          style: { backdropFilter: 'blur(10px)' }
        }}
      />
    </Router>
  );
}

export default App;
