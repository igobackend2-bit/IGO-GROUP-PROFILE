import React from 'react';
import {
  BadgeCheck,
  Beef,
  Bot,
  BriefcaseBusiness,
  Building2,
  Coffee,
  Cog,
  CreditCard,
  Factory,
  Flower2,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Leaf,
  Map,
  Microscope,
  Pill,
  Salad,
  ShoppingCart,
  Smartphone,
  Sprout,
  Store,
  Sun,
  TrendingUp,
  Wheat,
} from 'lucide-react';
import { cn } from '@/lib/utils.js';

const logoIcons = {
  BadgeCheck,
  Beef,
  Bot,
  BriefcaseBusiness,
  Building2,
  Coffee,
  Cog,
  CreditCard,
  Factory,
  Flower2,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Leaf,
  Map,
  Microscope,
  Pill,
  Salad,
  ShoppingCart,
  Smartphone,
  Sprout,
  Store,
  Sun,
  TrendingUp,
  Wheat,
};

const sizeClasses = {
  sm: {
    wrap: 'h-10 w-10 rounded-xl',
    icon: 'h-4 w-4',
    text: 'text-[9px]',
  },
  md: {
    wrap: 'h-14 w-14 rounded-2xl',
    icon: 'h-5 w-5',
    text: 'text-[11px]',
  },
  lg: {
    wrap: 'h-20 w-20 rounded-2xl',
    icon: 'h-7 w-7',
    text: 'text-sm',
  },
};

function BrandLogo({ brand, size = 'md', className }) {
  const logo = brand.logo ?? {};
  const [primary = '#4ade80', secondary = '#c8a84b'] = logo.colors ?? [];
  const Icon = logoIcons[logo.icon] ?? Leaf;
  const sizing = sizeClasses[size] ?? sizeClasses.md;

  return (
    <span
      className={cn(
        'relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden border shadow-lg',
        sizing.wrap,
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${primary}22, ${secondary}16), #071a0e`,
        borderColor: `${primary}45`,
        boxShadow: `0 12px 32px ${primary}18`,
      }}
      aria-hidden="true"
    >
      <span
        className="absolute -right-3 -top-3 h-10 w-10 rounded-full blur-xl"
        style={{ background: `${secondary}45` }}
      />
      <Icon className={cn('relative z-10', sizing.icon)} style={{ color: primary }} />
      <span
        className={cn(
          'absolute bottom-1.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-bold leading-none tracking-[1px]',
          sizing.text
        )}
        style={{ color: secondary }}
      >
        {logo.initials}
      </span>
    </span>
  );
}

export default BrandLogo;
