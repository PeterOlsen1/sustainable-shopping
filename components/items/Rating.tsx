"use client";

import { useState } from "react";

export default function Rating() {
  // Generate random rating between 1-5 stars, stored in state so it doesn't change on re-renders
  const [rating] = useState(
    () => Math.round((Math.random() * 2 + 3) * 10) / 10,
  );

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        const fillPercentage = Math.max(0, Math.min(1, rating - index));

        return (
          <div key={index} className="relative w-4 h-4">
            {/* Background (empty) star */}
            <svg
              className="absolute w-4 h-4 text-gray-300"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="currentColor"
            >
              <path d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z" />
            </svg>

            {/* Foreground (filled) star with clipping */}
            {fillPercentage > 0 && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{
                  width: `${fillPercentage * 100}%`,
                  height: "100%",
                }}
              >
                <svg
                  className="w-4 h-4 text-black"
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="currentColor"
                >
                  <path d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}
