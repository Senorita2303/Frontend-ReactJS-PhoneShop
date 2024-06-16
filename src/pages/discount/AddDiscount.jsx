import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createDiscount, clearErrors, newDiscountReset } from "../../redux/slices/discountSlice";
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
import axios from "../../common";
function AddDiscount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading, error, success, } = useSelector((state) => state.discount);
    const { products } = useSelector((state) => state.product);
    const [colors, setColors] = useState([]);
    const [memories, setMemories] = useState([]);
    const [selectedColor, setSelectedColor] = useState(1);
    const [selectedMemory, setSelectedMemory] = useState(1);
    const [inventories, setInventories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Discount Created Successfully");
            navigate(paths.dashboard.manage.discount);
            dispatch(newDiscountReset());
        }
    }, [dispatch, error, navigate, success, id]);

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
                    `/api/inventory/?color=${selectedColor}&memory=${selectedMemory}&branchId=${id}`
                );
                setInventories(inventoriesData.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchInventories();
    }, [selectedColor, selectedMemory]);


    const CreateDiscountSchema = Yup.object().shape({
        inventoryId: Yup.number().integer("Inventory id must be an integer"),
        discountType: Yup.string().required("Discount type is required"),
        discountValue: Yup.number().notRequired(),
        startDate: Yup.string().required("Start date is required"),
        endDate: Yup.string().required("End date is required").test('is-greater', 'End date must be later than start date', function (value) {
            const { startDate } = this.parent;
            return !startDate || !value || new Date(value) > new Date(startDate);
        }),
    });

    const defaultValues = {
        inventoryId: 0,
        discountType: "",
        discountValue: 0,
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
            formData.set("inventoryId", data.inventoryId);
            formData.set("discountType", data.discountType);
            formData.set("discountValue", data.discountValue);
            formData.set("startDate", new Date(data.startDate));
            formData.set("endDate", new Date(data.endDate));
            dispatch(createDiscount(formData));
        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    const discounts = [
        { name: "Percentage", value: "percentage" },
        { name: "Amount", value: "amount" },
        { name: "Buy one get one", value: "buy one get one" },
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
                    <MetaData title="New Discount" />
                    <Breadcrumb pageName="New Discount" />
                    <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                        <div className="w-96 m-auto rounded p-8">
                            <div className="flex flex-row mb-5">
                                <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500 mr-10" required onChange={(e) => setSelectedColor(e.target.value)}>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <select className="text-black right-0 rounded-r-md border border-blue-600 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500 ml-4" required onChange={(e) => setSelectedMemory(e.target.value)} >
                                    {memories.map((memory) => (
                                        <option key={memory.id} value={memory.id}>
                                            {memory.ram} - {memory.rom} - {memory.chipset}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Stack spacing={3}>
                                    <RHFTextField name="inventoryId" label="Inventory" />
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
                                        Create Discount
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

export default AddDiscount;