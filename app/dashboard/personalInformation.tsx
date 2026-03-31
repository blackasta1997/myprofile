'use client';
import { useEffect, useState } from 'react';

const PersonalInformation = () => {
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
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold text-gray-900">{data.items[0].fields.firstName} {data.items[0].fields.lastName}</h3>
      <p className="text-sm text-gray-500 mt-0.5">{data.items[0].fields.email}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        <span className="text-xs text-gray-400 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {data.items[0].fields.mobileNumber}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1.5 capitalize">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {data.items[0].fields.gender}
        </span>
      </div>
    </div>
  );
};

export default PersonalInformation;
