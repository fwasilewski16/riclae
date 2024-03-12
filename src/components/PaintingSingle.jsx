import { Suspense, useState } from "react";
import { NavLink } from "react-router-dom";
import { useImage } from "react-image";

export default function PaintingSingle(props) {
  const [fadeIn, setFadeIn] = useState(false);
  const [textAnimation, setTextAnimation] = useState(false);
  const [overlayDiabled, setOverlayDisabled] = useState(true);

  const { src } = useImage({
    srcList: props.image,
  });

  return (
    <NavLink
      to={`/shop/${props.type}/${props.id}`}
      onMouseOver={() => {
        setTextAnimation(true);
      }}
      onMouseLeave={() => {
        setTextAnimation(false);
      }}
      className="group relative flex w-full justify-center p-6 lg:aspect-square lg:max-w-[50%]"
    >
      <div className="flex items-center justify-center">
        <Suspense fallback={<p>Loading...</p>}>
          <img
            src={src}
            className={`h-full transition duration-700 ${
              fadeIn ? "" : "-translate-y-1 opacity-0"
            }`}
            onLoad={() => {
              setTimeout(() => {
                setFadeIn(true);
              }, 100);
              setTimeout(() => {
                setOverlayDisabled(false);
              }, 600);
            }}
          />
        </Suspense>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 hidden opacity-0 transition duration-500 ${
          !overlayDiabled && "group-hover:opacity-100"
        } lg:block`}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 bg-black opacity-50 ${
            fadeIn ? "" : "hidden"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center`}
        >
          <p
            className={`text-2xl font-thin uppercase tracking-wider text-white transition duration-500 ease-in-out ${
              !textAnimation && "-translate-y-1"
            }`}
          >
            {props.name}
          </p>
          <p className="text-2xl text-white">-</p>
          <p
            className={`text-2xl font-thin uppercase tracking-wider text-white transition duration-500 ease-in-out ${
              !textAnimation && "translate-y-1"
            }`}
          >
            £ {props.price}
          </p>
        </div>
      </div>
    </NavLink>
  );
}
