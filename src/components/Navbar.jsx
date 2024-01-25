import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-16">
      <div className="mx-auto flex h-full w-3/4 items-center justify-between">
        <NavLink className="w-1/3 pb-2 text-5xl font-thin tracking-widest">
          RICLAE
        </NavLink>
        <div className="flex w-1/3">
          <NavLink className="flex h-16 w-1/3 items-center justify-center">
            <div className="tracking-widest">PRODUCTS</div>
          </NavLink>
          <NavLink className="flex h-16 w-1/3 items-center justify-center">
            <div className="mx-auto tracking-widest">ABOUT</div>
          </NavLink>
          <NavLink className="flex h-16 w-1/3 items-center justify-center">
            <div className="mx-auto tracking-widest">CONTACT</div>
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
