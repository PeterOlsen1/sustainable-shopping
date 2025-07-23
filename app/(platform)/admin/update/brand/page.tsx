"use client";

import { getBrands } from "@/actions/db/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Decimal } from "@prisma/client/runtime/library";

interface Brand {
  id: number;
  name: string;
  website: string;
  description: string;
  clothingTypes: string[];
  knownFor: string[];
  rating: Decimal;
  imageURL: string;
  createdAt: Date;
}

export default function UpdateBrandListPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData as any);
      } catch (err) {
        console.error("Error loading brands:", err);
        setError("Failed to load brands");
      } finally {
        setIsLoading(false);
      }
    };

    loadBrands();
  }, []);

  const handleUpdateBrand = (brandId: number) => {
    router.push(`/admin/update/brand/${brandId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <div className="text-xl">Loading brands...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-start p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin")}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Admin Dashboard
          </button>
          <h1 className="text-4xl font-bold text-center mb-2">Update Brands</h1>
          <p className="text-gray-600 text-center">
            Select a brand to update its information
          </p>
        </div>

        {brands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No brands found</div>
            <button
              onClick={() => router.push("/admin")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Brand
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col h-full">
                  {/* Brand Image */}
                  {brand.imageURL && (
                    <div className="mb-4">
                      <img
                        src={brand.imageURL}
                        alt={`${brand.name} logo`}
                        className="w-full h-32 object-contain bg-gray-50 rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Brand Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {brand.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-600">
                        {Number(brand.rating).toFixed(1)}
                      </span>
                    </div>
                    <a
                      href={
                        brand.website.startsWith("http")
                          ? brand.website
                          : `https://${brand.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {brand.website}
                    </a>
                  </div>

                  {/* Brand Description */}
                  <div className="mb-4 flex-grow">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {brand.description}
                    </p>
                  </div>

                  {/* Clothing Types */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Clothing Types:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.clothingTypes.slice(0, 3).map((type, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {type}
                        </span>
                      ))}
                      {brand.clothingTypes.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{brand.clothingTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Known For */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Known For:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.knownFor.slice(0, 2).map((item, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {item}
                        </span>
                      ))}
                      {brand.knownFor.length > 2 && (
                        <span className="text-gray-500 text-xs">
                          +{brand.knownFor.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    onClick={() => handleUpdateBrand(brand.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Update Brand
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {brands.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>
              Showing {brands.length} brand{brands.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
