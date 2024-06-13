import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import MetaData from "../layouts/MetaData/MetaData";
import { clearErrors, getProduct } from "../../redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Home = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.product);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const sliderImages = [
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/23/1/1711205453262_xiaomi_14_824x400.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/22/1/1711103306015_main_ver_5.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/14/1/1710414363194_ip15_pro_max_824x400.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/22/1/1711089835527_baan_vaa_maay_bay_final_824x400_copy_3.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/22/1/1711120909393_oppo_reno_11f_5g_824x400_1.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/22/1/1711095260539_s24.png",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/14/1/1710381657987_iphone_caa_nhaa_maaai_824x400.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/21/1/1710983094305_824x400.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/11/1/1710151632899_garmin_forerunner_series_02_824x400.jpg",
    "https://cdn-v2.didongviet.vn/files/banners/2024/2/20/1/1710928726055_taaang_taai_tote_824x400_copy.jpg"

  ];
  const qc = [
    "https://didongviet.vn/_next/image?url=https%3A%2F%2Fcdn-v2.didongviet.vn%2Ffiles%2Fbanners%2F2024%2F2%2F22%2F1%2F1711093534118_banner_gaac_phaaai_02.jpg&w=2048&q=100",
    "https://didongviet.vn/_next/image?url=https%3A%2F%2Fcdn-v2.didongviet.vn%2Ffiles%2Fbanners%2F2024%2F2%2F21%2F1%2F1710990754111_7.png&w=1920&q=100",
    "https://didongviet.vn/_next/image?url=https%3A%2F%2Fcdn-v2.didongviet.vn%2Ffiles%2Fbanners%2F2024%2F2%2F22%2F1%2F1711093570063_banner_gaac_phaaai_01.jpg&w=2048&q=100"
  ]

  const menuData = [
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0008.png", title: "Điện thoại" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/5/2/0/1685677499753_apple_iphone_cion.png", title: "Apple (AAR)" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0010.png", title: "Laptop / Tablet" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0013.png", title: "Máy cũ giá rẻ" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0012.png", title: "Phụ kiện" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0011.png", title: "Thiết bị đeo tay" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/0/12/0/1673491387797_icon_park_solid_headphone_sound.png", title: "Thiết bị âm thanh" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0015.png", title: "Thu cũ đổi mới" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2022/5/29/0/icon0016.png", title: "Khuyến mãi" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/20/0/1710903543729_tin_tuc.png", title: "Công nghệ 24H" },
  ];

  const categoryData = [
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/0/18/0/1705547345439_thumb_17_01_01.png", title: "Galaxy S24 Ultra" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/11/31/0/1703995954489_logo.png", title: "iPhone 15 Pro Max" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/11/1/0/1701397187309_200k_chuyeaaaan_khoaaan.png", title: "iPad Gen 9" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/4/0/1709536332409_icon_1.png", title: "Samsung Galaxy S23" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/1/5/0/1707128274173_thumb_04.png", title: "iPhone Cũ" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/0/17/0/1705495595018_untitled_design.png", title: "Redmi Note 13" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/4/0/1709533284592_iphone_11_10590_01.png", title: "iPhone 11" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/7/15/0/1692080217166_frame_32.png", title: "Macbook Air M1" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/10/20/0/1700460569438_frame_57.png", title: "Xiaomi Redmi 13C" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/11/0/1710128811404_thumb_02.png", title: "OPPO Reno11 F" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/1/5/0/1707108380181_thumb_03.png", title: "iPhone 13" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/0/5/0/1704422140898_thumb_04.png", title: "Phụ kiện cũ" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/8/28/0/1695875978246_frame_54.png", title: "Tai nghe AirPods 2" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/0/30/0/1706603106763_icon_redmi_buds_5_01.jpg", title: "Tai nghe chính hãng" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/11/0/1710138670103_thumb_11_03_03.png", title: "Loa chính hãng" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/11/0/1710138766950_thumb_11_03_01.png", title: "Ốp lưng UAG" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/11/0/1710138716549_thumb_11_03_04.png", title: "Sạc dự phòng Mazer" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/11/0/1710138651805_thumb_11_03_02.png", title: "Bộ Sạc Cáp Mophie" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/10/8/0/1699445474599_frame_58.png", title: "Đồng hồ Garmin" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/2/1/0/1709290564955_thumb_01.png", title: "Apple Watch" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/11/7/0/1701915913752_thumb_belkin_01_1.png", title: "Huawei Watch GT 4" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2024/1/21/0/1708533666384_thumb_02.png", title: "Xiaomi Band 8" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/11/7/0/1701916059031_thumb_belkin_07.png", title: "Tai nghe giá rẻ" },
    { imageUrl: "https://cdn-v2.didongviet.vn/files/page/2023/11/7/0/1701916075632_thumb_belkin_06.png", title: "Máy đọc sách" },
  ]
  return (
    <Fragment>
      <MetaData title="DiDongHay - Điện thoại, Phụ kiện Giá Tốt" />
      <main style={{ minHeight: '600px' }} className="flex w-full flex-col items-center justify-start py-1">
        <div className="container w-full" style={{ opacity: 1 }}>
          <div className="container z-0 antialiased">
            <h1 className="hidden">DidongHay - Điện thoại, Phụ kiện Chính Hãng</h1>
            <div className="group relative mb-2 min-h-[410px] antialiased max-md:min-h-[327px] max-md:overflow-hidden max-md:px-2 md:grid md:grid-cols-12 md:gap-2">
              <div className="col-span-2 max-md:hidden">
                <div className="dropend relative mt-2 flex w-full flex-col justify-between rounded-lg bg-white p-1 group-hover:text-ddv" style={{ height: '410px' }}>
                  {menuData.map((e, index) => (
                    <Link to="/" target="_self" key={index}>
                      <div style={{ height: '26px' }} className="flex cursor-pointer items-center justify-between px-2 py-1">
                        <div className="flex w-11/12 items-center justify-start">
                          <div className="flex w-1/5 items-center justify-center">
                            <div className="w-full overflow-hidden rounded" style={{ position: 'relative', height: '24px' }}>
                              <img loading="lazy" width="24" height="24" src={e.imageUrl} alt="Điện thoại" />
                            </div>
                          </div>
                          <div className="w-4/5">
                            <p className="pl-1 text-14 text-black hover:text-ddv">{e.title}</p>
                          </div>
                        </div>
                        <img src="https://didongviet.vn/svg/Header/arrowright.svg" loading="lazy" alt="di động việt"></img>
                      </div>
                    </Link>)
                  )}
                </div>
              </div>
              <div className="relative h-[410px] max-md:h-full max-md:w-full md:col-span-10">
                <div className="h-[410px] max-md:flex max-md:flex-col max-md:py-1 max-md:justify-between w-full max-md:h-[340px] md:mt-2 md:grid md:grid-cols-5 md:gap-2 md:rounded-lg">
                  <div className="md:col-span-4 md:h-full ">
                    <div className="flex w-full flex-col items-center justify-between ">
                      <div className="w-full overflow-hidden md:relative md:h-[410px] md:rounded ">
                        <Swiper
                          className="mySwiper2 h-[410px] max-md:h-[189px]"
                          modules={[Pagination, Navigation, Autoplay, A11y]}
                          spaceBetween={10}
                          slidesPerView={1}
                          navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          }}
                          pagination={{ clickable: true }}
                          autoplay={{
                            "delay": 4000,
                            "disableOnInteraction": false
                          }}
                          loop={true}
                        >
                          <button className="swiper-button-prev"></button>
                          {sliderImages.map((sliderImage, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <Link to="#" className="h-[410px] w-full overflow-hidden rounded max-md:h-[189px]" style={{ position: 'relative', width: '100%' }}>
                                  <img loading="lazy" src={sliderImage} className="md:object-cover max-md:object-fill" alt="" />
                                </Link>
                              </SwiperSlide>
                            );
                          })}
                          <button className="swiper-button-next"></button>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-full flex-col justify-between max-md:mt-2 max-md:grid max-md:h-[134px] max-md:w-full max-md:grid-cols-2 max-md:items-start max-md:gap-x-2 max-md:overflow-hidden md:col-span-1">
                    {qc.map((image, index) => (
                      <Link to="#" className="h-[132px] w-full overflow-hidden rounded max-md:col-span-1 mb-0 max-md:h-[133px]" href="/" style={{ position: 'relative', width: '100%' }} key={index}>
                        <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                          <img alt="Galaxy S23 128GB" size="100vw" src={image} className="h-[132px] md:object-cover  max-md:h-[133px]"></img>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="no-scrollbar my-2 w-full rounded-lg bg-white p-4 max-md:hidden max-md:overflow-x-scroll md:grid md:grid-cols-12 md:gap-4">
              {categoryData.map((e, index) => (
                <div key={index} className="max-md:mx-1 max-md:hidden  max-md:flex-nowrap">
                  <Link to="#" title="Galaxy S24 Ultra" target="_self" rel="dofollow"
                    className="flex flex-col items-center justify-start max-md:w-[102px] md:col-span-1 ">
                    <div className="w-full rounded " style={{ position: 'relative', height: '64px' }}>
                      <img src={e.imageUrl} alt="Galaxy S24 Ultra" loading="lazy"
                        className="brandcover overflow-visible transition duration-300 ease-in-out hover:scale-110">
                      </img>
                    </div>
                    <p className="case pt-2 text-center text-13 font-medium text-line hover:text-ddv md:antialiased">{e.title}</p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="px-3 my-2 flex-col items-center justify-between rounded-lg bg-white  py-4 max-md:my-1 max-md:bg-bgddv max-md:py-2">
              <div className="px-0 flex w-full items-center justify-between">
                <h2 className="text-24 font-bold text-ddv">
                  <a title="Samsung Chính Hãng" href="/">iPhone VN/A Chính Thống</a>
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end max-md:hidden">
                    <Link to="/" title="Galaxy Z Flip5">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover: hover:bg-ddv hover:text-white">iPhone 15 Series</p>
                    </Link>
                    <Link to="/" title="Galaxy Z Fold5">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">iPhone 14 Series</p>
                    </Link>
                    <Link to="/" title="Galaxy S24 Series">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">iPhone 13 Series</p>
                    </Link>
                    <Link to="/" title="Galaxy A Series">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">iPhone 11 Series</p>
                    </Link>
                    <Link to="/" title="Xem tất cả">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">Xem tất cả</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-4 max-md:grid-cols-2 max-md:gap-2">
                {products &&
                  products.map((product) => (
                    product.brandId === 1 &&
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
            <div className="px-3 my-2 flex-col items-center justify-between rounded-lg bg-white  py-4 max-md:my-1 max-md:bg-bgddv max-md:py-2">
              <div className="px-0 flex w-full items-center justify-between">
                <h2 className="text-24 font-bold text-ddv ">
                  <a title="Samsung Chính Hãng" href="/">Samsung Chính Hãng</a>
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end max-md:hidden">
                    <Link to="/" title="Galaxy Z Flip5">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">Galaxy Z Flip5</p>
                    </Link>
                    <Link to="/" title="Galaxy Z Fold5">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">Galaxy Z Fold5</p>
                    </Link>
                    <Link to="/" title="Galaxy S24 Series">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">Galaxy S24 Series</p>
                    </Link>
                    <Link to="/" title="Galaxy A Series">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">Galaxy A Series</p>
                    </Link>
                    <Link to="/" title="Xem tất cả">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">Xem tất cả</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-4 max-md:grid-cols-2 max-md:gap-2">
                {products &&
                  products.map((product) => (
                    product.brandId === 6 &&
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
            <div className="px-3 my-2 flex-col items-center justify-between rounded-lg bg-white  py-4 max-md:my-1 max-md:bg-bgddv max-md:py-2">
              <div className="px-0 flex w-full items-center justify-between">
                <h2 className="text-24 font-bold text-ddv ">
                  <a title="Oppo | Xiaomi | realme | HONOR Chính Hãng" href="/">Oppo | Xiaomi | realme | HONOR Chính Hãng</a>
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-end max-md:hidden">
                    <Link to="/" title="OPPO">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">OPPO</p>
                    </Link>
                    <Link to="/" title="XIAOMI">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">XIAOMI</p>
                    </Link>
                    <Link to="/" title="REALME">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">REALME</p>
                    </Link>
                    <Link to="/" title="HONOR">
                      <p className="border-1 mx-2 rounded-lg  px-2 py-1 text-sm font-medium text-brow hover:border-ddv hover:bg-ddv hover:text-white">HONOR</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-4 max-md:grid-cols-2 max-md:gap-2">
                {products &&
                  products.map((product) => (
                    product.brandId !== 6 && product.brandId !== 1 &&
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default Home;