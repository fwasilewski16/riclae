export default function NavbarMenuButton(props) {
  return (
    <div
      onClick={() => {
        props.setMobileMenuVisible(true);
      }}
      className={`absolute flex min-h-[48px] w-12 flex-col items-center justify-center transition-all duration-500 ${
        location.pathname === "/" ? "-right-12" : "right-6"
      } md:hidden `}
    >
      <div className="h-[1px] w-10 bg-black" />
      <div className="my-[10px] h-[1px] w-10 bg-black" />
      <div className="h-[1px] w-10 bg-black" />
    </div>
  );
}
