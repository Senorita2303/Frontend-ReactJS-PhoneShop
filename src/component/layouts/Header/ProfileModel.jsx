import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as User } from "../../../Image/Header/user.svg";
import { Modal, Avatar } from "@mui/material";
import { ReactComponent as DashboardIcon } from "../../../Image/Header/dashboard.svg";
import { ReactComponent as AccountCircleIcon } from "../../../Image/Header/account.svg";
import { ReactComponent as ShoppingCartWhiteIcon } from "../../../Image/Header/shoppingcartwhite.svg";
import { ReactComponent as LoginIcon } from "../../../Image/Header/login.svg";
import { ReactComponent as LogoutIcon } from "../../../Image/Header/logout.svg";
import { ReactComponent as AssignmentIcon } from "../../../Image/Header/assignment.svg";
import "./ProfileModel.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
import { paths } from "../../../routes/paths";
const ProfileModal = ({ user, isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const createdAt = (user) => {
    const createdAt = new Date(user.createdAt);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const formattedDate = formatter.format(createdAt);
    return formattedDate;
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  function dashboardHandler() {
    setIsOpen(false);
    navigate(paths.dashboard.root);
  }

  function accountHandler() {
    setIsOpen(false);
    navigate(paths.user.account);
  }

  function ordersHandler() {
    setIsOpen(false);
    navigate(paths.user.orders);
  }

  const logoutUserHandler = () => {
    setIsOpen(false);
    dispatch(logout());
    navigate(paths.auth.jwt.login);
    toast.success("Logout Successfully");
  }

  function cartHandler() {
    setIsOpen(false);
    navigate(paths.user.cart);
  }

  function loginHandler() {
    setIsOpen(false);
    navigate(paths.auth.jwt.login);
  }

  return (
    <div>
      <div className="flex items-center justify-start menuhover" onClick={handleOpen}>
        <div className="w-1/4 relative">
          <User
            className={`icon smaller ${isOpen ? "active" : ""}`}
            fontSize="large"
          />
        </div>
        <div className="w-3/4 pl-2">
          <div className="items-center justify-start ">
            <p className="sub text-sm text-white">Đăng nhập</p>
            <p className="title text-sm text-white">Đăng ký</p>
          </div>
        </div>
        {/* {isOpen ? (
          <ArrowDropUpIcon className="arrow-icon" />
        ) : (
          <ArrowDropDownIcon className="w-2/4" />
        )} */}
      </div>
      {
        isOpen && (
          <Modal open={isOpen} onClose={onClose} className="modal-container">
            <div className="modal-content" ref={modalRef}>
              {!isAuthenticated ? (
                <div className="welcome-message">
                  <strong>Welcome!</strong>
                  <p>To access your account and manage orders, please log in.</p>
                </div>
              ) : (
                <>
                  <div className="profile-info">
                    <Avatar
                      src={user.avatarUrl}
                      alt="User Avatar"
                      className="avatar"
                      style={{ width: "68px", height: "68px" }}
                    />

                    <p className="user-name">
                      <strong>Name :</strong> {user.userName}
                    </p>
                  </div>
                </>
              )}
              <div className="divider" />
              <div className="profile-menu">
                {user && user.isAdmin === true && (
                  <div className="menu-item" onClick={dashboardHandler}>
                    <DashboardIcon className="menu-icon" />
                    <span>Dashboard</span>
                  </div>
                )}
                <div className="menu-item" onClick={accountHandler}>
                  <AccountCircleIcon className="menu-icon" />
                  <span>Profile</span>
                </div>
                <div className="menu-item" onClick={ordersHandler}>
                  <AssignmentIcon className="menu-icon" />
                  <span>Orders</span>
                </div>
                <div className="menu-item" onClick={cartHandler}>
                  <ShoppingCartWhiteIcon className="menu-icon" />
                  <span>Cart</span>
                </div>
                {!isAuthenticated ? (
                  <div className="menu-item" onClick={loginHandler}>
                    <LoginIcon className="menu-icon" />
                    <span>Login</span>
                  </div>
                ) : (
                  <div className="menu-item" onClick={logoutUserHandler}>
                    <LogoutIcon className="menu-icon" />
                    <span>Logout</span>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )
      }
    </div>
  );
};

export default ProfileModal;