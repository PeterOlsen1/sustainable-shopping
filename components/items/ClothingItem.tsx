"use client";

import Image from "next/image";
import ClothingModal from "./ClothingModal";
import { useState } from "react";

interface ClothingItemProps {
  item: any;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  selectedItems?: any[];
  setSelectedItems?: (items: any[]) => void;
  isComparing?: boolean;
}

export default function ClothingItem({
  item,
  onDragStart,
  onDragEnd,
  selectedItems = [],
  setSelectedItems,
  isComparing,
}: ClothingItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isSelected = selectedItems.some(
    (selectedItem) => selectedItem.id === item.id,
  );

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart?.();

    // Set drag data
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";

    // Create drag preview
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.transform = "rotate(5deg)";
    dragImage.style.opacity = "0.8";
    e.dataTransfer.setDragImage(dragImage, 125, 125);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsOpen(true);
    }
  };

  const addToCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setSelectedItems && selectedItems.length < 4 && !isSelected) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col relative group ${isDragging ? "opacity-50" : ""}`}
        draggable={!!onDragStart}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Add to compare button */}
        {isComparing && setSelectedItems && (
          <button
            onClick={addToCompare}
            disabled={selectedItems.length >= 4 || isSelected}
            className={`absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded-md transition-all opacity-0 group-hover:opacity-100 ${
              isSelected
                ? "bg-black text-white cursor-default"
                : selectedItems.length >= 4
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black shadow-md hover:shadow-lg cursor-pointer"
            }`}
          >
            {isSelected ? "✓ Added" : "Compare"}
          </button>
        )}

        <div className="relative w-full aspect-square">
          <Image
            src={item.imageURL}
            alt={item.name}
            fill
            className={`rounded object-cover ${!isDragging ? "cursor-pointer" : "cursor-grabbing"}`}
            onClick={handleClick}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="mt-2">
          <div className="text-lg font-bold">{item.brand.name}</div>
          <div className="text-md text-gray-400">{item.name}</div>
          <div className="text-md">${parseFloat(item.price).toFixed(2)}</div>
        </div>
      </div>

      {isOpen && <ClothingModal item={item} onClose={() => setIsOpen(false)} />}
    </>
  );
}
