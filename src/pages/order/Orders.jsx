import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/slices/cartSlice";
import { myOrders } from '../../redux/slices/orderSlice';
import { ReactComponent as CartIcon } from "../../Image/icons/cart.svg";
import { ReactComponent as PriceIcon } from "../../Image/icons/price.svg";
import { ReactComponent as DeleteIcon } from "../../Image/icons/delete.svg";
import { ReactComponent as DeliveryIcon } from "../../Image/icons/delivery.svg";
import { ReactComponent as PaymentIcon } from "../../Image/icons/payment.svg";
import { ReactComponent as EditIcon } from "../../Image/icons/edit.svg";
import { ReactComponent as AddressIcon } from "../../Image/icons/address.svg";

import Iconify from '../../component/iconify';
import { IconButton, Typography, RadioGroup, Radio, FormControlLabel, Grid, Stack } from '@mui/material';
import { fCurrency } from '../../utils/formatNumber';

import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField, RHFAutocomplete } from "../../component/hook-form";

export default function Orders() {
    const dispatch = useDispatch();
    const { allItems, error, fee: { discount, subTotal, shipping, total, saveMoney } } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const [receiveAtStore, setReceiveAtStore] = useState(false);
    const initInfo = JSON.parse(localStorage.getItem('order')) || {};
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);
    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);


    return (
        <>
            <div className="container antialiased max-md:hidden">
                <Link to="/">
                    <p className="mt-4 text-sm font-medium text-ddv">&#60; Tiếp tục mua hàng</p>
                </Link>
                {
                    orders ? (
                        <div className="grid grid-cols-3 items-start justify-start gap-4">
                            <div className="col-span-2 my-3 flex-col">
                                <div className="flex-col rounded-lg bg-white py-3 px-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex">
                                            {/* <CartIcon /> */}
                                            <p className="px-3 text-24 font-bold">Đơn đặt hàng: ({orders.length} đơn)</p>
                                        </div>
                                    </div>
                                    {
                                        allItems?.map((e, index) => {
                                            const { id, quantity, productVariant } = e;
                                            return (
                                                <div className="my-4 flex items-center justify-start" key={index}>
                                                    <div>
                                                        <img src={productVariant?.images?.imageUrl} width="61" height="64" alt="di động việt" style={{ height: '64px', objectFit: 'contain' }}></img>
                                                    </div>
                                                    <div className="flex-col items-center justify-start">
                                                        <p className="px-3 text-14">{productVariant?.name}</p>
                                                        <div className="flex items-center justify-start">
                                                            <p className="px-3 text-14 font-bold text-ddv">{productVariant?.price}</p>
                                                            <p className="px-3 text-14 font-medium">SL: {quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="my-2 flex w-full flex-col items-center justify-center rounded bg-white">
                            <div className="flex w-full flex-col items-center justify-center pb-6">
                                <img alt="di động việt" src="https://didongviet.vn/images/pc/noresults.png"></img>
                                <p className="text-center text-16">Không có sản phẩm nào</p>
                                <button className="border-1 my-2 flex w-full items-center justify-center rounded bg-ddv py-2" style={{ width: '250px' }}>
                                    <p className="text-14 font-bold text-white">Về trang chủ</p>
                                </button>
                                <p className="text-center text-sm text-black">
                                    Khi cần trợ giúp, vui lòng gọi
                                    <span className="font-bold text-link underline">
                                        <a href="tel:18006018"> 0329.364.192</a>
                                    </span>
                                    (7:30 - 22:00)
                                </p>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
};
