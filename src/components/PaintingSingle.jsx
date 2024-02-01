export default function PaintingSingle(props) {
  return (
    <div className="relative flex aspect-square justify-center p-6 lg:w-1/2">
      <div className="flex items-center justify-center">
        <img src={props.image} className="h-full" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 opacity-35 lg:hover:bg-black" />
    </div>
  );
}
