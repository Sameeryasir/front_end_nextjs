import { deleteInventoryById } from '@/app/service/deleteinventory';
import React from 'react';

export default function Inventory({ inventory }) {
  const totalProductPrice = inventory?.reduce((total, item) => total + parseFloat(item?.ProductPrice), 0);

  const handleUpdate = (itemId) => {
    console.log(`Update item with id ${itemId}`);
  };

  const handleDelete = async (itemId) => {
    try{
      await deleteInventoryById(itemId);

    }catch (error) {
      console.error("Failed to delete employee with id ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-sm leading-normal">
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.map((item) => (
              <tr key={item?.id} className="text-gray-700 text-sm">
                <td className="py-2 px-4 border-b">{item?.ProductName}</td>
                <td className="py-2 px-4 border-b">Rs-{parseFloat(item?.ProductPrice).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item?.ProductQuantity}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(item?.ProductId)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item?.ProductId)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 text-left text-sm leading-normal">
              <td className="py-2 px-4 border-b font-bold">Total</td>
              <td className="py-2 px-4 border-b font-bold">Rs-{totalProductPrice.toFixed(2)}</td>
              <td className="py-2 px-4 border-b"></td>
              <td className="py-2 px-4 border-b"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
