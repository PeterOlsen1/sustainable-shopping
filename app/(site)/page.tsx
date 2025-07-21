import SearchBar from '@/components/landing/search-bar';

export const metadata = {
  title: "Home | Sustainable Shopping",
  description:
    "Sustainable Shopping is a platform dedicated to promoting eco-friendly products and practices, helping you make informed choices for a greener future.",
};

function BubbleItem({ text }: { text: string }) {
  return (
    <div className="bg-gray-300 text-black p-3 rounded-lg shadow-sm text-sm">
      {text}
    </div>
  );
}

export default async function Home() {
  const importantItemsText = [
    "Natural material",
    "Quality construction",
    "Ethically produced",
    "Low water usage",
    "Recyclable",
    "Durable / long-lasting"
  ]

  return (
    <div className="w-screen h-full min-h-[80vh] flex flex-col items-center justify-center">
      <div className="w-[50vw] min-w-[300px] mb-10">
        <SearchBar />
      </div>
      <div className="mb-4">
        What&apos;s most important to you?
      </div>
      <div className="w-[40vw] min-w-[300px] flex flex-center flex-wrap gap-2 items-center justify-center">
        {importantItemsText.map((text, index) => (
          <BubbleItem key={index} text={text} />
        ))}
      </div>
    </div>
  );
}
