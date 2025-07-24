"use client";

import { useState } from "react";

const mutedEarthTones = [
  // Classic basics
  { name: "Pure White", color: "#FFFFFF" },
  { name: "Charcoal Black", color: "#2C2C2C" },
  { name: "Navy Blue", color: "#2C3E50" },
  { name: "Soft Gray", color: "#8E8E8E" },
  { name: "Cream", color: "#F5F5DC" },
  { name: "Deep Brown", color: "#654321" },

  // Muted earth tones
  { name: "Sage Green", color: "#9CAF88" },
  { name: "Dusty Rose", color: "#D4A5A5" },
  { name: "Warm Taupe", color: "#B8A082" },
  { name: "Soft Clay", color: "#C4A484" },
  { name: "Muted Olive", color: "#A8A678" },
  { name: "Pale Terracotta", color: "#D2A679" },
  { name: "Dusty Blue", color: "#8FA0A0" },
  { name: "Mushroom Gray", color: "#B8A99A" },
  { name: "Weathered Stone", color: "#A5A297" },
  { name: "Soft Moss", color: "#93A77F" },
  { name: "Faded Denim", color: "#7A8A9E" },
  { name: "Warm Sand", color: "#C7B299" },
  { name: "Dusty Lavender", color: "#B5A5B8" },
  { name: "Muted Coral", color: "#D4A59A" },
  { name: "Sage Gray", color: "#A8A595" },
  { name: "Soft Eucalyptus", color: "#A0B2A0" },
  { name: "Dried Herb", color: "#A39A7F" },
  { name: "Pale Ochre", color: "#C4B085" },
  { name: "Misty Blue", color: "#95A5B8" },
  { name: "Warm Stone", color: "#B8AFA5" },
  { name: "Dusty Mint", color: "#A5B8A5" },
  { name: "Soft Linen", color: "#C7C4B8" },
  { name: "Muted Peach", color: "#D4B8A5" },
  { name: "Weathered Cedar", color: "#B59A85" },
];

export default function Colors({
  selectable = false,
}: {
  selectable?: boolean;
}) {
  const numColors = Math.floor(Math.random() * 5) + 3;
  const shuffled = [...mutedEarthTones].sort(() => 0.5 - Math.random());
  const [selectedColors] = useState(() => {
    const numColors = Math.floor(Math.random() * 5) + 3;
    const shuffled = [...mutedEarthTones].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numColors);
  });

  const [selected, setSelected] = useState(() => selectedColors[0].name);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap align-center items-center">
        {selectedColors.slice(0, 4).map((colorObj, index) => {
          return (
            <div
              onClick={() => {
                if (selectable) {
                  setSelected(colorObj.name);
                }
              }}
              key={index}
              className={`w-8 h-8 flex items-center justify-center ${selectable && "cursor-pointer"}`}
              title={colorObj.name}
            >
              <div
                className={`w-7 h-7 border border-gray-300`}
                style={{ backgroundColor: colorObj.color }}
              />
              {selectable && selected === colorObj.name && (
                <div className="absolute w-8 h-8 ring-1 ring-black pointer-events-none" />
              )}
            </div>
          );
        })}
        {selectedColors.length > 4 && (
          <div className="text-sm text-gray-500">
            {selectedColors.length - 4} more
          </div>
        )}
      </div>
      {selectable && selected && (
        <div className="text-sm text-gray-500">{selected}</div>
      )}
    </div>
  );
}
