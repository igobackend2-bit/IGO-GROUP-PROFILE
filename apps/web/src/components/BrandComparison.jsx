
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

function BrandComparison({ brands, isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] sm:h-[60vh] rounded-t-3xl border-t border-border shadow-2xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-serif text-2xl">Brand Comparison</SheetTitle>
          <SheetDescription>
            Comparing {brands.length} selected brands across the IGO ecosystem.
          </SheetDescription>
        </SheetHeader>
        
        <div className="overflow-auto border rounded-xl bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[250px] font-semibold">Brand Name</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold min-w-[300px]">Strategic Focus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Select brands to compare
                  </TableCell>
                </TableRow>
              ) : (
                brands.map((brand) => (
                  <TableRow key={brand.name}>
                    <TableCell className="font-medium text-foreground">{brand.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{brand.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        brand.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {brand.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{brand.description}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default BrandComparison;
