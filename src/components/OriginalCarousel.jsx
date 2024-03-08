import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fade from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        background: "#FAF2F5",
        height: "100%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        background: "#FAF2F5",
        height: "100%",
      }}
      onClick={onClick}
    />
  );
}

export default function OriginalCarousel(props) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-full max-w-[100dvw] p-10 lg:max-w-[850px]">
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
