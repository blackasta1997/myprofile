'use client';
import { useEffect, useState } from 'react';

const personalInformation = () => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-1">
      <h3 className="text-2xl font-bold text-gray-900">{data.items[0].fields.firstName} {data.items[0].fields.lastName}</h3>
      <p className="text-gray-600 mt-1">{data.items[0].fields.email}</p>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H17a2 2 0 012 2v2M3 5a2 2 0 002 2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 001.502.684l1.498-4.493a1 1 0 00.948-.684H17a2 2 0 012-2m0 5a2 2 0 012 2v3a2 2 0 11-4 0v-3a2 2 0 012-2zM9 9h6" />
          </svg>
          <span className="text-sm text-gray-700">{data.items[0].fields.mobileNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm text-gray-700 capitalize">{data.items[0].fields.gender}</span>
        </div>
      </div>
    </div>
  );
};

export default personalInformation;
