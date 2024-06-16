import React, { useEffect, useRef, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import SidebarLinkGroup from "./SidebarLinkGroup"
import Iconify from "../iconify";
import { toast } from "react-toastify";
import { logout } from "../../redux/slices/userSlice";
import { paths } from "../../routes/paths";
import { useDispatch } from "react-redux";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const { pathname } = location

    const trigger = useRef(null)
    const sidebar = useRef(null)

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded")
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    )

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setSidebarOpen(false)
        }
        document.addEventListener("click", clickHandler)
        return () => document.removeEventListener("click", clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener("keydown", keyHandler)
        return () => document.removeEventListener("keydown", keyHandler)
    })

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded")
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded")
        }
    }, [sidebarExpanded])

    const logoutHandler = () => {
        dispatch(logout());
        navigate(paths.auth.jwt.login);
        toast.success("Logout Successfully");
    }

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink
                    to="/admin/dashboard"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
                        'bg-meta-4'
                        }`}
                >
                    <Iconify icon="akar-icons:statistic-up" />ADMIN
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                    to="/admin/dashboard"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
                                        'bg-meta-4'
                                        }`}
                                >
                                    <Iconify icon="material-symbols:dashboard" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
                                        'bg-meta-4'
                                        }`}
                                >
                                    <Iconify icon="ion:home-sharp" />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/manage-stock"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "profile"
                                    ) && "bg-meta-4"}`}
                                >
                                    <Iconify icon="ant-design:stock-outlined" />
                                    Manage Stock
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/manage-discount"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "profile"
                                    ) && "bg-meta-4"}`}
                                >
                                    <Iconify icon="ant-design:stock-outlined" />
                                    Manage Discount
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/manage-voucher"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "profile"
                                    ) && "bg-meta-4"}`}
                                >
                                    <Iconify icon="ant-design:stock-outlined" />
                                    Manage Voucher
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/users"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                                        "profile"
                                    ) && "bg-meta-4"}`}
                                >
                                    <Iconify icon="material-symbols:person-pin-rounded" />
                                    Users
                                </NavLink>
                            </li>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="fa-solid:store" />
                                                Store Branches
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/storeBranches"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Store Branch List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/storeBranch"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Store Branch
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/product" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="material-symbols:box" />
                                                Products
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/products"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Product List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/product"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Product Upload
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="ant-design:tags-outlined" />
                                                Brands
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/brands"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Brand List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/brand"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Brand
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="subway:search" />
                                                Categories
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/categories"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Category List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/category"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Category
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <li>
                                <NavLink
                                    to="/admin/orders"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
                                        'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <Iconify icon="mdi:cart-outline" />
                                    Orders
                                </NavLink>
                            </li>
                            {/* <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="carbon:parameter" />
                                                Specifications
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/specifications"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Specification List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/specification"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Specification
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup> */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="mdi:color" />
                                                Colors
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/colors"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Color List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/color"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Color
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="material-symbols:memory" />
                                                Memories
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/memories"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Memory List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/memory"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Memory
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="material-symbols:box" />
                                                Product Variants
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/productVariants"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Product Variant List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/productVariant"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Product Variant
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="ic:round-discount" />
                                                Discounts
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/discounts"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Discount List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/discount"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Discount
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/forms" || pathname.includes("forms")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/forms" ||
                                                    pathname.includes("forms")) &&
                                                    "bg-graydark dark:bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="mdi:voucher-outline" />
                                                Vouchers
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/admin/vouchers"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Voucher List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/admin/new/voucher"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            New Voucher
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            OTHERS
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === "/auth" || pathname.includes("auth")
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                                                    "/auth" ||
                                                    pathname.includes("auth")) &&
                                                    "bg-meta-4"}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true)
                                                }}
                                            >
                                                <Iconify icon="icomoon-free:exit" />
                                                Authentication
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open &&
                                                        "rotate-180"}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            <div
                                                className={`translate transform overflow-hidden ${!open &&
                                                    "hidden"}`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            onClick={() => logoutHandler()}
                                                            // to="/auth/signin"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }
                                                        >
                                                            Logout
                                                        </NavLink>
                                                    </li>
                                                    {/* <li>
                                                        <NavLink
                                                            to="/auth/signup"
                                                            className={({ isActive }) =>
                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                (isActive && "!text-white")
                                                            }

                                                        >
                                                            Sign Up
                                                        </NavLink>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
