import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  FileQuestion,
  LogOut,
  MessageSquareMore,
  Settings,
  Star,
  Users,
} from "lucide-react"; // Import only necessary icons
import { FaDoorOpen, FaRegUserCircle } from "react-icons/fa";

const SidebarMenu = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <>
      <Sidebar
        breakPoint="lg"
        height="100vh" // Corrected to use full viewport height
        width="80px"
        backgroundColor="#2f2f39"
      >
        <Menu
          menuItemStyles={{
            button: {
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // paddingTop: "30px",

              [`&.active`]: {
                backgroundColor: "#9269FD",
                color: "#b6c8d9",
              },
              ":hover": {
                backgroundColor: "#3a3d47", // Hover state background color
              },
            },
            icon: {
              margin: "0 auto",
            },
          }}
        >
          <MenuItem
            style={{}}
            className="bg-[#9269FD] py-1 pb-3 hover:bg-[#2f2f39]"
            icon={<MessageSquareMore size={30} />}
            component={<Link to="/chat" />}
          />

          <MenuItem
            style={{}}
            icon={<FaDoorOpen size={30} />}
            component={<Link to="/room" />}
          />

          <MenuItem
            icon={<Users size={30} />}
            component={<Link to="/friends" />}
          />
          <MenuItem
            icon={<Star size={30} />}
            component={<Link to="/favourite" />}
          />
          <MenuItem icon={<Settings size={30} />} />
          <MenuItem
            onClick={() => document.getElementById("profile").showModal()}
            icon={<FaRegUserCircle size={30} />}
          />
          <MenuItem
            className=""
            icon={<FileQuestion size={30} />}
            component={<Link to="/logout" />}
          />

          <MenuItem onClick={handleLogOut} icon={<LogOut size={30} />} />
        </Menu>
      </Sidebar>

      <dialog id="profile" className="modal">
        <div className="modal-box w-full max-w-lg p-6 bg-gray-800 rounded-lg">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              {/* Profile Image */}
              <img
                src={"/default-avatar.png"} // Use default if no image
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
              <input
                id="profileImage"
                type="file"
                className="hidden"
                // onChange={handleImageChange} // Handle image change
              />
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
                className="input input-bordered chat-text w-full text-white"
                value={username}
                // onChange={(e) => setUsername(e.target.value)} // Handle username change
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label text-white">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full  text-white"
                value={email}
                // onChange={(e) => setEmail(e.target.value)} // Handle email change
              />
            </div>

            {/* Save and Close Buttons */}
            <div className="modal-action justify-end">
              <button
                type="submit"
                className="btn bg-purple-500 hover:bg-purple-700 text-white"
                // onClick={handleSaveChanges}
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
