import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/mainPages/Home/HomePage";
import ErrorPage from "../pages/sharedPages/Errors/ErrorPage";
import AccessoriesPage from "../pages/mainPages/Accessories/AccessoriesPage";
import CategoryPage from "../pages/adminpages/Category/CategoryPage";


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
        {
          path:'/accessories',
          element:<AccessoriesPage/>
        },
      ],
    },
    {
        path: "/dashboard",
        element: <AdminLayout/>,
        errorElement:<ErrorPage/>,
        children:[
          {
            path:'/dashboard/category',
            element:<CategoryPage/>,
          }
        ]
    },
  ]);

export default router