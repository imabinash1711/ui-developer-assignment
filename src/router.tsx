import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import NotFound from "./pages/not-found";
import OrderList from "./pages/order-list";
import Ecommerce from "./pages/e-commerce";

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
      {
        path: "dashboards/eCommerce",
        element: <Ecommerce />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
