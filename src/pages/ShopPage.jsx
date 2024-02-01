import { useEffect, useState } from "react";
import useFetchPaintings from "../hooks/useFetchPaintings";
import PaintingSingle from "../components/PaintingSingle";

export default function ShopPage() {
  const [paintingType, setPaintingType] = useState("ALL");

  const [originals, prints, loading, error] = useFetchPaintings();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [paintingType]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-[#FAF2F5]">
      <div className="flex justify-center">
        <div className="mb-8 mt-20 flex w-screen items-center justify-center gap-4 border-b border-t border-black px-4 py-1">
          <button
            onClick={() => {
              setPaintingType("ALL");
            }}
            className={`h-full w-20 gap-4 text-center text-xl font-thin tracking-widest lg:w-60 ${
              paintingType === "ALL" && "bg-white"
            }`}
          >
            ALL
          </button>
          <p className="text-2xl">/</p>
          <button
            onClick={() => {
              setPaintingType("PRINTS");
            }}
            className={`gap-4 text-center text-xl font-thin tracking-widest lg:w-60 ${
              paintingType === "PRINTS" && "bg-white"
            }`}
          >
            PRINTS
          </button>
          <p className="text-2xl">/</p>
          <button
            onClick={() => {
              setPaintingType("ORIGINALS");
            }}
            className={`gap-4 text-center text-xl font-thin tracking-widest lg:w-60  ${
              paintingType === "ORIGINALS" && "bg-white"
            }`}
          >
            ORIGINALS
          </button>
        </div>
      </div>
      {(loading || isLoading) && (
        <div className="flex h-44 items-end">
          <div className="flex h-10 w-[2px] animate-spin rounded-r-xl bg-black"></div>
        </div>
      )}
      {!loading && !isLoading && paintingType === "ALL" && (
        <div className="flex max-w-[900px] flex-wrap lg:max-w-[1400px]">
          {[...prints, ...originals].map((painting) => (
            <PaintingSingle
              key={painting._id}
              image={
                painting.type === "print" ? painting.image : painting.images[0]
              }
              type={painting.type}
            />
          ))}
        </div>
      )}
      {!loading && !isLoading && paintingType === "PRINTS" && (
        <div className="flex max-w-[700px] flex-wrap lg:max-w-[1200px]">
          {prints.map((painting) => (
            <PaintingSingle
              key={painting._id}
              image={painting.image}
              type={painting.type}
            />
          ))}
        </div>
      )}
      {!loading && !isLoading && paintingType === "ORIGINALS" && (
        <div className="flex max-w-[700px] flex-wrap lg:max-w-[1200px]">
          {originals.map((painting) => (
            <PaintingSingle
              key={painting._id}
              image={painting.images[0]}
              type={painting.type}
            />
          ))}
        </div>
      )}
    </div>
  );
}
