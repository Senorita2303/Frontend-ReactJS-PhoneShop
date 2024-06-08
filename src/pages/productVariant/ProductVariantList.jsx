import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAdminProductVariants,
    deleteProductVariant,
    deleteProductVariantReset
} from "../../redux/slices/productVariantSlice";
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
function ProductVariantList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const { error, productVariants, isLoading, isDeleted } = useSelector((state) => state.productVariant);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("ProductVariant Deleted Successfully");
            navigate(paths.dashboard.list.productVariant);
            dispatch(deleteProductVariantReset());
        }
        dispatch(getAdminProductVariants());
    }, [dispatch, error, isDeleted, navigate]);

    const deleteProductVariantHandler = (id) => {
        dispatch(deleteProductVariant(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.productVariant(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        // {
        //     field: 'thumbUrl',
        //     headerName: 'Photo',
        //     width: 70,
        //     renderCell: (params) => (
        //         <img src={params.row.thumbUrl} alt="" />
        //     ),
        //     sortable: false,
        //     filterable: false,
        // },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'sku', headerName: 'Sku', width: 150 },
        { field: 'stock', headerName: 'Stock', width: 150 },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
            renderCell: (params) => (params.row.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            renderCell: (params) =>
                moment(params.row.createAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const productVariantID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="View productVariant details">
                                <IconButton color="secondary">
                                    <Iconify icon="ic:baseline-remove-red-eye" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit this productVariant">
                                <IconButton
                                    onClick={() => handleEdit(productVariantID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this productVariant">
                                <IconButton
                                    onClick={() => deleteProductVariantHandler(productVariantID)}
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
                    <MetaData title={`All Product Variants - Admin`} />
                    <Breadcrumb pageName="Product Variant List" />
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
                            rows={productVariants}
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

export default ProductVariantList;