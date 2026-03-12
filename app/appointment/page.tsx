'use client';

import { useState, FormEvent } from 'react';
import Header from '../components/Header';

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    appointmentDate: '',
    preferredTime: '',
    reasonForVisit: '',
    additionalNotes: '',
    contactMethod: 'phone',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage({ type: 'success', text: 'Appointment booked successfully!' });
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        appointmentDate: '',
        preferredTime: '',
        reasonForVisit: '',
        additionalNotes: '',
        contactMethod: 'phone',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to book appointment. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 pt-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-blue-200 opacity-30">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 text-blue-200 opacity-30">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-20 text-blue-200 opacity-20">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>

      <div className="w-full max-w-lg relative">
        <div className="bg-white rounded-3xl shadow-xl p-8 relative border border-blue-100">
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="14" width="40" height="36" rx="4" fill="#3B82F6" />
                  <rect x="8" y="14" width="40" height="10" fill="#1E40AF" />
                  <rect x="16" y="10" width="4" height="10" rx="2" fill="#64748B" />
                  <rect x="36" y="10" width="4" height="10" rx="2" fill="#64748B" />
                  <rect x="14" y="30" width="6" height="6" rx="1" fill="#DBEAFE" />
                  <rect x="24" y="30" width="6" height="6" rx="1" fill="#DBEAFE" />
                  <rect x="34" y="30" width="6" height="6" rx="1" fill="#DBEAFE" />
                  <rect x="14" y="40" width="6" height="6" rx="1" fill="#DBEAFE" />
                  <rect x="24" y="40" width="6" height="6" rx="1" fill="#10B981" />
                  <path d="M25 43L27 45L31 41" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="34" y="40" width="6" height="6" rx="1" fill="#DBEAFE" />
                </svg>
                <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-1 shadow-md border border-gray-200">
                  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" fill="#EF4444" />
                    <circle cx="16" cy="16" r="11" fill="white" />
                    <path d="M16 8V16L20 20" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="16" cy="16" r="1.5" fill="#1F2937" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-blue-900 text-center mb-1">Appointment Form</h1>
          <h2 className="text-lg font-semibold text-blue-700 text-center mb-2">Schedule Your Appointment</h2>
          <p className="text-gray-500 text-center text-sm mb-6">Please fill out the form below to book your appointment.</p>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Information</h3>
              <div className="space-y-3">
                {/* Full Name */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Full Name</span>
                    </div>
                  </div>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="flex-1 px-3 py-2.5 text-sm focus:outline-none" required/>
                </div>

                {/* Email Address */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Email Address</span>
                    </div>
                  </div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="flex-1 px-3 py-2.5 text-sm focus:outline-none" required/>
                </div>

                {/* Phone Number */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Phone Number</span>
                    </div>
                  </div>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 (123) 456-7890" className="flex-1 px-3 py-2.5 text-sm focus:outline-none" required/>
                </div>
              </div>
            </div>

            {/* Appointment Details Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Appointment Details</h3>
              <div className="space-y-3">
                {/* Appointment Date */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Appointment Date</span>
                    </div>
                  </div>
                  <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="flex-1 px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer" required/>
                </div>

                {/* Preferred Time */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Preferred Time</span>
                    </div>
                  </div>
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="flex-1 px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer bg-transparent" required>
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>

                {/* Reason for Visit */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-700 whitespace-nowrap">Reason for Visit</span>
                    </div>
                  </div>
                  <select name="reasonForVisit" value={formData.reasonForVisit} onChange={handleChange} className="flex-1 px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer bg-transparent" required>
                    <option value="">Select a reason</option>
                    <option value="consultation">General Consultation</option>
                    <option value="checkup">Regular Check-up</option>
                    <option value="followup">Follow-up Visit</option>
                    <option value="specialist">Specialist Referral</option>
                    <option value="emergency">Urgent Care</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Additional Notes Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Additional Notes</h3>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Enter any additional information or requests..." rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"/>
            </div>

            {/* Preferred Contact Method */}
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-700">Preferred Contact Method:</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="contactMethod" value="phone" checked={formData.contactMethod === 'phone'} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                <span className="text-sm text-gray-600">Phone</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="contactMethod" value="email" checked={formData.contactMethod === 'email'} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                <span className="text-sm text-gray-600">Email</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Booking...
                </span>
              ) : (
                'Book Appointment'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
