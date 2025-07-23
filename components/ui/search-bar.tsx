"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function SearchBar({
  value,
  type,
  className,
}: {
  value?: string;
  type: "brand" | "item";
  className?: string;
}) {
  const [searchValue, setSearchValue] = useState(value || "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Check for query parameter in URL first, then fall back to prop value
    const queryParam = searchParams.get("query");
    if (queryParam && pathname != "/search-brand") {
      setSearchValue(queryParam);
    } else {
      setSearchValue(value || "");
    }
  }, [value, searchParams]);

  const handleSearch = () => {
    router.push(`/search-${type}?query=` + encodeURIComponent(searchValue));
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder={`Search ${type}...`}
        className={cn(
          "w-full pl-10 pr-4 rounded focus:ring-0 focus:outline-none transition-colors border border-gray-500",
          className,
        )}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        value={searchValue}
      />
    </div>
  );
}
