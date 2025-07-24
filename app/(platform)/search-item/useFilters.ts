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

export function constructFilterOptions(items: any[]) {
  const options = {
    type: new Set(),
    material: new Set(),
    brandName: new Set(),
    brandKnownFor: new Set(),
  }

  console.log(items);

  if (items) {
    for (const item of items) {
      options.type.add(item.type);
      options.material.add(item.material);
      options.brandName.add(item.brand?.name);
      item.brand?.knownFor?.forEach((k: any) => {
        options.brandKnownFor.add(k);
      });
    }
  }

  return [
    {
      label: "Type",
      filterKey: "type",
      options: Array.from(options.type),
    },
    {
      label: "Material",
      filterKey: "material",
      options: Array.from(options.material),
    },
    {
      label: "Brand",
      filterKey: "brand.name",
      options: Array.from(options.brandName),
    },
    {
      label: "Brand Qualities",
      filterKey: "brand.knownFor",
      options: Array.from(options.brandKnownFor),
    },
  ] as FilterOption[];
}

export function useFilters() {
  const [filters, setFilters] = useState(defaultFilters);
  return { filters, setFilters };
}
