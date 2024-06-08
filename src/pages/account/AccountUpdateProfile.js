import React, { Fragment, useEffect } from "react";

// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, Stack, IconButton, Typography, InputAdornment, Avatar, Button, TextField, Input } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/slices/userSlice";

import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";

import { toast } from "react-toastify";

import { paths } from "../../routes/paths";


import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import Iconify from "../../component/iconify";
import FormProvider, { RHFTextField } from "../../component/hook-form";

const AccountUpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        // if user not logged in
        if (isAuthenticated === false) {
            navigate(paths.auth.jwt.login);
        }
    }, [navigate, isAuthenticated]);

    return (
        <Fragment>
            {isLoading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user?.userName}'s Profile`} />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={2.5}>
                                    <RHFTextField name="name" label="Name" />
                                    <Controller
                                        name="email"
                                        // rules={{
                                        //     required: "Email is required",
                                        // }}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                fullWidth
                                                margin="dense"
                                                error={!!errors.email}
                                                helperText={errors.email && errors.email.message}
                                            />
                                        )}
                                    />
                                    {/* <RHFTextField name="email" label="Email address" /> */}
                                    <RHFTextField
                                        name="password"
                                        label="Password"
                                        type={password.value ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={password.onToggle} edge="end">
                                                        <Iconify
                                                            icon={
                                                                password.value
                                                                    ? "solar:eye-bold"
                                                                    : "solar:eye-closed-bold"
                                                            }
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <RHFTextField
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type={password.value ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={password.onToggle} edge="end">
                                                        <Iconify
                                                            icon={
                                                                password.value
                                                                    ? "solar:eye-bold"
                                                                    : "solar:eye-closed-bold"
                                                            }
                                                        />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
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
                                                // <input
                                                //     type="file"
                                                //     id="avatarinput"
                                                //     accept="image/*"
                                                //     className="hidden"
                                                //     onChange={(e) => {
                                                //         field.onChange(e.target.files);
                                                //         handleAvatarChange(e);
                                                //     }}
                                                // />
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
                                        Create account
                                    </LoadingButton>
                                </Stack>
                            </FormProvider>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};
export default AccountUpdateProfile;