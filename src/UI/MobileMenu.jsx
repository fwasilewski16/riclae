import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileMenu(props) {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMenuVisible(true);
    }, 100);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-10 flex h-screen flex-col items-center backdrop-blur-lg transition duration-500 ${
        !menuVisible && "opacity-0"
      }`}
    >
      <div className="flex h-20 w-full justify-end">
        <div
          onClick={() => {
            setMenuVisible(false);
            setTimeout(() => {
              props.setMobileMenuVisible(false);
            }, 500);
          }}
          className="mr-6 mt-4 flex size-12 items-center justify-center"
        >
          <div className="h-full w-[2px] rotate-45 rounded-lg bg-black" />
          <div className="h-full w-[2px] -rotate-45 rounded-lg bg-black" />
        </div>
      </div>
      <NavLink className="flex h-20 items-center justify-center text-2xl tracking-widest">
        SHOP
      </NavLink>
      <div className="h-[1px] w-1/2 bg-black" />
      <NavLink className="flex h-20 items-center justify-center text-2xl tracking-widest">
        ABOUT
      </NavLink>
      <div className="h-[1px] w-1/2 bg-black" />
      <NavLink className="flex h-20 items-center justify-center text-2xl tracking-widest">
        CONTACT
      </NavLink>
    </div>
  );
}
