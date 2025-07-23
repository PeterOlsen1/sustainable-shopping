import Image from "next/image";
import Link from "next/link";
import OpenExternally from "../ui/open-externally";

const shirt = {
  name: "T-shirt name",
  price: "20",
  brand: "Patagonia",
  imageUrl:
    "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd33c434f/images/hi-res/38504_NENA.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
};

function ItemBubble({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 rounded-full text-sm border border-[#97AAEF]">
      {text}
    </div>
  );
}

export default function ClothingModal({ item, onClose }: any) {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen grid place-items-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[65%] rounded-lg shadow relative top-[-5%] p-6 pr-10 pb-10 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-6 right-6" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <line
              x1="15.8536"
              y1="4.35355"
              x2="3.85355"
              y2="16.3536"
              stroke="#1D1D1D"
            />
            <line
              x1="16.1464"
              y1="16.3536"
              x2="4.14645"
              y2="4.35355"
              stroke="#1D1D1D"
            />
          </svg>
        </div>
        <div className="flex gap-6">
          <Image
            src={shirt.imageUrl}
            alt={item.name}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
          <div className="flex flex-col divide-y divide-gray-300 flex-1">
            <div className="flex flex-col gap-1 pb-6">
              <div className="text-2xl font-[500]">{item.brand.name}</div>
              <div className="text-md text-gray-400">{item.name}</div>
              <div className="text-md">
                ${parseFloat(item.price).toFixed(2)}
              </div>
            </div>
            <div className="py-6">
              <div className="font-[400]">Colors</div>
              <div>Some color boxes here</div>
              <div className="text-gray-400">Selected Color</div>
            </div>
            <div className="py-6 w-full flex">
              <div className="flex-1">Materials</div>
              <div className="text-gray-400">{item.material}</div>
            </div>
            <div className="py-6 flex">
              <Link
                href={item.brand.website}
                className="flex bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors items-center gap-2"
              >
                <div>View on site</div>
                <OpenExternally />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-4">
          <div className="flex">
            <div className="text-lg flex-1">About {item.brand.name}</div>
            <div className="flex">
              <Link
                href={`/brands/${item.brand.id}`}
                className="underline cursor-pointer"
              >
                View {item.brand.name}
              </Link>
              <span className="ml-2">→</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            {JSON.parse(item.brand.knownFor).map((text: any, index: any) => (
              <ItemBubble key={index} text={text} />
            ))}
          </div>
          <div className="text-[#1D1D1D]">{item.brand.description}</div>
        </div>
      </div>
    </div>
  );
}
