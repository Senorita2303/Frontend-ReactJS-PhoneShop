import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllOrders,
    deleteOrder,
    deleteReset
} from "../../redux/slices/orderSlice";
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
function OrderList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [check, setCheck] = useState(true);
    const { error, orders, isLoading, isDeleted } = useSelector((state) => state.order);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("order Deleted Successfully");
            navigate(paths.dashboard.list.order);
            dispatch(deleteReset());
        }
        if (check) {
            dispatch(getAllOrders());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate, orders]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.order(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'userName', headerName: 'Customer', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            width: 150,
            renderCell: (params) => (params.row.orderStatus.name),
        },
        // {
        //     field: 'payment',
        //     headerName: 'Payment Method',
        //     width: 200,
        //     renderCell: (params) => (params.row.payment.paymentMethod.name),
        // },
        {
            field: 'payment',
            headerName: 'Payment Status',
            width: 170,
            renderCell: (params) => (params.row.payment.paymentStatus.name),
        },
        {
            field: 'subTotal',
            headerName: 'Sub Total',
            width: 150,
            renderCell: (params) => (params.row.subTotal).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 150,
            renderCell: (params) => (params.row.total).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const orderID = params.row.id;
                console.log(params.row);
                return (
                    <Fragment>
                        <Box>
                            {/* <Tooltip title="View order details">
                                <IconButton color="secondary">
                                    <Iconify icon="ic:baseline-remove-red-eye" />
                                </IconButton>
                            </Tooltip> */}
                            <Tooltip title="Edit this order">
                                <IconButton
                                    onClick={() => handleEdit(orderID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this order">
                                <IconButton
                                    onClick={() => deleteOrderHandler(orderID)}
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
                    <MetaData title={`All Orders - Admin`} />
                    <Breadcrumb pageName="Order List" />
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
                            rows={orders}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 7,
                                    },
                                },
                            }}
                            getRowId={(row) => row.id}
                            pageSizeOptions={[7]}
                            getRowSpacing={(params) => ({
                                top: params.isFirstVisible ? 0 : 5,
                                bottom: params.isLastVisible ? 0 : 5,
                            })}
                        />
                    </Box>
                    {/* </div>
                    </div> */}
                </DefaultLayout>
            )}
        </Fragment>
    );
}

export default OrderList;