import { useParams, Link } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
function OrderSuccess() {
    const { orderId } = useParams();

    return (
        <>
            <MetaData title={"Đặt hàng thành công"} />
            <main className="flex w-full flex-col items-center justify-start py-1" style={{ minHeight: '600px' }}>
                <div className="container w-full" style={{ opacity: 1 }}>
                    <div className="container text-center">
                        <img src="https://didongviet.vn/images/ordersuccess.png" alt="order success"
                            width="445"
                            height="445"
                            style={{ height: '445px', width: '100%', objectFit: 'contain' }}
                        />
                        <p className="text-16 text-black">Đặt hàng hoàn tất. Di Động Việt sẽ tiến hành giao hàng đến cho bạn sớm nhất có thể</p>
                        <p className="text-16 text-black">Mã đơn hàng:&nbsp;
                            <Link to={`/tra-cuu/van-don/${orderId}`} className="font-medium text-linkkhac">{orderId}</Link>
                        </p>
                        <div className="mb-4 flex items-center justify-center">
                            <Link to={`/tra-cuu/van-don/${orderId}`}>
                                <div className="border-1 mx-2 mt-3 flex items-center justify-center rounded-lg border-ddv bg-white" style={{ width: '282px', height: '56px' }}>
                                    <p className="text-center text-16 font-bold text-ddv">
                                        Chi tiết đơn hàng
                                    </p>
                                </div>
                            </Link>
                            <Link to="/">
                                <div className="mx-2 mt-3 flex items-center justify-center rounded-lg bg-ddv" style={{ width: '282px', height: '56px' }}>
                                    <p className="text-center text-16 font-bold text-white">Tiếp tục mua hàng</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
export default OrderSuccess;