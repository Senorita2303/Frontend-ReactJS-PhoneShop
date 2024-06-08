import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../../Image/Footer/home.svg";
import { ReactComponent as ListIcon } from "../../../Image/Footer/list.svg";
import { ReactComponent as StoreIcon } from "../../../Image/Footer/store.svg";
import { ReactComponent as AccountIcon } from "../../../Image/Footer/account.svg";
import { ReactComponent as ScrollIcon } from "../../../Image/Footer/scroll.svg";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button aria-label="top" className="back-to-top-mobile flex items-center justify-center bg-ddv md:hidden" style={{ width: '44px', height: '44px', borderRadius: '22px', zIndex: 999 }} onClick={handleScrollToTop}>
        <ScrollIcon />
      </button>

      <div className="bottom-tab fixed bottom-0 left-0 right-0 w-full bg-white md:hidden" style={{ height: '52px', zIndex: 9999 }}>
        <div className="flex h-full w-full items-center justify-between">
          <Link to="/" className="w-1/5 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <HomeIcon />
            </div>
            <p className="text-ddv text-center text-10 font-bold">Trang chủ</p>
          </Link>
          <div className="w-1/5 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <ListIcon />
            </div>
            <p className="text-brow text-center text-10 font-bold">Danh mục</p>
          </div>
          <div className="w-1/5 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <StoreIcon />
            </div>
            <p className="text-brow text-center text-10 font-bold">Cửa hàng</p>
          </div>
          <Link to="/auth/jwt/login" className="w-1/5 flex-col items-center justify-center">
            <div className="flex w-full items-center justify-center">
              <AccountIcon />
            </div>
            <p className="text-brow text-center text-10 font-bold">Tài khoản</p>
          </Link>
        </div>
      </div>
      <footer className="flex w-full flex-col items-center justify-center border-t border-gray-200 bg-white pt-5 text-left max-md:hidden">
        <div className="container">
          <div className="flex w-full items-start justify-start">
            <div className="w-1/4">
              <div className="flex flex-col ">
                <p className="my-2 text-sm font-bold text-ddv">Hỗ trợ khách hàng</p>
                <Link to="/" title="Danh sách cửa hàng" className="my-1 text-sm font-normal text-black hover:text-ddv">Danh sách cửa hàng</Link>
                <Link to="/" title="Mua hàng trả góp" className="my-1 text-sm font-normal text-black hover:text-ddv">Mua hàng trả góp</Link>
                <Link to="/" className="my-1 text-sm font-normal text-black hover:text-ddv">Tra cứu điểm thành viên</Link>
                <Link to="/" title="Tuyển dụng mới nhất" className="my-1 text-sm font-normal text-black hover:text-ddv">Tuyển dụng mới nhất</Link>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex flex-col ">
                <p className="my-2 text-sm font-bold text-ddv">Chính sách</p>
                <Link to="/" title="Chính sách bảo hành" className="my-1 text-sm font-normal text-black hover:text-ddv">Chính sách bảo hành</Link>
                <Link to="/" title="Chính sách đổi trả" className="my-1 text-sm font-normal text-black hover:text-ddv">Chính sách đổi trả</Link>
                <Link to="/" title="Chính sách bán hàng" className="my-1 text-sm font-normal text-black hover:text-ddv">Chính sách bán hàng</Link>
                <div className="my-1 flex  cursor-pointer items-center justify-start hover:text-ddv">
                  <p className="text-sm font-normal text-black hover:text-ddv">Xem thêm </p>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex flex-col " style={{ width: '100%' }}>
                <p className="my-2 text-sm font-bold text-ddv">Liên hệ</p>
                <div className="flex flex-col " style={{ width: '100%' }}>
                  <div className="flex  items-center justify-between py-1" style={{ width: '90%' }}>
                    <p className="text-14 font-medium">Kỹ thuật: </p>
                    <div className="flex items-center justify-end pl-4">
                      <p className=" text-16 font-bold text-link ">
                        <Link to="tel:18006018">1800.6018</Link>
                      </p>
                      <p className="pl-2 text-14 font-normal text-black">(08:30 – 21:30)</p>
                    </div>
                  </div>
                  <div className="flex  items-center justify-between py-1" style={{ width: '90%' }}>
                    <p className="text-14 font-medium">Bảo hành: </p>
                    <div className="flex items-center justify-end pl-4">
                      <p className=" text-16 font-bold text-link ">
                        <Link to="tel:18006729">1800.6729</Link></p>
                      <p className="pl-2 text-14 font-normal text-black">(09:00 – 21:00)</p>
                    </div>
                  </div>
                  <div className="flex  items-center justify-between py-1" style={{ width: '90%' }}>
                    <p className="text-14 font-medium">Góp ý: </p>
                    <div className="flex items-center justify-center pl-4">
                      <p className=" text-16 font-bold text-link ">
                        <Link to="tel:18006306">1800.6306</Link>
                      </p>
                      <p className="pl-2 text-14 font-normal text-black">(08:30 – 21:30)</p>
                    </div>
                  </div>
                  <div className="flex  items-center justify-between py-1" style={{ width: '90%' }}>
                    <p className="text-14 font-medium">Mua ngay: </p>
                    <div className="flex items-center justify-center pl-4">
                      <p className=" text-16 font-bold text-link ">
                        <Link to="tel:18006018">1800.6018</Link>
                      </p>
                      <p className="pl-2 text-14 font-normal text-black">(07:30 – 21:30)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex flex-col ">
                <div className="grid w-full grid-cols-4 items-center justify-between gap-2 py-2">
                  <Link to="https://www.facebook.com/didongviet/" aria-label="facebook" target="_blank" rel="noreferrer" className="col-span-1 flex items-center justify-start">
                    <img src="https://didongviet.vn/images/footer/fb.svg" alt="di động việt" />
                    <p className="pl-2 text-11 text-link">524k Fans</p>
                  </Link>
                  <Link to="https://zalo.me/2858385037676592618" aria-label="zalo" target="_blank" rel="noreferrer" className="col-span-1 flex items-center justify-start">
                    <img src="https://didongviet.vn/images/footer/zl.svg" alt="di động việt" />
                    <p className="pl-2 pr-2 text-11 text-link">Zalo DDV</p>
                  </Link>
                  <Link to="https://www.youtube.com/user/didongvietnam" aria-label="youtube" target="_blank" rel="noreferrer" className="col-span-1 flex items-center justify-start">
                    <img src="https://didongviet.vn/images/footer/yt.svg" alt="di động việt" />
                    <p className="pl-2 text-11 text-link">161k Đăng ký</p>
                  </Link>
                  <Link to="https://www.tiktok.com/@didongviet_official" aria-label="tiktok" target="_blank" rel="noreferrer" className="col-span-1 flex items-center justify-start">
                    <img src="https://didongviet.vn/images/footer/tik.svg" alt="di động viêt" />
                    <p className="pl-2 text-11 text-link">92k Theo dõi</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 h-px w-full bg-ddv"></div>
        </div>
        <div className="flex w-full items-center justify-center bg-comment p-2">
          <div className="container flex items-center justify-between">
            <div className="w-3/4">
              <p className="pr-2 text-10 text-black">Công Ty TNHH Công Nghệ Di Động Việt</p>
            </div>
            <div className="flex w-1/4 items-center" style={{ height: '41px' }}></div>
          </div>
        </div>
        <button className="back-to-top max-md:back-to-top-mobile flex cursor-pointer items-center justify-center rounded bg-ddv" style={{ width: '35px', height: '35px' }} onClick={handleScrollToTop}>
          <ScrollIcon />
        </button>
      </footer >
    </>
  );
};

export default Footer;
