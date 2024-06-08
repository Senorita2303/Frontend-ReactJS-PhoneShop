import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory, clearErrors, getCategoryDetails, updateCategoryReset, newCategoryReset } from "../../redux/slices/categorySlice";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Typography, Avatar, Button, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField } from "../../component/hook-form";
import { paths } from "../../routes/paths";
function NewCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, error, success, category, isUpdated } = useSelector((state) => state.category);
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
        if (Object.keys(category).length === 0 && id) {
            dispatch(getCategoryDetails(id));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Category Created Successfully");
            navigate(paths.dashboard.list.category);
            dispatch(newCategoryReset());
        }
        if (isUpdated) {
            toast.success("Update Category Successfully");
            navigate(paths.dashboard.list.category);
            dispatch(updateCategoryReset());
        }
    }, [dispatch, error, navigate, success, isUpdated, category, id]);

    const CreateCategorySchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        desc: Yup.string().required("Description is required"),
        image: Yup.mixed().nullable().required("Avatar is required"),
    });

    const defaultValues = {
        name: category?.name || "",
        desc: category?.desc || "",
    };

    const methods = useForm({
        resolver: yupResolver(CreateCategorySchema),
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
            formData.set("image", avatar);
            if (Object.keys(category).length === 0) {
                dispatch(createCategory(formData));
            }
            else dispatch(updateCategory(id, formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    useEffect(() => {
        if (category) {
            setValue("name", category?.name);
            setValue("desc", category?.desc);
            setValue("image", category?.image);
            setAvatarPreview(category?.image);
        }
    }, [category, setValue]);
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={Object.keys(category).length === 0 ? "New Category" : "Update Category"} />
                    <Breadcrumb pageName={Object.keys(category).length === 0 ? "New Category" : "Update Category"} />
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
                                        {Object.keys(category).length === 0 ? "Create Category" : "Update Category"}
                                    </LoadingButton>
                                </Stack>
                            </FormProvider>
                        </div>
                    </div>
                    {/* </div>
                    </div> */}
                </DefaultLayout>
            )}
        </>
    );
}

export default NewCategory;