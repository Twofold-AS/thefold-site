"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { StaggeredMenu } from "@/components";
import { Logo } from "../../public/assets";
import type { Application } from '@splinetool/runtime';

// Dynamically import SplineScene with no SSR
const SplineScene = dynamic(
  () => import('@/components/animations/SplineScene').then(mod => mod.SplineSceneNoSSR),
  { 
    ssr: false
  }
);

// Constants
const MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const SOCIAL_ITEMS = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

// Your Spline scene URL
const SPLINE_SCENE_URL = "https://prod.spline.design/g3eZIwebT0DBUFPT/scene.splinecode";

export default function Home() {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [showContent, setShowContent] = useState(false);

  // Handle Spline load
  const handleSplineLoad = (app: Application) => {
    console.log('✅ Spline scene loaded successfully');
    setSplineApp(app);
    setSceneReady(true);
    
    // Show content after scene loads
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  // Handle Spline error
  const handleSplineError = () => {
    console.error('❌ Failed to load Spline scene');
    // Show content anyway if Spline fails
    setShowContent(true);
  };

  // Animate title when ready
  useEffect(() => {
    if (showContent && titleRef.current) {
      titleRef.current.classList.add('opacity-100', 'translate-y-0');
      titleRef.current.classList.remove('opacity-0', 'translate-y-8');
    }
  }, [showContent]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      
      {/* Spline 3D Background - Positioned first, lowest z-index */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <SplineScene
          scene={SPLINE_SCENE_URL}
        />
      </div>

      {/* Hero Content */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
      </div>

      {/* Navigation - Highest z-index */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 100 }}
      >
        <div className="relative w-full h-full pointer-events-auto">
          <StaggeredMenu
            position="right"
            items={MENU_ITEMS}
            socialItems={SOCIAL_ITEMS}
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

      {/* Debug Info - Remove in production */}
      <div className="fixed bottom-4 left-4 text-white/50 text-xs" style={{ zIndex: 1000 }}>
        <p>Scene: {sceneReady ? '✅ Loaded' : '⏳ Loading...'}</p>
        <p>URL: {SPLINE_SCENE_URL.slice(0, 30)}...</p>
      </div>
    </main>
  );
}