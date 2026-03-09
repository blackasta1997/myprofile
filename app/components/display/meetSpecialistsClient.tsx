'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';

interface MeetSpecialistsClientProps {
  children: ReactNode;
}

export default function MeetSpecialistsClient({ children }: MeetSpecialistsClientProps) {
  const [isVisibleSpecialist, setIsVisibleSpecialist] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasAnimated.current) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const sectionTop = document.getElementById('specialists-section')?.offsetTop || 0;

        if (scrollPosition > sectionTop) {
          setIsVisibleSpecialist(true);
          hasAnimated.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="specialists-section" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisibleSpecialist ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-pulse-slow">
            MEET OUR CLINIC'S SPECIALIST<br />PHYSICIANS
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lumina Health: Your trusted partner for modern healthcare.<br />
            Schedule your visit today. Clinic hours: Call for details.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
