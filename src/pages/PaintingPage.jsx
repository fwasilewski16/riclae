import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";
import useFetchSinglePainting from "../hooks/useFetchSinglePainting";
import OriginalCarousel from "../components/OriginalCarousel";
import { useEffect } from "react";

export default function PaintingPage() {
  const dispatch = useDispatch();
  const { type, id } = useParams();
  const [painting, loading, error] = useFetchSinglePainting(type, id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center">
      {loading && (
        <div className="flex h-[calc(100dvh-80px)] items-center">
          <div className="flex h-10 w-[2px] animate-spin rounded-r-xl bg-black"></div>
        </div>
      )}
      {!loading && painting && (
        <div className="flex w-screen flex-col items-center justify-center lg:flex-row">
          <div className="flex h-full max-w-[700px] items-center px-5 lg:max-h-[calc(100dvh-80px)] lg:w-1/2 lg:max-w-full lg:justify-end lg:py-5">
            {<img className="max-h-full object-cover" src={painting.image} />}
            {painting.type === "original" && (
              <OriginalCarousel paintings={painting.images} />
            )}
          </div>
          <div className="flex w-full max-w-[700px] flex-col justify-center gap-6 p-5 lg:w-1/2 lg:max-w-full lg:pl-20">
            <p className="text-2xl font-thin tracking-widest md:text-4xl">
              {painting.name}
            </p>
            <p className="text-lg font-thin tracking-widest md:text-2xl">
              £{painting.price}
            </p>
            {painting.type === "original" && (
              <p className="text-lg font-thin tracking-widest">
                {painting.year}
              </p>
            )}
            <div>
              {painting.type === "print" && (
                <p className="text-lg font-thin tracking-widest">
                  Printed Area - {painting.printedArea}
                </p>
              )}
              {painting.type === "print" && (
                <p className="text-lg font-thin tracking-widest">
                  Print Size - {painting.printSize}
                </p>
              )}
              {painting.type === "original" &&
                painting.additionalInfo.map((info, index) => (
                  <p key={index} className="text-lg font-thin tracking-widest">
                    {info}
                  </p>
                ))}
            </div>
            {painting.numberedSigned && (
              <p className="text-lg font-thin tracking-widest">
                Numbered and signed
              </p>
            )}
            <button
              onClick={() => dispatch(cartActions.addToCart(painting))}
              className="w-fit bg-black px-4 py-3 font-thin tracking-widest text-white"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
