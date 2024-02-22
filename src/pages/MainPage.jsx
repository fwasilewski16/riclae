import legs from "../../src/assets/images/legs_cropped.png";
import tan_lines from "../../src/assets/images/tan_lines.png";
import facebook from "../../src/assets/icons/facebook.png";
import instagram from "../../src/assets/icons/instagram.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {
  const [animationImage, setAnimationImage] = useState(false);
  const [animationText, setAnimationText] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col bg-[#FAF2F5] lg:flex-row">
      <div
        className={`hidden flex-col items-center justify-center gap-7 transition duration-700 lg:flex lg:h-full lg:min-w-[60%] ${
          animationText ? "" : "opacity-0"
        }`}
      >
        <h2 className="text-5xl font-thin tracking-widest">RICLAE</h2>
        <div className="flex gap-1">
          <NavLink
            to="/shop"
            className="relative flex w-32 justify-center tracking-widest after:absolute after:left-1/2 after:top-[110%] after:h-[1px] after:w-16 after:-translate-x-1/2 after:bg-black after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100"
          >
            SHOP
          </NavLink>
          <div className="h-full w-[1px] bg-black" />
          <NavLink
            to="/about"
            className="relative flex w-32 justify-center tracking-widest after:absolute after:left-1/2 after:top-[110%] after:h-[1px] after:w-20 after:-translate-x-1/2 after:bg-black after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100"
          >
            ABOUT
          </NavLink>
          <div className="h-full w-[1px] bg-black" />
          <NavLink className="relative flex w-32 justify-center tracking-widest after:absolute after:left-1/2 after:top-[110%] after:h-[1px] after:w-24 after:-translate-x-1/2 after:bg-black after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100">
            CONTACT
          </NavLink>
        </div>
        <div className="flex gap-5">
          <img className="h-5" src={facebook} />
          <img className="h-5" src={instagram} />
        </div>
      </div>
      <div className="hidden items-center overflow-hidden lg:flex lg:w-[40%]">
        <img
          src={legs}
          onLoad={() => {
            setAnimationImage(true);
            setTimeout(() => {
              setAnimationText(true);
            }, 600);
          }}
          className={`w-full object-cover transition duration-500 lg:min-h-screen ${
            !animationImage && "opacity-0"
          }`}
        />
      </div>
      <div className="flex h-full flex-col lg:hidden">
        <div className="flex h-[10%] items-center justify-center">
          <h2 className="text-4xl font-thin tracking-widest md:text-5xl">
            RICLAE
          </h2>
        </div>
        <div className="my-2 flex h-[70%] items-center justify-center overflow-hidden px-5">
          <img
            src={tan_lines}
            onLoad={() => {
              setAnimationImage(true);
              setTimeout(() => {
                setAnimationText(true);
              }, 600);
            }}
            className={`object-cover transition duration-500 ${
              !animationImage && "opacity-0"
            }`}
          />
        </div>
        <div
          className={`flex h-[20%] w-full flex-col items-center justify-center gap-6 transition duration-500 ${
            !animationText && "opacity-0"
          }`}
        >
          <div className="flex w-full max-w-[542px]">
            <NavLink
              to="/shop"
              className="flex w-1/3 justify-center tracking-widest md:text-xl"
            >
              SHOP
            </NavLink>
            <div className="h-full w-[1px] bg-black" />
            <NavLink
              to="/about"
              className="flex w-1/3 justify-center tracking-widest md:text-xl"
            >
              ABOUT
            </NavLink>
            <div className="h-full w-[1px] bg-black" />
            <NavLink className="flex w-1/3 justify-center tracking-widest md:text-xl">
              CONTACT
            </NavLink>
          </div>
          <div className="flex justify-center gap-5">
            <img className="h-6" src={facebook} />
            <img className="h-6" src={instagram} />
          </div>
        </div>
      </div>
    </div>
  );
}
