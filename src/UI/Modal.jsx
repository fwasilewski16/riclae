import ReactDOM from "react-dom";

function Backdrop() {
  return (
    <div className="absolute left-0 top-0 h-screen w-full bg-black bg-opacity-70"></div>
  );
}
function Content(props) {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {props.children}
    </div>
  );
}

const portalElement = document.getElementById("overlays");

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop>{props.children}</Backdrop>,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <Content>{props.children}</Content>,
        portalElement,
      )}
    </>
  );
}
