import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import Friends from "../pages/Friends/Friends";
import ChatList from "../pages/ChatList/ChatList";
import Favourite from "../pages/Favourite/Favourite";
import ChatFeed from "../pages/ChatFeed/ChatFeed";
import About from "../pages/About/About";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";

// Define your router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <ChatList />, // Left side content
      },
      {
        path: "chat",
        element: <ChatList />, // Left side content
      },
      {
        path: "friends",
        element: <Friends />, // Left side content
        children: [
          {
            path: ":id", // Right side content
            element: <ChatFeed />,
          },
        ],
      },
      {
        path: "favourite",
        element: <Favourite />,
      },
      {
        path: "about",
        element: <About />,
      },
      
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);
