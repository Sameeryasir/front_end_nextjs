"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import { CreateEmployees } from "@/app/service/createemployees";
import { fetchshopsByUserId } from "@/app/service/getshopsbyUser";
import Shopdialog from "../../add-shop/_component/shopdialog";

const schema = z.object({
  Name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .nonempty({ message: "Name is required" }),
  Email: z.string().email({ message: "Invalid email address" }).optional(),
  PhoneNo: z
    .string()
    .min(3, { message: "Phone number must be at least 3 characters" })
    .max(50, { message: "Phone number cannot exceed 50 characters" })
    .nonempty({ message: "Phone number is required" })
    .regex(/^\+92/, { message: "Phone number must start with +92" }),
  Description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(150, { message: "Description cannot exceed 150 characters" })
    .nonempty({ message: "Description is required" }),
  HiredDate: z.string(),
  ShopId: z.string().nonempty({ message: "Shop is required" }),
});

export default function AddEmployeeForm() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchshopsByUserId();
        setShops(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      const response = await CreateEmployees(data);
      console.log("Employee created successfully:", response);
    } catch (error) {
      console.error("Failed to create the employee", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
      <div className="bg-white shadow-2xl rounded-lg w-full sm:w-3/4 lg:w-1/2 p-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="Name"
                className="block text-lg font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <FiUser className="h-6 w-6" />
                </span>
                <input
                  {...register("Name")}
                  type="text"
                  id="Name"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                  placeholder="John Doe"
                />
              </div>
              {errors.Name && (
                <p className="text-red-600">{errors.Name.message}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="Email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiMail className="h-6 w-6" />
              </span>
              <input
                {...register("Email")}
                type="email"
                id="Email"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                placeholder="john.doe@example.com"
              />
            </div>
            {errors.Email && (
              <p className="text-red-600">{errors.Email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="PhoneNo"
              className="block text-lg font-medium text-gray-700"
            >
              Phone
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiPhone className="h-6 w-6" />
              </span>
              <input
                {...register("PhoneNo")}
                type="text"
                id="PhoneNo"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                placeholder="+92 (555) 123-4567"
              />
            </div>
            {errors.PhoneNo && (
              <p className="text-red-600">{errors.PhoneNo.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="Description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiBriefcase className="h-6 w-6" />
              </span>
              <input
                {...register("Description")}
                type="text"
                id="Description"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                placeholder="Employee description"
              />
            </div>
            {errors.Description && (
              <p className="text-red-600">{errors.Description.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="HiredDate"
              className="block text-lg font-medium text-gray-700"
            >
              Hired Date
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiCalendar className="h-6 w-6" />
              </span>
              <input
                {...register("HiredDate")}
                type="date"
                id="HiredDate"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
              />
            </div>
            {errors.HiredDate && (
              <p className="text-red-600">{errors.HiredDate.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="ShopId"
              className="block text-lg font-medium text-gray-700"
            >
              Shop
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiMapPin className="h-6 w-6" />
              </span>
              <select
                {...register("ShopId")}
                id="ShopId"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
              >
                <option value="">Select Shop</option>
                {shops.map((shop) => (
                  <option key={shop.ShopId} value={shop.ShopId}>
                    {shop.Name}
                  </option>
                ))}
              </select>
            </div>
            {errors.ShopId && (
              <p className="text-red-600">{errors.ShopId.message}</p>
            )}
          </div>
          <div className="flex items-center justify-end mt-8">
            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
