import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import AdminPage from "./pages/AdminPage";
import AdminUpdatePage from "./pages/AdminUpdatePage";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import PaintingPage from "./pages/PaintingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:type/:id", element: <PaintingPage /> },
      { path: "/about", element: <AboutPage /> },
    ],
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
