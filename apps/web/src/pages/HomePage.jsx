
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Globe, ShieldCheck, Sprout, ArrowRight, PlayCircle, BarChart3, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import PageTransition from '@/components/PageTransition.jsx';

function HomePage() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const achievements = [
    { icon: Building2, title: '27+ Active Brands', desc: 'Diversified across multiple high-growth sectors.' },
    { icon: ShieldCheck, title: 'Quality Assured', desc: 'Rigorous standards in all our manufacturing and farming.' },
    { icon: Globe, title: 'Global Reach', desc: 'Expanding our footprint across international markets.' },
    { icon: Sprout, title: 'Sustainable', desc: 'Committed to environmental stewardship and clean energy.' }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>IGO Group of Companies - Built on Land. Driven by Purpose.</title>
        <meta name="description" content="IGO Group is a premier enterprise conglomerate spanning agriculture, tech, retail, and more. Discover our 27+ brands." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-background">
        {/* PREMIUM HERO SECTION WITH PARALLAX */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: yHero, opacity: opacityHero }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1564771789713-8586b829cbeb?q=80&w=2940&auto=format&fit=crop')`
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background"></div>
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          </motion.div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-white text-sm font-medium mb-8 shadow-xl"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                Enterprise Conglomerate
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="heading-hero text-white mb-6 drop-shadow-lg"
              >
                Built on Land.<br/>
                <span className="text-gradient-gold">Driven by Purpose.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Shaping the future through sustainable innovation across agriculture, technology, healthcare, and energy. Over 27 brands creating lasting global value.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="h-14 px-8 text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/brands">
                    Explore Ecosystem <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full backdrop-blur-md shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <Link to="/about">
                    <PlayCircle className="mr-2 w-5 h-5" /> Our Vision
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
            <div className="w-px h-12 bg-white/20 relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-full h-1/2 bg-white/80 absolute top-0"
              />
            </div>
          </motion.div>
        </section>

        {/* ANIMATED STATS SECTION */}
        <section className="relative z-20 -mt-16 mx-4 sm:mx-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="container mx-auto glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
              <div className="px-4 text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                  <AnimatedCounter value={27} suffix="+" />
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Active Brands</p>
              </div>
              <div className="px-4 text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                  <AnimatedCounter value={18} />
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Departments</p>
              </div>
              <div className="px-4 text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                  <AnimatedCounter value={2000} suffix="+" />
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Global Staff</p>
              </div>
              <div className="px-4 text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Years Legacy</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* KEY ACHIEVEMENTS */}
        <section className="py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="heading-section mb-6">Strategic Excellence</h2>
              <p className="text-xl text-muted-foreground">
                Our operational framework is engineered to deliver uncompromised quality, sustainable growth, and generational value.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    <Card className="h-full bg-card hover:bg-muted/50 transition-all duration-500 border-border shadow-lg hover:shadow-xl hover:-translate-y-2 group rounded-3xl overflow-hidden">
                      <CardContent className="p-8 text-center flex flex-col items-center">
                        <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-500">
                          <Icon className="w-10 h-10 text-secondary" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* BENTO GRID - ECOSYSTEM PREVIEW */}
        <section className="py-32 bg-primary text-primary-foreground rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] relative z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <h2 className="heading-section mb-6">A Powerful Brand Ecosystem</h2>
                <p className="text-xl text-primary-foreground/80 font-light">
                  From advanced agritech and precision farming to holistic healthcare and fintech, our portfolio is meticulously structured to build synergistic value.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl">
                  <Link to="/brands">View Full Directory</Link>
                </Button>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-secondary/40 to-primary p-10 rounded-3xl border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <Sprout className="w-12 h-12 text-accent mb-6" />
                  <h3 className="font-serif text-4xl font-bold mb-4">Core Agri & Tech</h3>
                  <p className="text-lg text-primary-foreground/80 max-w-md">Leading farm engineering, automation, and produce distribution under brands like IGO Agritech Farms.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-end group"
              >
                <BarChart3 className="w-10 h-10 text-accent mb-4 group-hover:-translate-y-2 transition-transform" />
                <h3 className="font-serif text-2xl font-bold mb-2">Finance & Realty</h3>
                <p className="text-sm text-primary-foreground/70">Micro-finance, wealth management, and premium farmlands.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-end group"
              >
                <ShieldCheck className="w-10 h-10 text-accent mb-4 group-hover:-translate-y-2 transition-transform" />
                <h3 className="font-serif text-2xl font-bold mb-2">Health & Wellness</h3>
                <p className="text-sm text-primary-foreground/70">Holistic healthcare, natural cosmetics, and organic pharmacy.</p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </PageTransition>
  );
}

export default HomePage;
