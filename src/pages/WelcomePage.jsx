import legs from "../../src/assets/images/legs_cropped.png";
import tan_lines from "../../src/assets/images/tan_lines.png";
import facebook from "../../src/assets/icons/facebook.png";
import instagram from "../../src/assets/icons/instagram.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function LinkDesktop(props) {
  return (
    <NavLink
      to={props.to}
      className="relative flex w-32 justify-center py-1 tracking-widest after:absolute after:-bottom-0 after:left-1/2 after:h-[1px] after:w-16 after:-translate-x-1/2 after:bg-black after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100"
    >
      {props.children}
    </NavLink>
  );
}

function LinkMobile(props) {
  return (
    <NavLink
      to={props.to}
      className="flex w-1/3 justify-center tracking-widest md:text-xl"
    >
      {props.children}
    </NavLink>
  );
}

function Divider() {
  return <div className="h-full w-[1px] bg-black" />;
}

export default function MainPage() {
  const [animationImage, setAnimationImage] = useState(false);
  const [animationText, setAnimationText] = useState(false);

  return (
    <div className="flex max-h-[calc(100dvh-80px)] min-h-[calc(100dvh-80px)] lg:max-h-[100dvh] lg:min-h-[100dvh] lg:flex-row">
      <div
        className={`lg:h-min-full hidden flex-col items-center justify-center gap-7 transition duration-700 lg:flex lg:min-w-[60%] ${
          animationText ? "" : "opacity-0"
        }`}
      >
        <h2 className="text-5xl font-thin tracking-widest">RICLAE</h2>
        <div className="flex gap-1">
          <LinkDesktop to={"/shop"}>SHOP</LinkDesktop>
          <Divider />
          <LinkDesktop to={"/about"}>ABOUT</LinkDesktop>
          <Divider />
          <LinkDesktop to={"/about"}>CONTACT</LinkDesktop>
        </div>
        <div className="flex gap-5">
          <img className="h-5" src={facebook} />
          <img className="h-5" src={instagram} />
        </div>
      </div>
      <div className="hidden items-center overflow-hidden lg:flex lg:w-[40%]">
        <img
          src={legs}
          onLoad={() => {
            setAnimationImage(true);
            setTimeout(() => {
              setAnimationText(true);
            }, 600);
          }}
          className={`w-full object-cover transition duration-500 lg:min-h-screen ${
            !animationImage && "opacity-0"
          }`}
        />
      </div>
      <div className="flex min-h-full w-full flex-col items-center justify-between lg:hidden">
        <div className="flex h-[100%] items-center overflow-hidden px-8 py-4">
          <img
            src={tan_lines}
            onLoad={() => {
              setAnimationImage(true);
              setTimeout(() => {
                setAnimationText(true);
              }, 600);
            }}
            className={`min-h-full object-cover transition duration-500 ${
              !animationImage && "opacity-0"
            }`}
          />
        </div>
        <div
          className={`flex w-full flex-col items-center justify-center gap-5 py-5 transition duration-500 ${
            !animationText && "opacity-0"
          }`}
        >
          <div className="flex w-full max-w-[542px]">
            <LinkMobile to={"/shop"}>SHOP</LinkMobile>
            <Divider />
            <LinkMobile to={"/about"}>ABOUT</LinkMobile>
            <Divider />
            <LinkMobile to={"/shop"}>CONTACT</LinkMobile>
          </div>
          <div className="flex justify-center gap-5">
            <img className="h-5 md:h-6" src={facebook} />
            <img className="h-5 md:h-6" src={instagram} />
          </div>
        </div>
      </div>
    </div>
  );
}
