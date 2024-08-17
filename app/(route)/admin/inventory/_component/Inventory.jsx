  import React, { useState, useEffect } from 'react';
  import { UpdateInventories } from '@/app/service/createinventory';
  import { deleteInventoryById } from '@/app/service/deleteinventory';

  export default function Inventory({ inventory }) {
    const [inventoryList, setInventoryList] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [updatedInventory, setUpdatedInventory] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
      setInventoryList(inventory);
    }, [inventory]);

    const totalProductPrice = inventoryList?.reduce((total, item) => total + parseFloat(item?.ProductPrice), 0);

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
        const response = await UpdateInventories(id, updatedInventory);
        console.log('Update response:', response);

        setInventoryList(prev =>
          prev.map(item =>
            item.ProductId === id ? { ...item, ...updatedInventory } : item
          )
        );

        setEditingId(null);
        setUpdatedInventory({});
      } catch (error) {
        console.error(`Failed to update inventory with id ${id}:`, error);
      }
    };

    const handleDelete = async (itemId) => {
      try {
        await deleteInventoryById(itemId);
        setInventoryList(prev => prev.filter(item => item.ProductId !== itemId));
      } catch (error) {
        console.error("Failed to delete item with id ", itemId, error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedInventory((prev) => ({
        ...prev,
        [name]: value
      }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
              {inventoryList?.map((item) => (
                <tr key={item?.ProductId} className="text-gray-700 text-sm">
                  <td className="py-2 px-4 border-b">
                    {editingId === item.ProductId ? (
                      <input
                        type="text"
                        name="ProductName"
                        value={updatedInventory.ProductName}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    ) : (
                      item?.ProductName
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingId === item.ProductId ? (
                      <input
                        type="number"
                        name="ProductPrice"
                        value={updatedInventory.ProductPrice}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                    ) : (
                      `Rs-${parseFloat(item?.ProductPrice).toFixed(2)}`
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editingId === item.ProductId ? (
                      <input
                        type="number"
                        name="ProductQuantity"
                        value={updatedInventory.ProductQuantity}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
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
                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-xs"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(item.ProductId)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs"
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
