import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllStoreBranches,
    deleteStoreBranch,
    deleteStoreBranchReset,
} from "../../redux/slices/storeBranchSlice";
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
function StoreBranchList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, storeBranches, isLoading, isDeleted } = useSelector((state) => state.storeBranch);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("StoreBranch Deleted Successfully");
            navigate(paths.dashboard.list.storeBranch);
            dispatch(deleteStoreBranchReset());
        }
        if (check) {
            dispatch(getAllStoreBranches());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteStoreBranchHandler = (id) => {
        dispatch(deleteStoreBranch(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.storeBranch(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'branchName', headerName: 'Branch Name', width: 200 },
        { field: 'province', headerName: 'Province', width: 200 },
        { field: 'address', headerName: 'Address', width: 200 },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const storeBranchID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Edit this storeBranch">
                                <IconButton
                                    onClick={() => handleEdit(storeBranchID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this storeBranch">
                                <IconButton
                                    onClick={() => deleteStoreBranchHandler(storeBranchID)}
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
                    <MetaData title={`All Store Branches - Admin`} />
                    <Breadcrumb pageName="Store Branch List" />
                    <Box
                        sx={{
                            height: 400,
                            width: '100%',
                            mt: '20px',
                            bgstoreBranch: 'primary.bright',
                        }}
                    >
                        <DataGrid
                            columns={columns}
                            rows={storeBranches}
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

export default StoreBranchList;