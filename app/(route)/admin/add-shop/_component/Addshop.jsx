"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateShop } from "@/app/service/createShop";
import { fetchCategory } from '@/app/service/Category';

const schema = z.object({
  Name: z.string().min(3, { message: 'Name must be at least 3 characters' }).max(50, { message: 'Name cannot exceed 50 characters' }).nonempty({ message: 'Name is required' }),
  Address: z.string().max(50, { message: 'Address cannot exceed 50 characters' }).optional(),
  Owner: z.string().min(3, { message: 'Owner name must be at least 3 characters' }).max(50, { message: 'Owner name cannot exceed 50 characters' }).nonempty({ message: 'Owner is required' }),
  Description: z.string().min(50, { message: 'Description must be at least 50 characters' }).max(150, { message: 'Description cannot exceed 150 characters' }).nonempty({ message: 'Description is required' }),
  CategoryId: z.string().nonempty({ message: 'Speciality is required' }),
});

export default function Addshop() {
  const [category, setCategory] = useState([]);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategory();
        setCategory(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log('Form data:', data); // Log the form data to verify it includes CategoryId
      const response = await CreateShop(data);
      // Handle success (e.g., show a notification or redirect)
      console.log('Shop created successfully:', response);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Failed to create shop:', error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-lg mx-auto bg-opacity-90 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Add New Shop</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label htmlFor="Name" className="block text-gray-700 font-bold mb-2">Shop Name</label>
              <input
                type="text"
                id="Name"
                {...register('Name')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-200"
                placeholder="Enter the shop name"
              />
              {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Address" className="block text-gray-700 font-bold mb-2">Shop Address</label>
              <input
                type="text"
                id="Address"
                {...register('Address')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-200"
                placeholder="Enter the shop address"
              />
              {errors.Address && <p className="text-red-500 text-sm mt-1">{errors.Address.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Owner" className="block text-gray-700 font-bold mb-2">Shop Owner</label>
              <input
                type="text"
                id="Owner"
                {...register('Owner')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-200"
                placeholder="Enter the shop owner name"
              />
              {errors.Owner && <p className="text-red-500 text-sm mt-1">{errors.Owner.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Description" className="block text-gray-700 font-bold mb-2">Shop Description</label>
              <textarea
                id="Description"
                {...register('Description')}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-200"
                placeholder="Enter the shop description"
              />
              {errors.Description && <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Speciality" className="block text-gray-700 font-bold mb-2">Speciality</label>
              <select
                id="Speciality"
                {...register('CategoryId')}  // Binding CategoryId to the form
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-200"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setValue('CategoryId', selectedValue);
                  console.log('Selected CategoryId:', selectedValue); // Log the selected ID to console
                }}
              >
                <option value="">Select a Speciality</option>
                {category.map((item) => (
                  <option key={item.CategoryId} value={item.CategoryId}>{item.Name}</option>
                ))}
              </select>
              {errors.CategoryId && <p className="text-red-500 text-sm mt-1">{errors.CategoryId.message}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
