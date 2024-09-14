import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// Utility function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Define PropTypes
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
