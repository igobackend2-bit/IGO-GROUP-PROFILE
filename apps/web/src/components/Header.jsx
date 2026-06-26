import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, ChevronDown, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navLinks, ecosystemLinks } from '@/data/navigation.js';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > 100 && latest > previous);
    setScrolled(latest > 20);
  });

  const isActive = (path) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const allMobileLinks = [
    { name: 'Home', path: '/' },
    ...ecosystemLinks,
    ...navLinks.slice(1),
  ];

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'glass-dark py-3 shadow-lg shadow-black/40' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)', color: '#071a0e' }}
            >
              I
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-serif font-bold text-[#f0ece4] tracking-tight">IGO Group</span>
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#4ade80]">of Companies</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-2 rounded-full border border-white/8 bg-white/4 backdrop-blur-xl shadow-xl">
            <Link
              to="/"
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-white/10 text-[#f0ece4]'
                  : 'text-[#f0ece4]/55 hover:text-[#f0ece4] hover:bg-white/6'
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 outline-none cursor-pointer ${
                  isActive('/brands') || isActive('/departments')
                    ? 'bg-white/10 text-[#f0ece4]'
                    : 'text-[#f0ece4]/55 hover:text-[#f0ece4] hover:bg-white/6'
                }`}
              >
                Ecosystem <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 mt-3 rounded-2xl p-2 border-white/8 shadow-2xl"
                style={{ background: 'rgba(7,26,14,0.97)', backdropFilter: 'blur(24px)' }}
              >
                {ecosystemLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild className="cursor-pointer p-0 rounded-xl focus:bg-white/5">
                    <Link to={link.path} className="flex flex-col gap-0.5 p-4 rounded-xl">
                      <span className="font-semibold text-[#f0ece4] flex items-center justify-between text-sm">
                        {link.name} <ArrowRight className="w-3.5 h-3.5 opacity-35" />
                      </span>
                      <span className="text-xs text-[#f0ece4]/35">{link.desc}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-white/10 text-[#f0ece4]'
                    : 'text-[#f0ece4]/55 hover:text-[#f0ece4] hover:bg-white/6'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              className="rounded-full px-6 font-bold shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-300 border-0 text-[#071a0e]"
              style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)' }}
            >
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="rounded-full text-[#f0ece4] hover:bg-white/10 border border-white/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[360px] border-l border-white/8 p-0 flex flex-col"
                style={{ background: 'rgba(7,26,14,0.98)', backdropFilter: 'blur(28px)' }}
              >
                <SheetHeader className="p-6 border-b border-white/8 text-left">
                  <SheetTitle className="font-serif text-2xl text-[#f0ece4]">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Navigate through IGO Group ecosystem</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="flex flex-col space-y-1.5">
                    {allMobileLinks.map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`block p-4 rounded-xl text-base font-semibold transition-colors ${
                            isActive(link.path)
                              ? 'bg-white/8 text-[#f0ece4]'
                              : 'text-[#f0ece4]/50 hover:bg-white/5 hover:text-[#f0ece4]'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                <div className="p-6 border-t border-white/8">
                  <Button
                    asChild
                    className="w-full h-13 text-base rounded-xl font-bold border-0 text-[#071a0e]"
                    style={{ background: 'linear-gradient(135deg, #c8a84b, #f0d060, #a07820)' }}
                  >
                    <Link to="/contact" onClick={() => setIsOpen(false)}>Partner With Us</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
