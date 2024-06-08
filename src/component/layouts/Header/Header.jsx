import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileModal from "./ProfileModel";

import { ReactComponent as Search } from "../../../Image/Header/search.svg";
import { ReactComponent as Phone } from "../../../Image/Header/phone.svg";
import { ReactComponent as Location } from "../../../Image/Header/location.svg";
import { ReactComponent as Package } from "../../../Image/Header/package.svg";
import { ReactComponent as Cart } from "../../../Image/Header/cart.svg";
import { ReactComponent as Menu } from "../../../Image/Header/menu.svg";
import { ReactComponent as Trolly } from "../../../Image/Header/trolly.svg";
function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const [sideMenu, setSideMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // this is for handle sideBar
  // const handleSideBarMenu = () => {
  //   setSideMenu(!sideMenu);
  // };

  // this is for input value of Search bar.
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products/${searchValue}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <div className="relative text-14 text-white antialiased"></div>
      <div className="z-0 w-full transition-all">
        <div className="bg-red-700">
          <div className="w-full overflow-hidden max-md:hidden" style={{
            height: '44px',
            minWidth: '100vh'
          }}>
            <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <div className="w-full overflow-hidden" style={{
                backgroundColor: 'rgb(179, 29, 41)',
                height: '44px'
              }}>
                <Link to="/" target="_self" className="item-center flex w-full justify-center" style={{
                  height: '50px',
                  position: 'relative'
                }}>
                  <span style={{
                    boxSizing: 'border-box',
                    display: 'inline-block',
                    overflow: 'hidden',
                    width: '1250px',
                    height: '44px',
                    background: 'none',
                    opacity: 1,
                    border: '0px',
                    margin: '0px',
                    padding: '0px',
                    position: 'relative'
                  }}>
                    <img src={require("../../../Image/Header/Header1.avif")} style={{
                      position: 'absolute',
                      inset: 0,
                      boxSizing: 'border-box',
                      padding: 0,
                      border: 'none',
                      margin: 'auto',
                      display: 'block',
                      width: 0,
                      height: 0,
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '100%',
                      maxHeight: '100%',
                      objectFit: 'fill'
                    }} alt="Header"></img>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden" style={{ height: '50px' }}>
            <div className="w-full overflow-hidden" style={{ backgroundColor: 'rgb(179, 29, 41)', height: '50px' }}>
              <Link to="/" target="_self" className="item-center flex w-full justify-center" style={{ height: '50px', position: 'relative' }}>
                <span style={{
                  boxSizing: 'border-box',
                  display: 'inline-block',
                  overflow: 'hidden',
                  width: '500px',
                  height: '50px',
                  background: 'none',
                  opacity: 1,
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  position: 'relative'
                }}>
                  <img src={require("../../../Image/Header/Header2.avif")} style={{
                    position: 'absolute',
                    inset: '0px',
                    boxSizing: 'border-box',
                    padding: '0px',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: '0px',
                    height: '0px',
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                    objectFit: 'fill'
                  }} alt="Header Mobile"></img>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <header className="page-header flex h-[95px] w-full min-w-full items-center justify-center max-md:h-[100px]">
          <div className="container">
            <div className="w-full items-center py-2 flex md:gap-x-8">
              <div className="hidden max-md:w-1/6 pl-1">
                <Link to="/">
                  <Menu />
                </Link>
              </div>
              <div className="md:hidden max-md:w-1/6 pl-1">
                <button>
                  <Menu />
                </button>
              </div>
              <div className="max-md:w-4/6 md:w-2/6">
                <Link to="/" title="Di Động Việt - Hệ thống bán lẻ Điện thoại, Macbook, Phụ kiện chính hãng">
                  <div className="md:hidden text-center">
                    <img className="max-h-[30px] mx-auto" src="https://didongviet.vn/svg/Header/logowhite.svg" alt="Di Động Việt - Chuyển giao giá trị vượt trội" />
                  </div>
                  <div className="max-md:hidden">
                    <img width="230" height="54" src="https://didongviet.vn/svg/Header/logowhite.svg" alt="Di Động Việt - Chuyển giao giá trị vượt trội" />
                  </div>
                </Link>
              </div>
              <div className="md:hidden pr-1 text-right max-md:w-1/6">
                <Link to="/cart" >
                  <Trolly className="ml-auto" />
                </Link>
              </div>
              <div className="max-md:col-span-5 max-md:hidden md:w-2/6">
                <div className="md:mt-5 relative w-full flex flex-col items-end justify-end antialiased">
                  <div className="mx-auto w-full text-gray-600 md:pt-2">
                    <input className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-4 pr-16 text-sm focus:outline-none" placeholder="Tìm kiếm sản phẩm" value={searchValue} onChange={handleSearchInputChange} />
                    <span className="absolute right-0 top-4 mr-4 max-md:top-2">
                      <button aria-label="search" className="flex items-center justify-center" type="button" onClick={handleSearch}>
                        <Search />
                      </button>
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-center py-2 max-md:hidden" style={{ minHeight: '20px' }}>
                    <Link to="#"><p className="px-2 text-10 font-bold  text-white hover:underline">iPhone 15 Pro Max</p></Link>
                    <Link to="#"><p className="px-2 text-10 font-bold  text-white hover:underline">Galaxy S24 Ultra</p></Link>
                    <Link to="#"><p className="px-2 text-10 font-bold  text-white hover:underline">Xiaomi 14</p></Link>
                    <Link to="#"><p className="px-2 text-10 font-bold  text-white hover:underline">iPad 9</p></Link>
                  </div>
                </div>
              </div>
              <div className="max-md:hidden max-md:col-span-1 md:w-3/6">
                <div className="flex w-full items-center justify-between max-md:hidden">
                  <div className="w-1/5">
                    <Link href="/">
                      <div className="flex items-center justify-start menuhover">
                        <div className="w-1/4 relative">
                          <Phone />
                        </div>
                        <div className="w-3/4 pl-2">
                          <div className="justify-center items-center">
                            <p className="sub text-sm text-white">Đặt hàng</p>
                            <p className="title text-sm text-white">1800.6018</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="w-1/5">
                    <Link to="/">
                      <div className="flex items-center justify-start menuhover">
                        <div className="w-1/4 relative">
                          <Location />
                        </div>
                        <div className="w-3/4 pl-2">
                          <div className="justify-center items-center">
                            <p className="sub text-sm text-white ">Cửa hàng</p>
                            <p className="title text-sm text-white">gần bạn</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="w-1/5">
                    <Link to="/tra-cuu">
                      <div className="flex items-center justify-start menuhover">
                        <div className="w-1/4 relative">
                          <Package />
                        </div>
                        <div className="w-3/4 pl-2">
                          <div className="justify-center items-center">
                            <p className="sub text-sm text-white ">Tra cứu</p>
                            <p className="title text-sm text-white">đơn hàng</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="w-1/5">
                    <Link to="/cart">
                      <div className="flex items-center justify-start menuhover">
                        <div className="w-1/4 relative">
                          <Cart />
                          <div className="absolute" style={{
                            position: 'relative',
                            top: '8px',
                            left: '10px'
                          }}>
                            <p className="text-18 tracking-wide subpixel-antialiased text-ddv font-bold"></p>
                          </div>
                        </div>
                        <div className="w-3/4 pl-2">
                          <div className="justify-center items-center">
                            <p className="sub text-sm text-white">Giỏ</p>
                            <p className="title text-sm text-white">hàng</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="w-1/5">
                    <ProfileModal user={user} isAuthenticated={isAuthenticated} />
                  </div>
                </div>
                <Link to="/" className="md:hidden" aria-label="tra cứu">
                  <div className="relative flex items-center justify-center" style={{ height: '50px' }}> </div>
                </Link>
              </div>
              <div className="col-span-1 max-md:hidden md:hidden">
                <Link to="/">
                  <div style={{ height: '50px' }} className="relative flex items-center justify-center">
                    <img src="https://didongviet.vn/images/mobile/cart.png" width="21" height="27" style={{ height: '27px', objectFit: 'contain' }} alt="DDV"></img>
                  </div>
                </Link>
              </div>
            </div>
            <div className="md:hidden px-2 w-full">
              <div className="md:mt-5 relative w-full flex  flex-col items-end   justify-end antialiased">
                <div className="mx-auto w-full text-gray-600 md:pt-2">
                  <input className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-4 pr-16 text-sm focus:outline-none" placeholder="Tìm kiếm sản phẩm" value={searchValue} onChange={handleSearchInputChange} />
                  <span className="absolute right-0 top-4 mr-4 max-md:top-2">
                    <button aria-label="search" className="flex items-center justify-center" type="button" onClick={handleSearch}>
                      <Search />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div >
    </>
  );
}

export default Header;