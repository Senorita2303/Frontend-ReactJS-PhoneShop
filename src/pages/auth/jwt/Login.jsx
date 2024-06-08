import { toast } from "react-toastify";
import MetaData from "../../../component/layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// import { login, clearErrors, googleLogin } from "../../../actions/userAction";
import { login, clearErrors } from "../../../redux/slices/userSlice";
import Loader from "../../../component/layouts/Loader/Loader";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Link, Stack, IconButton, Typography, InputAdornment, Divider } from "@mui/material";
// routes
import { paths } from "../../../routes/paths";
import { RouterLink } from "../../../routes/components";
// hooks
import { useBoolean } from "../../../hooks/useBoolean";

// components
import Iconify from "../../../component/iconify";
import FormProvider, { RHFTextField } from "../../../component/hook-form";
// ----------------------------------------------------------------------
export default function JwtLoginView() {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const { error, isLoading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const redirect = location.search ? location.search.split("=")[1] : "/account";
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect]);

    const password = useBoolean();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        email: "",
        password: "",
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            dispatch(login(data.email, data.password));
        } catch (error) {
            reset();
        }
    });
    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, "_self");
    }

    // const handleGithubLogin = () => {
    //     window.open("http://localhost:5000/api/auth/github", "_self");
    // };

    const hanldeFacebookLogin = () => {
        window.open("http://localhost:5000/api/auth/facebook", "_self");
    };

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography variant="h4">Sign in to Your Account</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">New user?</Typography>

                <Link
                    component={RouterLink}
                    href={paths.auth.jwt.register}
                    variant="subtitle2"
                >
                    Create an account
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5}>
            <RHFTextField name="email" label="Email address or Phone Number" />
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
                                        password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                                    }
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Link
                variant="body2"
                color="inherit"
                underline="always"
                sx={{ alignSelf: "flex-end" }}
                component={RouterLink}
                href={paths.auth.jwt.forgotPassword}
            >
                Forgot password?
            </Link>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Login
            </LoadingButton>
        </Stack>
    );
    return (
        <>
            <MetaData title={"Login"} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    <div className="w-96 m-auto rounded p-8">
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            {renderHead}

                            {renderForm}
                        </FormProvider>
                        <Box>
                            <Divider
                                variant="middle"
                                sx={{
                                    my: 2.5,
                                    color: "text.disabled",
                                    '&::before, &::after': {
                                        borderTopStyle: "dashed"
                                    }
                                }}
                            >
                                <Typography variant="overline">OR</Typography>
                            </Divider>
                            <Stack
                                direction={'column'}
                                alignItems={"center"}
                                justifyContent={"center"}
                                spacing={2}
                            >
                                <Stack
                                    alignItems={"center"}
                                    direction={"row"}
                                    spacing={2}
                                >
                                    <IconButton onClick={handleGoogleLogin}>
                                        <Iconify icon="devicon:google" width={32} />
                                    </IconButton>
                                    <IconButton>
                                        <Iconify icon="devicon:github" width={32} />
                                    </IconButton>
                                    <IconButton onClick={hanldeFacebookLogin}>
                                        <Iconify icon="devicon:facebook" width={32} />
                                    </IconButton>
                                </Stack>
                            </Stack>

                        </Box>
                    </div>
                </div>
            )
            }
        </>
    );
}