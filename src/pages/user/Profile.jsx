import React, { Fragment, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import { paths } from "../../routes/paths";
const Profile = () => {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        // if user not logged in
        if (isAuthenticated === false) {
            navigate(paths.auth.jwt.login);
        }
    }, [navigate, isAuthenticated]);

    return (
        <Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user?.userName}'s Profile`} />
                    <div className="inline">
                        <div className="flex flex-col items-center p-8 gap-5 shadow">
                            <h1>My Profile</h1>
                            <img className="w-40 h-40 rounded-full object-cover mb-4" src={user?.avatarUrl} alt={user?.userName} />
                            <Link to={paths.user.update}>
                                <Button color="primary" variant="contained">
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-col p-5 gap-6 text-center mb-6">
                            <div>
                                <h4>Full Name</h4>
                                <p>{user?.userName}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user?.createdAt).substr(0, 10)}</p>
                            </div>

                            <div className="flex gap-5 justify-center">
                                <Link to="/orders">
                                    <Button variant="contained" color="primary">
                                        My Orders
                                    </Button>
                                </Link>
                                <Link to="/password/update">
                                    <Button variant="contained" color="primary">
                                        Change Password
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};
export default Profile;