import Image from "next/image";

function AdditionalResource({ href, label }: { href: string; label: string }) {
  return (
    <div className="flex font-[700]">
      <a href={href} className="underline hover:underline">
        {label}
      </a>
      <span className="ml-2">→</span>
    </div>
  );
}

export default function TopCard({ brand }: any) {
  console.log(brand);
  return (
    <div className="flex gap-8 bg-[#E3E9DA] rounded-lg p-8">
      <Image
        src={brand.imageURL}
        alt={brand.name}
        width={250}
        height={250}
        className="rounded-lg object-cover"
      />
      <div className="flex flex-col h-full flex-1 gap-10 justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold flex-1">
            {brand.name}
          </div>
          <div>
            {brand.description || "No description available."}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 flex-col">
            <div>Additional Resources</div>
            <div className="flex gap-4 mt-2">
              <AdditionalResource
                href="https://www.patagonia.com/our-footprint/"
                label="Our Footprint"
              />
              <AdditionalResource
                href="https://www.patagonia.com/stories/"
                label="Stories"
              />
            </div>
          </div>
          <button className="bg-black text-white rounded px-4 py-2 font-[700]">
            Go to site →
          </button>
        </div>
      </div>
    </div>
  );
}
