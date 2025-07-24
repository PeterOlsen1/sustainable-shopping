"use client";

import { useRouter } from "next/navigation";
import TopCard from "./components/TopCard";
import ClothingItem from "@/components/items/ClothingItem";
import useQuery from "@/actions/db/useQuery";
import { getBrandPage } from "@/actions/db/queries";
import Spinner from "@/components/ui/spinner";
import setHead from "@/actions/head/setHead";
import { useMemo, useState } from "react";

function BubbleItem({ text }: { text: string }) {
  return (
    <div className="bg-white text-black p-2 rounded-full text-sm border border-[#97AAEF]">{text}</div>
  );
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const router = useRouter();
  const brand = params.brand;

  const { data, loading, error } = useQuery(() =>
    getBrandPage(parseInt(brand)),
  );

  const [results, setResults] = useState([]);
  useMemo(() => {
    setResults(data ? data.clothing : []);
  }, [data]);

  if (loading) {
    return (
      <div className="w-[90%] mx-auto h-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

  setHead(`${data.name} | Sustainable Shopping`, data.description);

  function sortByPriceLowToHigh() {
    const sorted = [...results].sort((a: any, b: any) => a.price - b.price);
    setResults(sorted);
  }

  function sortByPriceHighToLow() {
    const sorted = [...results].sort((a: any, b: any) => b.price - a.price);
    setResults(sorted);
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen mt-12 w-[90%] mx-auto">
      <div>
        <button
          className="text-md"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          ← Go back
        </button>
      </div>
      <div className="w-full gap-16">
        <div className="flex flex-col gap-8">
          <TopCard brand={data} />
          <div className="flex gap-4 flex-wrap">
            {data.knownFor.map((k: any, index: number) => (
              <BubbleItem key={index} text={k} />
            ))}
          </div>
          <div className="flex">
            <div className="flex gap-6 items-center flex-1">
              <div className="text-3xl font-[500]">Available products</div>
              <div className="text-[1.25rem] text-[#767676]">
                {data.clothing.length} results
              </div>
            </div>
            <div>
          <div>
            <select
              name="sort"
              id=""
              className="border border-black rounded px-3 py-2 text-sm"
              onChange={(e) => {
                if (e.target.value === "price_low_to_high") {
                  sortByPriceLowToHigh();
                } else if (e.target.value === "price_high_to_low") {
                  sortByPriceHighToLow();
                } else if (e.target.value === "relevance") {
                  setResults(data.clothing);
                }
              }}
            >
                <option value="relevance" selected>
                  Sort by: Relevance
                </option>
                <option value="price_low_to_high">
                  Sort by: Price (low to high)
                </option>
                <option value="price_high_to_low">
                  Sort by: Price (high to low)
                </option>
              </select>
            </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {results.map((item: any) => (
              <ClothingItem
                key={"clothing-item-" + item.id}
                item={{
                  ...item,
                  brand: {
                    name: data.name,
                    website: data.website,
                    description: data.description,
                    id: data.id,
                    knownFor: data.knownFor,
                  },
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
