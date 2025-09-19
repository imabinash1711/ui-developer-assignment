import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/main-layout";
import NotFound from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
