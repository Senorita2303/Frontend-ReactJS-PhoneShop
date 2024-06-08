import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllColors,
    deleteColor,
    deleteColorReset,
} from "../../redux/slices/colorSlice";
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
function ColorList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, colors, isLoading, isDeleted } = useSelector((state) => state.color);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Color Deleted Successfully");
            navigate(paths.dashboard.list.color);
            dispatch(deleteColorReset());
        }
        if (check) {
            dispatch(getAllColors());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteColorHandler = (id) => {
        dispatch(deleteColor(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.color(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'code', headerName: 'Code', width: 200 },
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
                const colorID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Edit this color">
                                <IconButton
                                    onClick={() => handleEdit(colorID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this color">
                                <IconButton
                                    onClick={() => deleteColorHandler(colorID)}
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
                    <MetaData title={`All Colors - Admin`} />
                    <Breadcrumb pageName="Color List" />
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
                            rows={colors}
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

export default ColorList;