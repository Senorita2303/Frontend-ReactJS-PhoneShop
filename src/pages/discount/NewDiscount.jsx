import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createDiscount, updateDiscount, clearErrors, getDiscountDetails, updateDiscountReset, newDiscountReset } from "../../redux/slices/discountSlice";
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
function NewDiscount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, error, success, discount, isUpdated } = useSelector((state) => state.discount);
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        if (Object.keys(discount).length === 0 && id) {
            dispatch(getDiscountDetails(id));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Discount Created Successfully");
            navigate(paths.dashboard.list.discount);
            dispatch(newDiscountReset());
        }
        if (isUpdated) {
            toast.success("Update Discount Successfully");
            navigate(paths.dashboard.list.discount);
            dispatch(updateDiscountReset());
        }
    }, [dispatch, error, navigate, success, isUpdated, discount, id]);

    const CreateDiscountSchema = Yup.object().shape({
        productId: Yup.string().required("Product is required"),
        discountType: Yup.string().required("Discount type is required"),
        discountValue: Yup.number().notRequired(),
        startDate: Yup.string().required("Start date is required"),
        endDate: Yup.string().required("End date is required").test('is-greater', 'End date must be later than start date', function (value) {
            const { startDate } = this.parent;
            return !startDate || !value || new Date(value) > new Date(startDate);
        }),
    });

    const defaultValues = {
        productId: discount?.productId || "",
        discountType: discount?.discountType || "",
        discountValue: discount?.discountValue || 0,
        // startDate: discount?.startDate || "",
        // endDate: discount?.endDate || "",
    };

    const methods = useForm({
        resolver: yupResolver(CreateDiscountSchema),
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
            formData.set("productId", data.productId);
            formData.set("discountType", data.discountType);
            formData.set("discountValue", data.discountValue);
            formData.set("startDate", fDate(data.startDate));
            formData.set("endDate", fDate(data.endDate));
            if (Object.keys(discount).length === 0) {
                dispatch(createDiscount(formData));
            }
            else dispatch(updateDiscount(id, formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    useEffect(() => {
        if (discount) {
            setValue("productId", discount?.productId);
            setValue("discountType", discount?.discountType);
            setValue("discountValue", discount?.discountValue);
            setValue("startDate", discount?.startDate ? dayjs(discount.startDate) : null);
            setValue("endDate", discount?.endDate ? dayjs(discount.endDate) : null);
        }
    }, [discount, setValue]);

    const discounts = [
        { name: "Percentage", value: "percentage" },
        { name: "Amount", value: "amount" },
        { name: "Buy one get one", value: "buy one get one" },
    ];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title={Object.keys(discount).length === 0 ? "New Discount" : "Update Discount"} />
                    <Breadcrumb pageName={Object.keys(discount).length === 0 ? "New Discount" : "Update Discount"} />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <Controller
                                        name="productId"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selectedProduct = products.find(product => product.id === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={products}
                                                    value={selectedProduct}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.id);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose a product"
                                                            variant="outlined"
                                                            error={!!errors.productId}
                                                            helperText={errors.productId && errors.productId.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    <Controller
                                        name="discountType"
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            const selectedDiscount = discounts.find(discount => discount.value === value) || null;
                                            return (
                                                <Autocomplete
                                                    options={discounts}
                                                    value={selectedDiscount}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue?.value);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose discount type"
                                                            variant="outlined"
                                                            error={!!errors.discountType}
                                                            helperText={errors.discountType && errors.discountType.message}
                                                        />
                                                    )}
                                                />
                                            )
                                        }}
                                    />
                                    {/* <RHFTextField name="discountType" label="Discount type" /> */}
                                    <RHFTextField name="discountValue" label="Discount value" />
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
                                        {Object.keys(discount).length === 0 ? "Create Discount" : "Update Discount"}
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

export default NewDiscount;