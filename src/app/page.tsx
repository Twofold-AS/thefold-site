"use client";

import { useState } from "react";
import { StaggeredMenu } from "@/components/navigation/StaggeredMenu";
import Logo from "@/components/ui/Logo";
import LoadingOverlay from "@/components/overlays/LoadingOverlay";
import Silk from "@/components/animations/Silk";
import { 
  HeroSection, 
  BentoGrid, 
  ServicesSection, 
  WorkSection, 
  ContactSection 
} from "@/components/sections";

// Constants
const MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
  { label: 'Services', ariaLabel: 'View our services', link: '#services' },
  { label: 'Work', ariaLabel: 'See our work', link: '#work' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const SOCIAL_ITEMS = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Behance', link: 'https://behance.net' }
];

export default function Home() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Handle loading overlay completion
  const handleLoadingComplete = () => {
    setIsFirstLoad(false);
  };

  return (
    <>
      {/* First Load Overlay */}
      {isFirstLoad && (
        <LoadingOverlay onComplete={handleLoadingComplete} duration={2500} />
      )}

      <main className="relative w-screen min-h-screen overflow-hidden">
        {/* Hero Section with Waves Background */}
        <section id="home" className="relative">
          <div className="absolute inset-0 w-full h-full z-0 bg-black">
            <Silk
              speed={5}
              scale={1}
              color="#7B7481"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>
          <div className="relative z-10">
            <HeroSection />
          </div>
        </section>

        {/* Bento Grid Section */}
        <section id="bento" className="relative">
          <div className="relative z-10">
            <BentoGrid />
          </div>
        </section>

        {/* Navigation - Fixed positioning with proper z-index */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="relative w-full h-full">
            <StaggeredMenu
              position="right"
              items={MENU_ITEMS}
              socialItems={SOCIAL_ITEMS}
              displaySocials={true}
              displayItemNumbering={false}
              menuButtonColor="#fff"
              openMenuButtonColor="#000"
              changeMenuColorOnOpen={true}
              colors={['#B19EEF', '#5227FF']}
              logo={<Logo />}
              accentColor="#5227FF"
              onMenuOpen={() => console.log('Menu opened')}
              onMenuClose={() => console.log('Menu closed')}
            />
          </div>
        </div>

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 text-white/50 text-xs z-[100] pointer-events-none">
            <p>Waves Background: ✅ Active</p>
          </div>
        )}
      </main>
    </>
  );
}