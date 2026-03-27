'use client';

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: normalizedPassword }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      if (result.items?.length > 0) {
        // Cookie is now set server-side by the login API response
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess();
          onClose();
        }, 1000);
      } else {
        setError('Email or password does not match our records.');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" aria-label="Close">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1"> Email Address </label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium"> Forgot password? </a>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200" >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-600 font-semibold"> Sign up </a>
          </div>
        </div>
      </div>
    </>
  );
}
