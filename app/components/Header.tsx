'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚕️</span>
            <span className="text-xl font-bold text-gray-900">Lumina Health</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-gray-900">Log in</a>
            <a href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"> Get started </a>
          </div>
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
