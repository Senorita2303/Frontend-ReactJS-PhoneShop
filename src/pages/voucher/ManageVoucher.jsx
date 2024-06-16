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


const ManageVoucher = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activePage, setActivePage] = useState(searchParams.get("page") || 1);
    // const [sort, setSort] = useState(searchParams.get("sort") || 'ASC');
    const [voucherType, setVoucherType] = useState(searchParams.get("type") || "");
    const [searchedProduct, setSearchedProduct] = useState(searchParams.get("name") || "");
    const [selectedBranchId, setSelectedBranchId] = useState(searchParams.get("branchId") || 1);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState("")
    const [vouchers, setVouchers] = useState([]);
    // const [storeBranches, setStoreBranches] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const branchId = selectedBranchId;

    useEffect(() => {
        setSearchParams({
            page: activePage,
            type: voucherType,
        });
    }, [activePage, voucherType]);

    async function fetchVouchers() {
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const voucherData = await axios.get('/api/voucher', {
                params: {
                    page: activePage,
                    type: voucherType,
                },
                config,
            });
            setVouchers(voucherData.data.data);
            setTotalPage(Math.ceil(voucherData.data.count / 12));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchVouchers();
    }, [activePage, voucherType]);

    // const handleEdit = (id) => {
    //     navigate(paths.dashboard.edit.inventory(`${id}`));
    // };

    const handleAdd = () => {
        navigate(paths.dashboard.new.voucher);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        // {
        //     field: 'productVariant',
        //     headerName: 'Product variant',
        //     width: 160,
        //     renderCell: (params) => (params.row.productVariant.name),
        // },
        { field: 'voucherType', headerName: 'Voucher Type', width: 160 },
        {
            field: 'productVariant',
            headerName: 'Product Variant',
            width: 160,
            renderCell: (params) => (params.row.inventory.productVariant.name)
        },
        //voucher value, max discount, min purchase value, period, status
        {
            field: 'voucherValue',
            headerName: 'Voucher',
            width: 160,
            renderCell: (params) => (
                params.row.voucherKind === "percentage")
                ? (params.row.voucherValue) + '%'
                : (params.row.voucherValue).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        },
        {
            field: 'maxDiscount',
            headerName: 'Max discount',
            width: 200,
            renderCell: (params) => (
                params.row.maxDiscount === null
                    ? '-'
                    : (params.row.maxDiscount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            )
        },
        {
            field: 'minPurchaseAmount',
            headerName: 'Min Purchase Amount',
            width: 200,
            renderCell: (params) => (params.row.minPurchaseAmount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        },
        {
            field: 'startDate',
            headerName: 'Start date',
            width: 150,
            renderCell: (params) =>
                moment(params.row.startDate).format('DD-MM-YYYY'),
        },
        {
            field: 'endDate',
            headerName: 'End date',
            width: 150,
            renderCell: (params) =>
                moment(params.row.endDate).format('DD-MM-YYYY'),
        },
        // voucherType, voucherValue, period, status
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
                            <Tooltip title="Update Voucher">
                                <IconButton
                                    // onClick={() => handleEdit(inventoryID)}
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

    const handleFilterVoucherType = (e) => {
        setVoucherType(e.target.value)
        setActivePage(1);
    };

    console.log(vouchers);
    return (
        <DefaultLayout>
            <MetaData title="Manage Voucher" />
            <Breadcrumb pageName="Manage Voucher" />
            <div className="flex mx-auto rounded-md w-full px-2 bg-white">
                <div className="w-full lg:w-full p-4 lg:p-8 justify-start ">
                    <div className="flex flex-col md:flex-row lg:flex-row mb-6">
                        <div className="relative w-full">
                            <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500 mr-10" onChange={handleFilterVoucherType} value={voucherType}>
                                <option key="all" value="">All Voucher Type</option>
                                <option key="product" value="product">
                                    Product Voucher
                                </option>
                                <option key="shipping" value="shipping">
                                    Shipping Voucher
                                </option>
                                <option key="total purchase" value="total purchase">
                                    Total Purchase
                                </option>
                                <option key="referral code" value="referral code">
                                    Referral Code
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button class="border-1 relative flex w-full items-center justify-center rounded bg-ddv py-2" onClick={() => handleAdd()}>
                <p class="text-14 font-bold text-white">Create Voucher</p>
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
                    rows={vouchers}
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
export default ManageVoucher;