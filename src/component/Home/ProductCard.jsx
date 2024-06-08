import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";

const ProductCard = ({ product }) => {
  let originalPrice = product?.basePrice * (100 - product?.discountPercentage) / 100;
  originalPrice = Math.round(originalPrice / 10000) * 10000;
  return (
    <div>
      <Link to={paths.product.details(`${product.id}`)} state={{ singleProduct: product }} title="" className="item-slider-mobile md:item-slider border-1 col-span-1 h-full flex-col items-center justify-start rounded border-borderprod p-2 hover:border-white hover:drop-shadow-xl max-md:border-0">
        <div style={{ height: '30px' }} className="pb-2 flex w-full items-center justify-start">
          <p className="border-1 m-1 items-center whitespace-nowrap rounded border-ddv bg-ddv px-2 py-1 text-11 text-white max-md:text-10">
            Giảm {product?.discountPercentage} %
          </p>
          <p className="border-1 m-1 whitespace-nowrap rounded border-ddv bg-white px-2 py-1 text-11 font-medium text-ddv max-md:text-10">
            Trả góp 0%
          </p>
        </div>
        <div className="relative w-full">
          <div className="h-[250px] w-full  max-md:h-[auto]" style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="imgmobileproduct imgproduct transition  duration-200 ease-in-out hover:scale-105 md:h-[200px] md:w-[200px]">
              <img loading="lazy" width="600" height="600" src={product?.thumbUrl} alt=""></img>
            </div>
          </div>
        </div>
        <h3 className="w-full px-2 py-2.5 text-left text-sm max-md:text-13">{product?.name}</h3>
        <div className="flex w-full items-center justify-start px-2">
          <div className="w-full flex-col items-start justify-start">
            <p className="text-left text-16 font-bold text-ddv ">{originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
            <p className="text-left  text-14 text-linebreak line-through ">{product?.basePrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
          </div>
        </div>
        {/* <div className="flex w-full items-start justify-start overflow-hidden px-1 py-2">
          <div className=" max-md:promotion-mobile w-full rounded bg-comment p-1">
            <p>
              <img src="https://cdn-v2.didongviet.vn/files/default/2024/1/18/0/1708270909904_nhaan_02_03.png" width="1600" height="374" alt=""></img>
            </p>
            <p style={{ textAlign: 'center' }}>
              <span style={{
                fontSize: '10pt',
                fontFamily: 'helvetica, arial, sans-serif',
                color: '#000000'
              }}>
                Giá mua ngay
                <span style={{
                  color: '#e03e2d',
                  fontSize: '14pt'
                }}>
                  <strong>7.690.000đ</strong>
                </span>
              </span>
            </p>
            <p style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: 'helvetica, arial, sans-serif',
                fontSize: '10pt',
                color: '#000000',
              }}>
                <span style={{ fontSize: '8pt' }}>
                  Giảm thêm 5% đến
                </span>
                <span style={{ color: '#e03e2d' }}>
                  <strong> 500K</strong>
                </span>
              </span>
            </p>
          </div>
        </div> */}
      </Link>
    </div >
  );
};

export default ProductCard;
