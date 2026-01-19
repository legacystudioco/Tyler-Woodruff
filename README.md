# Tyler Woodruff — Portfolio

## Workflow: Image-First Development

This project follows an **image-first, art-directed** workflow. Every section is built to match a provided screenshot exactly.

### Process

1. **Screenshot First** — Receive a screenshot of the section to build.
2. **Numbered Elements** — Elements in the screenshot are numbered for reference.
3. **Animation Symbols** — Annotations indicate animation behavior:
   - `*` — Fade in
   - `#` — Scroll-triggered animation
   - `!` — Interactive/hover animation
4. **Pixel-Perfect** — Code must match the screenshot exactly. No creative interpretation.

### Section Registry

Sections are built one at a time and registered in `src/lib/register-sections.ts`. This allows incremental development without refactoring.

```typescript
// Example: Adding a new section
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionRegistry } from "./section-registry";

SectionRegistry.register({
  id: "hero",
  order: 0,
  component: HeroSection,
});
```

### Folder Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (renders Page component)
├── components/
│   ├── sections/           # Portfolio sections (Hero, About, Work, etc.)
│   ├── ui/                 # Reusable UI components
│   └── Page.tsx            # Composes all registered sections
├── lib/
│   ├── section-registry.ts # Section registration system
│   └── register-sections.ts # Section imports and registration
└── styles/
    └── globals.css         # Global styles and CSS variables

public/
└── assets/                 # Images and static assets (do not rename)
```

### Design Tokens

CSS variables are defined in `src/styles/globals.css`:

- `--background` — Page background color
- `--foreground` — Primary text color
- `--muted` — Secondary/muted text color
- `--border` — Border color

These are mapped to Tailwind classes: `bg-background`, `text-foreground`, `text-muted`, `border-border`.

### Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (ready, not yet implemented)

### Commands

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Desktop-First

All sections are designed desktop-first. Responsive breakpoints will be added as needed per section.
