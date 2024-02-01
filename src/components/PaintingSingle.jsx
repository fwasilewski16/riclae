import { useState } from "react";

export default function PaintingSingle(props) {
  const [fadeIn, setFadeIn] = useState(false);

  return (
    <div className="relative flex justify-center p-6 lg:aspect-square lg:w-1/2">
      <div className="flex items-center justify-center">
        <img
          src={props.image}
          onLoad={() => {
            setTimeout(() => {
              setFadeIn(true);
            }, 200);
          }}
          className={`h-full transition duration-500 ${
            fadeIn ? "" : "-translate-y-1 opacity-0"
          }`}
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 opacity-35 lg:hover:bg-black ${
          fadeIn ? "" : "hidden"
        }`}
      />
    </div>
  );
}
