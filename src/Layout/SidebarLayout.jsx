// src/Layout/SidebarLayout.jsx - Fixed for Desktop 3-Column Layout
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import FavouritedChatFeed from "../pages/ChatFeed/FriendChatFeed/FriendChatFeed";
import RoomChatFeed from "../pages/ChatFeed/RoomChatFeed/RoomChatFeed";
import Home from "../pages/Home/Home";
import ChatFeedWrapper from "../Routes/ChatFeedWrapper";
import { 
  Bookmark, 
  MessageSquareMore, 
  UsersRound, 
  LibraryBig, 
  UserCog, 
  LogOut,
  Menu,
  X
} from "lucide-react";

const SidebarLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    window.location.reload();
  };

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to determine what to show in the right panel
  const getRightPanelContent = () => {
    const pathname = location.pathname;
    
    if (pathname.startsWith('/chat/') && pathname !== '/chat') {
      // Show chat feed for desktop, but check if it's a specific chat
      const chatId = pathname.split('/chat/')[1];
      if (chatId) {
        return <ChatFeedWrapper />;
      }
    } else if (pathname.startsWith('/room/') && pathname !== '/room') {
      return <RoomChatFeed />;
    } else if (pathname.startsWith('/favourite/') && pathname !== '/favourite') {
      return <FavouritedChatFeed />;
    }
    
    return <Home />;
  };

  return (
    <div className="flex h-screen text-white overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 px-3 border-zinc-600 border-r-2 w-28 xl:w-32 2xl:w-36 h-screen text-white">
        <Link to={"/"}>
          <img
            className="mx-auto mt-5 mb-10 w-16 xl:w-18 2xl:w-20"
            src="/ZenWhisper.ico"
            alt="ZenWhisper"
          />
        </Link>

        {/* User profile picture */}
        <div className="cursor-pointer" onClick={() => document.getElementById("profile").showModal()}>
          <img
            className="mx-auto border-2 border-blue-500 rounded-full w-12 xl:w-14 2xl:w-16"
            src="/exampleUserImage.png"
            alt="User Avatar"
          />
          <p className="mt-2 text-xs xl:text-sm text-center truncate px-1">{username || "User"}</p>
        </div>

        <nav className="flex-1 px-2 xl:px-4">
          <ul className="space-y-2 cursor-pointer">
            <li>
              <Link
                to="/chat"
                data-tip="Chat"
                className="tooltip-right flex justify-center items-center space-x-3 mt-10 text-gray-300 hover:text-white tooltip"
              >
                <MessageSquareMore size={30} className="xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
              </Link>
              <p className="text-center mt-1 text-xs xl:text-sm">Chat</p>
            </li>
            <hr />
            <li>
              <Link
                to="/room"
                data-tip="Room"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white tooltip"
              >
                <UsersRound size={30} className="xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
              </Link>
              <p className="text-center mt-1 text-xs xl:text-sm">Room</p>
            </li>
            <hr />
            <li>
              <Link
                to="/favourite"
                data-tip="Favourites"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white tooltip"
              >
                <Bookmark size={30} className="xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
              </Link>
              <p className="text-center mt-1 text-xs xl:text-sm">Favourite</p>
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
                <LibraryBig size={30} className="xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
              </Link>
              <p className="text-center mt-1 text-xs xl:text-sm">FAQ</p>
            </li>
            <hr />
            <li>
              <p
                onClick={() => document.getElementById("profile").showModal()}
                data-tip="Profile"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white cursor-pointer tooltip"
              >
                <UserCog size={30} className="xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
              </p>
              <p className="text-center mt-1 text-xs xl:text-sm">Setting</p>
            </li>
            <hr />
            <li onClick={handleLogOut} className="cursor-pointer">
              <p
                data-tip="Logout"
                className="tooltip-right flex justify-center items-center space-x-3 text-gray-300 hover:text-white cursor-pointer tooltip"
              >
                <LogOut size={30} className="xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
              </p>
              <p className="text-center mt-1 text-xs xl:text-sm">Logout</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-zinc-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-600">
            <Link to={"/"} onClick={closeMobileMenu}>
              <img
                className="w-12 h-12"
                src="/ZenWhisper.ico"
                alt="ZenWhisper"
              />
            </Link>
            <button
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile User Profile */}
          <div 
            className="flex items-center p-4 border-b border-zinc-600 cursor-pointer"
            onClick={() => {
              document.getElementById("profile").showModal();
              closeMobileMenu();
            }}
          >
            <img
              className="w-12 h-12 rounded-full border-2 border-blue-500 mr-3"
              src="/exampleUserImage.png"
              alt="User Avatar"
            />
            <div>
              <p className="font-medium">{username || "User"}</p>
              <p className="text-xs text-gray-400">{email || "user@example.com"}</p>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/chat"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <MessageSquareMore size={24} />
                  <span className="text-lg">Chat</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/room"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <UsersRound size={24} />
                  <span className="text-lg">Room</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/favourite"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Bookmark size={24} />
                  <span className="text-lg">Favourite</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <LibraryBig size={24} />
                  <span className="text-lg">FAQ</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="p-4 border-t border-zinc-600 space-y-2">
            <button
              onClick={() => {
                document.getElementById("profile").showModal();
                closeMobileMenu();
              }}
              className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <UserCog size={24} />
              <span className="text-lg">Settings</span>
            </button>
            <button
              onClick={handleLogOut}
              className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-800 transition-colors"
            >
              <LogOut size={24} />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-30 lg:hidden bg-zinc-900 p-2 rounded-lg text-white shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Profile Modal - Responsive */}
      <dialog id="profile" className="modal">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-lg modal-box mx-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative">
              <img
                src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                alt="Profile"
                className="shadow-lg border-4 border-purple-500 rounded-full w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover"
              />
              <label
                htmlFor="profileImage"
                className="right-1 bottom-1 sm:right-2 sm:bottom-2 absolute bg-purple-500 p-1.5 sm:p-2 rounded-full text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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
            <h3 className="font-bold text-white text-xl sm:text-2xl">Edit Profile</h3>
          </div>

          <form className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <div className="form-control">
              <label className="text-white label text-sm sm:text-base">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="input-bordered w-full text-white input text-sm sm:text-base"
                defaultValue={username}
                readOnly
              />
            </div>

            <div className="form-control">
              <label className="text-white label text-sm sm:text-base">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="input-bordered w-full text-white input text-sm sm:text-base"
                defaultValue={email}
                readOnly
              />
            </div>

            <div className="justify-end modal-action">
              <button
                type="button"
                className="bg-purple-500 hover:bg-purple-700 text-white btn btn-sm sm:btn-md"
                onClick={() => document.getElementById("profile").close()}
              >
                Close
              </button>
            </div>
          </form>
          <p className="py-2 sm:py-4 text-gray-400 text-center text-xs sm:text-sm">
            Press ESC or click outside to close
          </p>
        </div>
      </dialog>

      {/* Main content area - Responsive */}
      <div className="flex flex-grow bg-[#1B1C25] pt-16 lg:pt-0">
        {/* Left section for additional content - Responsive */}
        <div className="w-full md:w-2/5 lg:w-2/5 xl:w-2/5 p-2 sm:p-4 border-gray-700 md:border-r overflow-auto">
          <div className="space-y-2">
            <div className="py-2 sm:py-5">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Dynamic Chat Content Area - Hidden on mobile when in list view */}
        <div className="hidden md:block w-3/5">
          {getRightPanelContent()}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;