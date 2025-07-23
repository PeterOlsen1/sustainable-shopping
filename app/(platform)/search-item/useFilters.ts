import { useState } from "react";

export const defaultFilters = {
  sustainabilityType: [],
  color: [],
  material: [],
  type: [],
  "brand.name": [],
  "brand.knownFor": [],
};

export type FilterOption = {
  label: string;
  options: string[];
  filterKey: string;
  default?: string;
};

export const filterOptions: FilterOption[] = [
  {
    label: "Type",
    filterKey: "type",
    options: ["Shirt", "Hoodie", "Jeans", "Jacket", "Sweater"],
  },
  {
    label: "Material",
    filterKey: "material",
    options: ["Organic Cotton", "Fleece", "Denim", "Recycled Polyester"],
  },
  {
    label: "Brand",
    filterKey: "brand.name",
    options: ["Patagonia", "Everlane", "Eileen Fisher"],
  },
  {
    label: "Brand Qualities",
    filterKey: "brand.knownFor",
    options: [
      "Ethical production",
      "Low water usage",
      "Recyclability",
      "Youth focus",
    ],
  },
];

export function useFilters() {
  const [filters, setFilters] = useState(defaultFilters);
  return { filters, setFilters };
}
