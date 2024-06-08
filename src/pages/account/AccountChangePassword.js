import React, { Fragment, useEffect } from "react";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from '../../hooks/useBoolean';
// components
import Iconify from '../../component/iconify';
import FormProvider, { RHFTextField } from '../../component/hook-form';
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors, updateReset } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import { useNavigate } from "react-router-dom";


// ----------------------------------------------------------------------

export default function AccountChangePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isUpdated, isLoading } = useSelector(
        (state) => state.user
    );
    const password = useBoolean();

    const ChangePassWordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string()
            .required('New Password is required')
            .min(6, 'Password must be at least 6 characters')
            .test(
                'no-match',
                'New password must be different than old password',
                (value, { parent }) => value !== parent.oldPassword
            ),
        confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });

    const defaultValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(ChangePassWordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const { oldPassword, newPassword, confirmNewPassword } = data;
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmNewPassword);
        dispatch(updatePassword(myForm));
    });
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Change Password Successfully");
            dispatch(updateReset());
            navigate("/account");
        }
    }, [dispatch, error, navigate, isUpdated]);

    return (
        <Fragment>
            <MetaData title={"Update Password"} />
            {isLoading ? (
                <Loader />
            ) : (

                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    <div className="w-96 m-auto rounded p-8">
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            <Stack component={Card} spacing={3} sx={{ p: 3 }}>
                                <RHFTextField
                                    name="oldPassword"
                                    type={password.value ? 'text' : 'password'}
                                    label="Old Password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={password.onToggle} edge="end">
                                                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <RHFTextField
                                    name="newPassword"
                                    label="New Password"
                                    type={password.value ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={password.onToggle} edge="end">
                                                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={
                                        <Stack component="span" direction="row" alignItems="center">
                                            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
                                            6+
                                        </Stack>
                                    }
                                />

                                <RHFTextField
                                    name="confirmNewPassword"
                                    type={password.value ? 'text' : 'password'}
                                    label="Confirm New Password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={password.onToggle} edge="end">
                                                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
                                    Save Changes
                                </LoadingButton>
                            </Stack>
                        </FormProvider>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
