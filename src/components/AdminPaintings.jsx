import { NavLink } from "react-router-dom";
import useFetchPaintings from "../hooks/useFetchPaintings";

function Painting(props) {
  return (
    <div className="my-4 flex h-24 items-center justify-between rounded-lg bg-white pr-8">
      <div className="flex items-center gap-4">
        <div className="min-w-[100px]">
          <img src={props.image} className="mx-auto h-20 rounded-lg border" />
        </div>
        <p className="text-xl font-thin tracking-wider">{props.name}</p>
      </div>
      <div className="flex gap-8">
        <button className="w-24 rounded-lg bg-sky-500 text-lg tracking-widest text-white shadow-lg">
          <NavLink to={`/admin/update/${props.type}/${props._id}`}>
            EDIT
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default function AdminPaintings() {
  const [originals, prints, loading, error] = useFetchPaintings();

  if (loading) {
    return (
      <div className="mt-20 h-full">
        <p className="text-3xl font-thin tracking-wider">Loading . . .</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 h-full">
        <p className="text-3xl font-thin tracking-wider">{error}.</p>
      </div>
    );
  }

  if (!loading && error === null) {
    return (
      <div className="mt-12 w-2/4">
        {originals.length > 0 && (
          <div className="my-8">
            <h3 className="mb-4 text-3xl font-thin tracking-wider">
              Originals:
            </h3>
            {originals.map((painting) => (
              <Painting
                name={painting.name}
                key={painting._id}
                image={painting.images[0]}
                _id={painting._id}
                type={painting.type}
              />
            ))}
          </div>
        )}
        {prints.length > 0 && (
          <div className="my-8">
            <h3 className="mb-4 text-3xl font-thin tracking-wider">Prints:</h3>
            {prints.map((painting) => (
              <Painting
                name={painting.name}
                key={painting._id}
                image={painting.image}
                _id={painting._id}
                type={painting.type}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
