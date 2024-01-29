import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
    },
    {
        path: "/dashboard",
        element: <AdminLayout/>,
    },
  ]);

export default router