import { toast } from "react-toastify";
import MetaData from "../../../component/layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../component/layouts/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
// import { resetPassword, clearErrors } from "../../../actions/userAction";
import { resetPassword, clearErrors } from "../../../redux/slices/userSlice";
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
// import { useSnackbar } from 'src/components/snackbar';

// routes
import { paths } from '../../../routes/paths';
// import { useSearchParams } from '../../../routes/hooks';
import { RouterLink } from '../../../routes/components';

// components
import Iconify from '../../../component/iconify';
import FormProvider from '../../../component/hook-form';
// import customAxios from '../../../utils/customAxios';

// ----------------------------------------------------------------------

export default function JWTResetPasswordView() {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, success, isLoading } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Reset Password Successfully");
            navigate(paths.auth.jwt.login);
        }
    }, [dispatch, error, navigate, success]);
    // const searchParams = useSearchParams();

    // const emailParamData = searchParams.get('email');
    // // const { enqueueSnackbar } = useSnackbar();

    // const authorizationParamData = searchParams.get('authorization');

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        newPassword: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Password confirmation is required'),
    });

    const defaultValues = {
        newPassword: '',
        confirmPassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [resetSuccess, setResetSuccess] = useState(false);
    const onSubmit = async (data) => {
        setResetSuccess(false);

        try {
            if (newPassword === confirmPassword) {
                const myForm = new FormData();
                myForm.set("password", newPassword);
                myForm.set("confirmPassword", confirmPassword);
                dispatch(resetPassword(token, myForm));
                // const resData = await customAxios.post('/users/user-reset-password', requestData, {
                //     headers: {
                //         authorization: authorizationParamData,
                //     },
                // });
                setResetSuccess(true);
                setConfirmPassword('');
                setNewPassword('');
                // console.log(resData);
            }
        } catch (error) {
            console.log(error);
            // enqueueSnackbar(error.response.data.message);
        }
    };

    const renderForm = (
        <Stack spacing={3} alignItems="center">
            <TextField
                autoFocus
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
                autoFocus
                fullWidth
                type="email"
                margin="dense"
                variant="outlined"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <LoadingButton
                fullWidth
                size="large"
                // type="submit"
                variant="contained"
                // loading={isSubmitting}
                onClick={onSubmit}
            >
                Reset my password
            </LoadingButton>

            <Link
                component={RouterLink}
                href={paths.auth.jwt.login}
                color="inherit"
                variant="subtitle2"
                sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                }}
            >
                <Iconify icon="eva:arrow-ios-back-fill" width={16} />
                Return to sign in
            </Link>
        </Stack>
    );

    const renderHead = (
        <Stack spacing={1} sx={{ my: 5 }}>
            <Typography variant="h3">Reset your password</Typography>
        </Stack>
    );

    const renderSuccessMessage = (
        <>
            {/* <PasswordIcon sx={{ height: 96 }} /> */}

            <Stack spacing={1} sx={{ my: 5 }}>
                <Typography variant="h3">Successful password reset</Typography>

                <Typography variant="body5" sx={{ color: 'text.secondary' }}>
                    You can now login to your account with your new password.
                </Typography>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    href={paths.auth.jwt.login}
                    sx={{ marginTop: '15px' }}
                >
                    Login
                </LoadingButton>
            </Stack>
        </>
    );

    return (
        <>
            <MetaData title={"Reset Password"} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    <div className="w-96 m-auto rounded p-8">
                        <FormProvider methods={methods}>
                            {/* {renderHead} */}
                            {resetSuccess ? (
                                renderSuccessMessage
                            ) : (
                                <>
                                    {renderHead}
                                    {renderForm}
                                </>
                            )}
                        </FormProvider>
                    </div>
                </div>
            )}
        </>
    );
}