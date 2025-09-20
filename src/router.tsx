import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import NotFound from "./pages/not-found";
import OrderList from "./pages/order-list";

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
        element: <OrderList />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
