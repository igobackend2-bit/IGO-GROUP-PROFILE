
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, Tag, Info, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function BrandModal({ brand, isOpen, onClose }) {
  if (!brand) return null;
  
  const isUpcoming = brand.status === 'Upcoming';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden p-0 rounded-2xl">
        <div className="bg-primary/5 p-6 border-b border-border/50">
          <div className="flex justify-between items-start gap-4 mb-4">
            <Badge variant={isUpcoming ? "secondary" : "default"} className={isUpcoming ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}>
              {brand.status} Operation
            </Badge>
            <Badge variant="outline" className="bg-background">
              {brand.category}
            </Badge>
          </div>
          <DialogTitle className="text-3xl font-serif text-foreground mb-2">{brand.name}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Part of the IGO Group Ecosystem
          </DialogDescription>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">About the Brand</h4>
              <p className="text-foreground leading-relaxed">{brand.description}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">Sector Impact</h4>
              <p className="text-muted-foreground text-sm">
                Driving innovation and sustainable practices within the {brand.category.toLowerCase()} sector.
              </p>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button className="gap-2 group">
              Visit Brand Website 
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BrandModal;
