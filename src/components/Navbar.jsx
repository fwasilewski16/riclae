import { NavLink, useLocation } from "react-router-dom";
import menuIcon from "../assets/icons/menu.png";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <div
      className={`h-[64px]] z-40 flex justify-center bg-[#FAF2F5] py-4 transition duration-500 ${
        location.pathname === "/" ? "-translate-y-[64px]" : "translate-y-0"
      }`}
    >
      <div className="flex h-full w-full items-center justify-between px-6 lg:w-3/4 lg:px-0">
        <NavLink
          to="/"
          className="w-1/3 text-3xl font-thin tracking-widest lg:pb-2 lg:text-4xl"
        >
          RICLAE
        </NavLink>
        <div className="hidden md:flex">
          <NavLink
            to="/shop"
            className="flex h-full w-24 items-center justify-center lg:w-36"
          >
            <div
              className={`relative tracking-widest after:absolute after:-left-0 after:h-[1px] after:bg-black after:transition-all after:duration-700 ${
                location.pathname === "/shop"
                  ? "after:top-[100%] after:w-full"
                  : "after:top-[100%] after:w-full after:opacity-0"
              }`}
            >
              SHOP
            </div>
          </NavLink>
          <NavLink
            to="/about"
            className="flex h-full w-24 items-center justify-center lg:w-36"
          >
            <div
              className={`relative mx-auto tracking-widest after:absolute after:-left-0 after:h-[1px] after:bg-black after:transition-all after:duration-700 ${
                location.pathname === "/about"
                  ? "after:top-[100%] after:w-full"
                  : "after:top-[100%] after:w-full after:opacity-0"
              }`}
            >
              ABOUT
            </div>
          </NavLink>
          <NavLink className="flex h-full w-24 items-center justify-center lg:w-36">
            <div
              className={`relative mx-auto tracking-widest after:absolute after:-left-0 after:h-[1px] after:bg-black after:transition-all after:duration-700 ${
                location.pathname === "/contact"
                  ? "after:top-[100%] after:w-full"
                  : "after:top-[100%] after:w-full after:opacity-0"
              }`}
            >
              CONTACT
            </div>
          </NavLink>
        </div>
        <div className="hidden w-1/3 justify-end md:flex">
          <p className="tracking-widest">CART</p>
          <p className="ml-1">( 0 )</p>
        </div>
        <div className="flex h-1/2 w-full justify-end md:hidden">
          <img src={menuIcon} className="h-[40px]" />
        </div>
      </div>
    </div>
  );
}
