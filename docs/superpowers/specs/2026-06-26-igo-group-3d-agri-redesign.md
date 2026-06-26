# IGO Group — 3D Agri Design System Spec
**Date:** 2026-06-26  
**Status:** Approved  
**Theme:** Agri Dark — Three.js WebGL + CSS Liquid Glass  

---

## 1. Brand Identity & Color Tokens

### Semantic Palette
```
earth-950: #071a0e   (page background)
earth-900: #0d2618   (section background)
earth-800: #162d1e   (card background)
earth-700: #1e3d28   (elevated card)

leaf-400:  #4ade80   (primary accent — growth/active)
leaf-600:  #16a34a   (secondary green)
harvest-400: #c8a84b (gold — premium/highlight)
harvest-300: #f0d060 (gold light)
soil-700:  #7c3f00   (warm earth accent)
sky-300:   #87ceeb   (water/sky elements)
cream-50:  #f0ece4   (primary text)
```

### Gradient Definitions
- **harvest-gradient**: `linear-gradient(135deg, #c8a84b, #f0d060, #a07820)` — titles, CTAs
- **earth-gradient**: `linear-gradient(160deg, #071a0e 0%, #0d2618 40%, #162d1e 70%)` — hero bg
- **leaf-gradient**: `linear-gradient(135deg, #4ade80, #16a34a)` — active states

---

## 2. Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Hero/Display | Playfair Display | 64-80px | 800 |
| H2 Section | Playfair Display | 40-52px | 700 |
| H3 Card | Playfair Display | 24px | 600 |
| Body | DM Sans | 16-18px | 400 |
| Label/Cap | DM Sans | 11-12px | 700 |
| Mono/Data | JetBrains Mono | 13px | 400 |

---

## 3. 3D & Animation Architecture

### WebGL Hero (Three.js via @react-three/fiber)
- **Scene:** 3D terrain mesh (PlaneGeometry subdivided 80×80) with green wireframe
- **Particles:** 2000 floating leaf/firefly instances (Instances from drei)
- **Camera:** Slow orbit animation (azimuth: ±15°, polar: fixed)
- **Lighting:** AmbientLight(0x4ade80, 0.3) + DirectionalLight(0xc8a84b, 0.8)
- **Fallback:** `useReducedMotion()` + WebGL capability check → CSS parallax gradient

### CSS Liquid Glass Effects
- **Card hover:** `border-radius` morphs from `16px` to `30% 70% 60% 40% / 50% 30% 70% 60%` over 400ms
- **Blob dividers:** `filter: url(#goo)` SVG turbulence on section separators
- **Glass nav/modals:** `backdrop-filter: blur(24px)` + `bg-earth-950/85`

### Scroll Animations (Framer Motion)
- Section entries: `opacity: 0→1, y: 40→0`, staggered by 0.1s per child
- Hero text: `opacity: 0→1, y: 60→0` with spring easing
- Parallax layers: `useScroll` + `useTransform` for 3D depth illusion
- Counter: count-up when element enters viewport

---

## 4. Page Structure

### `/` Home
1. **3D WebGL Hero** — terrain mesh + particle field + title + 2 CTAs
2. **Floating Stats Bar** — 26 brands, 18 depts, 32 managers, 2000+ staff (animated counters)
3. **"About IGO" Section** — split layout: copy left, 3D rotating logo/globe right
4. **Brand Ecosystem Bento** — 4-category bento grid (Core Agri, Tech, Finance, Sustainability)
5. **Department Strip** — horizontal scroll of 18 department pills
6. **Leadership Teaser** — 3 featured manager cards
7. **CTA Banner** — "Partner With Us" with liquid blob background

### `/brands` Brands (26 brands)
- Hero header with category filter pills (7 categories)
- Search + sort controls
- Masonry/grid of brand cards (4-col desktop, 2-col tablet, 1-col mobile)
- Brand card: icon emoji, name, category badge, status dot, hover → liquid morph
- Modal: brand details, description, sector, status, contact link

### `/departments` Departments (18 departments)
- Visual org-chart hierarchy (3-tier: C-Suite → VPs → Departments)
- Expandable accordion cards per department
- Icons per department type
- "Reports to" relationship lines (SVG connectors)

### `/team` Team (32 core managers)
- Hero with "32 Core Managers" title
- Filter by department/role
- 3-col grid of executive cards
- Card: photo (placeholder), name, title, department, brief bio
- Featured card (CEO) spans 2 columns

### `/about` About
- Full-bleed parallax history timeline
- Values section (6 core values as 3D flip cards)
- Sustainability commitment section
- Milestones counter section

### `/contact` Contact
- Split layout: form left, contact info right
- Contact form with validation (react-hook-form + zod)
- Office locations
- Social links

---

## 5. Data Layer (src/data/)

All data extracted from page components into dedicated modules:
- `src/data/brands.js` — 26 brand entries (corrected from 27)
- `src/data/departments.js` — 18 department entries
- `src/data/team.js` — 32 core manager entries
- `src/data/navigation.js` — nav links, dropdown structure

---

## 6. New Dependencies

```
@react-three/fiber ^8.x
@react-three/drei ^9.x
three ^0.170.x
```

Remove unused: `react-resizable-panels`, `input-otp`, `react-day-picker`, `vaul`

---

## 7. Accessibility & Performance

- WebGL canvas has `aria-hidden="true"` + visible fallback
- All interactive elements have `aria-label`
- Dark theme only (no light mode for v2 — reduces complexity)
- Images: `loading="lazy"`, `width`/`height` to prevent CLS
- Code-split Three.js scene via `React.lazy()` + `Suspense`
- Target: Lighthouse Performance > 85, Accessibility > 95
