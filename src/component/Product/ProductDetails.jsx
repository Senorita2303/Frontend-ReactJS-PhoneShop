import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductDetails, clearErrors, productDetailsReset } from "../../redux/slices/productSlice";
import { getProductVariantDetails } from "../../redux/slices/productVariantSlice";
import { toast } from "react-toastify";
import { addItemToCart } from "../../redux/slices/cartSlice";
import Loader from "../layouts/Loader/Loader";
import ProductDetailsReview from "./ProductDetailsReview";
import { fDate } from '../../utils/formatTime';
import { ReactComponent as ProductIcon } from "../../Image/icons/product.svg";
import { ReactComponent as DcoinIcon } from "../../Image/icons/dcoin.svg";
import { ReactComponent as WarrantyIcon } from "../../Image/icons/warranty.svg";
import { ReactComponent as XeIcon } from "../../Image/icons/xe.svg";
import { ReactComponent as GiftxanhIcon } from "../../Image/icons/giftxanh.svg";
import { ReactComponent as DcareIcon } from "../../Image/icons/dcare.svg";
import { ReactComponent as SettingIcon } from "../../Image/icons/setting.svg";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, product, error, success, detailSpec } = useSelector((state) => state.product);
  const { productVariants } = useSelector((state) => state.productVariant);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedRom, setSelectedRom] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    if (success) {
      toast.error("Get product details successfully!");
      dispatch(productDetailsReset());
    }
    dispatch(getProductDetails(id));
    dispatch(getProductVariantDetails(id));
  }, [dispatch, error, id, success]);

  const uniqueRomSet = new Set();
  const uniqueColorSet = new Set();
  // Lọc productVariants để chỉ giữ lại các biến thể có rom duy nhất
  const uniqueRom = productVariants?.reduce((acc, variant) => {
    if (!uniqueRomSet.has(variant.memory.rom)) {
      uniqueRomSet.add(variant.memory.rom);
      acc.push(variant.memory.rom);
    }
    return acc;
  }, []);

  const uniqueColor = productVariants?.reduce((acc, variant) => {
    if (!uniqueColorSet.has(variant.color.name)) {
      uniqueColorSet.add(variant.color.name);
      acc.push(variant.color.name);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (selectedColor === '' && uniqueColor?.length > 0) {
      setSelectedColor(uniqueColor[0]); // Chọn màu đầu tiên khi trang được tải
    }

    if (selectedRom === '' && uniqueRom?.length > 0) {
      setSelectedRom(uniqueRom[0]);
    }
  }, [uniqueColor, uniqueRom, selectedColor, selectedRom]);

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };

  const handleRomClick = (romName) => {
    setSelectedRom(romName);
  };

  useEffect(() => {
    if (selectedColor && selectedRom) {
      const selectedVariant = productVariants.find(
        (variant) => variant.color.name === selectedColor && variant.memory.rom === selectedRom
      );
      setImages(selectedVariant.images);
      setPrice(selectedVariant.price);
      setMarketPrice(selectedVariant.marketPrice);
      setSku(selectedVariant.sku);
    } else {
      setImages([]);
      setPrice(0);
      setMarketPrice(0);
      setSku('');
    }
  }, [selectedColor, selectedRom, productVariants]);

  const handleAddItem = () => {
    const selectedVariant = productVariants?.find(
      (variant) => variant.color.name === selectedColor && variant.memory.rom === selectedRom
    );
    const newItem = {
      productVariantId: selectedVariant.id,
    };
    dispatch(addItemToCart(newItem));
    navigate("/cart");
    // dispatch(addItemToCart(id, 1));
    toast.success("Item added to cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <main style={{ minHeight: '600px' }} className="flex w-full flex-col items-center justify-start py-1">
            <div className="container w-full" style={{ opacity: 1 }}>
              <div className="container z-0 antialiased">
                <div className="overflow-visible">

                </div>
                <div style={{ minHeight: '600px' }} className="my-3 grid grid-cols-2 gap-4 rounded-lg bg-white py-3 px-3 max-md:my-2 max-md:grid-cols-1">
                  <div className="overflow-hidden">
                    <div>
                      <div style={{ minHeight: '600px' }}>
                        <Swiper
                          spaceBetween={10}
                          // slidesPerView={1}
                          navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          }}
                          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper2"
                          loop={true}
                        >
                          <div className="swiper-button-prev" ></div>
                          {images?.map((sliderImage, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <div className="max-md:h-[250px] md:h-[500px]">
                                  <img loading="lazy" src={sliderImage} height="500" className="imgslide max-md:h-[250px] md:h-[500px]" alt="" />
                                </div>
                              </SwiperSlide>
                            );
                          })}
                          <div className="swiper-button-next"></div>
                        </Swiper>
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={6}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper"
                        >
                          {images?.map((sliderImage, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <div className="z-50 flex cursor-pointer items-center justify-center py-1">
                                  <img loading="lazy" src={sliderImage} alt="" />
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>

                        <div className="flex w-full items-start justify-start py-2.5">
                          <div className="w-full rounded">
                            <div className="text-left text-10 antialiased">
                              <p style={{ textAlign: 'left' }}>
                                <span style={{ textDecoration: 'underline' }}>
                                </span>
                              </p>
                              <p>&nbsp;</p>
                              <p style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '10pt', fontFamily: 'Helvetica, Arial, sans-serif', color: '#000000' }}>
                                  <span style={{ color: '#e03e2d', fontSize: '14pt' }}>
                                  </span>
                                </span>
                              </p>
                              <p style={{ textAlign: 'center' }}>
                                <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                  <span style={{ color: '#e03e2d', fontSize: '10pt' }}>
                                    <strong></strong>
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="max-md:hidden">
                          <div className="box-cmt-info w-full rounded bg-pink p-2">
                            <div>
                              <div className="flex items-center">
                                <ProductIcon />
                                <p className="px-2 text-14 font-bold">Bộ sản phẩm bao gồm</p>
                              </div>
                              <div className="relative my-2 text-justify text-14 antialiased">
                                <p>
                                  Thân máy, Cáp sạc, Tài liệu hướng dẫn, Dụng cụ lấy SIM, Túi giấy cao cấp Di Động Việt
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <WarrantyIcon />
                                <p className="px-2 text-14 font-bold">Bảo hành</p>
                              </div>
                              <div className="box-info relative my-2 text-justify text-14 antialiased">
                                <p>
                                  Độc quyền tại Di Động Việt: Bảo hành
                                  <strong>&nbsp;Hư lỗi - Đổi mới</strong>
                                  &nbsp;trong vòng
                                  <strong> 33 ngày</strong>
                                  . Bảo hành độc quyền
                                  <strong> 02 năm </strong>
                                  <Link to="#">(Xem chi tiết)</Link>
                                  <br />
                                  Bảo hành &nbsp;
                                  <strong>Hư lỗi - Đổi mới 12 tháng</strong>
                                  , rơi vỡ với D.Care
                                  <Link to="#">&nbsp;(Xem chi tiết)</Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 max-md:hidden ">
                          <div className="relative my-2 text-justify text-16 leading-7 antialiased">
                            <p>
                              {product?.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blockPrice">
                    <div className="relative w-full flex-col justify-start">
                      <h1 className="productmobile text-20 font-bold max-md:text-16 max-md:font-bold">
                        {product?.name}
                      </h1>
                      <span className="relative bg-[#fcb40e] bg-opacity-60 inline-block mb-2 bordered-1 rounded-md  text-[13px] px-3 py-1">
                        <div className="flex aligns-middle items-center">
                          <DcoinIcon className="mr-2" width="20" />
                          {/* <a className="cursor-pointer" >
                            <QuestionIcon className="ml-2" width="15" />
                          </a> */}
                        </div>
                        {/* <div className="absolute bottom-0 left-0 translate-y-full bordered-1 bg-opacity-95 shadow-md shadow-neutral-300 bg-white rounded-md z-10">
                          <div className="px-2 py-1">
                            Số tiền tích lũy sau khi mua sản phẩm. Có thể quy đổi thành voucher để thanh toán.
                            <a target="_blank" className="text-blue-700 underline-offset-1 " href="https://didongviet.vn/dchannel/uu-dai-thanh-vien-di-dong-viet/">Xem chi tiết</a>
                          </div>
                        </div> */}
                      </span>
                      <div className="flex items-center box-rating justify-start max-md:pt-2">
                        <p className="text-sm max-md:hidden">
                          SKU: {sku}
                        </p>
                      </div>
                      <div className="flex items-center justify-between md:hidden">
                        <div className="flex items-baseline max-md:flex-col">
                          <p className="text-24 font-bold text-ddv">
                            {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                          </p>
                          <span className="text-sm font-normal text-[#555555] line-through">
                            {marketPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                          </span>
                        </div>
                        <p className="text-right text-sm">

                          <br />
                          <span className="text-sm font-bold">

                          </span>
                        </p>
                      </div>
                      <div className="my-2 grid grid-cols-4 gap-4 max-md:grid-cols-3 max-md:gap-2 ">
                        {uniqueRom?.map((e, index) => (
                          <div className={`item-center cursor-pointer border-1 item relative flex w-full flex-col justify-center rounded-lg ${selectedRom === e ? 'border-ddv' : 'border-border'} hover:border-ddv`}
                            style={{ width: '100%', height: '45px' }}
                            key={index}
                            onClick={() => handleRomClick(e)}
                          >
                            <p className={`${selectedRom === e ? 'text-red text-ddv font-bold' : 'text-black'} text-center text-13`}>
                              {e}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-brow">Chọn màu để xem giá chi tiết:</p>
                      <div className="my-2 grid w-full grid-cols-4 gap-4 md:grid-cols-5 max-md:grid-cols-4 max-md:gap-2">
                        {uniqueColor?.map((e, index) => (
                          <div className={`border-1 relative flex cursor-pointer items-center justify-start rounded-lg active:drop-shadow-2xl ${selectedColor === e ? 'border-ddv' : 'border-border'} hover:border-ddv`}
                            style={{ width: '100%', height: '35px' }}
                            key={index}
                            onClick={() => handleColorClick(e)}
                          >
                            <div className="px-1 w-full">
                              <p className={`w-full truncate text-center text-13 max-md:text-13 ${selectedColor === e ? 'text-red text-ddv font-bold' : 'text-black'}`}>
                                {e}
                              </p>
                            </div>
                          </div>
                        ))}

                      </div>
                      <div>
                        <p className="text-16 max-md:hidden">Giá bán</p>
                        <div className="flex items-center justify-between max-md:hidden">
                          <div className="flex items-baseline max-md:flex-col">
                            <p className="text-36 font-bold text-ddv">
                              {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                            </p>
                            <span className="pl-2 text-sm font-normal text-black line-through max-md:pl-0">
                              {marketPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                            </span>
                          </div>
                          <p className="text-right text-sm">

                            <br />
                            <span className="text-sm font-bold"></span>
                          </p>
                        </div>
                        <div className="border-1 mt-3 flex w-full flex-col rounded border-bordercam">
                          <div className="flex items-center justify-start bg-bordercam p-2">
                            <p className="mx-2 text-16 font-bold text-ddv">Khuyến mãi</p>
                          </div>
                          <div className="flex w-full flex-col items-start justify-start bg-white p-2">
                            <div className="box-gift1 relative text-justify text-14 max-md:leading-6 antialiased">
                              <p>
                              </p>
                              <p></p>
                              <p>
                                <strong>
                                  <span style={{ fontSize: '12pt' }}>Ưu đãi khi mua máy</span>
                                </strong>
                              </p>
                              <ul>
                                <li>Từ ngày {product?.discount?.startDate} - {product?.discount?.endDate} giảm {product?.discount?.discountValue}%</li>
                                {/* <li></li>
                                <li></li> */}
                              </ul>
                              <p>
                                <span style={{ fontSize: '12pt' }}></span>
                              </p>
                              <ul>
                                {/* <li></li>
                                <li></li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <button onClick={handleAddItem} className="relative mt-3 flex cursor-pointer items-center justify-center rounded-lg bg-ddv overflow-hidden" style={{ width: '100%', height: '64px' }}>
                          <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg">
                            <p className="text-center text-20 font-bold text-white">ĐẶT NGAY</p>
                            <p className="text-center text-sm text-white">Giao tận nơi hoặc nhận tại cửa hàng</p>
                          </div>
                        </button>
                        <p className="text-center text-sm text-black">
                          Gọi đặt mua
                          <span className="font-bold text-ddv">
                            <a href="tel">&nbsp;0329.364.192&nbsp;</a>
                          </span>
                          (7:30 - 22:00)
                        </p>
                        <div className="my-2 md:hidden">
                          <div className="box-cmt-info w-full rounded bg-pink p-2">
                            <div>
                              <div className="flex items-center">
                                <ProductIcon />
                                <p className="px-2 text-14 font-bold">Bộ sản phẩm bao gồm</p>
                              </div>
                              <div className="relative my-2 text-justify text-14 antialiased">
                                <p>Thân máy, Cáp sạc, Tài liệu hướng dẫn, Dụng cụ lấy SIM, Túi giấy cao cấp Di Động Việt</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center">
                                <WarrantyIcon />
                                <p className="px-2 text-14 font-bold">Bảo hành</p>
                              </div>
                              <div className="box-info relative my-2 text-justify text-14 antialiased">
                                <p>Độc quyền tại Di Động Việt: Bảo hành<strong> Hư lỗi - Đổi mới</strong> trong vòng <strong>33 ngày</strong>. Bảo hành độc quyền <strong>02 năm </strong>
                                  <a href="https://didongviet.vn/dchannel/nhap-hoi-samsung-bao-hanh-02-nam/" target="_blank" rel="noreferrer">(Xem chi tiết)</a>
                                  <br />
                                  Bảo hành <strong>Hư lỗi - Đổi mới 12 tháng</strong>, rơi vỡ với D.Care
                                  <a href="https://didongviet.vn/dchannel/5-loi-ich-goi-bao-hanh-mo-rong/" target="_blank" rel="noreferrer">(Xem chi tiết)</a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-1 mt-3 flex w-full flex-col overflow-hidden rounded-lg border-Accent_Color_1">
                          <div className="flex items-center justify-start bg-Accent_Color_1 p-2">
                            <p className="mx-2 text-14 font-bold text-white"></p>
                          </div>
                          <div className="flex w-full flex-col items-start justify-start bg-white p-2">
                            <div className="flex items-center py-2">
                              {/* <XeIcon stype={{ width: '20px', height: '20px', objectFit: 'contain' }} /> */}
                              <p className="pl-2 text-left text-14">
                                {/* Miễn phí Giao hàng siêu tốc trong */}
                                <span className="font-bold"></span>
                                <Link to="#" className="text-linkxanh"></Link>
                              </p>
                            </div>
                            <div className="flex items-center py-2">
                              {/* <GiftxanhIcon style={{ width: '20px', height: '20px', objectFit: 'contain' }} /> */}
                              <p className="pl-2 text-left text-14">
                                {/* Giảm thêm tới */}
                                {/* <span className="font-bold"> 1.5% </span> */}
                                {/* cho thành viên của Di Động Việt. */}
                                <Link to="#" className="text-linkxanh"></Link>
                              </p>
                            </div>
                            <div className="flex items-center py-2">
                              {/* <DcareIcon style={{ width: '20px', height: '20px', objectFit: 'contain' }} /> */}
                              <p className="pl-2 text-left text-14">
                                {/* Chỉ từ */}
                                {/* <strong> 2K/ngày </strong> */}
                                {/* có ngay Gói Bảo Hành Hư Lỗi - Đổi Mới trong 1 năm */}
                                <Link to="#" className="text-linkxanh"></Link>
                              </p>
                            </div>
                            <div className="flex items-center py-2">
                              {/* <img src="https://didongviet.vn/images/pc/VIB.png" alt="Ngân hàng VIB" style={{ width: '20px', height: '20px', objectFit: 'contain' }}></img> */}
                              <p className="pl-2 text-left text-14">
                                {/* Giảm thêm */}
                                {/* <span className="font-bold"> 500.000đ </span>
                                mở thẻ qua VIB */}
                                <Link to="#" className="text-linkxanh"></Link>
                              </p>
                            </div>
                            <div className="flex items-center py-2">
                              {/* <img src="https://didongviet.vn/images/uudai/logo-vpbank.jpg" alt="Ngân hàng VPBank" style={{ width: '20px', height: '20px', objectFit: 'contain' }}></img> */}
                              <p className="pl-2 text-left text-14">
                                {/* Giảm thêm
                                <span className="font-bold"> 500.000đ </span>
                                mở thẻ qua VPBank */}
                                <Link to="#" className="text-linkxanh"></Link>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="relative my-2 p-1 text-justify text-14 leading-6 antialiased md:hidden">
                          <p>
                            {product.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="my-2 rounded-lg bg-white px-2 md:hidden"></div>
                <div className="my-2 grid grid-cols-3 gap-4 max-md:hidden">
                  <div className="col-span-2">
                    <div className="my-2 rounded-lg bg-white py-3 px-3">
                      <div>
                        <div className="flex-col w-full relative bg-white p-2" style={{ overflow: 'hidden' }}>
                          <div className="relative text-17 box-cmt text-justify">
                            <div dangerouslySetInnerHTML={{ __html: product?.markdown?.contentHTML }}>

                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <ProductDetailsReview product={product} />

                  </div>
                  <div className="col-span-1">
                    <div className="my-2 rounded-lg bg-white py-3 px-3">
                      <div>
                        <div className="flex-col relative" style={{ height: '800px', overflow: 'hidden' }}>
                          <div className="mb-3 flex justify-start items-center max-md:pt-2">
                            <SettingIcon />
                            <h2 className="text-20 text-ddv font-bold mx-2">Thông số kỹ thuật</h2>
                          </div>
                          <div className="relative">
                            {detailSpec?.map((e, index) => (
                              <div key={index} className="flex flex-col justify-start items-start p-2">
                                <div>
                                  <p className="text-left font-bold pb-2">{e?.groupName}</p>
                                </div>
                                {e?.groupList?.map((f, idx) => (
                                  <div key={idx} className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                                    <div className="w-1/2">
                                      <p className="text-left">{f?.key}</p>
                                    </div>
                                    <div className="w-1/2">
                                      <p className="text-left break-words">{f?.value}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                          {/* <button className="more-content flex items-center justify-center absolute z-50 bottom-0 left-0">
                            <p className="text-ddv text-center font-bold text-16">Xem thêm</p>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;