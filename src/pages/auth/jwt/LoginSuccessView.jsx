import { toast } from "react-toastify";
import MetaData from "../../../component/layouts/MetaData/MetaData";
import React, { useEffect } from 'react'
import { loginSuccess, clearErrors } from "../../../redux/slices/userSlice";
import Loader from "../../../component/layouts/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function LoginSuccessView() {
    const { userId, tokenLogin } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const { error, isLoading, isAuthenticated, user } = useSelector(
        (state) => state.user
    );
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
        if (!user) {
            dispatch(loginSuccess(userId, tokenLogin))
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect, user]);

    return (
        <>
            <MetaData title={"Login By Social"} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    Loading...
                </div>
            )
            }
        </>
    );
}
