import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createColor, clearErrors, newColorReset } from "../../redux/slices/colorSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField } from "../../component/hook-form";
import { paths } from "../../routes/paths";
function NewColor() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, error, success } = useSelector((state) => state.color);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Color Created Successfully");
            navigate(paths.dashboard.list.color);
            dispatch(newColorReset());
        }
    }, [dispatch, error, navigate, success]);

    const CreateColorSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        code: Yup.string().required("Code is required"),
    });

    const defaultValues = {
        name: "",
        code: "",
    };

    const methods = useForm({
        resolver: yupResolver(CreateColorSchema),
        defaultValues,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("name", data.name);
            formData.set("code", data.code);
            dispatch(createColor(formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={"New Color"} />
                    <Breadcrumb pageName="New Color" />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="name" label="Name" />
                                    <RHFTextField name="code" label="Code" />
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Create color
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

export default NewColor;