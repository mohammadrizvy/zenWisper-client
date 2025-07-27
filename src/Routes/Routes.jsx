// src/Routes/Routes.jsx - Updated for Mobile Navigation
import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import ChatList from "../pages/ChatList/ChatList";
import Favourite from "../pages/Favourite/Favourite";
import About from "../pages/About/About";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Room from "../pages/Room/Room";
import RoomChatFeed from "../pages/ChatFeed/RoomChatFeed/RoomChatFeed";
import FavouritedChatFeed from "../pages/ChatFeed/FriendChatFeed/FriendChatFeed";
import ChatFeed from "../pages/ChatFeed/ChatFeed/ChatFeed";

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
            <ChatList />
          </PrivateRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <PrivateRoute>
            <ChatList />
          </PrivateRoute>
        ),
      },
      // Mobile-specific route for individual chats
      {
        path: "chat/:id",
        element: (
          <PrivateRoute>
            <div className="md:hidden w-full h-screen">
              <ChatFeed />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "room",
        element: (
          <PrivateRoute>
            <Room />
          </PrivateRoute>
        ),
      },
      // Mobile-specific route for room chats
      {
        path: "room/:roomId",
        element: (
          <PrivateRoute>
            <div className="md:hidden w-full h-screen">
              <RoomChatFeed />
            </div>     
          </PrivateRoute>
        ),
      },
      {
        path: "favourite",
        element: (
          <PrivateRoute>
            <Favourite />
          </PrivateRoute>
        ),
      },
      // Mobile-specific route for favourite chats
      {
        path: "favourite/:friendId",
        element: (
          <PrivateRoute>
            <div className=" w-full h-screen">
              <FavouritedChatFeed />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "faq",
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