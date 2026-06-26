
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Leaf, Sprout, ShoppingCart, Zap, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function BrandCard({ brand, index, onOpenModal }) {
  const isUpcoming = brand.status === 'Upcoming';
  
  const getIcon = () => {
    switch(brand.category) {
      case 'Core Agri': return <Sprout className="w-6 h-6" />;
      case 'Retail & Food': return <ShoppingCart className="w-6 h-6" />;
      case 'Sustainability': return <Leaf className="w-6 h-6" />;
      case 'Tech & Digital': return <Zap className="w-6 h-6" />;
      default: return <Building className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      layout
      className="h-full"
    >
      <Card className="group h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 border-border bg-card overflow-hidden rounded-3xl relative cursor-pointer" onClick={() => onOpenModal(brand)}>
        
        {/* Animated Background Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <CardHeader className="pb-4 relative z-10">
          <div className="flex justify-between items-start gap-4 mb-4">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-md border-border rounded-full py-1 px-3">
              {brand.category}
            </Badge>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                isUpcoming ? 'bg-accent/20 text-accent-foreground' : 'bg-secondary/20 text-secondary'
              }`}
            >
              {brand.status}
            </span>
          </div>
          
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500 shadow-sm">
            {getIcon()}
          </div>
          
          <CardTitle className="text-2xl font-serif leading-tight group-hover:text-primary transition-colors">
            {brand.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="mt-auto relative z-10 flex-1">
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {brand.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-6 relative z-10">
          <div className="w-full flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
            View Brand Details
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default BrandCard;
