"use client";

import { useSearchParams } from "next/navigation";
import { useFilters, defaultFilters, filterOptions } from "./useFilters";
import type { FilterOption as FilterOptionType } from "./useFilters";
import { useMemo, useState } from "react";
import ClothingItem from "@/components/items/ClothingItem";
import Spinner from "@/components/ui/spinner";
import { getClothing, getClothingByQuery } from "@/actions/db/queries";
import useQuery from "@/actions/db/useQuery";

function FilterOption({
  option,
  filters,
  setFilters,
}: {
  option: FilterOptionType;
  filters: any;
  setFilters: any;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`w-full flex flex-col items-center text-center py-3 height-auto`}
    >
      <div
        className="flex w-full cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 flex gap-2 text-left items-center">
          <div>{option.label}</div>
          <div className="text-[#767676] text-sm">
            {filters[option.filterKey]?.length > 0
              ? ` (${filters[option.filterKey].length})`
              : "All"}
          </div>
        </div>
        <div className="select-none">
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <line x1="16" y1="10" x2="4" y2="10" stroke="#1D1D1D" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <line x1="10" y1="4" x2="10" y2="16" stroke="#1D1D1D" />
              <line x1="16" y1="10" x2="4" y2="10" stroke="#1D1D1D" />
            </svg>
          )}
        </div>
      </div>
      {expanded && (
        <div
          className="mt-4 grid w-full items-start gap-2"
          style={{
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          {option.options.map((opt, index) => (
            <div
              key={index}
              className="text-sm text-start flex gap-2"
              style={{
                gridColumn: "span 1",
                // If the item is too large, make it span both columns
                // You can adjust the threshold as needed
                maxWidth: "100%",
              }}
            >
              <input
                type="checkbox"
                id={`filter-${option.label}-${index}`}
                onChange={(e) => {
                  setFilters((prev: any) => {
                    const filterKey = option.filterKey; // This will be "brand.name"
                    const currentFilters = prev[filterKey] || [];

                    if (e.target.checked) {
                      return {
                        ...prev,
                        [filterKey]: [...currentFilters, opt]
                      };
                    } else {
                      return {
                        ...prev,
                        [filterKey]: currentFilters.filter((val: any) => val !== opt)
                      };
                    }
                  });
                }}
              />
              <label
                htmlFor={`filter-${option.label}-${index}`}
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  // Example: if label is too long, span both columns
                  display: opt.length > 20 ? "block" : "inline",
                  gridColumn: opt.length > 20 ? "span 2" : "span 1",
                }}
              >
                {opt}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchItemPage() {
  const params = useSearchParams();
  const query = params.get("query");

  const {data, loading, error} = useQuery(async () => {
      if (query) {
        return await getClothingByQuery(query);
      } else {
        return await getClothing();
      }
  }, [query])

  const [results, setResults] = useState(data || []);

  //kinda hackey workaround.
  useMemo(() => {
    setResults(data || []);
  }, [data]);

  const { filters, setFilters } = useFilters();
  const displayedResults = useMemo(() => {
    return results.filter((item) => {
      // Check if item matches ALL active filters
      return Object.entries(filters).every(([key, filterValues]: [string, string[]]) => {
        // Handle nested object properties like "brand.name"
        const itemProperty = key.includes('.') 
          ? key.split('.').reduce((obj: any, prop) => obj?.[prop], item)
          : item[key as keyof typeof item];

        // If no filters are selected for this category, include the item
        if (!filterValues || filterValues.length === 0 || filterValues.includes("All")) {
          return true;
        }

        if (Array.isArray(itemProperty)) {
          return filterValues.some((value) => itemProperty.includes(value));
        }
        // Check if item's property matches any of the selected filter values
        return filterValues.includes(itemProperty);
      });
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
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    setFilters(defaultFilters);
  }

  return (
    <div className="w-[80%] mr-auto ml-auto mt-16 min-h-screen grid grid-cols-[1fr_3fr] gap-8">
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
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 justify-center items-center">
          <strong className="text-[1.75em]">
            {query ? (
              <div>
                &quot;{query}&quot;
              </div>
            ) : (
              <div>
                All Clothes
              </div>
            )}
          </strong>
          <div className="flex-1 text-gray-500">
            {!loading && !error && (
              <div>
                {displayedResults.length} result
                {displayedResults.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
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
                }
                else if (e.target.value === "relevance") {
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
            displayedResults.map((result, index) => (
              <ClothingItem item={result} key={index} />
            ))}
          {!loading && !error && displayedResults.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 h-32 grid place-items-center">
              No results found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
