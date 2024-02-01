import { useState } from "react";
import useFetchPaintings from "../hooks/useFetchPaintings";
import PaintingSingle from "../components/PaintingSingle";

export default function ShopPage() {
  const [paintingType, setPaintingType] = useState("ALL");

  const [originals, prints, loading, error] = useFetchPaintings();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-[#FAF2F5]">
      <div className="flex justify-center">
        <div className="mb-8 mt-28 flex w-screen items-center justify-center gap-4 border-b border-t border-black px-4 py-2">
          <button
            onClick={() => {
              setPaintingType("ALL");
            }}
            className={`w-20 gap-4 text-center text-xl font-thin tracking-widest lg:w-60 ${
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
              paintingType === "PRINTS" && "bg-[#ebccd8]"
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
      <div className="flex max-w-[700px] flex-wrap lg:max-w-[1200px]">
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
    </div>
  );
}
