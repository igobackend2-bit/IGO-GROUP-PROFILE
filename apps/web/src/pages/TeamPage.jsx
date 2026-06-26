
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ExecutiveCard from '@/components/ExecutiveCard.jsx';
import BreadcrumbNav from '@/components/BreadcrumbNav.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import { Quote } from 'lucide-react';

function TeamPage() {
  const executives = [
    {
      name: 'Dr. John Yesudhas',
      title: 'Founder & Group CEO',
      bio: 'Visionary leader with over 15 years of experience building diversified business portfolios. Dr. Yesudhas founded IGO Group with a resolute mission to create sustainable, multi-generational value across core industries.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
      name: 'Priya Sharma',
      title: 'Chief Operating Officer',
      bio: 'Drives operational excellence across all 27 business units with rigorous expertise in process optimization and strategic execution.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
      name: 'Rajesh Kumar',
      title: 'Chief Financial Officer',
      bio: 'Oversees financial strategy, investment planning, and capital allocation. Instrumental in scaling the IGO Finance division.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
      name: 'Anika Patel',
      title: 'Chief Technology Officer',
      bio: 'Leads digital transformation initiatives and the development of the India Green App ecosystem.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
      name: 'Vikram Reddy',
      title: 'Chief Sustainability Officer',
      bio: 'Champions environmental initiatives, ensuring all agricultural and energy projects meet rigorous global standards.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
      name: 'Meera Nair',
      title: 'Chief HR Officer',
      bio: 'Builds high-performing teams, fostering a culture of excellence for over 2,000 employees globally.',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=256&h=256&auto=format&fit=crop'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Leadership Team - IGO Group</title>
        <meta name="description" content="Meet the visionary executive leadership team driving IGO Group of Companies." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <section className="pt-12 pb-16 bg-muted/20 border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <BreadcrumbNav />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="heading-hero mb-6">Executive Leadership</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Decades of combined experience, united by a singular purpose: to build sustainable, enterprise-grade solutions for tomorrow's challenges.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {executives.map((executive, index) => (
                  <ExecutiveCard
                    key={index}
                    executive={executive}
                    index={index}
                    featured={index === 0}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy / Diversity Metrics */}
          <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)'}}></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Quote className="w-12 h-12 text-secondary mb-6 opacity-50" />
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    "Great companies are not just built on solid ground, but by exceptional people."
                  </h2>
                  <p className="text-lg text-primary-foreground/80 mb-8 font-medium">
                    — Dr. John Yesudhas, Founder & CEO
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-primary-foreground/10 border border-primary-foreground/20 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-bold mb-2 font-serif"><AnimatedCounter value={42} suffix="%" /></div>
                    <p className="text-sm text-primary-foreground/80 font-medium">Women in Leadership</p>
                  </div>
                  <div className="bg-primary-foreground/10 border border-primary-foreground/20 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-bold mb-2 font-serif"><AnimatedCounter value={2000} suffix="+" /></div>
                    <p className="text-sm text-primary-foreground/80 font-medium">Global Employees</p>
                  </div>
                  <div className="bg-primary-foreground/10 border border-primary-foreground/20 p-6 rounded-2xl backdrop-blur-sm col-span-2">
                    <div className="text-4xl font-bold mb-2 font-serif"><AnimatedCounter value={12} /></div>
                    <p className="text-sm text-primary-foreground/80 font-medium">Countries Represented in our Workforce</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default TeamPage;
