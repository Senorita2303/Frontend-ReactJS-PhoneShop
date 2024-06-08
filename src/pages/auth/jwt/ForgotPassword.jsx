import { toast } from "react-toastify";
import MetaData from "../../../component/layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, clearErrors } from "../../../redux/slices/userSlice";
import Loader from "../../../component/layouts/Loader/Loader";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// routes
import { paths } from "../../../routes/paths";
import { RouterLink } from "../../../routes/components";

// components
import Iconify from "../../../component/iconify";
import FormProvider, { RHFTextField } from "../../../component/hook-form";

// ----------------------------------------------------------------------

export default function JWTForgotPasswordView() {
    const dispatch = useDispatch();
    const { error, message, isLoading } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
    });

    const defaultValues = {
        email: "",
    };

    const methods = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            dispatch(forgetPassword(data));
        } catch (error) {
            console.error(error);
        }
    });

    const renderForm = (
        <Stack spacing={3} alignItems="center">
            <RHFTextField name="email" label="Email address" />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Send Request
            </LoadingButton>

            <Link
                component={RouterLink}
                href={paths.auth.jwt.login}
                color="inherit"
                variant="subtitle2"
                sx={{
                    alignItems: "center",
                    display: "inline-flex",
                }}
            >
                <Iconify icon="eva:arrow-ios-back-fill" width={16} />
                Return to sign in
            </Link>
        </Stack>
    );

    const renderHead = (
        <>
            <Stack spacing={1} sx={{ my: 5 }}>
                <Typography variant="h3">Forgot your password?</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Enter your account&apos;s email, and we&apos;ll send a password reset
                    link.
                </Typography>
            </Stack>
        </>
    );

    return (
        <>
            <MetaData title={"Forgot Password"} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    <div className="w-96 m-auto rounded p-8">
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            {renderHead}
                            {renderForm}
                        </FormProvider>
                    </div>
                </div>
            )}
        </>
    );
}