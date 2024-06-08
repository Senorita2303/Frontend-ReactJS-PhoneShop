import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../component/layouts/MetaData/MetaData";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { signUp, clearErrors } from "../../../redux/slices/userSlice";
import Loader from "../../../component/layouts/Loader/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, Stack, IconButton, Typography, InputAdornment, Avatar, Button, TextField, Input } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// hooks
import { useBoolean } from "../../../hooks/useBoolean";
// routes
import { paths } from "../../../routes/paths";
import { RouterLink } from "../../../routes/components";

// components
import Iconify from "../../../component/iconify";
import FormProvider, { RHFTextField } from "../../../component/hook-form";
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { error, isLoading, email, userId } = useSelector((state) => state.user);
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
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (email && userId) {
            toast.success("Send OTP Successfully");
            navigate(paths.auth.jwt.otpVerify);
        }
    }, [dispatch, error, email, userId, navigate]);

    const password = useBoolean();
    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required("Name required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Confirm Password is required"),
        // phone: Yup.string().required("Phone number is required").matches(/^\+\d+(\s\d+)*$/, "Invalid phone number"),
        photoURL: Yup.mixed()

    });

    const defaultValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        photoURL: "",
        // phone: "",
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    // useEffect(() => {
    //     const selectedCountryData = countries.find(
    //         (country) => country.code === selectedCountry
    //     );
    //     if (selectedCountryData) {
    //         methods.setValue("phone", `+${selectedCountryData.phone} `);
    //     }
    // }, [selectedCountry, methods]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data);
            if (data.password === data.confirmPassword) {
                const formData = new FormData();
                formData.set("userName", data.name);
                formData.set("email", data.email);
                formData.set("password", data.password);
                // formData.set("phone", data.phone);
                formData.set("image", avatar);
                dispatch(signUp(formData));
            } else {
                toast.error("Passwords do not match");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
            <Typography variant="h4">Get started absolutely free</Typography>

            <Stack direction="row" spacing={0.5}>
                <Typography variant="body2"> Already have an account? </Typography>

                <Link
                    href={paths.auth.jwt.login}
                    component={RouterLink}
                    variant="subtitle2"
                >
                    Sign in
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
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
                    Create account
                </LoadingButton>
            </Stack>
        </FormProvider>
    );

    return (
        <>
            <MetaData title={"Register"} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    <div className="w-96 m-auto rounded p-8">
                        {renderHead}

                        {renderForm}
                    </div>
                </div>
            )}
        </>
    );
}

{/* <RHFTextField
                    name="phone"
                    label="Phone Number"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    sx={{
                                        padding: "8px",
                                        display: "flex",
                                        flexDirection: "row",
                                        height: "40px",
                                        border: "none",
                                    }}
                                    renderValue={(value) => {
                                        const selectedCountryOption = countries.find(
                                            (country) => country.code === value
                                        );
                                        if (selectedCountryOption) {
                                            const { code } = selectedCountryOption;
                                            return (
                                                <Stack
                                                    container
                                                    alignItems="center"
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row !important",
                                                    }}
                                                >
                                                    <Grid item>
                                                        <Iconify
                                                            icon={`circle-flags:${code.toLowerCase()}`}
                                                            width={28}
                                                            sx={{ mr: 1 }}
                                                        />
                                                    </Grid>
                                                </Stack>
                                            );
                                        }
                                        return null;
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select Country
                                    </MenuItem>
                                    {countries.map((country) => {
                                        const { code, label, phone } = country;
                                        return (
                                            <MenuItem key={code} value={code}>
                                                <Stack
                                                    container
                                                    alignItems="center"
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row !important",
                                                    }}
                                                >
                                                    <Grid item>
                                                        <Iconify
                                                            icon={`circle-flags:${code.toLowerCase()}`}
                                                            width={28}
                                                            sx={{ mr: 1 }}
                                                        />
                                                    </Grid>
                                                    <Grid item>{`${label} +${phone} `}</Grid>
                                                </Stack>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </InputAdornment>
                        ),
                    }}
                /> */}