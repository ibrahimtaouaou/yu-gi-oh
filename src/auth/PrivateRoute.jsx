import { getLoginStatusFromState } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ Component }) {
  const status = useSelector(getLoginStatusFromState);
  const isAuthenticated = status === "loggedIn";

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
