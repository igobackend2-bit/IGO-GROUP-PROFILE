
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ValueCard from '@/components/ValueCard.jsx';
import BreadcrumbNav from '@/components/BreadcrumbNav.jsx';
import { Target, Lightbulb, Compass, Heart } from 'lucide-react';

function AboutPage() {
  const coreValues = [
    {
      name: 'Sustainability Focus',
      description: 'Prioritizing environmental stewardship in all agricultural and tech operations to ensure a net-positive impact.',
      icon: Target
    },
    {
      name: 'Continuous Innovation',
      description: 'Leveraging R&D and AI to revolutionize traditional sectors and maintain industry leadership.',
      icon: Lightbulb
    },
    {
      name: 'Ethical Leadership',
      description: 'Conducting business with absolute transparency, integrity, and respect for all stakeholders.',
      icon: Compass
    },
    {
      name: 'Community Enrichment',
      description: 'Building ecosystems that uplift local farmers, retail partners, and the global workforce.',
      icon: Heart
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - IGO Group</title>
        <meta name="description" content="Learn about our 15+ year history, vision, and the core values that drive the IGO Group." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="pt-12 pb-24 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <BreadcrumbNav />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <h1 className="heading-hero mb-6">Our Legacy</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Over 15 years of transforming visionary ideas into tangible, enterprise-scale realities across the globe.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-primary text-primary-foreground p-10 md:p-16 rounded-3xl shadow-xl"
                >
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
                  <p className="text-lg leading-relaxed text-primary-foreground/90">
                    To be the world's most trusted and diversified conglomerate, fundamentally altering how humanity interacts with land, technology, and commerce for a sustainable future.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border p-10 md:p-16 rounded-3xl shadow-lg"
                >
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    To engineer ecosystems that empower communities, optimize resources through technology, and deliver unparalleled value across our 27+ brands and operational sectors.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Culture Image / Story */}
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="heading-section mb-6">The IGO Culture</h2>
                  <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      At the heart of our vast conglomerate lies a singular, unifying culture: one of relentless curiosity and deep respect for the land we build upon.
                    </p>
                    <p>
                      From our agritech scientists in the field to our fintech developers in the lab, every member of the IGO Group operates with a shared mandate to innovate responsibly.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-square lg:aspect-[4/3]"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1600&auto=format&fit=crop" 
                    alt="IGO Group team collaboration" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-medium">Global Leadership Summit, 2025</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="heading-section mb-4">Core Principles</h2>
                <p className="text-lg text-muted-foreground">The foundational pillars that guide operations across all our departments and brands.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {coreValues.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-card p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow flex gap-6"
                    >
                      <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-serif mb-2">{val.name}</h3>
                        <p className="text-muted-foreground">{val.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
