import React from 'react'

const SmallFeature = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-2 gap-4 place-items-center grid-flow-row-dense">
            <div className="w-16 h-16 flex justify-center">
              <svg className="w-full h-full text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">FAMILY MEDICINE</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Family medicine & family to medicine.</p>
            </div>
          </div>

          {/* Preventive Care Card */}
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <div className="w-16 h-16 flex place-items-center justify-center">
              <svg className="w-full h-full text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m7.5-13A10.5 10.5 0 1112 2.25a10.5 10.5 0 017.5 9.75z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">PREVENTIVE CARE</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Preventive care when preventive care.</p>
            </div>
          </div>

          {/* Specialized Cardiology Card */}
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="w-16 h-16 flex place-items-center justify-center">
              <svg className="w-full h-full text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
