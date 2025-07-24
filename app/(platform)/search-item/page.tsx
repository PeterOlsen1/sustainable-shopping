"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useFilters, defaultFilters, filterOptions } from "./useFilters";
import FilterOption from "./filterOption";
import { useMemo, useState } from "react";
import ClothingItem from "@/components/items/ClothingItem";
import Spinner from "@/components/ui/spinner";
import { getClothing, getClothingByQuery } from "@/actions/db/queries";
import useQuery from "@/actions/db/useQuery";
import setHead from "@/actions/head/setHead";
import CompareMenu from "./compareMenu";

export default function SearchItemPage() {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("query");

  if (query) {
    setHead(
      `"${query}" | Sustainable Shopping`,
      `Find sustainable clothing items with search ${query}`,
    );
  } else {
    setHead(
      `All Items | Sustainable Shopping`,
      `Discover sustainable clothing from ethical brands`,
    );
  }

  const { data, loading, error } = useQuery(async () => {
    if (query) {
      return await getClothingByQuery(query);
    } else {
      return await getClothing();
    }
  }, [query]);

  const [results, setResults] = useState(data || []);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  //kinda hackey workaround.
  useMemo(() => {
    setResults(data || []);
  }, [data]);

  const { filters, setFilters } = useFilters();
  const displayedResults = useMemo(() => {
    return results.filter((item: any) => {
      // Check if item matches ALL active filters
      return Object.entries(filters).every(
        ([key, filterValues]: [string, string[]]) => {
          // Handle nested object properties like "brand.name"
          const itemProperty = key.includes(".")
            ? key.split(".").reduce((obj: any, prop) => obj?.[prop], item)
            : item[key as keyof typeof item];

          // If no filters are selected for this category, include the item
          if (
            !filterValues ||
            filterValues.length === 0 ||
            filterValues.includes("All")
          ) {
            return true;
          }

          if (Array.isArray(itemProperty)) {
            return filterValues.some((value) => itemProperty.includes(value));
          }
          // Check if item's property matches any of the selected filter values
          return filterValues.includes(itemProperty);
        },
      );
    });
  }, [results, filters]);

  function sortByPriceLowToHigh() {
    const sortedResults = [...displayedResults].sort(
      (a, b) => a.price - b.price,
    );
    setResults(sortedResults);
  }

  function sortByPriceHighToLow() {
    const sortedResults = [...displayedResults].sort(
      (a, b) => b.price - a.price,
    );
    setResults(sortedResults);
  }

  function removeFilters() {
    //bad + quick solution
    if (typeof window !== "undefined") {
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          (checkbox as HTMLInputElement).checked = false;
        });
    }
    setFilters(defaultFilters);
  }

  return (
    <div className="w-[80%] mr-auto ml-auto mt-16 min-h-screen grid grid-cols-[1fr_4fr] gap-8">
      <div className="rounded-lg flex flex-col gap-4">
        <div className="font-[500] text-xl">Filter by</div>
        <div className="divide-y divide-gray-300 flex flex-col">
          {filterOptions.map((option) => (
            <FilterOption
              key={option.label}
              option={option}
              filters={filters}
              setFilters={setFilters}
            />
          ))}
        </div>
        <button
          onClick={removeFilters}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Clear filters
        </button>
        <button
          onClick={() => router.push("/search-item")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          View All
        </button>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 justify-center items-center">
          <strong className="text-[1.75em]">
            {query ? <div>&quot;{query}&quot;</div> : <div>All Clothes</div>}
          </strong>
          <div className="flex-1 text-gray-500">
            {!loading && !error && (
              <div>
                {displayedResults.length} result
                {displayedResults.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
          <button
            className={`bg-gray-300 rounded text-${showCompare ? "gray-500" : "black"} ${showCompare ? "cursor-default" : "hover:bg-gray-400 cursor-pointer"} px-3 py-2`}
            onClick={() => setShowCompare(true)}
          >
            Compare
          </button>
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
                  setResults(data);
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
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          {loading && (
            <div className="col-span-3 text-center text-gray-500 h-32 grid place-items-center">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="col-span-3 text-center text-red-500 h-32 grid place-items-center">
              Something went wrong fetching the results. Please try again later.
            </div>
          )}
          {!loading &&
            !error &&
            displayedResults.map((result: any, index: number) => (
              <ClothingItem
                item={result}
                key={index}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                isComparing={showCompare}
              />
            ))}
          {!loading && !error && displayedResults.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 h-32 grid place-items-center">
              No results found!
            </div>
          )}
        </div>
      </div>
      {showCompare && (
        <CompareMenu
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          isDragging={isDragging}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
