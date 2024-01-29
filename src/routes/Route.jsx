import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/mainPages/Home/HomePage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
          path:'/',
          element:<HomePage/>,
        },
      ],
    },
    {
        path: "/dashboard",
        element: <AdminLayout/>,
    },
  ]);

export default router