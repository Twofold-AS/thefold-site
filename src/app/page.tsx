"use client";
import { LiquidChrome, GrainOverlay, StaggeredMenu, Balatro } from "@/components";
import { useEffect, useRef } from "react";
import { Logo } from "@/assets";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Home() {

  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      console.log("Font applied:", window.getComputedStyle(ref.current).fontFamily);
    }
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="sm-scope fixed inset-0 z-[9999] overflow-hidden">
        <div className="relative w-full h-full">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={false}
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={true}
            colors={['#B19EEF', '#5227FF']}
            logo={<Logo />}
            logoUrl=""
            accentColor="#ff6b6b"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>
      </div>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
{/*           <LiquidChrome
            baseColor={[0.1, 0.1, 0.1]}
            speed={0.1}
            amplitude={0.6}
            interactive={true}
          /> */}
          <Balatro
  isRotate={false}
  mouseInteraction={false}
  pixelFilter={2000}
  color1={"#0c505e"}
/>
        </div>

        {/* Grain overlay (on top of Liquid, still behind content) */}
        <GrainOverlay className="z-1" grainOpacity={0.1} grainChaos={0.1} />

        {/* Foreground */}
        <div className="relative z-1 flex items-center justify-center h-full">
          <h1 ref={ref} className="text-4xl font-graffity text-white">TWOFOLD</h1>
        </div></section>
    </main>
  );
}
