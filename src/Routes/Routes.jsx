import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import Friends from "../pages/Friends/Friends";
import ChatList from "../pages/ChatList/ChatList";
import Favourite from "../pages/Favourite/Favourite";
import About from "../pages/About/About";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Room from "../pages/Room/Room";
import RoomChatFeed from "../pages/ChatFeed/RoomChatFeed/RoomChatFeed";
import FriendChatFeed from "../pages/ChatFeed/FriendChatFeed/FriendChatFeed";
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
        children: [
          {
            path: ":id", // Dynamic chat feed based on ID
            element: <ChatFeed />,
          },
        ],
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
        path: "friends",
        element: (
          <PrivateRoute>
            <Friends /> {/* Friends List page */}
          </PrivateRoute>
        ),
        children: [
          {
            path: ":friendId", // Friend chat feed with dynamic friend ID
            element: (
              <PrivateRoute>
                <FriendChatFeed /> {/* Friend chat feed */}
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "favourite",
        element: (
          <PrivateRoute>
            <Favourite /> {/* Favourite section */}
          </PrivateRoute>
        ),
      },
      {
        path: "about",
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
