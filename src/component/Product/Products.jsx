import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData/MetaData";
import { clearErrors, getProduct } from "../../redux/slices/productSlice";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider, Typography, Select, MenuItem, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const categories = [
    "Điện thoại",
    "Apple (AAR)",
    "Laptop / Tablet",
    "Máy cũ giá rẻ",
    "Phụ kiện",
    "Thiết bị đeo tay",
    "Thiết bị âm thanh",
];

const brands = [
    "Apple",
    "Realme",
    "Honor",
    "Vertu",
    "Oppo",
    "Samsung",
    "Xiaomi",
    "Vivo",
    "Huawei",
    "iQOO"
]

function Products() {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const {
        products,
        loading,
        productsCount,
        error,
        resultPerPage,
        // filterdProductCount,
    } = useSelector((state) => state.product);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 40000000]); // initial limit from min=0 to max=25000
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [ratings, setRatings] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, brand, ratings));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, keyword, currentPage, price, ratings, category, brand]);

    const setCurrentPageNoHandler = (e) => {
        setCurrentPage(e); // e is the clicked page value
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    const handleCategoryChange = (category) => {
        setCategory(category);
        setSelectedCategory(category);
        // setSelectedCategory(category);
        // Perform any additional actions or filtering based on the selected category
    };
    const handleBrandChange = (brand) => {
        setBrand(brand);
        setSelectedBrand(brand);
        // setSelectedBrand(brand);
        // Perform any additional actions or filtering based on the selected brand
    };




    const [selectedRating, setSelectedRating] = React.useState("all");

    const handleRatingChange = (event) => {
        setRatings(event.target.value);
        setSelectedRating(event.target.value);
    };



    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Search Product" />
                    {products === undefined || products.length === 0 ? (
                        <>
                            <div
                                className="emptyCartContainer "
                                style={{ marginTop: "5rem", background: "white" }}
                            >
                                <InventoryIcon className="cartIcon" />

                                <Typography variant="h5" component="h1" className="cartHeading">
                                    Product Not Found
                                </Typography>
                                <Typography variant="body" className="cartText">
                                    Nothin' to see here.
                                </Typography>
                                <Typography variant="body" className="cartText">
                                    There is no product with this name
                                </Typography>

                                <Button
                                    className="shopNowButton"
                                    onClick={() => window.location.reload()}
                                    style={{ width: "7rem" }}
                                >
                                    Refresh
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="productPage">
                            <div className="prodcutPageTop">
                                <div className="filterBox">
                                    {/* Price */}
                                    <div className="priceFilter">
                                        <Typography
                                            style={{
                                                fontSize: "18px",
                                                padding: "5px",
                                                fontWeight: 700,
                                                color: "#414141",
                                            }}
                                        >
                                            Price
                                        </Typography>
                                        <div className="priceSlider">
                                            <Slider
                                                value={price}
                                                onChange={priceHandler}
                                                min={0}
                                                max={50000000}
                                                step={100000}
                                                valueLabelDisplay="auto"
                                                aria-labelledby="range-slider"
                                            />
                                        </div>
                                        <div className="priceSelectors">
                                            <div className="priceSelector">
                                                <Select
                                                    value={price[0]}
                                                    onChange={(e) =>
                                                        setPrice([+e.target.value, price[1]])
                                                    }
                                                    className="priceOption"
                                                    IconComponent={ArrowDropDownIcon}
                                                    renderValue={(selected) =>
                                                        selected !== "" ? selected : "min"
                                                    } // Display "min" as default label
                                                >
                                                    <MenuItem value={5000} className="menu_item">
                                                        5000
                                                    </MenuItem>
                                                    <MenuItem value={10000} className="menu_item">
                                                        10000
                                                    </MenuItem>
                                                    {/* Add more options as per your requirement */}
                                                </Select>
                                                <span className="toText">to</span>
                                                <Select
                                                    value={price[1]}
                                                    onChange={(e) =>
                                                        setPrice([price[0], +e.target.value])
                                                    }
                                                    className="priceOption"
                                                    IconComponent={ArrowDropDownIcon}
                                                    renderValue={(selected) =>
                                                        selected !== "" ? selected : "max"
                                                    }
                                                >
                                                    <MenuItem value={50000} className="menu_item">
                                                        50000
                                                    </MenuItem>
                                                    <MenuItem value={20000} className="menu_item">
                                                        20000
                                                    </MenuItem>
                                                    {/* Add more options as per your requirement */}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="filter_divider"></div>

                                    {/* Categories */}
                                    <div className="categoriesFilter">
                                        <Typography
                                            style={{
                                                fontSize: "18px",
                                                padding: "10px",
                                                fontWeight: 700,
                                                color: "#414141",
                                            }}
                                        >
                                            Categories
                                        </Typography>
                                        <ul className="categoryBox">
                                            {categories.map((category, index) => (
                                                <li className="category-link" key={index}>
                                                    <label
                                                        htmlFor={`category-${index}`}
                                                        className="category-label"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`category-${index}`}
                                                            className="category-checkbox"
                                                            value={category}
                                                            checked={category === selectedCategory}
                                                            onChange={() => handleCategoryChange(category)}
                                                        />
                                                        {category}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="filter_divider"></div>

                                    <div className="categoriesFilter">
                                        <Typography
                                            style={{
                                                fontSize: "18px",
                                                padding: "10px",
                                                fontWeight: 700,
                                                color: "#414141",
                                            }}
                                        >
                                            Brands
                                        </Typography>
                                        <ul className="categoryBox">
                                            {brands.map((brand, index) => (
                                                <li className="category-link" key={index}>
                                                    <label
                                                        htmlFor={`brand-${index}`}
                                                        className="category-label"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`brand-${index}`}
                                                            className="category-checkbox"
                                                            value={brand}
                                                            checked={brand === selectedBrand}
                                                            onChange={() => handleBrandChange(brand)}
                                                        />
                                                        {brand}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="filter_divider"></div>
                                    {/* Ratings */}
                                    <div className="ratingsFilter">
                                        <Typography
                                            style={{
                                                fontSize: "18px",
                                                padding: "10px",
                                                fontWeight: 700,
                                                color: "#414141",
                                            }}
                                        >
                                            Ratings Above
                                        </Typography>
                                        <RadioGroup
                                            value={selectedRating}
                                            onChange={handleRatingChange}
                                            row
                                            className="ratingsBox"
                                        >
                                            <FormControlLabel
                                                value="4"
                                                control={<Radio />}
                                                label="4★ & above"
                                            />
                                            <FormControlLabel
                                                value="3"
                                                control={<Radio />}
                                                label="3★ & above"
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio />}
                                                label="2★ & above"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="1★ & above"
                                            />
                                        </RadioGroup>
                                    </div>
                                    <div className="filter_divider"></div>
                                    {/* Clear Filters */}
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-2">
                                    {products &&
                                        products.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                </div>
                            </div>

                            {/* Pagination */}

                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    // itemsCountPerPage={resultPerPage}
                                    // totalItemsCount={productsCount}
                                    onChange={setCurrentPageNoHandler}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="First"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>

                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Products;