"use client";

import SearchBar from '@/components/ui/search-bar';
import { useEffect, useState } from 'react';
import PageStepper from '@/components/ui/page-stepper';

// export const metadata = {
//   title: "Home | Sustainable Shopping",
//   description:
//     "Sustainable Shopping is a platform dedicated to promoting eco-friendly products and practices, helping you make informed choices for a greener future.",
// };

function BubbleItem({ text }: { text: string }) {
  return (
    <div className="bg-gray-200 text-black p-3 rounded-lg shadow-sm text-sm">
      {text}
    </div>
  );
}

function ExploreItem({ text }: { text: string }) {
  return (
    <div className="bg-gray-300 text-black p-3 rounded-lg shadow-sm text-sm">
      {text}
    </div>
  );
}

export default function Home() {
  const importantItemsText = [
    "Natural material",
    "Quality construction",
    "Ethically produced",
    "Low water usage",
    "Recyclable",
    "Durable / long-lasting",
    //just started generating with copilot after this...
    "Fair trade",
    "Vegan",
    "Sustainable packaging",
    "Local production",
    "Carbon neutral",
    "Biodegradable",
    "Energy efficient",
    "Minimalist design",
    "Upcycled materials",
    "Non-toxic dyes",
    "Socially responsible",
    "Transparent sourcing",
    "Community support",
    "Innovative design",
    "Eco-friendly",
    "Recycled materials",
    "Organic",
    "Handmade",
    "Cruelty-free",
    "Sustainable",
    "Zero waste",
    "Fair labor practices",
    "Conscious consumerism",
    "Circular economy",
  ];

  const [exploring, setExploring] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handleExploreClick = () => {
    setExploring(true);
    setIsClosing(false);
  };

  const handleCloseClick = () => {
    setIsClosing(true);
    // Wait for animation to complete before hiding the component
    setTimeout(() => {
      setExploring(false);
      setIsClosing(false);
    }, 500); // Match the animation duration
  };


  return (
    <div className="w-screen h-full min-h-[80vh] flex flex-col items-center justify-center relative">
      <>
        <div className="w-[50vw] min-w-[300px] mb-10">
          <SearchBar type={"item"} className={"py-4"} />
        </div>
        <div className="mb-4">
          What&apos;s most important to you?
        </div>
        <div className="w-[40vw] min-w-[300px] flex flex-center flex-wrap gap-2 items-center justify-center">
          {importantItemsText.slice(0, 6).map((text, index) => (
            <BubbleItem key={index} text={text} />
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center cursor-pointer" onClick={handleExploreClick}>
          <span>Explore</span>
          <span className="mt-2 animate-bounce text-2xl">↓</span>
        </div>
      </>
      {exploring && (
        <div
          className={`bg-white z-50 flex items-center justify-center flex-col gap-12 absolute top-0 left-0 w-full h-full ${
            isClosing ? 'animate-slide-down' : 'animate-slide-up'
          }`}
        >
          <div className="w-[50%] flex grid grid-cols-3 grid-rows-2 gap-4 aspect-[5/3]">
            {importantItemsText.slice(pageIndex * 6, (pageIndex + 1) * 6).map((text, index) => (
              <ExploreItem key={index} text={text} />
            ))}
          </div>
          <div>
            <PageStepper currentPage={pageIndex} setCurrentPage={setPageIndex} totalPages={Math.ceil(importantItemsText.length / 6)} />
          </div>
          <div className="text-center">
            {/* <h1 className="text-4xl font-bold mb-4">Exploring!</h1> */}
            <button 
              onClick={handleCloseClick}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
