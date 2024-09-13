import { Link, Outlet } from "react-router-dom";
import SidebarMenu from "../pages/SidebarMenu/SidebarMenu";
import ChatFeed from "../pages/ChatFeed/ChatFeed";

const SidebarLayout = () => {
  return (
    <div  className="flex  bg-gray-900   h-screen text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main content area */}
      <div
        
        className="flex flex-grow "
      >
        <div className="w-1/5 p-4 border-r border-gray-700 overflow-auto ">
          <div className="space-y-2 ">
            <Link to={"/"}>
            
            <img
              className="w-[55%] -mt-7 -mb-10 mx-auto"
              src="/public/ZenWhisper.png"
              alt=""
            />
            </Link>
          <div className="py-5">

            <Outlet></Outlet>
          </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div   className="w-4/5">
          <ChatFeed />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
