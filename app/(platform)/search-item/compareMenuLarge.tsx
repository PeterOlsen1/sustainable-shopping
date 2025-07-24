import Cross from "@/components/ui/cross";
import { useState, useEffect } from "react";
import { Gruppo } from "next/font/google";
import ClothingItem from "@/components/items/ClothingItem";
import setHead from "@/actions/head/setHead";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import OpenExternally from "@/components/ui/open-externally";
import Colors from "@/components/items/Colors";

const gruppo = Gruppo({
  weight: "400",
  subsets: ["latin"],
});

function BubbleItem({ text }: { text: string }) {
  return (
    <div
      className="text-black p-2 rounded-full text-sm border border-[#97AAEF]"
    >
      {text}
    </div>
  );
}

export default function CompareMenuLarge({ selectedItems, onClose }: any) {
  const [isVisible, setIsVisible] = useState(false);

  setHead(
    `Compare Products | Sustainable Shopping`,
    `Compare your selected sustainable clothing items`,
);

  useEffect(() => {
    // Small delay to ensure the component is mounted before starting animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-white z-[999] flex flex-col text-center transition-all gap-4 duration-200 ease-out p-16 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "transform 300ms ease-out, opacity 300ms ease-out",
      }}
    >
      <Cross
        className="absolute top-6 right-6 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={handleClose}
      />
      <div className={`text-4xl mt-4 mb-12 ${gruppo.className}`}>
        Compare products
      </div>
      <div className="flex flex-col gap-4 relative">
        <div className="flex w-full justify-evenly text-left gap-8">
        <div className="opacity-0">
            Brand values
        </div>
        {selectedItems.map((item: any, index: number) => (
          <div key={index} className="flex-1 max-w-xs flex gap-4 flex-col">
            <ClothingItem item={item} />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-evenly text-left gap-8">
        <div className="flex text-bold text-right flex-col whitespace-nowrap gap-8">
            <div className="opacity-0">
                <button
                    className="py-2"
                >
                    hi
                </button>
            </div>
            <div className="mt-2">
                Colors
            </div>
            <div className="mt-1">
                Materials
            </div>
            <div>
                User rating
            </div>
            <div>
                Brand values
            </div>
        </div>
        {selectedItems.map((item: any, index: number) => (
            <div className="max-w-xs flex flex-col divide-y divide-gray-300 gap-4 w-full text-gray-500" key={index + '-bottom'}>
            <button
                className="text-white bg-black px-3 py-2 hover:bg-gray-800 cursor-pointer rounded flex gap-2 self-start whitespace-nowrap"
            >
                View on site <OpenExternally />
            </button>
                <div className="pt-4">
                    <Colors />
                </div>
                <div className="pt-4">
                    {item.material}
                </div>
                <div className="pt-4">
                    Rating here
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                    {item.brand.knownFor.map((k: string, innerIndex: number) => {
                        return <BubbleItem text={k} key={`${index}-${innerIndex}`} />;
                    })}
                </div>
            </div>
        ))}
      </div>
      </div>
    </div>
  );
}
