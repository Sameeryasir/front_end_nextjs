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
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must contain only alphabetic characters and spaces",
    }),

  Email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  PhoneNo: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^\d+$/, { message: "Phone number must be numeric" }),

  HiredDate: z.string().nonempty({ message: "Hired Date is required" }),

  Description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(150, { message: "Description cannot exceed 150 characters" })
    .nonempty({ message: "Description is required" }),

  ShopId: z.string().nonempty({ message: "Shop is required" }),
});

export default function AddEmployeeForm() {
  const [shops, setShops] = useState([]);
  const [file, setFile] = useState(null); // State to hold selected file
  const [imageUrl, setImageUrl] = useState(""); // State to hold uploaded image URL
  const [showDialog, setShowDialog] = useState(false); // State to control the visibility of the dialog

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return "";

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/employee/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your auth token if needed
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload Response:", result); // Log the response for debugging
      setImageUrl(result.imagePath); // Set the image URL from the response
      return result.imagePath; // Return image URL
    } catch (error) {
      console.error("Failed to upload image:", error.message);
      return ""; // Return empty string on error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchshopsByUserId();
        console.log("Full response:", response);
        if (Array.isArray(response)) {
          setShops(response); // Directly set if it's already an array
        } else if (response?.data && Array.isArray(response.data)) {
          setShops(response.data); // Set the data if it's an array
        } else {
          console.error("Unexpected response structure:", response);
        }
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
      const imageUrl = await uploadImage(); // Upload the image and get the URL
      data.ImageUrl = imageUrl; // Add image URL to form data
      const response = await CreateEmployees(data);
      console.log("Employee created successfully:", response);
      setShowDialog(true); // Show success dialog
    } catch (error) {
      console.error("Failed to create the employee", error.message);
    }
  };

  const closeDialog = () => {
    window.location.reload();
    setShowDialog(false);
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
                {Array.isArray(shops) ? (
                  shops.map((shop) => (
                    <option key={shop.ShopId} value={shop.ShopId}>
                      {shop.Name}
                    </option>
                  ))
                ) : (
                  <option disabled>No shops available</option>
                )}
              </select>
            </div>
            {errors.ShopId && (
              <p className="text-red-600">{errors.ShopId.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
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

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Success</h2>
            <p className="mb-4">Employee created successfully!</p>
            <button
              onClick={closeDialog}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
