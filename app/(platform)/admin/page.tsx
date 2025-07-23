"use client";

import { addClothingItem, addBrand } from "@/actions/db/queries";
import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [clothingFormData, setClothingFormData] = useState({
    type: "",
    material: "",
    price: "",
    brandId: "",
    imageURL: "",
  });

  const [brandFormData, setBrandFormData] = useState({
    name: "",
    website: "",
    description: "",
    clothingTypes: "",
    knownFor: "",
    rating: "",
    imageURL: "",
  });

  const [isSubmittingClothing, setIsSubmittingClothing] = useState(false);
  const [isSubmittingBrand, setIsSubmittingBrand] = useState(false);
  const [clothingMessage, setClothingMessage] = useState("");
  const [brandMessage, setBrandMessage] = useState("");

  const handleClothingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingClothing(true);
    setClothingMessage("");

    try {
      await addClothingItem(clothingFormData as any);

      setClothingMessage("Clothing item added successfully!");
      setClothingFormData({
        type: "",
        material: "",
        price: "",
        brandId: "",
        imageURL: "",
      });
    } catch (error) {
      setClothingMessage("Error adding clothing item");
      console.error(error);
    } finally {
      setIsSubmittingClothing(false);
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBrand(true);
    setBrandMessage("");

    try {
      await addBrand({
        ...brandFormData,
        clothingTypes: brandFormData.clothingTypes.split(',').map(t => t.trim()),
        knownFor: brandFormData.knownFor.split(',').map(t => t.trim()),
      });

      setBrandMessage("Brand added successfully!");
      setBrandFormData({
        name: "",
        website: "",
        description: "",
        clothingTypes: "",
        knownFor: "",
        rating: "",
        imageURL: "",
      });
    } catch (error) {
      setBrandMessage("Error adding brand");
      console.error(error);
    } finally {
      setIsSubmittingBrand(false);
    }
  };

  const handleClothingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setClothingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBrandChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBrandFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Brand Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add New Brand
          </h2>

          <form onSubmit={handleBrandSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brand Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={brandFormData.name}
                onChange={handleBrandChange}
                required
                placeholder="e.g. Patagonia, Everlane"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Website Field */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website *
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={brandFormData.website}
                onChange={handleBrandChange}
                required
                placeholder="e.g. www.patagonia.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={brandFormData.description}
                onChange={handleBrandChange}
                required
                rows={3}
                placeholder="Brand description and mission..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Clothing Types Field */}
            <div>
              <label
                htmlFor="clothingTypes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Clothing Types *
              </label>
              <input
                type="text"
                id="clothingTypes"
                name="clothingTypes"
                value={brandFormData.clothingTypes}
                onChange={handleBrandChange}
                required
                placeholder="Shirt, Jacket, T-Shirt (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Known For Field */}
            <div>
              <label
                htmlFor="knownFor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Known For *
              </label>
              <input
                type="text"
                id="knownFor"
                name="knownFor"
                value={brandFormData.knownFor}
                onChange={handleBrandChange}
                required
                placeholder="Ethical production, Recyclability (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Rating Field */}
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating *
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={brandFormData.rating}
                onChange={handleBrandChange}
                required
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL *
              </label>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                value={brandFormData.imageURL}
                onChange={handleBrandChange}
                required
                placeholder="https://example.com/brand-logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmittingBrand}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingBrand ? "Adding..." : "Add Brand"}
            </button>
          </form>

          {/* Brand Message Display */}
          {brandMessage && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                brandMessage.includes("Error")
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {brandMessage}
            </div>
          )}
        </div>

        {/* Clothing Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add New Clothing Item
          </h2>

          <form onSubmit={handleClothingSubmit} className="space-y-4">
            {/* Type Field */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type *
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={clothingFormData.type}
                onChange={handleClothingChange}
                required
                placeholder="e.g. Shirt, Jacket, Hoodie"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Material Field */}
            <div>
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Material *
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={clothingFormData.material}
                onChange={handleClothingChange}
                required
                placeholder="e.g. Organic Cotton, Recycled Polyester"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Field */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={clothingFormData.price}
                onChange={handleClothingChange}
                min="0"
                step="0.01"
                required
                placeholder="29.99"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Brand ID Field */}
            <div>
              <label
                htmlFor="brandId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brand ID *
              </label>
              <input
                type="number"
                id="brandId"
                name="brandId"
                value={clothingFormData.brandId}
                onChange={handleClothingChange}
                required
                min="1"
                placeholder="e.g. 1, 2, 3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="clothingImageURL"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL *
              </label>
              <input
                type="url"
                id="clothingImageURL"
                name="imageURL"
                value={clothingFormData.imageURL}
                onChange={handleClothingChange}
                required
                placeholder="https://example.com/clothing-item.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmittingClothing}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingClothing ? "Adding..." : "Add Clothing Item"}
            </button>
          </form>

          {/* Clothing Message Display */}
          {clothingMessage && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                clothingMessage.includes("Error")
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {clothingMessage}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-8">
        <Link
          href="/admin/update/item"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Update Clothing Items
        </Link>
        <Link
          href="/admin/update/brand"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Update Clothing Brands
        </Link>
      </div>
    </div>
  );
}
