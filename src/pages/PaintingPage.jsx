import { useParams } from "react-router-dom";
import useFetchSinglePainting from "../hooks/useFetchSinglePainting";

export default function PaintingPage() {
  const { type, id } = useParams();
  const [painting, loading, error] = useFetchSinglePainting(type, id);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center bg-[#FAF2F5]">
      {loading && (
        <div className="flex h-80 items-end">
          <div className="flex h-10 w-[2px] animate-spin rounded-r-xl bg-black"></div>
        </div>
      )}
      {!loading && painting && painting.type === "print" && (
        <div className="flex w-screen flex-col items-center justify-center py-5 lg:flex-row lg:py-0">
          <div className="flex h-full max-w-[700px] items-center px-5 lg:max-h-[calc(100dvh-80px)] lg:w-1/2 lg:max-w-full lg:justify-center lg:py-5">
            <img className="h-full object-cover" src={painting.image} />
          </div>
          <div className="my-6 flex h-full w-full max-w-[700px] flex-col justify-center gap-6 px-5 lg:w-1/2 lg:px-5">
            <p className="text-2xl font-thin tracking-widest md:text-4xl">
              {painting.name}
            </p>
            <p className="text-lg font-thin tracking-widest md:text-2xl">
              £{painting.price}
            </p>
            <div>
              {painting.additionalInfo.map((info) => (
                <p className="text-lg font-thin tracking-widest">{info}</p>
              ))}
            </div>
            <div>
              <p className="text-lg font-thin tracking-widest">
                Printed Area - {painting.printedArea}
              </p>
              <p className="text-lg font-thin tracking-widest">
                Print Size - {painting.printSize}
              </p>
            </div>
            {painting.numberedSigned && (
              <p className="text-lg font-thin tracking-widest">
                Numbered and signed
              </p>
            )}
            <button className="w-fit bg-black px-4 py-3 font-thin tracking-widest text-white">
              ADD TO CART
            </button>
          </div>
        </div>
      )}
      {!loading && painting && painting.type === "original" && (
        <div className="flex w-screen pt-9">
          <div className="flex h-full w-1/2 flex-col items-end gap-16">
            {painting.images.map((image) => (
              <img className="h-[700px]" src={image} />
            ))}
          </div>
          <div className="flex h-[700px] w-1/2 flex-col justify-center gap-4 pl-20">
            <p className="text-4xl font-thin tracking-widest">
              {painting.name}
            </p>
            <p className="text-2xl font-thin tracking-widest">
              £{painting.price}
            </p>
            <p className="text-lg font-thin tracking-widest">{painting.year}</p>
            <div>
              {painting.additionalInfo.map((info) => (
                <p className="text-lg font-thin tracking-widest">{info}</p>
              ))}
            </div>
            <p className="text-lg font-thin tracking-widest">{painting.size}</p>
            {painting.numberedSigned && (
              <p className="text-lg font-thin tracking-widest">
                Numbered and signed
              </p>
            )}
            <button className="w-fit bg-black px-4 py-3 font-thin tracking-widest text-white">
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
