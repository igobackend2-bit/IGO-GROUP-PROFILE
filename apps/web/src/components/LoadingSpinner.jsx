
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
        className="p-4 bg-primary/10 rounded-full text-primary"
      >
        <Leaf className="w-8 h-8" />
      </motion.div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading experience...</p>
    </div>
  );
}

export default LoadingSpinner;
