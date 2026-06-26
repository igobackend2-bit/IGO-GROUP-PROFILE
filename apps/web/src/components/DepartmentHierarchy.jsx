
import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowDown } from 'lucide-react';

function DepartmentHierarchy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-8 w-full overflow-x-auto">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="min-w-[800px] flex flex-col items-center space-y-6"
      >
        {/* CEO Level */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg border border-primary/20 text-center w-64">
            <h4 className="font-bold text-lg">Board of Directors</h4>
            <p className="text-primary-foreground/80 text-sm">Strategic Oversight</p>
          </div>
          <ArrowDown className="w-6 h-6 text-muted-foreground mt-4" />
        </motion.div>

        {/* Executive Level */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="bg-secondary text-secondary-foreground p-4 rounded-xl shadow-lg border border-secondary/20 text-center w-64 relative">
            <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-lg">Group CEO</h4>
            <p className="text-secondary-foreground/80 text-sm">Dr. John Yesudhas</p>
          </div>
          <ArrowDown className="w-6 h-6 text-muted-foreground mt-4" />
        </motion.div>

        {/* Division Level */}
        <motion.div variants={itemVariants} className="flex gap-8 w-full justify-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-border -mt-6"></div>
          <div className="absolute top-0 left-[20%] w-px h-6 bg-border -mt-6"></div>
          <div className="absolute top-0 left-1/2 w-px h-6 bg-border -mt-6"></div>
          <div className="absolute top-0 right-[20%] w-px h-6 bg-border -mt-6"></div>

          <div className="bg-card p-4 rounded-xl shadow-md border text-center w-56">
            <h4 className="font-bold text-foreground">Operations & Eng</h4>
            <p className="text-muted-foreground text-xs mt-1">5 Departments</p>
          </div>
          <div className="bg-card p-4 rounded-xl shadow-md border text-center w-56">
            <h4 className="font-bold text-foreground">Finance & Admin</h4>
            <p className="text-muted-foreground text-xs mt-1">4 Departments</p>
          </div>
          <div className="bg-card p-4 rounded-xl shadow-md border text-center w-56">
            <h4 className="font-bold text-foreground">Growth & Tech</h4>
            <p className="text-muted-foreground text-xs mt-1">9 Departments</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default DepartmentHierarchy;
