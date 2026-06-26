
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf, Lightbulb, Users, Award } from 'lucide-react';

function ValueCard({ value, index }) {
  const icons = {
    'Sustainability': Leaf,
    'Innovation': Lightbulb,
    'Collaboration': Users,
    'Excellence': Award
  };

  const Icon = icons[value.name] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">{value.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{value.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ValueCard;
