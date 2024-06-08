import React, { Fragment, useState, useEffect, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAdminProducts,
    deleteProduct,
    deleteProductReset
} from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Tooltip, IconButton } from '@mui/material';
import Iconify from '../../component/iconify';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import moment from 'moment';
import { paths } from "../../routes/paths";
function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, products, isLoading, isDeleted } = useSelector((state) => state.product);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Product Deleted Successfully");
            navigate(paths.dashboard.list.product);
            dispatch(deleteProductReset());
        }
        if (check) {
            dispatch(getAdminProducts());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.product(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'thumbUrl',
            headerName: 'Photo',
            width: 70,
            renderCell: (params) => (
                <img src={params.row.thumbUrl} alt="" />
                // <Avatar src={params.row.thumbnail.url} variant="rounded" />
            ),
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'desc', headerName: 'Description', width: 150 },
        {
            field: 'basePrice',
            headerName: 'Base Price',
            width: 160,
            renderCell: (params) => (params.row.basePrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
        },
        { field: 'discountPercentage', headerName: 'Discount', width: 150 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) =>
                moment(params.row.createAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const productID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="View product details">
                                <IconButton color="secondary">
                                    <Iconify icon="ic:baseline-remove-red-eye" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit this product">
                                <IconButton
                                    onClick={() => handleEdit(productID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this product">
                                <IconButton
                                    onClick={() => deleteProductHandler(productID)}
                                    color="error"
                                >
                                    <Iconify icon="ic:baseline-delete" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Fragment>
                )
            },
        },
    ];

    return (
        <Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={`All Products - Admin`} />
                    <Breadcrumb pageName="Product List" />
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
                            rows={products}
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
            )}
        </Fragment>
    );
}

export default ProductList;