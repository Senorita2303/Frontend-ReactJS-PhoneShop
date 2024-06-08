import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import { createProductVariant, clearErrors, newProductVariantReset } from "../../redux/slices/productVariantSlice";
import { getAllColors } from "../../redux/slices/colorSlice";
import { getAllMemories } from "../../redux/slices/memorySlice";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from "@mui/lab/LoadingButton";
import { paths } from "../../routes/paths";
import {
    Card,
    Grid,
    Stack,
    Input,
    Box,
    TextField,
    Typography,
    Button,
    Autocomplete
} from "@mui/material";

import FormProvider, {
    RHFTextField,
} from '../../component/hook-form';

const NewProductVariant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, success } = useSelector((state) => state.productVariant);
    const { colors } = useSelector((state) => state.color);
    const { memories } = useSelector((state) => state.memory);
    const { products } = useSelector((state) => state.product);
    const [images, setImages] = useState({});
    const [imagesPreview, setImagesPreview] = useState([]);

    const NewProductVariantSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        sku: Yup.string().required('Sku is required'),
        stock: Yup.number().required('Stock is required').moreThan(0, 'Stock should not be 0'),
        marketPrice: Yup.number().required('Market price is required').moreThan(0, 'Market price should not be 0 VND'),
        color: Yup.number().required("Color is required"),
        memory: Yup.number().required("Memory is required"),
        product: Yup.string().required("Product is required"),
        image: Yup.mixed()
    });
    const defaultValues = {
        name: "",
        sku: "",
        stock: 0,
        marketPrice: 0,
        color: 1,
        memory: 1,
        product: 1,
        image: "",
    };

    const methods = useForm({
        resolver: yupResolver(NewProductVariantSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    const handleAvatarChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(e.target.files);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
        // if (file) {
        //     setImages(file);
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         if (reader.readyState === 2) {
        //             setImagesPreview(reader.result);
        //         }
        //     };
        //     reader.readAsDataURL(file);
        // }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("ProductVariant Created Successfully");
            navigate(paths.dashboard.root);
            dispatch(newProductVariantReset());
        }
        dispatch(getAllColors());
        dispatch(getAllMemories());
    }, [dispatch, error, navigate, success]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("name", data.name);
            formData.set("sku", data.sku);
            formData.set("stock", data.stock);
            formData.set("marketPrice", data.marketPrice);
            formData.set("colorId", data.color);
            formData.set("memoryId", data.memory);
            formData.set("productId", data.product);
            for (let i = 0; i < images.length; i++) {
                formData.append("image", images[i]);
            }
            // console.log(images);
            dispatch(createProductVariant(formData))
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
                    <MetaData title={"New Product Variant"} />
                    <Breadcrumb pageName="New Product Variant" />
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <RHFTextField name="name" label="Tên" />
                                            <RHFTextField name="sku" label="Sku" />
                                        </Stack>
                                    </Card>

                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <div className="flex flex-col items-center justify-between">
                                                <label htmlFor="imagesinput">
                                                    <Button
                                                        variant="contained"
                                                        color="inherit"
                                                        startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                                                        component="span"
                                                        className="text-white w-fit bg-slate-700 h-10 hover:bg-red-600"
                                                    >
                                                        <p className="text-sm bg-inherit font-medium text-white px-4">Upload Images</p>
                                                    </Button>
                                                </label>
                                                <Controller
                                                    name="image"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="file"
                                                            inputProps={{
                                                                accept: 'image/*',
                                                                multiple: true
                                                            }}
                                                            id="imagesinput"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                field.onChange(e.target.files);
                                                                handleAvatarChange(e);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Box className="flex gap-4 w-11/12 overflow-x-scroll my-8 py-0.5 px-3.5 shadow rounded">
                                                    {imagesPreview &&
                                                        imagesPreview.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image}
                                                                alt="ProductVariant Preview"
                                                                className="w-20 h-16 object-cover shadow rounded"
                                                            />
                                                        ))}
                                                </Box>
                                            </div>
                                            {errors.image && (
                                                <Typography variant="caption" color="error">
                                                    {errors.image.message}
                                                </Typography>
                                            )}

                                            {/* <div className="flex flex-row items-center justify-between mt-14">
                                                <div className="w-auto ml-4 self-center">
                                                </div>

                                                <input
                                                    type="file"
                                                    name="images"
                                                    className="hidden"
                                                    id="images-input"
                                                    accept="image/*"
                                                    onChange={createProductVariantImagesChange}
                                                    multiple
                                                    style={{ display: "none" }}
                                                    ref={fileInputRef}
                                                />
                                                <label htmlFor="images-input">
                                                    <Button
                                                        variant="contained"
                                                        color="inherit"
                                                        className="text-white w-fit bg-slate-700 h-10 hover:bg-red-600"
                                                        startIcon={
                                                            <CloudUploadIcon
                                                                style={{
                                                                    color: "#FFFFFF",
                                                                }}
                                                            />
                                                        }
                                                        onClick={handleImageUpload}
                                                    >
                                                        <p className="text-sm bg-inherit font-medium text-white px-4">
                                                            Upload Images
                                                        </p>
                                                    </Button>
                                                </label>
                                            </div> */}

                                            {/* <Box className="flex gap-4 w-11/12 overflow-x-scroll my-8 py-0.5 px-3.5 shadow rounded">
                                                {imagesPreview &&
                                                    imagesPreview.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt="ProductVariant Preview"
                                                            className="w-20 h-16 object-cover shadow rounded"
                                                        />
                                                    ))}
                                            </Box> */}

                                        </Stack>
                                    </Card>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <Controller
                                                name="color"
                                                control={control}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <Autocomplete
                                                            options={colors}
                                                            onChange={(event, newValue) => {
                                                                onChange(newValue?.id);
                                                            }}
                                                            getOptionLabel={(option) => option.name}
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    label="Choose a color"
                                                                    variant="outlined"
                                                                    error={!!errors.color}
                                                                    helperText={errors.color && errors.color.message}
                                                                />
                                                            )}
                                                        />
                                                    )
                                                }}
                                            />
                                            <Controller
                                                name="memory"
                                                control={control}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <Autocomplete
                                                            options={memories}
                                                            onChange={(event, newValue) => {
                                                                onChange(newValue?.id);
                                                            }}
                                                            getOptionLabel={(option) => `${option.ram} - ${option.rom} - ${option.chipset}`}
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    label="Choose a memory"
                                                                    variant="outlined"
                                                                    error={!!errors.memory}
                                                                    helperText={errors.memory && errors.memory.message}
                                                                />
                                                            )}
                                                        />
                                                    )
                                                }}
                                            />
                                            <Controller
                                                name="product"
                                                control={control}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <Autocomplete
                                                            options={products}
                                                            onChange={(event, newValue) => {
                                                                onChange(newValue?.id);
                                                            }}
                                                            getOptionLabel={(option) => option.name}
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    label="Choose a product"
                                                                    variant="outlined"
                                                                    error={!!errors.product}
                                                                    helperText={errors.product && errors.product.message}
                                                                />
                                                            )}
                                                        />
                                                    )
                                                }}
                                            />
                                        </Stack>
                                    </Card>

                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <RHFTextField name="stock" label="Stock" />
                                            <RHFTextField name="marketPrice" label="Market price" />
                                        </Stack>
                                    </Card>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}>
                                        Create Product Variant
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
export default NewProductVariant;