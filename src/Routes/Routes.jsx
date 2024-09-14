import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import Friends from "../pages/Friends/Friends";
import ChatList from "../pages/ChatList/ChatList";
import Favourite from "../pages/Favourite/Favourite";
import ChatFeed from "../pages/ChatFeed/ChatFeed";
import About from "../pages/About/About";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

// Define your router
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <SidebarLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <ChatList /> {/* Left side content */}
          </PrivateRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <PrivateRoute>
            <ChatList /> {/* Left side content */}
          </PrivateRoute>
        ),
      },
      {
        path: "friends",
        element: (
          <PrivateRoute>
            <Friends /> {/* Left side content */}
          </PrivateRoute>
        ),
        children: [
          {
            path: ":id", // Right side content
            element: (
              <PrivateRoute>
                <ChatFeed /> {/* Protect the chat feed */}
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "favourite",
        element: (
          <PrivateRoute>
            <Favourite /> {/* Protect favourite */}
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />, // Public route
      },
    ],
  },
  {
    path: "login",
    element: <Login />, // Public route
  },
  {
    path: "signup",
    element: <Signup />, // Public route
  },
]);
