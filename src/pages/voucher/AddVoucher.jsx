import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createVoucher, clearErrors, newVoucherReset } from "../../redux/slices/voucherSlice";
import { useNavigate } from "react-router-dom";
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
import axios from "../../common";
function AddVoucher() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error, success, voucher } = useSelector((state) => state.voucher);
    const { products } = useSelector((state) => state.product);
    const [colors, setColors] = useState([]);
    const [memories, setMemories] = useState([]);
    const [selectedColor, setSelectedColor] = useState(1);
    const [selectedMemory, setSelectedMemory] = useState(1);
    const [selectedBranchId, setSelectedBranchId] = useState(1);
    const [storeBranches, setStoreBranches] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Voucher Created Successfully");
            // navigate(paths.dashboard.manage.voucher);
            dispatch(newVoucherReset());
        }
    }, [dispatch, error, navigate, success]);

    useEffect(() => {
        async function fetchColors() {
            try {
                const { data } = await axios.get("/api/color/admin/colors");
                setColors(data.colors);
            } catch (error) {
                console.log(error);
            }
        }
        fetchColors();
        async function fetchMemories() {
            try {
                const { data } = await axios.get("/api/memory/admin/memories");
                setMemories(data.memories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMemories();

        async function fetchInventories() {
            try {
                const inventoriesData = await axios.get(
                    `/api/inventory/?color=${selectedColor}&memory=${selectedMemory}&branchId=${selectedBranchId}`
                );
                setInventories(inventoriesData.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchInventories();
        async function getStoreBranches() {
            try {
                const { data } = await axios.get('/api/storeBranch/admin/storeBranches')
                setStoreBranches(data.storeBranches)
            } catch (error) {
                console.log(error)
            }
        }
        getStoreBranches();
    }, [selectedColor, selectedMemory]);


    const CreateVoucherSchema = Yup.object().shape({
        inventoryId: Yup.number().integer("Inventory id must be an integer"),
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
        inventoryId: 0,
        voucherType: "",
        voucherValue: 0,
        // startDate: voucher?.startDate || "",
        // endDate: voucher?.endDate || "",
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
            formData.set("inventoryId", data.inventoryId);
            formData.set("voucherType", data.voucherType);
            formData.set("voucherKind", data.voucherKind);
            formData.set("voucherValue", data.voucherValue);
            formData.set("maxDiscount", data.maxDiscount);
            formData.set("minPurchaseAmount", data.minPurchaseAmount);
            formData.set("startDate", new Date(data.startDate));
            formData.set("endDate", new Date(data.endDate));
            dispatch(createVoucher(formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

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

    useEffect(() => {
        if (inventories.length === 1) {
            setValue("inventoryId", inventories?.[0]?.id);
        }
    }, [inventories, setValue]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DefaultLayout>
                    <MetaData title="New Voucher" />
                    <Breadcrumb pageName="New Voucher" />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <div className="flex flex-row mb-5">
                                <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500" required onChange={(e) => setSelectedColor(e.target.value)}>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row mb-5">
                                <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500" required onChange={(e) => setSelectedMemory(e.target.value)} >
                                    {memories.map((memory) => (
                                        <option key={memory.id} value={memory.id}>
                                            {memory.ram} - {memory.rom} - {memory.chipset}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-row mb-5">
                                <select
                                    className="text-black rounded-md border border-blue-700 focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500"
                                    id="filter" value={selectedBranchId}
                                    onChange={(e) => setSelectedBranchId(e.target.value)}
                                >
                                    <option key="all" value="">All store branch</option>
                                    {storeBranches.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.district} - {branch.province}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="inventoryId" label="Inventory" />
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
                                        Create Voucher
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

export default AddVoucher;