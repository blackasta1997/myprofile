'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AppointmentCTA() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className={`text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            READY TO TAKE THE NEXT STEP?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Book your appointment today and let our specialists provide the personalized care you deserve.
            <br />
            Your health journey starts here.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-700 delay-150 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-flow-col auto-col-max">
            <div className="w-16 h-16 flex items-center justify-center">
              <svg fill="#155dfc" width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h5v5H7v-5z"/>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">EASY SCHEDULING</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Book online in under 2 minutes.</p>
            </div>
          </div>
          <div className={`grid grid-flow-col auto-col-max transition-all duration-700 delay-150 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-16 h-16 flex items-center justify-center">
              <svg fill="#155dfc" width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">EXPERT SPECIALISTS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Certified physicians at your service.</p>
            </div>
          </div>
          <div className={`grid grid-flow-col auto-col-max transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-16 h-16 flex items-center justify-center">
              <svg fill="#155dfc" width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">PERSONALIZED CARE</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Tailored treatment plans for you.</p>
            </div>
          </div>
        </div>

        <div className={`text-center transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => router.push('/appointment')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg uppercase text-sm tracking-wider"
          >
            SCHEDULE APPOINTMENT
          </button>
        </div>
      </div>
    </section>
  );
}
