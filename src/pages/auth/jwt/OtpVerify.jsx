import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SendOtp, clearErrors, VerifyEmail } from "../../../redux/slices/userSlice";
import MetaData from "../../../component/layouts/MetaData/MetaData";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// routes
import { paths } from "../../../routes/paths";
import { RouterLink } from "../../../routes/components";
import FormProvider, { RHFTextField } from "../../../component/hook-form";

export default function JwtOTPVerifyView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isAuthenticated, email, userId } = useSelector((state) => state.user);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        else if (initialLoad) {
            dispatch(SendOtp(email, userId));
            setInitialLoad(false);
        }
        if (isAuthenticated) {
            toast.success("User Registered Successfully");
            navigate("/account");
        }
    }, [dispatch, initialLoad, isAuthenticated, error, email, userId]);

    const firstDigitRef = useRef();
    const secondDigitRef = useRef();
    const thirdDigitRef = useRef();
    const fourthDigitRef = useRef();
    const fifthDigitRef = useRef();
    const sixthDigitRef = useRef();

    const handleInput = (fieldName, e) => {
        const { value } = e.target;

        // Move to the next input field
        switch (fieldName) {
            case "firstDigit":
                if (value.length === 1) {
                    secondDigitRef.current.focus();
                }
                break;
            case "secondDigit":
                if (value.length === 1) {
                    thirdDigitRef.current.focus();
                }
                break;
            case "thirdDigit":
                if (value.length === 1) {
                    fourthDigitRef.current.focus();
                }
                break;
            case "fourthDigit":
                if (value.length === 1) {
                    fourthDigitRef.current.focus();
                }
                break;
            case "fifthDigit":
                if (value.length === 1) {
                    fifthDigitRef.current.focus();
                }
                break;
            case "sixthDigit":
                if (value.length === 1) {
                    sixthDigitRef.current.focus();
                }
                break;
            // Add more cases if needed

            default:
                break;
        }
    };
    const VerifyCodeSchema = Yup.object().shape({
        firstDigit: Yup.string().required("Code is required"),
        secondDigit: Yup.string().required("Code is required"),
        thirdDigit: Yup.string().required("Code is required"),
        fourthDigit: Yup.string().required("Code is required"),
        fifthDigit: Yup.string().required("Code is required"),
        sixthDigit: Yup.string().required("Code is required"),
    });

    const methods = useForm({
        resolver: yupResolver(VerifyCodeSchema),
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const { firstDigit, secondDigit, thirdDigit, fourthDigit, fifthDigit, sixthDigit } = data;
        try {
            dispatch(VerifyEmail({ email, otp: `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}${fifthDigit}${sixthDigit}` }));
            // router.push(returnTo || paths.auth.jwt.login);
        } catch (error) {
            console.error(error);
            // enqueueSnackbar("There seems to be an issue verifying your account");
            reset();
        }
    });
    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5, px: 1 }}>
            <Typography variant="h4">Verify Your Account</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2" sx={{ width: "100%" }}>
                    We sent you a six-digit code. Enter the code to confirm your email.
                </Typography>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5}>

            <Stack
                sx={{ display: "flex", flexDirection: "row", gap: "10px", mb: "15px" }}
            >
                <RHFTextField
                    name="firstDigit"
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            fontSize: "16px",
                            border: "1px solid #00000040",
                            borderRadius: "8px",
                        },
                        ref: firstDigitRef,
                    }}
                    // onChange={(e) => handleInput('firstDigit', e)}
                    required
                />
                <RHFTextField
                    name="secondDigit"
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            fontSize: "16px",
                            border: "1px solid #00000040",
                            borderRadius: "8px",
                        },
                        ref: secondDigitRef,
                    }}
                    // onChange={(e) => handleInput('secondDigit', e)}
                    required
                />
                <RHFTextField
                    name="thirdDigit"
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            fontSize: "16px",
                            border: "1px solid #00000040",
                            borderRadius: "8px",
                        },
                        ref: thirdDigitRef,
                    }}
                    // onChange={(e) => handleInput('thirdDigit', e)}
                    required
                />
                <RHFTextField
                    name="fourthDigit"
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            fontSize: "16px",
                            border: "1px solid #00000040",
                            borderRadius: "8px",
                        },
                        ref: fourthDigitRef,
                    }}
                    // onChange={(e) => handleInput('firstDigit', e)}
                    required
                />
                <RHFTextField
                    name="fifthDigit"
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            fontSize: "16px",
                            border: "1px solid #00000040",
                            borderRadius: "8px",
                        },
                        ref: fifthDigitRef,
                    }}
                    // onChange={(e) => handleInput('firstDigit', e)}
                    required
                />
                <RHFTextField
                    name="sixthDigit"
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]",
                        maxLength: 1,
                        style: {
                            textAlign: "center",
                            fontSize: "16px",
                            border: "1px solid #00000040",
                            borderRadius: "8px",
                        },
                        ref: sixthDigitRef,
                    }}
                    // onChange={(e) => handleInput('firstDigit', e)}
                    required
                />
            </Stack>

            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                aria-label="Verify"
            >
                Verify
            </LoadingButton>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">Didn&apos;t receive a code?</Typography>

                <Link
                    component={RouterLink}
                    href={paths.auth.jwt.register}
                    variant="subtitle2"
                >
                    Resend
                </Link>
            </Stack>
        </Stack>
    );

    // const handleDigitInput = (event, nextIndex) => {
    //   const input = event.target;

    //   if (!/\d/.test(input)) {
    //     const nextInput = document.querySelector(`input[name=digit${nextIndex}]`);
    //     if (nextInput) {
    //       nextInput.focus();
    //     }
    //   }
    // };

    return (
        <>
            <MetaData title={"OTP Verify"} />
            <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                <div className="w-62 m-auto rounded p-8">
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        {renderHead}

                        {renderForm}
                    </FormProvider>
                </div>
            </div>
        </>
    );
}