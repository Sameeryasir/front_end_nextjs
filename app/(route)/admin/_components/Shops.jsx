import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, User, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { updatebyStatus } from "@/app/service/updateshopstatus";
import { UpdateShop } from "@/app/service/updateshop";
export default function Shops({ shops }) {
  const [shopStatuses, setShopStatuses] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [updatedShop, setUpdatedShop] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (shops) {
      const initialStatuses = shops.reduce((acc, shop) => {
        acc[shop.ShopId] = shop.isOpen === "true";
        return acc;
      }, {});
      setShopStatuses(initialStatuses);
    }
  }, [shops]);

  const handleViewInventory = (ShopId) => {
    console.log(`Viewing inventory for Shop ID: ${ShopId}`);
  };

  const handleViewEmployees = (ShopId) => {
    console.log(`Viewing employees for Shop ID: ${ShopId}`);
  };

  const handleDelete = (ShopId) => {
    console.log(`Deleting shop ID: ${ShopId}`);
  };

  const handleEdit = (shop) => {
    setEditingId(shop.ShopId);
    setUpdatedShop({ ...shop });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setUpdatedShop({});
    setErrors({});
  };

  const handleSave = async (id) => {
    console.log(`Saving updates for shop with id ${id}`, updatedShop);

    try {
      // Assuming the schema for updating a shop is similar to the one for employees
      // Update this part to match the exact schema you need
      const response = await UpdateShop(id, updatedShop);
      console.log('Update response:', response);

      // Update the shop's status in the local state
      setShopStatuses(prevStatuses => ({
        ...prevStatuses,
        [id]: updatedShop.isOpen,
      }));

      setEditingId(null);
      setUpdatedShop({});
    } catch (error) {
      console.error(`Failed to update shop with id ${id}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUpdatedShop((prev) => ({
      ...prev,
      [name]: type === "radio" ? (value === "true") : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStatusChange = async (ShopId, status) => {
    setShopStatuses((prevStatuses) => ({
      ...prevStatuses,
      [ShopId]: status,
    }));

    try {
      const response = await updatebyStatus(ShopId, status);
      console.log(
        `Shop ID: ${ShopId} is now ${status ? "Open" : "Closed"}`
      );
    } catch (error) {
      console.error(`Failed to update status for Shop ID: ${ShopId}`, error);
    }
  };

  return (
    <div className="max-w-full mx-auto overflow-hidden">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        {shops?.map((item) => (
          <div
            key={item?.ShopId}
            className="m-4 bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex justify-between p-8 pb-0 gap-6">
              <div className="flex gap-6">
                <div className="md:flex-shrink-0">
                  {item?.publicURL && (
                    <Image
                      className="rounded-xl h-48 w-full object-contain md:h-full md:w-48"
                      src={item?.publicURL}
                      alt="Product Image"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div>
                  {editingId === item.ShopId ? (
                    <>
                      <input
                        type="text"
                        name="Name"
                        value={updatedShop.Name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                      />
                      {/* Add other fields as needed for editing */}
                    </>
                  ) : (
                    <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                      {item?.Name}
                    </div>
                  )}
                  <p className="flex gap-2 mt-2 text-gray-500">
                    <User className="text-primary" />
                    {item?.Owner}
                  </p>
                  <p className="flex gap-2 mt-2 text-gray-500">
                    <MapPin className="text-primary" />
                    {item?.Address}
                  </p>
                  <div className="mt-4 grid gap-4">
                    <Link
                      href={`/admin/employees/${item?.Name}-${item?.ShopId}`}
                    >
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleViewEmployees(item?.ShopId)}
                      >
                        View Employee
                      </button>
                    </Link>
                    <Link
                      href={`/admin/inventory/${item?.Name}-${item?.ShopId}`}
                    >
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                        onClick={() => handleViewInventory(item?.ShopId)}
                      >
                        View Inventory
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <Menu>
                <MenuHandler>
                  <MoreHorizontal className="cursor-pointer text-gray-500" />
                </MenuHandler>
                <MenuList>
                  {editingId === item.ShopId ? (
                    <>
                      <MenuItem onClick={() => handleSave(item?.ShopId)}>
                        Save
                      </MenuItem>
                      <MenuItem onClick={handleCancel}>
                        Cancel
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={() => handleEdit(item)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(item?.ShopId)}>
                        Delete
                      </MenuItem>
                    </>
                  )}
                </MenuList>
              </Menu>
            </div>
            <div className="p-8 pt-4">
              <p className="mt-2 text-gray-500">{item?.Description}</p>
              <div className="mt-4">
                <label className="text-gray-700 font-semibold">
                  Shop Status:
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`shopStatus-${item.ShopId}`}
                      checked={shopStatuses[item.ShopId] === true}
                      onChange={() => handleStatusChange(item.ShopId, true)}
                      className="form-radio text-green-500"
                    />
                    <span className="ml-2 text-gray-700">Open</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`shopStatus-${item.ShopId}`}
                      checked={shopStatuses[item.ShopId] === false}
                      onChange={() => handleStatusChange(item.ShopId, false)}
                      className="form-radio text-red-500"
                    />
                    <span className="ml-2 text-gray-700">Close</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
