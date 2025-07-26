// src/Routes/Routes.jsx - Updated with proper private chat routing
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
            <ChatList /> {/* Default landing page */}
          </PrivateRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <PrivateRoute>
            <ChatList /> {/* Chat List page */}
          </PrivateRoute>
        ),
      },
      {
        path: "chat/:id", // This will handle private chats
        element: (
          <PrivateRoute>
            <div className="flex w-full">
              <div className="w-2/5 border-r border-gray-700">
                <div className="p-4">
                  <ChatList />
                </div>
              </div>
              <div className="w-3/5">
                <ChatFeed />
              </div>
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "room",
        element: (
          <PrivateRoute>
            <Room /> {/* Room List page */}
          </PrivateRoute>
        ),
        children: [
          {
            path: ":roomId", // Room chat feed with dynamic room ID
            element: <RoomChatFeed />,
          },
        ],
      },
      {
        path: "favourite",
        element: (
          <PrivateRoute>
            <Favourite /> {/* Friends List page */}
          </PrivateRoute>
        ),
        children: [
          {
            path: ":friendId", // Friend chat feed with dynamic friend ID
            element: (
              <PrivateRoute>
                <FavouritedChatFeed /> {/* Friend chat feed */}
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "faq",
        element: <About />, // Public about page
      },
    ],
  },
  {
    path: "login",
    element: <Login />, // Public login page
  },
  {
    path: "signup",
    element: <Signup />, // Public signup page
  },
]);