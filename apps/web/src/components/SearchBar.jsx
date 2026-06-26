
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative group w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        className="pl-10 h-12 rounded-full bg-background border-border focus-visible:ring-primary shadow-sm w-full transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;
