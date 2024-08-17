import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInventories } from "@/app/service/createinventory";

const schema = z.object({
  ProductName: z.string().min(1, "Product Name is required"),
  ProductPrice: z.number().positive("Product Price must be a positive number"),
  ProductQuantity: z
    .number()
    .int()
    .positive("Product Quantity must be a positive integer"),
});

export default function InventoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange", // Validate as user types
  });

  const onSubmit = async (data) => {
    try {
      const response = await CreateInventories(data);
      alert("Inventory created successfully!");
      console.log(response);
    } catch (error) {
      alert(`Failed to create inventory: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Product Name</label>
        <input
          className={`p-2 border ${errors.ProductName ? 'border-red-500' : 'border-gray-300'} rounded`}
          {...register("ProductName")}
          placeholder="Enter Product Name"
        />
        {errors.ProductName && (
          <p className="text-red-500 text-sm mt-1">{errors.ProductName.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Product Price</label>
        <input
          type="number"
          step="0.01"
          className={`p-2 border ${errors.ProductPrice ? 'border-red-500' : 'border-gray-300'} rounded`}
          {...register("ProductPrice", { valueAsNumber: true })}
          placeholder="Enter Product Price"
        />
        {errors.ProductPrice && (
          <p className="text-red-500 text-sm mt-1">{errors.ProductPrice.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Product Quantity</label>
        <input
          type="number"
          className={`p-2 border ${errors.ProductQuantity ? 'border-red-500' : 'border-gray-300'} rounded`}
          {...register("ProductQuantity", { valueAsNumber: true })}
          placeholder="Enter Product Quantity"
        />
        {errors.ProductQuantity && (
          <p className="text-red-500 text-sm mt-1">{errors.ProductQuantity.message}</p>
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
  );
}
