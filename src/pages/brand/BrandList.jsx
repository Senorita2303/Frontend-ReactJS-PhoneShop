import React, { Fragment, useState, useEffect, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAdminBrands,
    deleteBrand,
    deleteBrandReset,
} from "../../redux/slices/brandSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, Box, Tooltip, IconButton, Typography } from '@mui/material';
import Iconify from '../../component/iconify';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import moment from 'moment';
import { paths } from "../../routes/paths";
function BrandList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(5);
    const [check, setCheck] = useState(true);
    const { error, brands, isLoading, isDeleted } = useSelector((state) => state.brand);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Brand Deleted Successfully");
            navigate(paths.dashboard.list.brand);
            dispatch(deleteBrandReset());
        }
        if (check) {
            dispatch(getAdminBrands());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteBrandHandler = (id) => {
        dispatch(deleteBrand(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.brand(`${id}`));
    };

    const columns = [
        {
            field: 'image',
            headerName: 'Photo',
            width: 100,
            renderCell: (params) => (
                <img src={params.row.image} alt="" />
            ),
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'desc', headerName: 'Description', width: 250 },
        { field: 'country', headerName: 'Country', width: 130 },
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
                const brandID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="View brand details">
                                <IconButton color="secondary">
                                    <Iconify icon="ic:baseline-remove-red-eye" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit this brand">
                                <IconButton
                                    onClick={() => handleEdit(brandID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this brand">
                                <IconButton
                                    onClick={() => deleteBrandHandler(brandID)}
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
                    <MetaData title={`All Brands - Admin`} />
                    <Breadcrumb pageName="Brand List" />
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
                            rows={brands}
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

export default BrandList;