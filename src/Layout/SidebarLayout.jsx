import { Link, Outlet, useLocation } from "react-router-dom";
import SidebarMenu from "../pages/SidebarMenu/SidebarMenu";
import FriendChatFeed from "../pages/ChatFeed/FriendChatFeed/FriendChatFeed";
import RoomChatFeed from "../pages/ChatFeed/RoomChatFeed/RoomChatFeed";
import Home from "../pages/Home/Home";

const SidebarLayout = () => {
  const location = useLocation();

  // Determine which chat feed to display based on the current route
  const renderChatFeed = () => {

    if (location.pathname.includes("/room")) {
      return <RoomChatFeed />;
    } else if (location.pathname.includes("/friends")) {
      return <FriendChatFeed />;
    }
    // TODO : need to add more routes for (Favourite , and random chat)
    return <Home></Home>; // Return null if neither route matches
  };

  return (
    <div className="flex bg-gray-900 h-screen text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main content area */}
      <div className="flex flex-grow">
        {/* Left section for additional content */}
        <div className="w-2/5 p-4 border-r border-gray-700 overflow-auto">
          <div className="space-y-2">
            <Link to={"/"}>
              <img
                className="w-[55%] -mt-7 -mb-10 mx-auto"
                src="/ZenWhisper.png"
                alt="Logo"
              />
            </Link>
            <div className="py-5">
              <Outlet /> {/* This will render the content from child routes */}
            </div>
          </div>
        </div>

        {/* Dynamic Chat Content Area */}
        <div className="w-4/5">
          {renderChatFeed()} {/* Conditionally render chat feed */}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
