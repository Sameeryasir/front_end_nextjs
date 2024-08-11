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

export default function Shops({ shops }) {
  const [shopStatuses, setShopStatuses] = useState({});

  useEffect(() => {
    if (shops) {
      const initialStatuses = shops.reduce((acc, shop) => {
        acc[shop.ShopId] = shop.isOpen === "true";
        return acc;
      }, {});
      setShopStatuses(initialStatuses);
    }
  }, [shops]);

  console.log(shops);

  const handleViewInventory = (ShopId) => {
    console.log(`Viewing inventory for Shop ID: ${ShopId}`);
  };

  const handleViewEmployees = (ShopId) => {
    console.log(`Viewing employees for Shop ID: ${ShopId}`);
  };

  const handleDelete = (ShopId) => {
    console.log(`Deleting shop ID: ${ShopId}`);
  };

  const handleUpdate = (ShopId) => {
    console.log(`Updating shop ID: ${ShopId}`);
  };

  const handleStatusChange = async (ShopId, status) => {
    setShopStatuses((prevStatuses) => ({
      ...prevStatuses,
      [ShopId]: status,
    }));

    try {
      const response = await updatebyStatus(ShopId, status);
      console.log(
        `Shop ID: ${ShopId} is now ${status ? "Active" : "Inactive"}`
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
                  <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                    {item?.Name}
                  </div>
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
                  <MenuItem onClick={() => handleUpdate(item?.ShopId)}>
                    Update
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(item?.ShopId)}>
                    Delete
                  </MenuItem>
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
