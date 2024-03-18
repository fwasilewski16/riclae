import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store";
import useFetchSinglePainting from "../hooks/useFetchSinglePainting";
import OriginalCarousel from "../components/OriginalCarousel";
import { useEffect, useState, Suspense } from "react";
import { useImage } from "react-image";

function OriginalImage(props) {
  const { src } = useImage({
    srcList: props.src,
  });
  return (
    <Suspense>
      <img src={src} className="max-h-full object-cover" />
    </Suspense>
  );
}

export default function PaintingPage() {
  const dispatch = useDispatch();
  const { type, id } = useParams();
  const [fadeIn, setFadeIn] = useState(false);
  const [painting, loading, error] = useFetchSinglePainting(type, id);
  const cartContent = useSelector((state) => state.cart.cart);

  const itemAdded = cartContent.some((item) => item.id === id);

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
            {painting.type === "print" && (
              <OriginalImage src={painting.image} />
            )}
            {painting.type === "original" && (
              <OriginalCarousel paintings={painting.images} />
            )}
          </div>
          <div
            className={`flex w-full max-w-[700px] flex-col justify-center gap-6 p-5 transition duration-700 lg:w-1/2 lg:max-w-full lg:pl-20 ${
              fadeIn ? "" : "translate-y-1 opacity-0"
            }`}
          >
            <p className="font-inter text-3xl font-light tracking-wide md:text-4xl">
              {painting.name}
            </p>
            {painting.type === "original" && (
              <p className="font-inter tracking-wide md:text-xl md:font-light">
                {painting.year}
              </p>
            )}
            <div>
              {painting.type === "print" && (
                <p className="font-inter tracking-wide md:text-xl md:font-light">
                  Printed Area - {painting.printedArea}
                </p>
              )}
              {painting.type === "print" && (
                <p className="font-inter tracking-wide md:text-xl md:font-light">
                  Print Size - {painting.printSize}
                </p>
              )}
              {painting.type === "original" &&
                painting.additionalInfo.map((info, index) => (
                  <p
                    key={index}
                    className="font-inter tracking-wide md:text-xl md:font-light"
                  >
                    {info}
                  </p>
                ))}
            </div>
            {painting.numberedSigned && (
              <p className="font-inter tracking-wide md:text-xl md:font-light">
                Numbered and signed
              </p>
            )}
            <p className="font-inter tracking-wide md:text-xl md:font-light">
              £{painting.price}
            </p>
            {painting.type === "print" ? (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (itemAdded) {
                      dispatch(cartActions.removeFromCart(painting.id));
                    }
                    if (!itemAdded) {
                      dispatch(cartActions.addToCart(painting));
                    }
                    dispatch(cartActions.calculateTotal());
                  }}
                  className="z-10 h-11 w-[134px] overflow-hidden bg-black text-white"
                >
                  <div
                    className={`flex min-h-full items-center justify-center ${
                      itemAdded && "-translate-y-11"
                    } transition-all duration-500`}
                  >
                    <p className="font-inter tracking-wide">ADD TO CART</p>
                  </div>
                  <div
                    className={`flex min-h-full items-center justify-center ${
                      itemAdded && "-translate-y-11"
                    } transition-all duration-500`}
                  >
                    <p className="font-inter tracking-wide">REMOVE</p>
                  </div>
                </button>
                <button
                  className={`h-11 w-[134px] border border-black bg-white font-inter tracking-wide ${
                    itemAdded ? "" : "-translate-x-[150px] opacity-0"
                  } transition-all duration-500`}
                >
                  <NavLink to="/cart">GO TO CART</NavLink>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <p className="tracking-widest">
                  To purchase this original painting, please contact me
                  directly.
                </p>
                <button className="h-11 w-[134px] bg-black tracking-widest text-white">
                  <NavLink to="/contact">CONTACT</NavLink>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
