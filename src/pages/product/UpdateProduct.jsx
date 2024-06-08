import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import {
    updateProduct,
    clearErrors,
    getProductDetails,
    updateProductReset
} from "../../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { countries } from "../../assets/data";
import Iconify from "../../component/iconify";
import LoadingButton from "@mui/lab/LoadingButton";
import { paths } from "../../routes/paths";
import {
    Card,
    Grid,
    Stack,
} from "@mui/material";

import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
} from '../../component/hook-form';


const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { error, product, isLoading, isUpdated } = useSelector((state) => state.product);
    const { brands } = useSelector((state) => state.brand);
    const { categories } = useSelector((state) => state.category);

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        desc: Yup.string().required('Description is required'),
        warrantyPeriod: Yup.number().required('Warranty period is required').positive('Warranty period must be greater than 0'),
        origin: Yup.string().required("Origin is required"),
        brand: Yup.string().required("Brand is required"),
        category: Yup.string().required('Category is required'),
        video: Yup.string().required('Video is required'),
    });
    const defaultValues = {
        name: product?.name || '',
        desc: product?.desc || '',
        warrantyPeriod: product?.warrantyPeriod || 12,
        origin: product?.origin || '',
        brand: product?.brand || '',
        category: product?.category || '',
        video: product?.video || ''
    };

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    useEffect(() => {
        if (product && product.id !== id) {
            dispatch(getProductDetails(id));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Update Product Successfully");
            navigate(paths.dashboard.list.product);
            dispatch(updateProductReset());
        }
    }, [dispatch, error, navigate, isUpdated, product, id]);

    useEffect(() => {
        if (product) {
            setValue("name", product?.name);
            setValue("desc", product?.desc);
            setValue("warrantyPeriod", product?.warrantyPeriod);
            setValue("origin", product?.origin);
            setValue("brand", product?.brand);
            setValue("category", product?.category);
            setValue("video", product?.video);
        }
    }, [product, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("name", data.name);
            formData.set("desc", data.desc);
            formData.set("warrantyPeriod", data.warrantyPeriod);
            formData.set("origin", data.origin);
            formData.set("brand", data.brand);
            formData.set("category", data.category);
            formData.set("video", data.video);
            dispatch(updateProduct(id, formData))
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={"Update Product"} />
                    <Breadcrumb pageName="Update Product" />
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <RHFTextField name="name" label="Tên" />
                                            <RHFTextField name="desc" label="Description" multiline rows={3} />
                                            <RHFTextField name="video" label="Video" />
                                        </Stack>
                                    </Card>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <RHFTextField
                                                name="warrantyPeriod"
                                                label="Warranty Period"
                                                type="number"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <RHFAutocomplete
                                                name="origin"
                                                label="Origin"
                                                options={countries.map((country) => country.label)}
                                                getOptionLabel={(option) => option}
                                                renderOption={(props, option) => {
                                                    const { code, label, phone } = countries.filter(
                                                        (country) => country.label === option
                                                    )[0];

                                                    if (!label) {
                                                        return null;
                                                    }

                                                    return (
                                                        <li {...props} key={label}>
                                                            <Iconify
                                                                key={label}
                                                                icon={`circle-flags:${code.toLowerCase()}`}
                                                                width={28}
                                                                sx={{ mr: 1 }}
                                                            />
                                                            {label} ({code}) +{phone}
                                                        </li>
                                                    );
                                                }}
                                            />
                                            <RHFAutocomplete
                                                name="brand"
                                                label="Brand"
                                                options={brands.map((brand) => brand._id)}
                                                getOptionLabel={(option) => option}
                                                renderOption={(props, option) => {
                                                    const { name } = brands.filter(
                                                        (brand) => brand._id === option
                                                    )[0];

                                                    return (
                                                        <li {...props}>
                                                            {name}
                                                        </li>
                                                    );
                                                }}
                                            />
                                            <RHFAutocomplete
                                                name="category"
                                                label="Category"
                                                options={categories.map((category) => category._id)}
                                                getOptionLabel={(option) => option}
                                                renderOption={(props, option) => {
                                                    const { name } = categories.filter(
                                                        (category) => category._id === option
                                                    )[0];

                                                    return (
                                                        <li {...props}>
                                                            {name}
                                                        </li>
                                                    );
                                                }}
                                            />
                                        </Stack>
                                    </Card>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}>
                                        Save Product
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </DefaultLayout>
            )}
        </>
    );
}
export default NewProduct;