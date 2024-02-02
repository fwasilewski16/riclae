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
          className="h-10 w-28 rounded-lg bg-sky-500 text-lg tracking-widest text-white"
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
        <div className="flex w-full justify-end p-6">
          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: `${window.location.origin}/admin`,
                },
              })
            }
            className="h-10 w-28 min-w-[112px] rounded-lg bg-sky-500 text-lg tracking-widest text-white shadow-lg"
          >
            LOGOUT
          </button>
        </div>
        <div className="flex w-full min-w-[287px] flex-col items-center">
          <h2 className="mb-10 text-5xl font-thin tracking-widest">
            Hello Claire
          </h2>
          <div className="flex w-[500px] justify-between">
            <button
              className="h-10 w-44 rounded-lg bg-sky-500 text-lg tracking-widest text-white shadow-lg"
              onClick={() => {
                setAddOriginal(true);
              }}
            >
              ADD ORIGINAL
            </button>
            <button
              className="h-10 w-44 rounded-lg bg-sky-500 text-lg tracking-widest text-white shadow-lg"
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
