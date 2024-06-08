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
import { createProduct, clearErrors, newProductReset } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from "@mui/lab/LoadingButton";
import { paths } from "../../routes/paths";
import {
    Card,
    Grid,
    Stack,
    Input,
    Avatar,
    TextField,
    Typography,
    Button,
    Autocomplete
} from "@mui/material";

import FormProvider, {
    RHFTextField,
} from '../../component/hook-form';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, success } = useSelector((state) => state.product);
    const { brands } = useSelector((state) => state.brand);
    const { categories } = useSelector((state) => state.category);
    const { specifications } = useSelector((state) => state.specification);
    const [specList, setSpecList] = useState([{ id: 1, name: null, value: '' }]);
    const [isErrorSpecifications, setIsErrorSpecifications] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        desc: Yup.string().required('Description is required'),
        video: Yup.string().required('Video is required'),
        category: Yup.number().required('Category is required'),
        brand: Yup.number().required("Brand is required"),
        basePrice: Yup.number().required("Base price is required").moreThan(0, 'Price should not be 0 VND'),
        discountPercentage: Yup.number().required("Discount percentage is required").moreThan(0, 'Discount percentage should not be 0 VND'),
        warrantyPeriod: Yup.number().required("Warranty period is required").moreThan(0, 'Warranty period should not be 0'),
        image: Yup.mixed()
    });
    const defaultValues = {
        name: "",
        desc: "",
        video: "",
        category: 1,
        brand: 1,
        basePrice: 0,
        discountPercentage: 0,
        warrantyPeriod: 0,
        image: "",
        // phone: "",
    };

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Product Created Successfully");
            navigate(paths.dashboard.root);
            dispatch(newProductReset());
        }
    }, [dispatch, error, navigate, success]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(contentHTML);
            console.log(contentMarkdown);
            const formData = new FormData();
            formData.set("name", data.name);
            formData.set("desc", data.desc);
            formData.set("brandId", data.brand);
            formData.set("categoryId", data.category);
            formData.set("basePrice", data.basePrice);
            formData.set("discountPercentage", data.discountPercentage);
            formData.set("warrantyPeriod", data.warrantyPeriod);
            formData.set("image", avatar);
            formData.set("video", data.video);
            formData.set("contentHTML", contentHTML);
            formData.set("contentMarkdown", contentMarkdown);
            formData.set("specList", JSON.stringify(specList));
            dispatch(createProduct(formData))
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    const handleChangeInput = (id, event, newValue) => {
        setIsErrorSpecifications(false);
        const newSpecifications = specList.map((i) => {
            if (id === i.id) {
                if (event) {
                    i[event.target.name] = event.target.value;
                } else {
                    i.name = newValue ? newValue.id : null;
                }
            }
            return i;
        });
        setSpecList(newSpecifications);
    };

    const handleAddFields = () => {
        const indexCurrent = specList.length - 1;
        if (specList[indexCurrent].name === '' || specList[indexCurrent].value === '') {
            setIsErrorSpecifications(true);
            return;
        }
        setSpecList([...specList, { id: specList.length + 1, name: '', value: '' }]);
    };

    const handleRemoveFields = (id) => {
        const values = [...specList];
        values.splice(values.findIndex((value) => value.id === id), 1);
        setSpecList(values);
    };

    const renderSpecificationsForm = () => (
        <div>
            {specList.map((inputField) => (
                <Stack key={inputField.id} direction="row" spacing={3} sx={{ marginBottom: "20px" }}>
                    <Autocomplete
                        options={specifications}
                        getOptionLabel={(option) => option.specName}
                        value={specifications.find(spec => spec.id === inputField.name) || null}
                        onChange={(event, newValue) => handleChangeInput(inputField.id, null, newValue)}
                        renderInput={(params) =>
                            <TextField {...params}
                                name="name"
                                label="Choose a specification"
                                error={isErrorSpecifications && inputField.name === null}
                            />}
                        fullWidth
                    />

                    <TextField
                        fullWidth
                        name="value"
                        label="Value"
                        size="small"
                        value={inputField.value}
                        error={isErrorSpecifications && inputField.value === ''}
                        onChange={(event) => handleChangeInput(inputField.id, event)}
                    />
                    <Button disabled={specList.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                        Xóa
                    </Button>
                </Stack>
            ))}
            {isErrorSpecifications && (
                <Typography
                    variant="inherit"
                    sx={{
                        marginLeft: "1px",
                        marginBottom: "1px",
                        fontSize: 'small',
                        // color: theme.palette.error.main
                    }}
                >
                    Specifications must be filled in completely !!!
                </Typography>
            )}
        </div>
    );

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={"New Product"} />
                    <Breadcrumb pageName="New Product" />
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <RHFTextField name="name" label="Tên" />
                                            <RHFTextField name="desc" label="Description" multiline rows={3} />
                                        </Stack>
                                    </Card>

                                    <Card sx={{ p: 3 }}>
                                        {renderSpecificationsForm()}
                                        <Button variant="contained" onClick={handleAddFields}>
                                            Thêm Item
                                        </Button>
                                    </Card>

                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <div className="flex flex-col items-center justify-between">
                                                <Avatar
                                                    alt="Avatar Preview"
                                                    src={avatarPreview}
                                                    className="mb-4 bg-black w-32 h-32"
                                                />
                                                <label htmlFor="avatarinput">
                                                    <Button
                                                        variant="contained"
                                                        color="inherit"
                                                        startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                                                        component="span"
                                                        className="text-white w-fit bg-slate-700 h-10 hover:bg-red-600"
                                                    >
                                                        <p className="text-sm bg-inherit font-medium text-white px-4">Upload</p>
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
                                                            id="avatarinput"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                field.onChange(e.target.files);
                                                                handleAvatarChange(e);
                                                            }}
                                                        />
                                                    )}
                                                />
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
                                                    name="avatar"
                                                    className="hidden"
                                                    id="avatar-input"
                                                    accept="image/*"
                                                    onChange={createProductImagesChange}
                                                    multiple
                                                    style={{ display: "none" }}
                                                    ref={fileInputRef}
                                                />
                                                <label htmlFor="avatar-input">
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
                                                            alt="Product Preview"
                                                            className="w-20 h-16 object-cover shadow rounded"
                                                        />
                                                    ))}
                                            </Box> */}
                                            <RHFTextField name="video" label="Video" />
                                            <div className='MdEditor my-3'>
                                                <MdEditor
                                                    style={{ height: '300px' }}
                                                    renderHTML={text => mdParser.render(text)}
                                                    onChange={handleEditorChange}
                                                    value={contentMarkdown}
                                                />
                                            </div>
                                        </Stack>
                                    </Card>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={3}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            <Controller
                                                name="brand"
                                                control={control}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <Autocomplete
                                                            options={brands}
                                                            onChange={(event, newValue) => {
                                                                onChange(newValue?.id);
                                                            }}
                                                            getOptionLabel={(option) => option.name}
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    label="Choose a brand"
                                                                    variant="outlined"
                                                                    error={!!errors.brand}
                                                                    helperText={errors.brand && errors.brand.message}
                                                                />
                                                            )}
                                                        />
                                                    )
                                                }}
                                            />
                                            <Controller
                                                name="category"
                                                control={control}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <Autocomplete
                                                            options={categories}
                                                            onChange={(event, newValue) => {
                                                                onChange(newValue?.id);
                                                            }}
                                                            getOptionLabel={(option) => option.name}
                                                            renderInput={(params) => (
                                                                <TextField {...params}
                                                                    label="Choose a category"
                                                                    variant="outlined"
                                                                    error={!!errors.category}
                                                                    helperText={errors.category && errors.category.message}
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
                                            <RHFTextField name="basePrice" label="Base Price" />
                                            <RHFTextField name="discountPercentage" label="Discount Percentage (%)" />
                                            <RHFTextField name="warrantyPeriod" label="Warranty Period" />
                                        </Stack>
                                    </Card>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}>
                                        Create Product
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