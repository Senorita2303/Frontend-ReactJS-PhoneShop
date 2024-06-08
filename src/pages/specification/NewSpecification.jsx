import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSpecification, clearErrors, newSpecificationReset } from "../../redux/slices/specificationSlice";
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
function NewSpecification() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, error, success } = useSelector((state) => state.specification);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Specification Created Successfully");
            navigate(paths.dashboard.list.specification);
            dispatch(newSpecificationReset());
        }
    }, [dispatch, error, navigate, success]);

    const CreateSpecificationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
    });

    const defaultValues = {
        name: "",
    };

    const methods = useForm({
        resolver: yupResolver(CreateSpecificationSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("specName", data.name);
            console.log(data.name);
            dispatch(createSpecification(formData));
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
                    <MetaData title={"New Specification"} />
                    <Breadcrumb pageName="New Specification" />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="name" label="Name" />
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Create specification
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

export default NewSpecification;