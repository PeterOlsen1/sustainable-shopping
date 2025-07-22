"use client";

import SearchBar from "@/components/ui/search-bar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchResult = () => {
    return (
        <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-gray-600">Description of the product.</p>
        </div>
    )
}

export default function SearchResultsPage() {
    const params = useSearchParams();
    const query = params.get("query");

    // can't export metadata when in "use client", this is a hackey workaround
    useEffect(() => {
        document.title = `Search | Sustainable Shopping`;
    }, [query]);

    return (
        <div className="w-[90%] h-screen flex flex-col gap-8 pt-24 mr-auto ml-auto">
            <div className="w-[50vw]">
                <SearchBar value={query || ""} type={"brand"} />
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-16">
                <div className="w-full flex flex-col gap-4">
                    <strong>
                        Filters
                    </strong>
                    <div className="flex flex-col gap-4 w-full bg-gray-200 p-4 rounded">
                        Some filter options here
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <strong>
                        Search results
                    </strong>
                    <div className="flex flex-col gap-4 w-full rounded">
                        <SearchResult />
                        <SearchResult />
                        <SearchResult />
                    </div>
                </div>
            </div>
        </div>
    )
}