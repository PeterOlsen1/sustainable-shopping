"use client";

import ClothingItem from "@/components/items/ClothingItem";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import CompareMenuLarge from "./compareMenuLarge";
import Cross from "@/components/ui/cross";
import { useIsMobile } from "@/lib/hooks";

export default function CompareMenu({
  selectedItems = [],
  setSelectedItems,
  isDragging: isDraggingMainPage,
  onClose,
}: {
  selectedItems?: any[];
  setSelectedItems: any;
  isDragging: boolean;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();
  const maxHeight = 420;
  const [height, setHeight] = useState(maxHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const [largeCompareOpen, setLargeCompareOpen] = useState(false);

  const openSlots = useMemo(() => {
    return Math.max(0, 4 - selectedItems.length);
  }, [selectedItems]);

  // Animate in when component mounts
  useEffect(() => {
    setIsClient(true);
    // Small delay to ensure component is mounted before animating
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300); // Match the transition duration
  };

  // Handle drop events
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const itemData = e.dataTransfer.getData("application/json");
      const item = JSON.parse(itemData);

      // Check if item is already in the list and if we have space
      const isAlreadySelected = selectedItems.some(
        (selected: any) => selected.id === item.id,
      );
      if (!isAlreadySelected && selectedItems.length < 4) {
        setSelectedItems([...selectedItems, item]);
      }
    } catch (error) {
      console.error("Error parsing dropped item:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_: any, i: number) => i !== index));
  };

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newHeight = window.innerHeight - e.clientY;
      setHeight(Math.max(75, Math.min(maxHeight, newHeight))); // Min 75px, Max 450px
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners when dragging
  useEffect(() => {
    if (isDragging && isClient) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isClient, handleMouseMove, handleMouseUp]);

  if (isDraggingMainPage) {
    return (
      <div
        className={`fixed bottom-0 left-0 w-full z-[999] bg-white p-8 rounded-t-lg grid place-items-center transition-all duration-300 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } ${isDragOver ? "bg-blue-50" : ""}`}
        style={{
          boxShadow: "0 -4px 8px 0 rgba(0, 0, 0, 0.25)",
          height: `${height}px`,
          maxHeight: isMobile ? "50vh" : "auto",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div
          className={`border-2 border-dashed rounded-lg w-full h-full text-center flex flex-col items-center justify-center transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-100 text-blue-700"
              : "border-gray-300 bg-gray-100/50 text-gray-500"
          }`}
        >
          <div className="text-lg font-medium">
            {selectedItems.length < 4
              ? `Drop item here to compare (${selectedItems.length}/4)`
              : "Compare menu is full (4/4)"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 w-full z-[998] bg-white px-16 rounded-t-lg flex flex-col ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
        ${isMobile ? "overflow-y-auto scrollbar-hide" : "overflow-y-hidden"}`}
        style={{
          boxShadow: "0 -4px 8px 0 rgba(0, 0, 0, 0.25)",
          height: `${height}px`,
          transition: isDragging
            ? "height 0.1s ease"
            : "height 0.2s ease, transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        <Cross
          className="absolute top-6 right-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        />
        {/* Drag Handle */}
        {!isMobile && (
          <div
            ref={dragRef}
            className="w-full py-2 cursor-ns-resize flex justify-center items-center group"
            onMouseDown={handleMouseDown}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors"></div>
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 pt-2 pb-4 flex flex-col gap-8`}>
          <div className="text-lg">
            Select up to 4 items to compare ({selectedItems.length}/4)
          </div>
          <div className={`flex ${isMobile && "flex-col gap-2"}`}>
            <div
              className={`grid gap-4 
                ${isMobile ? "grid-cols-2" : "grid-cols-4"}`}
            >
              {selectedItems.slice(0, 4).map((item: any, index: number) => (
                <div
                  className="flex flex-col items-start max-w-[200px] lg:min-w-[200px]"
                  key={index}
                >
                  <div className="flex-1 w-full">
                    <ClothingItem item={item} isSmall={isMobile} />
                  </div>
                  <button
                    className="mt-2 bg-gray-200 hover:bg-gray-300 text-black px-3 py-2 rounded text-sm transition-colors"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {Array.from({ length: openSlots }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className={` bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm
                    ${
                      openSlots == 4
                        ? isMobile
                          ? "w-[30vw] h-[35vw]"
                          : "w-[200px] h-[300px]"
                        : openSlots >= 2 && isMobile
                          ? "w-[30vw] h-[35vw]"
                          : "w-full h-full"
                    }
                    `}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                />
              ))}
            </div>
            <div
              className={`flex-1 flex ${isMobile ? "justify-center items-center" : "justify-end items-end"}`}
            >
              <button
                onClick={() => setLargeCompareOpen(true)}
                className={
                  (selectedItems.length >= 2
                    ? `bg-black hover:bg-gray-800 text-white`
                    : `bg-gray-200 text-gray-400 cursor-not-allowed`) +
                  " px-6 py-3 rounded-lg font-medium transition-colors"
                }
              >
                {selectedItems.length >= 2 ? (
                  <div>
                    Compare {selectedItems.length} Item
                    {selectedItems.length !== 1 ? "s" : ""}
                  </div>
                ) : (
                  <div>
                    Add {2 - selectedItems.length} more item
                    {selectedItems.length == 2 ? "s" : ""} to compare
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {largeCompareOpen && (
        <CompareMenuLarge
          selectedItems={selectedItems}
          onClose={() => setLargeCompareOpen(false)}
        />
      )}
    </>
  );
}
