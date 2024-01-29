import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/mainPages/Home/HomePage";
import ErrorPage from "../pages/sharedPages/Errors/ErrorPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<HomePage/>
        },
      ],
    },
    {
        path: "/dashboard",
        element: <AdminLayout/>,
        errorElement:<ErrorPage/>,
    },
  ]);

export default router