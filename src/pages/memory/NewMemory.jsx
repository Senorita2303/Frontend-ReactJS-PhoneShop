import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createMemory, clearErrors, newMemoryReset } from "../../redux/slices/memorySlice";
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
function NewMemory() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, error, success } = useSelector((state) => state.memory);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Memory Created Successfully");
            navigate(paths.dashboard.list.memory);
            dispatch(newMemoryReset());
        }
    }, [dispatch, error, navigate, success]);

    const CreateMemorySchema = Yup.object().shape({
        ram: Yup.string().required("Ram is required"),
        rom: Yup.string().required("Rom is required"),
        chipset: Yup.string().required("Chipset is required"),
    });

    const defaultValues = {
        ram: "",
        rom: "",
        chipset: "",
    };

    const methods = useForm({
        resolver: yupResolver(CreateMemorySchema),
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
            formData.set("ram", data.ram);
            formData.set("rom", data.rom);
            formData.set("chipset", data.chipset);
            dispatch(createMemory(formData));
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
                    <MetaData title={"New Memory"} />
                    <Breadcrumb pageName="New Memory" />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="ram" label="Ram" />
                                    <RHFTextField name="rom" label="Rom" />
                                    <RHFTextField name="chipset" label="Chipset" />
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Create memory
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

export default NewMemory;