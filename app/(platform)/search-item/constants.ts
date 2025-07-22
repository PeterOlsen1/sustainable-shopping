import { useState } from "react";

export type FilterOption = {
  label: string;
  options: string[];
  filterKey: string;
  default?: string;
};

export const filterOptions: FilterOption[] = [
  {
    label: "Sustainability Type",
    filterKey: "sustainabilityType",
    options: [
      "Recycled",
      "Upcycled",
      "Organic",
      "Fair Trade",
      "Carbon Neutral",
      "Biodegradable",
    ],
  },
  {
    label: "Color",
    filterKey: "color",
    options: ["White", "Black", "Blue", "Red", "Green", "Yellow", "Pink"],
  },
  {
    label: "Occasion",
    filterKey: "occasion",
    options: ["Casual", "Formal", "Sport", "Outdoor", "Work"],
  },
  {
    label: "Material",
    filterKey: "material",
    options: [
      "Cotton",
      "Wool",
      "Polyester",
      "Linen",
      "Bamboo",
      "Hemp",
      "Recycled Plastic",
    ],
  },
];
