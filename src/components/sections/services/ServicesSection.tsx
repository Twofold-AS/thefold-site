"use client";

import { useEffect, useState, useRef } from 'react';

interface ServicesSectionProps {
  className?: string;
}

const services = [
  {
    title: "3D Web Experiences",
    description: "Immersive 3D environments that bring your brand to life",
    icon: "🎨"
  },
  {
    title: "Interactive Design",
    description: "Engaging user interfaces that captivate and convert",
    icon: "⚡"
  },
  {
    title: "Brand Identity",
    description: "Complete visual identity systems that tell your story",
    icon: "🎯"
  },
  {
    title: "Digital Strategy",
    description: "Data-driven approaches to digital transformation",
    icon: "📊"
  }
];

export default function ServicesSection({ className = '' }: ServicesSectionProps) {
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
            Our Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-neuemetana text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

