import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllVouchers,
    deleteVoucher,
    deleteVoucherReset,
} from "../../redux/slices/voucherSlice";
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
function VoucherList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, vouchers, isLoading, isDeleted } = useSelector((state) => state.voucher);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Voucher Deleted Successfully");
            navigate(paths.dashboard.list.voucher);
            dispatch(deleteVoucherReset());
        }
        if (check) {
            dispatch(getAllVouchers());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteVoucherHandler = (id) => {
        dispatch(deleteVoucher(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.voucher(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'voucherType', headerName: 'Voucher tpye', width: 150 },
        { field: 'voucherKind', headerName: 'Voucher kind', width: 150 },
        { field: 'voucherValue', headerName: 'Voucher value', width: 150 },
        { field: 'maxDiscount', headerName: 'Max discount', width: 150 },
        { field: 'minPurchaseAmount', headerName: 'Min purchase amount', width: 170 },
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
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const voucherID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Edit this voucher">
                                <IconButton
                                    onClick={() => handleEdit(voucherID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this voucher">
                                <IconButton
                                    onClick={() => deleteVoucherHandler(voucherID)}
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
                    <MetaData title={`All Vouchers - Admin`} />
                    <Breadcrumb pageName="Voucher List" />
                    <Box
                        sx={{
                            height: 400,
                            width: '100%',
                            mt: '20px',
                            bgvoucher: 'primary.bright',
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
            )}
        </Fragment>
    );
}

export default VoucherList;