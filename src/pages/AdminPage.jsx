import { useAuth0 } from "@auth0/auth0-react";
import AddOriginal from "../components/AddOriginal";
import AddPrint from "../components/AddPrint";
import { useState } from "react";
import AdminPaintings from "../components/AdminPaintings";

export default function AdminPage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const [addOriginal, setAddOriginal] = useState(false);
  const [addPrint, setAddPrint] = useState(false);

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#faf2f5] p-6">
        <button
          onClick={() => loginWithRedirect()}
          className="h-10 w-28 rounded-lg bg-blue-500 text-lg tracking-widest text-white"
        >
          LOG IN
        </button>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex h-screen flex-col items-center bg-[#faf2f5]">
        {addOriginal && (
          <AddOriginal
            closeModal={() => {
              setAddOriginal(false);
            }}
          />
        )}
        {addPrint && (
          <AddPrint
            closeModal={() => {
              setAddPrint(false);
            }}
          />
        )}
        <div className="flex w-full justify-end gap-6 p-6">
          <div>
            <button
              onClick={() =>
                logout({ returnTo: import.meta.env.VITE_SERVER_REDIRECT_URL })
              }
              className="h-10 w-28 rounded-lg bg-blue-500 text-lg tracking-widest text-white shadow-lg"
            >
              LOGOUT
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <h2 className="mb-10 text-5xl font-thin tracking-widest">
            Hello Claire
          </h2>
          <div className="flex w-1/3 justify-between">
            <button
              className="h-10 w-44 rounded-lg bg-blue-500 text-lg tracking-widest text-white shadow-lg"
              onClick={() => {
                setAddOriginal(true);
              }}
            >
              ADD ORIGINAL
            </button>
            <button
              className="h-10 w-44 rounded-lg bg-blue-500 text-lg tracking-widest text-white shadow-lg"
              onClick={() => {
                setAddPrint(true);
              }}
            >
              ADD PRINT
            </button>
          </div>
        </div>
        <AdminPaintings updateOriginal={() => setUpdateOriginal(true)} />
      </div>
    );
  }
}
