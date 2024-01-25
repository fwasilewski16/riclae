import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="flex h-screen flex-col justify-between bg-[#faf2f5]">
      <Navbar />
      <Outlet />
    </div>
  );
}
