# IGO Group 3D Agri Redesign — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Rebuild IGO Group site with Three.js WebGL 3D terrain hero, CSS liquid glass, full dark agri theme, and correct data (26 brands, 18 departments, 32 managers).

**Architecture:** Dark agri theme (earth/leaf/harvest tokens) applied via CSS variables. Three.js scene lazy-loaded via React.lazy(). All data extracted to src/data/. Every page rebuilt with new design system.

**Tech Stack:** React 18, Vite 7, Tailwind 3, Framer Motion 11, @react-three/fiber, @react-three/drei, three.js

## Global Constraints
- Dark theme only: earth-950 background (#071a0e), no light mode toggle
- All data in src/data/ — no inline arrays in page components
- 26 brands (not 27), 18 departments, 32 managers
- WebGL hero falls back to CSS parallax on reduced-motion or WebGL unavail
- aria-label on all icon-only buttons
- PageTransition wrapper on every page consistently

---

### Task 1: Install Three.js deps + create data layer

**Files:**
- Modify: `apps/web/package.json`
- Create: `apps/web/src/data/brands.js`
- Create: `apps/web/src/data/departments.js`
- Create: `apps/web/src/data/team.js`
- Create: `apps/web/src/data/navigation.js`

- [ ] Install dependencies
```bash
cd apps/web
npm install three @react-three/fiber @react-three/drei
```

- [ ] Create `apps/web/src/data/brands.js`
```js
export const brands = [
  { id: 'igo-agritech-farms', name: 'IGO Agritech Farms', description: "India's leading farm engineering and farm consulting brand providing end-to-end solutions for modern agriculture.", category: 'Core Agri', status: 'Active', emoji: '🌾' },
  { id: 'farmers-factory', name: 'Farmers Factory', description: 'Farm produce distribution brand ensuring fair prices for farmers and quality for consumers.', category: 'Core Agri', status: 'Active', emoji: '🏭' },
  { id: 'valluvam', name: 'Valluvam', description: 'Pure farm fresh groceries delivered directly to your doorstep with uncompromised quality.', category: 'Retail & Food', status: 'Active', emoji: '🥬' },
  { id: 'palm-cafe', name: 'Palm Cafe', description: 'Pure healthy diet restaurant chain focusing on organic and nutritious meals.', category: 'Retail & Food', status: 'Active', emoji: '🌴' },
  { id: 'igo-agri-mart', name: 'IGO Agri Mart', description: 'One-stop shop for farm and farm engineering products, seeds, and equipment.', category: 'Core Agri', status: 'Active', emoji: '🛒' },
  { id: 'igo-farmlands-estates', name: 'IGO Farmlands Estates', description: 'Premium farm land development with integrated managed farming projects.', category: 'Finance & Realty', status: 'Active', emoji: '🏡' },
  { id: 'igo-nursery', name: 'IGO Nursery', description: 'Nurturing growth and quality with superior saplings and plant varieties.', category: 'Core Agri', status: 'Active', emoji: '🌱' },
  { id: 'igo-farm-factories', name: 'IGO Farm Factories', description: 'Producing essential products and inputs for modern, sustainable farming.', category: 'Trade & Export', status: 'Active', emoji: '⚙️' },
  { id: 'igo-academy', name: 'IGO Academy', description: 'Farming training academy empowering the next generation of agritech entrepreneurs.', category: 'Tech & Digital', status: 'Active', emoji: '🎓' },
  { id: 'igo-tech-farming-scientists', name: 'IGO Tech Farming Scientists', description: 'Foundation powering farming innovation through intensive research.', category: 'Tech & Digital', status: 'Active', emoji: '🔬' },
  { id: 'igo-fintech', name: 'IGO Fintech', description: 'Kirana stores micro-finance providing liquidity to rural retail ecosystems.', category: 'Finance & Realty', status: 'Active', emoji: '💳' },
  { id: 'igo-franchise', name: 'IGO Franchise (FICO)', description: 'Franchise opportunities for complete farming conglomerate business models.', category: 'Finance & Realty', status: 'Active', emoji: '🤝' },
  { id: 'igo-farm-loans', name: 'IGO Farm Loans', description: 'Financial support, subsidy & grants facilitation for agriculture businesses.', category: 'Finance & Realty', status: 'Active', emoji: '🏦' },
  { id: 'tech-farming-expert', name: 'Tech Farming Expert', description: 'Expert consulting services for modern agriculture implementation.', category: 'Tech & Digital', status: 'Active', emoji: '👨‍💼' },
  { id: 'tech-farming-wealth', name: 'Tech Farming Wealth', description: 'Wealth management services building passive income streams from farming.', category: 'Finance & Realty', status: 'Active', emoji: '📈' },
  { id: 'farmgate-mandi', name: 'Farmgate Mandi', description: 'Digital farm gate buyback platform ensuring transparent market access.', category: 'Core Agri', status: 'Active', emoji: '🏪' },
  { id: 'protein-cuts', name: 'Protein Cuts', description: 'Distributing premium quality eggs, meat, poultry and fish.', category: 'Retail & Food', status: 'Active', emoji: '🥩' },
  { id: 'igo-farm-automation', name: 'IGO Farm Automation', description: 'Automating farming through IoT, sensors, and smart machinery.', category: 'Tech & Digital', status: 'Active', emoji: '🤖' },
  { id: 'igo-exports-imports', name: 'IGO Exports & Imports', description: 'Exporting premium farming goods to international markets.', category: 'Trade & Export', status: 'Active', emoji: '🌍' },
  { id: 'india-green-app', name: 'India Green App', description: 'The central digital app for the entire farming conglomerate ecosystem.', category: 'Tech & Digital', status: 'Active', emoji: '📱' },
  { id: 'igo-mart', name: 'IGO Mart', description: 'Farm fresh supermarket chain providing premium organic goods.', category: 'Retail & Food', status: 'Upcoming', emoji: '🏬' },
  { id: 'igo-crop-care', name: 'IGO Crop Care', description: 'Advanced solutions for comprehensive farm and crop maintenance.', category: 'Core Agri', status: 'Upcoming', emoji: '🌿' },
  { id: 'igo-organic-pharmacy', name: 'IGO Organic Pharmacy', description: 'Siddha and Ayurveda farm medicine produced naturally.', category: 'Trade & Export', status: 'Upcoming', emoji: '⚕️' },
  { id: 'igo-green-energy', name: 'IGO Green Energy', description: 'Sustainable solar and wind energy solutions for agricultural zones.', category: 'Sustainability', status: 'Upcoming', emoji: '☀️' },
  { id: 'igo-natural-cosmetics', name: 'IGO Natural Cosmetics', description: 'Organic skin care products derived from our farming extracts.', category: 'Retail & Food', status: 'Upcoming', emoji: '🌸' },
  { id: 'india-green-organics', name: 'India Green Organics', description: 'Certified organic farming products for international export.', category: 'Sustainability', status: 'Upcoming', emoji: '🍃' },
];

export const brandCategories = ['All', ...Array.from(new Set(brands.map(b => b.category))).sort()];
```

- [ ] Create `apps/web/src/data/departments.js`
```js
export const departments = [
  { id: '01', name: 'IGO Engineering', head: 'Head of Engineering', focus: 'Farm infrastructure, civil & structural works', icon: '🏗️' },
  { id: '02', name: 'IGO Agri Operations', head: 'Head of Agri Operations', focus: 'Field execution, crop management, farm productivity', icon: '🌾' },
  { id: '03', name: 'IGO Business Development', head: 'Head of Business Development', focus: 'New clients, partnerships, revenue growth', icon: '📊' },
  { id: '04', name: 'IGO Purchase', head: 'Head of Purchase', focus: 'Procurement, vendor management, cost control', icon: '🛒' },
  { id: '05', name: 'IGO Labour Vendor Sourcing', head: 'Head of Labour Vendor Sourcing', focus: 'Labour supply chain, contractor management', icon: '👷' },
  { id: '06', name: 'IGO Human Resources', head: 'Head of Human Resources', focus: 'Talent acquisition, employee welfare, culture', icon: '👥' },
  { id: '07', name: 'IGO Lease & Buying Sourcing', head: 'Head of Lease & Buying Sourcing', focus: 'Land leasing, property acquisition', icon: '🏡' },
  { id: '08', name: 'IGO Marketing', head: 'Head of Marketing', focus: 'Brand building, campaigns, digital presence', icon: '📣' },
  { id: '09', name: 'IGO CRM', head: 'Head of CRM', focus: 'Customer relationships, retention, satisfaction', icon: '🤝' },
  { id: '10', name: 'IGO Data Analytics & Legal', head: 'Head of Data Analytics & Legal', focus: 'Data intelligence, compliance, legal affairs', icon: '⚖️' },
  { id: '11', name: 'IGO Research & Development', head: 'Head of R&D', focus: 'Agri innovation, new techniques, technology trials', icon: '🔬' },
  { id: '12', name: 'IGO Accounts, Audit & Compliance', head: 'Head of Accounts', focus: 'Financial reporting, audits, regulatory compliance', icon: '📋' },
  { id: '13', name: 'IGO IT & Artificial Intelligence', head: 'Head of IT & AI', focus: 'Tech infrastructure, AI tools, digital systems', icon: '🤖' },
  { id: '14', name: 'IGO Administration', head: 'Head of Administration', focus: 'Office management, logistics, support services', icon: '🏢' },
  { id: '15', name: 'IGO Site Visit', head: 'Head of Site Visit', focus: 'Field inspections, site assessments, quality checks', icon: '🔍' },
  { id: '16', name: 'IGO Farm Manager Welfare', head: 'Head of Farm Manager Welfare', focus: 'Farm manager support, welfare, development', icon: '❤️' },
  { id: '17', name: 'IGO Management Operations Team', head: 'Head of MOT', focus: 'Cross-functional coordination, operational excellence', icon: '⚙️' },
  { id: '18', name: 'IGO Networking & Associations', head: 'Head of Networking & Associations', focus: 'Industry ties, government relations, strategic alliances', icon: '🌐' },
];
```

- [ ] Create `apps/web/src/data/team.js`
```js
export const managers = [
  { id: 1, name: 'Dr. John Yesudhas', title: 'Founder & Group CEO', department: 'Executive', bio: 'Visionary leader with 15+ years building diversified business portfolios. Founded IGO Group to create sustainable multi-generational value.', featured: true },
  { id: 2, name: 'Priya Sharma', title: 'Chief Operating Officer', department: 'Executive', bio: 'Drives operational excellence across all 26 business units with expertise in process optimization.' },
  { id: 3, name: 'Rajesh Kumar', title: 'Chief Financial Officer', department: 'Executive', bio: 'Oversees financial strategy, investment planning, and capital allocation across the group.' },
  { id: 4, name: 'Anika Patel', title: 'Chief Technology Officer', department: 'Executive', bio: 'Leads digital transformation and the India Green App ecosystem development.' },
  { id: 5, name: 'Vikram Reddy', title: 'Chief Sustainability Officer', department: 'Executive', bio: 'Champions environmental initiatives ensuring all projects meet rigorous global standards.' },
  { id: 6, name: 'Meera Nair', title: 'Chief HR Officer', department: 'Executive', bio: 'Builds high-performing teams, fostering excellence culture for 2000+ employees.' },
  { id: 7, name: 'Arjun Krishnamurthy', title: 'Head of Engineering', department: 'IGO Engineering', bio: 'Leads all farm infrastructure, civil and structural engineering projects.' },
  { id: 8, name: 'Lakshmi Venkataraman', title: 'Head of Agri Operations', department: 'IGO Agri Operations', bio: 'Oversees field execution and crop management across all farming sites.' },
  { id: 9, name: 'Sanjay Gupta', title: 'Head of Business Development', department: 'IGO Business Development', bio: 'Drives new client acquisition, strategic partnerships, and revenue growth.' },
  { id: 10, name: 'Kavitha Rajan', title: 'Head of Purchase', department: 'IGO Purchase', bio: 'Manages procurement networks and vendor relationships for cost-efficient operations.' },
  { id: 11, name: 'Mohammed Farooq', title: 'Head of Labour Vendor Sourcing', department: 'IGO Labour Vendor Sourcing', bio: 'Oversees the entire labour supply chain and contractor management systems.' },
  { id: 12, name: 'Deepa Menon', title: 'Head of Human Resources', department: 'IGO Human Resources', bio: 'Leads talent acquisition, employee welfare programs, and cultural development.' },
  { id: 13, name: 'Suresh Babu', title: 'Head of Lease & Buying Sourcing', department: 'IGO Lease & Buying Sourcing', bio: 'Manages land leasing strategies and property acquisition portfolios.' },
  { id: 14, name: 'Anitha Sundaram', title: 'Head of Marketing', department: 'IGO Marketing', bio: 'Leads brand building, digital campaigns, and market positioning.' },
  { id: 15, name: 'Ravi Chandrasekaran', title: 'Head of CRM', department: 'IGO CRM', bio: 'Builds lasting customer relationships and retention programs.' },
  { id: 16, name: 'Preethi Iyer', title: 'Head of Data Analytics & Legal', department: 'IGO Data Analytics & Legal', bio: 'Oversees data intelligence platforms and ensures regulatory compliance.' },
  { id: 17, name: 'Karthik Subramanian', title: 'Head of R&D', department: 'IGO Research & Development', bio: 'Leads agri innovation research and technology trials for new farming methods.' },
  { id: 18, name: 'Nalini Krishnan', title: 'Head of Accounts', department: 'IGO Accounts, Audit & Compliance', bio: 'Manages financial reporting, audits, and regulatory compliance framework.' },
  { id: 19, name: 'Dinesh Muthukumar', title: 'Head of IT & AI', department: 'IGO IT & Artificial Intelligence', bio: 'Drives tech infrastructure and AI tool adoption across the group.' },
  { id: 20, name: 'Saranya Pillai', title: 'Head of Administration', department: 'IGO Administration', bio: 'Oversees office management, logistics, and enterprise support services.' },
  { id: 21, name: 'Balamurugan S.', title: 'Head of Site Visit', department: 'IGO Site Visit', bio: 'Leads field inspections and quality assurance checks across all sites.' },
  { id: 22, name: 'Vijayalakshmi R.', title: 'Head of Farm Manager Welfare', department: 'IGO Farm Manager Welfare', bio: 'Champions farm manager support programs and professional development.' },
  { id: 23, name: 'Harish Natarajan', title: 'Head of MOT', department: 'IGO Management Operations Team', bio: 'Coordinates cross-functional initiatives for operational excellence.' },
  { id: 24, name: 'Sumitra Devi', title: 'Head of Networking & Associations', department: 'IGO Networking & Associations', bio: 'Builds government relations and strategic industry alliances.' },
  { id: 25, name: 'Arun Prasad', title: 'GM — Core Agri', department: 'IGO Agri Operations', bio: 'General Manager overseeing the Core Agri brand cluster operations.' },
  { id: 26, name: 'Nithya Ramesh', title: 'GM — Retail & Food', department: 'IGO Business Development', bio: 'Leads the Retail & Food brand portfolio strategy and P&L.' },
  { id: 27, name: 'Praveen Kumar', title: 'GM — Finance & Realty', department: 'IGO Accounts, Audit & Compliance', bio: 'Manages the Finance & Realty vertical including Fintech and Farm Loans.' },
  { id: 28, name: 'Chamundeeswari T.', title: 'GM — Tech & Digital', department: 'IGO IT & Artificial Intelligence', bio: 'Drives the Tech & Digital brand cluster including IGO Farm Automation.' },
  { id: 29, name: 'Selvakumar M.', title: 'GM — Trade & Export', department: 'IGO Business Development', bio: 'Heads export operations and international trade partnerships.' },
  { id: 30, name: 'Jayanthi Krishnaswamy', title: 'GM — Sustainability', department: 'IGO Research & Development', bio: 'Leads the Sustainability brand cluster including IGO Green Energy.' },
  { id: 31, name: 'Murugesan P.', title: 'Regional Director — South', department: 'IGO Management Operations Team', bio: 'Oversees all southern India operations across brands and departments.' },
  { id: 32, name: 'Indira Balakrishnan', title: 'Regional Director — North & Export', department: 'IGO Networking & Associations', bio: 'Manages northern operations and international export relationships.' },
];

export const managerDepartments = ['All', 'Executive', ...Array.from(new Set(managers.filter(m => m.department !== 'Executive').map(m => m.department))).sort()];
```

- [ ] Create `apps/web/src/data/navigation.js`
```js
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

export const ecosystemLinks = [
  { name: 'Our Brands', path: '/brands', desc: 'Explore our 26 ventures' },
  { name: 'Departments', path: '/departments', desc: '18 operational centers' },
];
```

- [ ] Commit
```bash
git add apps/web/src/data/ apps/web/package.json apps/web/package-lock.json
git commit -m "feat: add data layer and Three.js dependencies"
```

---

### Task 2: New dark agri design tokens (index.css)

**Files:**
- Modify: `apps/web/src/index.css`

- [ ] Replace entire `apps/web/src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* IGO Agri Dark Theme */
    --background: 150 44% 7%;        /* #071a0e earth-950 */
    --foreground: 40 33% 92%;        /* #f0ece4 cream-50 */

    --primary: 150 44% 7%;
    --primary-foreground: 40 33% 92%;

    --secondary: 142 70% 45%;        /* #4ade80 leaf-400 */
    --secondary-foreground: 0 0% 0%;

    --accent: 43 53% 54%;            /* #c8a84b harvest-400 */
    --accent-foreground: 150 44% 7%;

    --muted: 150 30% 12%;            /* #0d2618 earth-900 */
    --muted-foreground: 40 15% 55%;

    --card: 150 30% 12%;             /* #0d2618 */
    --card-foreground: 40 33% 92%;

    --popover: 150 35% 10%;
    --popover-foreground: 40 33% 92%;

    --border: 150 20% 18%;
    --input: 150 20% 18%;
    --ring: 43 53% 54%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --radius: 1rem;
  }
}

@layer base {
  * { @apply border-border; }

  html {
    scroll-behavior: smooth;
    @media (prefers-reduced-motion: reduce) { scroll-behavior: auto; }
  }

  body {
    @apply bg-background text-foreground;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
    line-height: 1.625;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Playfair Display", serif;
    text-wrap: balance;
    line-height: 1.15;
  }
}

@layer utilities {
  /* Glass */
  .glass {
    @apply bg-background/80 backdrop-blur-2xl border border-white/8 shadow-sm;
  }
  .glass-card {
    @apply bg-card/90 backdrop-blur-2xl border border-white/6 shadow-lg;
  }
  .glass-dark {
    background: rgba(7, 26, 14, 0.85);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Typography */
  .heading-hero {
    @apply font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight;
  }
  .heading-section {
    @apply font-serif text-3xl md:text-4xl lg:text-5xl font-bold;
  }

  /* Gradients */
  .text-gradient-gold {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, #c8a84b, #f0d060, #a07820);
  }
  .text-gradient-leaf {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, #4ade80, #16a34a);
  }
  .bg-gradient-harvest {
    background-image: linear-gradient(135deg, #c8a84b, #f0d060, #a07820);
  }

  /* Liquid blob morphing */
  .liquid-blob {
    border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
    animation: liquid-morph 8s ease-in-out infinite;
  }
  .liquid-blob-alt {
    border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%;
    animation: liquid-morph 8s ease-in-out infinite reverse;
  }

  /* Agri terrain grid */
  .terrain-grid {
    background-image:
      linear-gradient(rgba(74, 222, 128, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(74, 222, 128, 0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Card hover glow */
  .card-glow:hover {
    box-shadow: 0 0 0 1px rgba(200, 168, 75, 0.3), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,222,128,0.06);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #071a0e; }
  ::-webkit-scrollbar-thumb { background: #1e3d28; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #4ade80; }
}

@keyframes liquid-morph {
  0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; }
  25%       { border-radius: 40% 60% 50% 70% / 70% 40% 60% 30%; }
  50%       { border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%; }
  75%       { border-radius: 50% 50% 60% 40% / 30% 70% 50% 60%; }
}

@keyframes float-particle {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
  33%       { transform: translateY(-20px) translateX(10px); opacity: 1; }
  66%       { transform: translateY(-10px) translateX(-8px); opacity: 0.8; }
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(74,222,128,0.4); }
  50%       { box-shadow: 0 0 20px rgba(74,222,128,0.8), 0 0 40px rgba(74,222,128,0.3); }
}
```

- [ ] Commit
```bash
git add apps/web/src/index.css
git commit -m "feat: dark agri design tokens and liquid CSS animations"
```

---

### Task 3: AgriScene 3D WebGL component

**Files:**
- Create: `apps/web/src/components/AgriScene.jsx`
- Create: `apps/web/src/components/AgriSceneFallback.jsx`

- [ ] Create `apps/web/src/components/AgriScene.jsx`
```jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

function TerrainMesh() {
  const meshRef = useRef();
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 60, 60);
    const positions = geo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 1];
      positions[i + 2] = Math.sin(x * 0.5) * 0.4 + Math.cos(z * 0.4) * 0.3 + Math.sin(x * 0.2 + z * 0.3) * 0.6;
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -2.5, 0]}>
      <meshStandardMaterial
        color="#4ade80"
        wireframe
        transparent
        opacity={0.18}
        emissive="#16a34a"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function Particles() {
  const count = 120;
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10,
      ],
      scale: Math.random() * 0.06 + 0.02,
      speed: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <Instances>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={1} transparent opacity={0.7} />
      {positions.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={0.5} rotationIntensity={0}>
          <Instance position={p.pos} scale={p.scale} />
        </Float>
      ))}
    </Instances>
  );
}

function GoldParticles() {
  const count = 60;
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8,
      ],
      scale: Math.random() * 0.04 + 0.01,
      speed: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <Instances>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#c8a84b" emissive="#c8a84b" emissiveIntensity={1.2} transparent opacity={0.5} />
      {positions.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={0.8} rotationIntensity={0}>
          <Instance position={p.pos} scale={p.scale} />
        </Float>
      ))}
    </Instances>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#071a0e" />
      <directionalLight position={[5, 8, 3]} intensity={0.8} color="#c8a84b" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4ade80" />
      <Stars radius={80} depth={50} count={1500} factor={2} fade speed={0.5} />
      <TerrainMesh />
      <Particles />
      <GoldParticles />
    </>
  );
}

function AgriScene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 10], fov: 55 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      aria-hidden="true"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}

export default AgriScene;
```

- [ ] Create `apps/web/src/components/AgriSceneFallback.jsx`
```jsx
import React from 'react';

function AgriSceneFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2618] via-[#071a0e] to-[#071a0e]" />
      <div className="liquid-blob absolute w-[600px] h-[600px] bg-[#4ade80]/5 top-[-100px] right-[-100px]" />
      <div className="liquid-blob-alt absolute w-[400px] h-[400px] bg-[#c8a84b]/5 bottom-[-50px] left-[10%]" />
      <div className="terrain-grid absolute inset-0 opacity-60" />
    </div>
  );
}

export default AgriSceneFallback;
```

- [ ] Commit
```bash
git add apps/web/src/components/AgriScene.jsx apps/web/src/components/AgriSceneFallback.jsx
git commit -m "feat: Three.js WebGL agri terrain scene + CSS fallback"
```

---

### Task 4: Rewrite Header + Footer

**Files:**
- Modify: `apps/web/src/components/Header.jsx`
- Modify: `apps/web/src/components/Footer.jsx`

- [ ] Replace `apps/web/src/components/Header.jsx`
```jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { navLinks, ecosystemLinks } from '@/data/navigation.js';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > 100 && latest > previous);
    setScrolled(latest > 20);
  });

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  const allMobileLinks = [{ name: 'Home', path: '/' }, ...ecosystemLinks, ...navLinks.slice(1)];

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'glass-dark py-3 shadow-lg shadow-black/30' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-harvest flex items-center justify-center text-[#071a0e] font-serif font-black text-lg shadow-lg group-hover:scale-110 transition-transform">
              I
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold leading-tight tracking-tight text-[#f0ece4]">
                IGO Group
              </span>
              <span className="text-[10px] font-semibold tracking-[3px] uppercase text-[#4ade80] leading-none">
                of Companies
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/4 backdrop-blur-xl border border-white/8 p-1.5 rounded-full shadow-xl">
            <Link to="/" className={`relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${isActive('/') && location.pathname === '/' ? 'bg-white/10 text-[#f0ece4]' : 'text-[#f0ece4]/60 hover:text-[#f0ece4]'}`}>
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors outline-none ${(isActive('/brands') || isActive('/departments')) ? 'bg-white/10 text-[#f0ece4]' : 'text-[#f0ece4]/60 hover:text-[#f0ece4]'}`}>
                Ecosystem <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-4 rounded-2xl p-2 bg-[#0d2618]/95 backdrop-blur-xl border-white/8 shadow-2xl">
                {ecosystemLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild className="cursor-pointer p-4 rounded-xl focus:bg-white/5">
                    <Link to={link.path} className="flex flex-col gap-1">
                      <span className="font-semibold text-[#f0ece4] flex items-center justify-between">
                        {link.name} <ArrowRight className="w-4 h-4 opacity-40" />
                      </span>
                      <span className="text-xs text-[#f0ece4]/40">{link.desc}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navLinks.slice(1).map((link) => (
              <Link key={link.path} to={link.path} className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${isActive(link.path) ? 'bg-white/10 text-[#f0ece4]' : 'text-[#f0ece4]/60 hover:text-[#f0ece4]'}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button asChild className="rounded-full px-6 font-bold shadow-lg bg-gradient-harvest text-[#071a0e] hover:opacity-90 hover:scale-105 transition-all border-0">
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="rounded-full text-[#f0ece4] hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#0d2618]/98 backdrop-blur-2xl border-l border-white/8 p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-white/8 text-left">
                  <SheetTitle className="font-serif text-2xl text-[#f0ece4]">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Navigate through IGO Group</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="flex flex-col space-y-2">
                    {allMobileLinks.map((link, i) => (
                      <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                        <Link to={link.path} onClick={() => setIsOpen(false)} className={`block p-4 rounded-xl text-base font-semibold transition-colors ${isActive(link.path) ? 'bg-white/10 text-[#f0ece4]' : 'text-[#f0ece4]/60 hover:bg-white/5 hover:text-[#f0ece4]'}`}>
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                <div className="p-6 border-t border-white/8">
                  <Button asChild className="w-full h-14 text-base rounded-xl bg-gradient-harvest text-[#071a0e] font-bold border-0">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>Partner With Us</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
```

- [ ] Replace `apps/web/src/components/Footer.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ecosystemLinks, navLinks } from '@/data/navigation.js';

function Footer() {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#040f08] text-[#f0ece4] pt-24 pb-8 relative overflow-hidden border-t border-white/6">
      <div className="liquid-blob absolute w-[500px] h-[500px] bg-[#4ade80]/4 top-[-100px] right-[-100px] pointer-events-none" />
      <div className="liquid-blob-alt absolute w-[300px] h-[300px] bg-[#c8a84b]/4 bottom-[-50px] left-[-50px] pointer-events-none" />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/6 pb-16">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-harvest flex items-center justify-center text-[#071a0e] font-serif font-black text-lg">I</div>
              <div>
                <div className="text-xl font-serif font-bold text-[#f0ece4]">IGO Group</div>
                <div className="text-[10px] font-bold tracking-[3px] uppercase text-[#4ade80]">of Companies</div>
              </div>
            </Link>
            <p className="text-[#f0ece4]/50 leading-relaxed text-sm max-w-sm">
              26 brands. 18 departments. 32 core managers. Shaping sustainable agriculture and enterprise across India and global markets.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" aria-label={['LinkedIn', 'Twitter', 'Facebook', 'Instagram'][i]} className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center hover:bg-[#4ade80]/15 hover:border-[#4ade80]/30 hover:text-[#4ade80] transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-2">
            <h4 className="font-serif font-bold text-base mb-6 text-[#c8a84b]">Ecosystem</h4>
            <nav className="flex flex-col space-y-3">
              {[...ecosystemLinks, ...navLinks.slice(1)].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-[#f0ece4]/50 hover:text-[#4ade80] transition-colors">{item.name}</Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-3">
            <h4 className="font-serif font-bold text-base mb-6 text-[#c8a84b]">Headquarters</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span className="text-sm text-[#f0ece4]/50">IGO Corporate Block<br />Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#4ade80] shrink-0" />
                <span className="text-sm text-[#f0ece4]/50">+91 (044) 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#4ade80] shrink-0" />
                <span className="text-sm text-[#f0ece4]/50">contact@igogroup.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-3">
            <h4 className="font-serif font-bold text-base mb-6 text-[#c8a84b]">Stay Informed</h4>
            <p className="text-sm text-[#f0ece4]/50 mb-4">Updates from across our 26 brands.</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Input type="email" placeholder="Email Address" required
                  className="bg-white/4 border-white/8 text-[#f0ece4] placeholder:text-[#f0ece4]/30 h-12 pr-12 focus-visible:ring-[#c8a84b] rounded-xl" />
                <Button type="submit" size="icon" aria-label="Subscribe" className="absolute right-1 top-1 bottom-1 h-10 w-10 rounded-lg bg-gradient-harvest text-[#071a0e] border-0">
                  <ArrowUp className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <p className="text-sm text-[#f0ece4]/30">© {year} IGO Group of Companies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-sm text-[#f0ece4]/30 hover:text-[#f0ece4]/70 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-sm text-[#f0ece4]/30 hover:text-[#f0ece4]/70 transition-colors">Terms of Service</Link>
          </div>
          <Button variant="outline" size="icon" onClick={scrollToTop} aria-label="Scroll to top"
            className="absolute -top-16 right-0 rounded-full border-[#c8a84b]/30 text-[#c8a84b] hover:bg-[#c8a84b]/15 hover:border-[#c8a84b] shadow-lg backdrop-blur-sm">
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
```

- [ ] Commit
```bash
git add apps/web/src/components/Header.jsx apps/web/src/components/Footer.jsx
git commit -m "feat: dark agri header and footer with new design tokens"
```

---

### Task 5: Rewrite HomePage with 3D hero

**Files:**
- Modify: `apps/web/src/pages/HomePage.jsx`

- [ ] Replace entire `apps/web/src/pages/HomePage.jsx`
```jsx
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sprout, BarChart3, ShieldCheck, Globe, Zap, Leaf } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import AgriSceneFallback from '@/components/AgriSceneFallback.jsx';
import { brands } from '@/data/brands.js';
import { departments } from '@/data/departments.js';

const AgriScene = lazy(() => import('@/components/AgriScene.jsx'));

function useWebGLSupport() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setSupported(!!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch { setSupported(false); }
  }, []);
  return supported;
}

const bentoSectors = [
  { icon: Sprout, label: 'Core Agri', desc: 'Farm engineering, automation, and produce distribution.', accent: '#4ade80', span: 'md:col-span-2 md:row-span-2' },
  { icon: BarChart3, label: 'Finance & Realty', desc: 'Micro-finance, wealth management, and farmlands.', accent: '#c8a84b', span: '' },
  { icon: ShieldCheck, label: 'Health & Wellness', desc: 'Holistic healthcare, organic pharmacy, natural cosmetics.', accent: '#87ceeb', span: '' },
  { icon: Zap, label: 'Tech & Digital', desc: 'IoT, AI automation, and the India Green App ecosystem.', accent: '#a78bfa', span: '' },
  { icon: Globe, label: 'Trade & Export', desc: 'International exports, farm factories, global markets.', accent: '#fb923c', span: '' },
];

function HomePage() {
  const webglSupported = useWebGLSupport();
  const prefersReduced = useReducedMotion();
  const show3D = webglSupported && !prefersReduced;
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const stats = [
    { value: 26, suffix: '', label: 'Active Brands' },
    { value: 18, suffix: '', label: 'Departments' },
    { value: 32, suffix: '', label: 'Core Managers' },
    { value: 2000, suffix: '+', label: 'Global Staff' },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>IGO Group of Companies — Built on Land. Driven by Purpose.</title>
        <meta name="description" content="IGO Group is a premier agricultural conglomerate with 26 brands, 18 departments, and 32 core managers spanning agri, tech, retail, and sustainability." />
      </Helmet>
      <Header />

      <main className="flex-1 bg-[#071a0e]">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          {show3D ? (
            <Suspense fallback={<AgriSceneFallback />}>
              <AgriScene />
            </Suspense>
          ) : (
            <AgriSceneFallback />
          )}

          {/* Content overlay */}
          <motion.div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24" style={{ y: prefersReduced ? 0 : yHero, opacity: prefersReduced ? 1 : opacityHero }}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4ade80]/25 bg-[#4ade80]/8 text-[#86efac] text-xs font-bold tracking-[2px] uppercase mb-10 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" style={{ boxShadow: '0 0 10px #4ade80' }} />
                Premier Agricultural Conglomerate — Est. 2009
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="heading-hero text-[#f0ece4] mb-6 drop-shadow-2xl"
              >
                Built on Land.<br />
                <span className="text-gradient-gold">Driven by Purpose.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl text-[#f0ece4]/65 mb-14 max-w-3xl mx-auto leading-relaxed font-light"
              >
                26 brands across agriculture, technology, healthcare, finance, and sustainability — creating lasting global value from the ground up.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-gradient-harvest text-[#071a0e] font-bold border-0 shadow-xl hover:opacity-90 hover:-translate-y-1 transition-all">
                  <Link to="/brands">Explore Ecosystem <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/15 text-[#f0ece4] bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-xl hover:-translate-y-1 transition-all">
                  <Link to="/about"><Leaf className="mr-2 w-5 h-5 text-[#4ade80]" /> Our Vision</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f0ece4]/30">
            <span className="text-[10px] uppercase tracking-[4px] font-bold">Scroll</span>
            <div className="w-px h-12 bg-white/10 relative overflow-hidden">
              <motion.div animate={{ y: [0, 48, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-full h-1/2 bg-[#4ade80]/60 absolute top-0" />
            </div>
          </motion.div>
        </section>

        {/* ─── STATS ─── */}
        <section className="relative z-20 -mt-10 mx-4 sm:mx-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="container mx-auto glass-card rounded-3xl p-8 md:p-12 border-white/6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/6">
              {stats.map((s, i) => (
                <div key={i} className="px-4 text-center">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-2">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-xs font-bold text-[#f0ece4]/40 uppercase tracking-[3px]">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── BENTO SECTORS ─── */}
        <section className="py-32 relative overflow-hidden">
          <div className="liquid-blob absolute w-[600px] h-[600px] bg-[#4ade80]/4 top-0 right-0 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-4">Brand Ecosystem</p>
              <h2 className="heading-section text-[#f0ece4] mb-6">A Powerful Brand Ecosystem</h2>
              <p className="text-xl text-[#f0ece4]/50 font-light">From precision agritech to sustainable energy — our portfolio is engineered to build synergistic value.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
              {bentoSectors.map((sector, i) => {
                const Icon = sector.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`${sector.span} group relative rounded-3xl overflow-hidden border border-white/6 bg-[#0d2618] hover:border-white/12 transition-all duration-500 cursor-pointer card-glow p-8 flex flex-col justify-end`}
                  >
                    <div className="liquid-blob absolute w-[200px] h-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${sector.accent}15, transparent)`, top: '-50px', right: '-50px' }} />
                    <Icon className="w-10 h-10 mb-4 transition-transform duration-500 group-hover:-translate-y-1" style={{ color: sector.accent }} />
                    <h3 className="font-serif text-xl font-bold text-[#f0ece4] mb-2">{sector.label}</h3>
                    <p className="text-sm text-[#f0ece4]/45 leading-relaxed">{sector.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="rounded-full bg-gradient-harvest text-[#071a0e] font-bold border-0 shadow-xl px-8 hover:opacity-90 hover:-translate-y-1 transition-all">
                <Link to="/brands">View All 26 Brands <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── DEPARTMENTS STRIP ─── */}
        <section className="py-20 bg-[#0d2618] border-y border-white/6 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-3">Operational Core</p>
              <h2 className="heading-section text-[#f0ece4]">18 Departments</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((dept, i) => (
                <motion.div key={dept.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <Link to="/departments" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/4 border border-white/8 text-[#f0ece4]/60 text-sm font-medium hover:bg-[#4ade80]/10 hover:border-[#4ade80]/30 hover:text-[#4ade80] transition-all duration-300">
                    <span>{dept.icon}</span> {dept.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="rounded-full border-white/15 text-[#f0ece4]/60 hover:bg-white/5 hover:text-[#f0ece4]">
                <Link to="/departments">Explore All Departments <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="py-32 relative overflow-hidden">
          <div className="liquid-blob absolute w-[800px] h-[800px] bg-[#c8a84b]/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#c8a84b] mb-4">Partner With Us</p>
              <h2 className="heading-section text-[#f0ece4] mb-6">Ready to Grow Together?</h2>
              <p className="text-xl text-[#f0ece4]/50 mb-12 font-light">Franchise opportunities, investment partnerships, and strategic alliances available across all 26 brands.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="h-14 px-10 rounded-full bg-gradient-harvest text-[#071a0e] font-bold border-0 text-base shadow-xl hover:opacity-90 hover:-translate-y-1 transition-all">
                  <Link to="/contact">Get In Touch <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/15 text-[#f0ece4] bg-white/4 hover:bg-white/8 text-base">
                  <Link to="/brands">Browse Brands</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default HomePage;
```

- [ ] Commit
```bash
git add apps/web/src/pages/HomePage.jsx
git commit -m "feat: 3D WebGL hero homepage with dark agri theme and correct stats"
```

---

### Task 6: Rewrite BrandsPage (26 brands, dark theme)

**Files:**
- Modify: `apps/web/src/pages/BrandsPage.jsx`
- Modify: `apps/web/src/components/BrandCard.jsx`

- [ ] Replace `apps/web/src/components/BrandCard.jsx`
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function BrandCard({ brand, index, onOpenModal }) {
  const isUpcoming = brand.status === 'Upcoming';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.5) }}
      layout
    >
      <button
        onClick={() => onOpenModal(brand)}
        className="group w-full text-left relative rounded-2xl overflow-hidden border border-white/6 bg-[#0d2618] hover:border-[#c8a84b]/30 transition-all duration-400 p-6 flex flex-col gap-4 card-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a84b]"
        aria-label={`View details for ${brand.name}`}
      >
        <div className="liquid-blob absolute w-[200px] h-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.07), transparent)', top: '-60px', right: '-60px' }} />

        <div className="flex justify-between items-start">
          <span className="text-3xl">{brand.emoji}</span>
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full ${
            isUpcoming
              ? 'bg-[#c8a84b]/12 text-[#c8a84b] border border-[#c8a84b]/20'
              : 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? 'bg-[#c8a84b]' : 'bg-[#4ade80]'}`} />
            {brand.status}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#4ade80]/60 mb-1">{brand.category}</p>
          <h3 className="font-serif text-xl font-bold text-[#f0ece4] leading-tight group-hover:text-gradient-gold transition-all">
            {brand.name}
          </h3>
        </div>

        <p className="text-sm text-[#f0ece4]/45 leading-relaxed line-clamp-2 flex-1">{brand.description}</p>

        <div className="flex items-center text-xs font-bold text-[#c8a84b]/60 group-hover:text-[#c8a84b] transition-colors">
          View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </motion.div>
  );
}

export default BrandCard;
```

- [ ] Replace `apps/web/src/pages/BrandsPage.jsx`
```jsx
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BrandCard from '@/components/BrandCard.jsx';
import BrandModal from '@/components/BrandModal.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { brands, brandCategories } from '@/data/brands.js';

function BrandsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return brands.filter((b) => {
      const matchSearch = b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q);
      const matchCat = category === 'All' || b.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <PageTransition>
      <Helmet>
        <title>Brand Ecosystem — IGO Group</title>
        <meta name="description" content="Explore IGO Group's 26 premium brands across Core Agri, Retail, Tech, Finance, and Sustainability." />
      </Helmet>
      <Header />

      <main className="flex-1 bg-[#071a0e]">
        {/* Header */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div className="liquid-blob absolute w-[500px] h-[500px] bg-[#4ade80]/4 top-[-100px] right-[-100px] pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-4">Our Portfolio</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">Brand Ecosystem</h1>
              <p className="text-xl text-[#f0ece4]/50 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                26 ventures engineered to synergize across agriculture, technology, finance, and sustainability.
              </p>

              {/* Filters */}
              <div className="glass-dark rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-xl max-w-3xl mx-auto">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search brands..."
                  className="flex-1 h-12 bg-white/4 border-white/8 text-[#f0ece4] placeholder:text-[#f0ece4]/30 focus-visible:ring-[#c8a84b] rounded-xl"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {brandCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      category === cat
                        ? 'bg-[#c8a84b] text-[#071a0e]'
                        : 'bg-white/5 border border-white/8 text-[#f0ece4]/50 hover:bg-white/8 hover:text-[#f0ece4]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#f0ece4]/30">
                Showing <span className="text-[#4ade80]">{filtered.length}</span> of 26 brands
              </p>
            </div>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-[#0d2618] rounded-3xl border border-white/6 p-16 text-center max-w-xl mx-auto">
                  <AlertCircle className="h-12 w-12 text-[#f0ece4]/20 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-[#f0ece4] mb-3">No brands found</h3>
                  <p className="text-[#f0ece4]/40 mb-8">Try clearing your filters.</p>
                  <Button onClick={() => { setSearch(''); setCategory('All'); }} className="rounded-full bg-gradient-harvest text-[#071a0e] font-bold border-0">
                    Clear Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.map((brand, i) => (
                    <BrandCard key={brand.id} brand={brand} index={i} onOpenModal={setSelectedBrand} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
      <BrandModal brand={selectedBrand} isOpen={!!selectedBrand} onClose={() => setSelectedBrand(null)} />
    </PageTransition>
  );
}

export default BrandsPage;
```

- [ ] Commit
```bash
git add apps/web/src/pages/BrandsPage.jsx apps/web/src/components/BrandCard.jsx
git commit -m "feat: brands page dark agri theme, 26 brands, category filter pills"
```

---

### Task 7: Rewrite DepartmentsPage + TeamPage

**Files:**
- Modify: `apps/web/src/pages/DepartmentsPage.jsx`
- Modify: `apps/web/src/pages/TeamPage.jsx`

- [ ] Replace `apps/web/src/pages/DepartmentsPage.jsx`
```jsx
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { departments } from '@/data/departments.js';

function DeptCard({ dept, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 9) * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden group ${
          open ? 'border-[#4ade80]/30 bg-[#162d1e]' : 'border-white/6 bg-[#0d2618] hover:border-white/12'
        }`}
        aria-expanded={open}
      >
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors ${open ? 'bg-[#4ade80]/15' : 'bg-white/5 group-hover:bg-[#4ade80]/8'}`}>
              {dept.icon}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#4ade80]/50 mb-0.5">Dept {dept.id}</p>
              <h3 className="font-serif text-lg font-bold text-[#f0ece4] leading-tight">{dept.name}</h3>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-[#f0ece4]/30 transition-transform duration-300 shrink-0 ${open ? 'rotate-180 text-[#4ade80]' : ''}`} />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-white/6 pt-4 space-y-3">
                <p className="text-sm text-[#f0ece4]/55 leading-relaxed">{dept.focus}</p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-8 h-8 rounded-full bg-[#4ade80]/15 flex items-center justify-center text-[#4ade80] font-serif font-bold text-xs">
                    {dept.head.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#f0ece4]/30">Leadership</p>
                    <p className="text-sm font-semibold text-[#f0ece4]/70">{dept.head}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

function DepartmentsPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return departments.filter(d => d.name.toLowerCase().includes(q) || d.focus.toLowerCase().includes(q));
  }, [search]);

  return (
    <PageTransition>
      <Helmet>
        <title>Departments — IGO Group</title>
        <meta name="description" content="Explore IGO Group's 18 operational departments driving excellence across the conglomerate." />
      </Helmet>
      <Header />

      <main className="flex-1 bg-[#071a0e]">
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div className="liquid-blob absolute w-[500px] h-[500px] bg-[#4ade80]/4 top-[-100px] left-[-100px] pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-4">Operational Core</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">18 Departments</h1>
              <p className="text-xl text-[#f0ece4]/50 font-light mb-12 max-w-2xl mx-auto">
                Specialized operational centers working in seamless synergy to drive IGO Group's mission.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0ece4]/30" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search departments..."
                  className="pl-11 h-12 bg-white/4 border-white/8 text-[#f0ece4] placeholder:text-[#f0ece4]/30 focus-visible:ring-[#c8a84b] rounded-xl" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold text-[#f0ece4]/30 mb-8">
              Showing <span className="text-[#4ade80]">{filtered.length}</span> departments
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((dept, i) => <DeptCard key={dept.id} dept={dept} index={i} />)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default DepartmentsPage;
```

- [ ] Replace `apps/web/src/pages/TeamPage.jsx`
```jsx
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import { managers, managerDepartments } from '@/data/team.js';
import { Quote } from 'lucide-react';

function ManagerCard({ manager, index }) {
  const initials = manager.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const colors = ['#4ade80', '#c8a84b', '#87ceeb', '#a78bfa', '#fb923c', '#f472b6'];
  const color = colors[manager.id % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 9) * 0.05, duration: 0.5 }}
      className={`group relative rounded-2xl border border-white/6 bg-[#0d2618] hover:border-white/12 p-6 flex flex-col gap-4 transition-all duration-300 card-glow ${manager.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      <div className="liquid-blob absolute w-[150px] h-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}10, transparent)`, top: '-40px', right: '-40px' }} />

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-lg"
          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
          {initials}
        </div>
        {manager.featured && (
          <span className="text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-full bg-[#c8a84b]/15 text-[#c8a84b] border border-[#c8a84b]/25">
            Founder & CEO
          </span>
        )}
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-[#f0ece4] leading-tight mb-1">{manager.name}</h3>
        <p className="text-xs font-bold tracking-[1px] text-[#f0ece4]/40">{manager.title}</p>
      </div>

      <p className="text-sm text-[#f0ece4]/45 leading-relaxed line-clamp-2">{manager.bio}</p>

      <div className="mt-auto pt-2 border-t border-white/5">
        <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#4ade80]/50">{manager.department}</p>
      </div>
    </motion.div>
  );
}

function TeamPage() {
  const [deptFilter, setDeptFilter] = useState('All');
  const filtered = useMemo(() => {
    if (deptFilter === 'All') return managers;
    return managers.filter(m => m.department === deptFilter);
  }, [deptFilter]);

  return (
    <PageTransition>
      <Helmet>
        <title>Leadership Team — IGO Group</title>
        <meta name="description" content="Meet IGO Group's 32 core managers driving sustainable agriculture across 26 brands." />
      </Helmet>
      <Header />

      <main className="flex-1 bg-[#071a0e]">
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div className="liquid-blob absolute w-[500px] h-[500px] bg-[#c8a84b]/4 top-[-100px] right-[-100px] pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-4">Our People</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">32 Core Managers</h1>
              <p className="text-xl text-[#f0ece4]/50 font-light mb-12 max-w-2xl mx-auto">
                Decades of combined expertise, unified by one mission: sustainable agricultural enterprise.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {managerDepartments.slice(0, 8).map((dept) => (
                  <button key={dept} onClick={() => setDeptFilter(dept)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      deptFilter === dept ? 'bg-[#c8a84b] text-[#071a0e]' : 'bg-white/5 border border-white/8 text-[#f0ece4]/50 hover:bg-white/8 hover:text-[#f0ece4]'
                    }`}>
                    {dept}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold text-[#f0ece4]/30 mb-8">
              Showing <span className="text-[#4ade80]">{filtered.length}</span> of 32 managers
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((m, i) => <ManagerCard key={m.id} manager={m} index={i} />)}
            </div>
          </div>
        </section>

        {/* Quote section */}
        <section className="py-24 bg-[#0d2618] border-y border-white/6 relative overflow-hidden">
          <div className="liquid-blob absolute w-[600px] h-[600px] bg-[#4ade80]/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Quote className="w-10 h-10 text-[#4ade80]/30 mb-6" />
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#f0ece4] leading-tight mb-6">
                  "Great companies are not just built on solid ground, but by exceptional people."
                </p>
                <p className="text-sm font-semibold text-[#c8a84b]">— Dr. John Yesudhas, Founder & CEO</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 42, suffix: '%', label: 'Women in Leadership' },
                  { value: 2000, suffix: '+', label: 'Global Employees' },
                  { value: 32, suffix: '', label: 'Core Managers' },
                  { value: 12, suffix: '', label: 'Countries Represented' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/4 border border-white/6 p-6 rounded-2xl">
                    <div className="font-serif text-3xl font-bold text-gradient-gold mb-1">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="text-xs text-[#f0ece4]/40 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default TeamPage;
```

- [ ] Commit
```bash
git add apps/web/src/pages/DepartmentsPage.jsx apps/web/src/pages/TeamPage.jsx
git commit -m "feat: dark agri departments (18) and team page (32 managers)"
```

---

### Task 8: Rewrite AboutPage + fix App.jsx

**Files:**
- Modify: `apps/web/src/pages/AboutPage.jsx`
- Modify: `apps/web/src/App.jsx`

- [ ] Replace `apps/web/src/pages/AboutPage.jsx`
```jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageTransition from '@/components/PageTransition.jsx';
import { Target, Lightbulb, Compass, Heart, Leaf, Globe, Zap, Shield } from 'lucide-react';

const values = [
  { icon: Leaf, name: 'Sustainability First', desc: 'Environmental stewardship in all agricultural and tech operations for net-positive impact.', color: '#4ade80' },
  { icon: Lightbulb, name: 'Continuous Innovation', desc: 'Leveraging R&D and AI to revolutionize traditional sectors and maintain industry leadership.', color: '#c8a84b' },
  { icon: Shield, name: 'Ethical Leadership', desc: 'Absolute transparency, integrity, and respect for all stakeholders in every decision.', color: '#87ceeb' },
  { icon: Heart, name: 'Community Enrichment', desc: 'Building ecosystems that uplift local farmers, retail partners, and the global workforce.', color: '#f472b6' },
  { icon: Globe, name: 'Global Vision', desc: 'Expanding sustainable practices from Indian farmlands to international markets.', color: '#a78bfa' },
  { icon: Zap, name: 'Agri-Tech Fusion', desc: 'Merging traditional farming wisdom with cutting-edge technology and automation.', color: '#fb923c' },
];

const milestones = [
  { year: '2009', event: 'IGO Group founded with a singular vision for sustainable agriculture.' },
  { year: '2012', event: 'Launched IGO Agritech Farms — first brand under the conglomerate.' },
  { year: '2015', event: 'Expanded to 10 brands across Core Agri and Retail & Food sectors.' },
  { year: '2018', event: 'Launched Tech & Digital vertical including IGO Farm Automation.' },
  { year: '2021', event: 'Crossed 2,000 employees globally across 20+ brands.' },
  { year: '2024', event: 'Launched India Green App — central digital hub for the ecosystem.' },
  { year: '2025', event: '26 active and upcoming brands. 18 departments. 32 core managers.' },
];

function AboutPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>About IGO Group — Our Legacy & Vision</title>
        <meta name="description" content="15+ years of transforming sustainable agriculture. Learn about IGO Group's vision, mission, values and milestones." />
      </Helmet>
      <Header />

      <main className="flex-1 bg-[#071a0e]">
        {/* Hero */}
        <section className="pt-36 pb-24 relative overflow-hidden">
          <div className="terrain-grid absolute inset-0 opacity-40" />
          <div className="liquid-blob absolute w-[600px] h-[600px] bg-[#4ade80]/4 top-[-100px] right-[-100px] pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-4">Our Legacy</p>
              <h1 className="heading-hero text-[#f0ece4] mb-6">15+ Years of Purpose</h1>
              <p className="text-xl text-[#f0ece4]/50 font-light leading-relaxed max-w-2xl">
                From a single vision for sustainable agriculture to a conglomerate of 26 brands, IGO Group has redefined what enterprise-scale farming looks like.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision / Mission */}
        <section className="py-24 bg-[#0d2618] border-y border-white/6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-10 rounded-3xl border border-[#4ade80]/20 bg-[#4ade80]/5 relative overflow-hidden">
                <div className="liquid-blob absolute w-[200px] h-[200px] bg-[#4ade80]/8 top-[-50px] right-[-50px] pointer-events-none" />
                <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-4">Vision</p>
                <h2 className="font-serif text-2xl font-bold text-[#f0ece4] mb-4">World's Most Trusted Agri Conglomerate</h2>
                <p className="text-[#f0ece4]/55 leading-relaxed">To fundamentally alter how humanity interacts with land, technology, and commerce for a sustainable future.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="p-10 rounded-3xl border border-[#c8a84b]/20 bg-[#c8a84b]/5 relative overflow-hidden">
                <div className="liquid-blob absolute w-[200px] h-[200px] bg-[#c8a84b]/8 top-[-50px] right-[-50px] pointer-events-none" />
                <p className="text-xs font-bold tracking-[3px] uppercase text-[#c8a84b] mb-4">Mission</p>
                <h2 className="font-serif text-2xl font-bold text-[#f0ece4] mb-4">Empower Communities Through Technology</h2>
                <p className="text-[#f0ece4]/55 leading-relaxed">Engineer ecosystems that optimize resources through technology, delivering unparalleled value across 26 brands and sectors.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-3">What We Stand For</p>
              <h2 className="heading-section text-[#f0ece4]">Core Principles</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="group p-6 rounded-2xl border border-white/6 bg-[#0d2618] hover:border-white/12 transition-all duration-300 card-glow flex gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ background: `${val.color}14`, border: `1px solid ${val.color}25` }}>
                      <Icon className="w-6 h-6" style={{ color: val.color }} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#f0ece4] mb-2">{val.name}</h3>
                      <p className="text-sm text-[#f0ece4]/45 leading-relaxed">{val.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-[#0d2618] border-t border-white/6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-xs font-bold tracking-[3px] uppercase text-[#4ade80] mb-3">Our Journey</p>
              <h2 className="heading-section text-[#f0ece4]">Milestones</h2>
            </motion.div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-[60px] top-0 bottom-0 w-px bg-white/8" />
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex gap-8 mb-10 items-start">
                  <div className="w-[60px] shrink-0 text-right">
                    <span className="text-sm font-bold text-[#c8a84b]">{m.year}</span>
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#4ade80] shrink-0 mt-1.5 shadow-[0_0_10px_#4ade80]" />
                    <p className="text-[#f0ece4]/60 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}

export default AboutPage;
```

- [ ] Fix `apps/web/src/App.jsx` — add 404 page, fix import
```jsx
import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import BrandsPage from './pages/BrandsPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#071a0e] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <p className="text-8xl font-serif font-bold text-gradient-gold mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-[#f0ece4] mb-4">Page Not Found</h1>
        <p className="text-[#f0ece4]/50 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 rounded-full bg-gradient-harvest text-[#071a0e] font-bold text-sm hover:opacity-90 transition-opacity">
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-[100dvh] flex-col bg-[#071a0e] text-[#f0ece4] antialiased">
        <AnimatedRoutes />
      </div>
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-[#0d2618] text-[#f0ece4] border border-white/10 shadow-2xl rounded-2xl p-4',
        style: { backdropFilter: 'blur(16px)' }
      }} />
    </Router>
  );
}

export default App;
```

- [ ] Commit
```bash
git add apps/web/src/pages/AboutPage.jsx apps/web/src/App.jsx
git commit -m "feat: about page with timeline/values, 404 page, fix App.jsx"
```

---

### Task 9: Dev server verification

- [ ] Run dev server
```bash
cd apps/web && npm run dev
```
Expected: No errors, server starts on port 3000

- [ ] Check each route in browser:
  - `/` — 3D hero loads (or CSS fallback), stats show 26/18/32/2000+
  - `/brands` — 26 cards, category filter pills work, search filters
  - `/departments` — 18 accordion cards, search works
  - `/team` — 32 manager cards, department filter works
  - `/about` — values grid, milestone timeline
  - `/contact` — existing contact form page (unchanged)
  - `/nonexistent` — 404 page shows

- [ ] Final commit
```bash
git add -A
git commit -m "feat: IGO Group 3D agri redesign complete — dark theme, WebGL hero, 26 brands, 18 depts, 32 managers"
```
