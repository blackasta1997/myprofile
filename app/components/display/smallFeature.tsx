'use client'

import React, { useEffect, useRef, useState } from 'react'

const SmallFeature = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`grid grid-flow-col auto-col-max transition-all duration-700 transform ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' }`}>
            <div className=" w-16 h-16 left-0">
              <svg fill="#155dfc" width="64" height="64" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" version="1.1" transform="scale(-1 1)">
                <path d="M1.52 0.64a0.239 0.239 0 0 0 -0.08 0.465v0.135a0.36 0.36 0 0 1 -0.72 0V1.193a0.48 0.48 0 0 0 0.4 -0.473V0.24a0.08 0.08 0 0 0 -0.08 -0.08h-0.16a0.08 0.08 0 0 0 0 0.16h0.08v0.4a0.32 0.32 0 0 1 -0.64 0V0.32h0.08a0.08 0.08 0 0 0 0 -0.16H0.24a0.08 0.08 0 0 0 -0.08 0.08v0.48A0.48 0.48 0 0 0 0.56 1.193v0.047a0.52 0.52 0 0 0 1.04 0v-0.135A0.239 0.239 0 0 0 1.52 0.64m0 0.32a0.08 0.08 0 1 1 0.08 -0.08 0.08 0.08 0 0 1 -0.08 0.08" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900">FAMILY MEDICINE</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Family medicine & family to medicine.</p>
            </div>
          </div>
          <div className={`grid grid-flow-col auto-col-max transition-all duration-700 transform delay-150 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' }`}>
            <div className="w-16 h-16 flex justify-center">
              <svg fill="#155dfc" width="64px" height="64px" viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24">
                <path d="M1.568 0.288c-0.016 -0.016 -0.04 -0.024 -0.064 -0.016 -0.176 0.04 -0.352 0 -0.496 -0.104 -0.024 -0.016 -0.064 -0.016 -0.088 0 -0.152 0.104 -0.328 0.144 -0.504 0.104 -0.04 -0.008 -0.088 0.024 -0.096 0.064v0.616c0 0.232 0.112 0.448 0.304 0.584l0.296 0.208c0.024 0.016 0.064 0.016 0.096 0l0.296 -0.208c0.192 -0.136 0.304 -0.352 0.304 -0.584V0.352c-0.016 -0.024 -0.024 -0.048 -0.048 -0.064M1.12 1.04h-0.08v0.08c0 0.048 -0.032 0.08 -0.08 0.08s-0.08 -0.032 -0.08 -0.08v-0.08h-0.08c-0.048 0 -0.08 -0.032 -0.08 -0.08s0.032 -0.08 0.08 -0.08h0.08v-0.08c0 -0.048 0.032 -0.08 0.08 -0.08s0.08 0.032 0.08 0.08v0.08h0.08c0.048 0 0.08 0.032 0.08 0.08s-0.032 0.08 -0.08 0.08" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">PREVENTIVE CARE</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Preventive care when preventive care.</p>
            </div>
          </div>
          <div className={`grid grid-flow-col auto-col-max transition-all duration-700 transform delay-300 ${ isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' }`}>
            <div className="w-16 h-16 flex justify-center">
              <svg fill="#155dfc" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 1.6 1.6" enableBackground="new 0 0 20 20">
                <path d="M1.52 0.56c-0.048 0 -0.08 -0.032 -0.08 -0.08 0 -0.176 -0.144 -0.32 -0.32 -0.32 -0.104 0 -0.192 0.048 -0.256 0.128 -0.032 0.04 -0.096 0.04 -0.128 0C0.672 0.208 0.584 0.16 0.48 0.16 0.304 0.16 0.16 0.304 0.16 0.48c0 0.048 -0.032 0.08 -0.08 0.08s-0.08 -0.032 -0.08 -0.08c0 -0.264 0.216 -0.48 0.48 -0.48 0.12 0 0.232 0.048 0.32 0.12C0.888 0.04 1 0 1.12 0c0.264 0 0.48 0.216 0.48 0.48 0 0.048 -0.032 0.08 -0.08 0.08" />
                <path d="M0.744 1.576c-0.008 -0.008 -0.256 -0.224 -0.456 -0.488 -0.024 -0.032 -0.024 -0.088 0.016 -0.112 0.032 -0.024 0.088 -0.024 0.112 0.016C0.56 1.176 0.72 1.336 0.8 1.416c0.08 -0.08 0.248 -0.24 0.392 -0.424 0.024 -0.032 0.08 -0.04 0.112 -0.016s0.04 0.08 0.016 0.112c-0.208 0.264 -0.448 0.48 -0.464 0.488 -0.032 0.032 -0.08 0.032 -0.112 0" />
                <path d="M0.88 1.12q-0.048 0 -0.072 -0.048L0.632 0.72l-0.08 0.128c-0.024 0.016 -0.048 0.032 -0.072 0.032H0.08c-0.048 0 -0.08 -0.032 -0.08 -0.08s0.032 -0.08 0.08 -0.08h0.36l0.136 -0.208c0.016 -0.024 0.04 -0.032 0.072 -0.032s0.056 0.016 0.064 0.048l0.176 0.36 0.08 -0.128c0.024 -0.024 0.048 -0.04 0.072 -0.04h0.48c0.048 0 0.08 0.032 0.08 0.08s-0.032 0.08 -0.08 0.08h-0.44l-0.136 0.208c-0.016 0.016 -0.04 0.032 -0.064 0.032" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">SPECIALIZED CARDIOLOGY</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Specialized cardiology to cardiology.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmallFeature
