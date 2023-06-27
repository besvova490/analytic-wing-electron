import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

//helpers
import useUserProfile from "../../../hooks/useUserProfile";


function PrivateRoute ({ redirectPath = "/sign-in" }) {
  const { isAuthenticated } = useUserProfile();

  console.log({ isAuthenticated });

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = { redirectPath: PropTypes.string, };

export default PrivateRoute;
