// src/Routes/Routes.jsx - FINAL SOLUTION for 3-Layer Structure
import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import ChatList from "../pages/ChatList/ChatList";
import Favourite from "../pages/Favourite/Favourite";
import About from "../pages/About/About";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Room from "../pages/Room/Room";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <SidebarLayout />
      </PrivateRoute>
    ),
    children: [
      // Default route
      {
        path: "/",
        element: (
          <PrivateRoute>
            <ChatList />
          </PrivateRoute>
        ),
      },
      // Chat routes - Layer 2 and Layer 3
      {
        path: "chat",
        element: (
          <PrivateRoute>
            <ChatList /> {/* This always shows on the left */}
          </PrivateRoute>
        ),
      },
      {
        path: "chat/:id", // This shows ChatList on left + ChatFeed on right (desktop)
        element: (
          <PrivateRoute>
            <ChatList /> {/* Left panel - always shows */}
          </PrivateRoute>
        ),
      },
      // Room routes - Layer 2 and Layer 3  
      {
        path: "room",
        element: (
          <PrivateRoute>
            <Room /> {/* This always shows on the left */}
          </PrivateRoute>
        ),
      },
      {
        path: "room/:roomId", // This shows Room on left + RoomChatFeed on right (desktop)
        element: (
          <PrivateRoute>
            <Room /> {/* Left panel - always shows */}
          </PrivateRoute>
        ),
      },
      // Favourite routes - Layer 2 and Layer 3
      {
        path: "favourite",
        element: (
          <PrivateRoute>
            <Favourite /> {/* This always shows on the left */}
          </PrivateRoute>
        ),
      },
      {
        path: "favourite/:friendId", // This shows Favourite on left + FavouritedChatFeed on right (desktop)
        element: (
          <PrivateRoute>
            <Favourite /> {/* Left panel - always shows */}
          </PrivateRoute>
        ),
      },
      // FAQ route
      {
        path: "faq",
        element: <About />,
      },
    ],
  },
  // Authentication routes
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);