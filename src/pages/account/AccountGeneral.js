
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import FormProvider, { RHFTextField } from "../../component/hook-form";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";

import { updateProfile, clearErrors, updateReset } from "../../redux/slices/userSlice";

// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack, Typography, Avatar, Button, TextField, Input } from "@mui/material";

// hooks

// utils
import { paths } from "../../routes/paths";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isUpdated, loading, user } = useSelector((state) => state.user);
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

    const UpdateUserSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        photoURL: Yup.mixed().nullable().required("Avatar is required"),
    });

    const defaultValues = {
        name: user?.userName,
        photoURL: user?.avatarUrl,
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    useEffect(() => {
        if (user) {
            setAvatarPreview(user.avatarUrl);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        // isUpadted is nothing But success message from response. once user updated then pop the message and show profile data
        if (isUpdated) {
            toast.success("Profile Updated Successfully");
            dispatch(updateReset());
            navigate(paths.user.account);
        }
    }, [dispatch, error, navigate, user, isUpdated]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("userName", data.name);
            formData.set("image", avatar);
            dispatch(updateProfile(formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Update User" />
                    <div class="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div class="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={2.5}>
                                    <RHFTextField name="name" label="Name" />
                                    <TextField value={user.email} fullWidth disabled />
                                    <div className="flex flex-row items-center justify-between">
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
                                        <Avatar
                                            alt="Avatar Preview"
                                            src={avatarPreview}
                                            className="ml-1.5 bg-black"
                                        />
                                        <Controller
                                            name="photoURL"
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
                                    {errors.photoURL && (
                                        <Typography variant="caption" color="error">
                                            {errors.photoURL.message}
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
                                        Save Changes
                                    </LoadingButton>
                                </Stack>
                            </FormProvider>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}