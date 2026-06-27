import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ecosystemLinks, navLinks } from '@/data/navigation.js';

function Footer() {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = [...ecosystemLinks, ...navLinks.slice(1)];

  return (
    <footer
      className="pt-24 pb-8 relative overflow-hidden border-t border-white/6"
      style={{ background: '#040f08', color: '#f0ece4' }}
    >
      {/* Liquid bg decorations */}
      <div
        className="liquid-blob absolute pointer-events-none"
        style={{ width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(74,222,128,0.05), transparent)', top: '-100px', right: '-100px' }}
      />
      <div
        className="liquid-blob-alt absolute pointer-events-none"
        style={{ width: '350px', height: '350px', background: 'radial-gradient(ellipse, rgba(200,168,75,0.04), transparent)', bottom: '-60px', left: '-60px' }}
      />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/6 pb-16">

          {/* Brand */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="lg:col-span-4 space-y-6"
          >
            <Link to="/" className="flex items-center">
              <div
                className="rounded-xl overflow-hidden shadow-lg"
                style={{ border: '1px solid rgba(200,168,75,0.25)', background: '#fff' }}
              >
                <img
                  src="/logos/igo-group.jpg"
                  alt="IGO Group"
                  className="h-10 w-auto object-contain block"
                  style={{ maxWidth: '140px' }}
                />
              </div>
            </Link>
            <p className="text-sm text-[#f0ece4]/45 leading-relaxed max-w-xs">
              26 brands. 18 departments. 32 core managers. Shaping sustainable agriculture and enterprise across India and global markets.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,222,128,0.12)'; e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)'; e.currentTarget.style.color = '#4ade80'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = ''; }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="lg:col-span-2"
          >
            <h4 className="font-serif font-bold text-sm mb-6 uppercase tracking-[2px] text-[#c8a84b]">Navigate</h4>
            <nav className="flex flex-col space-y-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-[#f0ece4]/45 hover:text-[#4ade80] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="lg:col-span-3"
          >
            <h4 className="font-serif font-bold text-sm mb-6 uppercase tracking-[2px] text-[#c8a84b]">Headquarters</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span className="text-sm text-[#f0ece4]/45 leading-relaxed">
                  IGO Corporate Block<br />Chennai, Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#4ade80] shrink-0" />
                <span className="text-sm text-[#f0ece4]/45">+91 (044) 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#4ade80] shrink-0" />
                <span className="text-sm text-[#f0ece4]/45">contact@igogroup.com</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="lg:col-span-3"
          >
            <h4 className="font-serif font-bold text-sm mb-6 uppercase tracking-[2px] text-[#c8a84b]">Stay Informed</h4>
            <p className="text-sm text-[#f0ece4]/40 mb-4 leading-relaxed">
              Updates from across our 26 brands and 18 departments.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="h-12 pr-14 focus-visible:ring-[#c8a84b] rounded-xl text-[#f0ece4] placeholder:text-[#f0ece4]/25"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 h-10 w-10 rounded-lg border-0 text-[#071a0e]"
                  style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)' }}
                >
                  <ArrowUp className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 relative"
        >
          <p className="text-sm text-[#f0ece4]/25">
            © {year} IGO Group of Companies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-sm text-[#f0ece4]/25 hover:text-[#f0ece4]/60 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-sm text-[#f0ece4]/25 hover:text-[#f0ece4]/60 transition-colors">Terms of Service</Link>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="absolute -top-16 right-0 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: 'rgba(200,168,75,0.3)', color: '#c8a84b', background: 'rgba(200,168,75,0.08)' }}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
