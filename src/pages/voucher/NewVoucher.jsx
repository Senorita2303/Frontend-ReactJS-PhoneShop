import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createVoucher, updateVoucher, clearErrors, getVoucherDetails, updateVoucherReset, newVoucherReset } from "../../redux/slices/voucherSlice";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Loader from "../../component/layouts/Loader/Loader";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Autocomplete, TextField } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField, RHFDatePicker } from "../../component/hook-form";
import { paths } from "../../routes/paths";
import { fDate } from '../../utils/formatTime';
import dayjs from 'dayjs';
function NewVoucher() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, error, success, voucher, isUpdated } = useSelector((state) => state.voucher);
    useEffect(() => {
        if (Object.keys(voucher).length === 0 && id) {
            dispatch(getVoucherDetails(id));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Voucher Created Successfully");
            navigate(paths.dashboard.list.voucher);
            dispatch(newVoucherReset());
        }
        if (isUpdated) {
            toast.success("Update Voucher Successfully");
            navigate(paths.dashboard.list.voucher);
            dispatch(updateVoucherReset());
        }
    }, [dispatch, error, navigate, success, isUpdated, voucher, id]);

    const CreateVoucherSchema = Yup.object().shape({
        voucherType: Yup.string().required("Voucher type is required"),
        voucherKind: Yup.string().required("Voucher kind is required"),
        voucherValue: Yup.number().required("Voucher value is required"),
        maxDiscount: Yup.number().required("Max discount is required"),
        minPurchaseAmount: Yup.number().required("Min purchase amount is required"),
        startDate: Yup.string().required("Start date is required"),
        endDate: Yup.string().required("End date is required").test('is-greater', 'End date must be later than start date', function (value) {
            const { startDate } = this.parent;
            return !startDate || !value || new Date(value) > new Date(startDate);
        }),
    });

    const defaultValues = {
        voucherType: voucher?.voucherType || "",
        voucherKind: voucher?.voucherKind || "",
        voucherValue: voucher?.voucherValue || 0,
        maxDiscount: voucher?.maxDiscount || 0,
        minPurchaseAmount: voucher?.minPurchaseAmount || 0,
    };

    const methods = useForm({
        resolver: yupResolver(CreateVoucherSchema),
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
            formData.set("voucherType", data.voucherType);
            formData.set("voucherKind", data.voucherKind);
            formData.set("voucherValue", data.voucherValue);
            formData.set("maxDiscount", data.maxDiscount);
            formData.set("minPurchaseAmount", data.minPurchaseAmount);
            formData.set("startDate", fDate(data.startDate));
            formData.set("endDate", fDate(data.endDate));
            if (Object.keys(voucher).length === 0) {
                dispatch(createVoucher(formData));
            }
            else dispatch(updateVoucher(id, formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    useEffect(() => {
        if (voucher) {
            setValue("voucherType", voucher?.voucherType);
            setValue("voucherKind", voucher?.voucherKind);
            setValue("voucherValue", voucher?.voucherValue);
            setValue("maxDiscount", voucher?.maxDiscount);
            setValue("minPurchaseAmount", voucher?.minPurchaseAmount);
            setValue("startDate", voucher?.startDate ? dayjs(voucher.startDate) : null);
            setValue("endDate", voucher?.endDate ? dayjs(voucher.endDate) : null);
        }
    }, [voucher, setValue]);

    const voucherTypes = [
        { name: "Product", value: "product" },
        { name: "Total purchase", value: "total purchase" },
        { name: "Shipping", value: "shipping" },
        { name: "Referral code", value: "referral code" },
    ];

    const voucherKinds = [
        { name: "Percentage", value: "percentage" },
        { name: "Amount", value: "amount" },
    ];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={Object.keys(voucher).length === 0 ? "New Voucher" : "Update Voucher"} />
                    <Breadcrumb pageName={Object.keys(voucher).length === 0 ? "New Voucher" : "Update Voucher"} />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <Controller
                                        name="voucherType"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selectedVoucher = voucherTypes.find(voucher => voucher.value === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={voucherTypes}
                                                    value={selectedVoucher}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.value);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose voucher type"
                                                            variant="outlined"
                                                            error={!!errors.voucherType}
                                                            helperText={errors.voucherType && errors.voucherType.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    <Controller
                                        name="voucherKind"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selectedVoucher = voucherKinds.find(voucher => voucher.value === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={voucherKinds}
                                                    value={selectedVoucher}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.value);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose voucher kind"
                                                            variant="outlined"
                                                            error={!!errors.voucherKind}
                                                            helperText={errors.voucherKind && errors.voucherKind.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    <RHFTextField name="voucherValue" label="Voucher value" />
                                    <RHFTextField name="maxDiscount" label="Max discount" />
                                    <RHFTextField name="minPurchaseAmount" label="Min purchase amount" />
                                    <RHFDatePicker name='startDate' label='Ngày bắt đầu' />
                                    <RHFDatePicker name='endDate' label='Ngày kết thúc' />
                                    <LoadingButton
                                        fullWidth
                                        color="inherit"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        {Object.keys(voucher).length === 0 ? "Create Voucher" : "Update Voucher"}
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

export default NewVoucher;