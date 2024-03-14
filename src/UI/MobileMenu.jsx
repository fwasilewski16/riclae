import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MobileMenu(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const cartContent = useSelector((state) => state.cart.cart);

  useEffect(() => {
    setTimeout(() => {
      setMenuVisible(true);
    }, 100);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-10 flex h-screen flex-col items-center backdrop-blur-xl transition duration-500 ${
        !menuVisible && "opacity-0"
      }`}
    >
      <div className="flex h-20 w-full justify-between bg-[#FAF2F5] pl-6">
        <p className="flex h-20 items-center justify-center tracking-widest">
          CART ( {cartContent.length} )
        </p>
        <div
          onClick={() => {
            setMenuVisible(false);
            setTimeout(() => {
              props.setMobileMenuVisible(false);
            }, 500);
          }}
          className="mr-6 mt-4 flex size-12 items-center justify-center"
        >
          <div className="h-10 w-[1px] rotate-45 rounded-lg bg-black" />
          <div className="h-10 w-[1px] -rotate-45 rounded-lg bg-black" />
        </div>
      </div>
      <div className="mt-10 h-[1px] w-1/2 bg-black" />
      <NavLink
        to="/shop"
        onClick={() => {
          setMenuVisible(false);
          setTimeout(() => {
            props.setMobileMenuVisible(false);
          }, 500);
        }}
        className="flex h-20 items-center justify-center text-2xl tracking-widest"
      >
        SHOP
      </NavLink>
      <div
        onClick={() => {
          setMenuVisible(false);
          setTimeout(() => {
            props.setMobileMenuVisible(false);
          }, 500);
        }}
        className="h-[1px] w-1/2 bg-black"
      />
      <NavLink
        to="/about"
        onClick={() => {
          setMenuVisible(false);
          setTimeout(() => {
            props.setMobileMenuVisible(false);
          }, 500);
        }}
        className="flex h-20 items-center justify-center text-2xl tracking-widest"
      >
        ABOUT
      </NavLink>
      <div className="h-[1px] w-1/2 bg-black" />
      <NavLink
        onClick={() => {
          setMenuVisible(false);
          setTimeout(() => {
            props.setMobileMenuVisible(false);
          }, 500);
        }}
        to="/contact"
        className="flex h-20 items-center justify-center text-2xl tracking-widest"
      >
        CONTACT
      </NavLink>
      <div className="h-[1px] w-1/2 bg-black" />
    </div>
  );
}
