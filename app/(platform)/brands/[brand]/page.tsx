"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import TopCard from "./components/TopCard";
import ClothingItem from "@/components/items/ClothingItem";
import { useState } from "react";
import useQuery from "@/actions/db/useQuery";
import { getBrandPage } from "@/actions/db/queries";
import Spinner from "@/components/ui/spinner";

export default function BrandPage({ params }: { params: { brand: string } }) {
  const router = useRouter();
  const brand = params.brand;

  const { data, loading, error } = useQuery(() =>
    getBrandPage(parseInt(brand))
  );

  if (loading) {
    return (
      <div className="w-[90%] mx-auto h-full grid place-items-center">
          <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen mt-12 w-[90%] mx-auto">
      <div>
        <button className="text-md" aria-label="Go back" onClick={() => router.back()}>
          ← Go back
        </button>
      </div>
      <div className="w-full gap-16">
        <div className="flex flex-col gap-8">
          <TopCard brand={data} />
          <div className="flex gap-6 items-center">
            <div className="text-3xl font-[500]">Available products</div>
            <div className="text-[1.25rem] text-[#767676]">
              {data.clothing.length} results
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {data.clothing.map((item) => (
              <ClothingItem
                key={item}
                item={{
                  ...item,
                  brand: {
                    name: data.name,
                    website: data.website,
                    description: data.description,
                    id: data.id,
                    knownFor: data.knownFor,
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
