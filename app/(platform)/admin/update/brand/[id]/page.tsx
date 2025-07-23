"use client";

import { getBrandById, updateBrand } from "@/actions/db/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateBrandPage({ params }: any) {
    const router = useRouter();
    const brandId = params.id;

    const [formData, setFormData] = useState({
        name: "",
        website: "",
        description: "",
        clothingTypes: "",
        knownFor: "",
        rating: "",
        imageURL: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // Load brand data on component mount
    useEffect(() => {
        const loadBrand = async () => {
            if (!brandId) {
                setMessage("No brand ID provided");
                setIsLoading(false);
                return;
            }

            try {
                const brand = await getBrandById(parseInt(brandId));
                if (!brand) {
                    setMessage("Brand not found");
                    setIsLoading(false);
                    return;
                }

                // Convert arrays back to comma-separated strings for the form
                setFormData({
                    name: brand.name,
                    website: brand.website,
                    description: brand.description,
                    clothingTypes: Array.isArray(brand.clothingTypes) 
                        ? brand.clothingTypes.join(", ") 
                        : brand.clothingTypes,
                    knownFor: Array.isArray(brand.knownFor) 
                        ? brand.knownFor.join(", ") 
                        : brand.knownFor,
                    rating: brand.rating.toString(),
                    imageURL: "" // Will be available when imageURL is added to schema
                });
            } catch (error) {
                console.error("Error loading brand:", error);
                setMessage("Error loading brand data");
            } finally {
                setIsLoading(false);
            }
        };

        loadBrand();
    }, [brandId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brandId) return;

        setIsSubmitting(true);
        setMessage("");

        try {
            await updateBrand(parseInt(brandId), formData);
            setMessage("Brand updated successfully!");
        } catch (error) {
            setMessage("Error updating brand");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="text-xl">Loading brand data...</div>
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
                    <h1 className="text-4xl font-bold text-center">Update Brand</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Brand Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Website Field */}
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                                Website *
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Clothing Types Field */}
                        <div>
                            <label htmlFor="clothingTypes" className="block text-sm font-medium text-gray-700 mb-1">
                                Clothing Types *
                            </label>
                            <input
                                type="text"
                                id="clothingTypes"
                                name="clothingTypes"
                                value={formData.clothingTypes}
                                onChange={handleChange}
                                required
                                placeholder="Shirt, Jacket, T-Shirt (comma separated)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Known For Field */}
                        <div>
                            <label htmlFor="knownFor" className="block text-sm font-medium text-gray-700 mb-1">
                                Known For *
                            </label>
                            <input
                                type="text"
                                id="knownFor"
                                name="knownFor"
                                value={formData.knownFor}
                                onChange={handleChange}
                                required
                                placeholder="Ethical production, Recyclability (comma separated)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Rating Field */}
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                Rating *
                            </label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                                min="0"
                                max="5"
                                step="0.1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Image URL Field */}
                        <div>
                            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="imageURL"
                                name="imageURL"
                                value={formData.imageURL}
                                onChange={handleChange}
                                placeholder="https://example.com/brand-logo.png"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Updating..." : "Update Brand"}
                        </button>
                    </form>

                    {/* Message Display */}
                    {message && (
                        <div className={`mt-4 p-3 rounded-md text-center ${
                            message.includes("Error") || message.includes("not found") || message.includes("No brand")
                                ? "bg-red-100 text-red-700 border border-red-300" 
                                : "bg-green-100 text-green-700 border border-green-300"
                        }`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
