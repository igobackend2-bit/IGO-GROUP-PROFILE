
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, Search, ChevronDown, Leaf, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300 shadow-md">
              <Leaf className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-serif font-bold leading-tight tracking-tight transition-colors ${scrolled ? 'text-foreground' : 'text-primary-foreground drop-shadow-sm'}`}>
                IGO Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-background/40 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-lg">
            <Link to="/" className="relative px-5 py-2 text-sm font-medium transition-colors text-foreground hover:text-primary z-10 group">
              Home
              {isActive('/') && (
                <motion.div layoutId="nav-indicator" className="absolute inset-0 bg-primary/10 rounded-full -z-10" />
              )}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="relative px-5 py-2 text-sm font-medium transition-colors text-foreground hover:text-primary z-10 group flex items-center gap-1 outline-none">
                Ecosystem <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                {(isActive('/brands') || isActive('/departments')) && (
                  <motion.div layoutId="nav-indicator" className="absolute inset-0 bg-primary/10 rounded-full -z-10" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-4 rounded-2xl p-2 bg-card/90 backdrop-blur-xl border-border shadow-2xl">
                <DropdownMenuItem asChild className="cursor-pointer p-4 rounded-xl focus:bg-muted transition-colors">
                  <Link to="/brands" className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground flex items-center justify-between">
                      Our Brands <ArrowRight className="w-4 h-4 opacity-50" />
                    </span>
                    <span className="text-xs text-muted-foreground">Explore our 27+ ventures</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer p-4 rounded-xl focus:bg-muted transition-colors">
                  <Link to="/departments" className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground flex items-center justify-between">
                      Departments <ArrowRight className="w-4 h-4 opacity-50" />
                    </span>
                    <span className="text-xs text-muted-foreground">Operational excellence centers</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-5 py-2 text-sm font-medium transition-colors text-foreground hover:text-primary z-10"
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div layoutId="nav-indicator" className="absolute inset-0 bg-primary/10 rounded-full -z-10" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className={`rounded-full transition-colors ${scrolled ? 'text-foreground' : 'text-primary-foreground hover:bg-white/20'}`}>
              <Search className="h-5 w-5" />
            </Button>
            <Button asChild className="rounded-full px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`rounded-full ${scrolled ? 'text-foreground' : 'text-primary-foreground hover:bg-white/20'}`}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l-0 p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-border text-left">
                  <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigate through IGO Group ecosystem and departments.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="flex flex-col space-y-2">
                    {[{name: 'Home', path: '/'}, {name: 'Brands', path: '/brands'}, {name: 'Departments', path: '/departments'}, ...navLinks.slice(1)].map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link 
                          to={link.path} 
                          onClick={() => setIsOpen(false)} 
                          className={`block p-4 rounded-xl text-lg font-medium transition-colors ${isActive(link.path) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                <div className="p-6 border-t border-border bg-muted/30">
                  <Button asChild className="w-full h-14 text-lg rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
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
