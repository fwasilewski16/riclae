import legs from "../../src/assets/images/legs_cropped.png";
import tan_lines from "../../src/assets/images/tan_lines.png";
import facebook from "../../src/assets/icons/facebook.png";
import instagram from "../../src/assets/icons/instagram.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function LinkDesktop(props) {
  return (
    <NavLink
      to={props.to}
      className="font-inter relative flex w-32 justify-center py-1 tracking-wide after:absolute after:-bottom-0 after:left-1/2 after:h-[1px] after:w-16 after:-translate-x-1/2 after:bg-black after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100"
    >
      {props.children}
    </NavLink>
  );
}

function LinkMobile(props) {
  return (
    <NavLink
      to={props.to}
      className="font-inter flex w-1/3 justify-center font-light tracking-wide md:text-xl"
    >
      {props.children}
    </NavLink>
  );
}

function Divider() {
  return <div className="h-[24px] w-[2px] bg-black" />;
}

function WelcomePageMobile() {
  const [animationImage, setAnimationImage] = useState(false);
  const [animationText, setAnimationText] = useState(false);
  return (
    <div className="flex max-h-[calc(100dvh-80px)] min-h-[calc(100dvh-80px)] flex-col justify-between px-5">
      <div className="flex h-full max-h-full min-h-full grow justify-center  py-4">
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
        <div className="flex w-full max-w-[415px]">
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
  );
}

function WelcomePageDesktop() {
  const [animationImage, setAnimationImage] = useState(false);
  const [animationText, setAnimationText] = useState(false);
  return (
    <div className="flex max-h-[100dvh] min-h-[100dvh] flex-row">
      <div
        className={`flex min-w-[60%] flex-col items-center justify-center gap-7 transition duration-700 ${
          animationText ? "" : "opacity-0"
        }`}
      >
        <h2 className="font-inter text-5xl font-extralight tracking-wide">
          RICLAE
        </h2>
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
      <div className="flex w-[40%] items-center overflow-hidden">
        <img
          src={legs}
          onLoad={() => {
            setAnimationImage(true);
            setTimeout(() => {
              setAnimationText(true);
            }, 600);
          }}
          className={`min-h-screen w-full object-cover transition duration-500 ${
            !animationImage && "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

export default function MainPage() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

    return () =>
      removeEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  if (screenWidth < 1024) {
    return <WelcomePageMobile />;
  }
  if (screenWidth >= 1024) {
    return <WelcomePageDesktop />;
  }
}
