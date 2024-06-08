import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, getAllItems } from "../../redux/slices/cartSlice";
import { updateFeeFromCart, nextStepOrder } from '../../redux/slices/orderSlice';
import { ReactComponent as CartIcon } from "../../Image/icons/cart.svg";
import { ReactComponent as PriceIcon } from "../../Image/icons/price.svg";
import { ReactComponent as DeleteIcon } from "../../Image/icons/delete.svg";
import { ReactComponent as DeliveryIcon } from "../../Image/icons/delivery.svg";
import { ReactComponent as PaymentIcon } from "../../Image/icons/payment.svg";

import Iconify from '../../component/iconify';
import { IconButton, Typography } from '@mui/material';
import { fCurrency } from '../../utils/formatNumber';

export default function CheckoutCart() {
    const dispatch = useDispatch();
    const { allItems, error, fee: { discount, subTotal, shipping, total } } = useSelector((state) => state.cart);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllItems());
    }, [dispatch, error]);

    const handleDeleteCart = (cartId) => {
        dispatch(removeItemFromCart(cartId));
        toast.success("Delete item successfully");
    };

    const handleIncreaseQuantity = (cartId, quantity) => {
        dispatch(increaseItemQuantity({ cartId, quantity }))
    };

    const handleDecreaseQuantity = (cartId, quantity) => {
        dispatch(decreaseItemQuantity({ cartId, quantity }))
    };

    const handleNextStep = () => {
        dispatch(updateFeeFromCart());
        dispatch(nextStepOrder());
    };

    return (
        <>
            <div className="container bg-white px-2 antialiased md:hidden">
                <Link to="/">
                    <p className="mt-2 text-sm font-medium text-ddv">&#60; Tiếp tục mua hàng</p>
                </Link>
                <div className="mt-2 flex">
                    <CartIcon />
                    <p className="px-3 text-20 font-bold">Giỏ hàng ({allItems.length} sản phẩm)</p>
                </div>
                {
                    allItems.length !== 0 ?
                        (
                            <div>
                                {
                                    allItems.map((e, index) => {
                                        const { id, quantity, productVariant } = e;
                                        return (
                                            <div className="grid grid-cols-4 items-center gap-4 py-2 md:hidden" key={index}>
                                                <div className="col-span-1 flex w-full items-start justify-center">
                                                    <div style={{ width: '100%', height: '100%' }}>
                                                        <img src={productVariant?.images?.imageUrl} width="61" height="64" alt="di động việt" style={{ height: '64px', objectFit: 'contain' }}>
                                                        </img>
                                                    </div>
                                                </div>
                                                <div className="col-span-3 w-full flex-col items-start justify-start">
                                                    <p className="text-14 ">{productVariant?.name}</p>
                                                    <p className="text-left text-14 font-medium text-ddv">
                                                        {fCurrency(productVariant?.price)}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center justify-start">
                                                            <IconButton size="small" color="inherit" disabled={quantity <= 1}
                                                                onClick={() => handleDecreaseQuantity(id, quantity)}
                                                            >
                                                                <Iconify icon="eva:minus-fill" width={16} />
                                                            </IconButton>
                                                            <Typography variant="body2" component="span" sx={{ width: 15, textAlign: 'center', display: 'inline-block' }}>
                                                                {quantity}
                                                            </Typography>
                                                            <IconButton size="small" color="inherit" disabled={quantity >= parseInt(productVariant?.stock)}
                                                                onClick={() => handleIncreaseQuantity(id, quantity)}
                                                            >
                                                                <Iconify icon="eva:plus-fill" width={16} />
                                                            </IconButton>
                                                        </div>
                                                        <button className="text-center" type="button"
                                                            onClick={() => handleDeleteCart(id)}
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="m-2 flex pt-4 ">
                                    <DeliveryIcon />
                                    <p className="px-3 text-20 font-bold">Hình thức giao hàng</p>
                                </div>
                                <div className="form-check m-2">
                                    <div className="flex"></div>
                                    <div className="my-3 grid grid-cols-1 gap-4">
                                        <div className="col-span-1"></div>
                                        <div className="col-span-1"></div>
                                        <div className="col-span-1"></div>
                                    </div>
                                    <div className="md:hidden">
                                        <div className="flex">
                                            <PaymentIcon />
                                            <p className="px-3 pb-3 text-20 font-bold">Chọn hình thức thanh toán</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start pt-3">
                                        <PriceIcon />
                                        <p className="px-3 text-24 font-bold">Tạm tính</p>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-sm">Tiền hàng</p>
                                        <p className="text-sm font-bold">{fCurrency(subTotal)}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-sm">Phí vận chuyển</p>
                                        <p className="text-sm font-bold">{fCurrency(shipping)}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-sm">Khuyến mãi</p>
                                        <p className="text-sm font-bold">-{fCurrency(discount)}</p>
                                    </div>
                                    <div className="flex w-full items-center justify-between py-2"></div>
                                    <div className="line-ngang my-3 w-full"></div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-sm">Tổng cộng</p>
                                        <p className="text-sm font-bold text-ddv">{fCurrency(total)}</p>
                                    </div>
                                    <div className="flex w-full items-center justify-between pb-6">
                                        <button className="border-1 flex items-center justify-center rounded border-ddv bg-white py-2" style={{ width: "47%" }}>
                                            <p className="text-14 font-medium text-ddv">Tiếp tục mua hàng</p>
                                        </button>
                                        <button className="border-1 relative flex items-center justify-center rounded border-ddv bg-ddv py-2" style={{ width: "47%" }}>
                                            <p className="text-14 font-medium text-white">Thanh toán</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full flex-col items-center justify-center bg-white pb-6">
                                <img alt="di động việt" src="https://didongviet.vn/images/pc/noresults.png"></img>
                                <p className="text-center text-16">Không có sản phẩm nào</p>
                                <button className="border-1 my-2 flex w-full items-center justify-center rounded bg-ddv py-2" style={{ width: '250px' }}>
                                    <p className="text-14 font-bold text-white">Về trang chủ</p>
                                </button>
                                <p className="text-center text-sm text-black">
                                    Khi cần trợ giúp, vui lòng gọi
                                    <span className="font-bold text-link underline">
                                        <a href="tel:18006018"> 1800.6018 </a>
                                    </span>
                                    (7:30 - 22:00)
                                </p>
                            </div>
                        )}
            </div>

            <div className="container antialiased max-md:hidden">
                <Link to="/">
                    <p className="mt-4 text-sm font-medium text-ddv">&#60; Tiếp tục mua hàng</p>
                </Link>
                {
                    allItems.length !== 0 ? (
                        <div className="grid grid-cols-3 items-start justify-start gap-4">
                            <div className="col-span-2 my-3 flex-col rounded-lg bg-white py-3 px-4">
                                <div className="flex">
                                    <CartIcon />
                                    <p className="px-3 text-24 font-bold">Giỏ hàng ({allItems.length} sản phẩm)</p>
                                </div>
                                <div className="flex w-full flex-col">
                                    <div className="w-full">
                                        <div className="grid grid-cols-7">
                                            <div className="col-span-3 px-2 py-2  text-left text-sm font-medium text-gray-900">Tên sản phẩm</div>
                                            <div className="col-span-1 px-2 py-2 text-right text-sm font-medium text-gray-900">Đơn giá</div>
                                            <div className="col-span-1 px-2 py-2 text-right text-sm font-medium text-gray-900">Số lượng</div>
                                            <div className="col-span-1 px-2 py-2 text-right text-sm font-medium text-gray-900">Thành tiền</div>
                                            <div className="col-span-1 px-2 py-2 text-right text-sm font-medium text-gray-900">Thao tác</div>
                                        </div>
                                        <div className="h-px w-full bg-border"></div>
                                        {
                                            allItems.map((e, index) => {
                                                const { id, quantity, productVariant } = e;
                                                return (
                                                    <div className="grid w-full grid-cols-7 items-center max-md:hidden" key={index}>
                                                        <div className="col-span-3 flex w-full flex-col items-center justify-start  overflow-hidden  px-2 py-2 text-sm text-gray-900">
                                                            <div className="flex w-full items-center justify-start">
                                                                <div style={{ width: '20%' }}>
                                                                    <img src={productVariant?.images?.imageUrl} width="61" height="64" alt="di động việt" style={{ height: '64px', objectFit: 'contain' }}></img>
                                                                </div>
                                                                <div style={{ width: '79%' }}>
                                                                    <p className="px-3 text-left text-14">{productVariant?.name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="whitespace-nowrap px-2 py-4 text-right text-sm font-bold text-gray-900">
                                                            {fCurrency(productVariant?.price)}
                                                        </div>
                                                        <div className="whitespace-nowrap px-2 py-4 text-right text-sm font-light text-gray-900">
                                                            <div className="flex items-end justify-end">
                                                                <IconButton size="small" color="inherit" disabled={quantity <= 1}
                                                                    onClick={() => handleDecreaseQuantity(id, quantity)}
                                                                >
                                                                    <Iconify icon="eva:minus-fill" width={16} />
                                                                </IconButton>
                                                                <Typography variant="body2" component="span" sx={{ width: 15, textAlign: 'center', display: 'inline-block' }}>
                                                                    {quantity}
                                                                </Typography>
                                                                <IconButton size="small" color="inherit" disabled={quantity >= parseInt(productVariant?.stock)}
                                                                    onClick={() => handleIncreaseQuantity(id, quantity)}
                                                                >
                                                                    <Iconify icon="eva:plus-fill" width={16} />
                                                                </IconButton>
                                                            </div>

                                                        </div>
                                                        <div className="whitespace-nowrap px-2 py-4 text-right text-sm font-medium text-ddv">
                                                            <p className="text-right text-14">{fCurrency(productVariant.price * quantity)}</p>
                                                        </div>
                                                        <div className="flex  justify-end whitespace-nowrap px-2 py-4 text-sm font-light text-gray-900">
                                                            <button className="text-center" type="button"
                                                                onClick={() => handleDeleteCart(id)}
                                                            >
                                                                <DeleteIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="my-3 w-full flex-col rounded-lg bg-white py-3 px-4">
                                    <div className="flex items-center justify-start">
                                        <PriceIcon />

                                        <p className="px-3 text-24 font-bold">Tạm tính</p>
                                    </div>
                                    <div className="line-ngang my-3 w-full"></div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-sm">Tổng cộng:</p>
                                        <p className="text-sm font-bold text-ddv">{fCurrency(total)}</p>
                                    </div>
                                    <button className="border-1 relative flex w-full items-center justify-center rounded bg-ddv py-2" onClick={handleNextStep} >
                                        <p className="text-14 font-bold text-white">Đặt hàng ({allItems.length})</p>
                                    </button>
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
                                        <a href="#"> 1800.6018 </a>
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
