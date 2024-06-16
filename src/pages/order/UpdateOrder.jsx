import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, clearErrors, getAdminOrderDetails, updateReset } from "../../redux/slices/orderSlice";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Autocomplete, TextField } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField } from "../../component/hook-form";
import { paths } from "../../routes/paths";
function UpdateOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, error, order, isUpdated } = useSelector((state) => state.order);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        if (check) {
            dispatch(getAdminOrderDetails(id));
            setCheck(false);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("Update Order Successfully");
            navigate(paths.dashboard.list.order);
            dispatch(updateReset());
        }
    }, [dispatch, error, navigate, isUpdated, order, id]);

    const UpdateOrderSchema = Yup.object().shape({
        orderStatus: Yup.number().required("Order status is required"),
        paymentStatus: Yup.number().required("Payment status is required"),
        paymentMethod: Yup.number().nullable().required("Payment method is required"),
    });

    const defaultValues = {
        orderStatus: 0,
        paymentStatus: 0,
        paymentMethod: 0,
    };

    const methods = useForm({
        resolver: yupResolver(UpdateOrderSchema),
        defaultValues,
    });

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("orderStatus", data.orderStatus);
            formData.set("paymentStatus", data.paymentStatus);
            formData.set("paymentMethod", data.paymentMethod);
            dispatch(updateOrder(id, formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    useEffect(() => {
        if (order) {
            setValue("orderStatus", order?.orderStatusId);
            setValue("paymentStatus", order?.payment?.paymentStatus?.id);
            setValue("paymentMethod", order?.payment?.paymentMethod?.id);
        }
    }, [order, setValue]);
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={"Update Order"} />
                    <Breadcrumb pageName={"Update Order"} />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <Controller
                                        name="orderStatus"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selected = order?.orderStatuses?.find(e => e.id === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={order?.orderStatuses}
                                                    value={selected}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.id);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose order status"
                                                            variant="outlined"
                                                            error={!!errors.orderStatus}
                                                            helperText={errors.orderStatus && errors.orderStatus.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    <Controller
                                        name="paymentStatus"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selected = order?.paymentStatuses?.find(e => e.id === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={order?.paymentStatuses}
                                                    value={selected}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.id);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose payment status"
                                                            variant="outlined"
                                                            error={!!errors.paymentStatus}
                                                            helperText={errors.paymentStatus && errors.paymentStatus.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selected = order?.paymentMethods?.find(e => e.id === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={order?.paymentMethods}
                                                    value={selected}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.id);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose payment method"
                                                            variant="outlined"
                                                            error={!!errors.paymentMethod}
                                                            helperText={errors.paymentMethod && errors.paymentMethod.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    {/* <RHFTextField name="orderStatus" label="Order status" />
                                    <RHFTextField name="paymentStatus" label="Payment status" />
                                    <RHFTextField name="paymentMethod" label="Payment method" /> */}
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Update Order
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

export default UpdateOrder;