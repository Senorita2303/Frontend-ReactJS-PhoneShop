import { Suspense, lazy } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import Loader from "../component/layouts/Loader/Loader";
import PrivateRoute from "../component/Route/PrivateRoute";
import Header from "../component/layouts/Header/Header";
import Footer from "../component/layouts/Footer/Footer";

import JWTForgotPasswordView from '../pages/auth/jwt/ForgotPassword';
import JwtLoginView from '../pages/auth/jwt/Login';
import LoginSuccessView from '../pages/auth/jwt/LoginSuccessView';
import JwtRegisterView from '../pages/auth/jwt/Register';
import JwtOTPVerifyView from '../pages/auth/jwt/OtpVerify';
import JwtVerifyView from '../pages/auth/jwt/Verify';
import JWTResetPasswordView from '../pages/auth/jwt/ResetPassword';

import Home from "../component/Home/Home";

import ProductDetails from "../component/Product/ProductDetails";
import Cart from "../pages/cart/CartPage";

import Profile from "../pages/user/Profile";
import AccountChangePassword from "../pages/account/AccountChangePassword";
import AccountGeneral from "../pages/account/AccountGeneral";
import MyOrder from "../pages/order/MyOrder";
import OrderSuccess from "../pages/order/OrderSuccess";
import SearchOrder from "../pages/order/SearchOrder";

import Products from "../component/Product/Products";
const LazyDashboard = lazy(() => import("../component/Admin/Dashboard"));

const LazyProductList = lazy(() => import("../pages/product/ProductList"));
const LazyNewProduct = lazy(() => import("../pages/product/NewProduct"));
const LazyUpdateProduct = lazy(() => import("../pages/product/UpdateProduct"));

const LazyStoreBranchList = lazy(() => import("../pages/storeBranch/StoreBranchList"));
const LazyNewStoreBranch = lazy(() => import("../pages/storeBranch/NewStoreBranch"));

const LazyDiscountList = lazy(() => import("../pages/discount/DiscountList"));
const LazyNewDiscount = lazy(() => import("../pages/discount/NewDiscount"));

const LazyVoucherList = lazy(() => import("../pages/voucher/VoucherList"));
const LazyNewVoucher = lazy(() => import("../pages/voucher/NewVoucher"));

const LazyBrandList = lazy(() => import("../pages/brand/BrandList"));
const LazyNewBrand = lazy(() => import("../pages/brand/NewBrand"));

const LazyCategoryList = lazy(() => import("../pages/category/CategoryList"));
const LazyNewCategory = lazy(() => import("../pages/category/NewCategory"));

const LazyOrderList = lazy(() => import("../pages/order/OrderList"));
const LazyUpdateOrder = lazy(() => import("../pages/order/UpdateOrder"));

const LazyUserList = lazy(() => import("../pages/user/UserList"));
// const LazyUpdateUser = lazy(() => import("../component/Admin/UpdateUser"));

const LazySpecificationList = lazy(() => import("../pages/specification/SpecificationList"));
const LazyNewSpecification = lazy(() => import("../pages/specification/NewSpecification"));

const LazyColorList = lazy(() => import("../pages/color/ColorList"));
const LazyNewColor = lazy(() => import("../pages/color/NewColor"));

const LazyMemoryList = lazy(() => import("../pages/memory/MemoryList"));
const LazyNewMemory = lazy(() => import("../pages/memory/NewMemory"));

const LazyProductVariantList = lazy(() => import("../pages/productVariant/ProductVariantList"));
const LazyNewProductVariant = lazy(() => import("../pages/productVariant/NewProductVariant"));

const LazyManageStock = lazy(() => import("../pages/stock/ManageStock"));
const LazyUpdateStock = lazy(() => import("../pages/stock/UpdateStock"));

const LazyManageDiscount = lazy(() => import("../pages/discount/ManageDiscount"));
const LazyAddDiscount = lazy(() => import("../pages/discount/AddDiscount"));

const LazyManageVoucher = lazy(() => import("../pages/voucher/ManageVoucher"));
const LazyAddVoucher = lazy(() => import("../pages/voucher/AddVoucher"));

// const LazyProcessOrder = lazy(() => import("../component/Admin/ProcessOrder"));

// const LazyProductReviews = lazy(() => import("../component/Admin/ProductReviews"));

