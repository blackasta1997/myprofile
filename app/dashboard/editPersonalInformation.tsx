'use client';
import { useEffect, useState } from 'react';

const EditPersonalInformation = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/personal-info');
        if (!res.ok) {
          throw new Error('Failed to fetch personal information');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;

  return (
    <form className="space-y-5">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-gray-500 mb-1.5">
            First Name <span className="text-red-400">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" placeholder="First name" value={data?.items[0]?.fields?.firstName || ''} onChange={() => {}} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-gray-500 mb-1.5">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" placeholder="Last name" value={data?.items[0]?.fields?.lastName || ''} onChange={() => {}} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>

      {/* Email and Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
          <input id="email" name="email" type="email" value={data?.items[0]?.fields?.email || ''} onChange={() => {}} placeholder="examples@gmail.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="mobileNumber" className="block text-xs font-medium text-gray-500 mb-1.5">
            Mobile Number <span className="text-red-400">*</span>
          </label>
          <input id="mobileNumber" name="mobileNumber" type="tel" value={data?.items[0]?.fields?.phone || ''} onChange={() => {}} placeholder="0806 123 7890" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Gender</label>
        <div className="flex gap-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" value="male" checked={data?.items[0]?.fields?.gender === 'male'} onChange={() => {}} className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" value="female" checked={data?.items[0]?.fields?.gender === 'female'} onChange={() => {}} className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">Female</span>
          </label>
        </div>
      </div>

      {/* Residential Address */}
      <div>
        <label htmlFor="residentialAddress" className="block text-xs font-medium text-gray-500 mb-1.5">
          Residential Address
        </label>
        <textarea id="residentialAddress" name="residentialAddress" rows={3} placeholder="Enter your address" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" />
      </div>
    </form>
  )
}

export default EditPersonalInformation
