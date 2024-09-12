import { createBrowserRouter } from "react-router-dom";
// import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import SidebarLayout from "../Layout/SidebarLayout";
import Home from "../pages/Home/Home"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout/>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
]);