export default function Router() {
    return useRoutes([
        // auth routes
        {
            path: "auth",
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <Outlet />
                    <Footer />
                </Suspense>
            ),
            children: [
                {
                    path: 'jwt',
                    children: [
                        { path: "login", element: <JwtLoginView /> },
                        { path: "login-success/:userId/:tokenLogin", element: <LoginSuccessView /> },
                        { path: "register", element: <JwtRegisterView /> },
                        { path: "forgot-password", element: <JWTForgotPasswordView /> },
                        { path: "reset-password/:token", element: <JWTResetPasswordView /> },
                        { path: "verify", element: <JwtVerifyView /> },
                        { path: "otp-verify", element: <JwtOTPVerifyView /> },
                    ],
                },
            ],
        },

        // Product Detail
        {
            path: "product",
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <Outlet />
                    <Footer />
                </Suspense>
            ),
            children: [
                { path: ":id", element: <ProductDetails /> },
            ],
        },

        // Product Search
        {
            path: "/products",
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <Products />
                    <Footer />
                </Suspense>
            ),
        },

        {
            path: "/products/:keyword",
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <Products />
                    <Footer />
                </Suspense>
            ),
        },

        // User cart
        {
            path: "cart",
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <Cart />
                    <Footer />
                </Suspense>
            ),
        },

        // Home
        {
            path: "/",
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <Home />
                    <Footer />
                </Suspense>
            ),
        },

        // User Routes
        {
            path: '/',
            element: (
                <Suspense fallback={<Loader />}>
                    <Header />
                    <PrivateRoute>
                        <Outlet />
                    </PrivateRoute>
                    <Footer />
                </Suspense>
            ),
            children: [
                { path: 'account', element: <Profile /> },
                { path: 'password/update', element: <AccountChangePassword /> },
                { path: 'me/update', element: <AccountGeneral /> },
                { path: 'tra-cuu/van-don/:orderId', element: <MyOrder /> },
                { path: 'tra-cuu', element: <SearchOrder /> },
                // { path: 'order/confirm', element: <ConfirmOrder /> },
                { path: 'order-success/:orderId', element: <OrderSuccess /> },
            ]
        },

        //  Admin Routes
        {
            path: "admin",
            element: (
                <Suspense fallback={<Loader />}>
                    <PrivateRoute isAdmin={true}>
                        <Outlet />
                    </PrivateRoute>
                </Suspense>
            ),
            children: [
                { path: "dashboard", element: <LazyDashboard /> },

                { path: "storeBranches", element: <LazyStoreBranchList /> },
                { path: "new/storeBranch", element: <LazyNewStoreBranch /> },
                { path: "storeBranch/:id", element: <LazyNewStoreBranch /> },
                // { path: "brand/:id", element: <LazyNewBrand /> },
                { path: "discounts", element: <LazyDiscountList /> },
                // { path: "new/discount", element: <LazyNewDiscount /> },
                { path: "discount/:id", element: <LazyNewDiscount /> },

                { path: "vouchers", element: <LazyVoucherList /> },
                // { path: "new/voucher", element: <LazyNewVoucher /> },
                { path: "voucher/:id", element: <LazyNewVoucher /> },

                { path: "products", element: <LazyProductList /> },
                { path: "new/product", element: <LazyNewProduct /> },
                { path: "product/:id", element: <LazyUpdateProduct /> },

                { path: "brands", element: <LazyBrandList /> },
                { path: "new/brand", element: <LazyNewBrand /> },
                { path: "brand/:id", element: <LazyNewBrand /> },

                { path: "categories", element: <LazyCategoryList /> },
                { path: "new/category", element: <LazyNewCategory /> },
                { path: "category/:id", element: <LazyNewCategory /> },

                { path: "orders", element: <LazyOrderList /> },
                { path: "order/:id", element: <LazyUpdateOrder /> },
                // { path: "order/:id", element: <LazyProcessOrder /> },
                { path: "users", element: <LazyUserList /> },
                // { path: "user/:id", element: <LazyUpdateUser /> },

                { path: "specifications", element: <LazySpecificationList /> },
                { path: "new/specification", element: <LazyNewSpecification /> },
                { path: "specification/:id", element: <LazyNewSpecification /> },

                { path: "colors", element: <LazyColorList /> },
                { path: "new/color", element: <LazyNewColor /> },
                { path: "color/:id", element: <LazyNewColor /> },

                { path: "memories", element: <LazyMemoryList /> },
                { path: "new/memory", element: <LazyNewMemory /> },
                { path: "memory/:id", element: <LazyNewMemory /> },

                { path: "productVariants", element: <LazyProductVariantList /> },
                { path: "new/productVariant", element: <LazyNewProductVariant /> },

                { path: "manage-stock", element: <LazyManageStock /> },
                { path: "inventory/:id", element: <LazyUpdateStock /> },

                { path: "manage-discount", element: <LazyManageDiscount /> },
                { path: "new/discount/:id", element: <LazyAddDiscount /> },

                { path: "manage-voucher", element: <LazyManageVoucher /> },
                { path: "new/voucher", element: <LazyAddVoucher /> },
            ],
        },
    ]);
}
