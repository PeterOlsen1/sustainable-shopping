import Link from "next/link";
import { getClothing } from "@/actions/db/queries";
import { Decimal } from "@prisma/client/runtime/library";

interface ClothingItem {
  id: number;
  name?: string;
  type: string;
  material: string;
  price: Decimal;
  brandId: number;
  createdAt: Date;
  brand?: {
    id: number;
    name: string;
    website: string;
    description: string;
    clothingTypes: string[];
    knownFor: string[];
    rating: Decimal;
    createdAt: Date;
  };
}

export default async function UpdateItemPage() {
  const clothingItems: ClothingItem[] = await getClothing();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Update Clothing Items</h1>
        <Link
          href="/admin"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Admin
        </Link>
      </div>

      {clothingItems.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-xl">No clothing items found.</p>
          <Link
            href="/admin"
            className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
          >
            Add your first clothing item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clothingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name || "Unnamed Item"}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize mt-1">
                      {item.type}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    ${Number(item.price).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Material:
                    </span>
                    <p className="text-gray-900 capitalize">{item.material}</p>
                  </div>

                  {item.brand && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Brand:
                      </span>
                      <p className="text-gray-900">{item.brand.name}</p>
                    </div>
                  )}

                  {item.brand && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Brand Rating:
                      </span>
                      <p className="text-gray-900">
                        {Number(item.brand.rating).toFixed(1)}/5.0
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Added:
                    </span>
                    <p className="text-gray-900">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/update/item/${item.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-center block"
                  >
                    Update Item
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
