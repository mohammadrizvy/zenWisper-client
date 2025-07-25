import { Link, Outlet, Route, Routes, } from "react-router-dom";
import FavouritedChatFeed from "../pages/ChatFeed/FriendChatFeed/FriendChatFeed";
import RoomChatFeed from "../pages/ChatFeed/RoomChatFeed/RoomChatFeed";
import Home from "../pages/Home/Home";
import ChatFeed from "../pages/ChatFeed/ChatFeed/ChatFeed";

const SidebarLayout = () => {
  // const location = useLocation();

  // // Determine which chat feed to display based on the current route
  // const renderChatFeed = () => {
  //   if (location.pathname.includes("/room")) {
  //     return <RoomChatFeed />;
  //   } else if (location.pathname.includes("/favourite")) {
  //     return <FavouritedChatFeed />;
  //   }
  //   // TODO : need to add more routes for (Favourite , and random chat)
  //   return <Home></Home>; // Return null if neither route matches
  // };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");


  return (
    <div className="flex  h-screen text-white">
      {/* Sidebar */}

      <div className="hidden lg:flex flex-col justify-between bg- bg-zinc-900 px-3 border-zinc-600 border-r-2 w-28 h-screen text-white">
        <Link to={"/"}>
          <img
            className="mx-auto mt-5 mb-10 w-18"
            src="/ZenWhisper.ico"
            alt=""
          />
        </Link>

        {/* User profile picture !  */}
        <div className="cursor-pointer">
          <img
            className="mx-auto border-2 border-blue-500 rounded-full w-12"
            src="/exampleUserImage.png"
            alt=""
          />
          <p className="mt-2 text-xs text-center">Username</p>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2 cursor-pointer">
            <li>
              <Link
                to="/chat"
                data-tip="Chat"
                className="tooltip-right flex justify-center items-center space-x-3 mt-10 text-gray-300 hover:text-white tooltip"
              >
                <img
                  className="mx-auto mt-5 w-10"
                  src="/chat.png"
                  alt=""
                />
              </Link>
              <p className="text-center">Chat</p>
            </li>
            <hr />
            <li>
              <Link
                to="/room"
                data-tip="Room"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white tooltip"
              >
                <img className="mx-auto w-10" src="/group.png" alt="" />
              </Link>
              <p className="text-center">Room</p>
            </li>
            <hr />
            <li>
              <Link
                to="/favourite"
                data-tip="Favourites"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white tooltip"
              >
                <img
                  className="mx-auto w-10"
                  src="/bookmark.png"
                  alt=""
                />
              </Link>
              <p className="text-center">Favourite</p>
            </li>
          </ul>
        </nav>

        <div className="mx-auto mb-10">
          <ul className="space-y-2">
            <li>
              <Link
                to="/faq"
                data-tip="FAQ"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white tooltip"
              >
                <img className="mx-auto w-10" src="/faq.png" alt="" />
              </Link>
              <p className="text-center">FAQ</p>
            </li>
            <hr />
            <li className=" ">
              <p
                onClick={() => document.getElementById("profile").showModal()}
                data-tip="Profile"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white cursor-pointer tooltip"
              >
                <img
                  className="mx-auto w-10"
                  src="/setting.png"
                  alt=""
                />
              </p>
              <p className="text-center">Setting</p>
            </li>
            <hr />
            <li className="">
              <p
                onClick={handleLogOut}
                data-tip="Logout"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white cursor-pointer tooltip"
              ></p>
              <img
                className="mx-auto w-10 rotate-[90deg] scale-x-[-1]"
                src="/logout.png"
                alt=""
              />
              <p className="text-center">Logout</p>
            </li>
          </ul>
        </div>
      </div>

      <dialog id="profile" className="modal">
        <div className="bg-gray-800 p-6 rounded-lg max-w-lg modal-box">
          {/* Profile Image Section */}
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative">
              {/* Profile Image */}
              <img
                src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png" // Use default if no image
                alt="Profile"
                className="shadow-lg border-4 border-purple-500 rounded-full w-32 h-32 object-cover"
              />
              {/* Edit Image Button */}
              <label
                htmlFor="profileImage"
                className="right-2 bottom-2 absolute bg-purple-500 p-2 rounded-full text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
              <input id="profileImage" type="file" className="hidden" />
            </div>
            <h3 className="font-bold text-white text-2xl">Edit Profile</h3>
          </div>

          {/* Form to Edit Username and Email */}
          <form className="space-y-6 mt-6">
            {/* Username Field */}
            <div className="form-control">
              <label className="text-white label">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="input-bordered w-full text-white input"
                value={username}
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="text-white label">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="input-bordered w-full text-white input"
                value={email}
              />
            </div>

            {/* Save and Close Buttons */}
            <div className="justify-end modal-action">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white btn"
              >
                Save Changes
              </button>
              <button formMethod="dialog" className="btn-outline btn">
                Close
              </button>
            </div>
          </form>
          <p className="py-4 text-gray-400 text-center">
            Press ESC or click outside to close
          </p>
        </div>
      </dialog>      

      {/* Main content area */}
      <div className="flex flex-grow bg-[#1B1C25] ">
        {/* Left section for additional content */}
        <div className="p-4  border-gray-700 border-r w-2/5 overflow-auto">
          <div className="space-y-2">
           
            <div className="py-5 ">
              <Outlet /> {/* This will render the content from child routes */}
            </div>
          </div>
        </div>

        {/* Dynamic Chat Content Area */}
        <div className="w-4/5">
           {/* Conditionally render chat feed */}
            <Routes>
            <Route path="/chat/*" element={<ChatFeed />} />
            <Route path="/favourite/*" element={<FavouritedChatFeed />} />
            <Route path="/room/*" element={<RoomChatFeed />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
 