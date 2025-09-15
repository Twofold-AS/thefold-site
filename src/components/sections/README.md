# Sections Structure

This directory contains all the main sections of the website, organized for better maintainability and reusability.

## Structure

```
sections/
├── hero/
│   └── HeroSection.tsx          # Main hero section with title and tagline
├── about/
│   └── AboutSection.tsx         # About us section with company info
├── services/
│   └── ServicesSection.tsx      # Services showcase with cards
├── work/
│   └── WorkSection.tsx          # Portfolio/projects showcase
├── contact/
│   └── ContactSection.tsx       # Contact form and information
├── footer/
│   └── (empty - to be created)
└── index.ts                     # Exports all sections
```

## Usage

### Import individual sections:
```tsx
import { HeroSection, AboutSection } from '@/components/sections';
```

### Use in your page:
```tsx
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
```

## Features

- **Intersection Observer**: All sections use intersection observer for scroll-triggered animations
- **Responsive Design**: All sections are mobile-first and responsive
- **Consistent Styling**: Uses the same design system and brand colors
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Performance**: Optimized with proper loading states and animations

## Customization

Each section accepts a `className` prop for additional styling:

```tsx
<HeroSection className="custom-hero-styles" />
```

## Animation System

Sections use a consistent animation system:
- Fade in from bottom on scroll
- Staggered animations for child elements
- Smooth transitions with proper timing
- Respects user's motion preferences

## Brand Colors

Sections use the following brand colors defined in `tailwind.config.ts`:
- `brand-purple`: #B19EEF
- `brand-blue`: #5227FF
- `brand-accent`: #ff6b6b
- `brand-dark`: #0c505e

## Fonts

Sections use the following custom fonts:
- `font-graffity`: For main headings and brand text
- `font-neuemetana`: For section titles and important text
- `font-sans`: For body text and descriptions

