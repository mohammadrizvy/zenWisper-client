import { Link } from "react-router-dom";
import {
  FaCog,
  FaDoorOpen,
  FaFileAlt,
  FaShare,
  FaStar,
  FaUserCog,
  FaUsers,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const SidebarMenu = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <>
      <div className="h-screen hidden lg:flex flex-col justify-between px-3 bg-gray-800 text-white">
        <nav className="flex-1 px-4">
          <ul className="space-y-10 ">
            <li>
              <Link
                to="/chat"
                data-tip="Chat"
                className="flex tooltip tooltip-right mt-10 items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaMessage className="w-8 h-8" />
              </Link>
              <p className="text-center mt-2">Chat</p>
            </li>
            <li>
              <Link
                to="/room"
                data-tip="Room"
                className="flex tooltip tooltip-right items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaDoorOpen className="w-8 h-8" />
              </Link>
               <p className=" mt-2 text-center">Room</p>
            </li>
            <li>
              <Link
                to="/friends"
                data-tip="Friends"
                className="flex tooltip tooltip-right items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaUsers className="w-8 h-8" />
              </Link>
               <p className="text-center mt-2">Friends</p>
            </li>
            <li>
              <Link
                to="/"
                data-tip="Favourites"
                className="flex tooltip tooltip-right items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaStar className="w-8 h-8" />
              </Link>
               <p className="text-center mt-2">Favourite</p>
            </li>
            <li>
              <Link
                to="/"
                data-tip="Settings"
                className="flex tooltip tooltip-right items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaCog className="w-8 h-8" />
              </Link>
               <p className="text-center mt-2">Setting</p>
            </li>
            <li>
              <Link
                to="/faq"
                data-tip="FAQ"
                className="flex tooltip tooltip-right items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaFileAlt className="w-8 h-8" />
              </Link>
               <p className="text-center mt-2">FAQ</p>
            </li>
          </ul>
        </nav>

        <div className="mb-10 mx-auto">
          <ul className="space-y-10">
            <li>
              <p
                onClick={() => document.getElementById("profile").showModal()}
                data-tip="Profile"
                className="flex tooltip tooltip-right items-center cursor-pointer justify-center space-x-3 text-gray-300 hover:text-white"
              >
                <FaUserCog className="w-8 h-8" />
              </p>
                 <p className="text-center mt-2">Profile</p>
            </li>
            <li className="">
              <p
                onClick={handleLogOut}
                data-tip="Logout"
                className="flex tooltip tooltip-right cursor-pointer items-center justify-center space-x-3 text-gray-300 hover:text-white"
              >
              </p>
                <FaShare className="w-8 h-8 cursor-pointer  rotate-180" />
               <p className=" mt-2 text-center">Logout</p>
            </li>
          </ul>
        </div>
      </div>

      <dialog id="profile" className="modal">
        <div className="modal-box max-w-lg p-6 bg-gray-800 rounded-lg">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              {/* Profile Image */}
              <img
                src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png" // Use default if no image
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-purple-500"
              />
              {/* Edit Image Button */}
              <label
                htmlFor="profileImage"
                className="absolute bottom-2 right-2 bg-purple-500 text-white p-2 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            <h3 className="font-bold text-2xl text-white">Edit Profile</h3>
          </div>

          {/* Form to Edit Username and Email */}
          <form className="mt-6 space-y-6">
            {/* Username Field */}
            <div className="form-control">
              <label className="label text-white">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="input input-bordered w-full text-white"
                value={username}
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label text-white">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full text-white"
                value={email}
              />
            </div>

            {/* Save and Close Buttons */}
            <div className="modal-action justify-end">
              <button
                type="submit"
                className="btn bg-purple-500 hover:bg-purple-700 text-white"
              >
                Save Changes
              </button>
              <button formMethod="dialog" className="btn btn-outline">
                Close
              </button>
            </div>
          </form>
          <p className="py-4 text-gray-400 text-center">
            Press ESC or click outside to close
          </p>
        </div>
      </dialog>
    </>
  );
};

export default SidebarMenu;
