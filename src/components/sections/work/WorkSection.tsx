"use client";

import { useEffect, useState, useRef } from 'react';

interface WorkSectionProps {
  className?: string;
}

const projects = [
  {
    title: "Project Alpha",
    category: "3D Experience",
    description: "Immersive brand experience with interactive 3D elements",
    image: "/api/placeholder/600/400"
  },
  {
    title: "Project Beta",
    category: "Web Design",
    description: "Modern portfolio website with smooth animations",
    image: "/api/placeholder/600/400"
  },
  {
    title: "Project Gamma",
    category: "Brand Identity",
    description: "Complete visual identity for tech startup",
    image: "/api/placeholder/600/400"
  },
  {
    title: "Project Delta",
    category: "Interactive",
    description: "Engaging user interface with micro-interactions",
    image: "/api/placeholder/600/400"
  }
];

export default function WorkSection({ className = '' }: WorkSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full min-h-screen flex items-center justify-center py-20 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-neuemetana text-white mb-16 text-center">
            Our Work
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center">
                    <span className="text-white/40 text-sm">Project Image</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-brand-purple text-sm font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-neuemetana text-white mb-2 group-hover:text-brand-purple transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

