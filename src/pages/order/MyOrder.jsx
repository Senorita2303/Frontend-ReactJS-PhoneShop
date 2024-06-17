import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { clearErrors, getOrderDetails } from "../../redux/slices/orderSlice";
import { useParams, Link } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import { format } from 'date-fns';
function MyOrder() {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { error, order } = useSelector((state) => state.order);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (check) {
            dispatch(getOrderDetails(orderId));
            setCheck(false);
        }
    }, [dispatch, error, orderId]);
    return (
        <>
            <MetaData title={"Đặt hàng thành công"} />
            <main className="flex w-full flex-col items-center justify-start py-1" style={{ minHeight: '600px' }}>
                <div className="container w-full" style={{ opacity: 1 }}>
                    <div className="container antialiased">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <div className="my-2 flex-col items-center rounded-lg bg-white py-3 px-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-24 font-bold">Trình theo dõi đơn hàng</p>
                                        <Link to="/tra-cuu">
                                            <p className="text-sm text-linkxanh">Tìm kiếm đơn hàng khác</p>
                                        </Link>
                                    </div>
                                    <div className="my-4 h-px w-full bg-line"></div>
                                    <div className="flex items-center justify-between"></div>
                                    <p className="text-sm text-brow">Ngày đặt hàng:&nbsp;
                                        <span className="text-sm font-medium text-black">
                                            {order?.[0]?.createdAt ? format(order?.[0]?.createdAt, 'dd/MM/yyyy') : ""}
                                        </span>
                                        | Số lượng:&nbsp;
                                        <span className="text-sm font-bold text-black">{order?.length}</span>
                                        | Tổng:&nbsp;
                                        <span className="text-sm font-medium text-black">{order?.[0]?.total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                    </p>
                                    <div className="my-4 h-px w-full bg-black"></div>
                                    <div className="flex items-center justify-start">
                                        <p className="text-16 font-medium">Danh sách sản phẩm:</p>
                                    </div>
                                    {Object.keys(order).length !== 0 && (
                                        <div>
                                            {
                                                order.map((e, index) => {
                                                    const { orderDetails } = e;
                                                    return (
                                                        <div className="my-4 flex items-center justify-start">
                                                            <div>
                                                                <img
                                                                    alt="di động việt"
                                                                    src={orderDetails?.productVariant?.images?.imageUrl}
                                                                    width="64"
                                                                    height="61"
                                                                    style={{ height: '64px', objectFit: 'contain' }}
                                                                />
                                                            </div>
                                                            <div className="flex-col items-center justify-start">
                                                                <p className="px-3 text-14">{orderDetails?.productVariant?.name}</p>
                                                                <div className="flex items-center justify-start">
                                                                    <p className="px-3 text-14 font-medium text-ddv">
                                                                        {orderDetails?.productVariant?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                                    </p>
                                                                    <p className="px-3 text-14 font-medium">
                                                                        SL: {orderDetails?.quantity}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-1 ">
                                <div className="my-2 flex-col  items-center rounded-lg bg-white py-3 px-4">
                                    <div className="flex items-center justify-start">
                                        <p className="text-16 font-medium">Thông tin giao hàng</p>
                                    </div>
                                    <p className="py-3 text-sm font-bold">
                                        Địa chỉ nhận hàng
                                    </p>
                                    <div className="flex items-center justify-between py-1">
                                        <div className="flex items-center justify-start">
                                            <div className="w-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><g fill="#BE1E2D" clip-path="url(#profile_svg__a)"><path d="M7.5 0a3.905 3.905 0 0 0-3.895 3.895A3.905 3.905 0 0 0 7.5 7.789a3.905 3.905 0 0 0 3.895-3.894A3.905 3.905 0 0 0 7.5 0ZM14.183 10.901a3.632 3.632 0 0 0-.39-.714 4.84 4.84 0 0 0-3.351-2.109.717.717 0 0 0-.493.12c-.715.527-1.565.799-2.45.799a4.097 4.097 0 0 1-2.448-.8.638.638 0 0 0-.494-.119 4.806 4.806 0 0 0-3.35 2.11c-.153.22-.289.475-.391.713-.051.102-.034.222.017.324.136.238.306.476.46.68.237.323.492.612.781.884.239.238.51.46.783.68A7.704 7.704 0 0 0 7.483 15a7.705 7.705 0 0 0 4.625-1.53c.273-.205.545-.443.783-.68a7.853 7.853 0 0 0 1.241-1.565c.085-.102.102-.222.051-.324Z"></path></g><defs><clipPath id="profile_svg__a"><path fill="#fff" d="M0 0h15v15H0z"></path></clipPath></defs></svg>
                                            </div>
                                            <p className="pl-5 text-sm text-brow">Họ tên người nhận:</p>
                                        </div>
                                        <p className="text-right text-sm">{order?.[0]?.userName}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <div className="flex items-center justify-start">
                                            <div className="w-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><g clip-path="url(#phone_svg__a)"><path fill="#BE1E2D" d="M13.796 9.846c-.918 0-1.82-.144-2.674-.426-.419-.143-.934-.012-1.19.25l-1.686 1.274C6.29 9.9 5.086 8.695 4.056 6.754L5.29 5.11c.321-.32.437-.789.299-1.228a8.53 8.53 0 0 1-.428-2.68C5.162.54 4.622 0 3.958 0H1.204C.54 0 0 .54 0 1.204 0 8.81 6.189 15 13.796 15 14.46 15 15 14.46 15 13.796V11.05c0-.663-.54-1.203-1.204-1.203Z"></path></g><defs><clipPath id="phone_svg__a"><path fill="#fff" d="M0 0h15v15H0z"></path></clipPath></defs></svg>
                                            </div>
                                            <p className="pl-5 text-sm text-brow">SĐT người nhận:</p>
                                        </div>
                                        <p className="text-right text-sm">{order?.[0]?.phoneNumber}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <div className="flex items-center justify-start">
                                            <div className="w-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><g clip-path="url(#location_svg__a)"><path fill="#BE1E2D" d="M7.5 0C4.399 0 1.875 2.541 1.875 5.666c0 4.439 5.096 9.023 5.313 9.215a.468.468 0 0 0 .624 0c.217-.192 5.313-4.776 5.313-9.215C13.125 2.54 10.601 0 7.5 0Zm0 8.75a3.129 3.129 0 0 1-3.125-3.125A3.129 3.129 0 0 1 7.5 2.5a3.129 3.129 0 0 1 3.125 3.125A3.129 3.129 0 0 1 7.5 8.75Z"></path></g><defs><clipPath id="location_svg__a"><path fill="#fff" d="M0 0h15v15H0z"></path></clipPath></defs></svg>
                                            </div>
                                            <p className="pl-5 text-sm text-brow">Nhận tại địa chỉ:</p>
                                        </div>
                                        <p className="text-right text-sm">{order?.[0]?.address?.houseNumber}, {order?.[0]?.address?.ward}, {order?.[0]?.address?.district} , {order?.[0]?.address?.province}</p>
                                    </div>
                                    <div className="my-4 h-px w-full bg-black"></div>
                                    <div className="flex items-center justify-start">
                                        <p className="pb-2 text-16 font-medium">Thông tin thanh toán</p>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-sm text-brow">Hình thức thanh toán</p>
                                        <p className="text-sm font-medium">{order?.[0]?.payment?.paymentMethod?.name}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <p className="text-14 text-brow">Tiền hàng:</p>
                                        <p className="text-14 font-medium">{order?.[0]?.subTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <p className="text-14 text-brow">Phí vận chuyển:</p>
                                        <p className="text-14 font-medium">{order?.[0]?.shippingFee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <p className="text-14 text-brow">Khuyến mãi:</p>
                                        <p className="text-14 font-medium">-{order?.[0]?.discount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                    <div className="my-2 h-px w-full bg-border"></div>
                                    <div className="flex items-center justify-between py-1">
                                        <p className="text-16">Tổng cộng:</p>
                                        <p className="text-16 font-bold text-ddv">{order?.[0]?.total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                </div>
                                <div className="my-3 flex-col  items-center rounded-lg bg-white py-3 px-4">
                                    <p className="pb-2 text-24 font-bold text-black"></p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">

                                        </div>
                                        <div className="col-span-1">
                                            <img alt="di động việt"
                                                src="https://didongviet.vn/icon/tracuu/tracuubg.png"
                                                width="290"
                                                height="245"
                                                style={{ height: '245px', objectFit: 'contain' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
export default MyOrder;