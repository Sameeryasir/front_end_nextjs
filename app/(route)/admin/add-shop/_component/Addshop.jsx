"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateShop } from "@/app/service/createShop";
import { fetchCategory } from "@/app/service/Category";
import { fetchService } from "@/app/service/Service";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiBriefcase, FiMapPin } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const schema = z.object({
  Name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must contain only alphabetic characters and spaces",
    })
    .nonempty({ message: "Name is required" }),

  Address: z
    .string()
    .max(50, { message: "Address cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Address must contain only alphabetic characters and spaces",
    })
    .optional(),

  Owner: z
    .string()
    .min(3, { message: "Owner name must be at least 3 characters" })
    .max(50, { message: "Owner name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Owner name must contain only alphabetic characters and spaces",
    })
    .nonempty({ message: "Owner is required" }),

  Description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(150, { message: "Description cannot exceed 150 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Description must contain only alphabetic characters and spaces",
    })
    .nonempty({ message: "Description is required" }),

  CategoryId: z
    .number()
    .positive({ message: "CategoryId must be a positive number" })
    .int({ message: "CategoryId must be an integer" }),

  ServicesId: z
    .array(z.number().positive().int())
    .optional()
    .refine((array) => array.length > 0, {
      message: "At least one service must be selected",
    }),

  ImageUrl: z.string().optional().nullable(), // Allow null if no image is provided
});

export default function AddShop() {
  const [category, setCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [file, setFile] = useState(null);
  const [ImageUrl, setImageUrl] = useState(""); // State for image URL

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ServicesId: [],
      ImageUrl: "", // Ensure default value is an empty string
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchService();
        setServices(resp);
        const response = await fetchCategory();
        setCategory(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return "";

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/shop/upload", {
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

  const onSubmit = async (data) => {
    try {
      // Upload image first and get the URL
      const uploadedImageUrl = file ? await uploadImage() : "";

      // Prepare shop data with imageUrl
      const shopData = {
        ...data,
        ImageUrl: uploadedImageUrl || imageUrl, // Use uploadedImageUrl if available
      };

      console.log("Shop Data being sent:", shopData); // Debugging: Check the final shop data

      const response = await CreateShop(shopData);
      console.log("Shop created successfully:", response);
    } catch (error) {
      console.error("Failed to create shop:", error.message);
      // Handle error here (show error message, etc.)
    }
  };

  const handleServiceChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    const selectedValues = getValues("ServicesId") || [];
    if (e.target.checked) {
      selectedValues.push(selectedValue);
    } else {
      const index = selectedValues.indexOf(selectedValue);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }
    setValue("ServicesId", selectedValues);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white shadow-2xl rounded-lg w-full sm:w-3/4 lg:w-1/2 p-10">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Add New Shop
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="Name"
                className="block text-lg font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <FiBriefcase className="h-6 w-6" />
                </span>
                <input
                  type="text"
                  id="Name"
                  {...register("Name")}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                  placeholder="Enter the shop name"
                />
              </div>
              {errors.Name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            <div className="flex-1 mt-6 sm:mt-0">
              <label
                htmlFor="Owner"
                className="block text-lg font-medium text-gray-700"
              >
                Shop Owner
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <FiUser className="h-6 w-6" />
                </span>
                <input
                  type="text"
                  id="Owner"
                  {...register("Owner")}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                  placeholder="Enter the shop owner name"
                />
              </div>
              {errors.Owner && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Owner.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="Address"
              className="block text-lg font-medium text-gray-700"
            >
              Shop Address
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiMapPin className="h-6 w-6" />
              </span>
              <input
                type="text"
                id="Address"
                {...register("Address")}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                placeholder="Enter the shop address"
              />
            </div>
            {errors.Address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Description"
              className="block text-lg font-medium text-gray-700"
            >
              Shop Description
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiMail className="h-6 w-6" />
              </span>
              <textarea
                id="Description"
                {...register("Description")}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
                placeholder="Enter the shop description"
              />
            </div>
            {errors.Description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="CategoryId"
              className="block text-lg font-medium text-gray-700"
            >
              Category
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <FiBriefcase className="h-6 w-6" />
              </span>
              <select
                id="CategoryId"
                {...register("CategoryId", {
                  valueAsNumber: true,
                })}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-lg border-gray-300 p-4"
              >
                <option value="">Select a Category</option>
                {category.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
            {errors.CategoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.CategoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Services
            </label>
            <div className="mt-1 max-h-48 overflow-y-auto flex flex-col space-y-2">
              {services.map((service) => (
                <div key={service?.ServiceId} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service?.ServiceId}`}
                    value={service?.ServiceId}
                    checked={getValues("ServicesId")?.includes(
                      service?.ServiceId
                    )}
                    onChange={handleServiceChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor={`service-${service?.ServiceId}`}
                    className="ml-3 block text-lg font-medium text-gray-700"
                  >
                    {service.ServiceName}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:border file:border-gray-300
                file:rounded-md file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
              "
            />
          </div>

          <div className="flex items-center justify-end mt-8">
            <Button
              type="submit"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Shop
            </Button>

            
            
          </div>
        </form>
      </div>
    </div>
  );
}
