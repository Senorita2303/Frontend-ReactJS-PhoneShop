import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getAdminCategories,
    deleteCategory,
    deleteCategoryReset
} from "../../redux/slices/categorySlice";
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
function CategoryList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [check, setCheck] = useState(true);
    const { error, categories, isLoading, isDeleted } = useSelector((state) => state.category);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Category Deleted Successfully");
            navigate(paths.dashboard.list.category);
            dispatch(deleteCategoryReset());
        }
        if (check) {
            dispatch(getAdminCategories());
            setCheck(false);
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id));
    };

    const handleEdit = (id) => {
        navigate(paths.dashboard.edit.category(`${id}`));
    };

    const columns = [
        {
            field: 'image',
            headerName: 'Photo',
            width: 70,
            renderCell: (params) => (
                <Avatar src={params.row.image} variant="rounded" />
            ),
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'desc', headerName: 'Description', width: 250 },
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
                const categoryID = params.row.id
                return (
                    <Fragment>
                        <Box>
                            <Tooltip title="View category details">
                                <IconButton color="secondary">
                                    <Iconify icon="ic:baseline-remove-red-eye" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit this category">
                                <IconButton
                                    onClick={() => handleEdit(categoryID)}
                                    color="success"
                                >
                                    <Iconify icon="ic:round-edit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this category">
                                <IconButton
                                    onClick={() => deleteCategoryHandler(categoryID)}
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
                    <MetaData title={`All Categories - Admin`} />
                    <Breadcrumb pageName="Category List" />
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
                            rows={categories}
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

export default CategoryList;