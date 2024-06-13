import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllDiscounts,
    deleteDiscount,
    deleteDiscountReset,
} from "../../redux/slices/discountSlice";
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
function DiscountList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, discounts, isLoading, isDeleted } = useSelector((state) => state.discount);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Discount Deleted Successfully");
            navigate(paths.dashboard.list.discount);
            dispatch(deleteDiscountReset());
        }
        if (check) {
            dispatch(getAllDiscounts());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteDiscountHandler = (id) => {
        dispatch(deleteDiscount(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.discount(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'productId', headerName: 'Product', width: 200 },
        { field: 'discountType', headerName: 'Discount type', width: 200 },
        { field: 'discountValue', headerName: 'Discount value', width: 200 },
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
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const discountID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Edit this discount">
                                <IconButton
                                    onClick={() => handleEdit(discountID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this discount">
                                <IconButton
                                    onClick={() => deleteDiscountHandler(discountID)}
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
                    <MetaData title={`All Discounts - Admin`} />
                    <Breadcrumb pageName="Discount List" />
                    <Box
                        sx={{
                            height: 400,
                            width: '100%',
                            mt: '20px',
                            bgdiscount: 'primary.bright',
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
            )}
        </Fragment>
    );
}

export default DiscountList;