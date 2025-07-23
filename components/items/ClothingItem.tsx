"use client";

import Image from "next/image";
import ClothingModal from "./ClothingModal";
import { useState } from "react";

export default function ClothingItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(item);

  return (
    <>
      <div className="flex flex-col">
        <Image
          src={item.imageURL}
          alt={item.name}
          width={250}
          height={250}
          className="rounded-lg object-cover cursor-pointer w-[250px] h-[250px]"
          onClick={() => setIsOpen(true)}
        />
        <div className="mt-2">
          <div className="text-lg font-bold">{item.brand.name}</div>
          <div className="text-md text-gray-400">{item.type}</div>
          <div className="text-md">${parseFloat(item.price).toFixed(2)}</div>
        </div>
      </div>
      {isOpen && <ClothingModal item={item} onClose={() => setIsOpen(false)} />}
    </>
  );
}
