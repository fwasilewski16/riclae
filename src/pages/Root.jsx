import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="bg-[#FAF2F5]">
      <Navbar />
      <Outlet />
    </div>
  );
}
