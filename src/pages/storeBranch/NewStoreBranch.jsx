import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createStoreBranch, clearErrors, newStoreBranchReset } from "../../redux/slices/storeBranchSlice";
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
function NewStoreBranch() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoading, error, success } = useSelector((state) => state.storeBranch);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("StoreBranch Created Successfully");
            navigate(paths.dashboard.list.storeBranch);
            dispatch(newStoreBranchReset());
        }
    }, [dispatch, error, navigate, success]);

    const CreateStoreBranchSchema = Yup.object().shape({
        branchName: Yup.string().required("Branch name is required"),
        address: Yup.string().required("Address is required"),
        province: Yup.string().required("Province is required"),
        district: Yup.string().required("District is required")
    });

    const defaultValues = {
        branchName: "",
        address: "",
        province: "",
        district: ""
    };

    const methods = useForm({
        resolver: yupResolver(CreateStoreBranchSchema),
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
            formData.set("branchName", data.branchName);
            formData.set("address", data.address);
            formData.set("province", data.province);
            formData.set("district", data.district);
            dispatch(createStoreBranch(formData));
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
                    <MetaData title={"New Store Branch"} />
                    <Breadcrumb pageName="New Store Branch" />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="branchName" label="Branch Name" />
                                    <RHFTextField name="address" label="Address" />
                                    <RHFTextField name="province" label="Province" />
                                    <RHFTextField name="district" label="District" />
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Create store
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

export default NewStoreBranch;