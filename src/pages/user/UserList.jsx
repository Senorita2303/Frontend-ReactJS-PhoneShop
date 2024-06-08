import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
// import {
//     clearErrors,
//     getAllUsers,
//     deleteUser
// } from "../../actions/userAction";
import {
    clearErrors,
    getAllUsers,
    deleteUser,
    deleteReset
} from "../../redux/slices/userSlice";
// import { DELETE_USER_RESET } from "../../constants/userConstant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, Box, Tooltip, IconButton } from '@mui/material';
import Iconify from '../../component/iconify';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import moment from 'moment';
import { paths } from "../../routes/paths";
function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const { error, users, isLoading, isDeleted } = useSelector((state) => state.user);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("User Deleted Successfully");
            navigate(paths.dashboard.list.user);
            dispatch(deleteReset());
        }
        if (users.length === 0) {
            dispatch(getAllUsers());
        }
    }, [dispatch, error, isDeleted, navigate, users]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.user(`${id}`));
    };

    const columns = [
        {
            field: 'avatarUrl',
            headerName: 'Photo',
            width: 70,
            renderCell: (params) => (
                <Avatar src={params.row.avatarUrl} variant="rounded" />
            ),
            sortable: false,
            filterable: false,
        },
        { field: 'userName', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) =>
                moment(params.row.createAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        { field: 'isAdmin', headerName: 'Is Admin', width: 80 },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const userID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="View user details">
                                <IconButton color="secondary">
                                    <Iconify icon="ic:baseline-remove-red-eye" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit this user">
                                <IconButton
                                    onClick={() => handleEdit(userID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this user">
                                <IconButton
                                    onClick={() => deleteUserHandler(userID)}
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
                    <MetaData title={`All Users - Admin`} />
                    <Breadcrumb pageName="User List" />
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
                            rows={users}
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

export default UserList;