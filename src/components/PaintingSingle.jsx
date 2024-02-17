import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function PaintingSingle(props) {
  const [fadeIn, setFadeIn] = useState(false);
  const [textAnimation, setTextAnimation] = useState(false);

  return (
    <NavLink
      to={`/shop/${props.type}/${props.id}`}
      onMouseOver={() => {
        setTextAnimation(true);
      }}
      onMouseLeave={() => {
        setTextAnimation(false);
      }}
      className="group relative flex justify-center p-6 lg:aspect-square lg:w-1/2"
    >
      <div className="flex items-center justify-center">
        <img
          src={props.image}
          onLoad={() => {
            setTimeout(() => {
              setFadeIn(true);
            }, 1);
          }}
          className={`h-full transition duration-500 ${
            fadeIn ? "" : "-translate-y-1 opacity-0"
          }`}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 hidden opacity-0 transition duration-200 group-hover:opacity-100 lg:block">
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 bg-black opacity-50 ${
            fadeIn ? "" : "hidden"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center`}
        >
          <p
            className={`text-2xl font-thin uppercase tracking-wider text-white transition duration-200 ease-in-out ${
              !textAnimation && "-translate-y-4"
            }`}
          >
            {props.name}
          </p>
          <p className="text-2xl text-white">-</p>
          <p
            className={`text-2xl font-thin uppercase tracking-wider text-white transition duration-200 ease-in-out ${
              !textAnimation && "translate-y-4"
            }`}
          >
            £ {props.price}
          </p>
        </div>
      </div>
    </NavLink>
  );
}
