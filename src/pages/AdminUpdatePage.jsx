import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import useFetchSinglePainting from "../hooks/useFetchSinglePainting";
import UpdateOriginal from "../components/UpdateOriginal";
import UpdatePrint from "../components/UpdatePrint";

export default function AdminUpdatePage() {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useAuth0();
  const { type, id } = useParams();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/admin");
    }
  }, []);

  const [painting, loading, error] = useFetchSinglePainting(type, id);

  if (isAuthenticated && type === "original") {
    return (
      <div className="flex h-screen justify-center bg-[#faf2f5]">
        {loading ? (
          <p className="m-auto text-3xl font-thin tracking-wider">
            Loading ...
          </p>
        ) : (
          <div className="flex">
            {painting && painting.type === "original" && (
              <UpdateOriginal painting={painting} />
            )}
          </div>
        )}
      </div>
    );
  }
  if (isAuthenticated && type === "print") {
    return (
      <div className="flex h-screen justify-center bg-[#faf2f5]">
        {loading ? (
          <p className="m-auto text-3xl font-thin tracking-wider">
            Loading ...
          </p>
        ) : (
          <div className="flex">
            {painting && painting.type === "print" && (
              <UpdatePrint painting={painting} />
            )}
          </div>
        )}
      </div>
    );
  }
}
