import { NavLink, useLocation } from "react-router-dom";
import menuIcon from "../assets/icons/menu.png";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <div
      className={`${
        location.pathname === "/" ? "flex lg:hidden" : "flex"
      } min-h-[80px] justify-center py-4`}
    >
      <div className="relative flex min-h-full w-full items-center justify-end overflow-x-hidden px-6 lg:w-3/4 lg:px-0">
        <NavLink
          to="/"
          className={`${
            location.pathname === "/"
              ? "left-1/2 -translate-x-1/2"
              : "left-6 translate-x-0"
          } absolute pb-1 text-4xl font-thin tracking-widest transition-all duration-500 md:transition-none`}
        >
          RICLAE
        </NavLink>
        <div
          className={`${
            location.pathname === "/" ? "hidden" : "hidden md:flex"
          } w-1/3 `}
        >
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
        <div
          className={`hidden w-1/3 justify-end ${
            location.pathname === "/" ? "hidden" : "md:flex"
          }`}
        >
          <p className="tracking-widest">CART</p>
          <p className="ml-1">( 0 )</p>
        </div>
        <div
          className={`absolute flex min-h-[48px] w-12 flex-col justify-center transition-all duration-500 ${
            location.pathname === "/" ? "-right-12" : "right-6"
          } md:hidden `}
        >
          <div className="h-[2px] w-10 bg-black" />
          <div className="my-[10px] h-[2px] w-10 bg-black" />
          <div className="h-[2px] w-10 bg-black" />
        </div>
      </div>
    </div>
  );
}
