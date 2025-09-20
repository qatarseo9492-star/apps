"use client";

import { useState } from 'react';

// You can expand this type based on your Prisma schema
interface SoftwareFormState {
  name: string;
  slug: string;
  shortDesc: string;
}

export function NewSoftwareForm() {
  const [formData, setFormData] = useState<SoftwareFormState>({
    name: '',
    slug: '',
    shortDesc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API function here to save the data
    console.log('Form Submitted:', formData);
    alert('Software data submitted! Check the console.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-secondary p-8 rounded-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Software Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent sm:text-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          value={formData.slug}
          onChange={handleChange}
          className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent sm:text-sm p-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-300">
          Short Description
        </label>
        <textarea
          name="shortDesc"
          id="shortDesc"
          value={formData.shortDesc}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent sm:text-sm p-2"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
        >
          Save Software
        </button>
      </div>
    </form>
  );
}
