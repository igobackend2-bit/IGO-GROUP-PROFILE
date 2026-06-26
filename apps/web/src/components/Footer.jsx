
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, ArrowUp, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-primary-foreground/10 pb-16">
          
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-primary-foreground text-primary p-2 rounded-xl">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-2xl font-serif font-bold">IGO Group</span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed text-sm max-w-sm">
              A diversified enterprise conglomerate shaping industries across agriculture, technology, healthcare, and sustainability for generational impact.
            </p>
            <div className="flex gap-3 pt-2">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-serif font-bold text-lg mb-6 tracking-wide">Ecosystem</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { name: 'Our Brands', path: '/brands' },
                { name: 'Departments', path: '/departments' },
                { name: 'Leadership', path: '/team' },
                { name: 'Sustainability', path: '/about' },
                { name: 'Investors', path: '/contact' }
              ].map((item, i) => (
                <Link key={i} to={item.path} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors w-fit flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-accent">- </span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="font-serif font-bold text-lg mb-6 tracking-wide">Headquarters</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5 group-hover:animate-bounce" />
                <span className="text-sm text-primary-foreground/70">
                  IGO Corporate Block<br />Chennai, Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 text-accent shrink-0 group-hover:rotate-12 transition-transform" />
                <span className="text-sm text-primary-foreground/70">+91 (044) 1234-5678</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-primary-foreground/70">contact@igogroup.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="font-serif font-bold text-lg mb-6 tracking-wide">Stay Informed</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Insights and updates from across our 27+ brands.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => { e.preventDefault(); /* simulate toast in real usage */ }}>
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 h-12 pr-12 focus-visible:ring-accent rounded-xl"
                  required
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1 bottom-1 h-10 w-10 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-transform active:scale-95">
                  <ArrowUp className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <p className="text-sm text-primary-foreground/50">
            © {currentYear} IGO Group of Companies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Terms of Service</Link>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollToTop}
            className="absolute -top-16 right-0 rounded-full bg-accent/10 border-accent/20 text-accent hover:bg-accent hover:text-accent-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
