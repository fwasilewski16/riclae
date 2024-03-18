import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AboutPage() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 300);
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center">
      <div
        className={`flex w-[85%] max-w-[640px] flex-col items-center transition-all duration-700 md:max-w-[800px] ${
          animation ? "" : "opacity-0"
        }`}
      >
        <h1 className="my-10 text-center font-inter text-4xl font-extralight tracking-wide">
          ABOUT
        </h1>
        <div className="flex flex-col items-center gap-6">
          <p className="font-inter tracking-wide">Hello!</p>
          <p className="text-center font-inter text-sm tracking-wide md:text-base">
            My name is Claire Michaud and I'm a VFX artist who goes by Riclae
            for my paintings. Riclae is an anagram of Claire, it's pretty clever
            and I am still surprised that I don't know any other Claire that had
            the same idea as me so far. Sometimes I doubt that it was a clever
            idea after all but it's too late to change now.
          </p>
          <p className="text-center font-inter text-sm tracking-wide md:text-base">
            I am originally from France and studied animation at Supinfocom in
            Arles before I moved to London in 2006. I now work a bit less to be
            able to concentrate more on my passion which is painting if you
            haven't guessed already.
          </p>
          <p className="text-center font-inter text-sm tracking-wide md:text-base">
            My main focuses are the colours and the atmosphere of the painting
            that I like peaceful, somehow naive. My inspiration usually comes
            from photos of friends, family and coworkers.
          </p>
        </div>
        <div className="my-10 h-[1px] w-20 bg-black" />
        <div className="flex w-full flex-col gap-4">
          <h2 className="font-inter tracking-wide">EXHIBITIONS:</h2>
          <div className="flex flex-col gap-4">
            <NavLink
              to={"https://elcaf.co.uk/about/2019-2/"}
              className="font-inter text-sm md:text-base"
            >
              2019___ELCAF___London
            </NavLink>
            <NavLink
              to={
                "https://www.newartistfair.com/10-artists-to-look-out-for---2021"
              }
              className="font-inter text-sm md:text-base"
            >
              2021___ New Artist Fair___London
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
