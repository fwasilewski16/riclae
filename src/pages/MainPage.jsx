import legs from "../../src/assets/images/legs_cropped.png";
import tan_lines from "../../src/assets/images/tan_lines.png";
import facebook from "../../src/assets/icons/facebook.png";
import instagram from "../../src/assets/icons/instagram.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 100);
  }, []);

  return (
    <div className="flex h-[100dvh] flex-col md:flex-row">
      <div
        className={`hidden flex-col items-center justify-center gap-7 transition duration-700 md:flex md:h-full md:w-1/2 2xl:w-3/5 ${
          animation ? "" : "opacity-0"
        }`}
      >
        <h2 className="text-5xl font-thin tracking-widest">RICLAE</h2>
        <div className="flex gap-7">
          <NavLink
            to="/shop"
            className="relative text-lg tracking-widest transition-all after:absolute after:-left-0 after:top-[100%] after:w-full after:bg-black after:transition-all after:duration-700 hover:after:h-[1px]"
          >
            SHOP
          </NavLink>
          <NavLink
            to="/about"
            className="relative text-lg tracking-widest transition-all after:absolute after:-left-0 after:top-[100%] after:w-full after:bg-black after:transition-all after:duration-700 hover:after:h-[1px]"
          >
            ABOUT
          </NavLink>
          <NavLink className="relative text-lg tracking-widest transition-all after:absolute after:-left-0 after:top-[100%] after:w-full after:bg-black after:transition-all after:duration-700 hover:after:h-[1px]">
            CONTACT
          </NavLink>
        </div>
        <div className="flex gap-5">
          <img className="h-5" src={facebook} />
          <img className="h-5" src={instagram} />
        </div>
      </div>
      <div className="hidden items-center overflow-hidden md:flex md:h-screen md:w-1/2 2xl:w-2/5">
        <img src={legs} className="w-full object-cover md:min-h-screen" />
      </div>
      <div className="flex h-full flex-col md:hidden">
        <div className="flex h-[15%] items-center justify-center">
          <h2 className="text-5xl font-thin tracking-widest">RICLAE</h2>
        </div>
        <div className="my-2 flex h-[70%] items-center justify-center overflow-hidden px-5">
          <img src={tan_lines} className="object-cover" />
        </div>
        <div className="flex h-[15%] w-full flex-col items-center justify-center gap-4">
          <div className="flex w-full max-w-[542px]">
            <NavLink
              to="/shop"
              className="flex w-1/3 justify-center text-lg tracking-widest"
            >
              SHOP
            </NavLink>
            <div className="h-full w-[1px] bg-black" />
            <NavLink
              to="/about"
              className="flex w-1/3 justify-center text-lg tracking-widest"
            >
              ABOUT
            </NavLink>
            <div className="h-full w-[1px] bg-black" />
            <NavLink className="flex w-1/3 justify-center text-lg tracking-widest">
              CONTACT
            </NavLink>
          </div>
          <div className="flex justify-center gap-5">
            <img className="h-5" src={facebook} />
            <img className="h-5" src={instagram} />
          </div>
        </div>
      </div>
    </div>
  );
}
