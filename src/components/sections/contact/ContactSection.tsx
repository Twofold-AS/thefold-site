"use client";

import { useEffect, useState, useRef } from 'react';

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
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
      <div className="max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-neuemetana text-white mb-16 text-center">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-neuemetana text-white mb-6">
                Let&apos;s Create Something Amazing
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Ready to bring your vision to life? We&apos;d love to hear about your project 
                and discuss how we can help you create an unforgettable digital experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
                    <span className="text-brand-purple">📧</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/70">hello@thefold.agency</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center">
                    <span className="text-brand-blue">📱</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-purple focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-purple focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-brand-purple focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button className="w-full px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
