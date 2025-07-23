"use client";

import SearchBar from "@/components/ui/search-bar";
import { useMemo, useState } from "react";
import PageStepper from "@/components/ui/page-stepper";
import { getBrands } from "@/actions/db/queries";
import useQuery from "@/actions/db/useQuery";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

function BubbleItem({ text }: { text: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search-brand?query=${encodeURIComponent(text)}`);
  };

  return (
    <div className="bg-white text-black p-2 rounded-full text-sm cursor-pointer" onClick={handleClick}>{text}</div>
  );
}

function ExploreItem({ text }: { text: string }) {
  return (
    <div className="bg-gray-200 text-black p-3 rounded-lg shadow-sm text-sm relative">
      <div className="absolute left-2 bottom-2 bg-white px-3 py-1 rounded text-sm shadow">
        {text}
      </div>
    </div>
  );
}

export default function Home() {
  const { data, loading, error } = useQuery(getBrands);

  const importantItemsText = useMemo(() => {
    if (!data) {
      return [];
    }
    const out = new Set();
    data.forEach((b: any) => {
      b.knownFor.forEach((k: any) => {
        out.add(k)
      })
    })
    
    return Array.from(out);
  }, [data])

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
    <>
      <div
        className="w-screen h-screen fixed top-0 left-0 z-[-1]"
        style={{
          backgroundImage: 'url("/images/index-image.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="w-screen h-full min-h-[80vh] flex flex-col items-center justify-center relative">
        <>
          <div
            className="text-4xl text-center mb-12 width-[70%]"
            style={{ fontFamily: "Gruppo" }}
          >
            Find the brands and products you need, with the values you love.
          </div>
          <div className="w-[50vw] min-w-[300px] mb-10">
            <SearchBar type={"item"} className={"py-4 border-none"} />
          </div>
          <div className="mb-4">What&apos;s most important to you?</div>
          <div className="w-[40vw] min-w-[300px] flex flex-center flex-wrap gap-2 items-center justify-center">
            {loading && (
              <Spinner />
            )}
            {!loading && !error && importantItemsText.slice(0, 6).map((text: any, index) => (
              <BubbleItem key={index} text={text} />
            ))}
          </div>
          {/* <div
            className="mt-12 flex flex-col items-center cursor-pointer"
            onClick={handleExploreClick}
          >
            <span>Explore</span>
            <span className="mt-2 animate-bounce text-2xl">↓</span>
          </div> */}
        </>

        {exploring && (
          <div
            className={`bg-white z-50 flex items-center justify-center flex-col gap-12 absolute top-0 left-0 w-full h-full ${
              isClosing ? "animate-slide-down" : "animate-slide-up"
            }`}
          >
            <div className="w-[50%] flex grid grid-cols-3 grid-rows-2 gap-4 aspect-[5/3]">
              {importantItemsText
                .slice(pageIndex * 6, (pageIndex + 1) * 6)
                .map((text: any, index) => (
                  <ExploreItem key={index} text={text} />
                ))}
            </div>
            <div>
              <PageStepper
                currentPage={pageIndex}
                setCurrentPage={setPageIndex}
                totalPages={Math.ceil(importantItemsText.length / 6)}
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleCloseClick}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors select-none"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
