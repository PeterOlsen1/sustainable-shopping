"use client";

import {
  getClothingById,
  updateClothingItem,
  getBrands,
} from "@/actions/db/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateItemPage({ params }: any) {
  const router = useRouter();
  const itemId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    material: "",
    price: "",
    brandId: "",
    imageURL: "",
  });

  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Load item data and brands on component mount
  useEffect(() => {
    const loadData = async () => {
      if (!itemId) {
        setMessage("No item ID provided");
        setIsLoading(false);
        return;
      }

      try {
        // Load both the clothing item and available brands
        const [clothingItem, brandsData] = await Promise.all([
          getClothingById(parseInt(itemId)),
          getBrands(),
        ]);
        console.log(clothingItem);

        if (!clothingItem) {
          setMessage("Clothing item not found");
          setIsLoading(false);
          return;
        }

        setBrands(brandsData);
        setFormData({
          name: (clothingItem as any).name || "",
          type: clothingItem.type,
          material: clothingItem.material,
          price: clothingItem.price.toString(),
          brandId: clothingItem.brandId.toString(),
          imageURL: clothingItem.imageURL || "",
        });
      } catch (error) {
        console.error("Error loading data:", error);
        setMessage("Error loading item data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      await updateClothingItem(parseInt(itemId), formData);
      setMessage("Clothing item updated successfully!");
    } catch (error) {
      setMessage("Error updating clothing item");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <div className="text-xl">Loading item data...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-center">
            Update Clothing Item
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Monica Cotton Shirt Citra, Classic Denim Jacket"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                value={formData.type}
                onChange={handleChange}
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
                value={formData.material}
                onChange={handleChange}
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
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                placeholder="29.99"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Brand Field */}
            <div>
              <label
                htmlFor="brandId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Brand *
              </label>
              <select
                id="brandId"
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                placeholder="https://example.com/clothing-item.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Item"}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                message.includes("Error") ||
                message.includes("not found") ||
                message.includes("No item")
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
