import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AboutPage() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 100);
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-124px)] justify-center bg-[#FAF2F5] pt-16 ">
      <div
        className={`flex w-3/4 flex-col items-center justify-center transition duration-700 ${
          animation ? "" : "opacity-0"
        }`}
      >
        <div className="flex justify-center pb-5">
          <h1 className="text-4xl font-thin tracking-widest">ABOUT</h1>
        </div>
        <div className="my-5 flex flex-col items-center gap-9">
          <p className="tracking-wider">Hello!</p>
          <p className="text-center tracking-wider">
            My name is Claire Michaud and I'm a VFX artist who goes by Riclae
            for my paintings. Riclae is an anagram of Claire, it's pretty clever
            and I am still surprised that I don't know any other Claire that had
            the same idea as me so far. Sometimes I doubt that it was a clever
            idea after all but it's too late to change now.
          </p>
          <p className="text-center tracking-wider">
            I am originally from France and studied animation at Supinfocom in
            Arles before I moved to London in 2006. I now work a bit less to be
            able to concentrate more on my passion which is painting if you
            haven't guessed already.
          </p>
          <p className="text-center tracking-wider">
            My main focuses are the colours and the atmosphere of the painting
            that I like peaceful, somehow naive. My inspiration usually comes
            from photos of friends, family and coworkers.
          </p>
        </div>
        <div className="h-[1px] w-20 bg-black" />
        <div className="flex w-1/2 flex-col gap-5 py-5">
          <h2 className="text-lg tracking-wider">EXHIBITIONS</h2>
          <div className="flex flex-col gap-4">
            <NavLink to={"https://elcaf.co.uk/about/2019-2/"}>
              2019___ELCAF___London
            </NavLink>
            <NavLink
              to={
                "https://www.newartistfair.com/10-artists-to-look-out-for---2021"
              }
            >
              2021___ New Artist Fair___London
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
