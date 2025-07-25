"use client";
import { getBrands } from "@/actions/db/queries";
import useQuery from "@/actions/db/useQuery";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import TopCard from "../brands/[brand]/components/TopCard";
import Spinner from "@/components/ui/spinner";
import setHead from "@/actions/head/setHead";
import { useIsMobile } from "@/lib/hooks";

function BubbleItem({
  text,
  selected,
  setQuery,
}: {
  text: string;
  selected?: boolean;
  setQuery: any;
}) {
  const handleClick = () => {
    if (text == "All Brands") {
      setQuery("");
    } else {
      setQuery(text);
    }
  };

  const bg = selected ? "bg-gray-100" : "bg-white";
  return (
    <div
      className={`text-black p-2 rounded-full text-sm cursor-pointer border border-[#97AAEF] hover:bg-gray-100 text-center grid place-items-center ${bg}`}
      onClick={handleClick}
    >
      <div>{text}</div>
    </div>
  );
}

function ItemMenu({
  importantItemsText,
  query,
  setQuery,
}: {
  importantItemsText: string[];
  query: any;
  setQuery: (query: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex gap-2 align-center items-center border-b border-gray-300 pb-2"
        onClick={() => setExpanded(!expanded)}
      >
        Search filters
        <div className="select-none">
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <line x1="16" y1="10" x2="4" y2="10" stroke="#1D1D1D" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <line x1="10" y1="4" x2="10" y2="16" stroke="#1D1D1D" />
              <line x1="16" y1="10" x2="4" y2="10" stroke="#1D1D1D" />
            </svg>
          )}
        </div>
      </div>
      {expanded && (
        <div className="grid grid-cols-2 gap-2 justify-center">
          {importantItemsText.map((item: any, index: number) => (
            <BubbleItem
              text={item}
              selected={query == item}
              setQuery={setQuery}
              key={"mobile-bubble-" + index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchItemPage() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("query"));

  const isMobile = useIsMobile();
  const { data, loading, error } = useQuery(getBrands);

  const results = useMemo(() => {
    const q: any = query;

    if (!data) {
      return [];
    }

    if (!q) {
      return data;
    }

    const ret = data?.filter((d: any) => {
      return (
        d.knownFor?.some((k: any) => {
          return k.toLowerCase().includes(q?.toLowerCase());
        }) ||
        d.clothingItems?.some((c: any) => {
          return c.toLowerCase().includes(q?.toLowerCase());
        })
      );
    });
    return ret;
  }, [data, query]);

  const importantItemsText = useMemo(() => {
    if (!data) {
      return [];
    }
    const out = new Set();
    data.forEach((b: any) => {
      b.knownFor.forEach((k: any) => {
        out.add(k);
      });
      // b.clothingTypes.forEach((t: any) => {
      //   out.add(t);
      // })
    });

    return [...Array.from(out), "All Brands"];
  }, [data]);

  if (query) {
    setHead(
      `"${query}" | Sustainable Shopping`,
      `Find sustainable brands known for ${query}`,
    );
  } else {
    setHead(
      `All Brands | Sustainable Shopping`,
      `Discover sustainable clothing from ethical brands`,
    );
  }

  return (
    <div className="w-[80%] mr-auto ml-auto mt-16 h-screen gap-8">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {isMobile ? (
            <ItemMenu
              importantItemsText={importantItemsText as string[]}
              query={query}
              setQuery={setQuery}
            />
          ) : (
            importantItemsText.map((item: any, index: number) => (
              <BubbleItem
                text={item}
                key={index}
                setQuery={setQuery}
                selected={query === item}
              />
            ))
          )}
        </div>
        <div className="flex gap-4 justify-center items-center">
          <strong className="text-[1.75em]">
            {query ? <div>&quot;{query}&quot;</div> : <div>All brands</div>}
          </strong>
          <div className="flex-1">
            {!loading && !error && (
              <div className="text-gray-500 whitespace-nowrap">
                {results.length} results
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="w-full grid place-items-center min-h-[30vh]">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="col-span-3 text-center text-red-500 h-32 grid place-items-center">
              Something went wrong fetching the results. Please try again later.
            </div>
          )}
          {!loading &&
            !error &&
            results.map((result: any, index: number) => (
              <TopCard brand={result} brandPage={false} key={index} />
            ))}
        </div>
      </div>
      <br />
    </div>
  );
}
