export type FilterOption = {
  label: string;
  options: string[];
  default?: string;
};

export const filterOptions: FilterOption[] = [
  {
    label: "Sustainability Type",
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
    options: ["White", "Black", "Blue", "Red", "Green", "Yellow", "Pink"],
  },
  {
    label: "Occasion",
    options: ["Casual", "Formal", "Sport", "Outdoor", "Work"],
  },
  {
    label: "Material",
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
