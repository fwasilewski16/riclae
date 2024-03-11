import { useState } from "react";
import useFetchPaintings from "../hooks/useFetchPaintings";
import PaintingSingle from "../components/PaintingSingle";

export default function ShopPage() {
  const [paintingType, setPaintingType] = useState("ALL");

  const [originals, prints, loading, error] = useFetchPaintings();

  return (
    <div className="flex min-h-[calc(100dvh-140px)] flex-col items-center overflow-x-hidden bg-[#FAF2F5]">
      <div className="flex justify-center">
        <div className="mb-8 flex max-w-[100vw] items-center justify-center gap-4 px-6 py-[1px] pt-4">
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
      {loading && (
        <div className="flex h-44 items-end">
          <div className="flex h-10 w-[2px] animate-spin rounded-r-xl bg-black"></div>
        </div>
      )}
      {!loading && paintingType === "ALL" && (
        <div className="flex max-w-[700px] flex-wrap lg:max-w-[1400px]">
          {[...prints, ...originals].map((painting) => (
            <PaintingSingle
              key={painting._id}
              image={
                painting.type === "print" ? painting.image : painting.images[0]
              }
              type={painting.type}
              name={painting.name}
              price={painting.price}
              id={painting.id}
            />
          ))}
        </div>
      )}
      {!loading && paintingType === "PRINTS" && (
        <div className="flex max-w-[700px] flex-wrap lg:max-w-[1200px]">
          {prints.map((painting) => (
            <PaintingSingle
              key={painting._id}
              image={painting.image}
              type={painting.type}
              name={painting.name}
              price={painting.price}
              id={painting.id}
            />
          ))}
        </div>
      )}
      {!loading && paintingType === "ORIGINALS" && (
        <div className="flex max-w-[700px] flex-wrap lg:max-w-[1200px]">
          {originals.map((painting) => (
            <PaintingSingle
              key={painting._id}
              image={painting.images[0]}
              type={painting.type}
              name={painting.name}
              price={painting.price}
              id={painting.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
