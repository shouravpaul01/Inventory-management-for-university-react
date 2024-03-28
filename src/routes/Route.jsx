import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ErrorPage from "../pages/sharedPages/Errors/ErrorPage";
import AccessoriesPage from "../pages/mainPages/Accessories/AccessoriesPage";
import CategoryPage from "../pages/adminpages/Category/CategoryPage";
import SubCategoryPage from "../pages/adminpages/SubCategory/SubCategoryPage";
import ConfirmAccessoriesPage from "../pages/mainPages/Accessories/ConfirmAccessoriesPage";
import SignInAndUpPage from "../pages/sharedPages/SignInAndUp/SignInAndUpPage";
import PrivateRoute from "./PrivateRoute";
import UserPage from "../pages/adminpages/User/UserPage";
import MyOrderPage from "../pages/mainPages/Order/MyOrderPage";
import OrderPage from "../pages/adminpages/Order/OrderPage";
import ReturnedAccessoriesPage from "../pages/adminpages/returnedAccessories/ReturnedAccessoriesPage";
import RolePage from "../pages/adminpages/Role/RolePage";
import SuperAdminRoute from "./SuperAdminRoute";
import HomeDashboard from "../pages/adminpages/Home/HomeDashboard";
import AllAccessoriesPage from "../pages/adminpages/Accessories/AllAccessoriesPage";
import DistributesPage from "../pages/adminpages/Distributes/DistributesPage";
import ConfirmDistributeAccessoriesPage from "../pages/mainPages/Accessories/ConfirmDistributeAccessoriesPage";
import MyAccessoriesPage from "../pages/mainPages/MyAccessories/MyAccessoriesPage";




const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute roles={['Super-admin','Admin','User']}><MainLayout/></PrivateRoute>,
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
        {
          path:'/confirm-distribute-accessories',
          element:<ConfirmDistributeAccessoriesPage/>
        },
        {
          path:'/my-accessories',
          element:<MyAccessoriesPage/>
        },
      ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute roles={['Super-admin','Admin']}><AdminLayout/></PrivateRoute>,
        errorElement:<ErrorPage/>,
        children:[
          {
            path:'/dashboard',
            element:<HomeDashboard/>,
          },
          {
            path:'/dashboard/role',
            element:<SuperAdminRoute roles={['Super-admin']}><RolePage/></SuperAdminRoute>,
          },
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
            path:'/dashboard/accessories',
            element:<AllAccessoriesPage/>,
          },
          {
            path:'/dashboard/distributes',
            element:<DistributesPage/>,
          },
          {
            path:'/dashboard/orders',
            element:<OrderPage/>,
          },
          {
            path:'/dashboard/retured-accessories',
            element:<ReturnedAccessoriesPage/>,
          },
        ]
    },
    {
        path:'/sign',
        element:<SignInAndUpPage/>
    }
  ]);

export default router