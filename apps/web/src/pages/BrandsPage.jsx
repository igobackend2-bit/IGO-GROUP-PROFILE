
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, SlidersHorizontal, ArrowDownAZ, LayoutGrid } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BrandCard from '@/components/BrandCard.jsx';
import BrandModal from '@/components/BrandModal.jsx';
import PageTransition from '@/components/PageTransition.jsx';

const allBrands = [
  { name: "IGO Agritech Farms", description: "India's leading farm engineering and farm consulting brand providing end-to-end solutions for modern agriculture.", category: "Core Agri", status: "Active" },
  { name: "Farmers Factory", description: "Farm produce distribution brand ensuring fair prices for farmers and quality for consumers.", category: "Core Agri", status: "Active" },
  { name: "Valluvam", description: "Pure farm fresh groceries delivered directly to your doorstep with uncompromised quality.", category: "Retail & Food", status: "Active" },
  { name: "Palm Cafe", description: "Pure healthy diet restaurant chain focusing on organic and nutritious meals.", category: "Retail & Food", status: "Active" },
  { name: "IGO Agri Mart", description: "One-stop shop for farm and farm engineering products, seeds, and equipment.", category: "Core Agri", status: "Active" },
  { name: "IGO Farmlands Estates", description: "Premium farm land development with integrated managed farming projects.", category: "Finance & Realty", status: "Active" },
  { name: "IGO Nursery", description: "Nurturing growth and quality with superior saplings and plant varieties.", category: "Core Agri", status: "Active" },
  { name: "IGO Farm Factories", description: "Producing essential products and inputs for modern, sustainable farming.", category: "Trade & Export", status: "Active" },
  { name: "IGO Academy", description: "Farming training academy empowering the next generation of agritech entrepreneurs.", category: "Tech & Digital", status: "Active" },
  { name: "IGO Tech Farming Scientists", description: "Foundation powering farming innovation through intensive research.", category: "Tech & Digital", status: "Active" },
  { name: "IGO Fintech", description: "Kirana stores micro-finance providing liquidity to rural retail ecosystems.", category: "Finance & Realty", status: "Active" },
  { name: "IGO Franchise (FICO)", description: "Franchise opportunities for complete farming conglomerate business models.", category: "Finance & Realty", status: "Active" },
  { name: "IGO Farm Loans", description: "Financial support, subsidy & grants facilitation for agriculture businesses.", category: "Finance & Realty", status: "Active" },
  { name: "Tech Farming Expert", description: "Expert consulting services for modern agriculture implementation.", category: "Tech & Digital", status: "Active" },
  { name: "Tech Farming Wealth", description: "Wealth management services building passive income streams from farming.", category: "Finance & Realty", status: "Active" },
  { name: "Farmgate Mandi", description: "Digital farm gate buyback platform ensuring transparent market access.", category: "Core Agri", status: "Active" },
  { name: "Protein Cuts", description: "Distributing premium quality eggs, meat, poultry and fish.", category: "Retail & Food", status: "Active" },
  { name: "IGO Farm Automation", description: "Automating farming through IoT, sensors, and smart machinery.", category: "Tech & Digital", status: "Active" },
  { name: "IGO Exports & Imports", description: "Exporting premium farming goods to international markets.", category: "Trade & Export", status: "Active" },
  { name: "India Green App", description: "The central digital app for the entire farming conglomerate ecosystem.", category: "Tech & Digital", status: "Active" },
  { name: "IGO Mart", description: "Farm fresh supermarket chain providing premium organic goods.", category: "Retail & Food", status: "Upcoming" },
  { name: "IGO Crop Care", description: "Advanced solutions for comprehensive farm and crop maintenance.", category: "Core Agri", status: "Upcoming" },
  { name: "IGO Organic Pharmacy", description: "Siddha and Ayurveda farm medicine produced naturally.", category: "Trade & Export", status: "Upcoming" },
  { name: "IGO Green Energy", description: "Sustainable solar and wind energy solutions for agricultural zones.", category: "Sustainability", status: "Upcoming" },
  { name: "IGO Natural Cosmetics", description: "Organic skin care products derived from our farming extracts.", category: "Retail & Food", status: "Upcoming" },
  { name: "India Green Organics", description: "Certified organic farming products for international export.", category: "Sustainability", status: "Upcoming" },
  { name: "IGO Health & Wellness", description: "Holistic wellness solutions integrating diet, lifestyle, and nature.", category: "Retail & Food", status: "Upcoming" }
];

const categories = ["All", ...Array.from(new Set(allBrands.map(b => b.category))).sort()];

function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('a-z');
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filteredAndSortedBrands = useMemo(() => {
    let result = allBrands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            brand.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return result.sort((a, b) => {
      if (sortBy === 'a-z') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <PageTransition>
      <Helmet>
        <title>Brand Ecosystem - IGO Group</title>
        <meta name="description" content="Explore our 27 premium brands across Core Agri, Retail, Tech, Finance, and Sustainability." />
      </Helmet>

      <Header />

      <main className="flex-1 bg-muted/30">
        <section className="pt-32 pb-16 bg-background rounded-b-[3rem] shadow-sm relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="heading-hero mb-6">Brand Ecosystem</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
                A meticulously engineered portfolio of 27 ventures designed to synergize across multiple high-value sectors globally.
              </p>

              {/* Advanced Filter UI */}
              <div className="glass p-4 rounded-3xl flex flex-col md:flex-row gap-4 shadow-xl border-border/50 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Input 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search brands, sectors, or keywords..." 
                    className="w-full h-14 pl-6 pr-4 rounded-2xl bg-background border-none shadow-inner focus-visible:ring-primary text-lg"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] h-14 rounded-2xl bg-background border-none shadow-inner text-base focus:ring-primary">
                      <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4 opacity-50"/> <SelectValue placeholder="Category" /></div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map(cat => <SelectItem key={cat} value={cat} className="rounded-lg">{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] h-14 rounded-2xl bg-background border-none shadow-inner text-base focus:ring-primary">
                      <div className="flex items-center gap-2"><ArrowDownAZ className="w-4 h-4 opacity-50"/> <SelectValue placeholder="Sort" /></div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="a-z" className="rounded-lg">Name (A-Z)</SelectItem>
                      <SelectItem value="category" className="rounded-lg">Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold flex items-center gap-3">
                <span className="w-8 h-px bg-primary inline-block"></span>
                Showing {filteredAndSortedBrands.length} Ventures
              </h2>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredAndSortedBrands.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card rounded-3xl border p-16 text-center shadow-lg max-w-2xl mx-auto my-12"
                >
                  <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                  <h3 className="text-3xl font-serif font-bold mb-4">No match found</h3>
                  <p className="text-lg text-muted-foreground mb-8">We couldn't find any brands matching your current filters.</p>
                  <Button size="lg" className="rounded-full px-8 h-12" onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAndSortedBrands.map((brand, index) => (
                    <BrandCard 
                      key={brand.name} 
                      brand={brand} 
                      index={index} 
                      onOpenModal={setSelectedBrand}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />

      <BrandModal 
        brand={selectedBrand} 
        isOpen={!!selectedBrand} 
        onClose={() => setSelectedBrand(null)} 
      />
    </PageTransition>
  );
}

export default BrandsPage;
