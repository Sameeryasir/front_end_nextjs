import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { deleteInventoryById } from '@/app/service/deleteinventory';
import { UpdateInventories } from '@/app/service/createinventory';

// Define schema using zod for validation
const inventorySchema = z.object({
  ProductName: z.string().min(1, "Product Name is required"),
  ProductPrice: z.number().positive("Price must be a positive number"),
  ProductQuantity: z.number().int().positive("Quantity must be a positive integer"),
});

export default function Inventory({ inventory }) {
  const [inventoryList, setInventoryList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedInventory, setUpdatedInventory] = useState({});
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ visible: false, message: '' });

  useEffect(() => {
    // Initialize inventory list
    setInventoryList(inventory);
  }, [inventory]);

  const handleDelete = async (id) => {
    try {
      await deleteInventoryById(id);
      // Remove the deleted item from the local state
      setInventoryList(prev => prev.filter(item => item.ProductId !== id));
      setNotification({ visible: true, message: 'Inventory item deleted successfully!' });
    } catch (error) {
      console.error(`Failed to delete inventory item with id ${id}:`, error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.ProductId);
    setUpdatedInventory({ ...item });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setUpdatedInventory({});
    setErrors({});
  };

  const handleSave = async (id) => {
    try {
      inventorySchema.parse(updatedInventory);

      await UpdateInventories(id, updatedInventory);
      setNotification({ visible: true, message: 'Inventory updated successfully!' });
      
      // Update the item in the local state
      setInventoryList(prev =>
        prev.map(item =>
          item.ProductId === id ? { ...item, ...updatedInventory } : item
        )
      );

      setEditingId(null);
      setUpdatedInventory({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, e) => {
          acc[e.path[0]] = e.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      } else {
        console.error(`Failed to update inventory item with id ${id}:`, error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUpdatedInventory((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const totalProductPrice = inventoryList?.reduce((total, item) => total + parseFloat(item?.ProductPrice), 0);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm leading-normal">
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList?.map((item) => (
              <tr key={item?.ProductId} className="text-gray-700 text-sm">
                <td className="py-2 px-4 border-b">
                  {editingId === item.ProductId ? (
                    <>
                      <input
                        type="text"
                        name="ProductName"
                        value={updatedInventory.ProductName}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                      {errors.ProductName && <p className="text-red-500 text-xs">{errors.ProductName}</p>}
                    </>
                  ) : (
                    item?.ProductName
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === item.ProductId ? (
                    <>
                      <input
                        type="number"
                        name="ProductPrice"
                        value={updatedInventory.ProductPrice}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                      {errors.ProductPrice && <p className="text-red-500 text-xs">{errors.ProductPrice}</p>}
                    </>
                  ) : (
                    `Rs-${parseFloat(item?.ProductPrice).toFixed(2)}`
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === item.ProductId ? (
                    <>
                      <input
                        type="number"
                        name="ProductQuantity"
                        value={updatedInventory.ProductQuantity}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                      {errors.ProductQuantity && <p className="text-red-500 text-xs">{errors.ProductQuantity}</p>}
                    </>
                  ) : (
                    item?.ProductQuantity
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    {editingId === item.ProductId ? (
                      <>
                        <button
                          onClick={() => handleSave(item.ProductId)}
                          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-xs"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item?.ProductId)}
                          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 text-left text-sm leading-normal">
              <td className="py-2 px-4 border-b font-bold">Total</td>
              <td className="py-2 px-4 border-b font-bold">Rs-{totalProductPrice?.toFixed(2)}</td>
              <td className="py-2 px-4 border-b"></td>
              <td className="py-2 px-4 border-b"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      
    </div>
  );
}
