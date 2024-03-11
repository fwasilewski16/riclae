import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fade from "react-slick";

import left from "../assets/icons/left.svg";
import right from "../assets/icons/right.svg";

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-0 top-[50%] z-10 flex -translate-y-[50%] items-center bg-white bg-opacity-50 hover:cursor-pointer lg:left-4"
      onClick={onClick}
    >
      <img src={left} className="h-10 lg:h-16" />
    </div>
  );
}
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 top-[50%] z-10 flex -translate-y-[50%] items-center bg-white bg-opacity-50 hover:cursor-pointer lg:right-4"
      onClick={onClick}
    >
      <img src={right} className="h-10 lg:h-16" />
    </div>
  );
}

export default function OriginalCarousel(props) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="mb-10 w-full max-w-[100vw] lg:mb-0 lg:max-w-[850px] lg:px-10">
      <Fade {...settings}>
        {props.paintings.map((painting) => (
          <div key={painting} className="">
            <img src={painting} className="lg:px-4" />
          </div>
        ))}
      </Fade>
    </div>
  );
}
