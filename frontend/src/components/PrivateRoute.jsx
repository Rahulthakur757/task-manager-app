import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {

  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login/page" />;
};

export default PrivateRoute;