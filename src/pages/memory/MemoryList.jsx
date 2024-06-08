import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllMemories,
    deleteMemory,
    deleteMemoryReset,
} from "../../redux/slices/memorySlice";
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
function MemoryList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, memories, isLoading, isDeleted } = useSelector((state) => state.memory);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Memory Deleted Successfully");
            navigate(paths.dashboard.list.memory);
            dispatch(deleteMemoryReset());
        }
        if (check) {
            dispatch(getAllMemories());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteMemoryHandler = (id) => {
        dispatch(deleteMemory(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.memory(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'ram', headerName: 'Ram', width: 150 },
        { field: 'rom', headerName: 'Rom', width: 150 },
        { field: 'chipset', headerName: 'Chipset', width: 150 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) =>
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'action',
            headerName: 'Actions',
            type: 'actions',
            width: 150,
            renderCell: (params) => {
                const memoryID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Edit this memory">
                                <IconButton
                                    onClick={() => handleEdit(memoryID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this memory">
                                <IconButton
                                    onClick={() => deleteMemoryHandler(memoryID)}
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
                    <MetaData title={`All Memories - Admin`} />
                    <Breadcrumb pageName="Memory List" />
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
                            rows={memories}
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

export default MemoryList;