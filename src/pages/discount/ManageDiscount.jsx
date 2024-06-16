import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Iconify from '../../component/iconify';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import { Box, Tooltip, IconButton } from '@mui/material';
import moment from 'moment';
import { paths } from "../../routes/paths";


const ManageDiscount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activePage, setActivePage] = useState(searchParams.get("page") || 1);
    // const [sort, setSort] = useState(searchParams.get("sort") || 'ASC');
    const [discountType, setDiscountType] = useState(searchParams.get("type") || "");
    const [searchedProduct, setSearchedProduct] = useState(searchParams.get("name") || "");
    const [selectedBranchId, setSelectedBranchId] = useState(searchParams.get("branchId") || 1);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState("")
    const [discounts, setDiscounts] = useState([]);
    const [storeBranches, setStoreBranches] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const branchId = selectedBranchId;

    useEffect(() => {
        setSearchParams({
            branchId,
            page: activePage,
            type: discountType,
            name: searchedProduct,
        });
    }, [activePage, discountType, searchedProduct, selectedBranchId]);

    async function fetchDiscounts() {
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const discountData = await axios.get('/api/discount', {
                params: {
                    page: activePage,
                    // sort: sort,
                    type: discountType,
                    name: searchedProduct,
                    branchId,
                },
                config,
            });
            setDiscounts(discountData.data.data);
            setTotalPage(Math.ceil(discountData.data.count / 12));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDiscounts();
        async function getStoreBranches() {
            try {
                const { data } = await axios.get('/api/storeBranch/admin/storeBranches')
                setStoreBranches(data.storeBranches)
            } catch (error) {
                console.log(error)
            }
        }
        getStoreBranches();
    }, [selectedBranchId, activePage, discountType, searchedProduct]);

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.inventory(`${id}`));
    };

    const handleAdd = (id) => {
        navigate(paths.dashboard.new.discount(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        // {
        //     field: 'productVariant',
        //     headerName: 'Product variant',
        //     width: 160,
        //     renderCell: (params) => (params.row.productVariant.name),
        // },
        { field: 'discountType', headerName: 'Discount Type', width: 160 },

        {
            field: 'discountValue',
            headerName: 'Discount',
            width: 160,
            renderCell: (params) => (
                params.row.discountType === "percentage")
                ? (params.row.discountValue) + '%'
                : params.row.discountType === "amount"
                    ? (params.row.discountValue).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    : "-",
        },
        {
            field: 'startDate',
            headerName: 'Start date',
            width: 200,
            renderCell: (params) =>
                moment(params.row.startDate).format('DD-MM-YYYY'),
        },
        {
            field: 'endDate',
            headerName: 'End date',
            width: 200,
            renderCell: (params) =>
                moment(params.row.endDate).format('DD-MM-YYYY'),
        },
        // discountType, discountValue, period, status
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const inventoryID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Update Discount">
                                <IconButton
                                    onClick={() => handleEdit(inventoryID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Fragment>
                )
            },
        },
    ];

    // const handleSortChange = (e) => {
    //     setSort(e.target.value);
    //     setActivePage(1);
    // };

    const handleFilterDiscountType = (e) => {
        setDiscountType(e.target.value)
        setActivePage(1);
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setActivePage(1);
            // setSort("ASC");
            setSearchedProduct(search)
        }
    };

    console.log(discounts);
    return (
        <DefaultLayout>
            <MetaData title="Manage Discount" />
            <Breadcrumb pageName="Manage Discount" />
            <div className="flex mx-auto rounded-md w-full px-2 bg-white">
                <div className="w-full lg:w-full p-4 lg:p-8 justify-start ">
                    <div className="flex flex-col md:flex-row lg:flex-row mb-6">
                        <div className="relative w-full">
                            <input
                                id="search" type="search"
                                placeholder="Search product name"
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown} defaultValue={searchedProduct}
                                className="text-black rounded-md border-0 border-blue-600 mr-10 pr-72 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset "
                            />
                            <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500 mr-10" onChange={handleFilterDiscountType} value={discountType}>
                                <option key="all" value="">All Discount Type</option>
                                <option key="percentage" value="percentage">
                                    Percentage
                                </option>
                                <option key="amount" value="amount">
                                    Amount
                                </option>
                                <option key="buy one get one" value="buy one get one">
                                    Buy 1 Get 1
                                </option>
                            </select>
                            <select
                                className="text-black rounded-md border border-blue-700 focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500"
                                id="filter" value={selectedBranchId}
                                onChange={(e) => setSelectedBranchId(e.target.value)}
                            >
                                <option key="all" value="">All store branch</option>
                                {storeBranches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.district} - {branch.province}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* <div className="flex mt-4 md:ml-8 md:mt-0 items-center">
                            <label className="text-black block w-16 font-medium leading-6 mr-[190px] ">Sort by:</label>
                            <select
                                className="text-black w-56 lg:w-60 rounded-md border border-gray-300 " id="filter" value={sort} onChange={handleSortChange}
                            >
                                <option value="ASC">Product Name A-Z</option>
                                <option value="DESC">Product Name Z-A</option>
                            </select>
                        </div> */}
                    </div>
                </div>
            </div>
            <button class="border-1 relative flex w-full items-center justify-center rounded bg-ddv py-2" onClick={() => handleAdd(branchId)}>
                <p class="text-14 font-bold text-white">Create Discount</p>
            </button>
            <Box
                sx={{
                    height: 400,
                    width: '100%',
                    mt: '20px',
                    bgcolor: 'primary.bright',
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={discounts}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    getRowId={(row) => row.id}
                    autoPageSize
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </Box>
        </DefaultLayout>
    );
};
export default ManageDiscount;