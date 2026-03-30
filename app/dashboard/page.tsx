'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChangeEvent, FormEvent } from 'react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  appointmentDate: string;
  reasonForVisit: string;
  additionalNotes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileImage, setProfileImage] = useState('/images/avatar-default.jpg');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Michael',
    lastName: 'Nelson',
    email: 'examples@gmail.com',
    mobileNumber: '0806 123 7890',
    gender: 'male',
    id: '1559 000 7788 8DER',
    taxIdNumber: 'examples@gmail.com',
    taxIdCountry: 'Nigeria',
    residentialAddress: 'Ib street orogun ibadan',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointmentsLoading(true);
      try {
        const response = await fetch('/api/appointment');
        if (response.ok) {
          const data = await response.json();
          const appointmentsList = Array.isArray(data) 
            ? data 
            : data.appointments || [];
          
          // Map appointments and add default status
          const mappedAppointments = appointmentsList.map((apt: any) => ({
            id: apt.id || Math.random().toString(),
            name: apt.name || 'Unknown',
            email: apt.email || '',
            phoneNumber: apt.phoneNumber || '',
            appointmentDate: apt.appointmentDate || '',
            reasonForVisit: apt.reasonForVisit || '',
            additionalNotes: apt.additionalNotes || '',
            status: 'scheduled' as const,
          }));
          
          setAppointments(mappedAppointments);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setProfileImage('/images/avatar-default.jpg');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'password', label: 'Password', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'verification', label: 'Verification', icon: '✓' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-48 flex-shrink-0">
            <nav className="space-y-2 bg-white rounded-lg shadow-sm p-4 sticky top-24 h-fit">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h2>
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-lg">
                        <Image src={profileImage} alt="Profile" width={96} height={96} className="w-full h-full object-cover"/>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h3>
                      <p className="text-gray-600 mt-1">{formData.email}</p>
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H17a2 2 0 012 2v2M3 5a2 2 0 002 2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 001.502.684l1.498-4.493a1 1 0 00.948-.684H17a2 2 0 012-2m0 5a2 2 0 012 2v3a2 2 0 11-4 0v-3a2 2 0 012-2zM9 9h6" />
                          </svg>
                          <span className="text-sm text-gray-700">{formData.mobileNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-gray-700 capitalize">{formData.gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total Appointments</p>
                        <p className="text-3xl font-bold text-blue-900 mt-2">{appointments.length}</p>
                      </div>
                      <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Completed</p>
                        <p className="text-3xl font-bold text-green-900 mt-2">
                          {appointments.filter(a => a.status === 'completed').length}
                        </p>
                      </div>
                      <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Scheduled</p>
                        <p className="text-3xl font-bold text-purple-900 mt-2">
                          {appointments.filter(a => a.status === 'scheduled').length}
                        </p>
                      </div>
                      <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase">ID</p>
                        <p className="text-sm text-gray-900 mt-1">{formData.id}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase">Email</p>
                        <p className="text-sm text-gray-900 mt-1">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase">Phone Number</p>
                        <p className="text-sm text-gray-900 mt-1">{formData.mobileNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Residential Address</h3>
                  <p className="text-sm text-gray-700">{formData.residentialAddress}</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Appointments</h3>
                  {appointmentsLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : appointments.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900">No appointments</h3>
                      <p className="text-gray-600 mt-1">You don't have any appointments scheduled yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6 hover:shadow-lg transition">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{appointment.name}</h3>
                              <p className="text-sm text-gray-600">{appointment.email}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                appointment.status === 'scheduled'
                                  ? 'bg-blue-200 text-blue-800'
                                  : appointment.status === 'completed'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm text-gray-700">
                                {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H17a2 2 0 012 2v2M3 5a2 2 0 002 2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 001.502.684l1.498-4.493a1 1 0 00.948-.684H17a2 2 0 012-2m0 5a2 2 0 012 2v3a2 2 0 11-4 0v-3a2 2 0 012-2zM9 9h6" />
                              </svg>
                              <span className="text-sm text-gray-700">{appointment.phoneNumber}</span>
                            </div>

                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm text-gray-700">{appointment.reasonForVisit}</span>
                            </div>
                          </div>

                          {appointment.additionalNotes && (
                            <div className="pt-4 border-t border-indigo-200">
                              <p className="text-xs font-medium text-gray-600 mb-1">Notes:</p>
                              <p className="text-sm text-gray-700 line-clamp-2">{appointment.additionalNotes}</p>
                            </div>
                          )}

                          <div className="flex gap-2 mt-4">
                            <button className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">Edit</button>
                            <button className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition">Cancel</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h2>
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 shadow-lg">
                        <Image src={profileImage} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-1 right-1 w-8 h-8 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer">
                        <span className="text-white text-sm">📷</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="inline-block">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <span className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg cursor-pointer transition inline-block">Upload New</span>
                      </label>
                      <button onClick={handleDeleteAvatar} className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition">
                        Delete avatar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Alert */}
                {message && (
                  <div
                    className={`flex items-center gap-2 p-4 rounded-lg text-sm mb-6 ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {message.type === 'success' ? (
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {message.text}
                  </div>
                )}

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"/>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"/>
                    </div>
                  </div>

                  {/* Email and Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="examples@gmail.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"/>
                    </div>

                    <div>
                      <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select className="px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          <option>🇳🇬</option>
                          <option>🇺🇸</option>
                          <option>🇬🇧</option>
                        </select>
                        <input id="mobileNumber" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleInputChange} placeholder="0806 123 7890" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"/>

                      </div>
                    </div>
                  </div>

                  {/* Gender and ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} className="w-4 h-4 border-gray-300 focus:ring-indigo-500" />
                          <span className="text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} className="w-4 h-4 border-gray-300 focus:ring-indigo-500" />
                          <span className="text-gray-700">Female</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                        ID
                      </label>
                      <input id="id" name="id" type="text" value={formData.id} onChange={handleInputChange} placeholder="1559 000 7788 8DER" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"/>
                    </div>
                  </div>

                  {/* Tax ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="taxIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Identification Number
                      </label>
                      <input id="taxIdNumber" name="taxIdNumber" type="text" value={formData.taxIdNumber} onChange={handleInputChange} placeholder="examples@gmail.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"/>
                    </div>

                    <div>
                      <label htmlFor="taxIdCountry" className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Identification Country
                      </label>
                      <div className="flex gap-2">
                        <select className="px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          <option>🇳🇬 Nigeria</option>
                          <option>🇺🇸 United States</option>
                          <option>🇬🇧 United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Residential Address */}
                  <div>
                    <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Residential Address
                    </label>
                    <textarea id="residentialAddress" name="residentialAddress" rows={4} value={formData.residentialAddress} onChange={handleInputChange} placeholder="Ib street orogun ibadan" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"/>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-start pt-6">
                    <button type="submit" disabled={isLoading} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:bg-indigo-400 disabled:cursor-not-allowed">
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {activeTab === 'password' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                <p className="text-gray-600 mt-2">Password management section coming soon</p>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <p className="text-gray-600 mt-2">Notification preferences coming soon</p>
              </div>
            )}

            {activeTab === 'verification' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900">Verification</h2>
                <p className="text-gray-600 mt-2">Account verification section coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
