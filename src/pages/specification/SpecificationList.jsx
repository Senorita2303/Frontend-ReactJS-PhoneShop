import React, { Fragment, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAllSpecifications,
    deleteSpecification,
    deleteSpecificationReset,
} from "../../redux/slices/specificationSlice";
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
function SpecificationList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, specifications, isLoading, isDeleted } = useSelector((state) => state.specification);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Specification Deleted Successfully");
            navigate(paths.dashboard.list.specification);
            dispatch(deleteSpecificationReset());
        }
        if (check) {
            dispatch(getAllSpecifications());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteSpecificationHandler = (id) => {
        dispatch(deleteSpecification(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.specification(`${id}`));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'specName', headerName: 'Name', width: 200 },
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
                const specificationID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="Edit this specification">
                                <IconButton
                                    onClick={() => handleEdit(specificationID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this specification">
                                <IconButton
                                    onClick={() => deleteSpecificationHandler(specificationID)}
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
                    <MetaData title={`All Specifications - Admin`} />
                    <Breadcrumb pageName="Specification List" />
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
                            rows={specifications}
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

export default SpecificationList;