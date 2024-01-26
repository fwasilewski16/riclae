import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="flex h-screen flex-col justify-between bg-[#FAF2F5]">
      <Navbar />
      <Outlet />
    </div>
  );
}
