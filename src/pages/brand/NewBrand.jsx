// import "../../component/Admin/ProductList.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, updateBrand, clearErrors, getBrandDetails, updateBrandReset, newBrandReset } from "../../redux/slices/brandSlice";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com*/
// @mui
import { Stack, Typography, Avatar, Button, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField, RHFAutocomplete } from "../../component/hook-form";
import { countries } from "../../assets/data";
import Iconify from "../../component/iconify";
import { paths } from "../../routes/paths";
function NewBrand() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, error, success, brand, isUpdated } = useSelector((state) => state.brand);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
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
        if (Object.keys(brand).length === 0 && id) {
            dispatch(getBrandDetails(id));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Brand Created Successfully");
            navigate(paths.dashboard.list.brand);
            dispatch(newBrandReset());
        }
        if (isUpdated) {
            toast.success("Update Brand Successfully");
            navigate(paths.dashboard.list.brand);
            dispatch(updateBrandReset());
        }
    }, [dispatch, error, navigate, success, isUpdated, brand, id]);


    const CreateBrandSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        desc: Yup.string().required("Description is required"),
        country: Yup.string().required("Country is required"),
        headQuarters: Yup.string().required("HeadQuarters is require"),
        image: Yup.mixed().nullable().required("Avatar is required"),
    });

    const defaultValues = {
        name: brand?.name || "",
        desc: brand?.desc || "",
        country: brand?.country || "",
        headQuarters: brand?.headQuarters || "",
    };

    const methods = useForm({
        resolver: yupResolver(CreateBrandSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("name", data.name);
            formData.set("desc", data.desc);
            formData.set("country", data.country);
            formData.set("headQuarters", data.headQuarters);
            formData.set("image", avatar);
            if (Object.keys(brand).length === 0) {
                dispatch(createBrand(formData));
            }
            else dispatch(updateBrand(id, formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });
    useEffect(() => {
        if (brand) {
            setValue("name", brand?.name);
            setValue("desc", brand?.desc);
            setValue("country", brand?.country);
            setValue("headQuarters", brand?.headQuarters);
            setValue("image", brand?.image);
            setAvatarPreview(brand?.image);
        }
    }, [brand, setValue]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={Object.keys(brand).length === 0 ? "New Brand" : "Update Brand"} />
                    <Breadcrumb pageName={Object.keys(brand).length === 0 ? "New Brand" : "Update Brand"} />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="name" label="Name" />
                                    <RHFTextField
                                        name="desc"
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                    <RHFAutocomplete
                                        name="country"
                                        label="Country"
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
                                    <RHFTextField name="headQuarters" label="Head Quarters" />
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
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Create brand
                                    </LoadingButton>
                                </Stack>
                            </FormProvider>
                        </div>
                    </div>
                </DefaultLayout>
            )}
        </>
    );
}

export default NewBrand;