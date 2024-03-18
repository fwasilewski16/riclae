import { useEffect, useState } from "react";

export default function ContactPage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: -1, behavior: "smooth" });
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-80px)] justify-center">
      <div
        className={`min-h-full w-[95%] transition-all duration-700 xl:w-1/2 ${
          fadeIn ? "" : "-translate-y-1 opacity-0"
        }`}
      >
        <h2 className="my-10 text-center font-inter text-4xl font-extralight tracking-wide">
          CONTACT ME:
        </h2>
        <form className="flex flex-col">
          <div className="my-4 flex w-full items-center">
            <label
              htmlFor="name"
              className="w-1/2 pl-40 text-left align-middle font-inter text-lg tracking-wide"
            >
              NAME:
            </label>
            <input
              id="name"
              type="text"
              className="w-1/2 rounded-md border border-black py-1 pl-2 font-inter text-lg"
            ></input>
          </div>
          <div className="my-4 flex w-full items-center">
            <label
              htmlFor="emailAddress"
              className="w-1/2 pl-40 text-left font-inter text-lg tracking-wide"
            >
              EMAIL ADDRESS:
            </label>
            <input
              id="emailAddress"
              type="email"
              className="w-1/2 rounded-md border border-black py-1 pl-2 font-inter text-lg"
            ></input>
          </div>
          <div className="my-4 flex w-full">
            <label
              htmlFor="message"
              className="w-1/2 pl-40 text-left font-inter text-lg tracking-wide"
            >
              MESSAGE:
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="15"
              className="w-1/2 rounded-md border border-black py-2 pl-2 font-inter text-xl"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
