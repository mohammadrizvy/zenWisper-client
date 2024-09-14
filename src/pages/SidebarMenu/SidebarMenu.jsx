import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FileQuestion, LogOut, MessageSquareMore, Settings, Star, UserRoundPen, Users } from "lucide-react"; // Import only necessary icons

const SidebarMenu = () => {
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload(); 
  }

  return (
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
          icon={<Users size={30} />}
          component={<Link to="/friends" />}
        />
        <MenuItem
          icon={<Star size={30} />}
          component={<Link to="/favourite" />}
        />
        <MenuItem
          className=""
          icon={<Settings size={30} />}
          component={<Link to="/settings" />}
        />
        <MenuItem
          className=""
          icon={<UserRoundPen size={30} />}
          component={<Link to="/profile" />}
        />
        <MenuItem
          className=""
          icon={<FileQuestion size={30} />}
          component={<Link to="/logout" />}
        />

        <MenuItem
        onClick={handleLogOut}
          icon={<LogOut size={30} />}
          
        />
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
