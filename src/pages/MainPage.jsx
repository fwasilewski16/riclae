import legs from "../../src/assets/images/legs_cropped.png";
import green_hat from "../../src/assets/images/green_hat.png";
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
    <div className="flex h-screen flex-col lg:flex-row">
      <div
        className={`z-50 hidden flex-col items-center justify-center gap-7 transition duration-700 lg:flex lg:h-screen lg:w-1/2 2xl:w-3/5 ${
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
      <div className="hidden items-center overflow-hidden lg:flex lg:h-screen lg:w-1/2 2xl:w-2/5">
        <img src={legs} className="w-full object-cover lg:min-h-screen" />
      </div>
      <div className="flex h-screen flex-col justify-between py-8 lg:hidden">
        <div className="flex items-center justify-center">
          <h2 className="text-5xl font-thin tracking-widest">RICLAE</h2>
        </div>
        <div className="p-10">
          <img src={green_hat} />
        </div>
        <div className="flex flex-col justify-evenly gap-4">
          <div className="flex justify-center gap-5">
            <NavLink to="/shop" className="text-lg tracking-widest">
              SHOP
            </NavLink>
            <NavLink to="/about" className="text-lg tracking-widest">
              ABOUT
            </NavLink>
            <NavLink className="text-lg tracking-widest">CONTACT</NavLink>
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
