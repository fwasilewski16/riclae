import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";
import useFetchSinglePainting from "../hooks/useFetchSinglePainting";
import OriginalCarousel from "../components/OriginalCarousel";
import { useEffect, useState } from "react";

export default function PaintingPage() {
  const dispatch = useDispatch();
  const { type, id } = useParams();
  const [fadeIn, setFadeIn] = useState(false);
  const [painting, loading, error] = useFetchSinglePainting(type, id);

  useEffect(() => {
    window.scrollTo({ top: -1, behavior: "smooth" });
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  }, [painting, loading, error]);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center">
      {loading && (
        <div className="flex h-[calc(100dvh-80px)] items-center">
          <div className="flex h-10 w-[2px] animate-spin rounded-r-xl bg-black"></div>
        </div>
      )}
      {!loading && painting && (
        <div className="flex w-screen flex-col items-center justify-center lg:flex-row">
          <div
            className={`flex h-full max-w-[700px] items-center transition duration-700 ${
              painting.type === "print" && "px-5"
            } lg:max-h-[calc(100dvh-80px)] lg:w-1/2 lg:max-w-[100dvw] lg:justify-end lg:py-5 ${
              fadeIn ? "" : "-translate-y-1 opacity-0"
            }`}
          >
            {<img className="max-h-full object-cover" src={painting.image} />}
            {painting.type === "original" && (
              <OriginalCarousel paintings={painting.images} />
            )}
          </div>
          <div
            className={`flex w-full max-w-[700px] flex-col justify-center gap-6 p-5 transition duration-700 lg:w-1/2 lg:max-w-full lg:pl-20 ${
              fadeIn ? "" : "translate-y-1 opacity-0"
            }`}
          >
            <p className="text-3xl font-thin tracking-widest md:text-4xl md:font-light">
              {painting.name}
            </p>
            {painting.type === "original" && (
              <p className="text-xl font-thin tracking-widest md:text-4xl md:font-light">
                {painting.year}
              </p>
            )}
            <div>
              {painting.type === "print" && (
                <p className="text-xl font-thin tracking-widest md:text-xl md:font-light">
                  Printed Area - {painting.printedArea}
                </p>
              )}
              {painting.type === "print" && (
                <p className="text-xl font-thin tracking-widest md:text-xl md:font-light">
                  Print Size - {painting.printSize}
                </p>
              )}
              {painting.type === "original" &&
                painting.additionalInfo.map((info, index) => (
                  <p
                    key={index}
                    className="text-xl font-thin tracking-widest md:text-xl md:font-light"
                  >
                    {info}
                  </p>
                ))}
            </div>
            {painting.numberedSigned && (
              <p className="text-xl font-thin tracking-widest md:text-xl md:font-light">
                Numbered and signed
              </p>
            )}
            <p className="text-xl font-thin tracking-widest md:text-xl md:font-light">
              £{painting.price}
            </p>
            <button
              onClick={() => dispatch(cartActions.addToCart(painting))}
              className="w-fit bg-black px-3 py-3 tracking-widest text-white"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
