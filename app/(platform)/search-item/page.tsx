"use client";
import { useSearchParams } from "next/navigation";
import { filterOptions } from "./constants";
import type { FilterOption as FilterOptionType } from "./constants";
import { useState } from "react";

//should probably type these later if i have time
function SearchResultItem({ item }: any) {
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-sm aspect-[4/3] flex items-center justify-center relative">
            Shirt stuff here
            <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded text-sm shadow">
                Brand
            </div>
        </div>
    )
}

function FilterOption({ option }: { option: FilterOptionType }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={`w-full flex flex-col items-center text-center py-3 height-auto cursor-pointer`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex w-full">
                <div className="flex-1 text-left">
                    {option.label}
                </div>
                <div className="select-none">
                    {expanded ? '-' : '+'}
                </div>
            </div>
            {expanded && (
                <div className="mt-4">
                    {option.options.map((opt, index) => (
                        <div key={index} className="text-sm text-gray-700">
                            {opt}
                        </div>
                    ))} 
                </div>
            )}
        </div>
    )
}

export default function SearchItemPage() {
    const params = useSearchParams();
    const query = params.get("query");

    const results = [
        "shirt placeholder 1",
        "shirt placeholder 2",
        "shirt placeholder 3",
        "shirt placeholder 4",
        "shirt placeholder 5",
        "shirt placeholder 6",
        "shirt placeholder 7",
        "shirt placeholder 8",
        "shirt placeholder 9",
    ]

    return (
        <div className="w-[80%] mr-auto ml-auto mt-16 h-screen grid grid-cols-[1fr_3fr] gap-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md flex flex-col gap-4">
                <strong>
                    Filter by
                </strong>
                <div className="divide-y divide-gray-300 flex flex-col">
                    {filterOptions.map((option) => (
                        <FilterOption key={option.label} option={option} />
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="flex gap-4 justify-center items-center">
                    <strong className="text-[1.75em]">
                        "{query}"
                    </strong>
                    <div className="flex-1">
                        315 results
                    </div>
                    <div>
                        <select name="sort" id="" className="border border-black rounded px-3 py-2 text-sm">
                            <option value="price_low_to_high">Sort by: Price (low to high)</option>
                            <option value="price_high_to_low">Sort by: Price (high to low)</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {results.map((result, index) => (
                        <SearchResultItem item={result} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}