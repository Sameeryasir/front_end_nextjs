"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInventories } from "@/app/service/createinventory";
import { useForm } from "react-hook-form";
import { fetchshopsByUserId } from "@/app/service/getshopsbyUser";

const schema = z.object({
  ProductName: z.string().min(1, "Product Name is required"),
  ProductPrice: z
    .string()
    .min(1, "Product Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Product Price must be a positive number"),
  ProductQuantity: z
    .number()
    .int()
    .positive("Product Quantity must be a positive integer"),
  ShopId: z.number().min(1, "Please select a shop"),
});

export default function InventoryForm() {
  const [shops, setShops] = useState([]);
  const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchshopsByUserId();
        setShops(response?.data);  // Make sure this is an array of shops
        console.log(response);
      } catch (error) {
        console.error("Error fetching shops data", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange", // Validate as user types
  });

  const onSubmit = async (data) => {
    try {
      data.ShopId = Number(data.ShopId); // Convert ShopId to a number
      const response = await CreateInventories(data);
      setShowDialog(true); // Show success dialog
      console.log(response);
    } catch (error) {
      alert(`Failed to create inventory: ${error.message}`);
    }
  };

  const handleCloseDialog = () => {
    window.location.reload();
    setShowDialog(false); // Close the dialog
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-md rounded-md"
      >
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Product Name</label>
          <input
            className={`p-2 border ${
              errors.ProductName ? "border-red-500" : "border-gray-300"
            } rounded`}
            {...register("ProductName")}
            placeholder="Enter Product Name"
          />
          {errors.ProductName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ProductName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Product Price</label>
          <input
            type="text"
            className={`p-2 border ${
              errors.ProductPrice ? "border-red-500" : "border-gray-300"
            } rounded`}
            {...register("ProductPrice")}
            placeholder="Enter Product Price"
          />
          {errors.ProductPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ProductPrice.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Product Quantity</label>
          <input
            type="number"
            className={`p-2 border ${
              errors.ProductQuantity ? "border-red-500" : "border-gray-300"
            } rounded`}
            {...register("ProductQuantity", { valueAsNumber: true })}
            placeholder="Enter Product Quantity"
          />
          {errors.ProductQuantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ProductQuantity.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Select Shop</label>
          <select
            className={`p-2 border ${
              errors.ShopId ? "border-red-500" : "border-gray-300"
            } rounded`}
            {...register("ShopId", {
              setValueAs: (value) => Number(value), // Convert to number when setting value
            })}
          >
            <option value="">Select a shop</option>
            {shops?.map((shop) => (
              <option key={shop.ShopId} value={shop.ShopId}>
                {shop.Name}
              </option>
            ))}
          </select>
          {errors.ShopId && (
            <p className="text-red-500 text-sm mt-1">{errors.ShopId.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={Object.keys(errors).length > 0} // Disable button if there are errors
        >
          Create Inventory
        </button>
      </form>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Success</h2>
            <p className="mb-4">Inventory successfully created!</p>
            <button
              onClick={handleCloseDialog}
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
