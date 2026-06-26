
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import DepartmentHierarchy from '@/components/DepartmentHierarchy.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { Building2, Search, Users, Target, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const allDepartments = [
  { id: "01", name: "IGO Engineering", head: "Head of Engineering", focus: "Farm infrastructure, civil & structural works" },
  { id: "02", name: "IGO Agri Operations", head: "Head of Agri Operations", focus: "Field execution, crop management, farm productivity" },
  { id: "03", name: "IGO Business Development", head: "Head of Business Development", focus: "New clients, partnerships, revenue growth" },
  { id: "04", name: "IGO Purchase", head: "Head of Purchase", focus: "Procurement, vendor management, cost control" },
  { id: "05", name: "IGO Labour Vendor Sourcing", head: "Head of Labour Vendor Sourcing", focus: "Labour supply chain, contractor management" },
  { id: "06", name: "IGO Human Resources", head: "Head of Human Resources", focus: "Talent acquisition, employee welfare, culture" },
  { id: "07", name: "IGO Lease & Buying Sourcing", head: "Head of Lease & Buying Sourcing", focus: "Land leasing, property acquisition" },
  { id: "08", name: "IGO Marketing", head: "Head of Marketing", focus: "Brand building, campaigns, digital presence" },
  { id: "09", name: "IGO CRM", head: "Head of CRM", focus: "Customer relationships, retention, satisfaction" },
  { id: "10", name: "IGO Data Analytics & Legal", head: "Head of Data Analytics & Legal", focus: "Data intelligence, compliance, legal affairs" },
  { id: "11", name: "IGO Research & Development", head: "Head of R&D", focus: "Agri innovation, new techniques, technology trials" },
  { id: "12", name: "IGO Accounts, Audit & Compliance", head: "Head of Accounts", focus: "Financial reporting, audits, regulatory compliance" },
  { id: "13", name: "IGO IT & Artificial Intelligence", head: "Head of IT & AI", focus: "Tech infrastructure, AI tools, digital systems" },
  { id: "14", name: "IGO Administration", head: "Head of Administration", focus: "Office management, logistics, support services" },
  { id: "15", name: "IGO Site Visit", head: "Head of Site Visit", focus: "Field inspections, site assessments, quality checks" },
  { id: "16", name: "IGO Farm Manager Welfare", head: "Head of Farm Manager Welfare", focus: "Farm manager support, welfare, development" },
  { id: "17", name: "IGO Management Operations Team", head: "Head of MOT", focus: "Cross-functional coordination, operational excellence" },
  { id: "18", name: "IGO Networking & Associations", head: "Head of Networking & Associations", focus: "Industry ties, government relations, strategic alliances" }
];

function InteractiveDepartmentCard({ department, index }) {
  const [expanded, setExpanded] = useState(false);
  const teamSize = useMemo(() => Math.floor(Math.random() * 50) + 15, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
    >
      <Card 
        className={`overflow-hidden border-border bg-card transition-shadow duration-300 cursor-pointer ${expanded ? 'shadow-2xl shadow-primary/10 ring-2 ring-primary/20' : 'hover:shadow-xl'}`}
        onClick={() => setExpanded(!expanded)}
      >
        <CardHeader className="pb-4 bg-muted/30">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-background bg-primary px-3 py-1 rounded-full shadow-sm">
              DEPT {department.id}
            </span>
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> {teamSize} Members
            </span>
          </div>
          <CardTitle className="text-2xl font-serif leading-tight">{department.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 text-secondary rounded-2xl shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Core Focus</span>
                <p className="text-foreground font-medium leading-snug">{department.focus}</p>
              </div>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t border-border overflow-hidden"
                >
                  <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif font-bold text-lg">
                      {department.head.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-0.5">Leadership</span>
                      <p className="font-semibold text-foreground">{department.head}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 flex justify-center">
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepartments = useMemo(() => {
    return allDepartments.filter(dept => {
      const q = searchQuery.toLowerCase();
      return dept.name.toLowerCase().includes(q) || 
             dept.focus.toLowerCase().includes(q) ||
             dept.head.toLowerCase().includes(q);
    });
  }, [searchQuery]);

  return (
    <PageTransition>
      <Helmet>
        <title>Departments & Structure - IGO Group</title>
        <meta name="description" content="Explore our 18 operational departments powering the IGO Group ecosystem." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-background">
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl text-center md:text-left"
              >
                <h1 className="heading-hero mb-6">Operational Core</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  18 specialized departments working in seamless synergy to drive growth, innovation, and operational excellence across the conglomerate.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md relative"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input 
                  placeholder="Search departments or focus areas..." 
                  className="w-full h-16 pl-12 pr-6 rounded-3xl bg-card border-none shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-visible:ring-primary text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card border-y shadow-sm relative z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl font-bold mb-4">Organizational Structure</h2>
              <p className="text-muted-foreground">The strategic hierarchy driving the IGO vision.</p>
            </motion.div>
            <DepartmentHierarchy />
          </div>
        </section>

        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="heading-section">Directory</h2>
            </div>
            
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredDepartments.map((dept, index) => (
                  <InteractiveDepartmentCard key={dept.id} department={dept} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default DepartmentsPage;
