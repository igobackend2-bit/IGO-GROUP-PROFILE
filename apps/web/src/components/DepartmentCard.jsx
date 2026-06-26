
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DepartmentCard({ department, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Simulated team sizes based on index
  const teamSize = Math.floor(Math.random() * 50) + 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg border-t-4 border-t-secondary bg-card overflow-hidden">
        <CardHeader className="pb-3 bg-muted/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md tracking-wider">
              {department.id}
            </span>
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" /> {teamSize} Members
            </span>
          </div>
          <CardTitle className="text-lg font-serif leading-tight">{department.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4 flex-1">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/5 rounded-lg shrink-0">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-0.5">Leadership</span>
              <p className="text-sm font-medium text-foreground">{department.head}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-secondary/5 rounded-lg shrink-0">
              <Target className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-0.5">Core Focus</span>
              <p className="text-sm text-muted-foreground leading-snug">{department.focus}</p>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t mt-4 space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>contact.{department.id}@igogroup.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Ext. 40{department.id}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Internal Hub
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 px-4">
          <Button 
            variant="ghost" 
            className="w-full text-xs hover:bg-secondary/10 hover:text-secondary justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'View Contact Info'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default DepartmentCard;
