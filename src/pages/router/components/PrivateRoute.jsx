import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

//helpers
import { useUserContext } from "../../../context/UserContext";


function PrivateRoute ({ redirectPath = "/sign-in" }) {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = { redirectPath: PropTypes.string, };

export default PrivateRoute;
