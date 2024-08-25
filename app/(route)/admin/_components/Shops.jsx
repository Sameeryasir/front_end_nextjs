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
import { deleteShopById } from "@/app/service/Deleteshop";

export default function Shops({ shops, isValid }) {
  const [shopStatuses, setShopStatuses] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [updatedShop, setUpdatedShop] = useState({});
  const [errors, setErrors] = useState({});
  const [localShops, setLocalShops] = useState(shops);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (shops) {
      const initialStatuses = shops.reduce((acc, shop) => {
        acc[shop.ShopId] = shop.isOpen === "true";
        return acc;
      }, {});
      setShopStatuses(initialStatuses);
      setLocalShops(shops); // Initialize local shops
    }
  }, [shops]);

  const handleViewInventory = (ShopId) => {
    console.log(`Viewing inventory for Shop ID: ${ShopId}`);
  };

  const handleViewEmployees = (ShopId) => {
    console.log(`Viewing employees for Shop ID: ${ShopId}`);
  };

  const handleViewAppointments = (ShopId) => {
    console.log(`Viewing appointments for Shop ID: ${ShopId}`);
  };

  const handleDelete = async (ShopId) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the shop with ID: ${ShopId}?`
    );

    if (isConfirmed) {
      console.log(`Deleting shop ID: ${ShopId}`);

      try {
        await deleteShopById(ShopId);

        setLocalShops((prevShops) =>
          prevShops.filter((shop) => shop.ShopId !== ShopId)
        );
      } catch (error) {
        console.error(`Failed to delete shop ID: ${ShopId}`, error);
      }
    } else {
      console.log(`Deletion of shop ID: ${ShopId} was cancelled.`);
    }
  };

  const handleEdit = (shop) => {
    setEditingId(shop.ShopId);
    setUpdatedShop({ ...shop });
    setErrors({});
    setImageUrl(shop.publicURL); // Initialize image URL with current image
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return imageUrl;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/shop/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload Response:", result);
      setImageUrl(result.imagePath);
      return result.imagePath;
    } catch (error) {
      console.error("Failed to upload image:", error.message);
      return "";
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setUpdatedShop({});
    setErrors({});
    setFile(null);
    setImageUrl("");
  };

  const handleSave = async (id) => {
    window.location.reload();
    console.log(`Saving updates for shop with id ${id}`, updatedShop);

    try {
      const uploadedImageUrl = await uploadImage();

      const response = await UpdateShop(id, {
        ...updatedShop,
        ImageUrl: uploadedImageUrl,
      });
      console.log("Update response:", response);

      setLocalShops((prevShops) =>
        prevShops.map((shop) =>
          shop.ShopId === id ? { ...shop, ...updatedShop, ImageUrl: uploadedImageUrl } : shop
        )
      );

      setEditingId(null);
      setUpdatedShop({});
      setFile(null);
      setImageUrl("");
    } catch (error) {
      console.error(`Failed to update shop with id ${id}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUpdatedShop((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
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
      console.log(`Shop ID: ${ShopId} is now ${status ? "Open" : "Closed"}`);
    } catch (error) {
      console.error(`Failed to update status for Shop ID: ${ShopId}`, error);
    }
  };

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("/") || url.startsWith("http") ? url : `/${url}`;
  };

  return (
    <div className="max-w-full mx-auto overflow-hidden">
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        {localShops?.map((item) => (
          <div
            key={item?.ShopId}
            className="m-4 bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex justify-between p-8 pb-0 gap-6">
              <div className="flex gap-6">
                <div className="md:flex-shrink-0">
                  {editingId === item.ShopId ? (
                    <div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="border border-gray-300 p-2 rounded mb-2 w-full"
                      />
                      {imageUrl && (
                        <Image
                          className="rounded-full h-48 w-48 object-cover"
                          src={formatImageUrl(imageUrl)}
                          alt="Shop Image"
                          width={200}
                          height={200}
                        />
                      )}
                    </div>
                  ) : (
                    item?.publicURL && (
                      <Image
                        className="rounded-full h-48 w-48 object-cover"
                        src={formatImageUrl(item?.publicURL)}
                        alt="Shop Image"
                        width={200}
                        height={200}
                      />
                    )
                  )}
                </div>
                <div className="flex flex-col justify-between flex-1 mt-8"> {/* Increased margin-top to move the details further downward */}
                  {editingId === item.ShopId ? (
                    <>
                      <input
                        type="text"
                        name="Name"
                        value={updatedShop.Name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded mb-2 w-full"
                        placeholder="Shop Name"
                      />
                      <input
                        type="text"
                        name="Address"
                        value={updatedShop.Address}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded mb-2 w-full"
                        placeholder="Address"
                      />
                      <input
                        type="text"
                        name="Owner"
                        value={updatedShop.Owner}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded mb-2 w-full"
                        placeholder="Owner Name"
                      />
                      <textarea
                        name="Description"
                        value={updatedShop.Description}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded mb-2 w-full"
                        placeholder="Description"
                      />
                    </>
                  ) : (
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
                    </div>
                  )}
                  <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:gap-4">
                    <Link
                      href={`/admin/employees/${item?.Name}-${item?.ShopId}`}
                    >
                      <button
                        className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-center text-sm"
                        onClick={() => handleViewEmployees(item?.ShopId)}
                      >
                        View Employee
                      </button>
                    </Link>
                    <Link
                      href={`/admin/inventory/${item?.Name}-${item?.ShopId}`}
                    >
                      <button
                        className="flex-1 px-2 py-1 bg-yellow-500 text-white rounded text-center text-sm"
                        onClick={() => handleViewInventory(item?.ShopId)}
                      >
                        View Inventory
                      </button>
                    </Link>
                    <Link
                      href={`/admin/mybookings/${item?.Name}-${item?.ShopId}`}
                    >
                      <button
                        className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-center text-sm"
                        onClick={() => handleViewAppointments(item?.ShopId)}
                      >
                        View Appointments
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
                      <MenuItem onClick={handleCancel}>Cancel</MenuItem>
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
