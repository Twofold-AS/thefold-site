"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import { StaggeredMenu } from "@/components/navigation/StaggeredMenu";
import Logo from "@/components/ui/Logo";
import type { Application } from '@splinetool/runtime';

// Dynamically import SplineScene with no SSR
const SplineScene = dynamic(
  () => import('@/components/animations/SplineScene').then(mod => mod.SplineSceneNoSSR),
  { 
    ssr: false,
    loading: () => <LoadingScreen />
  }
);

// Loading component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />
        </div>
        <p className="text-white/40 text-sm font-light tracking-widest uppercase">Loading Experience</p>
      </div>
    </div>
  );
}

// Constants
const MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Work', ariaLabel: 'See our work', link: '/work' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const SOCIAL_ITEMS = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Behance', link: 'https://behance.net' }
];

// Your Spline scene URL
const SPLINE_SCENE_URL = "https://prod.spline.design/g3eZIwebT0DBUFPT/scene.splinecode";

export default function Home() {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
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

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      
      {/* Spline 3D Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <SplineScene
          scene={SPLINE_SCENE_URL}
          onLoad={handleSplineLoad}
          showLoader={true}
        />
      </div>

      {/* Hero Content - Can add your main content here */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        {showContent && (
          <div className="text-center animate-fade-in-up">
            {/* Add your hero content here if needed */}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="relative w-full h-full pointer-events-auto">
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
        <div className="fixed bottom-4 left-4 text-white/50 text-xs z-[100]">
          <p>Scene: {sceneReady ? '✅ Loaded' : '⏳ Loading...'}</p>
        </div>
      )}
    </main>
  );
}