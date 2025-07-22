"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TopCard from "./components/TopCard";
import ClothingItem from "@/components/items/ClothingItem";
import { useState } from "react";

export default function BrandPage({ params }: { params: { brand: string } }) {
  const router = useRouter();
  const brand = params.brand;

  const [shownItems, setShownItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 11, 9, 10]);

  return (
    <div className="flex flex-col gap-8 min-h-screen w-screen mt-12 w-[90%] mx-auto">
      {/* <div>
        <button className="text-md" aria-label="Go back" onClick={() => router.back()}>
          ← Go back to results
        </button>
      </div> */}
      <div className="w-full gap-16">
        <div className="flex flex-col gap-8">
          <TopCard brand={brand} />
          <div className="flex gap-6 items-center">
            <div className="text-3xl font-[500]">
              Available products
            </div>
            <div className="text-[1.25rem] text-[#767676]">
              {shownItems.length} results
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {shownItems.map((item) => (
              <ClothingItem
                key={item}
                item={{
                  id: item,
                  name: `Product ${item}`,
                  image: "https://via.placeholder.com/150",
                  brand: brand,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
