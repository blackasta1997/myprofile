'use client';

import { useState, FormEvent } from 'react';
import Header from '../components/Header';

export default function AppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setStepErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
        if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
        break;
      case 2:
        if (!formData.appointmentDate) errors.appointmentDate = 'Appointment date is required';
        if (!formData.preferredTime) errors.preferredTime = 'Preferred time is required';
        if (!formData.reasonForVisit) errors.reasonForVisit = 'Reason for visit is required';
        break;
      case 3:
        // Additional notes is optional, so no validation needed
        break;
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      setMessage(null);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    setMessage(null);

    try {
      console.log(formData);
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Appointment booked successfully!' });
        setFormData({ fullName: '', email: '', phoneNumber: '', appointmentDate: '', preferredTime: '', reasonForVisit: '', additionalNotes: '', contactMethod: 'phone' });
        setCurrentStep(1);
      } else {
        setMessage({ type: 'error', text: data.error || 'Booking failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to book appointment. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            
            {/* Full Name */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="flex-1 px-3 py-2.5 text-sm focus:outline-none"/>
              </div>
              {stepErrors.fullName && <p className="text-red-500 text-xs mt-1">{stepErrors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="flex-1 px-3 py-2.5 text-sm focus:outline-none"/>
              </div>
              {stepErrors.email && <p className="text-red-500 text-xs mt-1">{stepErrors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 (123) 456-7890" className="flex-1 px-3 py-2.5 text-sm focus:outline-none"/>
              </div>
              {stepErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{stepErrors.phoneNumber}</p>}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>
            
            {/* Appointment Date */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="flex-1 px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer"/>
              </div>
              {stepErrors.appointmentDate && <p className="text-red-500 text-xs mt-1">{stepErrors.appointmentDate}</p>}
            </div>

            {/* Preferred Time */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="flex-1 px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer bg-transparent">
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
              {stepErrors.preferredTime && <p className="text-red-500 text-xs mt-1">{stepErrors.preferredTime}</p>}
            </div>

            {/* Reason for Visit */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="bg-blue-50 px-3 py-2.5 border-r border-gray-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>
                <select name="reasonForVisit" value={formData.reasonForVisit} onChange={handleChange} className="flex-1 px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer bg-transparent">
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
              {stepErrors.reasonForVisit && <p className="text-red-500 text-xs mt-1">{stepErrors.reasonForVisit}</p>}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            
            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Enter any additional information or special requests..." rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"/>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Contact Method</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="contactMethod" value="phone" checked={formData.contactMethod === 'phone'} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                  <span className="text-sm text-gray-600">Phone</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="contactMethod" value="email" checked={formData.contactMethod === 'email'} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                  <span className="text-sm text-gray-600">Email</span>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Appointment</h3>
            
            {/* Summary Cards */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {/* Personal Info Summary */}
              <div className="border-b border-gray-200 pb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Personal Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phoneNumber}</p>
                </div>
              </div>
              
              {/* Appointment Info Summary */}
              <div className="border-b border-gray-200 pb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Appointment Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Date:</span> {formData.appointmentDate}</p>
                  <p><span className="font-medium">Time:</span> {formData.preferredTime}</p>
                  <p><span className="font-medium">Reason:</span> {formData.reasonForVisit}</p>
                </div>
              </div>
              
              {/* Additional Info Summary */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Additional Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Contact Method:</span> {formData.contactMethod}</p>
                  {formData.additionalNotes && (
                    <p><span className="font-medium">Notes:</span> {formData.additionalNotes}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                Please review your information above. Click <strong>Confirm Booking</strong> to submit your appointment request.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 pt-24">
  

        <div className="w-full max-w-lg relative">
          <div className="bg-white rounded-3xl shadow-xl p-8 relative border border-blue-100">
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-blue-900">Appointment</h1>
                <span className="text-sm font-semibold text-gray-600">Step {currentStep} of {totalSteps}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
              </div>

              {/* Step Dots */}
              <div className="flex justify-between mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-all ${
                      step < currentStep
                        ? 'bg-green-500 text-white'
                        : step === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? '✓' : step}
                  </div>
                ))}
              </div>
            </div>

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

            {/* Step Content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <button type="button" onClick={handlePrev} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-full transition-all duration-200">Previous</button>
                )}
                
                {currentStep < totalSteps ? (
                  <button type="button" onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">Next</button>
                ) : (
                  <button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Confirming...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
