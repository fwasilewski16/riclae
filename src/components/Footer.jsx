import facebook from "../../src/assets/icons/facebook.png";
import instagram from "../../src/assets/icons/instagram.png";

export default function Footer() {
  return (
    <div className="flex w-full justify-center gap-5 bg-[#FAF2F5] pb-6 pt-20">
      <img className="h-5" src={facebook} />
      <img className="h-5" src={instagram} />
    </div>
  );
}
