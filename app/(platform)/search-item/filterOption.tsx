"use client";

import type { FilterOption as FilterOptionType } from "./useFilters";
import { useState } from "react";

export default function FilterOption({
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
          {option?.options?.map((opt, index) => (
            <div
              key={index}
              className="text-sm text-start flex gap-2 h-full align-center items-center"
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
                        [filterKey]: [...currentFilters, opt],
                      };
                    } else {
                      return {
                        ...prev,
                        [filterKey]: currentFilters.filter(
                          (val: any) => val !== opt,
                        ),
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
                  display: opt?.length > 20 ? "block" : "inline",
                  gridColumn: opt?.length > 20 ? "span 2" : "span 1",
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
