import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import NavbarMenuButton from "../UI/NavbarMenuButton";
import MobileMenu from "../UI/MobileMenu";

function NavbarButton(props) {
  return (
    <NavLink
      to={props.to}
      className="flex h-full w-24 items-center justify-center lg:w-36"
    >
      <div
        className={`relative tracking-widest after:absolute after:-left-0 after:h-[1px] after:bg-black after:transition-all after:duration-700 ${
          location.pathname === props.to
            ? "after:top-[100%] after:w-full"
            : "after:top-[100%] after:w-full after:opacity-0"
        }`}
      >
        {props.children}
      </div>
    </NavLink>
  );
}

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <div
      className={`${
        location.pathname === "/" ? "flex lg:hidden" : "flex"
      } min-h-20 justify-center py-4`}
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
          <NavbarButton to="/shop">SHOP</NavbarButton>
          <NavbarButton to="/about">ABOUT</NavbarButton>
          <NavbarButton to="/contact">CONTACT</NavbarButton>
        </div>
        <div
          className={`hidden w-1/3 justify-end ${
            location.pathname === "/" ? "hidden" : "md:flex"
          }`}
        >
          <p className="tracking-widest">CART</p>
          <p className="ml-1">( 0 )</p>
        </div>
        <NavbarMenuButton setMobileMenuVisible={setMobileMenuVisible} />
      </div>
      {mobileMenuVisible && (
        <MobileMenu setMobileMenuVisible={setMobileMenuVisible} />
      )}
    </div>
  );
}
