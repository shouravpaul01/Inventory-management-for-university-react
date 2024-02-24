import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ErrorPage from "../pages/sharedPages/Errors/ErrorPage";
import AccessoriesPage from "../pages/mainPages/Accessories/AccessoriesPage";
import CategoryPage from "../pages/adminpages/Category/CategoryPage";
import SubCategoryPage from "../pages/adminpages/SubCategory/SubCategoryPage";
import ProductPage from "../pages/adminpages/Product/ProductPage";
import ConfirmAccessoriesPage from "../pages/mainPages/Accessories/ConfirmAccessoriesPage";
import SignInAndUpPage from "../pages/sharedPages/SignInAndUp/SignInAndUpPage";
import PrivateRoute from "./PrivateRoute";
import UserPage from "../pages/adminpages/User/UserPage";
import MyOrderPage from "../pages/mainPages/Order/MyOrderPage";
import OrderPage from "../pages/adminpages/Order/OrderPage";



const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><MainLayout/></PrivateRoute>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<AccessoriesPage/>
        },
        {
          path:'/accessories',
          element:<AccessoriesPage/>
        },
        {
          path:'/confirm-accessories',
          element:<ConfirmAccessoriesPage/>
        },
        {
          path:'/my-order',
          element:<MyOrderPage/>
        },
      ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><AdminLayout/></PrivateRoute>,
        errorElement:<ErrorPage/>,
        children:[
          {
            path:'/dashboard/user',
            element:<UserPage/>,
          },
          {
            path:'/dashboard/category',
            element:<CategoryPage/>,
          },
          {
            path:'/dashboard/sub-category',
            element:<SubCategoryPage/>,
          },
          {
            path:'/dashboard/product',
            element:<ProductPage/>,
          },
          {
            path:'/dashboard/orders',
            element:<OrderPage/>,
          },
        ]
    },
    {
        path:'/sign',
        element:<SignInAndUpPage/>
    }
  ]);

export default router