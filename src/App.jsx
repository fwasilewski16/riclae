import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import AdminPage from "./pages/AdminPage";
import AdminUpdatePage from "./pages/AdminUpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [],
  },
  {
    path: "/admin/",
    element: <AdminPage />,
  },
  {
    path: "/admin/update/:type/:id",
    element: <AdminUpdatePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
