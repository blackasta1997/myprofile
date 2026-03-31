'use client';
import { useEffect, useState } from 'react';

const EditPersonalInformation = ({ imageFile, imageRemoved, onImageUploaded, onImageRemoved }: { imageFile: File | null; imageRemoved: boolean; onImageUploaded: (url: string) => void; onImageRemoved: () => void }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/personal-info');
        if (!res.ok) {
          throw new Error('Failed to fetch personal information');
        }
        const json = await res.json();
        setData(json);

        const fields = json?.items[0]?.fields;
        if (fields) {
          setFirstName(fields.firstName || '');
          setLastName(fields.lastName || '');
          setEmail(fields.email || '');
          setPhone(fields.phone || '');
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Update personal info
      const res = await fetch('/api/personal-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update personal information');
      }

      // Upload image if one was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imgRes = await fetch('/api/personal-info/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!imgRes.ok) {
          const imgErr = await imgRes.json();
          throw new Error(imgErr.error || 'Failed to upload image');
        }

        const imgData = await imgRes.json();
        onImageUploaded(imgData.assetUrl);
      }

      // Remove image if flagged
      if (imageRemoved) {
        const delRes = await fetch('/api/personal-info/upload-image', {
          method: 'DELETE',
        });

        if (!delRes.ok) {
          const delErr = await delRes.json();
          throw new Error(delErr.error || 'Failed to remove image');
        }

        onImageRemoved();
      }

      setSuccess('Personal information updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>;
  if (!data && error) return <div className="text-sm text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
      {success && <div className="text-sm text-green-600 bg-green-50 p-2 rounded">{success}</div>}

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-gray-500 mb-1.5">
            First Name <span className="text-red-400">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-gray-500 mb-1.5">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>

      {/* Email and Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
          <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="examples@gmail.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="mobileNumber" className="block text-xs font-medium text-gray-500 mb-1.5">
            Mobile Number <span className="text-red-400">*</span>
          </label>
          <input id="mobileNumber" name="mobileNumber" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0806 123 7890" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
      </div>

      {/* Residential Address */}
      <div>
        <label htmlFor="residentialAddress" className="block text-xs font-medium text-gray-500 mb-1.5">
          Residential Address
        </label>
        <textarea id="residentialAddress" name="residentialAddress" rows={3} placeholder="Enter your address" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

export default EditPersonalInformation
