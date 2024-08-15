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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Product Name</label>
        <input {...register("ProductName")} />
        {errors.ProductName && <p>{errors.ProductName.message}</p>}
      </div>

      <div>
        <label>Product Price</label>
        <input
          type="number"
          step="0.01"
          {...register("ProductPrice", { valueAsNumber: true })}
        />
        {errors.ProductPrice && <p>{errors.ProductPrice.message}</p>}
      </div>

      <div>
        <label>Product Quantity</label>
        <input
          type="number"
          {...register("ProductQuantity", { valueAsNumber: true })}
        />
        {errors.ProductQuantity && <p>{errors.ProductQuantity.message}</p>}
      </div>

      <button type="submit">Create Inventory</button>
    </form>
  );
}
