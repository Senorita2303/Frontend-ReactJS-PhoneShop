// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { load_UserProfile } from "../../actions/userAction";
import Loader from "../layouts/Loader/Loader";
import { paths } from "../../routes/paths";
const PrivateRoute = ({ isAdmin, children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(load_UserProfile());
  // }, [dispatch]);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (isAuthenticated) {
      return children;
    } else if (isAdmin === true && user && user.isAdmin !== true) {
      navigate(paths.auth.jwt.login);
      return null;
    } else {
      navigate(paths.auth.jwt.login);
      return null;
    }
  }
};

export default PrivateRoute;