import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div
      className={`absolute left-0 right-0 top-0 hidden h-20 ${
        location.pathname === "/" && "hidden"
      }`}
    >
      <div className="mx-auto flex h-full w-3/4 items-center justify-between">
        <NavLink
          to="/"
          className="w-1/3 pb-2 text-5xl font-thin tracking-widest"
        >
          RICLAE
        </NavLink>
        <div className="flex w-1/3">
          <NavLink
            to="/shop"
            className="flex h-20 w-36 items-center justify-center"
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
            className="flex h-20 w-36 items-center justify-center"
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
          <NavLink className="flex h-20 w-36 items-center justify-center">
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
        <div className="w-1/3">
          <div className="flex justify-end">
            <p className="tracking-widest">CART</p>
            <p className="ml-1">( 0 )</p>
          </div>
        </div>
      </div>
    </div>
  );
}
