
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ExecutiveCard({ executive, index, featured = false }) {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const avatarColors = ['bg-amber-700', 'bg-emerald-700', 'bg-sky-700', 'bg-indigo-700', 'bg-rose-700', 'bg-stone-700'];
  const colorClass = avatarColors[index % avatarColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={featured ? 'md:col-span-2 lg:col-span-3 mb-8' : ''}
    >
      <Card className={`h-full transition-all duration-300 hover:shadow-xl group overflow-hidden ${
        featured ? 'flex flex-col md:flex-row bg-primary text-primary-foreground border-primary' : 'bg-card'
      }`}>
        <div className={`p-8 flex justify-center items-center ${featured ? 'md:w-1/3 bg-black/10' : 'bg-muted/30 border-b'}`}>
          <Avatar className={`ring-4 ring-background/50 shadow-xl ${featured ? 'h-40 w-40' : 'h-32 w-32'} rounded-2xl`}>
            <AvatarImage src={executive.image} alt={executive.name} className="object-cover" />
            <AvatarFallback className={`text-white text-3xl font-serif rounded-2xl ${colorClass}`}>
              {getInitials(executive.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className={`flex flex-col ${featured ? 'md:w-2/3 p-8' : 'p-6'}`}>
          <CardHeader className="p-0 mb-4 text-center md:text-left">
            <CardTitle className={`font-serif ${featured ? 'text-3xl md:text-4xl text-primary-foreground' : 'text-2xl text-foreground'}`}>
              {executive.name}
            </CardTitle>
            <p className={`font-medium mt-1 ${featured ? 'text-primary-foreground/80 text-lg' : 'text-secondary text-sm'}`}>
              {executive.title}
            </p>
          </CardHeader>
          
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <p className={`leading-relaxed mb-6 ${featured ? 'text-primary-foreground/90 text-lg' : 'text-muted-foreground text-sm'}`}>
              {executive.bio}
            </p>
            
            <div className={`flex gap-2 justify-center md:justify-start mt-auto pt-4 border-t ${featured ? 'border-primary-foreground/20' : 'border-border'}`}>
              <Button variant="ghost" size="icon" className={`rounded-full ${featured ? 'hover:bg-primary-foreground/10 text-primary-foreground' : 'hover:bg-muted'}`} aria-label={`${executive.name} LinkedIn`}>
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className={`rounded-full ${featured ? 'hover:bg-primary-foreground/10 text-primary-foreground' : 'hover:bg-muted'}`} aria-label={`${executive.name} Twitter`}>
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className={`rounded-full ${featured ? 'hover:bg-primary-foreground/10 text-primary-foreground' : 'hover:bg-muted'}`} aria-label={`Email ${executive.name}`}>
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

export default ExecutiveCard;
